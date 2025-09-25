<!-- src/routes/+page.svelte -->
<script>
	export let data;
	$: ({ title, content } = data);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Portfolio website showcasing projects and experiences" />
</svelte:head>

<section class="hero">
	<div class="hero-content">
		<h1 class="hero-title">{title}</h1>
		<div class="hero-description">
			{#if content}
				<svelte:component this={content} />
			{:else}
				<p>Welcome to my portfolio</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 3rem 0;
		text-align: center;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 1.5rem;
		color: var(--text-color);
	}

	.hero-description {
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--text-muted);
	}

	@media (max-width: 768px) {
		.hero-title {
			font-size: 2rem;
		}
	}
</style>
