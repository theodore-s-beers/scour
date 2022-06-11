<script lang="ts">
	import { page } from '$app/stores';

	$: info = $page.url.pathname === '/info';
</script>

<div class="mb-3 flex justify-end">
	{#if info}
		<a href="/" class="rounded bg-blue-600 px-2 py-1 text-lg text-gray-50 md:text-base"
			>Return to app</a
		>
	{:else}
		<a href="/info" class="rounded bg-blue-600 px-2 py-1 text-lg text-gray-50 md:text-base"
			>Show info</a
		>
	{/if}
</div>

<h1 class="mb-4 text-4xl">Clean text for pasting</h1>
