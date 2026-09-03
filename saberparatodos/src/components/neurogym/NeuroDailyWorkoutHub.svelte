<script lang="ts">
  import { onMount } from 'svelte';
  import { getStreakInfo, saveNeuroSession, type NeuroStreakInfo } from '../../lib/neurogym/neuro-storage';
  import { computeCognitiveProfile, type RawCognitiveScores } from '../../lib/neurogym/scoring-cognitive';
  import { generateStroopTrial, type StroopItem } from '../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';
  import StroopColorBoard from './stimuli/StroopColorBoard.svelte';
  import ReactionMotorPad from './stimuli/ReactionMotorPad.svelte';
  import WebGPUMentalRotation from './stimuli/WebGPUMentalRotation.svelte';

  interface Props {
    onWorkoutFinished?: () => void;
  }

  let { onWorkoutFinished }: Props = $props();

  const ADAPTIVE_LEVEL_KEY = 'neurogym_adaptive_level';

  let streakInfo = $state<NeuroStreakInfo>(getStreakInfo());
  let adaptiveLevel = $state<number>(1);
  let workoutStage = $state<'intro' | 'rotation' | 'stroop' | 'reaction' | 'completed'>('intro');
  let currentStep = $state(0);

  // Performance tracking
  let totalCorrect = $state(0);
  let totalTrials = $state(0);
  let overallAccuracy = $state(0);
  let levelUpgraded = $state(false);

  // Task specific metrics
  let rotationLatencies = $state<number[]>([]);
  let stroopCorrectCount = $state(0);
  let reactionTimes = $state<number[]>([]);

  let currentStroopItem = $state<StroopItem>(generateStroopTrial(1));

  onMount(() => {
    if (typeof localStorage !== 'undefined') {
      const storedLevel = localStorage.getItem(ADAPTIVE_LEVEL_KEY);
      if (storedLevel) {
        adaptiveLevel = Math.max(1, parseInt(storedLevel, 10) || 1);
      }
    }
    streakInfo = getStreakInfo();
  });

  function startDailyWorkout() {
    workoutStage = 'rotation';
    currentStep = 0;
    totalCorrect = 0;
    totalTrials = 0;
    rotationLatencies = [];
    stroopCorrectCount = 0;
    reactionTimes = [];
    levelUpgraded = false;
  }

  function handleRotationComplete(success: boolean, latencyMs: number) {
    totalTrials++;
    if (success) {
      totalCorrect++;
      rotationLatencies.push(latencyMs);
    }

    currentStep++;
    if (currentStep >= 3) {
      workoutStage = 'stroop';
      currentStep = 0;
      currentStroopItem = generateStroopTrial(adaptiveLevel * 5);
    }
  }

  function handleStroopAnswer(selectedKey: string) {
    totalTrials++;
    const isCorrect = selectedKey === currentStroopItem.correctColorKey;
    if (isCorrect) {
      totalCorrect++;
      stroopCorrectCount++;
      neuroAudio.playSuccess();
    } else {
      neuroAudio.playError();
    }

    currentStep++;
    if (currentStep < 5) {
      currentStroopItem = generateStroopTrial(adaptiveLevel * 5 + currentStep * 2);
    } else {
      workoutStage = 'reaction';
      currentStep = 0;
    }
  }

  function handleReactionTrial(timeMs: number, success: boolean) {
    totalTrials++;
    if (success && timeMs > 0) {
      totalCorrect++;
      reactionTimes.push(timeMs);
      neuroAudio.playSuccess();
    } else {
      neuroAudio.playError();
    }

    currentStep++;
    if (currentStep >= 3) {
      finalizeDailyWorkout();
    }
  }

  async function finalizeDailyWorkout() {
    overallAccuracy = totalTrials > 0 ? Math.round((totalCorrect / totalTrials) * 100) : 0;

    if (overallAccuracy >= 85) {
      adaptiveLevel++;
      levelUpgraded = true;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ADAPTIVE_LEVEL_KEY, adaptiveLevel.toString());
      }
    }

    // Compute synthetic profile for daily session storage
    const avgReaction = reactionTimes.length > 0
      ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 300;

    const rawScores: RawCognitiveScores = {
      fluidReasoningRaw: { correct: rotationLatencies.length, total: 3, avgTimeMs: 1500 },
      workingMemorySpan: { maxNLevel: adaptiveLevel, corsiSpan: 5, accuracy: overallAccuracy / 100 },
      processingSpeed: { avgReactionMs: avgReaction, stroopInterferenceMs: 50, errorRate: (totalTrials - totalCorrect) / totalTrials },
      motorCoordination: { tapsPer10s: 50, goNoGoAccuracy: overallAccuracy / 100, motorJitterMs: 10 },
      analyticalFlexibility: { ruleSwitchesSuccess: stroopCorrectCount, totalRuleTrials: 5 },
      verbalComprehension: { correct: 4, total: 5, avgTimeMs: 1200 },
      quantitativeReasoning: { correct: 4, total: 5, avgTimeMs: 1200 }
    };

    const profile = computeCognitiveProfile(rawScores);
    await saveNeuroSession(profile);

    streakInfo = getStreakInfo();
    workoutStage = 'completed';
    onWorkoutFinished?.();
  }
