<script lang="ts">
  import type { VocabItem } from '../../../lib/neurogym/vocabulary-bank';

  interface Props {
    item: VocabItem;
    onSelectOption: (optionIndex: number, isCorrect: boolean) => void;
  }

  let { item, onSelectOption }: Props = $props();

  let answered = $state(false);

  $effect(() => {
    void item;
    answered = false;
  });

  function select(idx: number) {
    if (answered) return;
    answered = true;
    onSelectOption(idx, idx === item.correctIndex);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.repeat) return;
    const idx = ['1', '2', '3', '4'].indexOf(event.key);
    if (idx !== -1) {
      event.preventDefault();
      select(idx);
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">
      Vocabulario (Comprensión Verbal — Gc)
    </span>
    <p class="text-xs text-white/50 mt-1">
      Selecciona la definición que mejor describe la palabra.
    </p>
  </div>

  <div class="text-5xl font-black text-white">{item.word}</div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
    {#each item.options as opt, idx}
      <button
        type="button"
        onclick={() => select(idx)}
        disabled={answered}
        aria-keyshortcuts={String(idx + 1)}
        class="text-left disabled:opacity-60 p-4 bg-black/60 border-2 border-white/20 rounded-xl text-sm hover:border-amber-400/60 transition"
      >
        <span class="text-[10px] text-white/40 font-mono mr-1">{idx + 1}</span>{String.fromCharCode(65 + idx)}. {opt}
      </button>
    {/each}
  </div>
</div>
