<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { countryConfig } from '../config';
  import { supabase } from '../lib/supabase';
  import MathRenderer from './MathRenderer.svelte';

  let { questionId } = $props();

  let showComments = $state(true);
  let showGiscus = $state(false);
  let pendingComment = $state(false);
  let isLoading = $state(false);
  let isPosting = $state(false);
  let dbComments = $state<any[]>([]);
  let newCommentContent = $state('');
  let selectedRole = $state<'student' | 'teacher' | 'contributor'>('student');
  let selectedContributionType = $state<'doubt' | 'alternative' | 'tip' | 'general'>('doubt');
  let activeFilter = $state<'all' | 'teacher' | 'student'>('all');
  let discussionContainer = $state<HTMLElement | null>(null);

  const roles = [
    { id: 'student', label: '🎓 Estudiante', desc: 'Dudas y aprendizaje' },
    { id: 'teacher', label: '🧑‍🏫 Docente / Mentor', desc: 'Explicación pedagógica' },
    { id: 'contributor', label: '💡 Contribuidor', desc: 'Rigor y mejoras' }
  ] as const;

  const contributionTypes = [
    { id: 'doubt', label: '❓ Duda o Consulta' },
    { id: 'alternative', label: '✨ Método Alternativo' },
    { id: 'tip', label: '💡 Tip / Mnemotecnia' },
    { id: 'general', label: '💬 Discusión General' }
  ] as const;

  const giscusConfig = {
    repo: 'worldexams/worldexams',
    repoId: 'R_kgDONXw98Q',
    category: 'Announcements',
    categoryId: 'DIC_kwDONXw98c4Ckz9-',
    ...countryConfig?.giscus
  };
  const giscusLang = countryConfig.giscus?.lang || countryConfig.language?.split('-')[0] || 'es';
  const uniqueId = `giscus-${questionId}-${Math.random().toString(36).substring(2, 9)}`;

  async function fetchDbComments() {
    try {
      const res = await fetch(`/api/comments?questionId=${questionId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');

      const { comments } = await res.json();
      dbComments = comments || [];
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
          userName: user?.user_metadata?.user_name || user?.email?.split('@')[0] || (selectedRole === 'teacher' ? 'Docente Colega' : 'Estudiante'),
          userId: user?.id || null,
          role: selectedRole,
          contributionType: selectedContributionType
        })
      });

      if (!res.ok) throw new Error('Failed to post');

      newCommentContent = '';
      pendingComment = true;
      setTimeout(() => { pendingComment = false; }, 5000);
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      isPosting = false;
    }
  }

  function loadGiscus() {
    showGiscus = true;
    isLoading = true;

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
      script.setAttribute('data-lang', giscusLang);
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

  onDestroy(() => {
    if (discussionContainer) {
      discussionContainer.innerHTML = '';
    }
  });

  let filteredComments = $derived(
    activeFilter === 'all'
      ? dbComments
      : dbComments.filter(c => c.role === activeFilter)
  );
</script>

<div class="w-full border-t border-white/5 pt-4 mt-6 group">
  {#if pendingComment}
    <div
      transition:fade
      class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-200 text-xs flex items-center gap-2 mb-4 animate-in fade-in zoom-in-95 duration-300"
    >
      <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Aporte enviado con éxito. La comunidad docente y de moderación lo aprobará en breve.
    </div>
  {/if}

  <!-- Header / Filters -->
  <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <h4 class="text-xs font-bold uppercase tracking-widest text-white/70">
        Discusión Comunitaria ({dbComments.length})
      </h4>
    </div>

    <!-- Filter Buttons -->
    {#if dbComments.length > 0}
      <div class="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[10px]">
        <button
          type="button"
          onclick={() => activeFilter = 'all'}
          class={`px-2.5 py-1 rounded transition-colors ${activeFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-white/40 hover:text-white/70'}`}
        >
          Todos
        </button>
        <button
          type="button"
          onclick={() => activeFilter = 'teacher'}
          class={`px-2.5 py-1 rounded transition-colors ${activeFilter === 'teacher' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-white/40 hover:text-white/70'}`}
        >
          🧑‍🏫 Docentes
        </button>
        <button
          type="button"
          onclick={() => activeFilter = 'student'}
          class={`px-2.5 py-1 rounded transition-colors ${activeFilter === 'student' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-white/40 hover:text-white/70'}`}
        >
          🎓 Estudiantes
        </button>
      </div>
    {/if}

    <button
      onclick={loadGiscus}
      class={`text-[10px] font-bold uppercase tracking-widest transition-all ${showGiscus ? 'text-emerald-400' : 'text-white/30 hover:text-white/60'}`}
      aria-expanded={showGiscus}
      aria-controls={uniqueId}
    >
      Hilo GitHub
    </button>
  </div>

  <!-- Comments List -->
  {#if filteredComments.length > 0}
    <div class="space-y-3 mb-6">
      {#each filteredComments as comm}
        {@const isTeacher = comm.role === 'teacher'}
        {@const isContributor = comm.role === 'contributor'}
        <div class={`p-4 rounded-xl border transition-all ${
          isTeacher
            ? 'bg-amber-500/5 border-amber-500/20 shadow-sm'
            : isContributor
              ? 'bg-purple-500/5 border-purple-500/20'
              : 'bg-white/[0.03] border-white/5'
        }`}>
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white/90">{comm.user_name || 'Miembro de la Comunidad'}</span>
              {#if isTeacher}
                <span class="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🧑‍🏫 Docente / Mentor
                </span>
              {:else if isContributor}
                <span class="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  💡 Contribuidor
                </span>
              {:else}
                <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  🎓 Estudiante
                </span>
              {/if}

              {#if comm.contribution_type === 'alternative'}
                <span class="text-[9px] text-emerald-400/80 font-mono">· Método alternativo</span>
              {:else if comm.contribution_type === 'tip'}
                <span class="text-[9px] text-yellow-400/80 font-mono">· Tip clave</span>
              {/if}
            </div>
            <span class="text-[9px] text-white/25 font-mono">{new Date(comm.created_at).toLocaleDateString()}</span>
          </div>
          <div class="text-sm text-white/80 leading-relaxed font-sans">
            <MathRenderer content={comm.content} />
          </div>
        </div>
      {/each}
    </div>
  {:else if dbComments.length === 0}
    <div class="text-center py-6 px-4 bg-white/[0.02] border border-dashed border-white/10 rounded-xl mb-4 text-xs text-white/40">
      Sé el primero en abrir el debate pedagógico o aportar una explicación para esta pregunta.
    </div>
  {/if}

  <!-- Add Comment Card -->
  <div class="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <label class="text-[10px] uppercase tracking-widest text-white/50 font-bold">
        Tu rol en la comunidad
      </label>
      <div class="flex items-center gap-1">
        {#each roles as r}
          <button
            type="button"
            onclick={() => selectedRole = r.id}
            class={`px-2.5 py-1 text-[10px] rounded-lg border transition-all ${
              selectedRole === r.id
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold shadow-sm'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'
            }`}
          >
            {r.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-1.5 pt-1">
      <span class="text-[10px] text-white/40 mr-1">Tipo de aporte:</span>
      {#each contributionTypes as ct}
        <button
          type="button"
          onclick={() => selectedContributionType = ct.id}
          class={`px-2 py-0.5 text-[9px] rounded-md transition-all ${
            selectedContributionType === ct.id
              ? 'bg-white/15 text-white font-semibold'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          {ct.label}
        </button>
      {/each}
    </div>

    <textarea
      bind:value={newCommentContent}
      placeholder={
        selectedRole === 'teacher'
          ? 'Explica el método pedagógico, distractor clave o procedimiento para tus estudiantes...'
          : 'Escribe tu duda, paso que no quedó claro o tu método para resolverla...'
      }
      class="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none resize-none transition-all"
    ></textarea>

    <div class="flex items-center justify-between gap-2 pt-1">
      <span class="text-[9px] text-white/30">Soporta LaTeX con \(x^2\)</span>
      <button
        type="button"
        onclick={postComment}
        disabled={!newCommentContent.trim() || isPosting}
        class="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-lg border border-emerald-500/40 transition-all disabled:opacity-30 active:scale-95"
      >
        {isPosting ? 'Publicando...' : 'Publicar Aporte'}
      </button>
    </div>
  </div>

  <!-- Giscus Container -->
  {#if showGiscus}
    <div class="pt-6 border-t border-white/5 space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Hilo Social (Giscus)</h4>
        <button onclick={() => showGiscus = false} class="text-[9px] text-white/30 hover:text-white/60">Cerrar Giscus</button>
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
