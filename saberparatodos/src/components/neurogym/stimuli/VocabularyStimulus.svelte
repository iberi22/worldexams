<script lang="ts">
  import type { VocabItem } from '../../../lib/neurogym/vocabulary-bank';

  interface Props {
    item: VocabItem;
    onSelectOption: (optionIndex: number, isCorrect: boolean) => void;
  }

  let { item, onSelectOption }: Props = $props();
</script>

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
        onclick={() => onSelectOption(idx, idx === item.correctIndex)}
        class="text-left p-4 bg-black/60 border-2 border-white/20 rounded-xl text-sm hover:border-amber-400/60 transition"
      >
        {String.fromCharCode(65 + idx)}. {opt}
      </button>
    {/each}
  </div>
</div>
