<!-- src/routes/portfolio/+page.svelte -->
<script>
  export let data;
</script>

<svelte:head>
  <title>Portfolio</title>
  <meta name="description" content="Project portfolio" />
</svelte:head>

<section class="portfolio">
  <header class="page-header">
    <h1>Portfolio</h1>
    <p class="subtitle">Selected projects and case studies</p>
  </header>

  {#if data.projects.length}
    <div class="project-grid">
      {#each data.projects as project}
        <article class="project-card">
          <h2 class="project-title">
            <a href={'/projects/' + project.slug}>{project.title}</a>
          </h2>
          <time class="project-date" datetime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short'})}
          </time>
          <a class="project-link" href={'/projects/' + project.slug}>Read more →</a>
        </article>
      {/each}
    </div>
  {:else}
    <p>No projects yet.</p>
  {/if}
</section>

<style>
  .portfolio { max-width: 1100px; margin: 0 auto; padding: 2rem 0; }
  .page-header { margin-bottom: 2.5rem; }
  .page-header h1 { font-size: 2.5rem; margin: 0 0 .5rem; }
  .subtitle { color: var(--text-color-muted); margin: 0; }
  .project-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(250px,1fr)); gap: 1.5rem; }
  .project-card { border: 1px solid var(--border-color); padding: 1.25rem 1rem; border-radius: 8px; background: var(--card-background); display: flex; flex-direction: column; gap: .5rem; }
  .project-title { font-size: 1.1rem; margin: 0; }
  .project-title a { text-decoration: none; color: var(--text-color); }
  .project-title a:hover { color: var(--primary-color); }
  .project-date { font-size: .75rem; text-transform: uppercase; letter-spacing: .05em; color: var(--text-muted); }
  .project-link { margin-top: auto; font-size: .85rem; text-decoration: none; color: var(--primary-color); font-weight: 500; }
  .project-link:hover { text-decoration: underline; }
</style>