<script lang="ts">
  import { onMount } from 'svelte';
  import { buildLiga, type Liga } from '$lib/juego/ligas';
  import LigaSemanal from './LigaSemanal.svelte';

  let liga: Liga | null = null;

  onMount(() => {
    const rawXp = localStorage.getItem('spt_xp_weekly');
    const xpWeekly = rawXp !== null ? parseInt(rawXp, 10) : 1300;
    const nodeHash = localStorage.getItem('swal.worldexams.instanceId') || 'swal-node-local';
    liga = buildLiga(isNaN(xpWeekly) ? 1300 : xpWeekly, undefined, nodeHash);
  });
</script>

{#if liga}
  <LigaSemanal {liga} />
{:else}
  <div class="p-4 text-center text-slate-400">Cargando liga semanal...</div>
{/if}
