<script lang="ts">
	import CalendarIcon from '$icons/monoicons/CalendarIcon.svelte';
	import { addTag, tagsLocalStorage } from '$stores/tags.store';

	let tagName = '';

	function insertTag() {
		addTag(tagName);
		tagName = '';
	}
</script>

<div class="flex flex-col mt-2 px-2 gap-y-2 flex-grow h-full">
	<div class="flex items-center gap-x-1">
		<input type="text" class="input" bind:value={tagName} />
		<button class="btn btn-sm variant-filled font-bold" on:click={() => insertTag()}>ADD</button>
	</div>

	{#if $tagsLocalStorage.length === 0}
		<div class="flex capitalize px-2 items-center justify-center flex-grow h-full">
			<span class="font-bold text-2xl"> NO TAGS</span>
		</div>
	{/if}

	<dl class="list-dl">
		{#each $tagsLocalStorage as item}
			<div>
				<span class="btn btn-sm btn-icon variant-filled">
					<CalendarIcon />
				</span>
				<span class="flex-auto">
					<dt class="first-letter:capitalize font-mono">{item}</dt>
				</span>
			</div>
		{/each}
	</dl>
</div>
