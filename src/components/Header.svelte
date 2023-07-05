<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<h1 class="h1">Chairman</h1>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
