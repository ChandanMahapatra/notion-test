// src/routes/[slug]/+page.js
import { error } from '@sveltejs/kit';

const ALLOWED_TOP_LEVEL = new Set(['about', 'portfolio']);

export async function load({ params }) {
  const { slug } = params;
  if (!slug || slug.includes('/') || slug.includes('.')) {
    throw error(404, 'Page not found');
  }
  if (!ALLOWED_TOP_LEVEL.has(slug)) {
    throw error(404, 'Page not found');
  }
  try {
    const post = await import(`../../content/${slug}.md`);
    if (!post || !post.default) throw error(404, 'Page not found');
    return {
      title: post.metadata?.title || 'Untitled',
      date: post.metadata?.date || new Date().toISOString(),
      component: post.default
    };
  } catch (e) {
    console.error('Error loading top-level page', e);
    throw error(404, 'Page not found');
  }
}
