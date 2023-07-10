<script lang="ts">
	import CalendarIcon from '$icons/monoicons/CalendarIcon.svelte';
	import MenuIcon from '$icons/monoicons/MenuIcon.svelte';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<span class="btn-sm btn-icon variant-filled mr-2">
				<CalendarIcon />
			</span>
			<h2 class="h2">Chairman</h2>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
