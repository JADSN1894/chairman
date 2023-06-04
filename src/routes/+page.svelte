<script lang="ts">
	import CardTaskComponent from '$components/CardTaskComponent.svelte';
	import { noteLocalStorage } from '$stores/noteStore';

	import {
		toastStore,
		type ModalSettings,
		modalStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { languages, i, switchLanguage, language as currentLanguage } from '@inlang/sdk-js';

	let ms = 1000; // 60 seconds;
	let currentTime = new Date().getTime();
	const refreshDateTime = () => {
		currentTime = new Date().getTime();
	};

	let clear: ReturnType<typeof setInterval>;
	$: {
		clearInterval(clear);
		clear = setInterval(refreshDateTime, ms);
	}

	const toastSettingsNoteCreated: ToastSettings = {
		message: 'Note created',
		background: 'variant-filled-success'
	};

	const toastSettingsNoteNotCreated: ToastSettings = {
		message: 'Note not created',
		background: 'variant-filled-error'
	};

	function showAddModal(): void {
		modalStore.trigger(confirmModalSettinsAddNote);
	}

	const confirmModalSettinsAddNote: ModalSettings = {
		type: 'component',
		title: 'ACTION',
		body: 'Add note',
		component: 'modalAddNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger(toastSettingsNoteCreated);
			} else {
				toastStore.trigger(toastSettingsNoteNotCreated);
			}
		}
	};
</script>

<!-- Add todo -->
<button
	type="button"
	class="z-10 fixed right-4 bottom-14 btn btn-sm rounded-full font-extrabold text-md variant-filled"
	on:click|preventDefault|stopPropagation={() => showAddModal()}>+</button
>

{#if $noteLocalStorage.length === 0}
	<main class="h-full flex justify-center items-center">
		<h2 class="font-bold text-2xl uppercase h2">{i('noTasks')}</h2>
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
