<script lang="ts">
  import { onMount } from 'svelte';
  import { loadState, saveState, recordDaily } from '../../lib/juego/store';
  import { tierFor, xpToNextTier } from '../../lib/juego/xp';
  import { nivelDeElo } from '../../lib/juego/semaforo';
  import { listarInsignias } from '../../lib/juego/insignias';
  import type { GameState } from '../../lib/juego/types';

  let state = $state<GameState | null>(null);
  let insignias = $state<{ id: string }[]>([]);

  onMount(() => {
    const s = loadState(11);
    recordDaily(s);
    saveState(s);
    state = s;
    insignias = listarInsignias();
  });
</script>

<div class="w-full space-y-4" aria-label="Mi progreso de juego">
  {#if !state}
    <p class="text-xs text-white/40">Cargando tu progreso local…</p>
  {:else}
    {@const tier = tierFor(state.xpWeekly)}
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
        <p class="text-[10px] uppercase tracking-widest text-white/40">Elo</p>
        <p class="text-lg font-bold font-mono text-white">{state.elo}</p>
        <p class="text-[10px] text-blue-300">{nivelDeElo(state.elo)}</p>
      </div>
      <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
        <p class="text-[10px] uppercase tracking-widest text-white/40">Liga {tier}</p>
        <p class="text-lg font-bold font-mono text-white">{state.xpWeekly}</p>
        <p class="text-[10px] text-white/40">XP semanal · 🔥 {state.streakDays}d</p>
      </div>
    </div>
    {#if xpToNextTier(state.xpWeekly) > 0}
      <p class="text-[10px] text-white/40 text-center">A {xpToNextTier(state.xpWeekly)} XP del siguiente tier.</p>
    {/if}
    <div class="flex flex-wrap gap-2 justify-center text-xs font-bold">
      <a href="/juego/liga" class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10">Ver mi liga →</a>
      <a href="/juego/olimpiada" class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10">Olimpiada →</a>
    </div>
    {#if insignias.length > 0}
      <div class="space-y-1">
        <h4 class="text-[10px] font-bold uppercase tracking-widest text-white/40">Insignias ({insignias.length})</h4>
        <ul class="flex flex-wrap gap-1.5">
          {#each insignias as ins (ins.id)}
            <li class="text-[10px] font-mono px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-200">🏅 {ins.id}</li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}
</div>
