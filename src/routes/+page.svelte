<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	export let data;

	let projects = [];
	
	onMount(async () => {
		// Load recent projects for highlights
		try {
			const modules = import.meta.glob('../content/*.md');
			const projectPromises = Object.entries(modules)
				.filter(([path]) => !path.includes('index.md') && !path.includes('about.md'))
				.map(async ([path, resolver]) => {
					const module = await resolver();
					const slug = path.split('/').pop()?.replace('.md', '') || '';
					return {
						title: module.metadata?.title || 'Untitled Project',
						slug,
						date: module.metadata?.date || new Date().toISOString()
					};
				});
			
			const allProjects = await Promise.all(projectPromises);
			// Sort by date and take the 2 most recent
			projects = allProjects
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.slice(0, 2);
		} catch (error) {
			console.error('Error loading projects:', error);
		}
	});

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

{#if projects.length > 0}
<section class="featured-projects">
	<h2 class="section-title">Latest Projects</h2>
	<div class="project-grid">
		{#each projects as project}
			<article class="project-card">
				<div class="card-content">
					<h3 class="project-title">
						<a href="/{project.slug}" class="project-link">{project.title}</a>
					</h3>
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
	<div class="view-all">
		<a href="/projects" class="view-all-link">View All Projects</a>
	</div>
</section>
{/if}

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
	
	.featured-projects {
		margin-top: 4rem;
	}
	
	.section-title {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 2rem;
		text-align: center;
		color: var(--text-color);
	}
	
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.project-card {
		background: var(--card-background, #ffffff);
		border: 1px solid var(--border-color, #e5e5e5);
		border-radius: 8px;
		padding: 2rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	
	.project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	
	.card-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
	
	.view-all {
		text-align: center;
	}
	
	.view-all-link {
		display: inline-block;
		padding: 1rem 2rem;
		background: var(--primary-color, #6366f1);
		color: white;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 500;
		transition: background 0.2s ease;
	}
	
	.view-all-link:hover {
		background: var(--primary-color-dark, #4f46e5);
	}
	
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2rem;
		}
		
		.project-grid {
			grid-template-columns: 1fr;
		}
	}
</style>