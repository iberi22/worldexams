<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let loading = true; // Controlled by parent (fetching status)

  const dispatch = createEventDispatcher();

  const messages = [
    "Es importante que tomes tu aprendizaje de manera honesta.",
    "Si haces trampa, al único que engañas es a ti mismo.",
    "El verdadero éxito se construye con esfuerzo y transparencia.",
    "Tu integridad define tu futuro profesional.",
    "Analizando tu historial para fortalecer tus debilidades...",
    "Preparando un desafío a tu medida...",
    "La excelencia es un hábito, no un acto aislado.",
    "Confía en lo que sabes y aprende de lo que no.",
    "Cada error honesto es un paso hacia la maestría.",
    "Tu conocimiento es tu verdadero poder.",
    "Construyendo un perfil de aprendizaje personalizado...",
    "La honestidad académica es la base de tu educación."
  ];

  let currentMessage = messages[0];
  let messageIdx = 0;

  // Cycle messages
  onMount(() => {
    const interval = setInterval(() => {
      messageIdx = (messageIdx + 1) % messages.length;
      currentMessage = messages[messageIdx];
    }, 2500);

    return () => clearInterval(interval);
  });

  // Watch loading prop and dispatch complete when done
  $: if (!loading) {
    dispatch('complete');
  }
</script>

<div class="fixed inset-0 z-[200] bg-[#121212]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center" transition:fade>
  <!-- Animation Container -->
  <div class="relative w-32 h-32 mb-12">
    <!-- Outer Ring -->
    <div class="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>

    <!-- Middle Ring -->
    <div class="absolute inset-2 border-2 border-emerald-500/40 rounded-full border-t-transparent animate-[spin_2s_linear_infinite_reverse]"></div>

    <!-- Inner Core -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center animate-pulse">
        <svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Scanning Line -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-1/2 w-full animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
  </div>

  <!-- Text Content -->
  <div class="max-w-md space-y-6">
    <h2 class="text-2xl font-bold uppercase tracking-[0.2em] text-[#F5F5DC]">
      Verificando Integridad
    </h2>

    <div class="h-16 flex items-center justify-center">
      {#key currentMessage}
        <p
          in:fly={{ y: 10, duration: 300 }}
          out:fade={{ duration: 200 }}
          class="text-emerald-500/80 font-mono text-sm leading-relaxed"
        >
          {currentMessage}
        </p>
      {/key}
    </div>

    <!-- Progress Bar -->
    <div class="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-8">
      <div class="h-full bg-emerald-500/50 animate-[progress_2s_ease-in-out_infinite] w-full origin-left"></div>
    </div>
  </div>
</div>

<style>
  @keyframes scan {
    0%, 100% { transform: translateY(-100%); opacity: 0; }
    50% { transform: translateY(100%); opacity: 1; }
  }

  @keyframes progress {
    0% { transform: scaleX(0); }
    50% { transform: scaleX(0.7); }
    100% { transform: scaleX(1); }
  }
</style>
