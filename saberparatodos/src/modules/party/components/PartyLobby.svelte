<script lang="ts">
  import { partyState } from '../stores/partyState.svelte';
  import type { Player } from '../types';

  interface Props {
    onStartGame?: () => void;
  }

  let { onStartGame }: Props = $props();

  // Reactivity usando Svelte 5 Runes
  let players = $derived(partyState.players);
  let config = $derived(partyState.config);
  let isHost = $derived(partyState.isHost);
  let playersOnline = $derived(partyState.playersOnline);

  function handleStartGame() {
    if (isHost && playersOnline > 0) {
      partyState.startGame();
      onStartGame?.();
    }
  }

  function copyPartyLink() {
    const link = `${window.location.origin}/party/join/${config?.id}`;
    navigator.clipboard.writeText(link);
    alert('¡Link copiado! Comparte con tus estudiantes.');
  }

  function generateQRCode() {
    // TODO: Implementar generación de QR con la librería qrcode
    alert('Función QR en desarrollo');
  }
</script>

<div class="lobby-container bg-gray-900 text-white min-h-screen p-6">
  <!-- Header -->
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">{config?.name || 'Party'}</h1>
        <p class="text-gray-400">Código: <span class="text-yellow-400 font-mono text-xl">{config?.id}</span></p>
      </div>

      {#if isHost}
        <div class="flex gap-3">
          <button
            onclick={copyPartyLink}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            📋 Copiar Link
          </button>
          <button
            onclick={generateQRCode}
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            📱 Generar QR
          </button>
        </div>
      {/if}
    </div>

    <!-- Config Info -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-800 p-4 rounded-lg">
        <p class="text-gray-400 text-sm">Grado</p>
        <p class="text-2xl font-bold">{config?.grado}°</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg">
        <p class="text-gray-400 text-sm">Asignatura</p>
        <p class="text-xl font-bold capitalize">{config?.asignatura}</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg">
        <p class="text-gray-400 text-sm">Preguntas</p>
        <p class="text-2xl font-bold">{config?.totalQuestions}</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg">
        <p class="text-gray-400 text-sm">Tiempo/Pregunta</p>
        <p class="text-2xl font-bold">{config?.timePerQuestion}s</p>
      </div>
    </div>

    <!-- Players List -->
    <div class="bg-gray-800 rounded-lg p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">
          Participantes ({playersOnline}/{config?.maxPlayers})
        </h2>
        <div class="flex items-center gap-2">
          {#if partyState.currentPlan === 'free' && playersOnline >= 10}
            <span class="text-red-400 text-sm font-bold">Límite alcanzado (Plan Gratuito)</span>
            <button class="text-xs bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400">
              Mejorar a Pro
            </button>
          {/if}
          <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-green-400 text-sm">{playersOnline} en línea</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {#each players as player (player.id)}
          <div
            class="flex items-center justify-between p-3 bg-gray-700 rounded-lg
                   {player.isOnline ? 'border-l-4 border-green-500' : 'opacity-50'}"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p class="font-semibold">
                  {player.name}
                  {#if player.isHost}
                    <span class="text-yellow-400 text-xs ml-2">👑 Host</span>
                  {/if}
                </p>
                <p class="text-xs text-gray-400">
                  {player.isOnline ? '🟢 En línea' : '🔴 Desconectado'}
                </p>
              </div>
            </div>

            {#if isHost && player.suspiciousActivity.length > 0}
              <span
                class="px-2 py-1 bg-red-900 text-red-300 text-xs rounded-full"
                title="Actividad sospechosa detectada"
              >
                ⚠️ {player.leftScreenCount}
              </span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Start Button (Host only) -->
    {#if isHost}
      <button
        onclick={handleStartGame}
        disabled={playersOnline === 0}
        class="w-full py-4 text-xl font-bold rounded-lg transition-all
               {playersOnline > 0
                 ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                 : 'bg-gray-700 text-gray-500 cursor-not-allowed'}"
      >
        {#if playersOnline > 0}
          🚀 Iniciar Examen
        {:else}
          Esperando participantes...
        {/if}
      </button>
    {:else}
      <div class="text-center py-8">
        <p class="text-gray-400 text-lg">Esperando que el host inicie el examen...</p>
        <div class="mt-4">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .lobby-container {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }
</style>
