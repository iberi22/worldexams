<script>
  import { fade, fly } from 'svelte/transition';
  import FlashlightCard from './FlashlightCard.svelte';

  export let subject;
  export let currentGrade = 11;
  export let onStart;
  export let onCancel;

  let questionCount = 10;
  let mode = 'SOLO'; // 'SOLO' or 'PARTY'
  let useDiagnostic = true; // Diagnostic mode toggle

  const questionOptions = [5, 10, 15];

  // Calculate diagnostic grades (lower than current)
  // Reactive so it updates if currentGrade changes
  $: diagnosticGrades = [3, 5, 7, 9].filter(g => g < currentGrade);

  function handleStart() {
    onStart({
      count: questionCount,
      mode: mode,
      useDiagnostic: useDiagnostic
    });
  }
</script>

<div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" transition:fade>
  <div
    class="bg-[#121212] border border-white/10 rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
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
            class="py-3 px-4 rounded border transition-all duration-200 flex flex-col items-center gap-2 bg-white/5 border-white/10 text-white/40 cursor-not-allowed relative overflow-hidden group"
            disabled
          >
            <svg class="w-6 h-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs font-bold uppercase opacity-60">Party Mode</span>

            <!-- Coming Soon Overlay -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/40 font-mono text-[10px] text-[#FCD116] uppercase tracking-widest rotate-12 backdrop-blur-[0.5px]">
                Coming Soon
            </div>
          </button>
        </div>
      </div>

      <!-- Diagnostic Toggle (Only for SOLO) -->
      <!-- Diagnostic Panel (Only for SOLO) -->
       {#if mode === 'SOLO'}
       <div class="mt-4 p-4 bg-[#121212]/50 border border-emerald-500/30 rounded-lg relative overflow-hidden group" transition:fade>
         <div class="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
           <svg class="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
           </svg>
         </div>

         <div class="relative z-10">
           <div class="flex items-center gap-3 mb-2">
             <!-- Toggle Switch -->
             <button
               class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {useDiagnostic ? 'bg-emerald-500' : 'bg-white/20'}"
               role="switch"
               aria-checked={useDiagnostic}
               on:click={() => useDiagnostic = !useDiagnostic}
             >
               <span
                 aria-hidden="true"
                 class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {useDiagnostic ? 'translate-x-5' : 'translate-x-0'}"
               ></span>
             </button>

             <div>
               <h4 class="text-sm font-bold text-emerald-500 uppercase tracking-widest leading-none">
                 Panel de Diagnóstico
                 <span class="ml-2 text-[10px] {useDiagnostic ? 'text-emerald-400' : 'text-white/30'}">
                   {useDiagnostic ? 'ACTIVADO' : 'DESACTIVADO'}
                 </span>
               </h4>
             </div>
           </div>

           <p class="text-xs opacity-70 leading-relaxed max-w-[90%]">
             Detecta vacíos fundamentales incluyendo preguntas de grados anteriores ({diagnosticGrades.length > 0 ? diagnosticGrades.map(g => g + '°').join(', ') : 'inferiores'}) en tu simulacro.
           </p>

           {#if useDiagnostic && diagnosticGrades.length > 0}
             <div class="mt-3 flex gap-2 flex-wrap" transition:fade>
                {#each diagnosticGrades as g}
                  <span class="px-2 py-1.5 rounded-md bg-[#001e10] text-emerald-500 border border-emerald-500/20 text-[10px] font-bold font-mono shadow-sm">G{g}</span>
                {/each}
             </div>
           {/if}
         </div>
       </div>
       {/if}

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
