<script lang="ts">
	import { languageLocalStorage } from '$stores/i18nStore';
	import { translationLocalStorage } from '$stores/translationStore';
	import type { EditItem, NoteItem } from '$types/noteType';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let taskItem: NoteItem;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let ms = 1000; // 60 seconds;
	let currentTime = new Date().getTime();
	const refreshDateTime = () => {
		currentTime = new Date().getTime();
	};

	let clear: ReturnType<typeof setInterval>;
	$: {
		clearInterval(clear);
		clear = setInterval(refreshDateTime, ms);
	}

	function formatTimeAgoFromTimestamp(timestamp: number, currentTime: number): string {
		let value = '';
		const diff = (currentTime - timestamp) / 1000;
		const minutes = Math.floor(diff / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

		const rtf = new Intl.RelativeTimeFormat($languageLocalStorage.toString(), {
			style: 'short',
			numeric: 'auto'
		});

		if (years > 0) {
			value = rtf.format(0 - years, 'year');
		} else if (months > 0) {
			value = rtf.format(0 - months, 'month');
		} else if (days > 0) {
			value = rtf.format(0 - days, 'day');
		} else if (hours > 0) {
			value = rtf.format(0 - hours, 'hour');
		} else if (Math.floor(diff + 1) === 60) {
			value = rtf.format(1, 'minute');
		} else if (minutes > 0) {
			value = rtf.format(0 - minutes, 'minute');
		} else {
			value = rtf.format(Math.floor(0 - diff), 'second');
		}
		return value;
	}

	const modalSettinsEditNote: ModalSettings = {
		type: 'component',
		component: 'modalEditNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger({
					message: $translationLocalStorage.task_updated,
					background: 'variant-filled-success'
				});
			} else {
				toastStore.trigger({
					message: $translationLocalStorage.task_not_updated,
					background: 'variant-filled-error'
				});
			}
		}
	};

	function showEditModal(item: EditItem): void {
		console.log('showEditModal');
		console.log(item.tags);

		modalSettinsEditNote.meta = {
			code: item.code,
			title: item.title,
			description: item.description,
			tags: item.tags
		};
		modalStore.trigger(modalSettinsEditNote);
	}

	const modalSettinsDeleteNote: ModalSettings = {
		type: 'component',
		component: 'modalDeleteNote',
		response: (isConfirmmed: boolean) => {
			if (isConfirmmed === true) {
				toastStore.trigger({
					message: $translationLocalStorage.task_deleted,
					background: 'variant-filled-success'
				});
			} else {
				toastStore.trigger({
					message: $translationLocalStorage.task_not_deleted,
					background: 'variant-filled-error'
				});
			}
		}
	};

	function showDeleteModal(code: string): void {
		modalSettinsDeleteNote.meta = { code };
		modalStore.trigger(modalSettinsDeleteNote);
	}
</script>

<button
	class="relative card p-4 w-full h-max rounded-lg border-2"
	on:click|preventDefault|stopPropagation={() => showEditModal(taskItem)}
>
	<button
		type="button"
		class="absolute -top-2 -right-2 h-6 w-6 rounded-full variant-filled"
		on:click|preventDefault|stopPropagation={() => showDeleteModal(taskItem.code)}>x</button
	>
	<div class="flex flex-col items-start justify-start gap-y-2">
		<!-- <code class="code">{taskItem.code}</code> -->
		<h3 class="h3 first-letter:capitalize">{taskItem.title ?? 'Untitled'}</h3>
		<span class="text-lg">{taskItem.description}</span>
		{#if taskItem.tags === undefined || taskItem.tags.length === 0}
			<span class="w-full variant-ghost rounded-md p-1 font-bold">No tags</span>
		{:else}
			<div class="flex flex-wrap gap-1">
				{#each taskItem.tags as item (item)}
					<span class="chip variant-ghost font-bold first-letter:capitalize">{item}</span>
				{/each}
			</div>
		{/if}
		<span class="font-bold"
			>{$translationLocalStorage.createdAt}
			{formatTimeAgoFromTimestamp(taskItem.createdAt, currentTime)}
		</span>
	</div>
</button>
