// src/routes/+page.js
export async function load({ fetch }) {
    const modules = import.meta.glob('/src/content/*.md', { eager: true });
    
    const pages = Object.entries(modules).map(([path, module]) => {
      const slug = path.split('/').pop().replace('.md', '');
      return {
        slug,
        title: module.metadata.title || 'Untitled',
        date: module.metadata.date || new Date().toISOString()
      };
    });
    
    // Sort by date, most recent first
    pages.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return { pages };
  }