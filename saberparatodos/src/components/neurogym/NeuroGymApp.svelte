<script lang="ts">
  import NeuroBatteryRunner from './NeuroBatteryRunner.svelte';
  import NeuroDailyWorkoutHub from './NeuroDailyWorkoutHub.svelte';
  import NeuroP2PDuelBoard from './NeuroP2PDuelBoard.svelte';
  import NeuroWorkshopGenerator from './NeuroWorkshopGenerator.svelte';
  import NeuroCounselorReport from './NeuroCounselorReport.svelte';
  import CognitiveRadarChart from './CognitiveRadarChart.svelte';
  import NeuroInstitutionalShareModal from './NeuroInstitutionalShareModal.svelte';
  import NeuroAudioStation from './NeuroAudioStation.svelte';
  import WebGPUMentalRotation from './stimuli/WebGPUMentalRotation.svelte';
  import DualNBackStimulus from './stimuli/DualNBackStimulus.svelte';
  import NeuroAgentCoachView from './NeuroAgentCoachView.svelte';
  import { getNeuroSessionsHistory, type StoredNeuroSession } from '../../lib/neurogym/neuro-storage';
  import { computeCognitiveProfile, type FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  type Tab = 'evaluacion' | 'entrenar' | 'nback' | 'webgpu' | 'agente' | 'duelo' | 'radar' | 'audio' | 'talleres' | 'orientacion';

  let activeTab = $state<Tab>('evaluacion');
  let historySessions = $state<StoredNeuroSession[]>([]);
  let isShareModalOpen = $state(false);

  // Perfil por defecto de referencia si no hay sesiones previas
  const defaultSampleProfile: FullCognitiveProfile = computeCognitiveProfile({
    fluidReasoningRaw: { correct: 14, total: 20, avgTimeMs: 11000 },
    workingMemorySpan: { maxNLevel: 2, corsiSpan: 6, accuracy: 0.85 },
    processingSpeed: { avgReactionMs: 260, stroopInterferenceMs: 45, errorRate: 0.05 },
    motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.90, motorJitterMs: 15 },
    analyticalFlexibility: { ruleSwitchesSuccess: 10, totalRuleTrials: 14 },
    quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 },
    verbalComprehension: { correct: 8, total: 10, avgTimeMs: 4000 }
  });

  let latestProfile = $derived.by(() => {
    return historySessions.length > 0 ? historySessions[0].profile : defaultSampleProfile;
  });

  async function loadHistory() {
    historySessions = await getNeuroSessionsHistory();
  }

  $effect(() => {
    loadHistory();
  });
</script>

<div class="max-w-6xl mx-auto space-y-6 select-none">
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
        <p class="text-xs text-white/50">Gimnasio Cerebral, Baremación Psicométrica y Estimulación Cognitiva</p>
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
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
    <button
      type="button"
      onclick={() => activeTab = 'evaluacion'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'evaluacion' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🎯 Evaluación Psicométrica
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'entrenar'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'entrenar' ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🔥 Gimnasio Diario (7 min)
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'nback'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'nback' ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🎵 Dual N-Back
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'webgpu'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'webgpu' ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🎮 WebGPU 3D
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'agente'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'agente' ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🤖 Coach Agéntico
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'duelo'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'duelo' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      ⚔️ Duelo P2P
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'audio'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'audio' ? 'bg-teal-400 text-black shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      🎧 Psicoacústica
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'radar'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'radar' ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      📊 Radar & Historial
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'talleres'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'talleres' ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      📚 Talleres de Aula
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'orientacion'}
      class="py-3 px-5 rounded-2xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all cursor-pointer {activeTab === 'orientacion' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}"
    >
      📋 Gabinete Orientación
    </button>
  </div>

  <!-- Tab Content Area -->
  <div class="mt-4">
    {#if activeTab === 'evaluacion'}
      <NeuroBatteryRunner />
    {:else if activeTab === 'entrenar'}
      <NeuroDailyWorkoutHub onWorkoutFinished={loadHistory} />
    {:else if activeTab === 'nback'}
      <div class="p-6 bg-black/60 border border-white/15 rounded-3xl space-y-4 shadow-xl">
        <DualNBackStimulus />
      </div>
    {:else if activeTab === 'webgpu'}
      <div class="p-6 bg-black/60 border border-white/15 rounded-3xl space-y-4 shadow-xl">
        <WebGPUMentalRotation />
      </div>
    {:else if activeTab === 'agente'}
      <NeuroAgentCoachView profile={latestProfile} />
    {:else if activeTab === 'duelo'}
      <NeuroP2PDuelBoard />
    {:else if activeTab === 'audio'}
      <NeuroAudioStation />
    {:else if activeTab === 'radar'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CognitiveRadarChart profile={latestProfile} size={340} />
        
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
                      CI Proxy: {sess.profile.overallIQProxy.standardScore} ({sess.profile.overallIQProxy.levelDescription})
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
      <NeuroCounselorReport profile={latestProfile} />
    {/if}
  </div>
</div>

<!-- Modal Institucional -->
<NeuroInstitutionalShareModal
  isOpen={isShareModalOpen}
  onClose={() => isShareModalOpen = false}
/>
