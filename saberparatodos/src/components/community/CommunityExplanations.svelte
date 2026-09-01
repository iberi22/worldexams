<script lang="ts">
  import { onMount } from 'svelte';

  interface Explanation {
    id: string;
    question_id: string;
    node_hash: string;
    content: string;
    vote_count: number;
    status?: string;
    created_at?: string;
  }

  // Props
  let { initialQuestionId = 'co-math-11-001' }: { initialQuestionId?: string } = $props();

  // State (Svelte 5 runes)
  let currentQuestionId = $state(initialQuestionId);
  let explanations = $state<Explanation[]>([]);
  let isLoading = $state(false);
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  // Form State
  let newContent = $state('');
  let isSubmitting = $state(false);

  // Local voter identity
  let userNodeHash = $state('');
  let userVotes = $state<Record<string, number>>({});

  // Derived state (Svelte 5 rune)
  let sortedExplanations = $derived(
    [...explanations].sort((a, b) => b.vote_count - a.vote_count)
  );

  let formattedExplanations = $derived(
    sortedExplanations.map((item) => {
      const author_hash = item.node_hash
        ? item.node_hash.length > 14
          ? item.node_hash.slice(0, 10) + '...' + item.node_hash.slice(-4)
          : item.node_hash
        : 'Nodo Anónimo';
      return {
        ...item,
        author_hash,
      };
    })
  );

  function getOrGenerateNodeHash(): string {
    if (typeof window === 'undefined') return 'node-anon-local';
    let stored = localStorage.getItem('swal_voter_node_hash');
    if (!stored) {
      stored = 'node-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('swal_voter_node_hash', stored);
    }
    return stored;
  }

  function loadUserVotes() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('swal_community_votes');
      if (saved) {
        userVotes = JSON.parse(saved);
      }
    } catch (e) {
      userVotes = {};
    }
  }

  function saveUserVotes(explanationId: string, voteDirection: number) {
    userVotes = { ...userVotes, [explanationId]: voteDirection };
    if (typeof window !== 'undefined') {
      localStorage.setItem('swal_community_votes', JSON.stringify(userVotes));
    }
  }

  async function fetchExplanations(qid: string) {
    if (!qid.trim()) return;
    isLoading = true;
    errorMessage = null;

    try {
      const res = await fetch(`/api/explanations?question_id=${encodeURIComponent(qid.trim())}`);
      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.explanations)) {
        explanations = data.explanations;
      } else {
        explanations = [];
      }
    } catch (err: any) {
      errorMessage = err.message || 'Error al cargar las explicaciones de la comunidad';
      explanations = [];
    } finally {
      isLoading = false;
    }
  }

  async function handleCreateExplanation(e: SubmitEvent) {
    e.preventDefault();
    if (!newContent.trim()) {
      errorMessage = 'La explicación no puede estar vacía.';
      return;
    }
    if (!currentQuestionId.trim()) {
      errorMessage = 'Identificador de pregunta inválido.';
      return;
    }

    isSubmitting = true;
    errorMessage = null;
    successMessage = null;

    try {
      const res = await fetch('/api/explanations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: currentQuestionId.trim(),
          content: newContent.trim(),
          node_hash: userNodeHash,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No se pudo publicar la explicación.');
      }

      successMessage = '¡Explicación enviada con éxito! (En revisión o lista para votación)';
      newContent = '';
      await fetchExplanations(currentQuestionId);
    } catch (err: any) {
      errorMessage = err.message || 'Error al enviar la explicación.';
    } finally {
      isSubmitting = false;
    }
  }

  async function handleVote(explanationId: string, voteDirection: 1 | -1) {
    const existingVote = userVotes[explanationId];
    if (existingVote === voteDirection) {
      return; // Ya votó en esa dirección
    }

    // Optimistic update
    const targetIdx = explanations.findIndex((e) => e.id === explanationId);
    if (targetIdx === -1) return;

    const previousVoteCount = explanations[targetIdx].vote_count;
    const voteDelta = existingVote ? voteDirection - existingVote : voteDirection;

    explanations[targetIdx] = {
      ...explanations[targetIdx],
      vote_count: previousVoteCount + voteDelta,
    };
    saveUserVotes(explanationId, voteDirection);

    try {
      const res = await fetch('/api/explanations?action=vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          explanation_id: explanationId,
          voter_node_hash: userNodeHash,
          vote: voteDirection,
          signature: `sig-${userNodeHash.slice(0, 8)}-${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        // Rollback optimistic vote if duplicate or error
        explanations[targetIdx] = {
          ...explanations[targetIdx],
          vote_count: previousVoteCount,
        };
        if (data.error && data.error.includes('duplicado')) {
          errorMessage = 'Ya has emitido un voto para esta explicación.';
        } else {
          errorMessage = data.error || 'Error al procesar el voto.';
        }
      } else if (typeof data.vote_count === 'number') {
        explanations[targetIdx] = {
          ...explanations[targetIdx],
          vote_count: data.vote_count,
        };
      }
    } catch (err: any) {
      // Rollback on network error
      explanations[targetIdx] = {
        ...explanations[targetIdx],
        vote_count: previousVoteCount,
      };
      errorMessage = 'Error de red al registrar el voto.';
    }
  }

  onMount(() => {
    userNodeHash = getOrGenerateNodeHash();
    loadUserVotes();
    fetchExplanations(currentQuestionId);
  });
</script>

<div class="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-8 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800">
  <!-- Header & Question Selector -->
  <header class="border-b border-slate-800 pb-5 space-y-3">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="!text-xl sm:!text-2xl font-bold tracking-tight text-emerald-400 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        Explicaciones de la Comunidad
      </h2>
      <div class="text-xs bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full border border-slate-700">
        Nodo: <span class="font-mono text-emerald-300">{userNodeHash ? userNodeHash.slice(0, 10) + '...' : 'Cargando...'}</span>
      </div>
    </div>
    <p class="text-slate-400 text-sm">
      Respuestas colaborativas sustentadas por consenso entre pares de la red descentralizada SaberParaTodos.
    </p>

    <!-- Search / Filter Question ID -->
    <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <label for="question-id-input" class="text-xs font-semibold text-slate-300 uppercase tracking-wider shrink-0">
        ID de Pregunta:
      </label>
      <div class="flex items-center gap-2 grow">
        <input
          id="question-id-input"
          type="text"
          bind:value={currentQuestionId}
          placeholder="Ej. co-math-11-001"
          class="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="button"
          onclick={() => fetchExplanations(currentQuestionId)}
          class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shrink-0"
        >
          Buscar
        </button>
      </div>
    </div>
  </header>

  <!-- Alerts -->
  {#if errorMessage}
    <div class="p-4 bg-rose-950/60 border border-rose-800/80 text-rose-200 rounded-xl text-sm flex items-start gap-3">
      <span class="text-rose-400 font-bold shrink-0">⚠️</span>
      <p class="grow">{errorMessage}</p>
    </div>
  {/if}

  {#if successMessage}
    <div class="p-4 bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 rounded-xl text-sm flex items-start gap-3">
      <span class="text-emerald-400 font-bold shrink-0">✓</span>
      <p class="grow">{successMessage}</p>
    </div>
  {/if}

  <!-- Form to publish explanation -->
  <section class="bg-slate-950/60 rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
    <h3 class="text-lg font-semibold text-slate-200 flex items-center gap-2">
      <span>✏️</span> Aportar una nueva explicación
    </h3>
    <form onsubmit={handleCreateExplanation} class="space-y-3">
      <div>
        <textarea
          bind:value={newContent}
          rows="4"
          placeholder="Escribe aquí tu explicación clara, paso a paso, para resolver esta pregunta..."
          class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
          maxlength="5000"
        ></textarea>
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>Máximo 5000 caracteres. Sanitizado automáticamente.</span>
          <span>{newContent.length} / 5000</span>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !newContent.trim()}
          class="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Explicación'}
        </button>
      </div>
    </form>
  </section>

  <!-- Explanations List / Threading -->
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-slate-200 flex items-center gap-2">
        <span>💬</span> Hilos de Explicaciones ({formattedExplanations.length})
      </h3>
      {#if isLoading}
        <span class="text-xs text-emerald-400 animate-pulse">Cargando hilos...</span>
      {/if}
    </div>

    {#if isLoading && formattedExplanations.length === 0}
      <div class="p-8 text-center text-slate-500 bg-slate-950/30 rounded-xl border border-slate-800">
        Buscando explicaciones publicadas...
      </div>
    {:else if formattedExplanations.length === 0}
      <div class="p-8 text-center text-slate-400 bg-slate-950/30 rounded-xl border border-slate-800 space-y-2">
        <p class="text-base font-medium">Aún no hay explicaciones para la pregunta <span class="font-mono text-emerald-400">{currentQuestionId}</span>.</p>
        <p class="text-xs text-slate-500">¡Sé el primero en compartir la solución con la comunidad!</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each formattedExplanations as item (item.id)}
          <article class="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 sm:p-5 transition-all space-y-4 shadow-sm">
            <!-- Author Header -->
            <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center text-xs font-mono font-bold">
                  {item.author_hash ? item.author_hash.slice(0, 2).toUpperCase() : 'AN'}
                </div>
                <span class="font-mono text-slate-300">
                  {item.author_hash}
                </span>
              </div>
              {#if item.created_at}
                <span class="text-slate-500">
                  {new Date(item.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              {/if}
            </div>

            <!-- Content -->
            <div class="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {item.content}
            </div>

            <!-- Thread Voting Controls -->
            <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <div class="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
                <button
                  type="button"
                  aria-label="Votar a favor"
                  onclick={() => handleVote(item.id, 1)}
                  class="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded transition-colors {userVotes[item.id] === 1 ? 'text-emerald-400 font-bold bg-slate-800' : ''}"
                >
                  ▲
                </button>
                <span class="px-2 font-mono font-bold text-sm text-slate-200">
                  {item.vote_count > 0 ? `+${item.vote_count}` : item.vote_count}
                </span>
                <button
                  type="button"
                  aria-label="Votar en contra"
                  onclick={() => handleVote(item.id, -1)}
                  class="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition-colors {userVotes[item.id] === -1 ? 'text-rose-400 font-bold bg-slate-800' : ''}"
                >
                  ▼
                </button>
              </div>

              <span class="text-slate-500 italic text-[11px]">
                Consenso P2P • Votos firmados
              </span>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</div>
