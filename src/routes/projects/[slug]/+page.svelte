<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
	export let data;
	$: ({ title, date, component: Component } = data);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title} />
</svelte:head>

<article class="project">
	<header class="project-header">
		<h1>{title}</h1>
		<time datetime={date}
			>{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}</time
		>
	</header>
	<div class="project-body">
		<svelte:component this={Component} />
	</div>
</article>

<style>
	.project {
		max-width: 800px;
		margin: 0 auto;
	}
	.project-header {
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}
	.project-header h1 {
		margin: 0 0 0.75rem;
		font-size: 2.25rem;
	}
	.project-header time {
		color: var(--text-muted);
		font-size: 0.9rem;
	}
	.project-body :global(h2) {
		margin-top: 2rem;
		font-size: 1.5rem;
	}
</style>
