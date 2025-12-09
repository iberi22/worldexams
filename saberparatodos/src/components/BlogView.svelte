<script lang="ts">
  import FlashlightCard from './FlashlightCard.svelte';
  import type { Question } from '../types';

  export let questions: Question[] = [];
  export let onSelect: (question: Question) => void;
  export let onBack: () => void;

  let searchTerm = "";
  let selectedGrade: number | null = null;
  let selectedDifficulty: number | null = null;

  $: filteredQuestions = questions.filter(q => {
    const matchesSearch =
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = selectedGrade ? q.grade === selectedGrade : true;
    const matchesDifficulty = selectedDifficulty ? q.difficulty === selectedDifficulty : true;

    return matchesSearch && matchesGrade && matchesDifficulty;
  });

  const grades = [3, 5, 7, 9, 11];
  const difficulties = [1, 2, 3, 4, 5];
</script>

<div class="w-full max-w-6xl mx-auto p-4 animate-fade-in-up pb-20">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Blog / <span class="text-emerald-500">Artículos</span>
    </h2>
    <button
      onclick={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
    >
      [ Volver ]
    </button>
  </div>

  <!-- Search -->
  <div class="mb-8 space-y-4">
    <input
      type="text"
      bind:value={searchTerm}
      placeholder="Buscar por ID, contenido o tema..."
      class="w-full bg-[#121212] border border-white/10 p-4 text-lg focus:border-emerald-500/50 focus:outline-none transition-colors placeholder:text-white/20"
    />

    <div class="flex flex-wrap gap-4">
      <!-- Grade Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs uppercase tracking-widest text-white/40">Grado:</span>
        <div class="flex gap-1">
          <button
            class="px-3 py-1 text-xs border {selectedGrade === null ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-white/40 hover:border-white/30'} transition-colors"
            onclick={() => selectedGrade = null}
          >
            TODOS
          </button>
          {#each grades as grade}
            <button
              class="px-3 py-1 text-xs border {selectedGrade === grade ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-white/40 hover:border-white/30'} transition-colors"
              onclick={() => selectedGrade = grade}
            >
              {grade}°
            </button>
          {/each}
        </div>
      </div>

      <!-- Difficulty Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs uppercase tracking-widest text-white/40">Complejidad:</span>
        <div class="flex gap-1">
          <button
            class="px-3 py-1 text-xs border {selectedDifficulty === null ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-white/40 hover:border-white/30'} transition-colors"
            onclick={() => selectedDifficulty = null}
          >
            TODAS
          </button>
          {#each difficulties as diff}
            <button
              class="px-3 py-1 text-xs border {selectedDifficulty === diff ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-white/40 hover:border-white/30'} transition-colors"
              onclick={() => selectedDifficulty = diff}
            >
              {diff}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredQuestions as question (question.id)}
      <FlashlightCard
        onclick={() => onSelect(question)}
        className="p-6 flex flex-col justify-between group h-64 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-[1.02]"
      >
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-start mb-2">
            <div class="text-xs font-bold uppercase tracking-widest text-emerald-500">
              {question.category}
            </div>
            <div class="text-[10px] font-mono text-white/30">
              {question.id}
            </div>
          </div>

          <h3 class="text-lg font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
            {question.text}
          </h3>

          <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div class="flex gap-3 text-[10px] uppercase tracking-widest text-white/50">
              <span>Grado {question.grade}°</span>
              <span>Nivel {question.difficulty}</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
              <span class="text-xs uppercase tracking-widest">Leer</span>
              <span class="text-xl">-></span>
            </div>
          </div>
        </div>
      </FlashlightCard>
    {/each}
  </div>
</div>
