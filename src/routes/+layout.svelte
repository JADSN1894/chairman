<script lang="ts">
	//* ------- SVELTE ------
	import { goto } from '$app/navigation';

	//* ------- SKELETON ------
	// This contains the bulk of Skeletons required styles:
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { noteLocalStorage } from '../store/noteStore';

	import {
		AppBar,
		AppShell,
		Modal,
		Toast,
		type ModalComponent,
		LightSwitch,
		autoModeWatcher,
		modalStore,
		type ModalSettings,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import ModalEditNote from '../modals/ModalEditNote.svelte';
	import ModalAddNote from '../modals/ModalAddNote.svelte';
	import ModalDeleteNote from '../modals/ModalDeleteNote.svelte';

	// let error: Error | null = null;

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

	$: classButtonAddVisible = $noteLocalStorage.length <= 3 ? 'visible' : 'invisible';
</script>

<svelte:head>
	<title>Chairman</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<Modal components={modalComponentRegistry} />
<Toast position="tr" />

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<h1 class="h1">Chairman</h1>
			</svelte:fragment>

			<LightSwitch />
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<footer class="bg-surface-100-800-token h-12 flex items-center justify-center">
			<h1 class="h1 font-bold tracking-wide font-heading-token">
				{new Date().getFullYear()}
			</h1>
		</footer>
	</svelte:fragment>
</AppShell>
