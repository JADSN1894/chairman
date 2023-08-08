import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { subresourceIntegrity } from "vite-plugin-subresource-integrity";

export default defineConfig({
	plugins: [
		sveltekit(),
		subresourceIntegrity({ algorithm: 'sha512', buildDirectory: 'build' })
	],
	server: {
		host: true,
		port: 8000,
		strictPort: true
	}
});
