/* src/routes/projects/+page.js */
export async function load() {
  try {
    const modules = import.meta.glob('../../content/projects/*.md');
    const projectPromises = Object.entries(modules)
      .map(async ([path, resolver]) => {
        const module = await resolver();
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        return {
          title: module.metadata?.title || 'Untitled Project',
          slug,
          date: module.metadata?.date || new Date().toISOString(),
          // Extract first paragraph as description if available
          content: module.default
        };
      });
    
    const projects = await Promise.all(projectPromises);
    
    return {
      projects: projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projects: []
    };
  }
}