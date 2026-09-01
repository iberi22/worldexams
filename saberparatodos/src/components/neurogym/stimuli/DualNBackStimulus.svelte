<script lang="ts">
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    nLevel?: number;
    totalTrials?: number;
    onComplete?: (stats: { accuracy: number; positionScore: number; audioScore: number }) => void;
  }

  let { nLevel = 2, totalTrials = 15, onComplete }: Props = $props();

  let trialIndex = $state(0);
  let activeGridCell = $state<number | null>(null);
  let isRunning = $state(false);

  // Historial de estímulos para comparar n pasos atrás
  let positionHistory: number[] = [];
  let audioHistory: number[] = [];

  // Puntuaciones
  let hits = $state(0);
  let falseAlarms = $state(0);
  let positionAnswered = $state(false);
  let audioAnswered = $state(false);

  const letters = ['A', 'B', 'C', 'D', 'E', 'H', 'K', 'L'];

  async function nextTrial() {
    if (trialIndex >= totalTrials) {
      isRunning = false;
      const totalOpportunities = totalTrials - nLevel;
      const accuracy = totalOpportunities > 0 ? Math.max(0, (hits - falseAlarms * 0.5) / totalOpportunities) : 1;
      onComplete?.({
        accuracy: Math.min(1, Math.max(0, accuracy)),
        positionScore: hits,
        audioScore: totalTrials
      });
      return;
    }

    positionAnswered = false;
    audioAnswered = false;

    // Generar estímulo visual (grilla 3x3: 0..8)
    const pos = Math.floor(Math.random() * 9);
    // Generar estímulo auditivo (tono / letra: 0..7)
    const soundIdx = Math.floor(Math.random() * letters.length);

    positionHistory.push(pos);
    audioHistory.push(soundIdx);

    activeGridCell = pos;
    neuroAudio.playNBackLetterTone(soundIdx);

    // Duración estímulo: 600ms encendido, 1400ms ventana de respuesta
    await new Promise(r => setTimeout(r, 600));
    activeGridCell = null;

    await new Promise(r => setTimeout(r, 1400));
    trialIndex++;
    if (isRunning) {
      nextTrial();
    }
  }

  export function startTask() {
    isRunning = true;
    trialIndex = 0;
    positionHistory = [];
    audioHistory = [];
    hits = 0;
    falseAlarms = 0;
    nextTrial();
  }

  function handlePositionMatch() {
    if (positionAnswered || trialIndex < nLevel) return;
    positionAnswered = true;

    const currentPos = positionHistory[trialIndex];
    const targetPos = positionHistory[trialIndex - nLevel];

    if (currentPos === targetPos) {
      hits++;
      neuroAudio.playSuccess();
    } else {
      falseAlarms++;
      neuroAudio.playError();
    }
  }

  function handleAudioMatch() {
    if (audioAnswered || trialIndex < nLevel) return;
    audioAnswered = true;

    const currentSound = audioHistory[trialIndex];
    const targetSound = audioHistory[trialIndex - nLevel];

    if (currentSound === targetSound) {
      hits++;
      neuroAudio.playSuccess();
    } else {
      falseAlarms++;
      neuroAudio.playError();
    }
  }
</script>

<div class="flex flex-col items-center gap-6 w-full max-w-md mx-auto select-none">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold">Dual N-Back ({nLevel}-Back)</span>
    <p class="text-xs text-white/60 mt-1">
      Pulsa si la <strong>posición</strong> o el <strong>sonido</strong> coincide con el de hace <strong>{nLevel} paso{nLevel > 1 ? 's' : ''}</strong>.
    </p>
  </div>

  <!-- 3x3 Visual Grid -->
  <div class="w-64 h-64 bg-black/80 border border-white/20 rounded-3xl p-3 grid grid-cols-3 gap-2 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
    {#each Array(9) as _, idx}
      <div
        class="rounded-xl border transition-all duration-150 flex items-center justify-center {activeGridCell === idx ? 'bg-emerald-400 border-white shadow-[0_0_20px_rgba(52,211,153,0.9)] scale-105' : 'bg-white/5 border-white/10'}"
      ></div>
    {/each}
  </div>

  <!-- Response Controls -->
  <div class="grid grid-cols-2 gap-3 w-full">
    <button
      type="button"
      disabled={!isRunning || trialIndex < nLevel}
      onclick={handlePositionMatch}
      class="py-3 px-4 rounded-xl border-2 font-bold uppercase tracking-wider text-xs transition-all {positionAnswered ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/20 hover:border-emerald-400 hover:bg-white/10 text-white/80'} active:scale-95 disabled:opacity-30 cursor-pointer"
      style="min-height: 48px;"
    >
      📍 Posición Coincide
    </button>
    <button
      type="button"
      disabled={!isRunning || trialIndex < nLevel}
      onclick={handleAudioMatch}
      class="py-3 px-4 rounded-xl border-2 font-bold uppercase tracking-wider text-xs transition-all {audioAnswered ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/20 hover:border-cyan-400 hover:bg-white/10 text-white/80'} active:scale-95 disabled:opacity-30 cursor-pointer"
      style="min-height: 48px;"
    >
      🎵 Sonido Coincide
    </button>
  </div>

  {#if !isRunning}
    <button
      type="button"
      onclick={startTask}
      class="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
    >
      ▶ Iniciar Tarea {nLevel}-Back
    </button>
  {/if}
</div>
