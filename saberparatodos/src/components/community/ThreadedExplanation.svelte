<script lang="ts">
  import { onMount } from 'svelte';
  import {
    buildThreadTree,
    sanitizeContent,
    hasEmailPII,
    type ThreadReply,
  } from './thread-helpers';

  interface Props {
    explanationId: string;
    questionId?: string;
    explanationContent?: string;
    authorHash?: string;
  }

  let {
    explanationId,
    questionId = '',
    explanationContent = '',
    authorHash = ''
  }: Props = $props();

  // State
  let replies = $state<ThreadReply[]>([]);
  let isLoading = $state(false);
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Form State
  let activeReplyToId = $state<string | null>(null);
  let replyContent = $state('');
  let isSubmitting = $state(false);
  let userNodeHash = $state('');

  function getOrGenerateNodeHash(): string {
    if (typeof window === 'undefined') return 'node-anon-local';
    let stored = localStorage.getItem('swal_voter_node_hash');
    if (!stored) {
      stored = 'node-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('swal_voter_node_hash', stored);
    }
    return stored;
  }

  let threadedReplies = $derived(buildThreadTree(replies));
  let totalRepliesCount = $derived(replies.length);

  async function loadReplies() {
    if (!explanationId) return;
    isLoading = true;
    errorMessage = null;

    try {
      const res = await fetch(`/api/replies?explanation_id=${encodeURIComponent(explanationId)}`);
      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.replies)) {
        replies = data.replies;
      } else {
        replies = [];
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al cargar réplicas';
      errorMessage = msg;
      replies = [];
    } finally {
      isLoading = false;
    }
  }

  function openReplyForm(targetReplyId: string | null) {
    activeReplyToId = targetReplyId;
    replyContent = '';
    errorMessage = null;
    successMessage = null;
  }

  function closeReplyForm() {
    activeReplyToId = null;
    replyContent = '';
  }

  async function submitReply(e: SubmitEvent) {
    e.preventDefault();
    errorMessage = null;
    successMessage = null;

    const sanitized = sanitizeContent(replyContent);

    if (sanitized.length < 20) {
      errorMessage = 'La réplica debe tener al menos 20 caracteres.';
      return;
    }

    if (sanitized.length > 2000) {
      errorMessage = 'La réplica no puede superar los 2000 caracteres.';
      return;
    }

    if (hasEmailPII(sanitized)) {
      errorMessage = 'No se permiten direcciones de correo u otros datos de contacto (PII).';
      return;
    }

    isSubmitting = true;

    try {
      const payload = {
        explanation_id: explanationId,
        content: sanitized,
        node_hash: userNodeHash || getOrGenerateNodeHash(),
        parent_reply_id: activeReplyToId,
      };

      const res = await fetch('/api/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al publicar la réplica.');
      }

      successMessage = 'Réplica publicada con éxito.';
      closeReplyForm();
      await loadReplies();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al enviar la réplica';
      errorMessage = msg;
    } finally {
      isSubmitting = false;
    }
  }

  function formatAuthor(hash: string): string {
    if (!hash) return 'Nodo Anónimo';
    if (hash.length > 14) {
      return hash.slice(0, 8) + '...' + hash.slice(-4);
    }
    return hash;
  }

  onMount(() => {
    userNodeHash = getOrGenerateNodeHash();
    loadReplies();
  });
</script>

