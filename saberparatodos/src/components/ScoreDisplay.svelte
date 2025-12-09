<script lang="ts">
  /**
   * ScoreDisplay.svelte
   * Componente para mostrar el desglose de puntos al finalizar un examen
   * Colombia - saberparatodos
   */

  import type { ExamScore, QuestionScore } from '../lib/scoring';
  import {
    formatScore,
    formatAccuracy,
    formatTime,
    getDifficultyName,
    getDifficultyColor
  } from '../lib/scoring';

  // Props
  export let examScore: ExamScore;
  export let showBreakdown = false;

  // Animación de contador
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  const displayScore = tweened(0, {
    duration: 1500,
    easing: cubicOut
  });

  const displayAccuracy = tweened(0, {
    duration: 1200,
    easing: cubicOut
  });

  onMount(() => {
    displayScore.set(examScore.totalScore);
    displayAccuracy.set(examScore.stats.accuracy * 100);
  });

  // Toggle breakdown
  let showDetails = false;

  // Calificación según porcentaje
  function getGrade(accuracy: number): { letter: string; color: string; message: string } {
    if (accuracy >= 0.95) return { letter: 'S', color: 'text-purple-400', message: '¡Extraordinario!' };
    if (accuracy >= 0.90) return { letter: 'A+', color: 'text-emerald-400', message: '¡Excelente!' };
    if (accuracy >= 0.80) return { letter: 'A', color: 'text-green-400', message: '¡Muy bien!' };
    if (accuracy >= 0.70) return { letter: 'B', color: 'text-yellow-400', message: 'Buen trabajo' };
    if (accuracy >= 0.60) return { letter: 'C', color: 'text-orange-400', message: 'Puedes mejorar' };
    return { letter: 'D', color: 'text-red-400', message: 'Sigue practicando' };
  }

  $: grade = getGrade(examScore.stats.accuracy);
</script>

<div class="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
  <!-- Main Score Card -->
  <div class="relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]
              border border-white/10 rounded-2xl overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

    <div class="relative z-10">
      <!-- Grade Badge -->
      <div class="flex justify-center mb-6">
        <div class={`
          w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4
          flex items-center justify-center
          ${grade.color} border-current bg-current/10
          animate-pulse-slow
        `}>
          <span class="text-4xl sm:text-5xl font-black">{grade.letter}</span>
        </div>
      </div>

      <!-- Message -->
      <p class={`text-center text-xl sm:text-2xl font-bold mb-2 ${grade.color}`}>
        {grade.message}
      </p>

      <!-- Total Score -->
      <div class="text-center mb-8">
        <p class="text-5xl sm:text-6xl font-black text-[#F5F5DC] tabular-nums">
          {Math.round($displayScore).toLocaleString('es-CO')}
        </p>
        <p class="text-sm text-white/40 uppercase tracking-widest mt-1">puntos totales</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl sm:text-3xl font-bold text-emerald-400">
            {Math.round($displayAccuracy)}%
          </p>
          <p class="text-[10px] uppercase tracking-widest text-white/40">Precisión</p>
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

  <!-- Bonus Breakdown -->
  <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
    <h3 class="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">
      Desglose de bonificaciones
    </h3>

    <div class="space-y-3">
      <!-- Subtotal preguntas -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-white/80">Puntos por preguntas</span>
        <span class="font-mono text-emerald-400">+{formatScore(examScore.subtotal)}</span>
      </div>

      <!-- Completion Bonus -->
      {#if examScore.completionBonus > 0}
        <div class="flex justify-between items-center">
          <span class="text-sm text-white/80">
            <span class="mr-2">🎯</span>Bonus por completar
          </span>
          <span class="font-mono text-blue-400">+{formatScore(examScore.completionBonus)}</span>
        </div>
      {/if}

      <!-- Accuracy Bonus -->
      {#if examScore.accuracyBonus > 0}
        <div class="flex justify-between items-center">
          <span class="text-sm text-white/80">
            <span class="mr-2">🎖️</span>Bonus precisión ({formatAccuracy(examScore.stats.accuracy)})
          </span>
          <span class="font-mono text-yellow-400">+{formatScore(examScore.accuracyBonus)}</span>
        </div>
      {/if}

      <!-- Perfect Bonus -->
      {#if examScore.perfectBonus > 0}
        <div class="flex justify-between items-center">
          <span class="text-sm text-white/80">
            <span class="mr-2">⭐</span>¡Puntaje perfecto!
          </span>
          <span class="font-mono text-purple-400">+{formatScore(examScore.perfectBonus)}</span>
        </div>
      {/if}

      <!-- Divider -->
      <div class="border-t border-white/10 pt-3 mt-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-white">Total</span>
          <span class="font-mono font-bold text-xl text-[#F5F5DC]">
            {formatScore(examScore.totalScore)}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Breakdown Toggle -->
  {#if showBreakdown}
    <button
      on:click={() => showDetails = !showDetails}
      class="w-full py-3 text-xs uppercase tracking-widest text-white/40
             hover:text-white/80 transition-colors flex items-center justify-center gap-2"
    >
      {showDetails ? '▼ Ocultar' : '▶ Ver'} detalle por pregunta
    </button>

    {#if showDetails}
      <div class="space-y-2 max-h-64 overflow-y-auto">
        {#each examScore.questionScores as qs, index}
          <div class={`
            p-3 rounded-lg border text-sm
            ${qs.totalScore > 0
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-red-500/5 border-red-500/20'}
          `}>
            <div class="flex justify-between items-center">
              <span class="font-mono text-white/60">
                Pregunta {index + 1}
              </span>
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

  <!-- Additional Stats -->
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

<style>
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }
</style>
