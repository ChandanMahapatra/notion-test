// src/routes/[slug]/+page.js
// Svelte 5: components are no longer classes; do not call .render().
// Instead, pass the component to the page and let +page.svelte render it.
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const { slug } = params;
    const modules = import.meta.glob('../../content/*.md', { eager: true });
    const keys = Object.keys(modules);
    console.log('[slug]/+page.js load()', { slug, keys });

    const matchKey = keys.find((k) => k.endsWith(`/${slug}.md`));
    if (!matchKey) {
      console.warn('[slug]/+page.js: no markdown found for slug', slug);
      throw error(404, `Post "${slug}" not found`);
    }

    const mod = modules[matchKey];
    const metadata = mod?.metadata ?? {};
    const component = mod?.default;

    if (!component) {
      console.error('[slug]/+page.js: module found but missing default export');
      throw error(500, 'Invalid post module');
    }

    return {
      data: {
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString(),
        component // pass the Svelte component to the page
      }
    };
  } catch (err) {
    console.error('Error loading post:', err);
    throw (err?.status ? err : error(500, 'Failed to load post'));
  }
}
