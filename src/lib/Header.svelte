<script lang="ts">
	import { page } from '$app/stores';

	$: info = $page.path === '/info';
</script>

<div class="flex justify-end mb-3">
	{#if info}
		<a href="/" class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg md:text-base"
			>Return to app</a
		>
	{:else}
		<a href="/info" class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg md:text-base"
			>Show info</a
		>
	{/if}
</div>

<h1 class="text-4xl mb-4">Clean text for pasting</h1>
