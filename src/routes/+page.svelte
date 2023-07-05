<script lang="ts">
	import CardTaskComponent from '$components/CardTaskComponent.svelte';
	import { getDataFromFile } from '$helpers/fileHelper';
	import CloudUpload from '$icons/monoicons/CloudUpload.svelte';
	import CopyIcon from '$icons/monoicons/CopyIcon.svelte';
	import { noteLocalStorage } from '$stores/noteStore';
	import { translationLocalStorage } from '$stores/translationStore';
	import type { NoteItem } from '$types/noteType';

	import { toastStore, type ModalSettings, modalStore, FileDropzone } from '@skeletonlabs/skeleton';

	let files: FileList;

	const ms = 1000; // 60 seconds;
	let currentTime = new Date().getTime();
	const refreshDateTime = () => {
		currentTime = new Date().getTime();
	};

	let clear: ReturnType<typeof setInterval>;
	$: {
		clearInterval(clear);
		clear = setInterval(refreshDateTime, ms);
	}

	function showAddModal(): void {
		modalStore.trigger(confirmModalSettinsAddNote);
	}

	const confirmModalSettinsAddNote: ModalSettings = {
		type: 'component',
		component: 'modalAddNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger({
					message: $translationLocalStorage.task_created,
					background: 'variant-filled-success'
				});
			} else {
				toastStore.trigger({
					message: $translationLocalStorage.task_not_created,
					background: 'variant-filled-error'
				});
			}
		}
	};

	async function onSelectedFile(event: Event): Promise<void> {
		const target = event.target as unknown as { files: File[] };
		const selectedFile: File = target?.files[0];

		const tasksFromFile: NoteItem[] = await getDataFromFile(selectedFile);
		const withNewCode: NoteItem[] = tasksFromFile.map((noteItem: NoteItem) => {
			noteItem.code = crypto.randomUUID();
			return noteItem;
		});

		noteLocalStorage.update((oldValue) => oldValue.concat(withNewCode));

		toastStore.trigger({
			message: 'Tasks imported',
			background: 'variant-filled-success'
		});
	}
</script>

<!-- Add task -->
<button
	type="button"
	class="z-10 fixed right-4 bottom-14 btn btn-sm rounded-full font-extrabold text-md variant-filled"
	on:click|preventDefault|stopPropagation={() => showAddModal()}
	>+
</button>

<CopyIcon
	class="z-10 fixed left-4 bottom-14 btn btn-sm rounded-full font-extrabold text-md variant-filled"
	size={20}
	referenceClipboard={JSON.stringify($noteLocalStorage)}
/>

{#if $noteLocalStorage.length === 0}
	<main class="flex justify-center items-center h-full px-2">
		<!-- <h2 class="h2 font-bold uppercase">{$translationLocalStorage.noTasks}</h2> -->
		<FileDropzone
			name="files"
			multiple={false}
			accept="application/JSON"
			on:change={onSelectedFile}
			bind:files
		>
			<svelte:fragment slot="lead">
				<div class="flex items-center justify-center">
					<CloudUpload />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="message">
				<span class="font-mono text-md">
					<span class="font-bold"> Upload a file </span> or
					<span class="font-bold"> drap and drop</span>
				</span>
			</svelte:fragment>
			<svelte:fragment slot="meta">JSON allowed</svelte:fragment>
		</FileDropzone>
	</main>
{:else}
	<main class="container mx-auto flex justify-center">
		<div class="grid grid-cols-1 gap-4 h-full w-full mr-3 ml-2 mb-2 mt-4">
			{#each $noteLocalStorage as item (item.code)}
				<CardTaskComponent taskItem={item} />
			{/each}
		</div>
	</main>
{/if}
