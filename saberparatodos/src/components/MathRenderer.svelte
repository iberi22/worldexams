<script lang="ts">
  import { onMount } from 'svelte';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  export let content: string = '';
  export let className: string = '';

  let container: HTMLElement;
  let renderedHTML: string = '';

  // Regex patterns for LaTeX
  const BLOCK_MATH_REGEX = /\$\$([\s\S]*?)\$\$/g;
  const INLINE_MATH_REGEX = /\$([^\$\n]+?)\$/g;

  /**
   * Render LaTeX math expressions within the content
   */
  function renderMath(text: string): string {
    if (!text) return '';

    let result = text;

    // First handle block math ($$...$$)
    result = result.replace(BLOCK_MATH_REGEX, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
          errorColor: '#ef4444',
          strict: false,
          trust: true,
          macros: {
            "\\frac": "\\frac",
            "\\sqrt": "\\sqrt",
            "\\cdot": "\\cdot",
            "\\times": "\\times",
            "\\div": "\\div",
            "\\pm": "\\pm",
            "\\neq": "\\neq",
            "\\leq": "\\leq",
            "\\geq": "\\geq",
            "\\rightarrow": "\\rightarrow",
            "\\pi": "\\pi"
          }
        });
      } catch (e) {
        console.warn('KaTeX block error:', e);
        return `<span class="text-red-400 font-mono text-sm">${match}</span>`;
      }
    });

    // Then handle inline math ($...$)
    result = result.replace(INLINE_MATH_REGEX, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), {
          displayMode: false,
          throwOnError: false,
          errorColor: '#ef4444',
          strict: false,
          trust: true
        });
      } catch (e) {
        console.warn('KaTeX inline error:', e);
        return `<span class="text-red-400 font-mono text-sm">${match}</span>`;
      }
    });

    // Handle markdown bold (**text**)
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Handle markdown italic (*text* or _text_)
    result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Handle horizontal rules (---) - BEFORE newline conversion
    result = result.replace(/^---$/gm, '<hr class="my-4 border-white/10">');

    // Handle Headers (#, ##, ###) - BEFORE newline conversion
    // These need line boundaries to work correctly
    result = result.replace(/^### (.+)$/gm, '<h5 class="text-sm font-bold text-white mt-2 mb-1">$1</h5>');
    result = result.replace(/^## (.+)$/gm, '<h4 class="text-base font-bold text-emerald-300 mt-3 mb-2">$1</h4>');
    result = result.replace(/^# (.+)$/gm, '<h3 class="text-lg font-bold text-emerald-400 mt-4 mb-2">$1</h3>');

    // Handle Blockquotes (> text) - BEFORE newline conversion
    // Also handle blockquotes that contain headers (> ### ...)
    result = result.replace(/^> ### (.+)$/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-2 bg-emerald-900/10"><h5 class="text-sm font-bold text-emerald-400">$1</h5></blockquote>');
    result = result.replace(/^> \*\*(.+?)\*\*:?\s*(.*)$/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-2 bg-emerald-900/10"><strong class="text-emerald-400">$1</strong>: $2</blockquote>');
    result = result.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-2 bg-emerald-900/10 italic text-gray-300">$1</blockquote>');

    // Merge consecutive blockquotes into single blocks
    result = result.replace(/<\/blockquote>\s*<blockquote class="[^"]*">/g, '<br>');

    // Handle line breaks AFTER all line-dependent parsing is done
    result = result.replace(/\n/g, '<br>');

    // Clean up multiple consecutive <br> tags
    result = result.replace(/(<br>\s*){3,}/g, '<br><br>');

    return result;
  }

  $: renderedHTML = renderMath(content);
</script>

<svelte:head>
  <style>
    /* Custom KaTeX styling for dark theme */
    .katex {
      font-size: 1.1em;
      color: inherit;
    }
    .katex-display {
      margin: 1em 0;
      padding: 0.5em;
      background: rgba(16, 185, 129, 0.05);
      border-radius: 0.5rem;
      overflow-x: auto;
    }
    .katex-display > .katex {
      text-align: center;
    }
    .katex .mord,
    .katex .mbin,
    .katex .mrel,
    .katex .mopen,
    .katex .mclose,
    .katex .mpunct,
    .katex .minner {
      color: inherit;
    }
    .katex .mfrac .frac-line {
      border-color: currentColor !important;
    }
  </style>
</svelte:head>

<span class={`math-content ${className}`} bind:this={container}>
  {@html renderedHTML}
</span>

<style>
  .math-content :global(.katex-display) {
    margin: 0.75em 0;
    padding: 0.75em 1em;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.1);
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  .math-content :global(.katex) {
    font-size: 1.05em;
  }

  .math-content :global(strong) {
    font-weight: 600;
    color: #10b981;
  }

  .math-content :global(em) {
    font-style: italic;
    opacity: 0.9;
  }

  .math-content :global(hr) {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
</style>
