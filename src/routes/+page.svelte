<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { readStoredValue, writeStoredValue } from "#lib/storage.ts";
  import { cleanText, copyText, normalizeLineEndings } from "#lib/utils.ts";

  let diacsCheck = $state(true);
  let extrasCheck = $state(false);
  let lowercaseCheck = $state(false);

  let origTextInput = $state("");
  let cleanTextOutput = $derived(cleanText(origTextInput, diacsCheck, extrasCheck, lowercaseCheck));

  let copyStatus = $state<"copying" | "waiting" | "success" | "error" | null>(null);
  let copyStatusTimer: ReturnType<typeof setTimeout> | undefined;
  let copyAttempt = 0;

  $effect(() => {
    // Track output changes so feedback only describes current text
    void cleanTextOutput;
    copyAttempt++;
    copyStatus = null;
    if (copyStatusTimer) {
      clearTimeout(copyStatusTimer);
      copyStatusTimer = undefined;
    }
  });

  function setInput(): void {
    writeStoredValue("origTextInput", origTextInput);
  }

  async function insertText(target: HTMLTextAreaElement, text: string): Promise<void> {
    text = normalizeLineEndings(text);
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    origTextInput = target.value.slice(0, selectionStart) + text + target.value.slice(selectionEnd);
    setInput();

    await tick();
    target.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
  }

  async function handlePaste(event: ClipboardEvent): Promise<void> {
    const text = event.clipboardData?.getData("text/plain");
    const target = event.currentTarget;
    if (!text || !(target instanceof HTMLTextAreaElement)) {
      return;
    }

    event.preventDefault();
    await insertText(target, text);
  }

  async function handleCopy(): Promise<void> {
    if (cleanTextOutput.length === 0) {
      return;
    }

    if (copyStatusTimer) {
      clearTimeout(copyStatusTimer);
    }

    const attempt = ++copyAttempt;
    copyStatus = "copying";
    copyStatusTimer = setTimeout(() => {
      copyStatus = "waiting";
      copyStatusTimer = undefined;
    }, 5000);

    const success = await copyText(cleanTextOutput);
    if (attempt !== copyAttempt) return;

    if (copyStatusTimer) {
      clearTimeout(copyStatusTimer);
    }
    copyStatus = success ? "success" : "error";

    copyStatusTimer = setTimeout(() => {
      copyStatus = null;
      copyStatusTimer = undefined;
    }, 2000);
  }

  onMount(() => {
    diacsCheck = readStoredValue("diacsCheck") !== "false";
    extrasCheck = readStoredValue("extrasCheck") === "true";
    lowercaseCheck = readStoredValue("lowercaseCheck") === "true";

    origTextInput = readStoredValue("origTextInput") || "";
  });

  onDestroy(() => {
    copyAttempt++;
    if (copyStatusTimer) {
      clearTimeout(copyStatusTimer);
    }
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
      onchange={() => {
        writeStoredValue("diacsCheck", diacsCheck.toString());
      }}
      class="h-5 w-5 md:h-4 md:w-4"
      id="diacs-check"
    /><label for="diacs-check">Fix ṡ, ż</label>
  </div>

  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      bind:checked={extrasCheck}
      onchange={() => {
        writeStoredValue("extrasCheck", extrasCheck.toString());
      }}
      class="h-5 w-5 md:h-4 md:w-4"
      id="extras-check"
    /><label for="extras-check">Extras</label>
  </div>

  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      bind:checked={lowercaseCheck}
      onchange={() => {
        writeStoredValue("lowercaseCheck", lowercaseCheck.toString());
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
    onchange={setInput}
    onpaste={handlePaste}
    rows="8"
    class="w-full rounded border border-gray-300 bg-gray-50 p-2"
    id="orig-text-input"></textarea>
</div>

<div class="mb-3 flex text-lg text-gray-50 md:text-base">
  <div class="mr-4">
    <button
      onclick={() => {
        origTextInput = "";
        setInput();
      }}
      class="cursor-pointer rounded bg-blue-600 px-2 py-1">Clear</button
    >
  </div>

  <div>
    <button
      onclick={() => {
        origTextInput = cleanTextOutput;
        setInput();
      }}
      class="cursor-pointer rounded bg-teal-700 px-2 py-1">Cycle</button
    >
  </div>
</div>

<div class="mb-1"><label for="clean-text-output">Output:</label></div>
<div class="mb-1">
  <textarea
    value={cleanTextOutput}
    readonly
    autocomplete="off"
    rows="8"
    class="w-full rounded border border-gray-300 bg-gray-50 p-2"
    id="clean-text-output"></textarea>
</div>

<div class="mb-2 flex items-center gap-3 text-lg md:text-base">
  <button onclick={handleCopy} class="cursor-pointer rounded bg-blue-600 px-2 py-1 text-gray-50"
    >Copy</button
  >
  <span role="status">
    {#if copyStatus === "copying"}
      Copying…
    {:else if copyStatus === "waiting"}
      Still waiting for the browser. Try Copy again.
    {:else if copyStatus === "success"}
      <span class="text-green-700">Copied</span>
    {:else if copyStatus === "error"}
      <span class="text-red-700">Copy failed</span>
    {/if}
  </span>
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
        ? "0"
        : String(cleanTextOutput.replace(/\s{2,}/g, " ").split(/\s/g).length)}</span
    >
  </div>

  <div class="flex items-baseline space-x-2">
    <span>Paragraphs:</span><span class="font-mono text-lg text-pink-600"
      >{cleanTextOutput.length === 0 ? "0" : String(cleanTextOutput.split("\n\n").length)}</span
    >
  </div>
</div>
