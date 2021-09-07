<script context="module" lang="ts">
	export function cleanText(
		origTextInput: string,
		diacsCheck: boolean,
		extrasCheck: boolean
	): string {
		// Regex for space characters
		const spaces = /[\t\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g;

		// Clean text, based on selections
		if (diacsCheck && extrasCheck) {
			return (
				origTextInput
					.normalize('NFC')
					.trim()
					// Diacritics start
					.replace(/\u0053\u0331/g, '\u1E60')
					.replace(/\u0073\u0331/g, '\u1E61')
					.replace(/\u005A\u0324/g, '\u017B')
					.replace(/\u007A\u0324/g, '\u017C')
					// Diacritics end
					.replace(/[\u0300-\u036f]/g, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/g, '\u0020')
					.replace(/\u0020+\n/g, '\n')
					.replace(/\n{3,}/g, '\n\n')
					.replace(/[\u2011\u2012]/g, '\u002D')
					// Extras start
					.replace(/[\u2018\u2019]/g, '\u0027')
					.replace(/[\u201C\u201D]/g, '\u0022')
					.replace(/\u2013/g, '\u002D\u002D')
					.replace(/\u2014/g, '\u002D\u002D\u002D')
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
					.replace(/\u0053\u0331/g, '\u1E60')
					.replace(/\u0073\u0331/g, '\u1E61')
					.replace(/\u005A\u0324/g, '\u017B')
					.replace(/\u007A\u0324/g, '\u017C')
					// Diacritics end
					.replace(/[\u0300-\u036f]/g, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/g, '\u0020')
					.replace(/\u0020+\n/g, '\n')
					.replace(/\n{3,}/g, '\n\n')
					.replace(/[\u2011\u2012]/g, '\u002D')
					.normalize('NFC')
					.trim()
			);
		} else if (extrasCheck) {
			return (
				origTextInput
					.normalize('NFC')
					.trim()
					.replace(/[\u0300-\u036f]/g, '')
					.replace(spaces, '\u0020')
					.replace(/\u0020{2,}/g, '\u0020')
					.replace(/\u0020+\n/g, '\n')
					.replace(/\n{3,}/g, '\n\n')
					.replace(/[\u2011\u2012]/g, '\u002D')
					// Extras start
					.replace(/[\u2018\u2019]/g, '\u0027')
					.replace(/[\u201C\u201D]/g, '\u0022')
					.replace(/\u2013/g, '\u002D\u002D')
					.replace(/\u2014/g, '\u002D\u002D\u002D')
					// Extras end
					.normalize('NFC')
					.trim()
			);
		} else {
			return origTextInput
				.normalize('NFC')
				.trim()
				.replace(/[\u0300-\u036f]/g, '')
				.replace(spaces, '\u0020')
				.replace(/\u0020{2,}/g, '\u0020')
				.replace(/\u0020+\n/g, '\n')
				.replace(/\n{3,}/g, '\n\n')
				.replace(/[\u2011\u2012]/g, '\u002D')
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
