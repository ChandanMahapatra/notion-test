// src/routes/portfolio/+page.js
export async function load() {
  try {
    const modules = import.meta.glob('../../content/projects/*.md');
    const projectPromises = Object.entries(modules).map(async ([path, resolver]) => {
      const mod = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      return {
        title: mod.metadata?.title || 'Untitled Project',
        slug: slug,
        date: mod.metadata?.date || new Date().toISOString(),
        component: mod.default
      };
    });
    const projects = await Promise.all(projectPromises);
    return {
      projects: projects.sort((a,b) => new Date(b.date) - new Date(a.date))
    };
  } catch (e) {
    console.error('Error loading portfolio projects', e);
    return { projects: [] };
  }
}