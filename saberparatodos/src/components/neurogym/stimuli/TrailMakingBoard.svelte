<!-- TrailMakingBoard Stimulus Component -->
<script lang="ts">
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    part?: 'A' | 'B';
    onComplete?: (totalTimeMs: number, errorCount: number) => void;
  }

  let { part = 'A', onComplete }: Props = $props();

  // Parte A: Escaneo visual secuencial (1-2-3-4...)
  // Parte B: Alternancia cognitiva / Set-Shifting (1-A-2-B...)
  const nodesPartA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const nodesPartB = ['1', 'A', '2', 'B', '3', 'C', '4', 'D', '5', 'E'];

  let targetNodes = $derived(part === 'A' ? nodesPartA : nodesPartB);

  // Posiciones dispersas en porcentajes % para evitar superposición
  const nodeLayout = [
    { x: 18, y: 22 },
    { x: 55, y: 15 },
    { x: 82, y: 30 },
    { x: 30, y: 48 },
    { x: 70, y: 55 },
    { x: 15, y: 78 },
    { x: 48, y: 82 },
    { x: 85, y: 80 },
    { x: 42, y: 35 },
    { x: 75, y: 18 }
  ];

  let currentStep = $state(0);
  let connectedLines = $state<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  let startTime = $state(0);
  let elapsedMs = $state(0);
  let isStarted = $state(false);
  let isCompleted = $state(false);
  let errors = $state(0);
  let lastErrorIdx = $state<number | null>(null);

  function resetBoard() {
    currentStep = 0;
    connectedLines = [];
    startTime = 0;
    elapsedMs = 0;
    isStarted = false;
    isCompleted = false;
    errors = 0;
    lastErrorIdx = null;
  }

  // Reiniciar estado si cambia la Parte (A vs B)
  $effect(() => {
    // Escuchar cambios en part prop
    void part;
    resetBoard();
  });

  function handleNodeClick(idx: number) {
    if (isCompleted) return;

    const now = performance.now();
    if (!isStarted) {
      isStarted = true;
      startTime = now;
    }

    if (idx === currentStep) {
      neuroAudio.playTone(400 + idx * 45, 0.1);

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
        isCompleted = true;
        const total = Math.round(performance.now() - startTime);
        elapsedMs = total;
        neuroAudio.playSuccess();
        onComplete?.(total, errors);
      }
    } else {
      errors++;
      lastErrorIdx = idx;
      neuroAudio.playError();
      setTimeout(() => {
        if (lastErrorIdx === idx) {
          lastErrorIdx = null;
        }
      }, 400);
    }
  }
</script>

<div class="flex flex-col items-center gap-4 w-full max-w-xl mx-auto select-none">
  <!-- Header Info -->
  <div class="text-center space-y-1">
    <div class="flex items-center justify-center gap-2">
      <span class="text-xs uppercase tracking-widest text-yellow-400 font-bold">
        Trail Making Test (Parte {part})
      </span>
      <span class="text-[10px] bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 px-2 py-0.5 rounded font-mono font-semibold">
        {part === 'A' ? 'Busqueda Visual' : 'Alternancia Flexibilidad'}
      </span>
    </div>
    <p class="text-xs text-white/70">
      Toca los círculos en orden:
      <strong class="text-yellow-300 font-mono">
        {part === 'A' ? '1 → 2 → 3 → 4...' : '1 → A → 2 → B → 3...'}
      </strong>
    </p>
  </div>

  <!-- Status Bar -->
  <div class="flex items-center justify-between w-full px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono">
    <div class="flex items-center gap-2">
      <span class="text-white/50">Progreso:</span>
      <span class="text-yellow-400 font-bold">{currentStep} / {targetNodes.length}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-white/50">Errores:</span>
      <span class="{errors > 0 ? 'text-red-400 font-bold' : 'text-white/70'}">{errors}</span>
    </div>
    <button
      type="button"
      onclick={resetBoard}
      aria-label="Reiniciar prueba Trail Making"
      class="text-[11px] text-white/60 hover:text-white underline cursor-pointer"
    >
      Reiniciar
    </button>
  </div>

  <!-- Interactive Scatter SVG / DOM Canvas -->
  <div class="relative w-full h-80 sm:h-96 bg-black/80 border border-white/20 rounded-3xl overflow-hidden shadow-2xl touch-manipulation">
    <!-- SVG Connection Lines -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {#each connectedLines as line}
        <line
          x1="{line.x1}%"
          y1="{line.y1}%"
          x2="{line.x2}%"
          y2="{line.y2}%"
          stroke="#facc15"
          stroke-width="2.5"
          stroke-linecap="round"
        />
      {/each}
    </svg>

    <!-- Node Buttons -->
    {#each targetNodes as label, idx}
      {@const pos = nodeLayout[idx]}
      {@const isCompletedNode = idx < currentStep}
      {@const isNextTarget = idx === currentStep}
      {@const isErrorNode = lastErrorIdx === idx}
      <button
        type="button"
        onclick={() => handleNodeClick(idx)}
        aria-label={"Nodo " + label}
        style="left: {pos.x}%; top: {pos.y}%; touch-action: manipulation;"
        class="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-150 font-black text-sm flex items-center justify-center cursor-pointer active:scale-90 {isCompletedNode ? 'bg-yellow-400 border-white text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]' : isErrorNode ? 'bg-red-500 border-red-300 text-white animate-bounce shadow-[0_0_15px_rgba(239,68,68,0.8)]' : isNextTarget ? 'bg-white/20 border-yellow-400 text-white animate-pulse shadow-[0_0_12px_rgba(250,204,21,0.6)] hover:bg-yellow-400/30' : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20'}"
      >
        {label}
      </button>
    {/each}
  </div>
</div>
