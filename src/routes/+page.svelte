<script lang="ts">
	import { noteLocalStorage } from '../store/noteStore';

	import {
		toastStore,
		type ModalSettings,
		modalStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { preferredLanguages } from 'svelte-legos';
	import { get } from 'svelte/store';
	// let error: Error | null = null;
	let userId = '';

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

	const toastSettingsNoteCreated: ToastSettings = {
		message: 'Note created',
		background: 'variant-filled-success'
	};

	const toastSettingsNoteNotCreated: ToastSettings = {
		message: 'Note not created',
		background: 'variant-filled-error'
	};

	function showEditModal(code: string, description: string): void {
		modalSettinsEditNote.meta = { code, description };
		modalStore.trigger(modalSettinsEditNote);
	}

	function showDeleteModal(code: string): void {
		modalSettinsDeleteNote.meta = { code };
		modalStore.trigger(modalSettinsDeleteNote);
	}

	function formatTimeAgoFromTimestamp(timestamp: number): string {
		let value = '';
		const diff = (new Date().getTime() - timestamp) / 1000;
		const minutes = Math.floor(diff / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);
		const languages = get(preferredLanguages());

		const rtf = new Intl.RelativeTimeFormat(languages[0], { style: 'short', numeric: 'auto' });

		if (years > 0) {
			value = rtf.format(0 - years, 'year');
		} else if (months > 0) {
			value = rtf.format(0 - months, 'month');
		} else if (days > 0) {
			value = rtf.format(0 - days, 'day');
		} else if (hours > 0) {
			value = rtf.format(0 - hours, 'hour');
		} else if (minutes > 0) {
			value = rtf.format(0 - minutes, 'minute');
		} else {
			value = rtf.format(0 - diff, 'second');
		}
		return value;
	}
</script>

<!-- Add todo -->
<!-- <button
	type="button"
	class="z-10 fixed right-4 bottom-14 btn btn-sm rounded-full font-extrabold text-md variant-filled {classButtonAddVisible}"
	on:click|preventDefault|stopPropagation={showAddModal}>+</button
> -->

{#if $noteLocalStorage.length === 0}
	<main class="h-full flex justify-center items-center">
		<h2 class="font-bold text-2xl uppercase h2">NO ITEMS</h2>
	</main>
{:else}
	<main class="container mx-auto flex justify-center">
		<div class="grid grid-cols-1 gap-4 h-full w-full mr-3 ml-2 mb-2 mt-4">
			{#each $noteLocalStorage as item (item.code)}
				<button
					class="relative card p-4 w-full h-max rounded-lg border-2"
					on:click|preventDefault|stopPropagation={() => showEditModal(item.code, item.description)}
				>
					<button
						type="button"
						class="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full variant-filled"
						on:click|preventDefault|stopPropagation={() => showDeleteModal(item.code)}>x</button
					>
					<div class="flex flex-col items-start justify-start gap-y-2">
						<code class="code">{item.code}</code>
						<span>{item.description}</span>
						<span
							><strong>Created at: </strong>
							{formatTimeAgoFromTimestamp(item.createdAt) ?? ''}</span
						>
					</div>
				</button>
			{/each}
		</div>
	</main>
{/if}
