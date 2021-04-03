<script lang="ts">
  import { fade } from "svelte/transition";
  import { cleanText, copyText } from "./utils.svelte";

  import Info from "Info.svelte";

  let info = window.location.hash === "#info" ? true : false;

  let diacsCheck = true;
  let extrasCheck = false;

  let origTextInput = "";

  let cleanTextField: HTMLTextAreaElement;
  $: cleanTextOutput = cleanText(origTextInput, diacsCheck, extrasCheck);
</script>

<svelte:head>
  <meta
    name="description"
    content="Clean text to prepare for pasting into a document"
  />

  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />

  <title>Clean text for pasting</title>
</svelte:head>

<main>
  <div id="infoButton">
    <button on:click={() => (info = !info)}>
      {#if !info}Show info{:else}Return to utility{/if}
    </button>
  </div>

  <h1>Clean text for pasting</h1>

  {#if !info}
    <div in:fade>
      <div id="checkboxes">
        <div>
          <input type="checkbox" id="diacsCheck" bind:checked={diacsCheck} />
          <label for="diacsCheck" class="checkboxLabel">Fix ṡ, ż</label>
        </div>

        <div>
          <input type="checkbox" id="extrasCheck" bind:checked={extrasCheck} />
          <label for="extrasCheck" class="checkboxLabel">Extras</label>
        </div>
      </div>

      <div>
        <label for="origTextInput" class="textareaLabel">Input:</label>
        <textarea bind:value={origTextInput} id="origTextInput" rows="4" />
      </div>

      <div><button on:click={() => (origTextInput = "")}>Clear</button></div>

      <div>
        <label for="cleanTextOutput" class="textareaLabel">Output:</label>
        <textarea
          bind:this={cleanTextField}
          bind:value={cleanTextOutput}
          readonly
          autocomplete="off"
          id="cleanTextOutput"
          rows="4"
        />
      </div>

      <div>
        <button on:click={() => copyText(cleanTextField, cleanTextOutput)}>
          Copy
        </button>
      </div>

      <div id="counts">
        <div class="count">
          Characters:
          <code>{String(cleanTextOutput.length)}</code>
        </div>

        <div class="count">
          Words:
          <code>
            {cleanTextOutput.length === 0
              ? "0"
              : String(
                  cleanTextOutput.replace(/\s{2,}/gm, " ").split(/\s/gm).length
                )}
          </code>
        </div>

        <div class="count">
          Paragraphs:
          <code>
            {cleanTextOutput.length === 0
              ? "0"
              : String(cleanTextOutput.split("\n\n").length)}
          </code>
        </div>
      </div>
    </div>
  {:else}
    <Info />
  {/if}
</main>

<style>
  main {
    max-width: 72ch;
    padding: 2ch;
    margin: auto;
    font-family: "Noto Serif", serif;
  }
  button {
    margin-bottom: 1em;
    background-color: #006fe6;
    color: #fff;
    border-radius: 0.25rem;
    border-color: #006fe6;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  button:hover,
  button:focus {
    background-color: #005ec2;
    border-color: #005ec2;
  }
  button:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }
  code {
    font-size: 150%;
    color: #e83e8c;
    margin-right: 1em;
  }
  h1 {
    margin-top: -0.3em;
  }
  textarea {
    width: 100%;
    border-radius: 0.25rem;
  }
  .checkboxLabel {
    display: inline-block;
    margin-right: 1em;
  }
  .count {
    margin-bottom: 0.4em;
  }
  .textareaLabel {
    margin-bottom: 0.4em;
  }
  #checkboxes {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0.6em;
  }
  #counts {
    display: flex;
    flex-flow: row wrap;
  }
  #infoButton {
    display: flex;
    justify-content: flex-end;
    font-size: small;
  }
</style>
