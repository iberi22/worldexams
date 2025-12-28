<script lang="ts">
  import { onMount } from 'svelte';
  // Removed unused transition to clean up

  let visible = false;

  onMount(() => {
    // Check if user has acknowledged the notice
    const acknowledged = localStorage.getItem('saberparatodos_local_mode_ack');
    if (!acknowledged) {
      // Show shorter delay to be visible quickly on first load
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
    class="fixed bottom-4 right-4 z-[100] max-w-sm w-full animate-bounce-in"
    role="alert"
  >
    <div class="bg-[#1E1E1E] border border-yellow-500/30 rounded-xl shadow-2xl overflow-hidden">
      <div class="p-4 flex gap-4">
        <div class="shrink-0">
          <div class="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl">
            💾
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-1">
            Modo Local Activo
          </h4>
          <p class="text-xs text-white/70 leading-relaxed mb-3">
            Tus resultados y progreso se guardan <strong>localmente</strong> en este dispositivo.
            <br><br>
            <span class="text-red-400">⚠️ Si borras la caché del navegador, perderás todo tu historial.</span>
          </p>
          <button
            on:click={dismiss}
            class="px-4 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-widest rounded transition-colors w-full sm:w-auto"
          >
            Entendido
          </button>
        </div>
        <button
          on:click={dismiss}
          class="shrink-0 text-white/20 hover:text-white transition-colors self-start"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-bounce-in {
    animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