</script>

<div class="max-w-2xl mx-auto p-6 bg-gradient-to-br from-black via-[#0d1612] to-black border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <!-- Streak & Adaptive Header -->
  <div class="flex items-center justify-between border-b border-white/10 pb-4">
    <div class="flex items-center gap-3">
      <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
        <span class="text-2xl">🔥</span>
      </div>
      <div>
        <h3 class="text-lg font-bold text-white">Micro-Entrenamiento Diario</h3>
        <p class="text-xs text-white/50">7 minutos de gimnasia cerebral adaptativa</p>
      </div>
    </div>

    <div class="flex items-center gap-4 text-right">
      <div>
        <span class="text-[10px] uppercase tracking-widest text-cyan-400 font-mono font-bold block">Nivel Adaptativo</span>
        <p class="text-xl font-black text-cyan-300">Nivel {adaptiveLevel}</p>
      </div>
      <div class="border-l border-white/10 pl-4">
        <span class="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold block">Racha Actual</span>
        <p class="text-xl font-black text-amber-300">{streakInfo.currentStreak} días</p>
      </div>
    </div>
  </div>

  {#if workoutStage === 'intro'}
    <div class="space-y-4 text-center py-4">
      <p class="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
        El entrenamiento continuo de corta duración estimula la neuroplasticidad y consolida la memoria de trabajo.
      </p>

      <div class="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-emerald-400 font-bold uppercase block">Bloque 1</span>
          <span class="text-xs text-white font-semibold">Rotación 3D</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-cyan-400 font-bold uppercase block">Bloque 2</span>
          <span class="text-xs text-white font-semibold">Inhibición Stroop</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-yellow-400 font-bold uppercase block">Bloque 3</span>
          <span class="text-xs text-white font-semibold">Velocidad Motora</span>
        </div>
      </div>

      <button
        type="button"
        onclick={startDailyWorkout}
        class="py-3 px-8 bg-amber-400 hover:bg-amber-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer"
      >
        ⚡ Iniciar Rutina de Hoy
      </button>
    </div>
  {:else if workoutStage === 'rotation'}
    <div class="space-y-3">
      <span class="text-xs text-emerald-400 font-mono font-bold block text-center">BLOQUE 1: ROTACIÓN 3D ({currentStep + 1}/3)</span>
      <WebGPUMentalRotation onComplete={handleRotationComplete} />
    </div>
  {:else if workoutStage === 'stroop'}
    <div class="space-y-3">
      <span class="text-xs text-cyan-400 font-mono font-bold block text-center">BLOQUE 2: INHIBICIÓN ({currentStep + 1}/5)</span>
      <StroopColorBoard trial={currentStroopItem} onAnswer={handleStroopAnswer} />
    </div>
  {:else if workoutStage === 'reaction'}
    <div class="space-y-3">
      <span class="text-xs text-yellow-400 font-mono font-bold block text-center">BLOQUE 3: VELOCIDAD ({currentStep + 1}/3)</span>
      <ReactionMotorPad onCompleteTrial={handleReactionTrial} />
    </div>
  {:else if workoutStage === 'completed'}
    <div class="text-center space-y-4 py-6">
      <div class="inline-block p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-full animate-bounce">
        <span class="text-3xl">🏆</span>
      </div>
      <h3 class="text-2xl font-black text-white">¡Rutina Diaria Completada!</h3>
      <p class="text-xs text-white/60">Has fortalecido tus conexiones sinápticas por hoy. Vuelve mañana para mantener tu racha.</p>

      <div class="grid grid-cols-2 gap-3 max-w-sm mx-auto p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
        <div>
          <span class="text-[10px] text-white/50 uppercase font-mono font-bold block">Precisión Total</span>
          <span class="text-xl font-bold text-emerald-400">{overallAccuracy}%</span>
        </div>
        <div>
          <span class="text-[10px] text-white/50 uppercase font-mono font-bold block">Estado de Nivel</span>
          <span class="text-sm font-bold {levelUpgraded ? 'text-cyan-300' : 'text-white/80'}">
            {levelUpgraded ? `¡Subiste a Nivel ${adaptiveLevel}!` : `Mantenido (Nivel ${adaptiveLevel})`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onclick={() => workoutStage = 'intro'}
        class="py-2.5 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer"
      >
        Volver al Panel
      </button>
    </div>
  {/if}
</div>
