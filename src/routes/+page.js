/* src/routes/+page.js */
export async function load() {
  try {
    const post = await import('../content/index.md');
    
    return {
      title: post.metadata?.title || 'Portfolio',
      content: post.default
    };
  } catch (error) {
    console.error('Error loading home page:', error);
    return {
      title: 'Portfolio',
      content: null
    };
  }
}