<script lang="ts">
	import { onMount } from 'svelte';
	import {
		modalStore,
		toastStore,
		type ToastSettings,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	let items = Array(100);
	let isLoading = false;

	interface NoteItem {
		code: string;
	}

	let fakeData: NoteItem[] = [];

	const toastSettingsNoteEdited: ToastSettings = {
		message: 'Note edited',
		background: 'variant-filled-success'
	};

	const toastSettingsNoteNotEdited: ToastSettings = {
		message: 'Note not edited',
		background: 'variant-filled-error'
	};

	const modalSettinsEditNote: ModalSettings = {
		type: 'component',
		title: 'ACTION',
		body: 'Edit note',
		component: 'modalEditNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger(toastSettingsNoteEdited);
			} else {
				toastStore.trigger(toastSettingsNoteNotEdited);
			}
		}
	};

	const toastSettingsNoteDeleted: ToastSettings = {
		message: 'Note deleted',
		background: 'variant-filled-success'
	};

	const toastSettingsNoteNotDeleted: ToastSettings = {
		message: 'Note not deleted',
		background: 'variant-filled-error'
	};

	const modalSettinsDeleteNote: ModalSettings = {
		type: 'component',
		title: 'ACTION',
		body: 'Are you sure?',
		component: 'modalDeleteNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger(toastSettingsNoteDeleted);
			} else {
				toastStore.trigger(toastSettingsNoteNotDeleted);
			}
		}
	};

	function showEditModal(code: string): void {
		modalSettinsEditNote.meta = { code };
		modalStore.trigger(modalSettinsEditNote);
	}

	function showDeleteModal(code: string): void {
		modalSettinsDeleteNote.meta = { code };
		modalStore.trigger(modalSettinsDeleteNote);
	}

	onMount(() => {
		fakeData = Array.from(
			items,
			(_) =>
				<NoteItem>{
					code: crypto.randomUUID()
				}
		);

		isLoading = true;
	});
</script>

{#if isLoading === false}
	<main class="container h-full flex justify-center items-center">
		<span class="font-bold text-lg uppercase">IS LOADING</span>
	</main>
{:else}
	<main class="container mx-auto flex justify-center">
		<div class="grid grid-cols-1 gap-4 h-full w-full mr-3 ml-2 mb-2 mt-4">
			{#each fakeData as item (item.code)}
				<button
					class="relative card p-4 w-full h-max rounded-lg"
					on:click|preventDefault|stopPropagation={() => showEditModal(item.code)}
				>
					<button
						type="button"
						class="absolute -top-2 -right-2 z-20 h-6 w-6 rounded-full variant-ringed"
						on:click|preventDefault|stopPropagation={() => showDeleteModal(item.code)}>x</button
					>
					<span>{item.code}</span>
				</button>
			{/each}
		</div>
	</main>
{/if}
