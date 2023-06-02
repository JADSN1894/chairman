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
		alias: {
			'$types': './src/types'
		},
		csp: {
			mode: "hash",
			directives: {
				'script-src': ['self'],
				'base-uri': ['self'],
				'child-src': ['self'],
				'connect-src': ['self'],
				'img-src': ['self', 'data:'],
				'font-src': ['self', 'data:'],
				'form-action': ['self'],
				'frame-ancestors': ['self'],
				'frame-src': ['self',],
				'manifest-src': ['self'],
				'media-src': ['self'],
				'object-src': ['none'],
				'style-src': ['self', 'unsafe-inline'],
				'worker-src': ['self'],
				'default-src': ['self', 'https://chairman.jadsn.dev.br']
			},
		},
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
