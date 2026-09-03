<script lang="ts">
  /**
   * CorsiBlockBoard.svelte
   * Component: CorsiBlockBoard
   * Interactive 3D/2D Corsi Block-Tapping Stimulus for Visuospatial Working Memory Span Evaluation.
   */
  import { generateCorsiSequence, type CorsiSequenceItem } from '../../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    spanLength?: number;
    seed?: number;
    delayMs?: number;
    onComplete?: (success: boolean, maxSpan: number) => void;
  }

  let { spanLength = 4, seed = 1, delayMs, onComplete }: Props = $props();

  let item = $state<CorsiSequenceItem>(generateCorsiSequence(spanLength, seed));
  let phase = $state<'memorize' | 'recall' | 'feedback'>('memorize');
  let activeBlock = $state<number | null>(null);
  let userSequence = $state<number[]>([]);
  let isSuccess = $state<boolean | null>(null);
  let is3D = $state<boolean>(true);

  let effectiveDelayMs = $derived(delayMs ?? item.delayMs ?? 800);

  // 9 bloques espaciales distribuidos de forma irregular (estándar Corsi Block-Tapping)
  const blockCoordinates = [
    { x: '15%', y: '20%' },
    { x: '45%', y: '15%' },
    { x: '80%', y: '25%' },
    { x: '25%', y: '50%' },
    { x: '60%', y: '45%' },
    { x: '85%', y: '60%' },
    { x: '10%', y: '80%' },
    { x: '45%', y: '78%' },
    { x: '75%', y: '82%' }
  ];

  async function playSequence() {
    phase = 'memorize';
    userSequence = [];
    isSuccess = null;
    activeBlock = null;

    // Pausa inicial antes de arrancar la animación
    await new Promise(r => setTimeout(r, 500));

    for (let i = 0; i < item.blockSequence.length; i++) {
      const blockIdx = item.blockSequence[i];
      activeBlock = blockIdx;
      neuroAudio.playNBackLetterTone(blockIdx);
      await new Promise(r => setTimeout(r, effectiveDelayMs));
      activeBlock = null;
      await new Promise(r => setTimeout(r, Math.max(120, Math.round(effectiveDelayMs * 0.35))));
    }

    phase = 'recall';
  }

  function handleBlockClick(idx: number) {
    if (phase !== 'recall') return; // Previene interacción durante la fase de presentación

    userSequence.push(idx);
    neuroAudio.playTone(350 + idx * 40, 0.12);

    const currentStep = userSequence.length - 1;
    if (userSequence[currentStep] !== item.blockSequence[currentStep]) {
      // Error inmediato
      isSuccess = false;
      phase = 'feedback';
      neuroAudio.playError();
      setTimeout(() => {
        onComplete?.(false, item.spanLength);
      }, 1000);
      return;
    }

    // Secuencia completada exitosamente
    if (userSequence.length === item.blockSequence.length) {
      isSuccess = true;
      phase = 'feedback';
      neuroAudio.playSuccess();
      setTimeout(() => {
        onComplete?.(true, item.spanLength);
      }, 1000);
    }
  }

  function toggle3D() {
    is3D = !is3D;
  }

  function replay() {
    item = generateCorsiSequence(spanLength, seed);
    playSequence();
  }

  $effect(() => {
    // Re-iniciar secuencia si cambian spanLength o seed
    item = generateCorsiSequence(spanLength, seed);
    playSequence();
  });
</script>

<div class="flex flex-col items-center gap-4 w-full max-w-xl mx-auto select-none">
  <!-- Header Control & Status -->
  <div class="w-full flex items-center justify-between text-xs px-2">
    <div class="flex items-center gap-2">
      <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Corsi Block Board (3D/2D)</span>
      <span class="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
        Span: {item.spanLength}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        onclick={toggle3D}
        aria-label="Alternar vista 3D/2D"
        class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/80 hover:text-white transition-all text-[11px] font-semibold cursor-pointer"
      >
        {is3D ? '🧊 Vista 3D' : '📐 Vista 2D'}
      </button>
      <button
        type="button"
        disabled={phase === 'memorize'}
        onclick={replay}
        aria-label="Repetir secuencia Corsi"
        class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/80 hover:text-white transition-all text-[11px] font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        🔄 Repetir
      </button>
    </div>
  </div>

  <div class="text-center">
    <p class="text-xs text-white/80 font-medium">
      {#if phase === 'memorize'}
        👀 <span class="text-cyan-300 font-bold">Memoriza</span> la secuencia de bloques que se iluminan...
      {:else if phase === 'recall'}
        👉 <span class="text-emerald-300 font-bold">Toca los bloques</span> en el mismo orden exacto ({userSequence.length}/{item.blockSequence.length}).
      {:else}
        {isSuccess ? '🎉 ¡Secuencia Correcta!' : '❌ Secuencia Incorrecta'}
      {/if}
    </p>
  </div>

  <!-- Corsi Board Canvas -->
  <div class="relative w-full h-80 sm:h-96 bg-black/80 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.9)] p-4 perspective-container" class:has-perspective={is3D}>
    <div class="w-full h-full relative transition-transform duration-500 ease-out" class:board-3d={is3D}>
      {#each blockCoordinates as coord, idx}
        {@const isActive = activeBlock === idx}
        {@const isSelectedByUser = userSequence.includes(idx)}
        <button
          type="button"
          disabled={phase !== 'recall'}
          onclick={() => handleBlockClick(idx)}
          aria-label={`Bloque espacial Corsi ${idx + 1}`}
          style="left: {coord.x}; top: {coord.y};"
          class="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 transition-all duration-150 flex items-center justify-center font-bold text-sm select-none corso-block {isActive ? 'bg-cyan-400 border-white text-black shadow-[0_0_30px_rgba(34,211,238,1)] scale-110 z-20 active-glow' : phase === 'recall' ? 'bg-white/10 border-white/30 hover:border-cyan-400 hover:bg-cyan-500/20 text-white/80 active:scale-95 cursor-pointer z-10' : 'bg-white/5 border-white/15 text-white/30 cursor-not-allowed z-0'}"
        >
          <span class="text-[10px] text-white/40 font-mono absolute top-1 left-2">{idx + 1}</span>
          {#if phase === 'recall' && isSelectedByUser}
            <span class="text-xs text-cyan-300 font-mono font-bold">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .perspective-container.has-perspective {
    perspective: 1000px;
  }

  .board-3d {
    transform: rotateX(25deg) rotateY(-6deg) rotateZ(2deg) scale(0.92);
    transform-style: preserve-3d;
  }

  .corso-block {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.15);
  }

  .active-glow {
    transform: translateZ(20px) scale(1.15) !important;
  }
</style>
