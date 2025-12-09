<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import {
    getMemoryStats,
    clearQuestionMemory,
    loadStats,
    type QuestionStats
  } from '../lib/question-memory';

  // Props
  export let totalQuestions: number = 0;
  export let compact: boolean = false;

  // State
  let memoryStats = {
    answeredCount: 0,
    totalAvailable: 0,
    percentAnswered: 0,
    remainingUntilReset: 0,
    willResetSoon: false
  };
  let questionStats: QuestionStats | null = null;
  let showDetails = false;

  onMount(() => {
    refreshStats();
  });

  function refreshStats() {
    memoryStats = getMemoryStats(totalQuestions);
    questionStats = loadStats();
  }

  function handleClearMemory() {
    if (confirm('¿Estás seguro? Esto reiniciará tu progreso y podrás ver todas las preguntas de nuevo.')) {
      clearQuestionMemory();
      refreshStats();
    }
  }

  $: progressPercent = Math.round(memoryStats.percentAnswered * 100);
  $: progressColor = progressPercent < 40 ? 'emerald' : progressPercent < 70 ? 'yellow' : 'red';
</script>

{#if compact}
  <!-- Compact Mode - For header -->
  <button
    on:click={() => showDetails = !showDetails}
    class="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all"
    title="Ver progreso de preguntas"
  >
    <div class="relative w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        class={`absolute inset-y-0 left-0 bg-${progressColor}-500 rounded-full transition-all duration-500`}
        style="width: {progressPercent}%"
      ></div>
    </div>
    <span class="text-white/60">{progressPercent}%</span>
  </button>
{:else}
  <!-- Full Mode - For results view -->
  <div class="bg-[#1E1E1E]/60 border border-white/10 rounded-xl p-4 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Tu Progreso
      </h3>
      <button
        on:click={() => showDetails = !showDetails}
        class="text-xs text-emerald-500 hover:text-emerald-400"
      >
        {showDetails ? 'Ocultar' : 'Ver detalles'}
      </button>
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex items-center justify-between text-xs mb-2">
        <span class="text-white/40">Preguntas vistas</span>
        <span class={`font-bold text-${progressColor}-500`}>
          {memoryStats.answeredCount} / {memoryStats.totalAvailable}
        </span>
      </div>
      <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          class={`h-full bg-gradient-to-r from-${progressColor}-600 to-${progressColor}-400 rounded-full transition-all duration-700`}
          style="width: {progressPercent}%"
        ></div>
      </div>
      <div class="flex items-center justify-between text-[10px] text-white/30 mt-1">
        <span>0%</span>
        <span class="text-yellow-500">70% auto-reset</span>
        <span>100%</span>
      </div>
    </div>

    <!-- Warning if approaching reset -->
    {#if memoryStats.willResetSoon}
      <div class="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4 text-xs" transition:slide>
        <svg class="w-4 h-4 text-yellow-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-yellow-500">
          ¡Casi completas el banco! Quedan {memoryStats.remainingUntilReset} preguntas antes del reinicio automático.
        </span>
      </div>
    {/if}

    <!-- Details Section -->
    {#if showDetails && questionStats}
      <div class="space-y-4 pt-4 border-t border-white/10" transition:slide>
        <!-- Overall Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center p-3 bg-white/5 rounded-lg">
            <p class="text-2xl font-bold text-white">{questionStats.totalAnswered}</p>
            <p class="text-[10px] uppercase tracking-widest text-white/40">Total Respondidas</p>
          </div>
          <div class="text-center p-3 bg-emerald-500/10 rounded-lg">
            <p class="text-2xl font-bold text-emerald-500">{questionStats.correctCount}</p>
            <p class="text-[10px] uppercase tracking-widest text-white/40">Correctas</p>
          </div>
          <div class="text-center p-3 bg-white/5 rounded-lg">
            <p class="text-2xl font-bold text-white">
              {questionStats.totalAnswered > 0
                ? Math.round((questionStats.correctCount / questionStats.totalAnswered) * 100)
                : 0}%
            </p>
            <p class="text-[10px] uppercase tracking-widest text-white/40">Precisión</p>
          </div>
        </div>

        <!-- By Subject -->
        {#if Object.keys(questionStats.bySubject).length > 0}
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Por Asignatura</p>
            <div class="space-y-2">
              {#each Object.entries(questionStats.bySubject) as [subject, data]}
                <div class="flex items-center gap-2">
                  <span class="text-xs text-white/60 w-24 truncate">{subject}</span>
                  <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-emerald-500 rounded-full"
                      style="width: {data.answered > 0 ? (data.correct / data.answered) * 100 : 0}%"
                    ></div>
                  </div>
                  <span class="text-[10px] text-white/40 w-16 text-right">
                    {data.correct}/{data.answered}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- By Grade -->
        {#if Object.keys(questionStats.byGrade).length > 0}
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Por Grado</p>
            <div class="flex flex-wrap gap-2">
              {#each Object.entries(questionStats.byGrade).sort((a, b) => Number(a[0]) - Number(b[0])) as [grade, data]}
                <div class="px-3 py-2 bg-white/5 rounded-lg text-center">
                  <p class="text-sm font-bold text-white">{grade}°</p>
                  <p class="text-[10px] text-emerald-500">
                    {data.answered > 0 ? Math.round((data.correct / data.answered) * 100) : 0}%
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Reset Button -->
        <div class="pt-4 border-t border-white/10">
          <button
            on:click={handleClearMemory}
            class="w-full px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-xs uppercase tracking-widest transition-colors"
          >
            🔄 Reiniciar Progreso Manualmente
          </button>
          <p class="text-[10px] text-white/30 text-center mt-2">
            Esto permitirá ver todas las preguntas de nuevo
          </p>
        </div>
      </div>
    {/if}
  </div>
{/if}
