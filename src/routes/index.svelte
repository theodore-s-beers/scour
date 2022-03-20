<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cleanText, copyText } from '$lib/utils.svelte';

	let diacsCheck = true;
	let extrasCheck = false;
	let lowercaseCheck = false;

	let origTextInput = '';

	let cleanTextField: HTMLTextAreaElement;
	$: cleanTextOutput = cleanText(origTextInput, diacsCheck, extrasCheck, lowercaseCheck);
</script>

<svelte:head>
	<title>Clean text for pasting</title>
</svelte:head>

<div in:fly={{ x: -100, duration: 400, delay: 200 }} out:fly={{ x: -100, duration: 200 }}>
	<div class="flex space-x-6 mb-3">
		<div class="flex space-x-2 items-center">
			<input
				type="checkbox"
				bind:checked={diacsCheck}
				class="w-5 h-5 md:w-4 md:h-4"
				id="diacs-check"
			/><label for="diacs-check">Fix ṡ, ż</label>
		</div>

		<div class="flex space-x-2 items-center">
			<input
				type="checkbox"
				bind:checked={extrasCheck}
				class="w-5 h-5 md:w-4 md:h-4"
				id="extras-check"
			/><label for="extras-check">Extras</label>
		</div>

		<div class="flex space-x-2 items-center">
			<input
				type="checkbox"
				bind:checked={lowercaseCheck}
				class="w-5 h-5 md:w-4 md:h-4"
				id="lowercase-check"
			/><label for="lowercase-check">Lowercase</label>
		</div>
	</div>

	<div class="mb-1"><label for="orig-text-input">Input:</label></div>
	<div class="mb-1">
		<textarea
			bind:value={origTextInput}
			rows="6"
			class="border border-gray-300 rounded w-full p-2 bg-gray-50"
			id="orig-text-input"
		/>
	</div>

	<div class="mb-3">
		<button
			on:click={() => (origTextInput = '')}
			class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg md:text-base">Clear</button
		>
	</div>

	<div class="mb-1"><label for="clean-text-output">Output:</label></div>
	<div class="mb-1">
		<textarea
			bind:this={cleanTextField}
			bind:value={cleanTextOutput}
			readonly
			autocomplete="off"
			rows="6"
			class="border border-gray-300 w-full rounded p-2 bg-gray-50"
			id="clean-text-output"
		/>
	</div>

	<div class="mb-2">
		<button
			on:click={() => copyText(cleanTextField, cleanTextOutput)}
			class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg md:text-base">Copy</button
		>
	</div>

	<div class="flex flex-wrap">
		<div class="flex space-x-2 mr-4 items-baseline">
			<span>Characters:</span><span class="font-mono text-pink-600 text-lg"
				>{String(cleanTextOutput.length)}</span
			>
		</div>

		<div class="flex space-x-2 mr-4 items-baseline">
			<span>Words:</span><span class="font-mono text-pink-600 text-lg"
				>{cleanTextOutput.length === 0
					? '0'
					: String(cleanTextOutput.replace(/\s{2,}/g, ' ').split(/\s/g).length)}</span
			>
		</div>

		<div class="flex space-x-2 items-baseline">
			<span>Paragraphs:</span><span class="font-mono text-pink-600 text-lg"
				>{cleanTextOutput.length === 0 ? '0' : String(cleanTextOutput.split('\n\n').length)}</span
			>
		</div>
	</div>
</div>
