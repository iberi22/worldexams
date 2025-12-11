<script lang="ts">
  import { partyState } from '../stores/partyState.svelte';

  interface Props {
    onNextQuestion?: () => void;
    onPauseGame?: () => void;
    onFinishGame?: () => void;
  }

  let { onNextQuestion, onPauseGame, onFinishGame }: Props = $props();

  let gameState = $derived(partyState.gameState);
  let config = $derived(partyState.config);
  let players = $derived(partyState.players);
  let answers = $derived(partyState.answers);
  let suspiciousPlayers = $derived(partyState.playersWithSuspiciousActivity);

  // Estadísticas en tiempo real
  let currentQuestionAnswers = $derived(
    answers.filter(
      (a) => a.questionId === partyState.currentQuestion?.id
    )
  );
  let answersReceived = $derived(currentQuestionAnswers.length);
  let correctAnswers = $derived(
    currentQuestionAnswers.filter((a) => a.isCorrect).length
  );
  let progressPercent = $derived(
    (gameState.currentQuestionIndex / (config?.totalQuestions || 1)) * 100
  );

  function handleNext() {
    partyState.nextQuestion();
    onNextQuestion?.();
  }

  function handlePause() {
    partyState.pauseGame();
    onPauseGame?.();
  }

  function handleFinish() {
    if (confirm('¿Seguro que quieres finalizar el examen?')) {
      partyState.finishGame();
      onFinishGame?.();
    }
  }
</script>

<div class="host-controls bg-gray-900 text-white p-6 rounded-lg shadow-xl">
  <!-- Progress Bar -->
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-400">Progreso del Examen</span>
      <span class="text-sm font-bold">{gameState.currentQuestionIndex + 1}/{config?.totalQuestions}</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div
        class="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
        style="width: {progressPercent}%"
      ></div>
    </div>
  </div>

  <!-- Timer -->
  <div class="mb-6 text-center">
    <div class="inline-block bg-gray-800 px-6 py-4 rounded-lg">
      <p class="text-sm text-gray-400 mb-1">Tiempo Restante</p>
      <p class="text-5xl font-bold font-mono {gameState.timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}">
        {gameState.timeRemaining}s
      </p>
    </div>
  </div>

  <!-- Real-time Stats -->
  <div class="grid grid-cols-3 gap-4 mb-6">
    <div class="bg-gray-800 p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-blue-400">{players.length}</p>
      <p class="text-xs text-gray-400 mt-1">Participantes</p>
    </div>
    <div class="bg-gray-800 p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-green-400">{answersReceived}</p>
      <p class="text-xs text-gray-400 mt-1">Respuestas</p>
    </div>
    <div class="bg-gray-800 p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-purple-400">
        {players.length > 0 ? Math.round((correctAnswers / answersReceived) * 100 || 0) : 0}%
      </p>
      <p class="text-xs text-gray-400 mt-1">Aciertos</p>
    </div>
  </div>

  <!-- Suspicious Activity Alert -->
  {#if suspiciousPlayers.length > 0}
    <div class="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
      <div class="flex items-center gap-3">
        <span class="text-2xl">⚠️</span>
        <div class="flex-1">
          <p class="font-bold text-red-400">Actividad Sospechosa Detectada</p>
          <p class="text-sm text-gray-300">
            {suspiciousPlayers.length} {suspiciousPlayers.length === 1 ? 'estudiante ha' : 'estudiantes han'} salido de la pantalla
          </p>
        </div>
        <button
          class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          onclick={() => alert('Ver detalles en desarrollo')}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  {/if}

  <!-- Control Buttons -->
  <div class="grid grid-cols-2 gap-3">
    {#if gameState.status === 'active'}
      <button
        onclick={handlePause}
        class="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold transition-colors"
      >
        ⏸️ Pausar
      </button>
      <button
        onclick={handleNext}
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
      >
        ⏭️ Siguiente
      </button>
    {:else if gameState.status === 'paused'}
      <button
        onclick={() => partyState.gameState.status = 'active'}
        class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors col-span-2"
      >
        ▶️ Reanudar
      </button>
    {/if}
  </div>

  <!-- Finish Button -->
  <button
    onclick={handleFinish}
    class="w-full mt-3 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
  >
    🏁 Finalizar Examen
  </button>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
