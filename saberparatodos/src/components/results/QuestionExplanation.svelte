<script lang="ts">
  import MathRenderer from '../MathRenderer.svelte';

  let { explanation, isCorrect }: { explanation: string; isCorrect: boolean } = $props();

  let hasContent = $derived(typeof explanation === 'string' && explanation.trim().length > 0);
</script>

{#if hasContent}
  <div class="pt-4 border-t border-white/5 space-y-3" data-testid="results-explanation">
    <details open={!isCorrect} class="group">
      <summary class="cursor-pointer flex items-center justify-between gap-3 text-[10px] sm:text-xs uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity list-none [&::-webkit-details-marker]:hidden">
        <span>Explicación pedagógica</span>
        <span class="text-emerald-400 group-open:rotate-180 transition-transform duration-200">▼</span>
      </summary>
      <div class="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm leading-relaxed text-white/80 whitespace-pre-line">
        <MathRenderer content={explanation} />
      </div>
    </details>
  </div>
{/if}
