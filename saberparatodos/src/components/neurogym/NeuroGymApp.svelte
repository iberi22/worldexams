<script lang="ts">
  import NeuroBatteryRunner from './NeuroBatteryRunner.svelte';
  import NeuroDailyWorkoutHub from './NeuroDailyWorkoutHub.svelte';
  import NeuroP2PDuelBoard from './NeuroP2PDuelBoard.svelte';
  import NeuroWorkshopGenerator from './NeuroWorkshopGenerator.svelte';
  import NeuroCounselorReport from './NeuroCounselorReport.svelte';
  import CognitiveRadarChart from './CognitiveRadarChart.svelte';
  import NeuroInstitutionalShareModal from './NeuroInstitutionalShareModal.svelte';
  import NeuroAudioStation from './NeuroAudioStation.svelte';
  import NeuroAgentCoachView from './NeuroAgentCoachView.svelte';
  import NeuroTrainingCatalog from './NeuroTrainingCatalog.svelte';
  import NeuroProgressPanel from './NeuroProgressPanel.svelte';
  import { getNeuroSessionsHistory, type StoredNeuroSession } from '../../lib/neurogym/neuro-storage';
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';
  import type { TrainingGameId } from '../../lib/neurogym/training-catalog';
  import type { NeuroSessionSummary } from '../../lib/neurogym/training-history';

  interface Props {
    /**
     * Hook de fin de sesión de entrenamiento (contrato para integraciones, p. ej.
     * compartir con la institución). Recibe solo agregados de la sesión.
     */
    onSessionComplete?: (summary: NeuroSessionSummary) => void;
  }

  let { onSessionComplete }: Props = $props();

  type Tab = 'evaluacion' | 'entrenar' | 'juegos' | 'progreso' | 'agente' | 'duelo' | 'radar' | 'audio' | 'talleres' | 'orientacion';

  let activeTab = $state<Tab>('entrenar');
  let historySessions = $state<StoredNeuroSession[]>([]);
  let isShareModalOpen = $state(false);
  let refreshToken = $state(0);
  let selectedGame = $state<TrainingGameId | null>(null);

  // Solo perfiles reales de la batería; sin evaluación previa no se inventa uno.
  let latestProfile = $derived<FullCognitiveProfile | null>(
    historySessions.length > 0 ? historySessions[0].profile : null
  );

  async function loadHistory() {
    historySessions = await getNeuroSessionsHistory();
    refreshToken++;
  }

  function handleSessionComplete(summary: NeuroSessionSummary) {
    refreshToken++;
    onSessionComplete?.(summary);
  }

  function playGame(gameId: TrainingGameId) {
    selectedGame = gameId;
    activeTab = 'juegos';
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'entrenar', label: '🔥 Rutina diaria' },
    { id: 'juegos', label: '🎮 Juegos' },
    { id: 'progreso', label: '📈 Progreso' },
    { id: 'agente', label: '🤖 Coach' },
    { id: 'evaluacion', label: '🎯 Evaluación' },
    { id: 'duelo', label: '⚔️ Duelo P2P' },
    { id: 'audio', label: '🎧 Sonidos de enfoque' },
    { id: 'radar', label: '📊 Radar & Historial' },
    { id: 'talleres', label: '📚 Talleres de Aula' },
    { id: 'orientacion', label: '📋 Gabinete Orientación' }
  ];

  $effect(() => {
    loadHistory();
  });
</script>

