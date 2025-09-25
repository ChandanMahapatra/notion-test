// src/routes/projects/[slug]/+page.js
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  if (!slug) throw error(404, 'Project not found');
  try {
    const mod = await import(`../../../content/projects/${slug}.md`);
    return {
      title: mod.metadata?.title || 'Untitled Project',
      date: mod.metadata?.date || new Date().toISOString(),
      component: mod.default
    };
  } catch (e) {
    console.error('Failed loading project', e);
    throw error(404, 'Project not found');
  }
}