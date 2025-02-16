<!-- src/routes/+page.svelte -->
<script>
	export let data;

	$: ({ pages } = data);
</script>

<h1 class="text-3xl font-bold mb-8">Content</h1>

<div class="space-y-6">
	{#each pages as page}
		<article class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
			<h2 class="text-xl font-semibold mb-2">
				<a href="/{page.slug}" class="hover:underline">
					{page.title}
				</a>
			</h2>
			<time class="text-gray-600" datetime={page.date}>
				{new Date(page.date).toLocaleDateString()}
			</time>
		</article>
	{/each}
</div>