<div class="neurogym-root max-w-6xl mx-auto space-y-6 select-none">
  <!-- Top Navigation Header -->
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#0f0f0f] border border-white/15 rounded-3xl shadow-2xl">
    <div class="flex items-center gap-3">
      <div class="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl">
        <span class="text-3xl">🧠</span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl sm:text-2xl font-black text-white tracking-wide">WorldExams NeuroGym</h1>
          <span class="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">AGPL-3.0</span>
        </div>
        <p class="text-xs text-white/50">Entrenamiento de atención, memoria de trabajo y velocidad de procesamiento</p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        onclick={() => isShareModalOpen = true}
        class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
      >
        <span>🏛️</span> Acuerdo P2P
      </button>
      <a
        href="/"
        class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
      >
        ← Volver
      </a>
    </div>
  </div>

  <!-- Navigation Tabs -->
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin" role="tablist" aria-label="Secciones de NeuroGym">
    {#each tabs as t (t.id)}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === t.id}
        onclick={() => (activeTab = t.id)}
        class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white {activeTab === t.id ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
      >
        {t.label}
      </button>
    {/each}
  </div>

  <!-- Tab Content Area -->
  <div class="mt-4">
    {#if activeTab === 'evaluacion'}
      <NeuroBatteryRunner onBatteryFinished={loadHistory} />
    {:else if activeTab === 'entrenar'}
      <NeuroDailyWorkoutHub onWorkoutFinished={loadHistory} onSessionComplete={handleSessionComplete} />
    {:else if activeTab === 'juegos'}
      <NeuroTrainingCatalog bind:selected={selectedGame} onSessionComplete={handleSessionComplete} />
    {:else if activeTab === 'progreso'}
      <NeuroProgressPanel {refreshToken} onPlay={playGame} />
    {:else if activeTab === 'agente'}
      <NeuroAgentCoachView profile={latestProfile} {refreshToken} onPlay={playGame} />
    {:else if activeTab === 'duelo'}
      <NeuroP2PDuelBoard />
    {:else if activeTab === 'audio'}
      <NeuroAudioStation />
    {:else if activeTab === 'radar'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if latestProfile}
          <CognitiveRadarChart profile={latestProfile} size={340} />
        {:else}
          <div class="p-6 bg-black/60 border border-white/15 rounded-3xl text-xs text-white/50 flex items-center justify-center text-center">
            Completa la Evaluación para ver tu radar. Tu progreso en los juegos está en la pestaña Progreso.
          </div>
        {/if}
        
        <!-- Local Sessions Log -->
        <div class="p-6 bg-black/60 border border-white/15 rounded-3xl space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 class="text-sm font-bold uppercase tracking-wider text-white">Historial de Evaluaciones</h3>
            <span class="text-[10px] text-white/40 font-mono">{historySessions.length} registradas</span>
          </div>

          {#if historySessions.length === 0}
            <p class="text-xs text-white/50 py-8 text-center">
              Aún no tienes evaluaciones registradas. Completa la Batería Psicométrica para ver tu curva de evolución.
            </p>
          {:else}
            <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
              {#each historySessions as sess}
                <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-white block">{sess.dateStr}</span>
                    <span class="text-[10px] text-emerald-400 font-mono font-semibold">
                      Razonamiento abstracto: {sess.profile.overallIQProxy.standardScore} ({sess.profile.overallIQProxy.levelDescription})
                    </span>
                  </div>
                  <span class="text-[10px] text-white/40 font-mono">Percentil {sess.profile.overallIQProxy.percentile}%</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {:else if activeTab === 'talleres'}
      <NeuroWorkshopGenerator />
    {:else if activeTab === 'orientacion'}
      {#if latestProfile}
        <NeuroCounselorReport profile={latestProfile} />
      {:else}
        <p class="p-6 bg-black/60 border border-white/15 rounded-3xl text-xs text-white/50 text-center">
          El informe de orientación se genera a partir de una Evaluación completada en este dispositivo.
        </p>
      {/if}
    {/if}
  </div>
</div>

<!-- Modal Institucional -->
<NeuroInstitutionalShareModal
  isOpen={isShareModalOpen}
  onClose={() => isShareModalOpen = false}
/>

<style>
  /* Respeta prefers-reduced-motion en todos los juegos y estímulos de NeuroGym. */
  @media (prefers-reduced-motion: reduce) {
    .neurogym-root :global(*),
    .neurogym-root :global(*::before),
    .neurogym-root :global(*::after) {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
