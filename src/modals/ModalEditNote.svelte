<script lang="ts">
	import { onMount } from 'svelte';

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import { editTodo } from '$stores/noteStore';
	import { translationLocalStorage } from '$stores/translationStore';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	let noteDescription = '';

	function onClickEventeEditNote(): void {
		editTodo($modalStore[0].meta?.code, noteDescription);

		if ($modalStore[0].response) $modalStore[0].response(true);
		modalStore.close();
	}

	onMount(() => {
		noteDescription = $modalStore[0].meta?.description;
	});
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">
			<h2 class="h2 uppercase">{$translationLocalStorage.action}</h2>
		</header>
		<main>
			{$translationLocalStorage.edit_task}
			<textarea
				class="input rounded-none resize-none overflow-x-visible border-2 mt-1"
				placeholder="Note description"
				bind:value={noteDescription}
			/>
		</main>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn capitalize {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}
				>{$translationLocalStorage.no}
			</button>
			<button
				class="btn capitalize {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventeEditNote}
				>{$translationLocalStorage.update}
			</button>
		</footer>
	</div>
{/if}
