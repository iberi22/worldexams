<script lang="ts">
  import OlimpiadaHub from './OlimpiadaHub.svelte';
  import { esElegible, seasonKey, ventanaEstado, type ElegibilidadResultado, type HallEntry } from '../../lib/juego/olimpiada';
  import { leerHall } from '../../lib/juego/goat';

  const OPTIN_KEY = 'wx-juego-olimpiada-optin';

  let season = $state(seasonKey());
  let estado = $state(ventanaEstado());
  let optIn = $state(false);
  let hall = $state<HallEntry[]>([]);
  let currentTier = $state('Bronce');

  $effect(() => {
    if (typeof localStorage !== 'undefined') {
      optIn = localStorage.getItem(OPTIN_KEY) === '1';
      hall = leerHall();

      const rawXp = localStorage.getItem('spt_xp_weekly');
      const xp = rawXp ? parseInt(rawXp, 10) : 0;
      if (xp >= 1500) {
        currentTier = 'Oro';
      } else if (xp >= 800) {
        currentTier = 'Plata';
      } else {
        currentTier = 'Bronce';
      }
    }
  });

  // Partial eligibility based on current-week tier (mocks always [] in current state)
  let elegibilidad = $derived<ElegibilidadResultado>(esElegible([currentTier], []));

  function handleOptIn() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(OPTIN_KEY, '1');
      optIn = true;
    }
  }
</script>

<div class="olimpiada-panel">
  <OlimpiadaHub
    {season}
    {estado}
    {elegibilidad}
    {optIn}
    {hall}
    onOptIn={handleOptIn}
  />
</div>
