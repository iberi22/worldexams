<script lang="ts">
  import type { Liga } from '$lib/juego/ligas';
  import { ventanaLiga } from '$lib/juego/ligas';

  export let liga: Liga;

  $: entriesVentana = ventanaLiga(liga, 2);
</script>

<div class="liga-container rounded-xl border border-amber-500/20 bg-slate-900/80 p-5 shadow-lg backdrop-blur">
  <div class="flex items-center justify-between border-b border-slate-800 pb-3">
    <div>
      <h2 data-testid="liga-title" class="text-xl font-bold text-amber-400">
        Liga {liga.tier}
      </h2>
      <p class="text-xs text-slate-400">Semana: {liga.weekKey}</p>
    </div>
    <div data-testid="liga-puesto" class="text-right">
      <span class="text-2xl font-black text-white">#{liga.puestoJugador}</span>
      <span class="text-xs text-slate-400">/30</span>
    </div>
  </div>

  {#if liga.movimiento === 'ascenso'}
    <div data-testid="liga-movimiento" class="mt-3 rounded bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 flex items-center gap-1">
      <span>▲ Zona de Ascenso</span>
    </div>
  {:else if liga.movimiento === 'descenso'}
    <div data-testid="liga-movimiento" class="mt-3 rounded bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-400 flex items-center gap-1">
      <span>▼ Zona de Descenso</span>
    </div>
  {/if}

  <div class="mt-4 space-y-1.5">
    {#each entriesVentana as entry (entry.alias)}
      <div
        data-testid="liga-row"
        class="flex items-center justify-between rounded px-3 py-2 text-sm transition-colors {entry.esJugador ? 'bg-amber-500/20 font-bold text-amber-300 ring-1 ring-amber-500/50' : 'bg-slate-800/50 text-slate-300'}"
      >
        <div class="flex items-center gap-3">
          <span class="w-6 text-center text-xs font-mono text-slate-400">#{entry.puesto}</span>
          <span class="truncate max-w-[140px]">{entry.alias}</span>
        </div>
        <span class="font-mono text-xs text-amber-400/90">{entry.xp} XP</span>
      </div>
    {/each}
  </div>
</div>
