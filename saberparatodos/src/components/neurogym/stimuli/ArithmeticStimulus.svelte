<script lang="ts">
  import type { ArithmeticItem } from '../../../lib/neurogym/arithmetic-bank';

  interface Props {
    item: ArithmeticItem;
    timeLimitMs?: number;
    onAnswer: (selectedIndex: number, timeMs: number) => void;
  }

  let { item, timeLimitMs = 30000, onAnswer }: Props = $props();

  let startedAt = $state(Date.now());
  const effectiveLimit = $derived(item.timePressureMs ?? timeLimitMs);
  const elapsed = $state({ ms: 0 });
  const answered = $state({ index: -1 });

  $effect(() => {
    void item;
    startedAt = Date.now();
    elapsed.ms = 0;
    answered.index = -1;
  });

  let timer: ReturnType<typeof setInterval>;
  $effect(() => {
    timer = setInterval(() => {
      elapsed.ms = Date.now() - startedAt;
    }, 100);
    return () => clearInterval(timer);
  });

  const remainingMs = $derived(Math.max(0, effectiveLimit - elapsed.ms));
  const progress = $derived(Math.min(1, elapsed.ms / effectiveLimit));

  function select(idx: number) {
    if (answered.index !== -1) return;
    answered.index = idx;
    onAnswer(idx, Date.now() - startedAt);
  }
</script>

<div class="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-fuchsia-400 font-bold">
      Razonamiento Cuantitativo (Gq)
    </span>
  </div>

  <div class="w-full h-1.5 rounded-full bg-white/10 overflow-hidden" role="timer" aria-label="Tiempo restante">
    <div
      class="h-full bg-fuchsia-400 transition-[width] duration-100"
      style="width: {(1 - progress) * 100}%"
    ></div>
  </div>
  <div class="text-xs text-white/40 font-mono">{Math.ceil(remainingMs / 1000)} s</div>

  <div class="text-xl md:text-2xl font-bold text-white text-center leading-snug">{item.problem}</div>
  {#if item.expression}
    <div class="text-sm text-white/40 font-mono">{item.expression}</div>
  {/if}

  <div class="grid grid-cols-2 gap-3 w-full">
    {#each item.options as opt, idx}
      <button
        type="button"
        disabled={answered.index !== -1}
        onclick={() => select(idx)}
        class="text-center p-4 bg-black/60 border-2 {answered.index === idx
          ? 'border-fuchsia-400'
          : 'border-white/20'} rounded-xl text-xl font-bold text-white hover:border-fuchsia-400/60 transition disabled:opacity-60"
      >
        {opt}
      </button>
    {/each}
  </div>
</div>
