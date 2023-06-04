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
		autoModeWatcher,
		storePopup,
		type PopupSettings,
		popup
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import ModalEditNote from '$modals/ModalEditNote.svelte';
	import ModalAddNote from '$modals/ModalAddNote.svelte';
	import ModalDeleteNote from '$modals/ModalDeleteNote.svelte';

	import { noteLocalStorage } from '$stores/noteStore';
	import { onMount } from 'svelte';
	import { languages, i, switchLanguage, language as currentLanguage } from '@inlang/sdk-js';

	import 'boxicons';
	import Svg from '$components/Svg.svelte';

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

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(() => {
		autoModeWatcher();
	});
</script>

<Modal components={modalComponentRegistry} />
<Toast position="bl" />

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<h1 class="h1">Chairman</h1>
			</svelte:fragment>

			<div class="card p-4 variant-filled" data-popup="popupClick">
				<div class="btn-group-vertical btn-gro variant-filled">
					{#each languages as language}
						<button
							type="button"
							class:font-bold={language === (currentLanguage ?? 'en')}
							class="button btn-sm uppercase"
							on:click|preventDefault|stopPropagation={() => {
								switchLanguage(language);
							}}>{language}</button
						>
					{/each}
				</div>
				<div class="arrow variant-filled" />
			</div>

			<!-- <button class="xs:ml-16 btn btn-sm variant-filled font-bold uppercase" use:popup={popupClick}
				>{i('settings')}</button
			> -->

			<div class="flex items-center justify-center">
				<button use:popup={popupClick} class="xs:ml-16">
					<Svg />
				</button>
			</div>

			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<footer class="bg-surface-100-800-token h-12 flex items-center justify-center">
			<h1 class="h1 font-bold tracking-wide font-heading-token">
				{new Date().getFullYear()} : {$noteLocalStorage.length}
			</h1>
		</footer>
	</svelte:fragment>
</AppShell>
