<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children } = $props();
</script>

<div class="container mx-auto max-w-2xl px-4 pt-6 pb-8 text-gray-900 md:pt-5 md:pb-6">
	<Header />
	{@render children()}
</div>
