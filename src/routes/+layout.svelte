<script lang="ts">
	// Application's global stylesheet
	import '../app.postcss';

	import {
		AppShell,
		Modal,
		Toast,
		type ModalComponent,
		storePopup,
		setModeCurrent,
		setModeUserPrefers,
		Drawer,
		AppRail,
		AppRailTile,
		initializeStores,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import ModalEditNote from '$modals/ModalEditNote.svelte';
	import ModalAddNote from '$modals/ModalAddNote.svelte';
	import ModalDeleteNote from '$modals/ModalDeleteNote.svelte';

	import { onMount } from 'svelte';

	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import CalendarIcon from '$icons/monoicons/CalendarIcon.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();

	let currentTile: number = 0;

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

	//* Skeleton setup
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
<Drawer width="w-fit">
	<div class="flex flex-col">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailTile
					bind:group={currentTile}
					name="tasks"
					value={0}
					title="tasks"
					on:click={() => drawerStore.close()}
				>
					<svelte:fragment slot="lead">
						<div class="flex items-center justify-center">
							<CalendarIcon />
						</div>
					</svelte:fragment>
					<span>Tasks</span>
				</AppRailTile>
			</svelte:fragment>
		</AppRail>
	</div>
</Drawer>

<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-10"
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-20"
>
	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
					<svelte:fragment slot="lead">
						<div class="flex items-center justify-center">
							<CalendarIcon />
						</div>
					</svelte:fragment>
					<span>Tasks</span>
				</AppRailTile>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

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
