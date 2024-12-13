<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cleanText, copyText } from '$lib/utils.svelte';

	let diacsCheck: boolean;
	let extrasCheck: boolean;
	let lowercaseCheck: boolean;

	let origTextInput = '';

	let cleanTextField: HTMLTextAreaElement;
	$: cleanTextOutput = cleanText(origTextInput, diacsCheck, extrasCheck, lowercaseCheck);

	function setInput(): void {
		if (browser) {
			localStorage.setItem('origTextInput', origTextInput);
		}
	}

	onMount(() => {
		diacsCheck = localStorage.getItem('diacsCheck') !== 'false';
		extrasCheck = localStorage.getItem('extrasCheck') === 'true';
		lowercaseCheck = localStorage.getItem('lowercaseCheck') === 'true';

		origTextInput = localStorage.getItem('origTextInput') || '';
	});
</script>

<svelte:head>
	<title>Clean text for pasting</title>
</svelte:head>

<div class="mb-3 flex space-x-6">
	<div class="flex items-center space-x-2">
		<input
			type="checkbox"
			bind:checked={diacsCheck}
			on:change={() => {
				if (browser) {
					localStorage.setItem('diacsCheck', diacsCheck.toString());
				}
			}}
			class="h-5 w-5 md:h-4 md:w-4"
			id="diacs-check"
		/><label for="diacs-check">Fix ṡ, ż</label>
	</div>

	<div class="flex items-center space-x-2">
		<input
			type="checkbox"
			bind:checked={extrasCheck}
			on:change={() => {
				if (browser) {
					localStorage.setItem('extrasCheck', extrasCheck.toString());
				}
			}}
			class="h-5 w-5 md:h-4 md:w-4"
			id="extras-check"
		/><label for="extras-check">Extras</label>
	</div>

	<div class="flex items-center space-x-2">
		<input
			type="checkbox"
			bind:checked={lowercaseCheck}
			on:change={() => {
				if (browser) {
					localStorage.setItem('lowercaseCheck', lowercaseCheck.toString());
				}
			}}
			class="h-5 w-5 md:h-4 md:w-4"
			id="lowercase-check"
		/><label for="lowercase-check">Lowercase</label>
	</div>
</div>

<div class="mb-1"><label for="orig-text-input">Input:</label></div>
<div class="mb-1">
	<textarea
		bind:value={origTextInput}
		on:change={setInput}
		rows="8"
		class="w-full rounded border border-gray-300 bg-gray-50 p-2"
		id="orig-text-input"
	></textarea>
</div>

<div class="mb-3 flex">
	<div class="mr-4">
		<button
			on:click={() => {
				origTextInput = '';
				setInput();
			}}
			class="rounded bg-blue-600 px-2 py-1 text-lg text-gray-50 md:text-base">Clear</button
		>
	</div>

	<div>
		<button
			on:click={() => {
				origTextInput = cleanTextOutput;
				setInput();
			}}
			class="rounded bg-teal-700 px-2 py-1 text-lg text-gray-50 md:text-base">Cycle</button
		>
	</div>
</div>

<div class="mb-1"><label for="clean-text-output">Output:</label></div>
<div class="mb-1">
	<textarea
		bind:this={cleanTextField}
		bind:value={cleanTextOutput}
		readonly
		autocomplete="off"
		rows="8"
		class="w-full rounded border border-gray-300 bg-gray-50 p-2"
		id="clean-text-output"
	></textarea>
</div>

<div class="mb-2">
	<button
		on:click={() => copyText(cleanTextField, cleanTextOutput)}
		class="rounded bg-blue-600 px-2 py-1 text-lg text-gray-50 md:text-base">Copy</button
	>
</div>

<div class="flex flex-wrap">
	<div class="mr-4 flex items-baseline space-x-2">
		<span>Characters:</span><span class="font-mono text-lg text-pink-600"
			>{String(cleanTextOutput.length)}</span
		>
	</div>

	<div class="mr-4 flex items-baseline space-x-2">
		<span>Words:</span><span class="font-mono text-lg text-pink-600"
			>{cleanTextOutput.length === 0
				? '0'
				: String(cleanTextOutput.replace(/\s{2,}/g, ' ').split(/\s/g).length)}</span
		>
	</div>

	<div class="flex items-baseline space-x-2">
		<span>Paragraphs:</span><span class="font-mono text-lg text-pink-600"
			>{cleanTextOutput.length === 0 ? '0' : String(cleanTextOutput.split('\n\n').length)}</span
		>
	</div>
</div>
