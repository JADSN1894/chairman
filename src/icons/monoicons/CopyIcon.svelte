<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';

	export let fill: string = 'currentColor';
	export let size: number = 24;
	export let referenceClipboard: string;
</script>

<button type="button" class={$$props.class} use:clipboard={referenceClipboard}>
	<svg
		fill="none"
		viewBox="0 0 24 24"
		height={size}
		width={size}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			xmlns="http://www.w3.org/2000/svg"
			d="M2 4C2 2.89543 2.89543 2 4 2H14C15.1046 2 16 2.89543 16 4V8H20C21.1046 8 22 8.89543 22 10V20C22 21.1046 21.1046 22 20 22H10C8.89543 22 8 21.1046 8 20V16H4C2.89543 16 2 15.1046 2 14V4ZM10 16V20H20V10H16V14C16 15.1046 15.1046 16 14 16H10ZM14 14V4L4 4V14H14Z"
			{fill}
		/>
	</svg>
</button>
