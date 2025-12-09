<script lang="ts">
  /**
   * LeaderboardView.svelte
   * Componente para mostrar el ranking de estudiantes
   * Colombia - saberparatodos
   *
   * Usa archivos JSON estáticos en /leaderboards/
   */

  import { onMount } from 'svelte';
  import type {
    Leaderboard,
    LeaderboardEntry,
    LeaderboardPeriod
  } from '../lib/leaderboard';
  import { PERIOD_INFO } from '../lib/leaderboard';
  import {
    loadLeaderboard,
    findUserInLeaderboard,
    formatRank,
    getRankColor,
    getRankBackground
  } from '../lib/leaderboard-service';
  import { getLocalIdentity } from '../lib/identity';
  import {
    loadRankTracking,
    initRankTracking,
    checkRankChanges,
    updateTracking,
    shouldShowNotification,
    type RankChange,
    type RankTracking
  } from '../lib/rank-notifications';
  import RankNotificationToast from './RankNotificationToast.svelte';

  // Props
  export let onBack: () => void;
  export let onRegister: (() => void) | null = null;

  // State
  let currentPeriod: LeaderboardPeriod = 'weekly';
  let leaderboard: Leaderboard | null = null;
  let loading = true;
  let error = '';
  let userEntry: LeaderboardEntry | null = null;
  let currentUserId: string | null = null;

  // Notification state
  let rankTracking: RankTracking | null = null;
  let notification: RankChange | null = null;

  // Filtros
  let filterGrade = '';
  let filterRegion = '';

  // Períodos disponibles
  const periods: LeaderboardPeriod[] = ['weekly', 'monthly', 'annual', 'alltime'];

  // Datos filtrados
  $: filteredEntries = leaderboard?.entries.filter(entry => {
    if (filterGrade && entry.grade !== filterGrade) return false;
    if (filterRegion && entry.region !== filterRegion) return false;
    return true;
  }).map((entry, index) => ({
    ...entry,
    filteredRank: index + 1
  })) || [];

  // Grados y regiones únicos del leaderboard actual
  $: availableGrades = [...new Set(leaderboard?.entries.map(e => e.grade) || [])].sort();
  $: availableRegions = [...new Set(leaderboard?.entries.map(e => e.region) || [])].sort();

  async function loadData() {
    loading = true;
    error = '';

    try {
      leaderboard = await loadLeaderboard(currentPeriod);

      if (!leaderboard) {
        error = 'No se pudo cargar el ranking';
        return;
      }

      // Buscar usuario actual
      if (currentUserId) {
        userEntry = findUserInLeaderboard(leaderboard, currentUserId);

        // Check for rank changes and show notification
        if (rankTracking && shouldShowNotification(rankTracking)) {
          const change = checkRankChanges(rankTracking, currentPeriod, userEntry);
          if (change) {
            notification = change;
          }
          // Update tracking
          rankTracking = updateTracking(rankTracking, currentPeriod, userEntry);
        } else if (rankTracking) {
          // Still update tracking even if not showing notification
          rankTracking = updateTracking(rankTracking, currentPeriod, userEntry);
        }
      }
    } catch (e) {
      console.error('Error loading leaderboard:', e);
      error = 'Error al cargar el ranking';
    } finally {
      loading = false;
    }
  }

  function setPeriod(period: LeaderboardPeriod) {
    currentPeriod = period;
    filterGrade = '';
    filterRegion = '';
    loadData();
  }

  function formatAccuracy(accuracy: number): string {
    return `${(accuracy * 100).toFixed(0)}%`;
  }

  function formatScore(score: number): string {
    return score.toLocaleString('es-CO');
  }

  function getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  }

  onMount(() => {
    // Obtener identidad local
    const stored = getLocalIdentity();
    if (stored) {
      currentUserId = stored.anonymousId;

      // Initialize or load rank tracking
      rankTracking = loadRankTracking();
      if (!rankTracking || rankTracking.anonymousId !== currentUserId) {
        rankTracking = initRankTracking(currentUserId, stored.displayName);
      }
    }

    loadData();
  });

  function dismissNotification() {
    notification = null;
  }
</script>

