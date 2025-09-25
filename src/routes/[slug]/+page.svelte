<!-- src/routes/[slug]/+page.svelte -->
<script>
  export let data;
  // Svelte 5: the loader passes a component; render it directly
  $: ({ title, date, component: PostComponent } = data);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title} />
</svelte:head>

<article class="content">
  <header class="page-header">
    <h1 class="page-title">{title}</h1>
    <time class="page-date" datetime={date}>
      {new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </time>
  </header>

  <!-- Render the mdsvex-compiled Svelte component -->
  <div class="page-content">
    {#if PostComponent}
      <svelte:component this={PostComponent} />
    {:else}
      <p class="error-message">Content unavailable.</p>
    {/if}
  </div>
</article>

<style>
  .content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--text-color);
    margin: 0 0 1rem 0;
  }
  
  .page-date {
    color: var(--text-muted);
    font-size: 0.95rem;
  }
  
  .page-content {
    line-height: 1.7;
    color: var(--text-color);
  }
  
  .page-content :global(h1) {
    font-size: 2rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: var(--text-color);
  }
  
  .page-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: var(--text-color);
  }
  
  .page-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 1.5rem 0 1rem 0;
    color: var(--text-color);
  }
  
  .page-content :global(p) {
    margin: 1rem 0;
  }
  
  .page-content :global(ul),
  .page-content :global(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .page-content :global(li) {
    margin: 0.5rem 0;
  }
  
  .page-content :global(a) {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .page-content :global(a:hover) {
    color: var(--primary-color-dark);
    text-decoration: underline;
  }
  
  .page-content :global(code) {
    background-color: var(--border-color);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9rem;
  }
  
  .page-content :global(pre) {
    background-color: var(--border-color);
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  .error-message {
    color: #dc2626;
    font-style: italic;
  }
</style>
