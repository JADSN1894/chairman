<script lang="ts">
	import { version } from '$app/environment';
	import { getDataFromFile } from '$helpers/fileHelper';
	import { Language, stringToLanguage } from '$i18n/i18n';
	import CloudUpload from '$icons/monoicons/CloudUpload.svelte';

	import SettingsIcon from '$icons/monoicons/SettingsIcon.svelte';
	import { languageLocalStorage } from '$stores/i18nStore';
	import { noteLocalStorage } from '$stores/noteStore';
	import type { NoteItem } from '$types/noteType';

	import { popup, toastStore, type PopupSettings } from '@skeletonlabs/skeleton';

	let fileInput: HTMLInputElement;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
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
</script>

<footer class="flex w-full bg-surface-100-800-token items-center h-12 px-2">
	<div class="flex w-full justify-start">
		<h6 class="h6 font-bold tracking-wide font-heading-token">
			{version}
		</h6>
	</div>

	<div class="flex w-full justify-center gap-x-2">
		<div>
			<!-- Settings language popup options -->
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
