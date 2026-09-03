<script lang="ts">
  import { onDestroy } from 'svelte';
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  export interface DualNBackStats {
    nLevel: number;
    totalTrials: number;
    totalOpportunities: number;

    // Position metrics
    positionHits: number;
    positionFalseAlarms: number;
    positionMisses: number;
    positionCorrectRejections: number;
    positionPrecision: number;
    positionRecall: number;

    // Audio metrics
    audioHits: number;
    audioFalseAlarms: number;
    audioMisses: number;
    audioCorrectRejections: number;
    audioPrecision: number;
    audioRecall: number;

    // Combined metrics
    combinedPrecision: number;
    combinedRecall: number;
    combinedF1: number;
    accuracy: number;
    positionScore: number;
    audioScore: number;
  }

  interface Props {
    nLevel?: number;
    totalTrials?: number;
    onComplete?: (stats: DualNBackStats) => void;
  }

  let { nLevel = 2, totalTrials = 20, onComplete }: Props = $props();

  // Active N Level configuration (range 1..4)
  let selectedN = $state(Math.min(4, Math.max(1, nLevel)));

  let trialIndex = $state(0);
  let activeGridCell = $state<number | null>(null);
  let activeLetter = $state<string | null>(null);
  let isRunning = $state(false);

  // History tracking for stimuli
  let positionHistory = $state<number[]>([]);
  let audioHistory = $state<number[]>([]);

  // User responses for current trial and history
  let positionAnswered = $state(false);
  let audioAnswered = $state(false);
  let positionResponses = $state<boolean[]>([]);
  let audioResponses = $state<boolean[]>([]);

  // Realtime feedback indicators
  let positionFeedback = $state<'correct' | 'wrong' | null>(null);
  let audioFeedback = $state<'correct' | 'wrong' | null>(null);

  // Stats on completion
  let finalStats = $state<DualNBackStats | null>(null);

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'H', 'K', 'L'];
  let timerId: ReturnType<typeof setTimeout> | null = null;

  function cleanupTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  onDestroy(() => {
    cleanupTimer();
  });

  export function computeMetrics(
    historyPos: number[],
    historyAud: number[],
    respPos: boolean[],
    respAud: boolean[],
    n: number
  ): DualNBackStats {
    let posTP = 0, posFP = 0, posFN = 0, posTN = 0;
    let audTP = 0, audFP = 0, audFN = 0, audTN = 0;

    const len = historyPos.length;

    for (let t = n; t < len; t++) {
      const isPosMatch = historyPos[t] === historyPos[t - n];
      const respondedPos = respPos[t] ?? false;

      if (isPosMatch && respondedPos) posTP++;
      else if (!isPosMatch && respondedPos) posFP++;
      else if (isPosMatch && !respondedPos) posFN++;
      else posTN++;

      const isAudMatch = historyAud[t] === historyAud[t - n];
      const respondedAud = respAud[t] ?? false;

      if (isAudMatch && respondedAud) audTP++;
      else if (!isAudMatch && respondedAud) audFP++;
      else if (isAudMatch && !respondedAud) audFN++;
      else audTN++;
    }

    const posPrecision = (posTP + posFP) > 0 ? posTP / (posTP + posFP) : 1;
    const posRecall = (posTP + posFN) > 0 ? posTP / (posTP + posFN) : 1;

    const audPrecision = (audTP + audFP) > 0 ? audTP / (audTP + audFP) : 1;
    const audRecall = (audTP + audFN) > 0 ? audTP / (audTP + audFN) : 1;

    const totalTP = posTP + audTP;
    const totalFP = posFP + audFP;
    const totalFN = posFN + audFN;
    const totalTN = posTN + audTN;

    const combinedPrecision = (totalTP + totalFP) > 0 ? totalTP / (totalTP + totalFP) : 1;
    const combinedRecall = (totalTP + totalFN) > 0 ? totalTP / (totalTP + totalFN) : 1;
    const combinedF1 = (combinedPrecision + combinedRecall) > 0
      ? (2 * combinedPrecision * combinedRecall) / (combinedPrecision + combinedRecall)
      : 0;

    const totalOpps = Math.max(0, (len - n) * 2);
    const totalCorrect = posTP + posTN + audTP + audTN;
    const accuracy = totalOpps > 0 ? totalCorrect / totalOpps : 1;

    return {
      nLevel: n,
      totalTrials: len,
      totalOpportunities: totalOpps,
      positionHits: posTP,
      positionFalseAlarms: posFP,
      positionMisses: posFN,
      positionCorrectRejections: posTN,
      positionPrecision: Math.min(1, Math.max(0, posPrecision)),
      positionRecall: Math.min(1, Math.max(0, posRecall)),

      audioHits: audTP,
      audioFalseAlarms: audFP,
      audioMisses: audFN,
      audioCorrectRejections: audTN,
      audioPrecision: Math.min(1, Math.max(0, audPrecision)),
      audioRecall: Math.min(1, Math.max(0, audRecall)),

      combinedPrecision: Math.min(1, Math.max(0, combinedPrecision)),
      combinedRecall: Math.min(1, Math.max(0, combinedRecall)),
      combinedF1: Math.min(1, Math.max(0, combinedF1)),
      accuracy: Math.min(1, Math.max(0, accuracy)),
      positionScore: posTP,
      audioScore: audTP
    };
  }

  function finishTask() {
    isRunning = false;
    activeGridCell = null;
    activeLetter = null;

    const stats = computeMetrics(
      positionHistory,
      audioHistory,
      positionResponses,
      audioResponses,
      selectedN
    );

    finalStats = stats;
    onComplete?.(stats);
  }

  function runTrialStep() {
    if (!isRunning) return;

    if (trialIndex >= totalTrials) {
      finishTask();
      return;
    }

    positionAnswered = false;
    audioAnswered = false;
    positionFeedback = null;
    audioFeedback = null;

    // Generar estímulo visual (grilla 3x3: 0..8)
    const pos = Math.floor(Math.random() * 9);
    // Generar estímulo auditivo (tono / letra: 0..7)
    const soundIdx = Math.floor(Math.random() * LETTERS.length);

    positionHistory = [...positionHistory, pos];
    audioHistory = [...audioHistory, soundIdx];
    positionResponses = [...positionResponses, false];
    audioResponses = [...audioResponses, false];

    activeGridCell = pos;
    activeLetter = LETTERS[soundIdx];

    // Emitir tono sintetizado
    neuroAudio.playNBackLetterTone(soundIdx);

    // Estímulo encendido durante 600ms
    timerId = setTimeout(() => {
      activeGridCell = null;
      activeLetter = null;

      // Resto de la ventana de respuesta (1400ms)
      timerId = setTimeout(() => {
        trialIndex++;
        if (isRunning) {
          runTrialStep();
        }
      }, 1400);
    }, 600);
  }

  export function startTask() {
    cleanupTimer();
    isRunning = true;
    trialIndex = 0;
    positionHistory = [];
    audioHistory = [];
    positionResponses = [];
    audioResponses = [];
    positionAnswered = false;
    audioAnswered = false;
    positionFeedback = null;
    audioFeedback = null;
    finalStats = null;

    runTrialStep();
  }

  function handlePositionMatch() {
    if (!isRunning || positionAnswered || trialIndex >= positionHistory.length) return;
    positionAnswered = true;
    positionResponses[trialIndex] = true;

    if (trialIndex >= selectedN) {
      const isMatch = positionHistory[trialIndex] === positionHistory[trialIndex - selectedN];
      if (isMatch) {
        positionFeedback = 'correct';
        neuroAudio.playSuccess();
      } else {
        positionFeedback = 'wrong';
        neuroAudio.playError();
      }
    }
  }

  function handleAudioMatch() {
    if (!isRunning || audioAnswered || trialIndex >= audioHistory.length) return;
    audioAnswered = true;
    audioResponses[trialIndex] = true;

    if (trialIndex >= selectedN) {
      const isMatch = audioHistory[trialIndex] === audioHistory[trialIndex - selectedN];
      if (isMatch) {
        audioFeedback = 'correct';
        neuroAudio.playSuccess();
      } else {
        audioFeedback = 'wrong';
        neuroAudio.playError();
      }
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!isRunning) return;

    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePositionMatch();
    } else if (event.key === 'l' || event.key === 'L' || event.key === 'ArrowRight') {
      event.preventDefault();
      handleAudioMatch();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex flex-col items-center gap-6 w-full max-w-lg mx-auto select-none">
  <!-- Header with N Selector -->
  <div class="text-center space-y-2 w-full">
    <div class="flex items-center justify-between bg-black/40 border border-white/10 p-3 rounded-2xl">
      <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
        🧠 Dual N-Back <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-[10px]">{selectedN}-Back</span>
      </span>

      <!-- N-Level Selector (available when idle) -->
      {#if !isRunning}
        <div class="flex items-center gap-1">
          <span class="text-[10px] text-white/50 uppercase font-mono mr-1">N:</span>
          {#each [1, 2, 3, 4] as level}
            <button
              type="button"
              onclick={() => selectedN = level}
              class="w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all border cursor-pointer {selectedN === level ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-105' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10'}"
            >
              {level}
            </button>
          {/each}
        </div>
      {:else}
        <span class="text-xs font-mono font-semibold text-white/70">
          Ensayo {trialIndex + 1} / {totalTrials}
        </span>
      {/if}
    </div>

    <p class="text-xs text-white/60 leading-relaxed px-2">
      Indica si la <strong>posición</strong> o la <strong>letra/sonido</strong> actual coincide con la presentada hace <strong>{selectedN} paso{selectedN > 1 ? 's' : ''}</strong>.
    </p>
  </div>

  <!-- 3x3 Visual Grid + Active Audio Indicator -->
  <div class="relative w-72 h-72 bg-black/80 border border-white/20 rounded-3xl p-3 grid grid-cols-3 gap-2.5 shadow-[0_0_35px_rgba(0,0,0,0.9)]">
    {#each Array(9) as _, idx}
      <div
        class="rounded-2xl border transition-all duration-150 flex items-center justify-center relative overflow-hidden {activeGridCell === idx ? 'bg-gradient-to-br from-emerald-400 to-teal-300 border-white shadow-[0_0_25px_rgba(52,211,153,0.95)] scale-105' : 'bg-white/5 border-white/10'}"
      >
        {#if activeGridCell === idx && activeLetter}
          <span class="text-3xl font-black text-black font-mono drop-shadow animate-pulse">
            {activeLetter}
          </span>
        {/if}
      </div>
    {/each}

    {#if activeLetter && activeGridCell === null}
      <div class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs rounded-3xl">
        <span class="text-4xl font-black text-cyan-400 font-mono tracking-widest animate-pulse">
          🔊 {activeLetter}
        </span>
      </div>
    {/if}
  </div>

  <!-- Realtime Response Feedback Badges -->
  {#if isRunning && trialIndex >= selectedN}
    <div class="flex items-center justify-center gap-4 text-xs font-mono">
      {#if positionFeedback === 'correct'}
        <span class="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
          ✓ Posición Acierto
        </span>
      {:else if positionFeedback === 'wrong'}
        <span class="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
          ✗ Posición Fallo
        </span>
      {/if}

      {#if audioFeedback === 'correct'}
        <span class="text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
          ✓ Sonido Acierto
        </span>
      {:else if audioFeedback === 'wrong'}
        <span class="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
          ✗ Sonido Fallo
        </span>
      {/if}
    </div>
  {/if}

  <!-- Dual Response Controls -->
  <div class="grid grid-cols-2 gap-3 w-full">
    <button
      type="button"
      disabled={!isRunning || trialIndex < selectedN || positionAnswered}
      onclick={handlePositionMatch}
      class="py-3.5 px-4 rounded-2xl border-2 font-bold uppercase tracking-wider text-xs transition-all flex flex-col items-center justify-center gap-1 {positionAnswered ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-white/5 border-white/20 hover:border-emerald-400 hover:bg-white/10 text-white/90 active:scale-95'} disabled:opacity-30 cursor-pointer"
      style="min-height: 54px;"
    >
      <span class="flex items-center gap-1">📍 Posición Coincide</span>
      <span class="text-[9px] font-mono text-white/40 uppercase">Tecla 'A' / ←</span>
    </button>

    <button
      type="button"
      disabled={!isRunning || trialIndex < selectedN || audioAnswered}
      onclick={handleAudioMatch}
      class="py-3.5 px-4 rounded-2xl border-2 font-bold uppercase tracking-wider text-xs transition-all flex flex-col items-center justify-center gap-1 {audioAnswered ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/20 hover:border-cyan-400 hover:bg-white/10 text-white/90 active:scale-95'} disabled:opacity-30 cursor-pointer"
      style="min-height: 54px;"
    >
      <span class="flex items-center gap-1">🎵 Sonido Coincide</span>
      <span class="text-[9px] font-mono text-white/40 uppercase">Tecla 'L' / →</span>
    </button>
  </div>

  <!-- Start / Restart Controls -->
  {#if !isRunning && !finalStats}
    <button
      type="button"
      onclick={startTask}
      class="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:opacity-90 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
    >
      ▶ Iniciar Tarea Dual {selectedN}-Back
    </button>
  {/if}

  <!-- Stats Display Card upon completion -->
  {#if finalStats}
    <div class="w-full p-5 bg-black/90 border border-emerald-500/40 rounded-3xl space-y-4 shadow-2xl">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider">Resultados Dual {finalStats.nLevel}-Back</h4>
          <p class="text-[10px] text-white/50">{finalStats.totalTrials} ensayos ({finalStats.totalOpportunities} oportunidades evaluadas)</p>
        </div>
        <span class="text-lg font-black text-emerald-400 font-mono">
          {Math.round(finalStats.accuracy * 100)}% Exactitud
        </span>
      </div>

      <!-- Precision & Recall Summary Matrix -->
      <div class="grid grid-cols-3 gap-2 text-center font-mono">
        <div class="p-2.5 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[9px] text-emerald-400 font-bold uppercase block">Precisión</span>
          <span class="text-base font-black text-white">{Math.round(finalStats.combinedPrecision * 100)}%</span>
        </div>
        <div class="p-2.5 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[9px] text-cyan-400 font-bold uppercase block">Exhaustividad (Recall)</span>
          <span class="text-base font-black text-white">{Math.round(finalStats.combinedRecall * 100)}%</span>
        </div>
        <div class="p-2.5 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[9px] text-amber-400 font-bold uppercase block">Puntaje F1</span>
          <span class="text-base font-black text-white">{Math.round(finalStats.combinedF1 * 100)}%</span>
        </div>
      </div>

      <!-- Detail per modality -->
      <div class="grid grid-cols-2 gap-3 text-xs border-t border-white/10 pt-3">
        <div class="space-y-1">
          <span class="text-[10px] uppercase font-bold text-emerald-400 block">📍 Posición Visuoespacial</span>
          <div class="text-[10px] text-white/70 font-mono space-y-0.5">
            <p>Precisión: <strong class="text-white">{Math.round(finalStats.positionPrecision * 100)}%</strong></p>
            <p>Recall: <strong class="text-white">{Math.round(finalStats.positionRecall * 100)}%</strong></p>
            <p>Aciertos (TP): {finalStats.positionHits} | Falsas Alarmas (FP): {finalStats.positionFalseAlarms}</p>
          </div>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] uppercase font-bold text-cyan-400 block">🎵 Sonido / Auditivo</span>
          <div class="text-[10px] text-white/70 font-mono space-y-0.5">
            <p>Precisión: <strong class="text-white">{Math.round(finalStats.audioPrecision * 100)}%</strong></p>
            <p>Recall: <strong class="text-white">{Math.round(finalStats.audioRecall * 100)}%</strong></p>
            <p>Aciertos (TP): {finalStats.audioHits} | Falsas Alarmas (FP): {finalStats.audioFalseAlarms}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onclick={startTask}
        class="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer"
      >
        🔄 Reiniciar Tarea Dual {selectedN}-Back
      </button>
    </div>
  {/if}
</div>
