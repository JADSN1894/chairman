<script lang="ts">
	// Custom  theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import {
		AppBar,
		AppShell,
		Modal,
		modalStore,
		Toast,
		toastStore,
		type ModalSettings,
		type ToastSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	import ModalEditNote from '../modals/ModalEditNote.svelte';
	import ModalAddNote from '../modals/ModalAddNote.svelte';
	import ModalDeleteNote from '../modals/ModalDeleteNote.svelte';

	const toastSettingsNoteCreated: ToastSettings = {
		message: 'Note created',
		background: 'variant-filled-success'
	};

	const toastSettingsNoteNotCreated: ToastSettings = {
		message: 'Note not created',
		background: 'variant-filled-error'
	};

	const confirmMoadSettinsAddNote: ModalSettings = {
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

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalAddNote: {
			ref: ModalAddNote,
			slot: '<p>Error on show add modal</p>'
		},
		modalEditNote: {
			ref: ModalEditNote,
			slot: '<p>Error on show edit modal</p>'
		},
		modalDeleteNote: {
			ref: ModalDeleteNote,
			slot: '<p>Error on show edit modal</p>'
		}
	};

	function showAddModal(): void {
		modalStore.trigger(confirmMoadSettinsAddNote);
	}
</script>

<svelte:head>
	<title>Chairman</title>
</svelte:head>

<Modal components={modalComponentRegistry} />
<Toast position="tr" />

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"><h1 class="text-sm">Chairman</h1></svelte:fragment>

			<svelte:fragment slot="trail">
				<button
					type="button"
					class="btn btn-md rounded-lg variant-filled"
					on:click|preventDefault={showAddModal}>ADD</button
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<footer class="bg-surface-100-800-token h-12 flex items-center justify-center">
			<h1 class="font-bold tracking-wide text-sm font-heading-token">{new Date().getFullYear()}</h1>
		</footer>
	</svelte:fragment>
</AppShell>
