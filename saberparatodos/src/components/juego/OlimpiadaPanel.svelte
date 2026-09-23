<script lang="ts">
  import { onMount } from 'svelte';
  import { loadState } from '../../lib/juego/store';
  import { tierFor } from '../../lib/juego/xp';
  import { seasonKey, ventanaEstado, esElegible, type Elegibilidad, type VentanaEstado } from '../../lib/juego/olimpiada';
  import { leerHall } from '../../lib/juego/goat';
  import OlimpiadaHub from './OlimpiadaHub.svelte';

  const OPTIN_KEY = 'wx-juego-olimpiada-optin';

  interface HallItem {
    alias: string;
    pais: string;
    season: string;
  }

  let season = $state('');
  let estado = $state<VentanaEstado>('futura');
  let elegibilidad = $state<Elegibilidad>({ elegible: false, semanasOro: 0, mejorSimulacro: null, motivos: [] });
  let optIn = $state(false);
  let hall = $state<HallItem[]>([]);
  let ready = $state(false);

  function readOptIn(): boolean {
    try {
      return localStorage.getItem(OPTIN_KEY) === '1';
    } catch {
      return false;
    }
  }

  function handleOptIn(): void {
    try {
      localStorage.setItem(OPTIN_KEY, '1');
    } catch {
      /* noop */
    }
    optIn = true;
  }

  onMount(() => {
    const now = Date.now();
    season = seasonKey(now);
    estado = ventanaEstado(season, now);
    const s = loadState(11);
    // Semana vigente como evidencia parcial; el historial completo llega con F9-UI de reportes.
    elegibilidad = esElegible([tierFor(s.xpWeekly)], []);
    optIn = readOptIn();
    hall = leerHall();
    ready = true;
  });
</script>

{#if !ready}
  <p class="text-xs text-white/40">Revisando la temporada…</p>
{:else}
  <OlimpiadaHub {season} {estado} {elegibilidad} {optIn} {hall} onOptIn={handleOptIn} />
  <p class="text-[10px] text-white/30 mt-3">
    La elegibilidad completa cruza tus tiers semanales + simulacros oficiales guardados en este dispositivo.
  </p>
{/if}
