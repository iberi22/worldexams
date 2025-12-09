<script lang="ts">
  import { onMount } from 'svelte';

  export let questionId: string | number;

  let discussionContainer: HTMLElement;

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'iberi22/saberparatodos');
    script.setAttribute('data-repo-id', 'R_kgDOQdUufA');
    script.setAttribute('data-category', 'Q&A');
    script.setAttribute('data-category-id', 'DIC_kwDOQdUufM4CzG1i');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', `Question ${questionId}`);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    discussionContainer.appendChild(script);
  });
</script>

<div class="w-full border-t border-white/10 pt-6 mt-6">
  <h3 class="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6 flex items-center">
    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
    Discusión
  </h3>

  <div class="giscus" bind:this={discussionContainer}></div>
</div>
