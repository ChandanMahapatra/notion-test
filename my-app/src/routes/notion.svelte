<script>
	import { onMount } from 'svelte';
	let notionContent = '';

	onMount(async () => {
		const res = await fetch('/notion-content/page.md');
		notionContent = await res.text();
	});
</script>

<main>
	<h1>Notion Page Content</h1>
	<pre>{notionContent}</pre>
</main>
