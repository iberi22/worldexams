<script>
  import { fade, fly } from 'svelte/transition';
  import FlashlightCard from './FlashlightCard.svelte';

  export let subject;
  export let onStart;
  export let onCancel;

  let questionCount = 10;
  let mode = 'SOLO'; // 'SOLO' or 'PARTY'

  const questionOptions = [5, 10, 15];

  function handleStart() {
    onStart({
      count: questionCount,
      mode: mode
    });
  }
</script>

<div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" transition:fade>
  <div
    class="bg-[#16213e] border border-white/10 rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
    in:fly={{ y: 20, duration: 300 }}
  >
    <!-- Background Noise/Gradient -->
    <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126]"></div>

    <h2 class="text-2xl font-bold uppercase tracking-widest text-[#F5F5DC] mb-6 text-center">
      Configurar Examen
    </h2>

    <div class="space-y-6 relative z-10">
      <!-- Subject Display -->
      <div class="text-center mb-6">
        <span class="text-xs uppercase tracking-widest opacity-60">Materia</span>
        <h3 class="text-xl font-bold text-emerald-500">{subject || 'Simulacro Completo'}</h3>
      </div>

      <!-- Question Count -->
      <div class="space-y-3">
        <label class="text-xs uppercase tracking-widest opacity-60 block">Cantidad de Preguntas</label>
        <div class="grid grid-cols-3 gap-3">
          {#each questionOptions as count}
            <button
              class="py-2 px-4 rounded border transition-all duration-200 font-bold {questionCount === count ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
              on:click={() => questionCount = count}
            >
              {count}
            </button>
          {/each}
        </div>
      </div>

      <!-- Mode Selection -->
      <div class="space-y-3">
        <label class="text-xs uppercase tracking-widest opacity-60 block">Modo de Juego</label>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="py-3 px-4 rounded border transition-all duration-200 flex flex-col items-center gap-2 {mode === 'SOLO' ? 'bg-[#003893]/40 border-[#003893] text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            on:click={() => mode = 'SOLO'}
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-xs font-bold uppercase">Individual</span>
          </button>

          <button
            class="py-3 px-4 rounded border transition-all duration-200 flex flex-col items-center gap-2 {mode === 'PARTY' ? 'bg-[#CE1126]/40 border-[#CE1126] text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            on:click={() => mode = 'PARTY'}
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs font-bold uppercase">Party Mode</span>
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        <button
          class="flex-1 py-3 border border-white/20 rounded hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
          on:click={onCancel}
        >
          Cancelar
        </button>
        <button
          class="flex-1 py-3 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] text-white font-bold uppercase tracking-widest text-xs rounded hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
          on:click={handleStart}
        >
          Comenzar
        </button>
      </div>
    </div>
  </div>
</div>
