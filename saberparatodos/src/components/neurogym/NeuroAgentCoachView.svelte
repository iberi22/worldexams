<script lang="ts">
  import { agenticCoach, type AgentPedagogicalAdvice } from '../../lib/neurogym/agentic-neuro-coach';
  import { computeCognitiveProfile, type FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile?: FullCognitiveProfile;
  }

  const defaultSample: FullCognitiveProfile = computeCognitiveProfile({
    fluidReasoningRaw: { correct: 13, total: 20, avgTimeMs: 12000 },
    workingMemorySpan: { maxNLevel: 1, corsiSpan: 4, accuracy: 0.65 },
    processingSpeed: { avgReactionMs: 290, stroopInterferenceMs: 70, errorRate: 0.08 },
    motorCoordination: { tapsPer10s: 50, goNoGoAccuracy: 0.88, motorJitterMs: 18 },
    analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 14 }
  });

  let { profile = defaultSample }: Props = $props();

  let advice = $state<AgentPedagogicalAdvice>(agenticCoach.synthesizeWorkoutPlan(profile));
  let xavierContext = $state<string | null>(null);
  let isQueryingXavier = $state(false);

  async function syncWithXavier() {
    isQueryingXavier = true;
    xavierContext = await agenticCoach.consultXavierContext(advice.focusDomain);
    isQueryingXavier = false;
  }
</script>

<div class="p-6 bg-gradient-to-br from-[#0c161a] via-black to-[#051510] border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl">
  <!-- Agent Header -->
  <div class="flex items-center justify-between border-b border-white/10 pb-4">
    <div class="flex items-center gap-3">
      <div class="p-3 bg-cyan-500/10 border border-cyan-500/40 rounded-2xl animate-pulse">
        <span class="text-2xl">🤖</span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-sm font-bold uppercase tracking-wider text-white">NeuroCoach Agéntico (Xavier Bridge)</h3>
          <span class="text-[9px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded">RAG :8006</span>
        </div>
        <p class="text-[10px] text-white/50">Tutor cognitivo autónomo con análisis de fatiga y recomendación personalizada</p>
      </div>
    </div>

    <button
      type="button"
      onclick={syncWithXavier}
      disabled={isQueryingXavier}
      class="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
    >
      <span>🔄</span> {isQueryingXavier ? 'Consultando...' : 'Sincronizar Xavier'}
    </button>
  </div>

  <!-- Agent Advice Card -->
  <div class="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-[10px] uppercase font-bold text-cyan-400">Dominio Prioritario Detectado</span>
      <span class="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
        Confianza: {(advice.confidenceScore * 100).toFixed(0)}%
      </span>
    </div>

    <h4 class="text-lg font-black text-white">{advice.focusDomain}</h4>
    <p class="text-xs text-white/70 leading-relaxed">{advice.rationale}</p>

    <div class="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
      <div>
        <span class="text-[10px] text-white/40 block">Juego Recomendado:</span>
        <strong class="text-xs text-emerald-400 font-semibold">{advice.recommendedGame}</strong>
      </div>
      <div>
        <span class="text-[10px] text-white/40 block">Duración Óptima:</span>
        <strong class="text-xs text-amber-300 font-mono font-bold">{advice.targetDurationMinutes} min/día</strong>
      </div>
    </div>
  </div>

  {#if xavierContext}
    <div class="p-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white/80 font-mono">
      <span class="text-[9px] text-cyan-400 block mb-1">Contexto Xavier Recuperado:</span>
      {xavierContext}
    </div>
  {/if}
</div>
