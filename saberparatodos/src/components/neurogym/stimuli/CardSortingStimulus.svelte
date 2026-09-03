<script lang="ts">
  /**
   * CardSortingStimulus.svelte
   * Wisconsin Card Sorting Task Proxy (Executive Flexibility & Rule Switching).
   */
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    totalTrials?: number;
    onComplete?: (stats: {
      ruleSwitchesSuccess: number;
      totalRuleTrials: number;
      perseverativeErrors: number;
      avgRuleSwitchLatencyMs: number;
    }) => void;
  }

  let { totalTrials = 15, onComplete }: Props = $props();

  type Dimension = 'color' | 'shape' | 'number';
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b']; // red, blue, green, yellow
  const shapes = ['circle', 'triangle', 'square', 'star'];
  const numbers = [1, 2, 3, 4];

  // 4 cartas objetivo de referencia (fijas)
  const targetCards = [
    { color: colors[0], shape: shapes[0], number: 1 }, // 1 Red Circle
    { color: colors[1], shape: shapes[1], number: 2 }, // 2 Blue Triangles
    { color: colors[2], shape: shapes[2], number: 3 }, // 3 Green Squares
    { color: colors[3], shape: shapes[3], number: 4 }  // 4 Yellow Stars
  ];

  let currentRule = $state<Dimension>('color');
  let previousRule = $state<Dimension | null>(null);
  let consecutiveCorrect = $state(0);
  let trialIndex = $state(0);
  let ruleSwitches = $state(0);
  let perseverativeErrors = $state(0);

  // Timing & Latency tracking upon rule changes
  let lastRuleShiftTimestamp = $state<number | null>(null);
  let ruleSwitchLatencies = $state<number[]>([]);

  // Carta actual de prueba
  let currentCard = $state({
    color: colors[1],
    shape: shapes[0],
    number: 3
  });

  let feedback = $state<'correct' | 'incorrect' | null>(null);

  function getShapeStyle(shape: string) {
    if (shape === 'triangle') {
      return 'border-radius: 0; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);';
    }
    if (shape === 'square') {
      return 'border-radius: 2px; clip-path: none;';
    }
    if (shape === 'star') {
      return 'border-radius: 0; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);';
    }
    return 'border-radius: 9999px; clip-path: none;';
  }

  function generateNextCard() {
    currentCard = {
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      number: numbers[Math.floor(Math.random() * numbers.length)]
    };
  }

  function handleSelectTarget(targetIdx: number) {
    const target = targetCards[targetIdx];
    const now = performance.now();
    let isMatch = false;

    if (currentRule === 'color' && target.color === currentCard.color) isMatch = true;
    else if (currentRule === 'shape' && target.shape === currentCard.shape) isMatch = true;
    else if (currentRule === 'number' && target.number === currentCard.number) isMatch = true;

    if (isMatch) {
      neuroAudio.playSuccess();
      feedback = 'correct';
      consecutiveCorrect++;

      // Record rule switch latency if this is the first correct answer after a rule switch
      if (lastRuleShiftTimestamp !== null) {
        const latency = Math.round(now - lastRuleShiftTimestamp);
        ruleSwitchLatencies.push(latency);
        lastRuleShiftTimestamp = null;
      }

      // Shift unseen rule every 5 correct trials
      if (consecutiveCorrect >= 5) {
        consecutiveCorrect = 0;
        previousRule = currentRule;
        const dims: Dimension[] = ['color', 'shape', 'number'];
        currentRule = dims.filter(d => d !== currentRule)[Math.floor(Math.random() * 2)];
        ruleSwitches++;
        lastRuleShiftTimestamp = performance.now();
      }
    } else {
      neuroAudio.playError();
      feedback = 'incorrect';
      consecutiveCorrect = 0;

      // Track perseverative errors: error where choice matches the previous rule
      if (previousRule) {
        let matchesPreviousRule = false;
        if (previousRule === 'color' && target.color === currentCard.color) matchesPreviousRule = true;
        else if (previousRule === 'shape' && target.shape === currentCard.shape) matchesPreviousRule = true;
        else if (previousRule === 'number' && target.number === currentCard.number) matchesPreviousRule = true;

        if (matchesPreviousRule) {
          perseverativeErrors++;
        }
      }
    }

    trialIndex++;
    if (trialIndex >= totalTrials) {
      const avgLatency = ruleSwitchLatencies.length > 0
        ? Math.round(ruleSwitchLatencies.reduce((a, b) => a + b, 0) / ruleSwitchLatencies.length)
        : 0;

      onComplete?.({
        ruleSwitchesSuccess: Math.max(1, ruleSwitches),
        totalRuleTrials: totalTrials,
        perseverativeErrors,
        avgRuleSwitchLatencyMs: avgLatency
      });
    } else {
      setTimeout(() => {
        feedback = null;
        generateNextCard();
      }, 400);
    }
  }

  $effect(() => {
    generateNextCard();
  });
</script>

<div class="flex flex-col items-center gap-6 w-full max-w-xl mx-auto select-none">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-pink-400 font-bold">Clasificación de Tarjetas (Flexibilidad Ejecutiva - WCST)</span>
    <p class="text-xs text-white/60 mt-1">
      Empareja la carta inferior con una de las 4 cartas superiores según la <strong>regla oculta</strong>.
    </p>
  </div>

  <!-- 4 Reference Target Cards -->
  <div class="grid grid-cols-4 gap-2 sm:gap-3 w-full">
    {#each targetCards as target, idx}
      <button
        type="button"
        onclick={() => handleSelectTarget(idx)}
        aria-label="Pila {idx + 1}: {target.number} elemento(s) de figura {target.shape}"
        class="h-28 sm:h-32 p-2 bg-white/5 border border-white/20 hover:border-pink-400 hover:bg-white/10 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group active:scale-95 shadow-md"
      >
        <div class="flex flex-wrap items-center justify-center gap-1">
          {#each Array(target.number) as _}
            <div
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black/40 shadow-sm"
              style="background-color: {target.color}; {getShapeStyle(target.shape)}"
            ></div>
          {/each}
        </div>
        <span class="text-[9px] text-white/40 font-mono mt-1">Pila {idx + 1}</span>
      </button>
    {/each}
  </div>

  <!-- Test Card to Match -->
  <div class="p-6 bg-black/80 border-2 transition-all duration-200 {feedback === 'correct' ? 'border-emerald-400 bg-emerald-950/20' : feedback === 'incorrect' ? 'border-red-400 bg-red-950/20' : 'border-white/20'} rounded-3xl flex flex-col items-center justify-center shadow-2xl min-w-[160px]">
    <span class="text-[10px] uppercase tracking-widest text-white/40 mb-2">Carta de Prueba</span>
    <div class="flex flex-wrap items-center justify-center gap-2 py-3">
      {#each Array(currentCard.number) as _}
        <div
          class="w-6 h-6 border border-black/50 shadow-md"
          style="background-color: {currentCard.color}; {getShapeStyle(currentCard.shape)}"
        ></div>
      {/each}
    </div>
    {#if feedback}
      <span class="text-xs font-bold uppercase tracking-widest {feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'} animate-bounce mt-1">
        {feedback === 'correct' ? '¡Correcto!' : '¡Incorrecto!'}
      </span>
    {/if}
  </div>
</div>
