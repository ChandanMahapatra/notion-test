<!-- src/routes/+layout.svelte -->
<script>
	import '../styles.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<nav class="navigation">
	<div class="nav-container">
		<a href={base + '/'} class="nav-brand">Portfolio</a>
		<div class="nav-links">
			<a href={base + '/about'} class="nav-link" class:active={$page.url.pathname === base + '/about'}>About</a>
			<a href={base + '/portfolio'} class="nav-link" class:active={$page.url.pathname.startsWith(base + '/portfolio')}>Portfolio</a>
		</div>
	</div>
</nav>

<main class="main-content">
	<slot />
</main>

<style>
	.navigation {
		background: var(--background-color);
		border-bottom: 1px solid var(--border-color);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
		backdrop-filter: blur(10px);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-brand {
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: none;
		color: var(--text-color);
		transition: color 0.2s ease;
	}

	.nav-brand:hover {
		color: var(--primary-color);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		text-decoration: none;
		color: var(--text-color);
		font-weight: 500;
		transition: color 0.2s ease;
		padding: 0.5rem 1rem;
		border-radius: 4px;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--primary-color);
		background: var(--primary-color-light, rgba(99, 102, 241, 0.1));
	}

	.main-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: calc(100vh - 100px);
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 0 1rem;
		}

		.nav-links {
			gap: 1rem;
		}

		.nav-link {
			padding: 0.5rem;
		}

		.main-content {
			padding: 1rem;
		}
	}
</style>
