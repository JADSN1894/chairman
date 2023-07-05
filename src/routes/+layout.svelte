<script lang="ts">
	import { version } from '$app/environment';

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
		type PopupSettings,
		popup,
		setModeCurrent,
		setModeUserPrefers,
		toastStore
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import ModalEditNote from '$modals/ModalEditNote.svelte';
	import ModalAddNote from '$modals/ModalAddNote.svelte';
	import ModalDeleteNote from '$modals/ModalDeleteNote.svelte';

	import { noteLocalStorage } from '$stores/noteStore';
	import { onMount } from 'svelte';

	import { languageLocalStorage } from '$stores/i18nStore';
	import { Language, stringToLanguage } from '$i18n/i18n';
	import CloudUpload from '$icons/monoicons/CloudUpload.svelte';
	import { getDataFromFile } from '$helpers/fileHelper';
	import type { NoteItem } from '$types/noteType';
	import SettingsIcon from '$icons/monoicons/SettingsIcon.svelte';

	let fileInput: HTMLInputElement;

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

	async function addItemsToLocalStorageFromFile(): Promise<void> {
		const innerFiles = fileInput.files;
		if (innerFiles !== null) {
			const selectedFile: File = innerFiles[0];
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
	}

	async function saveTasksToJsonFile() {
		const anchor = document.createElement('a');
		const str = JSON.stringify($noteLocalStorage);
		const bytes = new TextEncoder().encode(str);
		const blob = new Blob([bytes], {
			type: 'application/json;charset=utf-8'
		});
		anchor.href = window.URL.createObjectURL(blob);
		anchor.download = `backup-${Date.now()}.json`;
		anchor.click();
	}

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
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
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<h1 class="h1">Chairman</h1>
			</svelte:fragment>

			<div class="card p-4 variant-filled" data-popup="popupClick">
				<div class="btn-group-vertical btn-gro variant-filled">
					{#each Object.values(Language) as language}
						<button
							type="button"
							class:font-bold={language === ($languageLocalStorage ?? Language.EN.toString())}
							class="button btn-sm uppercase"
							on:click|preventDefault|stopPropagation={() => {
								languageLocalStorage.set(stringToLanguage(language));
							}}
							>{language}
						</button>
					{/each}
				</div>
				<div class="arrow variant-filled" />
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
		<footer class="flex w-full bg-surface-100-800-token items-center h-12 px-2">
			<div class="flex w-full justify-start">
				<h6 class="h6 font-bold tracking-wide font-heading-token">
					{version}
				</h6>
			</div>

			<div class="flex w-full justify-center gap-x-2">
				<div>
					<button
						use:popup={popupClick}
						class="h-8 w-8 btn-icon rounded-full font-extrabold text-md variant-filled"
					>
						<SettingsIcon size={20} />
					</button>
					{#if $noteLocalStorage.length > 0}
						<input
							class="hidden"
							type="file"
							accept="application/JSON"
							multiple={false}
							bind:this={fileInput}
							on:change={async () => addItemsToLocalStorageFromFile()}
						/>
						<button
							class="h-8 w-8 btn-icon rounded-full font-extrabold text-md variant-filled"
							on:click={() => fileInput.click()}
						>
							<CloudUpload size={20} />
						</button>
					{/if}
					<button
						class="h-8 w-8 btn-icon rounded-full font-extrabold text-md variant-filled rotate-180"
						on:click={() => saveTasksToJsonFile()}
					>
						<CloudUpload size={20} />
					</button>
				</div>
			</div>

			<div class="flex w-full justify-end">
				<h6 class="h6 font-bold tracking-wide font-heading-token">
					{new Date().getFullYear()} : {$noteLocalStorage.length}
				</h6>
			</div>
		</footer>
	</svelte:fragment>
</AppShell>
