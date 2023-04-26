<script lang="ts">
	import { onMount } from 'svelte';
	import {
		modalStore,
		toastStore,
		type ToastSettings,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	import { noteLocalStorage } from '../store/noteStore';

	let isLoading = false;

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

	function showEditModal(code: string, description: string): void {
		modalSettinsEditNote.meta = { code, description };
		modalStore.trigger(modalSettinsEditNote);
	}

	function showDeleteModal(code: string): void {
		modalSettinsDeleteNote.meta = { code };
		modalStore.trigger(modalSettinsDeleteNote);
	}

	onMount(() => {
		isLoading = true;
	});
</script>

{#if isLoading === false}
	<main class="h-full flex justify-center items-center">
		<span class="font-bold text-2xl uppercase">IS LOADING</span>
	</main>
{:else if $noteLocalStorage.length === 0}
	<main class="h-full flex justify-center items-center">
		<span class="font-bold text-2xl uppercase">IS EMPTY</span>
	</main>
{:else}
	<main class="container mx-auto flex justify-center">
		<div class="grid grid-cols-1 gap-4 h-full w-full mr-3 ml-2 mb-2 mt-4">
			{#each $noteLocalStorage as item (item.code)}
				<button
					class="relative card p-4 w-full h-max rounded-lg"
					on:click|preventDefault|stopPropagation={() => showEditModal(item.code, item.description)}
				>
					<button
						type="button"
						class="absolute -top-2 -right-2 z-20 h-6 w-6 rounded-full variant-ringed"
						on:click|preventDefault|stopPropagation={() => showDeleteModal(item.code)}>x</button
					>
					<div class="flex flex-col items-start justify-start gap-y-2">
						<code>{item.code}</code>
						<span>{item.description}</span>
					</div>
				</button>
			{/each}
		</div>
	</main>
{/if}
