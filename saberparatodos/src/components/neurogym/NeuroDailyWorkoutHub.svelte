<script lang="ts">
  /**
   * NeuroDailyWorkoutHub.svelte
   * Rutina diaria: 3 juegos elegidos por el coach offline, uno tras otro.
   * Cada juego guarda su propia sesión real en el historial local; ya no se
   * fabrica un perfil con valores inventados.
   *
   * Al terminar la rutina se informa el total al colegio con `reportResultToSchool`,
   * que no envía nada salvo que el estudiante se haya unido a un grupo y tenga
   * activado "Compartir mis resultados con mi colegio".
   */
  import NeuroTrainingSession from './NeuroTrainingSession.svelte';
  import { dailyPlan, type CoachRecommendation } from '../../lib/neurogym/agentic-neuro-coach';
  import { reportResultToSchool } from '../../lib/institutions/report-result';
  import {
    computeStreak,
    loadLevels,
    loadTrainingHistory,
    toLocalDateStr,
    type NeuroSessionSummary
  } from '../../lib/neurogym/training-history';

  interface Props {
    onWorkoutFinished?: () => void;
    onSessionComplete?: (summary: NeuroSessionSummary) => void;
  }

  let { onWorkoutFinished, onSessionComplete }: Props = $props();

  let stage = $state<'intro' | 'running' | 'completed'>('intro');
  let plan = $state<CoachRecommendation[]>([]);
  let step = $state(0);
  let summaries = $state<NeuroSessionSummary[]>([]);
  let streak = $state(0);
  let workoutStartedAt = Date.now();

  function refresh() {
    const history = loadTrainingHistory();
    const now = Date.now();
    plan = dailyPlan(history, loadLevels(), now, 3);
    streak = computeStreak(history.map((r) => r.dateStr), toLocalDateStr(now));
  }

  $effect(() => {
    refresh();
  });

  function start() {
    refresh();
    summaries = [];
    step = 0;
    workoutStartedAt = Date.now();
    stage = 'running';
  }

  function handleComplete(summary: NeuroSessionSummary) {
    summaries = [...summaries, summary];
    onSessionComplete?.(summary);
  }

  function next() {
    if (step + 1 < plan.length) {
      step++;
    } else {
      refresh();
      stage = 'completed';
      const total = summaries.reduce((n, s) => n + s.total, 0);
      const correct = summaries.reduce((n, s) => n + s.correct, 0);
      void reportResultToSchool({ source: 'neurogym', total, correct, durationS: (Date.now() - workoutStartedAt) / 1000 });
      onWorkoutFinished?.();
    }
  }
</script>

<div class="max-w-3xl mx-auto p-6 bg-gradient-to-br from-black via-[#0d1612] to-black border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
    <div class="flex items-center gap-3">
      <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
        <span class="text-2xl" aria-hidden="true">🔥</span>
      </div>
      <div>
        <h3 class="text-lg font-bold text-white">Rutina diaria</h3>
        <p class="text-xs text-white/50">3 ejercicios cortos elegidos por el coach según tu historial</p>
      </div>
    </div>
    <div class="text-right">
      <span class="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold block">Racha actual</span>
      <p class="text-xl font-black text-amber-300">{streak} {streak === 1 ? 'día' : 'días'}</p>
    </div>
  </div>

  {#if stage === 'intro'}
    <div class="space-y-4">
      <p class="text-xs text-white/70 leading-relaxed">
        Entrenamiento de atención, memoria de trabajo y velocidad de procesamiento. Sesiones breves y frecuentes
        ayudan a mejorar en estos mismos ejercicios; no se trata de una prueba de inteligencia.
      </p>
      <ol class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {#each plan as r, i (r.skill)}
          <li class="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span class="text-[10px] text-emerald-400 font-bold uppercase block">Bloque {i + 1} · {r.skillLabel}</span>
            <span class="text-xs text-white font-semibold block">{r.gameName}</span>
            <span class="text-[10px] text-white/50">Nivel {r.level}</span>
          </li>
        {/each}
      </ol>
      <button
        type="button"
        onclick={start}
        class="py-3 px-8 bg-amber-400 hover:bg-amber-500 text-black font-black uppercase tracking-wider text-xs rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        ⚡ Iniciar rutina de hoy
      </button>
    </div>
  {:else if stage === 'running' && plan[step]}
    <p class="text-xs text-amber-300 font-mono font-bold text-center">BLOQUE {step + 1} DE {plan.length}</p>
    {#key step}
      <NeuroTrainingSession
        gameId={plan[step].gameId}
        onSessionComplete={handleComplete}
        onExit={next}
        exitLabel={step + 1 < plan.length ? 'Siguiente bloque' : 'Terminar rutina'}
      />
    {/key}
  {:else if stage === 'completed'}
    <div class="text-center space-y-4 py-4">
      <h3 class="text-2xl font-black text-white">¡Rutina completada!</h3>
      <p class="text-xs text-white/60">Vuelve mañana para mantener tu racha. Tu progreso queda guardado en este dispositivo.</p>
      <ul class="max-w-md mx-auto space-y-2 text-left">
        {#each summaries as s (s.completedAt)}
          <li class="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
            <span class="text-white font-semibold">{s.gameName}</span>
            <span class="text-white/70">{Math.round(s.accuracy * 100)}% · nivel {s.startLevel} → {s.endLevel}</span>
          </li>
        {/each}
      </ul>
      <button
        type="button"
        onclick={() => (stage = 'intro')}
        class="py-2.5 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer"
      >
        Volver al panel
      </button>
    </div>
  {/if}
</div>