<!-- Notification Toast -->
<RankNotificationToast
  {notification}
  onDismiss={dismissNotification}
/>

<div class="w-full max-w-4xl mx-auto p-4 animate-fade-in-up pb-20">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-3xl sm:text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
        🏆 Ranking
      </h2>
      <p class="text-xs text-white/40 mt-1">
        {PERIOD_INFO[currentPeriod].description}
      </p>
    </div>
    <button
      on:click={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10
             transition-colors uppercase text-xs tracking-widest
             opacity-60 hover:opacity-100"
    >
      [ Volver ]
    </button>
  </div>

  <!-- Period Tabs -->
  <div class="flex flex-wrap justify-center gap-2 mb-6">
    {#each periods as period}
      <button
        on:click={() => setPeriod(period)}
        class={`
          px-4 py-2 uppercase text-xs tracking-widest transition-all border rounded-lg
          ${currentPeriod === period
            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
            : 'border-white/10 text-white/40 hover:text-white/80 hover:border-white/30'}
        `}
      >
        {PERIOD_INFO[period].shortLabel}
      </button>
    {/each}
  </div>

  <!-- User Position Card (si está registrado) -->
  {#if userEntry}
    <div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl">{userEntry.displayName.split(' ')[0]}</span>
          <div>
            <p class="text-sm font-bold text-emerald-400">Tu posición</p>
            <p class="text-xs text-white/60">{userEntry.displayName}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-emerald-400">#{userEntry.rank}</p>
          <p class="text-xs text-white/60">{formatScore(userEntry.score)} pts</p>
        </div>
      </div>
    </div>
  {:else if !currentUserId && onRegister}
    <div class="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🎭</span>
          <div>
            <p class="text-sm font-bold text-blue-300">¿Quieres aparecer aquí?</p>
            <p class="text-xs text-white/60">Crea tu identidad anónima para guardar tus puntajes</p>
          </div>
        </div>
        <button
          on:click={onRegister}
          class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30
                 border border-blue-500/50 rounded-lg text-blue-300
                 text-xs uppercase tracking-widest transition-colors shrink-0"
        >
          Crear ID
        </button>
      </div>
    </div>
  {/if}

  <!-- Filters -->
  {#if leaderboard && leaderboard.entries.length > 0}
    <div class="flex flex-wrap gap-3 mb-4">
      <select
        bind:value={filterGrade}
        class="px-3 py-2 bg-white/5 border border-white/10 rounded-lg
               text-sm text-white/80 appearance-none cursor-pointer
               focus:outline-none focus:border-emerald-500/50"
      >
        <option value="">Todos los grados</option>
        {#each availableGrades as grade}
          <option value={grade}>Grado {grade}°</option>
        {/each}
      </select>

      <select
        bind:value={filterRegion}
        class="px-3 py-2 bg-white/5 border border-white/10 rounded-lg
               text-sm text-white/80 appearance-none cursor-pointer
               focus:outline-none focus:border-emerald-500/50"
      >
        <option value="">Todas las ciudades</option>
        {#each availableRegions as region}
          <option value={region}>{region}</option>
        {/each}
      </select>

      {#if filterGrade || filterRegion}
        <button
          on:click={() => { filterGrade = ''; filterRegion = ''; }}
          class="px-3 py-2 text-xs text-white/40 hover:text-white/80"
        >
          Limpiar filtros
        </button>
      {/if}
    </div>
  {/if}

  <!-- Leaderboard Table -->
  <div class="border border-white/10 rounded-xl overflow-hidden bg-[#121212]/50 backdrop-blur-md">
    <!-- Header -->
    <div class="grid grid-cols-12 p-3 sm:p-4 border-b border-white/10 bg-white/5">
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-40 col-span-1">#</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-40 col-span-5 sm:col-span-4">Jugador</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-40 col-span-3 sm:col-span-2 text-center hidden sm:block">Info</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-40 col-span-3 text-center">Precisión</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-40 col-span-3 text-right">Puntos</div>
    </div>

    <!-- Content -->
    {#if loading}
      <div class="p-12 text-center">
        <div class="inline-block w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        <p class="mt-4 text-sm text-white/40">Cargando ranking...</p>
      </div>
    {:else if error}
      <div class="p-12 text-center">
        <p class="text-red-400">{error}</p>
        <button
          on:click={loadData}
          class="mt-4 px-4 py-2 text-xs border border-white/20 hover:bg-white/10 rounded"
        >
          Reintentar
        </button>
      </div>
    {:else if filteredEntries.length === 0}
      <div class="p-12 text-center opacity-40">
        <p class="text-4xl mb-4">🏆</p>
        <p class="mb-2">No hay datos en este período</p>
        <p class="text-xs">¡Sé el primero en aparecer!</p>
      </div>
    {:else}
      {#each filteredEntries as entry (entry.anonymousId)}
        {@const isCurrentUser = entry.anonymousId === currentUserId}
        {@const displayRank = filterGrade || filterRegion ? entry.filteredRank : entry.rank}

        <div
          class={`
            grid grid-cols-12 p-3 sm:p-4 border-b border-white/5
            hover:bg-white/[0.03] transition-colors duration-200
            ${isCurrentUser ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''}
            ${getRankBackground(displayRank)}
          `}
        >
          <!-- Rank -->
          <div class={`col-span-1 font-bold ${getRankColor(displayRank)}`}>
            {#if displayRank <= 3}
              {displayRank === 1 ? '🥇' : displayRank === 2 ? '🥈' : '🥉'}
            {:else}
              {displayRank}
            {/if}
          </div>

          <!-- Player -->
          <div class="col-span-5 sm:col-span-4">
            <p class="font-medium text-sm truncate">
              {entry.displayName}
            </p>
            <p class="text-[10px] text-white/40 sm:hidden">
              {entry.region} · {entry.grade}°
            </p>
          </div>

          <!-- Info (desktop) -->
          <div class="col-span-2 text-center hidden sm:block">
            <span class="text-xs text-white/60">{entry.region}</span>
            <span class="text-white/20 mx-1">·</span>
            <span class="text-xs text-white/60">{entry.grade}°</span>
          </div>

          <!-- Accuracy -->
          <div class="col-span-3 text-center">
            <span class={`
              text-sm font-mono
              ${entry.stats.accuracy >= 0.9 ? 'text-emerald-400' :
                entry.stats.accuracy >= 0.7 ? 'text-yellow-400' : 'text-white/60'}
            `}>
              {formatAccuracy(entry.stats.accuracy)}
            </span>
          </div>

          <!-- Score -->
          <div class="col-span-3 text-right">
            <p class="font-bold text-sm text-[#F5F5DC]">
              {formatScore(entry.score)}
            </p>
            <p class="text-[10px] text-white/40">
              {entry.stats.examsCompleted} {entry.stats.examsCompleted === 1 ? 'examen' : 'exámenes'}
            </p>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Stats Summary -->
  {#if leaderboard && leaderboard.metadata && leaderboard.entries.length > 0}
    <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
        <p class="text-2xl font-bold text-[#F5F5DC]">{leaderboard.totalParticipants}</p>
        <p class="text-[10px] uppercase tracking-widest text-white/40">Participantes</p>
      </div>
      <div class="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
        <p class="text-2xl font-bold text-emerald-400">{leaderboard.metadata.topRegion}</p>
        <p class="text-[10px] uppercase tracking-widest text-white/40">Ciudad líder</p>
      </div>
      <div class="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
        <p class="text-2xl font-bold text-blue-400">{leaderboard.metadata.topGrade}°</p>
        <p class="text-[10px] uppercase tracking-widest text-white/40">Grado líder</p>
      </div>
      <div class="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
        <p class="text-2xl font-bold text-yellow-400">{formatAccuracy(leaderboard.metadata.averageAccuracy)}</p>
        <p class="text-[10px] uppercase tracking-widest text-white/40">Precisión prom.</p>
      </div>
    </div>
  {/if}

  <!-- Last Updated -->
  {#if leaderboard}
    <p class="mt-4 text-center text-[10px] text-white/30">
      Actualizado: {new Date(leaderboard.lastUpdated).toLocaleString('es-CO')}
    </p>
  {/if}
</div>

<style>
  select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
</style>