<div class="threaded-explanation-root bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl text-zinc-100 font-sans">
  {#if explanationContent}
    <div class="mb-5 pb-5 border-b border-zinc-800/70">
      <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
        <span class="font-mono bg-zinc-800/80 text-emerald-400 px-2 py-0.5 rounded">
          Explicación principal
        </span>
        {#if authorHash}
          <span class="font-mono text-zinc-500">Por: {formatAuthor(authorHash)}</span>
        {/if}
      </div>
      <p class="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-line">
        {explanationContent}
      </p>
    </div>
  {/if}

  <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
    <div class="flex items-center gap-2">
      <h4 class="text-sm md:text-base font-semibold text-emerald-400 flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Hilo de Discusión
      </h4>
      <span class="text-xs bg-zinc-800 text-zinc-300 font-mono px-2 py-0.5 rounded-full" data-testid="replies-count">
        {totalRepliesCount} {totalRepliesCount === 1 ? 'réplica' : 'réplicas'}
      </span>
    </div>

    <button
      type="button"
      class="text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
      onclick={() => openReplyForm(null)}
      data-testid="btn-reply-root"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Añadir respuesta al hilo
    </button>
  </div>

  {#if errorMessage}
    <div class="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center justify-between">
      <span>{errorMessage}</span>
      <button type="button" class="text-red-400 hover:text-red-200 ml-2" onclick={() => (errorMessage = null)}>✕</button>
    </div>
  {/if}

  {#if successMessage}
    <div class="p-3 mb-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between">
      <span>{successMessage}</span>
      <button type="button" class="text-emerald-400 hover:text-emerald-200 ml-2" onclick={() => (successMessage = null)}>✕</button>
    </div>
  {/if}

  {#if activeReplyToId === null}
    <div class="mb-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800" data-testid="root-reply-form">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-emerald-400">Tu aporte al hilo (20-2000 caracteres)</span>
        <button type="button" class="text-xs text-zinc-400 hover:text-zinc-200" onclick={closeReplyForm}>Cancelar</button>
      </div>
      <form onsubmit={submitReply} class="space-y-3">
        <textarea
          bind:value={replyContent}
          rows="3"
          placeholder="Escribe tu argumento, profundización o contraejemplo pedagógico (sin emails ni enlaces personales)..."
          class="w-full bg-zinc-950 border border-zinc-700/70 rounded-lg p-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-y"
          data-testid="textarea-reply"
        ></textarea>
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-zinc-500">
            {replyContent.trim().length} / 2000 chars
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              class="px-3 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              onclick={closeReplyForm}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || replyContent.trim().length < 20}
              class="px-3 py-1 text-xs rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition"
              data-testid="btn-submit-reply"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  {/if}

  {#if isLoading && replies.length === 0}
    <div class="py-6 text-center text-xs text-zinc-400 font-mono">
      Cargando árbol de discusión...
    </div>
  {:else if replies.length === 0}
    <div class="py-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800/80 rounded-xl">
      No hay réplicas aún. Sé el primero en enriquecer este hilo colaborativo.
    </div>
  {:else}
    <div class="replies-tree space-y-3" data-testid="replies-tree">
      {#snippet renderNode(node: ThreadReply)}
        <div
          class="reply-item group relative transition-all rounded-xl p-3 bg-zinc-900/60 border border-zinc-800/70 hover:border-zinc-700/80"
          style={`margin-left: ${(node.depth ?? 0) * 16}px`}
          data-reply-id={node.id}
          data-depth={node.depth ?? 0}
        >
          {#if (node.depth ?? 0) > 0}
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/30 rounded-l-xl"></div>
          {/if}

          <div class="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[11px] text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">
                {formatAuthor(node.node_hash)}
              </span>
              {#if (node.depth ?? 0) > 0}
                <span class="text-[10px] font-mono text-zinc-500">
                  nivel {node.depth}
                </span>
              {/if}
            </div>
            <div class="flex items-center gap-3">
              {#if node.created_at}
                <span class="text-[11px] text-zinc-500">
                  {new Date(node.created_at).toLocaleDateString()}
                </span>
              {/if}
              <button
                type="button"
                class="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                onclick={() => openReplyForm(node.id)}
                data-testid={`btn-reply-to-${node.id}`}
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Responder
              </button>
            </div>
          </div>

          <p class="text-xs md:text-sm text-zinc-200 leading-relaxed whitespace-pre-line pl-1">
            {node.content}
          </p>

          {#if activeReplyToId === node.id}
            <div class="mt-3 pt-3 border-t border-zinc-800/80" data-testid={`inline-reply-form-${node.id}`}>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[11px] font-medium text-emerald-400">
                  Respondiendo a {formatAuthor(node.node_hash)}
                </span>
                <button type="button" class="text-[11px] text-zinc-400 hover:text-zinc-200" onclick={closeReplyForm}>
                  ✕ Cancelar
                </button>
              </div>
              <form onsubmit={submitReply} class="space-y-2">
                <textarea
                  bind:value={replyContent}
                  rows="2"
                  placeholder="Tu respuesta (20-2000 caracteres, sin PII)..."
                  class="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-y"
                  data-testid="textarea-inline-reply"
                ></textarea>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-zinc-500">
                    {replyContent.trim().length} / 2000 chars
                  </span>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      class="px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-300"
                      onclick={closeReplyForm}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || replyContent.trim().length < 20}
                      class="px-2 py-0.5 text-xs rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar respuesta'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          {/if}
        </div>

        {#if node.replies && node.replies.length > 0}
          {#each node.replies as child (child.id)}
            {@render renderNode(child)}
          {/each}
        {/if}
      {/snippet}

      {#each threadedReplies as rootNode (rootNode.id)}
        {@render renderNode(rootNode)}
      {/each}
    </div>
  {/if}
</div>
