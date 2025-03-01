export function cleanText(
	origTextInput: string,
	diacsCheck: boolean,
	extrasCheck: boolean,
	lowercaseCheck: boolean,
): string {
	// Regex for space characters
	const spaces = /[\t\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g;

	// Initial normalization and trim
	let text = origTextInput.normalize("NFC").trim();

	// If we're fixing diacritics, do it now
	if (diacsCheck) {
		text = text
			.replace(/\u0053[\u0320\u0331\u0332]/g, "\u1E60")
			.replace(/\u0073[\u0320\u0331\u0332]/g, "\u1E61")
			.replace(/\u005A\u0324/g, "\u017B")
			.replace(/\u007A\u0324/g, "\u017C");
	}

	// Other standard cleaning
	text = text
		.replace(/[\u0300-\u036f]/g, "") // No combining diacritics
		.replace(spaces, "\u0020") // Unusual hspace -> normal
		.replace(/\u0020{2,}/g, "\u0020") // Multiple spaces -> one
		.replace(/\u0020+\n|\n\u0020+/g, "\n") // No space before or after line break
		.replace(/\n{3,}/g, "\n\n") // Multiple empty lines -> one
		.replace(/[\u2011\u2012]/g, "\u002D"); // Unusual hyphens -> normal

	// Do extra fixes now, if selected
	if (extrasCheck) {
		text = text
			.replace(/[\u2018\u2019]/g, "\u0027")
			.replace(/[\u201C\u201D]/g, "\u0022")
			.replace(/\u2013/g, "\u002D\u002D")
			.replace(/\u2014/g, "\u002D\u002D\u002D");
	}

	// Make all lowercase, if selected
	if (lowercaseCheck) {
		text = text.toLocaleLowerCase();
	}

	// Final normalization and trim
	text = text.normalize("NFC").trim();

	return text;
}

export function copyText(cleanTextField: HTMLTextAreaElement, cleanTextOutput: string): void {
	if (cleanTextOutput.length === 0) {
		return;
	}

	navigator.clipboard
		.writeText(cleanTextOutput)
		.then(() => {
			cleanTextField.focus();
			cleanTextField.select();
		})
		.catch((err) => {
			const msg = err instanceof Error ? err.message : String(err);
			console.error("Could not copy text: ", msg);
		});
}
