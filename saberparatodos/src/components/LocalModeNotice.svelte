<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let visible = $state(false);

  onMount(() => {
    // Check if user has acknowledged the notice
    const acknowledged = localStorage.getItem('saberparatodos_local_mode_ack');
    if (!acknowledged) {
      // Show delay to be visible quickly on first load
      setTimeout(() => {
        visible = true;
      }, 1500);
    }
  });

  function dismiss() {
    localStorage.setItem('saberparatodos_local_mode_ack', 'true');
    visible = false;
  }
</script>

{#if visible}
  <div
    class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[200]"
    role="alert"
    transition:fly={{ y: 50, duration: 500 }}
  >
    <div
      class="relative overflow-hidden bg-[#121212]/80 backdrop-blur-xl border border-yellow-500/40 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.1)] group"
    >
      <!-- Neon Border Glow -->
      <div class="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <!-- Content -->
      <div class="p-5 flex gap-4 relative z-10">
        <div class="shrink-0 pt-1">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-2xl border border-yellow-500/20 shadow-inner">
            💾
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-yellow-400 font-black text-xs uppercase tracking-[0.2em]">
              Modo Local Activo
            </h4>
            <button
              onclick={dismiss}
              class="text-white/30 hover:text-white transition-colors p-1 -mr-2"
              aria-label="Cerrar"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-[11px] text-white/80 leading-relaxed mb-4 font-medium">
            Tus resultados y progreso se sincronizan <span class="text-yellow-400 font-bold">únicamente en este navegador</span>.
            <span class="block mt-2 py-1.5 px-2 bg-red-500/10 border-l-2 border-red-500 text-red-400">
              ⚠️ Si borras los datos del sitio, perderás tu historial.
            </span>
          </p>

          <button
            onclick={dismiss}
            class="group relative w-full py-2.5 px-4 bg-yellow-500 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-lg transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.3)]"
          >
            <span class="relative z-10">Entendido</span>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
          </button>
        </div>
      </div>

      <!-- Animated corner accent -->
      <div class="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
        <div class="absolute top-[-32px] right-[-32px] w-16 h-16 bg-yellow-500/10 rotate-45"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Subtle glass shimmer effect */
  div::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    animation: shimmer 10s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    20% { left: 200%; }
    100% { left: 200%; }
  }
</style>
