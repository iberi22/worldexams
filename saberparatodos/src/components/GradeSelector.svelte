<script lang="ts">
  import FlashlightCard from './FlashlightCard.svelte';
  import { countryConfig } from '../config';

  interface Props {
    onSelect: (grade: number) => void;
    onBack: () => void;
  }

  let { onSelect, onBack }: Props = $props();

  const configuredGrades = [...new Set(countryConfig.grades.map((grade) => grade.id))].sort((a, b) => a - b);
  const defaultGrades = configuredGrades
    .slice()
    .sort((a, b) => {
      if (a === 11) return -1;
      if (b === 11) return 1;
      return a - b;
    })
    .slice(0, 4);
  const extraGrades = configuredGrades.filter((grade) => !defaultGrades.includes(grade));

  let showAllGrades = $state(false);

  let displayedGrades = $derived(showAllGrades ? [...defaultGrades, ...extraGrades] : defaultGrades);

  function getGradeLabel(grade: number) {
    return countryConfig.gradeNames[grade] || `${grade}°`;
  }

  const gradeLabels = $derived(
    displayedGrades.map((grade) => {
      const label = getGradeLabel(grade);
      const [topLine, ...rest] = label.split(' ');

      return {
        grade,
        topLine,
        bottomLine: rest.join(' ') || countryConfig.examName,
      };
    })
  );
</script>

<div class="flex flex-col items-center justify-center min-h-[80vh] space-y-12 animate-fade-in-up">
  <div class="space-y-4 text-center">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Examenes <span class="text-emerald-500">{countryConfig.product.guideLabel.toLowerCase()}</span>
    </h2>
    <p class="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60">
      Elige el nivel academico para tu evaluacion.
    </p>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl px-4 justify-center">
    {#each gradeLabels as { grade, topLine, bottomLine }}
      <FlashlightCard
        onClick={() => onSelect(grade)}
        className={`p-8 flex flex-col items-center justify-center group transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 ${grade === 11 ? 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 h-64 border-emerald-500/40 bg-emerald-500/5' : 'h-48'}`}
      >
        <div class={`mb-4 text-emerald-500 group-hover:opacity-100 font-bold transition-all duration-300 ${grade === 11 ? 'text-6xl opacity-100 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-3xl opacity-80'}`}>
          {topLine}
        </div>
        <h3 class={`font-bold uppercase tracking-widest text-center group-hover:opacity-100 transition-all duration-300 ${grade === 11 ? 'text-sm opacity-100' : 'text-xs opacity-60'}`}>
          {bottomLine}
        </h3>

        {#if grade === 11}
          <div class="mt-4 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Ruta destacada</span>
          </div>
        {/if}
      </FlashlightCard>
    {/each}
  </div>

  {#if extraGrades.length > 0 && !showAllGrades}
    <button
      onclick={() => (showAllGrades = true)}
      class="px-6 py-2 mt-4 text-emerald-400 hover:text-emerald-300 transition-colors uppercase text-sm tracking-widest font-semibold"
    >
      Ver mas examenes
    </button>
  {/if}

  <button
    onclick={onBack}
    class="px-6 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
  >
    Volver
  </button>
</div>
