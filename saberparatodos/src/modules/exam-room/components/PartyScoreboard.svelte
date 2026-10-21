<script lang="ts">
  import type { ScoreboardEntry } from '../party/protocol';

  interface Props {
    entries: ScoreboardEntry[];
    highlightId?: string;
    limit?: number;
    title?: string;
  }

  let { entries, highlightId = '', limit = 10, title = 'Marcador en vivo' }: Props = $props();

  let visible = $derived(entries.slice(0, limit));
</script>

<section class="w-full" data-testid="party-scoreboard">
  <h3 class="text-xs uppercase tracking-widest opacity-60 mb-3">{title}</h3>
  {#if visible.length === 0}
    <p class="text-sm opacity-50">Aún no hay jugadores.</p>
  {:else}
    <ol class="space-y-2">
      {#each visible as entry (entry.playerId)}
        <li
          class="flex items-center justify-between rounded-lg px-4 py-2 border {entry.playerId === highlightId
            ? 'bg-emerald-500/20 border-emerald-500/60'
            : 'bg-white/5 border-white/10'}"
          data-testid="scoreboard-row"
        >
          <span class="flex items-center gap-3">
            <span class="w-6 text-right font-mono opacity-60">{entry.rank}.</span>
            <span class="font-semibold">{entry.nickname}</span>
          </span>
          <span class="font-mono text-emerald-300">{entry.score}</span>
        </li>
      {/each}
    </ol>
  {/if}
</section>
