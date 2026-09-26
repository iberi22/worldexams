<script lang="ts">
  import { expiresAtMs, fetchLeaderboard, RankedError, type LeaderboardResponse } from '../../lib/ranked/ranked-client';

  let { hasRankedData = $bindable(false) } = $props<{ hasRankedData?: boolean }>();

  let months = $state<{ value: string; label: string }[]>([]);
  let selectedMonth = $state<string>('');
  let data = $state<LeaderboardResponse | null>(null);
  let loading = $state<boolean>(true);
  let errorMsg = $state<string | null>(null);
  let currentUserNickname = $state<string | null>(null);

  $effect(() => {
    try {
      if (typeof window !== 'undefined') {
        currentUserNickname = localStorage.getItem('worldexams_ranked_nickname');
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  });

  $effect(() => {
    const now = new Date();
    const generatedMonths = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const monthNum = d.getMonth() + 1;
      const value = `${year}-${monthNum.toString().padStart(2, '0')}`;
      const label = new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'long' }).format(d);
      // Capitalize first letter of label
      const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
      generatedMonths.push({ value, label: capitalizedLabel });
    }
    months = generatedMonths;
    if (!selectedMonth) {
      selectedMonth = months[0].value;
    }
  });

  $effect(() => {
    if (selectedMonth) {
      loadData(selectedMonth);
    }
  });

  $effect(() => {
    hasRankedData = !!(data && data.entries.length > 0);
  });

  async function loadData(season: string) {
    loading = true;
    errorMsg = null;
    data = null;
    try {
      data = await fetchLeaderboard(season);
    } catch (e) {
      if (e instanceof RankedError && e.code === 'UNAVAILABLE') {
        errorMsg = 'El ranking se está activando, vuelve pronto';
      } else {
        errorMsg = 'No se pudo cargar el ranking';
      }
    } finally {
      loading = false;
    }
  }

  function formatDate(isoString: string | number): string {
    try {
      // API may send unix seconds; normalize like expiresAt.
      const d = new Date(expiresAtMs(isoString));
      return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' }).format(d);
    } catch {
      return '';
    }
  }
</script>

<div class="mb-8">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-[#F5F5DC]">Ranking Oficial (Ranked)</h2>
    <select
      bind:value={selectedMonth}
      class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 focus:outline-none focus:border-emerald-500/50"
      aria-label="Seleccionar mes"
    >
      {#each months as month}
        <option value={month.value}>{month.label}</option>
      {/each}
    </select>
  </div>

  <div class="border border-emerald-500/20 rounded-xl overflow-hidden bg-[#121212]/50 backdrop-blur-md">
    <!-- Header -->
    <div class="grid grid-cols-12 p-3 sm:p-4 border-b border-emerald-500/20 bg-emerald-500/5">
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400/60 col-span-2 sm:col-span-1">#</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400/60 col-span-5 sm:col-span-5">Jugador</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400/60 col-span-3 text-center hidden sm:block">Aciertos</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400/60 col-span-3 text-right">Puntaje</div>
      <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400/60 col-span-2 text-right hidden sm:block">Fecha</div>
    </div>

    <!-- Content -->
    {#if loading}
      <div class="p-8 text-center">
        <div class="inline-block w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-2"></div>
        <p class="text-xs text-white/40">Cargando ranking oficial...</p>
      </div>
    {:else if errorMsg}
      <div class="p-8 text-center text-red-400 text-sm">
        {errorMsg}
      </div>
    {:else if data && data.entries.length === 0}
      <div class="p-8 text-center">
        <p class="text-sm text-white/60 mb-2">Aún no hay puntajes publicados este mes — ¡sé el primero!</p>
        <p class="text-xs text-white/40">
          Solo se publican intentos ranked con más de 30 preguntas respondidas y puntaje igual o superior al promedio del mes (promedio actual: {data.average}).
        </p>
      </div>
    {:else if data}
      {#each data.entries as entry}
        {@const isCurrentUser = currentUserNickname && entry.nickname === currentUserNickname}
        <div
          class={`
            grid grid-cols-12 p-3 sm:p-4 border-b border-white/5
            hover:bg-white/[0.03] transition-colors duration-200
            ${isCurrentUser ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''}
          `}
        >
          <div class="col-span-2 sm:col-span-1 font-bold text-white/80">
            {#if entry.rank === 1}🥇
            {:else if entry.rank === 2}🥈
            {:else if entry.rank === 3}🥉
            {:else}{entry.rank}{/if}
          </div>
          <div class="col-span-5 sm:col-span-5 flex flex-col justify-center">
            <span class="font-medium text-sm text-[#F5F5DC] truncate">{entry.nickname}</span>
            <span class="text-[10px] text-white/40 sm:hidden">{entry.correct}/{entry.answered} aciertos</span>
          </div>
          <div class="col-span-3 text-center hidden sm:flex items-center justify-center">
            <span class="text-xs text-white/60">{entry.correct} <span class="text-white/30">/</span> {entry.answered}</span>
          </div>
          <div class="col-span-5 sm:col-span-3 flex flex-col justify-center text-right">
            <span class="font-bold text-sm text-emerald-400">{entry.score}</span>
            <span class="text-[10px] text-white/40 sm:hidden">{formatDate(entry.createdAt)}</span>
          </div>
          <div class="col-span-2 text-right hidden sm:flex items-center justify-end">
            <span class="text-xs text-white/40">{formatDate(entry.createdAt)}</span>
          </div>
        </div>
      {/each}
      <div class="p-3 bg-white/5 border-t border-emerald-500/20 text-center">
        <p class="text-[10px] text-white/40">
          Solo se publican intentos ranked con más de 30 preguntas respondidas y puntaje igual o superior al promedio del mes (promedio actual: {data.average}).
        </p>
      </div>
    {/if}
  </div>
</div>
