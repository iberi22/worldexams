<script lang="ts">
  import type { ScoreboardEntry } from '../party/protocol';
  import PartyScoreboard from './PartyScoreboard.svelte';

  interface Props {
    entries: ScoreboardEntry[];
    highlightId?: string;
  }

  let { entries, highlightId = '' }: Props = $props();

  const MEDALS = ['🥇', '🥈', '🥉'];
  // Orden visual clásico del podio: 2.º, 1.º, 3.º
  let podium = $derived(
    [entries[1], entries[0], entries[2]]
      .map((entry, slot) => (entry ? { entry, slot } : null))
      .filter((item): item is { entry: ScoreboardEntry; slot: number } => item !== null),
  );
  const HEIGHTS = ['h-28', 'h-40', 'h-20'];
</script>

<div class="w-full max-w-2xl mx-auto text-center" data-testid="party-podium">
  <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-400 mb-8">
    ¡Podio final!
  </h2>

  {#if entries.length === 0}
    <p class="opacity-60">Nadie respondió en esta partida.</p>
  {:else}
    <div class="flex items-end justify-center gap-3 mb-10">
      {#each podium as { entry, slot } (entry.playerId)}
        <div class="flex flex-col items-center w-28">
          <span class="text-3xl">{MEDALS[entry.rank - 1] ?? '🏅'}</span>
          <span class="font-bold truncate max-w-full {entry.playerId === highlightId ? 'text-emerald-300' : ''}">
            {entry.nickname}
          </span>
          <span class="font-mono text-sm opacity-70 mb-2">{entry.score} pts</span>
          <div class="w-full {HEIGHTS[slot]} rounded-t-lg bg-gradient-to-t from-emerald-700/60 to-cyan-500/60 border border-white/10"></div>
        </div>
      {/each}
    </div>

    {#if entries.length > 3}
      <PartyScoreboard entries={entries.slice(3)} {highlightId} limit={20} title="Resto de la clase" />
    {/if}
  {/if}
</div>
