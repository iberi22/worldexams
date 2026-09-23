<script lang="ts">
  interface LigaResumen {
    tier: string;
    puesto: number;
    xpFaltante: number;
  }

  interface Props {
    xpGanado: number;
    eloAntes: number;
    eloDespues: number;
    rachaDias: number;
    liga: LigaResumen;
    onJugarOtra: () => void;
    onRevisar: () => void;
  }

  let { xpGanado, eloAntes, eloDespues, rachaDias, liga, onJugarOtra, onRevisar }: Props = $props();
  let delta = $derived(eloDespues - eloAntes);
</script>

<div class="w-full max-w-md mx-auto p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center space-y-4" aria-label="Pantalla de victoria">
  <h2 class="text-xl font-bold text-white tracking-tight">🏆 ¡Cuestionario superado!</h2>

  <div class="space-y-1 text-sm">
    <p class="text-emerald-300 font-bold">✨ +{xpGanado} XP</p>
    <p class="text-white/70 font-mono text-xs">
      📈 Elo {eloAntes} ➔ {eloDespues}
      {#if delta > 0}<span class="text-emerald-300">(+{delta})</span>{/if}
      {#if delta < 0}<span class="text-red-300">({delta})</span>{/if}
      {#if delta === 0}<span class="text-white/40">(sin cambio)</span>{/if}
    </p>
    <p class="text-white/60 text-xs">🔥 Racha: {rachaDias} {rachaDias === 1 ? 'día' : 'días'}</p>
  </div>

  <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
    Liga {liga.tier} · puesto {liga.puesto}
    {#if liga.xpFaltante > 0}
      <span class="text-white/50">· a {liga.xpFaltante} XP del siguiente nivel</span>
    {:else}
      <span class="text-yellow-300">· ¡cima del tier!</span>
    {/if}
  </div>

  <div class="flex gap-2 justify-center">
    <button
      type="button"
      onclick={onJugarOtra}
      class="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
    >
      ¡Jugar otra ronda!
    </button>
    <button
      type="button"
      onclick={onRevisar}
      class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-bold hover:bg-white/10 transition-colors"
    >
      Revisar errores 🔴
    </button>
  </div>
</div>
