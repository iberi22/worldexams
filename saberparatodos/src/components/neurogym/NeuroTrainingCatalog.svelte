<script lang="ts">
  /**
   * NeuroTrainingCatalog.svelte
   * Catálogo de juegos de entrenamiento. Al elegir uno se abre NeuroTrainingSession.
   * Reexpone `onSessionComplete(summary)` para quien integre NeuroGym.
   */
  import NeuroTrainingSession from './NeuroTrainingSession.svelte';
  import { SKILL_LABELS, TRAINING_GAMES, type TrainingGameId } from '../../lib/neurogym/training-catalog';
  import type { NeuroSessionSummary } from '../../lib/neurogym/training-history';

  interface Props {
    /** Juego a abrir directamente (p. ej. desde una recomendación del coach). */
    selected?: TrainingGameId | null;
    onSessionComplete?: (summary: NeuroSessionSummary) => void;
  }

  let { selected = $bindable(null), onSessionComplete }: Props = $props();
</script>

{#if selected}
  <NeuroTrainingSession gameId={selected} {onSessionComplete} onExit={() => (selected = null)} />
{:else}
  <section class="space-y-4" aria-labelledby="ng-catalog-title">
    <div>
      <h3 id="ng-catalog-title" class="text-sm font-bold uppercase tracking-wider text-white">Juegos de entrenamiento</h3>
      <p class="text-xs text-white/50">
        Entrenamiento de atención, memoria de trabajo y velocidad de procesamiento. Cada juego tiene práctica,
        dificultad adaptativa y guarda tu historial en este dispositivo.
      </p>
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each TRAINING_GAMES as g (g.id)}
        <li>
          <button
            type="button"
            onclick={() => (selected = g.id)}
            class="w-full h-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-emerald-400/60 rounded-2xl transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span class="text-2xl" aria-hidden="true">{g.icon}</span>
            <span class="block text-sm font-bold text-white mt-1">{g.name}</span>
            <span class="block text-[10px] uppercase tracking-wider text-emerald-300/80">{SKILL_LABELS[g.skill]}</span>
            <span class="block text-[11px] text-white/60 mt-1">{g.instructions[0]}</span>
          </button>
        </li>
      {/each}
    </ul>
  </section>
{/if}
