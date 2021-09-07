<script context="module" lang="ts">
	export function cleanText(
		origTextInput: string,
		diacsCheck: boolean,
		extrasCheck: boolean
	): void {
		// Regex for space characters
		const spaces = /[\t\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g;

		// Clean text, based on selections
		if (diacsCheck && extrasCheck) {
			return (
				origTextInput
					.normalize('NFC')
					.trim()
					// Diacritics start
					.replace(/\u0053\u0331/gm, '\u1E60')
					.replace(/\u0073\u0331/gm, '\u1E61')
					.replace(/\u005A\u0324/gm, '\u017B')
					.replace(/\u007A\u0324/gm, '\u017C')
					// Diacritics end
					.replace(/[\u0300-\u036f]/gm, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/gm, '\u0020')
					.replace(/\u0020+\n/gm, '\n')
					.replace(/\n{3,}/gm, '\n\n')
					.replace(/[\u2011\u2012]/gm, '\u002D')
					// Extras start
					.replace(/[\u2018\u2019]/gm, '\u0027')
					.replace(/[\u201C\u201D]/gm, '\u0022')
					.replace(/\u2013/gm, '\u002D\u002D')
					.replace(/\u2014/gm, '\u002D\u002D\u002D')
					// Extras end
					.normalize('NFC')
					.trim()
			);
		} else if (diacsCheck) {
			return (
				origTextInput
					.normalize('NFC')
					.trim()
					// Diacritics start
					.replace(/\u0053\u0331/gm, '\u1E60')
					.replace(/\u0073\u0331/gm, '\u1E61')
					.replace(/\u005A\u0324/gm, '\u017B')
					.replace(/\u007A\u0324/gm, '\u017C')
					// Diacritics end
					.replace(/[\u0300-\u036f]/gm, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/gm, '\u0020')
					.replace(/\u0020+\n/gm, '\n')
					.replace(/\n{3,}/gm, '\n\n')
					.replace(/[\u2011\u2012]/gm, '\u002D')
					.normalize('NFC')
					.trim()
			);
		} else if (extrasCheck) {
			return (
				origTextInput
					.normalize('NFC')
					.trim()
					.replace(/[\u0300-\u036f]/gm, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/gm, '\u0020')
					.replace(/\u0020+\n/gm, '\n')
					.replace(/\n{3,}/gm, '\n\n')
					.replace(/[\u2011\u2012]/gm, '\u002D')
					// Extras start
					.replace(/[\u2018\u2019]/gm, '\u0027')
					.replace(/[\u201C\u201D]/gm, '\u0022')
					.replace(/\u2013/gm, '\u002D\u002D')
					.replace(/\u2014/gm, '\u002D\u002D\u002D')
					// Extras end
					.normalize('NFC')
					.trim()
			);
		} else {
			return origTextInput
				.normalize('NFC')
				.trim()
				.replace(/[\u0300-\u036f]/gm, '')
				.replace(spaces, '\u0020')
				.replace(/\u0020{2,}/gm, '\u0020')
				.replace(/\u0020+\n/gm, '\n')
				.replace(/\n{3,}/gm, '\n\n')
				.replace(/[\u2011\u2012]/gm, '\u002D')
				.normalize('NFC')
				.trim();
		}
	}

	export function copyText(cleanTextField: HTMLTextAreaElement, cleanTextOutput: string): void {
		if (cleanTextOutput.length > 0) {
			navigator.clipboard
				.writeText(cleanTextOutput)
				.then(() => {
					cleanTextField.focus();
					cleanTextField.select();
				})
				.catch((err) => {
					console.error('Could not copy text: ', err);
				});
		} else {
			return;
		}
	}
</script>
