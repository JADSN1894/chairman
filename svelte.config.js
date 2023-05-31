import preprocess from "svelte-preprocess";
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(
			{
				// default options are shown
				pages: 'build',
				assets: 'build',
				fallback: "index.html",
				precompress: false,
				strict: false
			}
		),
	},

	preprocess: [
		sveltePreprocess({
			typescript: true
		}),
		preprocess({
			postcss: true,
		}),
	],
	vitePlugin: {
		inspector: {
			// Change shortcut
			toggleKeyCombo: 'meta-shift',
			// Hold and release key to toggle inspector mode
			holdMode: true,
			// Show or hide the inspector option
			showToggleButton: 'always',
			// Inspector position
			toggleButtonPos: 'top-right',
		},
	}
};


export default config;
