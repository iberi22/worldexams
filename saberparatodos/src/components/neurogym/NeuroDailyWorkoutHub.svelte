<script lang="ts">
  import { getStreakInfo, type NeuroStreakInfo } from '../../lib/neurogym/neuro-storage';
  import StroopColorBoard from './stimuli/StroopColorBoard.svelte';
  import ReactionMotorPad from './stimuli/ReactionMotorPad.svelte';
  import { generateStroopTrial, type StroopItem } from '../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';

  interface Props {
    onWorkoutFinished?: () => void;
  }

  let { onWorkoutFinished }: Props = $props();

  let streakInfo = $state<NeuroStreakInfo>(getStreakInfo());
  let workoutStage = $state<'intro' | 'stroop' | 'reaction' | 'completed'>('intro');
  let currentStep = $state(0);
  let currentStroopItem = $state<StroopItem>(generateStroopTrial(1));

  function startDailyWorkout() {
    workoutStage = 'stroop';
    currentStep = 0;
    currentStroopItem = generateStroopTrial(10);
  }

  function handleStroopAnswer(selectedKey: string) {
    if (selectedKey === currentStroopItem.correctColorKey) {
      neuroAudio.playSuccess();
    } else {
      neuroAudio.playError();
    }

    currentStep++;
    if (currentStep < 5) {
      currentStroopItem = generateStroopTrial(currentStep * 5 + 3);
    } else {
      workoutStage = 'reaction';
      currentStep = 0;
    }
  }

  function handleReactionTrial(timeMs: number, success: boolean) {
    if (success && timeMs > 0) {
      neuroAudio.playSuccess();
    } else {
      neuroAudio.playError();
    }

    currentStep++;
    if (currentStep >= 3) {
      workoutStage = 'completed';
      streakInfo = getStreakInfo();
      onWorkoutFinished?.();
    }
  }
</script>

<div class="max-w-2xl mx-auto p-6 bg-gradient-to-br from-black via-[#0d1612] to-black border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <!-- Streak Header -->
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

    <div class="text-right">
      <span class="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Racha Actual</span>
      <p class="text-2xl font-black text-amber-300">{streakInfo.currentStreak} días</p>
    </div>
  </div>

  {#if workoutStage === 'intro'}
    <div class="space-y-4 text-center py-4">
      <p class="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
        El entrenamiento continuo de corta duración estimula la neuroplasticidad y consolida la memoria de trabajo.
      </p>

      <div class="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-cyan-400 font-bold uppercase block">Bloque 1</span>
          <span class="text-xs text-white font-semibold">Inhibición Stroop</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] text-yellow-400 font-bold uppercase block">Bloque 2</span>
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
  {:else if workoutStage === 'stroop'}
    <div class="space-y-3">
      <span class="text-xs text-cyan-400 font-mono font-bold block text-center">BLOQUE 1: INHIBICIÓN ({currentStep + 1}/5)</span>
      <StroopColorBoard trial={currentStroopItem} onAnswer={handleStroopAnswer} />
    </div>
  {:else if workoutStage === 'reaction'}
    <div class="space-y-3">
      <span class="text-xs text-yellow-400 font-mono font-bold block text-center">BLOQUE 2: VELOCIDAD ({currentStep + 1}/3)</span>
      <ReactionMotorPad onCompleteTrial={handleReactionTrial} />
    </div>
  {:else if workoutStage === 'completed'}
    <div class="text-center space-y-4 py-6">
      <div class="inline-block p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-full animate-bounce">
        <span class="text-3xl">🏆</span>
      </div>
      <h3 class="text-2xl font-black text-white">¡Rutina Diaria Completada!</h3>
      <p class="text-xs text-white/60">Has fortalecido tus conexiones sinápticas por hoy. Vuelve mañana para mantener tu racha.</p>

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
