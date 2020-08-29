<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div in:fade>

  <h2>What does this do?</h2>

  <p>
    By default, this script will normalize the input text to Unicode form NFC;
    trim outside whitespace; replace two annoying diacritics specific to the
    romanization of Persian (this can be disabled); remove any remaining
    combining diacritics (none should be present after NFC normalization);
    replace any unusual horizontal space character (including tab) with a normal
    space; reduce any instance of multiple spaces to one; remove any space
    before a line break; reduce any instance of multiple empty lines to one; and
    replace any non-breaking hyphen or figure dash with a normal hyphen.
  </p>

  <p>
    With “extras” enabled, this will further replace single or double curly
    quotes with their straight equivalents; and replace any en or em dash with
    two or three normal hyphens, respectively.
  </p>

  <p>
    Naïve counts of characters, words, and paragraphs (where separated by an
    empty line) are given for the cleaned output text.
  </p>

  <p>Other features may be added over time, as they occur to me.</p>

  <hr />

  <p>
    A plague year diversion of
    <a href="https://www.theobeers.com/" rel="noopener">Theo Beers</a>
    <br />
    <em>Last updated 29 Aug. 2020</em>
  </p>

</div>
