<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchAggregateStats, type AggregateStat } from '../../lib/mesh/leaderboard-mesh';

  let scores = $state<AggregateStat[]>([]);
  let isLoading = $state(true);
  let errorMsg = $state<string | null>(null);

  let top50Scores = $derived(scores.slice(0, 50));

  async function loadLeaderboard() {
    isLoading = true;
    errorMsg = null;
    try {
      const stats = await fetchAggregateStats();
      scores = stats;
    } catch (e) {
      errorMsg = e instanceof Error ? e.message : 'Error al cargar el ranking';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadLeaderboard();
  });
</script>

<div class="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
        <span class="text-emerald-400">🛡️</span> Ranking Anónimo Top50
      </h2>
      <p class="text-xs sm:text-sm text-white/60 mt-1">
        Puntajes agregados anónimos transmitidos mediante red mesh privada. Cero PII.
      </p>
    </div>
    <button
      type="button"
      onclick={loadLeaderboard}
      class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
      aria-label="Actualizar ranking anónimo"
    >
      <span>🔄</span> Actualizar
    </button>
  </div>

  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-12 space-y-3">
      <div class="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      <p class="text-xs text-white/40 uppercase tracking-widest">Cargando datos anónimos...</p>
    </div>
  {:else if errorMsg}
    <div class="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-xs text-center">
      {errorMsg}
    </div>
  {:else if top50Scores.length === 0}
    <div class="p-8 rounded-xl border border-white/5 bg-white/[0.02] text-center space-y-2">
      <p class="text-sm font-semibold text-white/70">No hay registros anónimos aún</p>
      <p class="text-xs text-white/40">
        Los puntajes agregados aparecerán aquí cuando los nodos de la red transmitan sus resultados con opt-in activo.
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto rounded-xl border border-white/10 bg-[#121212]/50 backdrop-blur-md">
      <table class="w-full text-left text-xs sm:text-sm text-white/80 border-collapse">
        <thead>
          <tr class="border-b border-white/10 bg-white/5 text-[10px] sm:text-xs uppercase tracking-wider text-white/50">
            <th scope="col" class="py-3 px-4 font-bold text-center w-12">#</th>
            <th scope="col" class="py-3 px-4 font-bold">Nodo Hash</th>
            <th scope="col" class="py-3 px-4 font-bold">Materia</th>
            <th scope="col" class="py-3 px-4 font-bold text-center">Semana</th>
            <th scope="col" class="py-3 px-4 font-bold text-right">Puntaje</th>
            <th scope="col" class="py-3 px-4 font-bold text-right">Promedio</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each top50Scores as item, index (item.node_hash + '_' + index)}
            <tr class="hover:bg-white/[0.03] transition-colors">
              <td class="py-3 px-4 text-center font-bold text-emerald-400">
                {index + 1}
              </td>
              <td class="py-3 px-4 font-mono text-xs text-white/70" title={item.node_hash}>
                {item.node_hash.length > 14 ? item.node_hash.slice(0, 14) + '…' : item.node_hash}
              </td>
              <td class="py-3 px-4 capitalize">
                {item.subject}
              </td>
              <td class="py-3 px-4 text-center font-mono text-xs text-white/60">
                {item.week}
              </td>
              <td class="py-3 px-4 text-right font-bold text-white">
                {item.score}
              </td>
              <td class="py-3 px-4 text-right font-bold text-emerald-300">
                {item.avg}%
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
