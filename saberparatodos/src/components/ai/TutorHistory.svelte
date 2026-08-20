<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getAllTutorSessions,
    deleteTutorSession,
    clearTutorHistory,
    type TutorSessionRecord,
  } from '../../lib/ai/tutor-history';

  interface Props {
    onSelectSession?: (session: TutorSessionRecord) => void;
  }

  let { onSelectSession = undefined }: Props = $props();

  let sessions = $state<TutorSessionRecord[]>([]);
  let loading = $state(true);
  let expandedSessionId = $state<string | null>(null);
  let searchFilter = $state('');

  let filteredSessions = $derived.by(() => {
    if (!searchFilter.trim()) return sessions;
    const term = searchFilter.toLowerCase();
    return sessions.filter((s) => {
      const subject = (s.context.subject || '').toLowerCase();
      const qText = (s.context.questionText || '').toLowerCase();
      const turnMatch = s.history.some(
        (t) => t.userText.toLowerCase().includes(term) || t.assistantText.toLowerCase().includes(term)
      );
      return subject.includes(term) || qText.includes(term) || turnMatch;
    });
  });

  async function loadHistory() {
    loading = true;
    try {
      sessions = await getAllTutorSessions();
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    void loadHistory();
  });

  async function handleDeleteSession(id: string, e: Event) {
    e.stopPropagation();
    await deleteTutorSession(id);
    sessions = sessions.filter((s) => s.sessionId !== id);
    if (expandedSessionId === id) expandedSessionId = null;
  }

  async function handleClearAll() {
    if (typeof window !== 'undefined' && !window.confirm('¿Borrar todo el historial de tutoría?')) return;
    await clearTutorHistory();
    sessions = [];
    expandedSessionId = null;
  }

  function toggleExpand(id: string) {
    expandedSessionId = expandedSessionId === id ? null : id;
  }

  function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
</script>

<div class="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl text-white space-y-4">
  <div class="flex items-center justify-between border-b border-white/10 pb-3">
    <div>
      <h2 class="text-base font-bold text-white flex items-center gap-2">
        <span>📜</span> Historial de Tutoría IA
      </h2>
      <p class="text-xs text-slate-400">Sesiones previas guardadas en local (IndexedDB)</p>
    </div>
    {#if sessions.length > 0}
      <button
        type="button"
        onclick={handleClearAll}
        class="text-xs text-rose-400 hover:text-rose-300 font-medium px-2.5 py-1 rounded-lg border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition"
      >
        Limpiar historial
      </button>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <input
      type="text"
      placeholder="Buscar por materia, pregunta o interacción..."
      bind:value={searchFilter}
      class="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  </div>

  {#if loading}
    <div class="py-8 text-center text-xs text-slate-400">Cargando historial de sesiones...</div>
  {:else if filteredSessions.length === 0}
    <div class="py-8 text-center text-xs text-slate-400">
      {#if searchFilter.trim()}
        No se encontraron sesiones que coincidan con la búsqueda.
      {:else}
        No hay sesiones de tutoría guardadas todavía.
      {/if}
    </div>
  {:else}
    <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
      {#each filteredSessions as s (s.sessionId)}
        <div
          class="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-violet-500/30"
        >
          <div class="flex items-start justify-between gap-2">
            <button
              type="button"
              onclick={() => toggleExpand(s.sessionId)}
              class="flex-1 text-left space-y-1"
            >
              <div class="flex items-center gap-2 flex-wrap">
                {#if s.context.subject}
                  <span class="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-300 border border-violet-500/30">
                    {s.context.subject}
                  </span>
                {/if}
                {#if s.context.grade}
                  <span class="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-500/30">
                    Grado {s.context.grade}
                  </span>
                {/if}
                <span class="text-[11px] text-slate-400 ml-auto font-mono">
                  {formatDate(s.updatedAt)}
                </span>
              </div>

              {#if s.context.questionText}
                <p class="text-xs text-slate-200 line-clamp-1 font-medium mt-1">
                  Pregunta: {s.context.questionText}
                </p>
              {/if}

              <div class="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                <span>💬 {s.history.length} {s.history.length === 1 ? 'interacción' : 'interacciones'}</span>
                {#if s.syncedToXavier}
                  <span class="text-emerald-400 font-semibold">✓ Xavier</span>
                {/if}
              </div>
            </button>

            <div class="flex items-center gap-1">
              {#if onSelectSession}
                <button
                  type="button"
                  onclick={() => onSelectSession(s)}
                  class="rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 px-2 py-1 text-[11px] font-medium text-violet-200 transition"
                  title="Continuar sesión"
                >
                  Cargar
                </button>
              {/if}
              <button
                type="button"
                onclick={(e) => handleDeleteSession(s.sessionId, e)}
                class="rounded-lg p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition text-xs"
                title="Eliminar sesión"
              >
                🗑️
              </button>
            </div>
          </div>

          {#if expandedSessionId === s.sessionId}
            <div class="mt-3 border-t border-white/10 pt-3 space-y-2 text-xs">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Detalle del diálogo:</p>
              {#each s.history as turn, i}
                <div class="rounded-lg bg-slate-950/60 p-2.5 space-y-1">
                  <div class="text-sky-300 font-medium text-[11px]">Estudiante: {turn.userText}</div>
                  <div class="text-slate-200 text-[11px]">Tutor: {turn.assistantText}</div>
                  <div class="text-[9px] text-slate-500 text-right">{formatDate(turn.at)}</div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
