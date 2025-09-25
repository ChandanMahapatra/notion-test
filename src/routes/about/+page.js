// src/routes/about/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const post = await import('../../content/about.md');
    if (!post || !post.default) {
      throw error(404, 'About page not found');
    }
    
    return {
      title: post.metadata?.title || 'About',
      date: post.metadata?.date || new Date().toISOString(),
      component: post.default
    };
  } catch (err) {
    console.error('Error loading about page:', err);
    throw error(404, 'About page not found');
  }
}