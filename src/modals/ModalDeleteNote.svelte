<script lang="ts">
	// Exposes parent props to this component.
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	function onClickEventeDeleteNote(): void {
		if ($modalStore[0].response) $modalStore[0].response(true);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold flex flex-col gap-1">
			<h2>{$modalStore[0].title ?? '(title missing)'}</h2>
			<span class="text-sm line-clamp-1">{$modalStore[0].meta?.code ?? '(code missing)'}</span>
		</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}>No</button
			>
			<button
				class="btn {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventeDeleteNote}>Add</button
			>
		</footer>
	</div>
{/if}
