<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Application's global stylesheet
	import '../app.postcss';

	import {
		AppBar,
		AppShell,
		Modal,
		Toast,
		type ModalComponent,
		LightSwitch,
		storePopup,
		setModeCurrent,
		setModeUserPrefers
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import ModalEditNote from '$modals/ModalEditNote.svelte';
	import ModalAddNote from '$modals/ModalAddNote.svelte';
	import ModalDeleteNote from '$modals/ModalDeleteNote.svelte';

	import { onMount } from 'svelte';

	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';

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

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(() => {
		//* Skeleton docs: Light mode is represented by true, while dark mode is represented by false.

		//* Set default theme mode to light
		setModeCurrent(true);

		//* Set default theme mode of LightSwitch component to light
		setModeUserPrefers(true);
	});
</script>

<Modal components={modalComponentRegistry} />
<Toast position="bl" />

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
