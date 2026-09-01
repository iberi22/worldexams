<script lang="ts">
  interface Props {
    onCompleteTrial: (reactionTimeMs: number, success: boolean) => void;
  }

  let { onCompleteTrial }: Props = $props();

  let state = $state<'waiting' | 'ready' | 'clicked'>('waiting');
  let startTime = $state(0);
  let timeoutId: any = null;

  function startCycle() {
    state = 'waiting';
    const delay = 1200 + Math.random() * 2500; // 1.2s - 3.7s jitter
    timeoutId = setTimeout(() => {
      state = 'ready';
      startTime = performance.now();
    }, delay);
  }

  function handleTap() {
    if (state === 'waiting') {
      clearTimeout(timeoutId);
      state = 'clicked';
      onCompleteTrial(0, false); // False start
    } else if (state === 'ready') {
      const elapsed = Math.round(performance.now() - startTime);
      state = 'clicked';
      onCompleteTrial(elapsed, true);
    }
  }

  $effect(() => {
    startCycle();
    return () => clearTimeout(timeoutId);
  });
</script>

<div class="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-yellow-400 font-bold">Tiempo de Reacción & Motricidad</span>
    <p class="text-xs text-white/50 mt-1">Toca el panel inmediatamente cuando cambie a <strong>VERDE</strong>.</p>
  </div>

  <button
    type="button"
    onclick={handleTap}
    class="w-full h-64 rounded-3xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer select-none active:scale-95 shadow-2xl {state === 'waiting' ? 'bg-red-500/20 border-red-500 text-red-300' : state === 'ready' ? 'bg-emerald-500 border-emerald-300 text-black shadow-[0_0_40px_rgba(16,185,129,0.8)]' : 'bg-white/10 border-white/20 text-white/50'}"
  >
    {#if state === 'waiting'}
      <span class="text-3xl font-black uppercase tracking-widest animate-pulse">Espera...</span>
      <span class="text-xs opacity-70 mt-2">No toques todavía</span>
    {:else if state === 'ready'}
      <span class="text-4xl font-black uppercase tracking-widest">¡AHORA!</span>
      <span class="text-xs font-bold mt-1">¡TOCA EL PANEL!</span>
    {:else}
      <span class="text-2xl font-bold uppercase tracking-widest">Registrado</span>
    {/if}
  </button>
</div>
