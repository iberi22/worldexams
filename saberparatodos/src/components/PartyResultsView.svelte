<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import { getPartySessionsByCode, type PartySessionRecord } from '../lib/idb-storage';
  import { formatBlurTime } from '../lib/focus-tracker';

  // Props
  export let partyCode: string;
  export let currentSession: PartySessionRecord | null = null;
  export let onClose: () => void = () => {};
  export let externalResults: any[] = []; // 🆕 External P2P results

  // State
  let sessions: PartySessionRecord[] = [];
  let isLoading = true;

  // Computed stats
  $: allSessions = [...sessions, ...externalResults.map(r => ({
      sessionId: r.sessionId || 'p2p-' + Math.random(),
      partyCode,
      isHost: false,
      userName: r.name || 'Invitado',
      grade: 0,
      subject: 'Generico',
      startedAt: 0,
      questions: [],
      answers: {},
      score: Math.round((r.score / r.total) * 100),
      focusViolations: r.focusViolations || 0,
      totalQuestions: r.total
  }))];

  // Deduplicate by name or session if possible?
  // For now, simple merge. We might see duplicates if we save to IDB and receive P2P.
  // Ideally we use ID for dedup.
  $: uniqueSessions = Array.from(new Map(allSessions.map(s => [s.userName + s.score, s])).values());

  $: concentratedUsers = uniqueSessions.filter(s => (s.focusViolations || 0) === 0).length;
  $: distractedUsers = uniqueSessions.filter(s => (s.focusViolations || 0) > 0).length;
  $: averageScore = uniqueSessions.length > 0
    ? Math.round(uniqueSessions.reduce((acc, s) => acc + ((s.score || 0)), 0) / uniqueSessions.length)
    : 0;

  onMount(async () => {
    try {
      const localSessions = await getPartySessionsByCode(partyCode);
      sessions = localSessions;

      // Include current session if not already in list
      if (currentSession && !sessions.find(s => s.sessionId === currentSession.sessionId)) {
        sessions = [...sessions, currentSession];
      }
    } catch (err) {
      console.error('Error loading party sessions:', err);
    } finally {
      isLoading = false;
    }
  });

  function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#F5F5DC] p-4 sm:p-8">
  <div class="max-w-4xl mx-auto space-y-8">

    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-black uppercase tracking-widest mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Resultados de Party
      </h1>
      <div class="flex items-center justify-center gap-2 text-lg font-mono">
        <span class="text-white/60">Código:</span>
        <span class="font-bold text-purple-400">{partyCode}</span>
      </div>
    </div>

    <!-- Focus Summary Card (PREMIUM FEATURE) -->
    <FlashlightCard className="p-6">
      <h2 class="text-xs uppercase tracking-widest text-purple-400 mb-4 font-bold">
        📊 Resumen de Concentración
      </h2>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <div class="text-4xl font-black text-emerald-400 mb-1">{concentratedUsers}</div>
          <div class="text-xs uppercase tracking-wider text-white/60">Usuarios Concentrados</div>
          <div class="text-[10px] text-emerald-400/60 mt-1">✓ Sin distracciones</div>
        </div>

        <div class="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div class="text-4xl font-black text-red-400 mb-1">{distractedUsers}</div>
          <div class="text-xs uppercase tracking-wider text-white/60">Usuarios Distraídos</div>
          <div class="text-[10px] text-red-400/60 mt-1">⚠️ Cambiaron de app</div>
        </div>
      </div>

      <!-- Premium Upsell -->
      <div class="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-4 text-center">
        <p class="text-sm mb-3 text-white/80">
          🔒 Ver detalles completos de concentración por usuario
        </p>
        <a
          href="/pricing"
          class="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
        >
          Actualizar a Pro / Instituciones
        </a>
      </div>
    </FlashlightCard>

    <!-- Overall Stats -->
    <div class="grid grid-cols-3 gap-4">
      <FlashlightCard className="p-4 text-center">
        <div class="text-2xl font-black text-white mb-1">{sessions.length}</div>
        <div class="text-xs uppercase tracking-wider text-white/60">Participantes</div>
      </FlashlightCard>

      <FlashlightCard className="p-4 text-center">
        <div class="text-2xl font-black text-emerald-400 mb-1">{averageScore}%</div>
        <div class="text-xs uppercase tracking-wider text-white/60">Promedio</div>
      </FlashlightCard>

      <FlashlightCard className="p-4 text-center">
        <div class="text-2xl font-black text-purple-400 mb-1">
          {sessions[0]?.totalQuestions || 0}
        </div>
        <div class="text-xs uppercase tracking-wider text-white/60">Preguntas</div>
      </FlashlightCard>
    </div>

    <!-- Individual Results -->
    <div class="space-y-3">
      <h3 class="text-xs uppercase tracking-widest text-white/60 font-bold">Resultados Individuales</h3>

      {#if isLoading}
        <div class="text-center py-8 text-white/40">Cargando resultados...</div>
      {:else if sessions.length === 0}
        <div class="text-center py-8 text-white/40">No hay sesiones registradas</div>
      {:else}
        {#each uniqueSessions.sort((a, b) => (b.score || 0) - (a.score || 0)) as session, idx}
          {@const isMe = currentSession && session.sessionId === currentSession.sessionId}
          {@const showName = isMe || (currentSession && currentSession.isHost)}
          {@const displayName = showName ? (session.userName || 'Anónimo') : `Participante ${idx + 1}`}

          <FlashlightCard className="p-4">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <div class="font-bold">
                    {displayName}
                    {#if isMe}
                      <span class="text-xs text-emerald-400 ml-1">(Tú)</span>
                    {/if}
                  </div>
                  <div class="text-xs text-white/40">
                    {session.isHost ? '👑 Host' : '👤 Participante'}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4 text-right">
                <!-- Focus Status -->
                <div class="text-xs">
                  {#if (session.focusViolations || 0) === 0}
                    <span class="text-emerald-400">✓ Concentrado</span>
                  {:else}
                    <span class="text-red-400">⚠️ {session.focusViolations} distracciones</span>
                  {/if}
                </div>

                <!-- Score -->
                <div class="text-2xl font-black {(session.score || 0) >= 60 ? 'text-emerald-400' : 'text-red-400'}">
                  {session.score || 0}%
                </div>
              </div>
            </div>
          </FlashlightCard>
        {/each}
      {/if}
    </div>

    <!-- Close Button -->
    <div class="text-center pt-4">
      <button
        on:click={onClose}
        class="px-8 py-3 bg-white/10 border border-white/20 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
      >
        Cerrar Resultados
      </button>
    </div>

  </div>
</div>
