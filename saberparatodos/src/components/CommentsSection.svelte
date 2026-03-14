<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { countryConfig } from '../config';
  import { supabase } from '../lib/supabase';
  import MathRenderer from './MathRenderer.svelte';

  let { questionId } = $props();

  let showComments = $state(true); // 🆕 Show input by default
  let showGiscus = $state(false);
  let pendingComment = $state(false); // To show "Sent for moderation" message
  let isLoading = $state(false);
  let isPosting = $state(false);
  let dbComments = $state<any[]>([]);
  let newCommentContent = $state('');
  let discussionContainer = $state<HTMLElement | null>(null);

  // Giscus configuration from country config or defaults

  const giscusConfig = {
    repo: 'worldexams/worldexams',
    repoId: 'R_kgDONXw98Q',
    category: 'Announcements',
    categoryId: 'DIC_kwDONXw98c4Ckz9-',
    ...countryConfig?.giscus
  };

  // Unique ID for this component instance
  const uniqueId = `giscus-${questionId}-${Math.random().toString(36).substring(2, 9)}`;

  async function fetchDbComments() {
    try {
      const res = await fetch(`/api/comments?questionId=${questionId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      
      const { comments } = await res.json();
      dbComments = comments || [];

      // If there are comments, show the section by default
      if (dbComments.length > 0) {
        showComments = true;
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }

  async function postComment() {
    if (!newCommentContent.trim() || isPosting) return;

    isPosting = true;
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          content: newCommentContent,
          userName: user?.user_metadata?.user_name || user?.email?.split('@')[0] || 'Anónimo',
          userId: user?.id || null
        })
      });

      if (!res.ok) throw new Error('Failed to post');

      // Comment is now pending moderation, so we don't add it to dbComments immediately
      newCommentContent = '';
      pendingComment = true; // Show feedback
      setTimeout(() => { pendingComment = false; }, 5000); 
      // We don't fetch comments immediately because the new one is pending approval
      // The user will see the pending message instead.
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      isPosting = false;
    }
  }

  function loadGiscus() {
    showGiscus = true;
    isLoading = true;

    // Small delay to ensure container is rendered
    setTimeout(() => {
      if (!discussionContainer) return;

      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', giscusConfig.repo);
      script.setAttribute('data-repo-id', giscusConfig.repoId);
      script.setAttribute('data-category', giscusConfig.category);
      script.setAttribute('data-category-id', giscusConfig.categoryId);
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

      discussionContainer.innerHTML = '';
      discussionContainer.appendChild(script);
    }, 50);
  }

  onMount(() => {
    fetchDbComments();
  });

  // Cleanup to prevent memory leaks
  onDestroy(() => {
    if (discussionContainer) {
      discussionContainer.innerHTML = '';
    }
  });
</script>

<div class="w-full border-t border-white/5 pt-4 mt-6 group">
  {#if pendingComment}
    <div 
      transition:fade
      class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-200 text-[10px] flex items-center gap-2 mb-4 animate-in fade-in zoom-in-95 duration-300"
    >
      <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Tu comentario ha sido enviado y está pendiente de moderación.
    </div>
  {/if}

  <!-- DB Comments Header / Toggle -->
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-3">
      <h3 class="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
        {#if dbComments.length > 0}
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Discusión ({dbComments.length})
        {:else}
          <span class="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
          Comentarios
        {/if}
      </h3>
      {#if !showComments}
         <button
           onclick={() => showComments = true}
           class="text-[10px] text-emerald-500/60 hover:text-emerald-500 uppercase tracking-widest transition-colors"
         >
           Ver Todo
         </button>
      {/if}
    </div>

    <button
      onclick={loadGiscus}
      class={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${showGiscus ? 'text-emerald-500' : 'text-white/20 hover:text-white/40'}`}
    >
       GitHub Discussion
    </button>
  </div>

  {#if showComments || dbComments.length > 0}
    <div class="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <!-- Comment List -->
      {#if dbComments.length > 0}
        <div class="space-y-3">
          {#each dbComments as comm}
            <div class="p-4 bg-white/[0.03] border border-white/5 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">{comm.user_name}</span>
                <span class="text-[9px] text-white/20">{new Date(comm.created_at).toLocaleDateString()}</span>
              </div>
              <div class="text-sm text-white/70 leading-relaxed font-sans">
                <MathRenderer content={comm.content} />
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Add Comment Form -->
      <div class="space-y-2 pt-2 border-t border-white/5">
        <textarea
          bind:value={newCommentContent}
          placeholder="Escribe un comentario o duda sobre esta pregunta..."
          class="w-full h-20 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-emerald-500/40 focus:outline-none resize-none transition-all"
        ></textarea>
        <div class="flex justify-end">
          <button
            onclick={postComment}
            disabled={!newCommentContent.trim() || isPosting}
            class="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-emerald-500/20 transition-all disabled:opacity-30"
          >
            {isPosting ? 'Publicando...' : 'Publicar Comentario'}
          </button>
        </div>
      </div>

      <!-- Giscus Container (Conditional) -->
      {#if showGiscus}
        <div class="pt-6 border-t border-white/5 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-[9px] font-bold uppercase tracking-widest text-emerald-500/60">Hilo Social (Giscus)</h4>
            <button onclick={() => showGiscus = false} class="text-[9px] text-white/20 hover:text-white/50">Cerrar Giscus</button>
          </div>
          <div
            id={uniqueId}
            class="giscus min-h-[100px] bg-black/40 rounded-xl p-4 ring-1 ring-white/5"
            bind:this={discussionContainer}
          >
            {#if isLoading}
              <div class="flex items-center justify-center py-10">
                 <div class="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {:else}
     <button
      onclick={() => showComments = true}
      class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-emerald-500 transition-all"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
      {isLoading ? 'Abriendo...' : 'Escribir Comentario / Discusión'}
    </button>
  {/if}
</div>
