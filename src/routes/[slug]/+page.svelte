<!-- src/routes/[slug]/+page.svelte -->
<script>
  export let data;
  // Svelte 5: the loader passes a component; render it directly
  $: ({ title, date, component: PostComponent } = data);
</script>

<article class="prose prose-lg max-w-none">
  <header class="mb-8">
    <h1 class="text-4xl font-bold mb-4">{title}</h1>
    <time class="text-gray-600" datetime={date}>
      {new Date(date).toLocaleDateString()}
    </time>
  </header>

  <!-- Render the mdsvex-compiled Svelte component -->
  {#if PostComponent}
    <svelte:component this={PostComponent} />
  {:else}
    <p class="text-red-600">Content unavailable.</p>
  {/if}
</article>
