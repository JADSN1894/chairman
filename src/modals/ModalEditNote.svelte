<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	function onClickEventeEditNote(): void {
		if ($modalStore[0].response) $modalStore[0].response(true);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<textarea
			class="input rounded-none resize-none overflow-x-visible border-2"
			placeholder="Note description"
		/>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click|preventDefault={parent.onClose}>No</button
			>
			<button class="btn {parent.buttonPositive}" on:click|preventDefault={onClickEventeEditNote}
				>Edit</button
			>
		</footer>
	</div>
{/if}
