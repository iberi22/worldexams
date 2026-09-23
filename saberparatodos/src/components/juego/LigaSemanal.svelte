<script lang="ts">
  import type { Liga } from '../../lib/juego/ligas';
  import { ventanaLiga } from '../../lib/juego/ligas';

  interface Props {
    liga: Liga;
  }

  let { liga }: Props = $props();
  let ventana = $derived(ventanaLiga(liga, 2));
</script>

<div class="w-full space-y-3" aria-label="Liga semanal">
  <div class="flex items-center justify-between gap-2">
    <h3 class="text-sm font-bold text-white/90">Liga {liga.tier} · {liga.weekKey}</h3>
    <span class="text-xs font-mono text-white/60">Puesto {liga.puestoJugador}/30</span>
  </div>

  {#if liga.movimiento === 1}
    <p class="text-xs font-semibold text-emerald-300">▲ Zona de ascenso — ¡sigue así!</p>
  {:else if liga.movimiento === -1}
    <p class="text-xs font-semibold text-red-300">▼ Zona de descenso — suma XP para salir.</p>
  {/if}

  <ol class="divide-y divide-white/5 rounded-xl border border-white/10 overflow-hidden">
    {#each ventana as m (m.alias + m.xp)}
      <li
        class="flex items-center justify-between gap-2 px-3 py-2 text-xs {m.esJugador
          ? 'bg-emerald-500/10 font-bold text-white'
          : 'text-white/70'}"
      >
        <span class="font-mono text-white/40 w-8">{m.puesto}°</span>
        <span class="flex-1 truncate">{m.alias}</span>
        <span class="font-mono">{m.xp} XP</span>
      </li>
    {/each}
  </ol>
  <p class="text-[10px] text-white/30">Top 5 ascienden · últimos 5 descienden · cuenta tu XP, no tu Elo.</p>
</div>
