<script lang="ts">
	import { onMount } from 'svelte';

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import { editTodo } from '../store/noteStore';

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
		<header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<textarea
			class="input rounded-none resize-none overflow-x-visible border-2"
			placeholder="Note description"
			bind:value={noteDescription}
		/>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}>No</button
			>
			<button
				class="btn {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventeEditNote}>Edit</button
			>
		</footer>
	</div>
{/if}
