import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";
import sveltePreprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-static';
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		csp: {
			mode: 'nonce',
			directives: {
				'script-src': ['self'],
				"report-to": ['https://chairman.jadsn.dev.br/'],
			},
			reportOnly: {
				'script-src': ['self'],
				"report-to": ['https://chairman.jadsn.dev.br/']
			}
		}
	},

	preprocess: [
		sveltePreprocess({
			typescript: true
		}),
		preprocess({
			postcss: true,
		}),
	],
};


export default config;
