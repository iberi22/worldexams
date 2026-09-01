<script lang="ts">
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    part?: 'A' | 'B';
    onComplete?: (totalTimeMs: number, errorCount: number) => void;
  }

  let { part = 'A', onComplete }: Props = $props();

  // Parte A: 1-2-3-4-5-6-7-8
  // Parte B: 1-A-2-B-3-C-4-D
  const nodesPartA = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const nodesPartB = ['1', 'A', '2', 'B', '3', 'C', '4', 'D'];
  const targetNodes = part === 'A' ? nodesPartA : nodesPartB;

  // Posiciones precalculadas dispersas en %
  const nodeLayout = [
    { x: 18, y: 22 },
    { x: 55, y: 15 },
    { x: 82, y: 30 },
    { x: 30, y: 48 },
    { x: 70, y: 55 },
    { x: 15, y: 78 },
    { x: 48, y: 82 },
    { x: 85, y: 80 }
  ];

  let currentStep = $state(0);
  let connectedLines = $state<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  let startTime = $state(0);
  let isStarted = $state(false);
  let errors = $state(0);

  function handleNodeClick(idx: number) {
    if (!isStarted) {
      isStarted = true;
      startTime = performance.now();
    }

    if (idx === currentStep) {
      neuroAudio.playTone(400 + idx * 50, 0.1);

      if (currentStep > 0) {
        const prev = nodeLayout[currentStep - 1];
        const curr = nodeLayout[currentStep];
        connectedLines.push({
          x1: prev.x,
          y1: prev.y,
          x2: curr.x,
          y2: curr.y
        });
      }

      currentStep++;

      if (currentStep >= targetNodes.length) {
        const total = Math.round(performance.now() - startTime);
        neuroAudio.playSuccess();
        onComplete?.(total, errors);
      }
    } else {
      errors++;
      neuroAudio.playError();
    }
  }
</script>

<div class="flex flex-col items-center gap-4 w-full max-w-xl mx-auto select-none">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-yellow-400 font-bold">Trail Making Test (Parte {part})</span>
    <p class="text-xs text-white/60 mt-1">
      Une los círculos en orden: <strong>{part === 'A' ? '1 → 2 → 3...' : '1 → A → 2 → B → 3...'}</strong> lo más rápido que puedas.
    </p>
  </div>

  <!-- Interactive SVG / DOM Map -->
  <div class="relative w-full h-80 sm:h-96 bg-black/80 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
    <!-- Render Connected Lines in SVG Layer -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {#each connectedLines as line}
        <line
          x1="{line.x1}%"
          y1="{line.y1}%"
          x2="{line.x2}%"
          y2="{line.y2}%"
          stroke="#facc15"
          stroke-width="2"
          stroke-linecap="round"
        />
      {/each}
    </svg>

    <!-- Node Buttons -->
    {#each targetNodes as label, idx}
      {@const pos = nodeLayout[idx]}
      {@const isCompleted = idx < currentStep}
      {@const isNext = idx === currentStep}
      <button
        type="button"
        onclick={() => handleNodeClick(idx)}
        style="left: {pos.x}%; top: {pos.y}%;"
        class="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all font-black text-sm flex items-center justify-center cursor-pointer {isCompleted ? 'bg-yellow-400 border-white text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]' : isNext ? 'bg-white/20 border-yellow-400 text-white animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20'}"
      >
        {label}
      </button>
    {/each}
  </div>
</div>
