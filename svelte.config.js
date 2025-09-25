// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const repoName = 'notion-test';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig)
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    // Only set base for GitHub Pages subdirectory deployments; assets must be absolute if specified, so omit it.
    paths: {
      base: process.env.NODE_ENV === 'production' ? `/${repoName}` : ''
    },
    prerender: {
      handleMissingId: 'ignore'
    }
  }
};

export default config;