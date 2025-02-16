<!-- src/routes/[slug]/+page.svelte -->
<script>
    export let data;
    
    $: ({ title, date, content } = data);
  </script>
  
  <article class="prose prose-lg max-w-none">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{title}</h1>
      <time class="text-gray-600" datetime={date}>
        {new Date(date).toLocaleDateString()}
      </time>
    </header>
    
    <div>
      {@html content}
    </div>
  </article>
  
  <!-- src/routes/[slug]/+page.js -->
  export async function load({ params }) {
    try {
      const post = await import(`../../content/${params.slug}.md`);
      
      return {
        title: post.metadata.title,
        date: post.metadata.date,
        content: post.default.render().html
      };
    } catch (error) {
      throw error;
    }
  }