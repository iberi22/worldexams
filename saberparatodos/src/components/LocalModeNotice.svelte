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
    class="fixed bottom-6 right-6 z-[200] max-w-[320px]"
    role="alert"
    transition:fly={{ y: 20, duration: 400 }}
  >
    <div
      class="relative overflow-hidden bg-black/40 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl p-4 group"
    >
      <!-- Content -->
      <div class="flex gap-3 relative z-10">
        <div class="shrink-0">
          <div class="w-10 h-10 rounded-lg bg-yellow-500/5 flex items-center justify-center text-xl border border-yellow-500/10 shadow-inner">
            💾
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <h4 class="text-yellow-400 font-bold text-[10px] uppercase tracking-wider">
              Modo Local
            </h4>
            <button
              onclick={dismiss}
              class="text-white/20 hover:text-white transition-colors -mt-1 -mr-1"
              aria-label="Cerrar"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-[10px] text-white/60 leading-tight mb-3">
             Your progress is currently stored in the browser during private testing. Cloud login and registration stay disabled until the production launch, while the local flow remains available under the <a href="/terminos" class="text-white/40 hover:text-white underline">terms</a>.
          </p>

          <button
            onclick={dismiss}
            class="w-full py-1.5 px-3 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-400 hover:text-black font-bold text-[9px] uppercase tracking-widest rounded-md border border-yellow-500/20 transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
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
