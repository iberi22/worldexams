<script lang="ts">
  import RavenMatrixCanvas from './stimuli/RavenMatrixCanvas.svelte';
  import StroopColorBoard from './stimuli/StroopColorBoard.svelte';
  import ReactionMotorPad from './stimuli/ReactionMotorPad.svelte';
  import NeuroScoreCard from './NeuroScoreCard.svelte';
  import {
    generateRavenMatrix,
    generateStroopTrial,
    type RavenMatrixItem,
    type StroopItem
  } from '../../lib/neurogym/secure-items-vault';
  import {
    computeCognitiveProfile,
    type FullCognitiveProfile,
    type RawCognitiveScores
  } from '../../lib/neurogym/scoring-cognitive';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';
  import { getNeuroSessionsHistory, saveNeuroSession } from '../../lib/neurogym/neuro-storage';

  interface Props {
    /** Se llama tras guardar el perfil en el dispositivo. */
    onBatteryFinished?: (profile: FullCognitiveProfile) => void;
  }

  let { onBatteryFinished }: Props = $props();

  /**
   * Dominios que esta batería corta mide de verdad. El resto del perfil usa
   * valores de referencia poblacionales y se marca como "no medido".
   */
  const MEASURED_DOMAINS = ['overallIQProxy', 'processingSpeed'];

  let currentPhase = $state<'intro' | 'raven' | 'stroop' | 'reaction' | 'results'>('intro');
  let currentTrialIndex = $state(0);
  let finalProfile = $state<FullCognitiveProfile | null>(null);
  let previousProfile = $state<FullCognitiveProfile | null>(null);

  // Accumulated Raw Data
  let rawData = $state<RawCognitiveScores>({
    fluidReasoningRaw: { correct: 0, total: 0, avgTimeMs: 0 },
    workingMemorySpan: { maxNLevel: 2, corsiSpan: 6, accuracy: 0.85 },
    processingSpeed: { avgReactionMs: 250, stroopInterferenceMs: 40, errorRate: 0.05 },
    motorCoordination: { tapsPer10s: 58, goNoGoAccuracy: 0.92, motorJitterMs: 15 },
    analyticalFlexibility: { ruleSwitchesSuccess: 12, totalRuleTrials: 14 },
    quantitativeReasoning: { correct: 0, total: 0, avgTimeMs: 0 }
  });

  // Current Stimuli
  let currentRavenItem = $state<RavenMatrixItem>(generateRavenMatrix(1, 2));
  let currentStroopItem = $state<StroopItem>(generateStroopTrial(1));
  let stroopTimes: number[] = [];
  let stroopCongruentTimes: number[] = [];
  let stroopIncongruentTimes: number[] = [];
  let stroopErrors = 0;
  let reactionTimes: number[] = [];
  let trialStartTime = $state(0);

  function startBattery() {
    currentPhase = 'raven';
    currentTrialIndex = 0;
    currentRavenItem = generateRavenMatrix(1, 2);
    trialStartTime = performance.now();
  }

  function handleRavenAnswer(optionId: string, isCorrect: boolean) {
    if (isCorrect) {
      neuroAudio.playSuccess();
      rawData.fluidReasoningRaw.correct++;
    } else {
      neuroAudio.playError();
    }
    rawData.fluidReasoningRaw.total++;
    rawData.fluidReasoningRaw.avgTimeMs = Math.round(
      (rawData.fluidReasoningRaw.avgTimeMs * (rawData.fluidReasoningRaw.total - 1) + (performance.now() - trialStartTime)) /
        rawData.fluidReasoningRaw.total
    );
    currentTrialIndex++;

    if (currentTrialIndex < 3) {
      currentRavenItem = generateRavenMatrix(currentTrialIndex + 2, (currentTrialIndex + 2) as any);
      trialStartTime = performance.now();
    } else {
      // Transition to Stroop
      currentPhase = 'stroop';
      currentTrialIndex = 0;
      stroopTimes = [];
      stroopCongruentTimes = [];
      stroopIncongruentTimes = [];
      stroopErrors = 0;
      currentStroopItem = generateStroopTrial(1);
      trialStartTime = performance.now();
    }
  }

  function handleStroopAnswer(selectedKey: string) {
    const elapsed = performance.now() - trialStartTime;
    stroopTimes.push(elapsed);
    (currentStroopItem.isCongruent ? stroopCongruentTimes : stroopIncongruentTimes).push(elapsed);

    if (selectedKey === currentStroopItem.correctColorKey) {
      neuroAudio.playSuccess();
    } else {
      stroopErrors++;
      neuroAudio.playError();
    }

    currentTrialIndex++;
    if (currentTrialIndex < 5) {
      currentStroopItem = generateStroopTrial(currentTrialIndex * 7 + 3);
      trialStartTime = performance.now();
    } else {
      const avg = stroopTimes.reduce((a, b) => a + b, 0) / stroopTimes.length;
      rawData.processingSpeed.avgReactionMs = Math.round(avg);
      rawData.processingSpeed.errorRate = stroopErrors / stroopTimes.length;
      if (stroopCongruentTimes.length > 0 && stroopIncongruentTimes.length > 0) {
        const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
        rawData.processingSpeed.stroopInterferenceMs = Math.max(0, Math.round(mean(stroopIncongruentTimes) - mean(stroopCongruentTimes)));
      }
      // Transition to Reaction
      currentPhase = 'reaction';
      currentTrialIndex = 0;
      reactionTimes = [];
    }
  }

  function handleReactionTrial(timeMs: number, success: boolean) {
    if (success && timeMs > 0) {
      neuroAudio.playSuccess();
      reactionTimes.push(timeMs);
    } else {
      neuroAudio.playError();
    }

    currentTrialIndex++;
    if (currentTrialIndex < 3) {
      // Continue reaction trials
    } else {
      if (reactionTimes.length > 0) {
        const avg = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
        rawData.processingSpeed.avgReactionMs = Math.round((rawData.processingSpeed.avgReactionMs + avg) / 2);
      }
      finalProfile = computeCognitiveProfile(rawData);
      currentPhase = 'results';
      const profile = finalProfile;
      // Leer la evaluación anterior antes de guardar la nueva, para comparar contigo mismo.
      getNeuroSessionsHistory(1)
        .then((h) => {
          previousProfile = h[0]?.profile ?? null;
        })
        .catch(() => {
          previousProfile = null;
        })
        .then(() => saveNeuroSession(profile))
        .then(() => onBatteryFinished?.(profile))
        .catch(() => onBatteryFinished?.(profile));
    }
  }

  function handleReset() {
    currentPhase = 'intro';
    finalProfile = null;
    previousProfile = null;
  }
