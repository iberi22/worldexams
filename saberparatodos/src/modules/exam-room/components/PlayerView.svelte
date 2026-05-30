<script lang="ts">
  import { roomState } from '../stores/roomState.svelte.ts';
  import MathRenderer from '../../../components/MathRenderer.svelte';

  let gameState = $derived(roomState.gameState);
  let currentQuestion = $derived(roomState.currentQuestion);
  let selectedAnswer = $state<string | null>(null);
  let hasAnswered = $state(false);
  let showContext = $state(false);

  function handleAnswerSelect(option: string) {
    if (hasAnswered) return;
    selectedAnswer = option;
  }

  function handleSubmit() {
    if (!selectedAnswer || hasAnswered || !currentQuestion) return;

    const timeSpent = (roomState.config?.timePerQuestion || 60) - gameState.timeRemaining;

    roomState.submitAnswer(
      currentQuestion.id,
      selectedAnswer,
      timeSpent
    );

    hasAnswered = true;
  }

  // Reset cuando cambia la pregunta
  $effect(() => {
    if (gameState.currentQuestionIndex !== undefined) {
      selectedAnswer = null;
      hasAnswered = false;
    }
  });

  let totalTime = $derived(roomState.config?.timePerQuestion || 60);
  let timeColor = $derived.by(() => {
     const ratio = gameState.timeRemaining / totalTime;
     if (ratio > 0.5) return 'text-green-400';
     if (ratio > 0.25) return 'text-yellow-400';
     return 'text-red-500 animate-pulse';
  });
</script>

<div class="player-view bg-gray-900 text-white min-h-screen p-6">
  <div class="{currentQuestion?.context ? 'max-w-6xl' : 'max-w-3xl'} mx-auto transition-all duration-500">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <p class="text-sm text-gray-400">Pregunta {gameState.currentQuestionIndex + 1}/{roomState.config?.totalQuestions}</p>
        <h1 class="text-2xl font-bold">{roomState.config?.name}</h1>
      </div>
      <div class="text-center">
        <div class="bg-gray-800 px-6 py-3 rounded-lg border border-white/10 transition-colors duration-300">
          <p class="text-sm text-gray-400">Tiempo</p>
          <p class={`text-3xl font-bold font-mono ${timeColor}`}>
            {gameState.timeRemaining}s
          </p>
        </div>
      </div>
    </div>

    <!-- Question -->
    {#if currentQuestion}
      <div class={currentQuestion.context ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start" : ""}>
        {#if currentQuestion.context}
          <div class="hidden md:block bg-gray-800 rounded-lg p-6 max-h-[70vh] overflow-y-auto sticky top-6">
            <h3 class="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span class="text-lg">📖</span> Contexto de Lectura
            </h3>
            <div class="prose prose-invert max-w-none">
              <MathRenderer content={currentQuestion.context} />
            </div>
          </div>
        {/if}

        <div>
          <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <div class="prose prose-invert max-w-none">
          <div class="text-lg leading-relaxed mb-6">
            <MathRenderer content={currentQuestion.text} />
          </div>

          <!-- Options -->
          <div class="space-y-3">
            {#each currentQuestion.options as option, index}
              {@const optionLetter = ['A', 'B', 'C', 'D'][index]}
              <button
                onclick={() => handleAnswerSelect(optionLetter)}
                disabled={hasAnswered}
                class="w-full text-left p-4 rounded-lg border-2 transition-all
                       {selectedAnswer === optionLetter
                         ? 'border-blue-500 bg-blue-900/50'
                         : 'border-gray-700 hover:border-gray-600 bg-gray-700/50'}
                       {hasAnswered ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}"
              >
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold">
                    {optionLetter}
                  </span>
                  <span class="flex-1">
                    <MathRenderer content={option.text} />
                  </span>
                  {#if selectedAnswer === optionLetter}
                    <span class="text-blue-400">✓</span>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>

          <!-- Submit Button -->
          <button
            onclick={handleSubmit}
            disabled={!selectedAnswer || hasAnswered}
            class="w-full py-4 text-xl font-bold rounded-lg transition-all
                   {selectedAnswer && !hasAnswered
                     ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                     : 'bg-gray-700 text-gray-500 cursor-not-allowed'}"
          >
            {#if hasAnswered}
              ✅ Respuesta Enviada
            {:else if selectedAnswer}
              Enviar Respuesta
            {:else}
              Selecciona una opción
            {/if}
          </button>

          {#if hasAnswered}
            <div class="mt-6 text-center">
              <p class="text-gray-400">Esperando que todos respondan...</p>
              <div class="mt-3 inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
            </div>
          {/if}

    <!-- Mobile Context Trigger -->
    {#if currentQuestion?.context}
      <div class="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onclick={() => showContext = true}
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold shadow-lg shadow-blue-900/40 border border-white/20 transition-all active:scale-95"
        >
          <span>📖</span> Ver Lectura
        </button>
      </div>

      <!-- Mobile Context Overlay -->
      {#if showContext}
        <div class="fixed inset-0 z-50 bg-gray-900 overflow-y-auto p-6 md:hidden animate-fade-in">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold flex items-center gap-2">
              <span>📖</span> Lectura
            </h3>
            <button
              onclick={() => showContext = false}
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-2xl"
            >
              ✕
            </button>
          </div>

          <div class="prose prose-invert max-w-none pb-24">
            <MathRenderer content={currentQuestion.context} />
          </div>

          <div class="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
             <button
                onclick={() => showContext = false}
                class="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-lg"
             >
                Cerrar Lectura
             </button>
          </div>
        </div>
      {/if}
    {/if}
        </div>
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-400 text-lg">Cargando pregunta...</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .player-view {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }

  .prose {
    color: white;
  }
</style>
