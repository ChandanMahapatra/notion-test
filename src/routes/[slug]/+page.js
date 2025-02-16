// src/routes/[slug]/+page.js
export async function load({ params }) {
    try {
      const post = await import(`/src/content/${params.slug}.md`);
      
      if (!post || !post.default) {
        throw new Error('Post not found');
      }
  
      return {
        title: post.metadata?.title || 'Untitled',
        date: post.metadata?.date || new Date().toISOString(),
        content: post.default
      };
    } catch (error) {
      console.error('Error loading post:', error);
      throw error;
    }
  }
  