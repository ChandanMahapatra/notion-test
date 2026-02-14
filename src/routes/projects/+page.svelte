<!-- src/routes/projects/+page.svelte -->
<script>
	export let data;
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<section class="projects-page">
	<header class="page-header">
		<h1 class="page-title">All Projects</h1>
		<p class="page-description">A collection of my work and experiments</p>
	</header>

	{#if data.projects.length > 0}
		<div class="projects-grid">
			{#each data.projects as project}
				<article class="project-card">
					<div class="card-content">
						<h2 class="project-title">
							<a href={base + '/projects/' + project.slug} class="project-link">{project.title}</a>
						</h2>
						<time class="project-date" datetime={project.date}>
							{new Date(project.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>No projects found.</p>
		</div>
	{/if}
</section>

<style>
	.projects-page {
		padding: 2rem 0;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: var(--text-color, #333);
	}

	.page-description {
		font-size: 1.2rem;
		color: var(--text-muted, #666);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
	}

	.project-card {
		background: var(--card-background, #ffffff);
		border: 1px solid var(--border-color, #e5e5e5);
		border-radius: 8px;
		padding: 2rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.project-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.project-link {
		text-decoration: none;
		color: var(--text-color, #333);
		transition: color 0.2s ease;
	}

	.project-link:hover {
		color: var(--primary-color, #6366f1);
	}

	.project-date {
		font-size: 0.9rem;
		color: var(--text-muted, #666);
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--text-muted, #666);
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.page-title {
			font-size: 2rem;
		}
	}
</style>
