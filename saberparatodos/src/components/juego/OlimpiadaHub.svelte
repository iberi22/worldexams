<script lang="ts">
  import type { VentanaEstado, Elegibilidad } from '../../lib/juego/olimpiada';

  interface HallItem {
    alias: string;
    pais: string;
    season: string;
  }

  interface Props {
    season: string;
    estado: VentanaEstado;
    elegibilidad: Elegibilidad;
    optIn: boolean;
    hall: HallItem[];
    onOptIn: () => void;
  }

  let { season, estado, elegibilidad, optIn, hall, onOptIn }: Props = $props();
</script>

<div class="w-full space-y-4" aria-label="Olimpiada trimestral">
  <div class="flex items-center justify-between gap-2">
    <h3 class="text-sm font-bold text-white/90" data-testid="oli-season">Olimpiada {season}</h3>
    <span class="text-[10px] font-mono px-2 py-1 rounded-full border border-white/10 text-white/60" data-testid="oli-estado">
      {#if estado === 'abierta'}🟢 ventana abierta (72h){/if}
      {#if estado === 'futura'}🟡 abre al cierre del trimestre{/if}
      {#if estado === 'cerrada'}⚪ temporada cerrada{/if}
    </span>
  </div>

  {#if elegibilidad.elegible}
    <p class="text-xs text-emerald-300 font-semibold" data-testid="oli-motivos">✓ Clasificas: Oro+ en {elegibilidad.semanasOro} semanas + simulacro válido.</p>
  {:else}
    <ul class="text-xs text-white/60 space-y-1" data-testid="oli-motivos">
      {#each elegibilidad.motivos as motivo (motivo)}
        <li>• {motivo}</li>
      {/each}
    </ul>
  {/if}

  {#if elegibilidad.elegible && estado !== 'cerrada'}
    {#if optIn}
      <p class="text-xs text-white/70" data-testid="oli-optin">Inscrito como competidor anónimo. Tu alias y país aparecerán si ganas — nunca tus notas.</p>
    {:else}
      <button
        type="button"
        onclick={onOptIn}
        data-testid="oli-optin"
        class="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
      >
        Quiero competir (anónimo, revocable)
      </button>
    {/if}
  {/if}

  <div class="space-y-2" data-testid="oli-hall">
    <h4 class="text-[10px] font-bold uppercase tracking-widest text-white/40">Hall of fame anónimo</h4>
    {#if hall.length === 0}
      <p class="text-xs text-white/40 italic">Aún sin campeones registrados en este dispositivo.</p>
    {:else}
      <ul class="space-y-1">
        {#each hall as h (h.alias + h.season + h.pais)}
          <li class="text-xs text-white/70">🏆 {h.alias} · {h.pais.toUpperCase()} · {h.season}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
