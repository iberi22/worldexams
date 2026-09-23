<script lang="ts">
  import { onMount } from 'svelte';
  import { loadState, saveState, recordDaily } from '../../lib/juego/store';
  import { buildLiga, type Liga } from '../../lib/juego/ligas';
  import LigaSemanal from './LigaSemanal.svelte';

  let liga = $state<Liga | null>(null);

  onMount(() => {
    const s = loadState(11);
    recordDaily(s);
    saveState(s);
    // nodeHash estable por instancia para grupo semanal estable.
    let nodeHash = 'local';
    try {
      nodeHash = localStorage.getItem('swal.worldexams.instanceId') || 'local';
    } catch {
      /* noop */
    }
    liga = buildLiga(s.weekKey, s.xpWeekly, nodeHash);
  });
</script>

{#if !liga}
  <p class="text-xs text-white/40">Armando tu grupo semanal…</p>
{:else}
  <LigaSemanal {liga} />
{/if}
