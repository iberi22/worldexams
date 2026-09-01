<script lang="ts">
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    totalTrials?: number;
    onComplete?: (stats: { ruleSwitchesSuccess: number; totalRuleTrials: number; perseverativeErrors: number }) => void;
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
  let consecutiveCorrect = $state(0);
  let trialIndex = $state(0);
  let ruleSwitches = $state(0);
  let perseverativeErrors = $state(0);

  // Carta actual de prueba
  let currentCard = $state({
    color: colors[1],
    shape: shapes[0],
    number: 3
  });

  let feedback = $state<'correct' | 'incorrect' | null>(null);

  function generateNextCard() {
    currentCard = {
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      number: numbers[Math.floor(Math.random() * numbers.length)]
    };
  }

  function handleSelectTarget(targetIdx: number) {
    const target = targetCards[targetIdx];
    let isMatch = false;

    if (currentRule === 'color' && target.color === currentCard.color) isMatch = true;
    else if (currentRule === 'shape' && target.shape === currentCard.shape) isMatch = true;
    else if (currentRule === 'number' && target.number === currentCard.number) isMatch = true;

    if (isMatch) {
      neuroAudio.playSuccess();
      feedback = 'correct';
      consecutiveCorrect++;
      // Si acierta 4 seguidas, cambia la regla sin avisar (Flexibilidad ejecutiva)
      if (consecutiveCorrect >= 4) {
        consecutiveCorrect = 0;
        const dims: Dimension[] = ['color', 'shape', 'number'];
        currentRule = dims.filter(d => d !== currentRule)[Math.floor(Math.random() * 2)];
        ruleSwitches++;
      }
    } else {
      neuroAudio.playError();
      feedback = 'incorrect';
      consecutiveCorrect = 0;
      perseverativeErrors++;
    }

    trialIndex++;
    if (trialIndex >= totalTrials) {
      onComplete?.({
        ruleSwitchesSuccess: Math.max(1, ruleSwitches),
        totalRuleTrials: totalTrials,
        perseverativeErrors
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
    <span class="text-xs uppercase tracking-widest text-pink-400 font-bold">Clasificación de Tarjetas (Flexibilidad Ejecutiva)</span>
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
        class="h-28 sm:h-32 p-2 bg-white/5 border border-white/20 hover:border-pink-400 hover:bg-white/10 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group active:scale-95 shadow-md"
      >
        <div class="flex flex-wrap items-center justify-center gap-1">
          {#each Array(target.number) as _}
            <div
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/40"
              style="background-color: {target.color}; border-radius: {target.shape === 'square' ? '2px' : target.shape === 'triangle' ? '0' : '999px'}; clip-path: {target.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};"
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
          class="w-6 h-6 rounded-full border border-black/50 shadow-md"
          style="background-color: {currentCard.color}; border-radius: {currentCard.shape === 'square' ? '4px' : currentCard.shape === 'triangle' ? '0' : '999px'}; clip-path: {currentCard.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};"
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
