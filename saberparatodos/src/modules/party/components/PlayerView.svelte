<script lang="ts">
  import { partyState } from '../stores/partyState.svelte';

  let gameState = $derived(partyState.gameState);
  let currentQuestion = $derived(partyState.currentQuestion);
  let selectedAnswer = $state<string | null>(null);
  let hasAnswered = $state(false);

  function handleAnswerSelect(option: string) {
    if (hasAnswered) return;
    selectedAnswer = option;
  }

  function handleSubmit() {
    if (!selectedAnswer || hasAnswered || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = (partyState.config?.timePerQuestion || 60) - gameState.timeRemaining;

    partyState.submitAnswer(
      currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent * 1000
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
</script>

<div class="player-view bg-gray-900 text-white min-h-screen p-6">
  <div class="max-w-3xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <p class="text-sm text-gray-400">Pregunta {gameState.currentQuestionIndex + 1}/{partyState.config?.totalQuestions}</p>
        <h1 class="text-2xl font-bold">{partyState.config?.name}</h1>
      </div>
      <div class="text-center">
        <div class="bg-gray-800 px-6 py-3 rounded-lg">
          <p class="text-sm text-gray-400">Tiempo</p>
          <p class="text-3xl font-bold font-mono {gameState.timeRemaining <= 10 ? 'text-red-500' : 'text-green-400'}">
            {gameState.timeRemaining}s
          </p>
        </div>
      </div>
    </div>

    <!-- Question -->
    {#if currentQuestion}
      <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <div class="prose prose-invert max-w-none">
          <div class="text-lg leading-relaxed mb-6">
            {currentQuestion.enunciado}
          </div>

          <!-- Options -->
          <div class="space-y-3">
            {#each currentQuestion.opciones as option, index}
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
                  <span class="flex-1">{option}</span>
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
