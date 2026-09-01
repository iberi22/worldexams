<script lang="ts">
  import { generateCorsiSequence, type CorsiSequenceItem } from '../../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    spanLength?: number;
    seed?: number;
    onComplete: (success: boolean, maxSpan: number) => void;
  }

  let { spanLength = 4, seed = 1, onComplete }: Props = $props();

  let item = $state<CorsiSequenceItem>(generateCorsiSequence(spanLength, seed));
  let phase = $state<'memorize' | 'recall' | 'feedback'>('memorize');
  let activeBlock = $state<number | null>(null);
  let userSequence = $state<number[]>([]);
  let isSuccess = $state<boolean | null>(null);

  // 9 bloques espaciales distribuidos irregularmente para test Corsi clásico
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
    await new Promise(r => setTimeout(r, 600));

    for (let i = 0; i < item.blockSequence.length; i++) {
      const blockIdx = item.blockSequence[i];
      activeBlock = blockIdx;
      neuroAudio.playNBackLetterTone(blockIdx);
      await new Promise(r => setTimeout(r, 650));
      activeBlock = null;
      await new Promise(r => setTimeout(r, 250));
    }

    phase = 'recall';
  }

  function handleBlockClick(idx: number) {
    if (phase !== 'recall') return;

    userSequence.push(idx);
    neuroAudio.playTone(350 + idx * 40, 0.12);

    const currentStep = userSequence.length - 1;
    if (userSequence[currentStep] !== item.blockSequence[currentStep]) {
      // Error inmediato
      isSuccess = false;
      phase = 'feedback';
      neuroAudio.playError();
      setTimeout(() => {
        onComplete(false, item.spanLength);
      }, 1000);
      return;
    }

    // Si completó toda la secuencia
    if (userSequence.length === item.blockSequence.length) {
      isSuccess = true;
      phase = 'feedback';
      neuroAudio.playSuccess();
      setTimeout(() => {
        onComplete(true, item.spanLength);
      }, 1000);
    }
  }

  $effect(() => {
    playSequence();
  });
</script>

<div class="flex flex-col items-center gap-4 w-full max-w-xl mx-auto select-none">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Corsi Block-Tapping (Memoria Viso-Espacial)</span>
    <p class="text-xs text-white/60 mt-1">
      {#if phase === 'memorize'}
        👀 <strong>Memoriza</strong> la secuencia de bloques que se iluminan...
      {:else if phase === 'recall'}
        👉 <strong>Toca los bloques</strong> en el mismo orden exacto ({userSequence.length}/{item.blockSequence.length}).
      {:else}
        {isSuccess ? '🎉 ¡Secuencia Correcta!' : '❌ Secuencia Incorrecta'}
      {/if}
    </p>
  </div>

  <!-- Corsi Board Canvas -->
  <div class="relative w-full h-80 sm:h-96 bg-black/70 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
    {#each blockCoordinates as coord, idx}
      {@const isActive = activeBlock === idx}
      {@const isSelectedByUser = userSequence.includes(idx)}
      <button
        type="button"
        disabled={phase !== 'recall'}
        onclick={() => handleBlockClick(idx)}
        style="left: {coord.x}; top: {coord.y};"
        class="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 transition-all duration-150 flex items-center justify-center font-bold text-sm cursor-pointer {isActive ? 'bg-cyan-400 border-white text-black shadow-[0_0_25px_rgba(34,211,238,0.9)] scale-110' : phase === 'recall' ? 'bg-white/10 border-white/30 hover:border-cyan-400 hover:bg-cyan-500/20 text-white/80 active:scale-95' : 'bg-white/5 border-white/15 text-white/30 cursor-not-allowed'}"
      >
        {#if phase === 'recall' && isSelectedByUser}
          <span class="text-xs text-cyan-300 font-mono font-bold">✓</span>
        {/if}
      </button>
    {/each}
  </div>
</div>
