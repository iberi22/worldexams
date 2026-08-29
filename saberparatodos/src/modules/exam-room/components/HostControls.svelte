<script lang="ts">
  import { roomState } from '../stores/roomState.svelte.ts';
  import { generateQRCodeSVG } from '../../../lib/qr-generator';

  interface Props {
    onNextQuestion?: () => void;
    onPauseGame?: () => void;
    onFinishGame?: () => void;
  }

  let { onNextQuestion, onPauseGame, onFinishGame }: Props = $props();

  let showQrModal = $state(false);
  let gameState = $derived(roomState.gameState);
  let config = $derived(roomState.config);
  let players = $derived(roomState.players);
  let answers = $derived(roomState.answers);
  let suspiciousPlayers = $derived(roomState.playersWithSuspiciousActivity);

  function getJoinUrl(): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://saberparatodos.pages.dev';
    const code = config?.id || 'ROOM';
    return `${origin}/sala-examenes?join=${encodeURIComponent(code)}`;
  }

  let qrSvg = $derived(
    generateQRCodeSVG(getJoinUrl(), { darkColor: '#0f172a', lightColor: '#ffffff', quietZone: true })
  );

  // ⚡ Bolt Optimization: Calculate currentQuestionAnswers and correctAnswers in a single pass instead of multiple .filter() iterations
  let currentQuestionStats = $derived.by(() => {
    const currentAnswers = [];
    let correctCount = 0;
    const currentId = roomState.currentQuestion?.id;
    for (const a of answers) {
      if (a.questionId === currentId) {
        currentAnswers.push(a);
        if (a.isCorrect) correctCount++;
      }
    }
    return { currentAnswers, correctCount };
  });

  let currentQuestionAnswers = $derived(currentQuestionStats.currentAnswers);
  let answersReceived = $derived(currentQuestionStats.currentAnswers.length);
  let correctAnswers = $derived(currentQuestionStats.correctCount);
  let progressPercent = $derived(
    (gameState.currentQuestionIndex / (config?.totalQuestions || 1)) * 100
  );

  function handleNext() {
    roomState.nextQuestion();
    onNextQuestion?.();
  }

  function handlePause() {
    roomState.pauseGame();
    onPauseGame?.();
  }

  function handleFinish() {
    if (confirm('¿Seguro que quieres finalizar el examen?')) {
      roomState.finishGame();
      onFinishGame?.();
    }
  }
</script>

<div class="host-controls bg-gray-900 text-white p-6 rounded-lg shadow-xl relative">
  <!-- Header Bar with QR Toggle -->
  <div class="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
    <div>
      <h3 class="font-bold text-lg text-white">Panel del Anfitrión</h3>
      <p class="text-xs text-gray-400">Sala: <strong class="text-emerald-400">{config?.id || 'ROOM'}</strong></p>
    </div>
    <button
      type="button"
      onclick={() => showQrModal = true}
      class="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
    >
      📱 Mostrar QR
    </button>
  </div>

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
        onclick={() => roomState.gameState.status = 'active'}
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

<!-- Modal QR Code Proyección -->
{#if showQrModal}
  <div class="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
    <div class="bg-[#111827] border border-cyan-500/30 rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl relative">
      <button
        type="button"
        onclick={() => showQrModal = false}
        class="absolute top-4 right-4 text-white/50 hover:text-white text-xl p-2"
        aria-label="Cerrar modal QR"
      >
        ✕
      </button>

      <div>
        <h3 class="text-2xl font-black text-white">Escanea para Unirte</h3>
        <p class="text-xs text-white/60 mt-1">Escaneo rápido para ingresar a la sala</p>
      </div>

      <div class="bg-white p-4 rounded-2xl w-64 h-64 mx-auto shadow-inner flex items-center justify-center">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html qrSvg}
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
        <span class="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Código de Sala</span>
        <span class="text-3xl font-black text-emerald-400 font-mono tracking-wider">{config?.id || 'ROOM'}</span>
      </div>
    </div>
  </div>
{/if}

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
