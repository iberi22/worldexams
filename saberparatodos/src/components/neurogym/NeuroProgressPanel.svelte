<script lang="ts">
  /**
   * NeuroProgressPanel.svelte
   * Progreso por habilidad (sparkline SVG en línea), racha y recomendaciones
   * del coach offline. Todo se calcula con el historial local del dispositivo.
   */
  import { dailyPlan } from '../../lib/neurogym/agentic-neuro-coach';
  import { SKILL_LABELS, type TrainingGameId } from '../../lib/neurogym/training-catalog';
  import {
    computeStreak,
    getAllSkillTrends,
    loadLevels,
    loadTrainingHistory,
    sparklinePoints,
    toLocalDateStr,
    type TrainingSessionRecord
  } from '../../lib/neurogym/training-history';

  interface Props {
    /** Cambia este valor para forzar la recarga del historial. */
    refreshToken?: number;
    onPlay?: (gameId: TrainingGameId) => void;
  }

  let { refreshToken = 0, onPlay }: Props = $props();

  const SPARK_W = 140;
  const SPARK_H = 36;
  const SPARK_PAD = 5;

  let history = $state<TrainingSessionRecord[]>([]);
  let now = $state(Date.now());

  $effect(() => {
    void refreshToken;
    history = loadTrainingHistory();
    now = Date.now();
  });

  const trends = $derived(getAllSkillTrends(history, 10));
  const streak = $derived(computeStreak(history.map((r) => r.dateStr), toLocalDateStr(now)));
  const trainedDays = $derived(new Set(history.map((r) => r.dateStr)).size);
  const plan = $derived(dailyPlan(history, loadLevels(), now, 3));

  function pointCoords(values: number[]): { x: number; y: number; v: number }[] {
    const pts = sparklinePoints(values, SPARK_W, SPARK_H, SPARK_PAD);
    if (!pts) return [];
    return pts.split(' ').map((p, i) => {
      const [x, y] = p.split(',').map(Number);
      return { x, y, v: values[i] };
    });
  }
</script>

<section class="space-y-5" aria-labelledby="ng-progress-title">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <h3 id="ng-progress-title" class="text-sm font-bold uppercase tracking-wider text-white">Mi progreso</h3>
    <p class="text-[10px] text-white/40">Datos guardados solo en este dispositivo</p>
  </div>

  <div class="grid grid-cols-3 gap-3 text-center">
    <div class="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
      <span class="text-[10px] uppercase tracking-widest text-amber-300 font-bold block">Racha</span>
      <span class="text-2xl font-black text-white">{streak}</span>
      <span class="text-[10px] text-white/50 block">{streak === 1 ? 'día' : 'días'} seguidos</span>
    </div>
    <div class="p-4 bg-white/5 border border-white/10 rounded-2xl">
      <span class="text-[10px] uppercase tracking-widest text-white/60 font-bold block">Sesiones</span>
      <span class="text-2xl font-black text-white">{history.length}</span>
    </div>
    <div class="p-4 bg-white/5 border border-white/10 rounded-2xl">
      <span class="text-[10px] uppercase tracking-widest text-white/60 font-bold block">Días entrenados</span>
      <span class="text-2xl font-black text-white">{trainedDays}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {#each trends as t (t.skill)}
      {@const coords = pointCoords(t.points)}
      <article class="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-white">{SKILL_LABELS[t.skill]}</h4>
          <span class="text-[10px] text-white/50 font-mono">{t.sessions} {t.sessions === 1 ? 'sesión' : 'sesiones'}</span>
        </div>
        {#if t.points.length === 0}
          <p class="text-[11px] text-white/40 py-3">Sin sesiones todavía.</p>
        {:else}
          <div class="flex items-end justify-between gap-3">
            <svg
              width={SPARK_W}
              height={SPARK_H}
              viewBox="0 0 {SPARK_W} {SPARK_H}"
              role="img"
              aria-label="Tendencia de {SKILL_LABELS[t.skill]} en las últimas {t.points.length} sesiones"
            >
              <line x1={SPARK_PAD} x2={SPARK_W - SPARK_PAD} y1={SPARK_H - SPARK_PAD} y2={SPARK_H - SPARK_PAD} class="ng-spark-base" />
              {#if coords.length > 1}
                <polyline
                  points={sparklinePoints(t.points, SPARK_W, SPARK_H, SPARK_PAD)}
                  fill="none"
                  class="ng-spark-line"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                />
              {/if}
              {#each coords as c, i}
                <circle cx={c.x} cy={c.y} r="8" fill="transparent">
                  <title>Sesión {i + 1}: índice {c.v}/100</title>
                </circle>
              {/each}
              {#if coords.length > 0}
                {@const last = coords[coords.length - 1]}
                <circle cx={last.x} cy={last.y} r="4" class="ng-spark-dot" />
              {/if}
            </svg>
            <div class="text-right">
              <span class="text-lg font-black text-white block leading-none">{t.latest}</span>
              <span class="text-[10px] font-mono {t.delta > 0 ? 'text-emerald-300' : t.delta < 0 ? 'text-rose-300' : 'text-white/50'}">
                {t.delta > 0 ? '▲ +' : t.delta < 0 ? '▼ ' : '● '}{t.delta}
              </span>
            </div>
          </div>
          <p class="sr-only">Índices de las últimas sesiones: {t.points.join(', ')}.</p>
        {/if}
      </article>
    {/each}
  </div>
  <p class="text-[10px] text-white/40">
    Índice 0–100 = 60 % precisión + 40 % nivel alcanzado en cada sesión. Refleja tu desempeño en estos ejercicios,
    no es una medida clínica ni de inteligencia.
  </p>

  <div class="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl space-y-3">
    <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-300">Recomendaciones del coach para hoy</h4>
    <ol class="space-y-2">
      {#each plan as r, i (r.skill)}
        <li class="flex flex-wrap items-center justify-between gap-2 p-3 bg-black/40 border border-white/10 rounded-xl">
          <div class="min-w-0 flex-1">
            <span class="text-xs font-bold text-white">{i + 1}. {r.gameName}</span>
            <span class="text-[10px] text-white/50"> · {r.skillLabel} · nivel {r.level}</span>
            <p class="text-[11px] text-white/60">{r.rationale}</p>
          </div>
          {#if onPlay}
            <button
              type="button"
              onclick={() => onPlay?.(r.gameId)}
              class="py-2 px-3 bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Entrenar
            </button>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .ng-spark-base {
    stroke: rgba(255, 255, 255, 0.12);
    stroke-width: 1;
  }
  .ng-spark-line {
    stroke: #34d399;
  }
  .ng-spark-dot {
    fill: #34d399;
    stroke: #070707;
    stroke-width: 2;
  }
</style>
