<script lang="ts">
  import { onMount } from 'svelte';

  export let questionId: string | number;

  let showComments = false;
  let isLoading = false;
  let discussionContainer: HTMLElement;
  
  // Unique ID for this component instance to avoid conflicts with multiple instances
  const uniqueId = `giscus-${questionId}-${Math.random().toString(36).substr(2, 9)}`;

  function loadComments() {
    showComments = true;
    isLoading = true;

    // Small delay to ensure container is rendered
    setTimeout(() => {
      if (!discussionContainer) return;

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

      script.onload = () => {
        isLoading = false;
      };

      discussionContainer.innerHTML = ''; // Clear previous if any
      discussionContainer.appendChild(script);
    }, 50);
  }

  // Cleanup on destroy to prevent memory leaks
  onMount(() => {
    return () => {
      if (discussionContainer) {
        discussionContainer.innerHTML = '';
      }
    };
  });
</script>

<div class="w-full border-t border-white/10 pt-4 mt-4">
  {#if !showComments}
    <button
      on:click={loadComments}
      class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
      Ver Discusión / Comentarios
    </button>
  {:else}
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Discusión en vivo
        </h3>
        {#if isLoading}
          <span class="text-xs opacity-50">Cargando...</span>
        {/if}
      </div>

      <div
        id={uniqueId}
        class="giscus min-h-[100px] bg-black/20 rounded-lg p-2"
        bind:this={discussionContainer}
      ></div>
    </div>
  {/if}
</div>
