<!-- src/routes/about/+page.svelte -->
<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content="About page" />
</svelte:head>

<article class="content">
	<header class="page-header">
		<h1>{data.title}</h1>
	</header>

	<div class="page-content">
		<svelte:component this={data.component} />
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

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		color: var(--text-color);
		margin: 0;
	}

	.page-content {
		line-height: 1.6;
		color: var(--text-color-muted);
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
</style>
