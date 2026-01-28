<script lang="ts">
  import { roomState } from '../stores/roomState.svelte.ts';
  import type { RoomResults, PlayerStats } from '../types';

  interface Props {
    results?: RoomResults;
  }

  let { results }: Props = $props();

  let currentPlayer = $derived(roomState.currentPlayer);
  let isHost = $derived(roomState.isHost);

  let myStats = $derived(
    results?.playerStats.find((s) => s.playerId === currentPlayer?.id)
  );

  let topPlayers = $derived(
    [...(results?.playerStats || [])]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  );

  function downloadReport() {
    // TODO: Generar PDF con jsPDF y Chart.js
    alert('Descarga de reporte en desarrollo');
  }

  function shareResults() {
    if (navigator.share) {
      navigator.share({
        title: `Resultados - ${results?.roomName}`,
        text: `Completé el examen con ${myStats?.score || 0} puntos!`,
      });
    }
  }

  function getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }

  function getPerformanceMessage(score: number): string {
    if (score >= 90) return '🎉 ¡Excelente!';
    if (score >= 75) return '👍 Muy Bien';
    if (score >= 60) return '📚 Bien';
    if (score >= 40) return '⚠️ Regular';
    return '📖 Necesitas Repasar';
  }
</script>

<div class="results-view bg-gray-900 text-white min-h-screen p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">🏁 Resultados</h1>
      <p class="text-xl text-gray-400">{results?.roomName}</p>
    </div>

    {#if myStats}
      <!-- Personal Stats Card -->
      <div class="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-8 mb-8 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-sm text-gray-300 mb-1">Tu Desempeño</p>
            <h2 class="text-3xl font-bold">{myStats.playerName}</h2>
          </div>
          <div class="text-right">
            <p class="text-6xl font-bold {getScoreColor(myStats.score)}">{myStats.score}</p>
            <p class="text-sm text-gray-300">de 100 puntos</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-gray-400">Correctas</p>
            <p class="text-2xl font-bold text-green-400">{myStats.correctAnswers}/{myStats.totalQuestions}</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-gray-400">Tiempo Promedio</p>
            <p class="text-2xl font-bold text-blue-400">{Math.round(myStats.averageTimePerQuestion / 1000)}s</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-gray-400">Más Rápida</p>
            <p class="text-2xl font-bold text-purple-400">{Math.round(myStats.fastestAnswer / 1000)}s</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-gray-400">Más Lenta</p>
            <p class="text-2xl font-bold text-yellow-400">{Math.round(myStats.slowestAnswer / 1000)}s</p>
          </div>
        </div>

        <!-- Performance Message -->
        <div class="bg-black/40 rounded-lg p-4 mb-4">
          <p class="text-lg font-semibold mb-2">{getPerformanceMessage(myStats.score)}</p>
          <p class="text-gray-300">{myStats.recommendation}</p>
        </div>

        <!-- Suspicious Activity Warning (if any) -->
        {#if myStats.suspiciousEvents > 0}
          <div class="bg-red-900/50 border border-red-500 rounded-lg p-4">
            <p class="text-sm">
              ⚠️ Se detectaron <strong>{myStats.suspiciousEvents}</strong> eventos sospechosos durante tu examen
              (salidas de pantalla o cambios de ventana).
            </p>
          </div>
        {/if}

        <!-- Action Buttons -->
        <div class="flex gap-3 mt-6">
          <button
            onclick={downloadReport}
            class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
          >
            📥 Descargar Reporte
          </button>
          <button
            onclick={shareResults}
            class="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors"
          >
            📤 Compartir
          </button>
        </div>
      </div>
    {/if}

    <!-- Leaderboard (Host sees all, Players see top 5) -->
    {#if results}
      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
          🏆 Top {isHost ? 'Participantes' : '5'}
        </h3>

        <div class="space-y-3">
          {#each isHost ? results.playerStats : topPlayers as player, index}
            <div
              class="flex items-center justify-between p-4 rounded-lg
                     {index === 0 ? 'bg-gradient-to-r from-yellow-900 to-yellow-700' :
                      index === 1 ? 'bg-gradient-to-r from-gray-700 to-gray-600' :
                      index === 2 ? 'bg-gradient-to-r from-orange-900 to-orange-700' :
                      'bg-gray-700'}"
            >
              <div class="flex items-center gap-4">
                <span class="text-2xl font-bold w-8">
                  {#if index === 0}🥇
                  {:else if index === 1}🥈
                  {:else if index === 2}🥉
                  {:else}#{index + 1}
                  {/if}
                </span>
                <div>
                  <p class="font-bold">
                    {player.playerName}
                    {#if player.playerId === currentPlayer?.id}
                      <span class="text-xs text-blue-400 ml-2">(Tú)</span>
                    {/if}
                  </p>
                  <p class="text-sm text-gray-400">
                    {player.correctAnswers}/{player.totalQuestions} correctas
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold {getScoreColor(player.score)}">{player.score}</p>
                {#if isHost && player.suspiciousEvents > 0}
                  <p class="text-xs text-red-400">⚠️ {player.suspiciousEvents} eventos</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Group Stats (Host Only) -->
    {#if isHost && results}
      <div class="bg-gray-800 rounded-xl p-6">
        <h3 class="text-2xl font-bold mb-6">📊 Estadísticas Generales</h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <p class="text-sm text-gray-400">Participantes</p>
            <p class="text-3xl font-bold text-blue-400">{results.totalPlayers}</p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <p class="text-sm text-gray-400">Completaron</p>
            <p class="text-3xl font-bold text-green-400">{results.completedPlayers}</p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <p class="text-sm text-gray-400">Promedio</p>
            <p class="text-3xl font-bold text-yellow-400">{Math.round(results.averageScore)}</p>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg text-center">
            <p class="text-sm text-gray-400">Tiempo Prom.</p>
            <p class="text-3xl font-bold text-purple-400">{Math.round(results.averageTime / 1000)}s</p>
          </div>
        </div>

        <!-- AI Analysis -->
        <div class="bg-gray-700/50 rounded-lg p-6 mb-6 border border-purple-500/30">
          <h4 class="text-xl font-bold mb-4 flex items-center gap-2">
            🤖 Análisis de IA
            <span class="text-xs bg-purple-600 px-2 py-1 rounded text-white">PREMIUM</span>
          </h4>

          {#if roomState.aiAnalysis}
            <div class="prose prose-invert max-w-none">
              <p class="whitespace-pre-wrap text-gray-300">{roomState.aiAnalysis}</p>
            </div>
          {:else}
            <div class="text-center py-4">
              <p class="text-gray-400 mb-4">
                Obtén un análisis pedagógico detallado del desempeño del grupo,
                identificando fortalezas y áreas de mejora.
              </p>
              <button
                onclick={() => roomState.requestAIAnalysis()}
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-500/25"
              >
                ✨ Generar Análisis con IA (1 Crédito)
              </button>
            </div>
          {/if}
        </div>

        <!-- Download Full Report Button -->
        <button
          onclick={downloadReport}
          class="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-colors"
        >
          📑 Descargar Reporte Completo (PDF)
        </button>
      </div>
    {/if}

    <!-- Back Button -->
    <div class="text-center mt-8">
      <a
        href="/"
        class="inline-block px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors"
      >
        ← Volver al Inicio
      </a>
    </div>
  </div>
</div>

<style>
  .results-view {
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  }
</style>
