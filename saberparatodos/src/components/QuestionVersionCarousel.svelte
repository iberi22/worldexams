<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import MathRenderer from './MathRenderer.svelte';
  import AdBanner from './AdBanner.svelte';
  import type { Question } from '../types';

  const dispatch = createEventDispatcher();

  // Props
  export let versions: Question[] = [];
  export let bundleId: string = '';
  export let onBack: () => void;

  // State
  let currentIndex: number = 0;
  let showAd: boolean = false;
  let transitionDirection: number = 1; // 1 = forward, -1 = backward
  let adViewCount: number = 0; // Track cards viewed since last ad

  const AD_FREQUENCY = 3; // Show ad every 3 cards navigated

  $: currentQuestion = versions[currentIndex] || null;
  $: totalVersions = versions.length;

  // Get version label based on difficulty
  function getVersionLabel(q: Question, index: number): string {
    if (index === 0) return 'Original';

    const diff = q.difficulty || 3;
    if (diff <= 2) return 'Fácil';
    if (diff <= 3) return 'Media';
    return 'Difícil';
  }

  // Navigation with ad triggers
  function goToNext() {
    if (currentIndex < versions.length - 1) {
      adViewCount++;
      transitionDirection = 1;

      // Check if we should show an ad
      if (adViewCount >= AD_FREQUENCY) {
        showAd = true;
        adViewCount = 0;
        // Ad will auto-dismiss after viewing, then navigation continues
        setTimeout(() => {
          showAd = false;
          currentIndex++;
        }, 2000); // Show ad for 2 seconds
      } else {
        currentIndex++;
      }
    }
  }

  function goToPrevious() {
    if (currentIndex > 0) {
      adViewCount++;
      transitionDirection = -1;

      if (adViewCount >= AD_FREQUENCY) {
        showAd = true;
        adViewCount = 0;
        setTimeout(() => {
          showAd = false;
          currentIndex--;
        }, 2000);
      } else {
        currentIndex--;
      }
    }
  }

  function goToIndex(index: number) {
    if (index >= 0 && index < versions.length && index !== currentIndex) {
      transitionDirection = index > currentIndex ? 1 : -1;
      currentIndex = index;
    }
  }

  // Keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') goToPrevious();
    if (event.key === 'ArrowRight') goToNext();
    if (event.key === 'Escape') onBack();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="w-full max-w-4xl mx-auto p-4 pb-20">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <button
      on:click={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
    >
      [ Volver ]
    </button>

    <div class="flex items-center gap-2">
      <span class="text-xs font-bold uppercase tracking-widest text-emerald-500">
        Bundle: {bundleId}
      </span>
    </div>
  </div>

  <!-- Version Navigation Pills -->
  <div class="flex flex-wrap justify-center gap-2 mb-6">
    {#each versions as version, i}
      <button
        on:click={() => goToIndex(i)}
        class={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
          i === currentIndex
            ? 'bg-emerald-500 text-black'
            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
        }`}
      >
        {getVersionLabel(version, i)} {i === 0 ? '' : `(v${i + 1})`}
      </button>
    {/each}
  </div>

  <!-- Version Indicator -->
  <div class="text-center mb-4">
    <span class="text-sm font-mono text-white/40">
      Versión {currentIndex + 1} de {totalVersions}
    </span>
    <span class="mx-2 text-white/20">|</span>
    <span class="text-sm font-bold text-emerald-500/80">
      {getVersionLabel(currentQuestion, currentIndex)}
    </span>
  </div>

  <!-- Ad Overlay -->
  {#if showAd}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      transition:fade={{ duration: 200 }}
    >
      <div class="max-w-lg w-full mx-4" in:fly={{ y: 20, duration: 300 }}>
        <div class="text-center mb-4">
          <span class="text-xs uppercase tracking-widest text-white/40">Contenido Patrocinado</span>
        </div>
        <AdBanner className="w-full" />
        <div class="text-center mt-4">
          <span class="text-xs text-white/40">Continuando automáticamente...</span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Question Card -->
  {#if currentQuestion}
    {#key currentIndex}
      <div
        class="bg-[#1a1a1a]/80 border border-white/10 rounded-2xl p-6 md:p-8"
        in:fly={{ x: transitionDirection * 50, duration: 300 }}
        out:fade={{ duration: 150 }}
      >
        <!-- Question Text -->
        <div class="text-2xl md:text-3xl font-bold mb-8 leading-tight text-[#F5F5DC]">
          <MathRenderer content={currentQuestion.text} />
        </div>

        <!-- Options -->
        <div class="bg-[#121212]/50 border border-white/10 p-6 rounded-lg mb-8">
          <h3 class="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Opciones de Respuesta</h3>
          <ul class="space-y-4">
            {#each currentQuestion.options as option}
              <li class="flex items-start space-x-4">
                <span class={`font-bold ${option.id === currentQuestion.correctOptionId ? 'text-emerald-500' : 'text-white/40'}`}>
                  {option.id})
                </span>
                <span class={option.id === currentQuestion.correctOptionId ? 'text-emerald-500' : 'text-[#F5F5DC]/80'}>
                  <MathRenderer content={option.text} />
                </span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Explanation -->
        {#if currentQuestion.explanation}
          <div class="mb-8">
            <h3 class="text-xl font-bold text-emerald-500 mb-4">Explicación Detallada</h3>
            <div class="text-[#F5F5DC]/80 leading-relaxed whitespace-pre-line">
              <MathRenderer content={currentQuestion.explanation} />
            </div>
          </div>
        {/if}

        <!-- Metadata Footer -->
        <div class="flex flex-wrap justify-between gap-4 text-[10px] uppercase tracking-widest text-white/40 border-t border-white/10 pt-4">
          <span class="bg-white/5 px-2 py-1 rounded">ID: {currentQuestion.id}</span>
          <span class="bg-white/5 px-2 py-1 rounded">Grado: {currentQuestion.grade}°</span>
          <span class="bg-white/5 px-2 py-1 rounded">Nivel: {currentQuestion.difficulty}</span>
        </div>
      </div>
    {/key}
  {/if}

  <!-- Navigation Arrows -->
  <div class="flex justify-center items-center gap-8 mt-8">
    <button
      on:click={goToPrevious}
      disabled={currentIndex === 0}
      class={`p-4 rounded-full border transition-all ${
        currentIndex === 0
          ? 'border-white/10 text-white/20 cursor-not-allowed'
          : 'border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10'
      }`}
      title="Versión anterior (←)"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div class="text-center">
      <span class="text-lg font-bold text-white/60">
        {currentIndex + 1} / {totalVersions}
      </span>
      <p class="text-[10px] uppercase tracking-widest text-white/30 mt-1">
        Usa ← → para navegar
      </p>
    </div>

    <button
      on:click={goToNext}
      disabled={currentIndex === versions.length - 1}
      class={`p-4 rounded-full border transition-all ${
        currentIndex === versions.length - 1
          ? 'border-white/10 text-white/20 cursor-not-allowed'
          : 'border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10'
      }`}
      title="Siguiente versión (→)"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>
