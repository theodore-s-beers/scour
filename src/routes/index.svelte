<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cleanText, copyText } from '$lib/utils.svelte';

	let diacsCheck = true;
	let extrasCheck = false;

	let info = false;

	let origTextInput = '';

	let cleanTextField: HTMLTextAreaElement;
	$: cleanTextOutput = cleanText(origTextInput, diacsCheck, extrasCheck);
</script>

<svelte:head>
	<meta name="description" content="Clean text to prepare for pasting into a document" />

	<title>Clean text for pasting</title>
</svelte:head>

<div class="flex justify-end mb-3">
	<button
		class="bg-blue-600 text-gray-50 px-2 py-1 rounded"
		on:click={() => {
			info = !info;
		}}
	>
		{#if !info}Show info{:else}Return to app{/if}
	</button>
</div>

<h1 class="text-4xl mb-4">Clean text for pasting</h1>

{#if !info}
	<div in:fade>
		<div class="flex space-x-6 mb-3">
			<div class="flex space-x-2 items-center">
				<input type="checkbox" bind:checked={diacsCheck} class="w-5 h-5" /><label for="diacsCheck"
					>Fix ṡ, ż</label
				>
			</div>
			<div class="flex space-x-2 items-center">
				<input type="checkbox" bind:checked={extrasCheck} class="w-5 h-5" /><label for="extrasCheck"
					>Extras</label
				>
			</div>
		</div>

		<div class="mb-1"><label for="origTextInput">Input:</label></div>
		<div class="mb-1">
			<textarea
				bind:value={origTextInput}
				rows="6"
				class="border border-gray-300 rounded w-full p-2 bg-gray-50"
			/>
		</div>

		<div class="mb-3">
			<button
				on:click={() => (origTextInput = '')}
				class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg">Clear</button
			>
		</div>

		<div class="mb-1"><label for="cleanTextOutput">Output:</label></div>
		<div class="mb-1">
			<textarea
				bind:this={cleanTextField}
				bind:value={cleanTextOutput}
				readonly
				autocomplete="off"
				rows="6"
				class="border border-gray-300 w-full rounded p-2 bg-gray-50"
			/>
		</div>

		<div class="mb-3">
			<button
				on:click={() => copyText(cleanTextField, cleanTextOutput)}
				class="bg-blue-600 text-gray-50 px-2 py-1 rounded text-lg">Copy</button
			>
		</div>

		<div class="flex flex-wrap">
			<div class="flex space-x-2 mr-4">
				<span>Characters:</span><span class="font-mono text-pink-600 text-lg"
					>{String(cleanTextOutput.length)}</span
				>
			</div>
			<div class="flex space-x-2 mr-4">
				<span>Words:</span><span class="font-mono text-pink-600 text-lg"
					>{cleanTextOutput.length === 0
						? '0'
						: String(cleanTextOutput.replace(/\s{2,}/g, ' ').split(/\s/g).length)}</span
				>
			</div>
			<div class="flex space-x-2">
				<span>Paragraphs:</span><span class="font-mono text-pink-600 text-lg"
					>{cleanTextOutput.length === 0 ? '0' : String(cleanTextOutput.split('\n\n').length)}</span
				>
			</div>
		</div>
	</div>
{:else}
	<div in:fade>
		<h2 class="text-2xl mb-4">What does this do?</h2>

		<div class="space-y-3">
			<p>
				By default, this script will normalize the input text to Unicode form NFC; trim outside
				whitespace; replace two annoying diacritics specific to the romanization of Persian (this
				can be disabled); remove any remaining combining diacritics (none should be present after
				NFC normalization); replace any unusual horizontal space character (including tab) with a
				normal space; reduce any instance of multiple spaces to one; remove any space before a line
				break; reduce any instance of multiple empty lines to one; and replace any non-breaking
				hyphen or figure dash with a normal hyphen.
			</p>
			<p>
				With “extras” enabled, this will further replace single or double curly quotes with their
				straight equivalents; and replace any en or em dash with two or three normal hyphens,
				respectively.
			</p>
			<p>
				Naïve counts of characters, words, and paragraphs (where separated by an empty line) are
				given for the cleaned output text.
			</p>
			<p>
				Other features may be added over time, as they occur to me. In any case, the source files
				are available
				<a href="https://github.com/theodore-s-beers/clean-text-svelte" rel="noopener">
					on GitHub
				</a>
				under the MIT License.
			</p>
		</div>

		<hr class="mt-4 mb-2" />

		<p>
			A plague year diversion of <a href="https://www.theobeers.com/" rel="noopener">Theo Beers</a
			><br /><em>Last updated 7 Sept. 2021</em>
		</p>
	</div>
{/if}
