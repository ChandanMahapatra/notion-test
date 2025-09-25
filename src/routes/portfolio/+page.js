// src/routes/portfolio/+page.js
export async function load() {
  try {
    // Load portfolio page content (top-level markdown)
    let portfolioContent = null;
    try {
      const portfolioModule = await import('../../content/portfolio.md');
      portfolioContent = {
        title: portfolioModule.metadata?.title || 'Portfolio',
        component: portfolioModule.default,
        date: portfolioModule.metadata?.date || new Date().toISOString()
      };
    } catch {
      console.warn('No portfolio.md found or failed to load');
    }

    const modules = import.meta.glob('../../content/projects/*.md');
    const projectPromises = Object.entries(modules).map(async ([path, resolver]) => {
      const mod = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      return {
        title: mod.metadata?.title || 'Untitled Project',
        slug,
        date: mod.metadata?.date || new Date().toISOString(),
        component: mod.default
      };
    });
    const projects = await Promise.all(projectPromises);
    return {
      portfolio: portfolioContent,
      projects: projects.sort((a,b) => new Date(b.date) - new Date(a.date))
    };
  } catch (e) {
    console.error('Error loading portfolio projects', e);
    return { portfolio: null, projects: [] };
  }
}