<script lang="ts">
	// Exposes parent props to this component.
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	import { addTodo } from '$stores/noteStore';
	import { translationLocalStorage } from '$stores/translationStore';

	let noteDescription = '';

	function onClickEventeAddNote(): void {
		addTodo(noteDescription);

		if ($modalStore[0].response) $modalStore[0].response(true);

		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">
			<h2 class="h2 uppercase">{$translationLocalStorage.action}</h2>
		</header>
		<main>
			{$translationLocalStorage.add_task}
			<textarea
				class="input rounded-md resize-none overflow-x-visible border-2 mt-1"
				placeholder="Note description"
				bind:value={noteDescription}
			/>
		</main>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn capitalize {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}
				>{$translationLocalStorage.cancel}
			</button>
			<button
				class="btn capitalize {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventeAddNote}
				>{$translationLocalStorage.create}
			</button>
		</footer>
	</div>
{/if}