</script>

<div class="w-full max-w-4xl mx-auto px-4 py-8">
  {#if currentPhase === 'intro'}
    <div class="p-8 bg-gradient-to-br from-[#121212] via-black to-[#052014] border border-white/20 rounded-3xl text-center space-y-6 shadow-2xl">
      <div class="inline-block p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
        <span class="text-4xl">🧠</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">WorldExams NeuroGym</h1>
      <p class="text-xs sm:text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
        Evaluación corta y orientativa de <strong>razonamiento abstracto</strong>, <strong>control inhibitorio</strong> y <strong>velocidad de reacción</strong>.
        No es un diagnóstico ni una prueba de CI; sirve como punto de partida para el entrenamiento.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left pt-2">
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-emerald-400 font-bold uppercase block">Prueba 1</span>
          <span class="text-xs font-bold text-white">Matrices Raven</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-cyan-400 font-bold uppercase block">Prueba 2</span>
          <span class="text-xs font-bold text-white">Test Stroop</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-yellow-400 font-bold uppercase block">Prueba 3</span>
          <span class="text-xs font-bold text-white">Tiempo Reacción</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-purple-400 font-bold uppercase block">Privacidad</span>
          <span class="text-xs font-bold text-white">100% On-Device</span>
        </div>
      </div>

      <button
        type="button"
        onclick={startBattery}
        class="py-4 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black uppercase tracking-widest text-sm rounded-xl hover:opacity-90 transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer"
      >
        Comenzar Evaluación
      </button>
    </div>
  {:else if currentPhase === 'raven'}
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <span class="text-xs font-mono font-bold text-emerald-400">FASE 1/3: MATRICES ABSTRACTAS</span>
        <span class="text-xs text-white/50">Reactivo {currentTrialIndex + 1} de 3</span>
      </div>
      <RavenMatrixCanvas item={currentRavenItem} onSelectOption={handleRavenAnswer} />
    </div>
  {:else if currentPhase === 'stroop'}
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <span class="text-xs font-mono font-bold text-cyan-400">FASE 2/3: INHIBICIÓN & ATENCIÓN</span>
        <span class="text-xs text-white/50">Ensayo {currentTrialIndex + 1} de 5</span>
      </div>
      <StroopColorBoard trial={currentStroopItem} onAnswer={handleStroopAnswer} />
    </div>
  {:else if currentPhase === 'reaction'}
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <span class="text-xs font-mono font-bold text-yellow-400">FASE 3/3: VELOCIDAD & MOTRICIDAD</span>
        <span class="text-xs text-white/50">Intento {currentTrialIndex + 1} de 3</span>
      </div>
      <ReactionMotorPad onCompleteTrial={handleReactionTrial} />
    </div>
  {:else if currentPhase === 'results' && finalProfile}
    <NeuroScoreCard profile={finalProfile} onReset={handleReset} measuredDomains={MEASURED_DOMAINS} {previousProfile} />
  {/if}
</div>
