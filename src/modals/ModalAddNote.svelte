<script lang="ts">
	// Exposes parent props to this component.
	export let parent: any;

	// Stores
	import { InputChip, getModalStore } from '@skeletonlabs/skeleton';

	import { addTodo } from '$stores/noteStore';
	import { translationLocalStorage } from '$stores/translationStore';
	import type { NoteTag } from '$types/noteType';

	const modalStore = getModalStore();

	let noteTitle = '';
	let noteDescription = '';
	let tagsList: string[] = [];

	function onClickEventeAddNote(): void {
		const tags: NoteTag[] = tagsList.map((label: string): NoteTag => label);

		addTodo({ title: noteTitle, description: noteDescription, tags });

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
			<div class="flex flex-col gap-2">
				<input
					type="text"
					class="input rounded-md border-2"
					placeholder="Title"
					bind:value={noteTitle}
				/>
				<textarea
					class="input rounded-md border-2 resize-none overflow-x-visible"
					placeholder="Description"
					bind:value={noteDescription}
				/>
				<InputChip
					allowUpperCase
					name="chips"
					placeholder="Tags"
					class="rounded-md border-2"
					bind:value={tagsList}
				/>
			</div>
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
