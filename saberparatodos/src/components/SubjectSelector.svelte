<script>
  import FlashlightCard from './FlashlightCard.svelte';

  export let questions = [];
  export let onSelect;
  export let onBack;

  // Extract unique subjects from questions
  // Questions have category like "MATEMÁTICAS :: ÁLGEBRA"
  // We want the main subject "MATEMÁTICAS"
  $: subjects = [...new Set(
    questions
      .filter(q => q && q.category) // Filter out questions without category
      .map(q => q.category.split(' :: ')[0])
  )].sort();
</script>

<div class="flex flex-col items-center justify-center min-h-[80vh] space-y-12 animate-fade-in-up">
  <div class="space-y-4 text-center">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Seleccionar <span class="text-emerald-500">Módulo</span>
    </h2>
    <p class="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60">
      Elige el área de conocimiento para iniciar la simulación.
    </p>
  </div>

  {#if subjects.length === 0}
    <div class="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-xl bg-white/5 max-w-lg mx-auto">
      <div class="text-4xl mb-4 opacity-50">⚠️</div>
      <h3 class="text-xl font-bold text-center mb-2">No hay preguntas disponibles</h3>
      <p class="text-center text-sm opacity-60 mb-6">
        Aún no hemos cargado preguntas para este grado. ¡Estamos trabajando en ello!
      </p>
      <div class="flex gap-4">
        <a
          href="https://github.com/iberi22/saberparatodos/issues/new"
          target="_blank"
          class="px-4 py-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-xs uppercase tracking-widest hover:bg-emerald-500/20 transition-colors rounded"
        >
          Contribuir Preguntas
        </a>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
      <!-- Option: All Subjects -->
      <FlashlightCard
        onclick={() => onSelect(null)}
        className="p-8 flex flex-col items-center justify-center group h-40 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div class="mb-2 text-emerald-500 opacity-80 group-hover:opacity-100 text-2xl">
          *
        </div>
        <h3 class="text-lg font-bold uppercase tracking-widest">Simulacro Completo</h3>
        <p class="text-xs opacity-40 mt-2">Todas las áreas</p>
      </FlashlightCard>

      {#each subjects as subject}
        <FlashlightCard
          onclick={() => onSelect(subject)}
          className="p-8 flex flex-col items-center justify-center group h-40 hover:border-white/40 transition-transform duration-300 hover:scale-105"
        >
          <div class="mb-2 text-[#F5F5DC] opacity-60 group-hover:opacity-100 text-2xl">
            {subject.substring(0, 2)}
          </div>
          <h3 class="text-lg font-bold uppercase tracking-widest text-center">{subject}</h3>
        </FlashlightCard>
      {/each}
    </div>
  {/if}

  <div class="flex gap-4">
    <button
      onclick={onBack}
      class="px-6 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
    >
      Volver
    </button>

    <button
      onclick={() => onSelect('CHANGE_GRADE')}
      class="px-6 py-2 border border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500/80 hover:text-emerald-500 transition-colors uppercase text-xs tracking-widest"
    >
      Cambiar Grado
    </button>
  </div>
</div>
