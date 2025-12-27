<script lang="ts">
  import FlashlightCard from './FlashlightCard.svelte';

  interface Props {
    onSelect: (grade: number) => void;
    onBack: () => void;
  }

  let { onSelect, onBack }: Props = $props();

  // All available grades with bundles (3-11)
  const grades = [3, 5, 6, 7, 8, 9, 10, 11];
</script>

<div class="flex flex-col items-center justify-center min-h-[80vh] space-y-12 animate-fade-in-up">
  <div class="space-y-4 text-center">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Seleccionar <span class="text-emerald-500">Grado</span>
    </h2>
    <p class="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60">
      Elige el nivel académico para tu evaluación.
    </p>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-6xl px-4">
    {#each grades as grade}
      <FlashlightCard
        onClick={() => onSelect(grade)}
        className="p-8 flex flex-col items-center justify-center group h-48 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div class="mb-4 text-emerald-500 opacity-80 group-hover:opacity-100 text-4xl font-bold">
          {grade}°
        </div>
        <h3 class="text-sm font-bold uppercase tracking-widest text-center opacity-60 group-hover:opacity-100">
          Grado
        </h3>
      </FlashlightCard>
    {/each}
  </div>

  <button
    onclick={onBack}
    class="px-6 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
  >
    Volver
  </button>
</div>
