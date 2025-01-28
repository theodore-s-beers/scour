<svelte:head>
	<title>Clean text for pasting – Info</title>
</svelte:head>

<h2 class="mb-4 text-2xl">What does this do?</h2>

<div class="space-y-3">
	<p>
		By default, this script will normalize the input text to Unicode form NFC; trim outside
		whitespace; replace two annoying diacritics specific to the romanization of Persian (this can be
		disabled); remove any remaining combining diacritics (none should be present after NFC
		normalization); replace any unusual horizontal space character (including tab) with a normal
		space; reduce any instance of multiple spaces to one; remove any space before or after a line
		break; reduce any instance of multiple empty lines to one; and replace any non-breaking hyphen
		or figure dash with a normal hyphen.
	</p>
	<p>
		With “extras” enabled, this will further replace single or double curly quotes with their
		straight equivalents; and replace any en or em dash with two or three normal hyphens,
		respectively.
	</p>
	<p>
		There is also an option to convert all letters in the input text to lowercase. (The JavaScript
		method in question will attempt to do this in a locale-sensitive manner.)
	</p>
	<p>
		Naïve counts of characters, words, and paragraphs (where separated by an empty line) are given
		for the cleaned output text.
	</p>
	<p>
		User input is persisted to browser <a
			href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
			rel="noopener"
			class="text-blue-600 hover:underline">localStorage</a
		>. Don’t worry—there’s no backend.
	</p>
	<p>
		Other features may be added over time, as they occur to me. In any case, the source files are
		available
		<a
			href="https://github.com/theodore-s-beers/scour"
			rel="noopener"
			class="text-blue-600 hover:underline"
		>
			on GitHub
		</a>
		under the MIT License.
	</p>
</div>

<hr class="mt-4 mb-2" />

<p>
	A plague year diversion of <a
		href="https://www.theobeers.com/"
		rel="noopener"
		class="text-blue-600 hover:underline">Theo Beers</a
	><br /><em>Last updated 5 Apr. 2022</em>
</p>
