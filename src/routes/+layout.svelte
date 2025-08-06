<!-- src/routes/+layout.svelte -->
<script>
	import { dev } from '$app/environment';

	// Set the base path for GitHub Pages
	let base = dev ? '' : '/notion-test';
</script>

<nav class="p-4 bg-gray-100">
	<a href={`${base}/`} class="text-lg font-bold">Home</a>
</nav>

<main class="max-w-4xl mx-auto p-6">
	<slot />
</main>

<footer class="p-4 text-center text-gray-600">
	<p>Updated via Notion</p>
</footer>
