<script lang="ts">
	// Exposes parent props to this component.
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import { deleteNote } from '$stores/noteStore';
	import { translationLocalStorage } from '$stores/translationStore';

	function onClickEventeDeleteNote(): void {
		deleteNote($modalStore[0].meta?.code);

		if ($modalStore[0].response) $modalStore[0].response(true);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold flex flex-col gap-1">
			<h2 class="h2 uppercase">{$translationLocalStorage.action}</h2>
			<span class="text-sm line-clamp-1">{$modalStore[0].meta?.code ?? '(code missing)'}</span>
		</header>
		<article>{$translationLocalStorage.are_you_sure}</article>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn capitalize {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}
				>{$translationLocalStorage.no}
			</button>
			<button
				class="btn capitalize {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventeDeleteNote}
				>{$translationLocalStorage.yes}
			</button>
		</footer>
	</div>
{/if}
