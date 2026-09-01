<script lang="ts">
  let { isOpen = false, onClose = () => {} } = $props<{
    isOpen?: boolean;
    onClose?: () => void;
  }>();
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
    <div class="bg-[#121212] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
      <div class="flex justify-between items-center border-b border-white/10 pb-3">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>🏛️</span> Acuerdo P2P Institucional
        </h3>
        <button
          type="button"
          onclick={onClose}
          class="text-white/50 hover:text-white text-lg font-bold p-1"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
      <p class="text-xs text-white/70 leading-relaxed">
        Intercambio P2P local habilitado sin servidores intermedios. Los datos psicométricos se mantienen 100% en el dispositivo del estudiante.
      </p>
      <div class="flex justify-end pt-2">
        <button
          type="button"
          onclick={onClose}
          class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
{/if}
