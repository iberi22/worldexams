<script lang="ts">
  /**
   * ScoreDisplay.svelte
   * Explica y muestra el puntaje de practica al finalizar un examen.
   */

  import type { ExamScore } from '../lib/scoring';
  import {
    formatAccuracy,
    formatScore,
    formatTime
  } from '../lib/scoring';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let examScore: ExamScore;
  export let showBreakdown = false;

  const displayAccuracy = tweened(0, {
    duration: 1200,
    easing: cubicOut
  });

  let showDetails = false;
  let showScoreHelp = false;

  onMount(() => {
    displayAccuracy.set(examScore.stats.accuracy * 100);
  });

  function getGrade(accuracy: number): { letter: string; color: string; message: string } {
    if (accuracy >= 0.95) return { letter: 'S', color: 'text-purple-400', message: 'Extraordinario' };
    if (accuracy >= 0.90) return { letter: 'A+', color: 'text-emerald-400', message: 'Excelente' };
    if (accuracy >= 0.80) return { letter: 'A', color: 'text-green-400', message: 'Muy bien' };
    if (accuracy >= 0.70) return { letter: 'B', color: 'text-yellow-400', message: 'Buen trabajo' };
    if (accuracy >= 0.60) return { letter: 'C', color: 'text-orange-400', message: 'Puedes mejorar' };
    return { letter: 'D', color: 'text-red-400', message: 'Sigue practicando' };
  }

  function closeScoreHelp() {
    showScoreHelp = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showScoreHelp) {
      closeScoreHelp();
    }
  }

  $: grade = getGrade(examScore.stats.accuracy);
  $: practiceScore = examScore.practiceScore ?? examScore.totalScore;
  $: icfesEstimate = examScore.icfesEstimate;
  $: scoreRange = examScore.scoreRange;
  $: questionImpactCopy = examScore.stats.correctAnswers > 0
    ? `Tus aciertos pueden sumar bastante porque cada correcta parte desde 100 puntos y luego sube por dificultad, velocidad y racha.`
    : 'En esta sesion no hubo respuestas correctas, asi que solo se aplicaron penalizaciones y bonos de cierre si correspondian.';

  function getConfidenceTone(confidence: string): string {
    if (confidence === 'high') return 'text-emerald-300 border-emerald-400/25 bg-emerald-400/10';
    if (confidence === 'medium') return 'text-amber-200 border-amber-300/25 bg-amber-300/10';
    return 'text-sky-200 border-sky-300/25 bg-sky-300/10';
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
  <div class="relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-2xl overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-400"></div>
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

    <div class="relative z-10">
      <div class="flex justify-center mb-6">
        <div
          class={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex items-center justify-center ${grade.color} border-current bg-current/10 animate-pulse-slow`}
        >
          <span class="text-4xl sm:text-5xl font-black">{grade.letter}</span>
        </div>
      </div>

      <p class={`text-center text-xl sm:text-2xl font-bold mb-2 ${grade.color}`}>
        {grade.message}
      </p>

      <div class="text-center mb-6">
        <div class="flex flex-wrap items-center justify-center gap-3 mb-2">
          <p class="text-xs text-cyan-300/90 uppercase tracking-[0.35em]">Puntaje estimado ICFES</p>
          <button
            type="button"
            on:click={() => showScoreHelp = true}
            class="w-8 h-8 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 transition-colors flex items-center justify-center"
            aria-label="Explicar como funciona el puntaje"
            title="Como funciona este puntaje"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </button>
          <span class={`px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.22em] ${getConfidenceTone(icfesEstimate.confidence)}`}>
            {icfesEstimate.label}
          </span>
        </div>

        <p class="text-5xl sm:text-6xl font-black text-[#F5F5DC] tabular-nums">
          {icfesEstimate.score.toLocaleString('es-CO')}
          <span class="ml-1 text-lg sm:text-xl text-white/45">/500</span>
        </p>
        <p class="text-sm text-white/45 uppercase tracking-widest mt-1">
          {icfesEstimate.disclaimer}
        </p>
      </div>

      <div class="mb-7 p-4 rounded-2xl border border-cyan-400/15 bg-black/15">
        <div class="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-white/45">
          <span>Estado de esta estimacion</span>
          <span>{icfesEstimate.evidenceCount} preguntas observadas</span>
        </div>
        <div class="mt-3 h-2 rounded-full bg-white/8 overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-300 transition-all duration-700"
            style={`width: ${Math.min(100, (icfesEstimate.evidenceCount / 80) * 100)}%`}
          ></div>
        </div>
        <p class="mt-3 text-sm text-white/65 leading-relaxed">
          Esta lectura usa una metodologia proxy en escala ICFES 0-500. Combina rendimiento, dificultad,
          consistencia y volumen de evidencia. El puntaje de practica se conserva aparte para ranking interno.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl sm:text-3xl font-bold text-emerald-400">
            {Math.round($displayAccuracy)}%
          </p>
          <p class="text-[10px] uppercase tracking-widest text-white/40">Precision</p>
        </div>
        <div>
          <p class="text-2xl sm:text-3xl font-bold text-blue-400">
            {examScore.stats.correctAnswers}/{examScore.stats.questionsAnswered}
          </p>
          <p class="text-[10px] uppercase tracking-widest text-white/40">Correctas</p>
        </div>
        <div>
          <p class="text-2xl sm:text-3xl font-bold text-yellow-400">
            {examScore.stats.longestStreak}
          </p>
          <p class="text-[10px] uppercase tracking-widest text-white/40">Mejor racha</p>
        </div>
      </div>
    </div>
  </div>

  <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-sm font-bold uppercase tracking-widest text-white/60">
          Desempeño de la sesion
        </h3>
        <p class="mt-1 text-xs text-white/45 leading-relaxed">
          {questionImpactCopy} Estas metricas ayudan a calcular tu estimado ICFES.
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex justify-between items-center gap-4">
        <span class="text-sm text-white/80">Puntos netos por preguntas</span>
        <span class={`font-mono ${examScore.subtotal >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {examScore.subtotal > 0 ? '+' : ''}{formatScore(examScore.subtotal)}
        </span>
      </div>

      {#if examScore.completionBonus > 0}
        <div class="flex justify-between items-center gap-4">
          <span class="text-sm text-white/80">Bonus por completar la sesion</span>
          <span class="font-mono text-blue-400">+{formatScore(examScore.completionBonus)}</span>
        </div>
      {/if}

      {#if examScore.accuracyBonus > 0}
        <div class="flex justify-between items-center gap-4">
          <span class="text-sm text-white/80">Bonus por precision alta ({formatAccuracy(examScore.stats.accuracy)})</span>
          <span class="font-mono text-yellow-400">+{formatScore(examScore.accuracyBonus)}</span>
        </div>
      {/if}

      {#if examScore.perfectBonus > 0}
        <div class="flex justify-between items-center gap-4">
          <span class="text-sm text-white/80">Bonus por puntaje perfecto</span>
          <span class="font-mono text-purple-400">+{formatScore(examScore.perfectBonus)}</span>
        </div>
      {/if}

      <div class="border-t border-white/10 pt-3 mt-3">
        <div class="flex justify-between items-center gap-4">
          <span class="font-bold text-white/60 uppercase text-[10px] tracking-widest">Puntaje por sesion</span>
          <span class="font-mono font-bold text-lg text-white/40">
            {formatScore(practiceScore)}
          </span>
        </div>
      </div>
    </div>
  </div>

  {#if showBreakdown}
    <button
      on:click={() => showDetails = !showDetails}
      class="w-full py-3 text-xs uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors flex items-center justify-center gap-2"
    >
      {showDetails ? 'Ocultar' : 'Ver'} detalle por pregunta
    </button>

    {#if showDetails}
      <div class="space-y-2 max-h-64 overflow-y-auto">
        {#each examScore.questionScores as qs, index}
          <div
            class={`p-3 rounded-lg border text-sm ${qs.totalScore > 0
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-red-500/5 border-red-500/20'}`}
          >
            <div class="flex justify-between items-center">
              <span class="font-mono text-white/60">Pregunta {index + 1}</span>
              <span class={`font-mono font-bold ${qs.totalScore > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {qs.totalScore > 0 ? '+' : ''}{qs.totalScore}
              </span>
            </div>
            {#if qs.totalScore > 0}
              <p class="text-[10px] text-white/40 mt-1">
                {qs.breakdown}
              </p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/if}

  <div class="grid grid-cols-2 gap-3">
    <div class="p-3 bg-white/5 border border-white/10 rounded-lg">
      <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Tiempo total</p>
      <p class="font-mono text-lg text-[#F5F5DC]">
        {formatTime(examScore.stats.totalTimeSeconds)}
      </p>
    </div>
    <div class="p-3 bg-white/5 border border-white/10 rounded-lg">
      <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Promedio/pregunta</p>
      <p class="font-mono text-lg text-[#F5F5DC]">
        {formatTime(examScore.stats.averageTimePerQuestion)}
      </p>
    </div>
    <div class="p-3 bg-white/5 border border-white/10 rounded-lg">
      <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Dificultad prom.</p>
      <p class="font-mono text-lg text-[#F5F5DC]">
        {examScore.stats.averageDifficulty.toFixed(1)} / 5
      </p>
    </div>
    <div class="p-3 bg-white/5 border border-white/10 rounded-lg">
      <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Incorrectas</p>
      <p class="font-mono text-lg text-red-400">
        {examScore.stats.incorrectAnswers}
      </p>
    </div>
  </div>
</div>

{#if showScoreHelp}
  <div
    class="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="score-help-title"
    on:click={(event) => {
      if (event.currentTarget === event.target) {
        closeScoreHelp();
      }
    }}
  >
    <div class="max-w-2xl mx-auto rounded-2xl border border-cyan-400/20 bg-[#111827] shadow-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4">
        <div>
          <p class="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">Guia de puntaje</p>
          <h3 id="score-help-title" class="mt-2 text-xl font-black text-white">
            Como funciona tu puntaje de practica
          </h3>
        </div>
        <button
          type="button"
          on:click={closeScoreHelp}
          class="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar explicacion del puntaje"
        >
          ✕
        </button>
      </div>

      <div class="px-6 py-6 space-y-6 text-sm text-white/75">
        <div class="p-4 rounded-2xl border border-amber-400/15 bg-amber-400/10">
          <p class="font-semibold text-amber-100">
            Esta estimacion no es un puntaje ICFES oficial.
          </p>
          <p class="mt-2 leading-relaxed">
            Usa una escala 0-500 solo para acercarse al formato de reporte del ICFES, pero no replica su
            metodologia psicometrica oficial ni reemplaza el reporte real.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="p-4 rounded-2xl border border-white/10 bg-white/5">
            <p class="text-xs uppercase tracking-[0.25em] text-white/45">Evidencia acumulada</p>
            <p class="mt-2 text-2xl font-black text-white">{icfesEstimate.evidenceCount} preguntas</p>
            <p class="mt-2 leading-relaxed">
              Menos de 20 preguntas deja la lectura como provisional. Con mas volumen y mas areas, la confianza sube.
            </p>
          </div>
          <div class="p-4 rounded-2xl border border-white/10 bg-white/5">
            <p class="text-xs uppercase tracking-[0.25em] text-white/45">Tu lectura actual</p>
            <p class="mt-2 text-2xl font-black text-cyan-300">{icfesEstimate.score}/500</p>
            <p class="mt-2 leading-relaxed">
              Precisión: {Math.round(examScore.stats.accuracy * 100)}%. Correctas: {examScore.stats.correctAnswers}/{examScore.stats.questionsAnswered}.
            </p>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-base font-bold text-white">Como se usa cada escala</h4>
          <div class="p-4 rounded-2xl border border-white/10 bg-white/5 leading-relaxed">
            <p>La escala <strong class="text-white">ICFES proxy</strong> prioriza rendimiento, dificultad, consistencia y evidencia acumulada.</p>
            <p class="mt-2">La escala <strong class="text-white">WorldExams</strong> sigue usando dificultad, velocidad, racha y bonus para gamificar la practica.</p>
            <p class="mt-2">Por eso ambas escalas pueden moverse distinto en una misma sesion.</p>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-base font-bold text-white">Formula resumida de practica</h4>
          <div class="p-4 rounded-2xl border border-white/10 bg-[#0b1220] font-mono text-xs text-cyan-200 overflow-x-auto">
            <p>Puntos correcta = 100 x dificultad x velocidad x racha</p>
            <p class="mt-2">Puntos incorrecta = -20 x dificultad</p>
            <p class="mt-2">Total = preguntas + bonus por completar + bonus por precision + bonus perfecto</p>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-base font-bold text-white">Bonos maximos de esta sesion</h4>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="p-4 rounded-2xl border border-white/10 bg-white/5">
              <p class="text-xs uppercase tracking-[0.25em] text-white/45">Completar</p>
              <p class="mt-2 text-xl font-black text-blue-300">+{formatScore(scoreRange.completionBonus)}</p>
            </div>
            <div class="p-4 rounded-2xl border border-white/10 bg-white/5">
              <p class="text-xs uppercase tracking-[0.25em] text-white/45">Precision alta</p>
              <p class="mt-2 text-xl font-black text-yellow-300">+{formatScore(scoreRange.maxAccuracyBonus)}</p>
            </div>
            <div class="p-4 rounded-2xl border border-white/10 bg-white/5">
              <p class="text-xs uppercase tracking-[0.25em] text-white/45">Perfecto</p>
              <p class="mt-2 text-xl font-black text-purple-300">+{formatScore(scoreRange.perfectBonus)}</p>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
          <h4 class="text-base font-bold text-emerald-100">Transparencia de Escala</h4>
          <p class="mt-2 leading-relaxed">
            Hemos alineado el sistema de nivel (MMR) a la escala <strong class="text-white">ICFES 0-500</strong>.
            El puntaje de sesion es solo una metrica de apoyo para el calculo del progreso.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }
</style>
