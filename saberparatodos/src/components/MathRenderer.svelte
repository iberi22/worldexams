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
  // Improved inline math regex: Must not be preceded/followed by digits (unless space) to avoid currency collisions
  // and allows for more robust content capture
  const INLINE_MATH_REGEX = /(?<![\d\w])\$([^\$\n]+?)\$(?![\d\w])/g;

  /**
   * Render LaTeX math expressions within the content
   */
  function renderMath(text: string): string {
    if (!text) return '';

    // Trim input to remove leading/trailing whitespace/newlines
    let result = text.trim();

    // 🎥 Multimedia Parsers (English Protocol v3.0)
    // 1. YouTube: {{youtube:ID}} -> iframe
    result = result.replace(
      /\{\{youtube:([a-zA-Z0-9_-]+)\}\}/g,
      '<div class="relative w-full aspect-video my-4 rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black"><iframe src="https://www.youtube.com/embed/$1" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );

    // 2. Audio: {{audio:URL}} -> HTML5 Audio
    result = result.replace(
      /\{\{audio:(https?:\/\/[^\}]+)\}\}/g,
      '<div class="my-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg></div><audio controls src="$1" class="w-full bg-transparent" style="height: 32px;"></audio></div>'
    );

    // First handle block math ($$...$$)
    result = result.replace(BLOCK_MATH_REGEX, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
          errorColor: '#ef4444',
          strict: false,
          trust: true
        });
      } catch (e) {
        console.warn('KaTeX block error:', e);
        return `<span class="text-red-400 font-mono text-sm">${match}</span>`;
      }
    });

    // Then handle inline math ($...$)
    result = result.replace(INLINE_MATH_REGEX, (match, latex) => {
      try {
        // Remove trailing punctuation like period or comma inside LaTeX if it was accidentally captured
        let cleanLatex = latex.trim();
        const trailingPunctuation = /[.,;:]+$/.exec(cleanLatex);
        let suffix = '';
        if (trailingPunctuation) {
          suffix = trailingPunctuation[0];
          cleanLatex = cleanLatex.slice(0, -suffix.length).trim();
        }

        const rendered = katex.renderToString(cleanLatex, {
          displayMode: false,
          throwOnError: false,
          errorColor: '#ef4444',
          strict: false,
          trust: true
        });
        return rendered + suffix;
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

    // Handle Headers (#, ##, ###) - Consume trailing newline to avoid extra <br>
    result = result.replace(/^### (.+)(\n|$)/gm, '<h5 class="text-sm font-bold text-white mt-1 mb-0.5">$1</h5>');
    result = result.replace(/^## (.+)(\n|$)/gm, '<h4 class="text-base font-bold text-emerald-300 mt-2 mb-1">$1</h4>');
    result = result.replace(/^# (.+)(\n|$)/gm, '<h3 class="text-lg font-bold text-emerald-400 mt-3 mb-1.5">$1</h3>');

    // Handle Blockquotes (> text)
    result = result.replace(/^> ### (.+)(\n|$)/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-1 bg-emerald-900/10"><h5 class="text-sm font-bold text-emerald-400">$1</h5></blockquote>');
    result = result.replace(/^> \*\*(.+?)\*\*:?\s*(.*)(\n|$)/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-1 bg-emerald-900/10"><strong class="text-emerald-400">$1</strong>: $2</blockquote>');
    result = result.replace(/^> (.+)(\n|$)/gm, '<blockquote class="border-l-4 border-emerald-500/50 pl-4 py-1 my-1 bg-emerald-900/10 italic text-gray-300">$1</blockquote>');

    // Merge consecutive blockquotes into single blocks
    result = result.replace(/<\/blockquote>\s*<blockquote class="[^"]*">/g, '<br>');

    // Handle line breaks AFTER all line-dependent parsing is done
    // Replace newlines with <br>, but avoid creating them at the very end
    result = result.replace(/\n/g, '<br>');

    // Clean up multiple consecutive <br> tags
    result = result.replace(/(<br>\s*){3,}/g, '<br><br>');

    // Remove <br> that might have wound up after block elements despite best efforts
    result = result.replace(/(<\/h[1-6]>)\s*<br>/g, '$1');
    result = result.replace(/(<\/blockquote>)\s*<br>/g, '$1');
    result = result.replace(/(<hr[^>]*>)\s*<br>/g, '$1');
    result = result.replace(/(<\/div>)\s*<br>/g, '$1');

    // Final trim to ensure no trailing BRs were created or left
    if (result.endsWith('<br>')) {
        result = result.slice(0, -4);
    }
    if (result.endsWith('<br><br>')) {
        result = result.slice(0, -8);
    }

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
