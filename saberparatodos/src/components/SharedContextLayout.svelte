<script lang="ts">
  import MathRenderer from './MathRenderer.svelte';

  // Props (Svelte 5 Runes)
  interface Props {
    context?: string;
    children?: any;
    title?: string;
    maxHeightDesktop?: string; // e.g. "70vh" or "30vh"
  }

  let {
    context = '',
    children,
    title = 'Contexto de Lectura',
    maxHeightDesktop = 'max-h-[70vh]'
  }: Props = $props();

  let showContext = $state(false);
</script>

{#if context && context.trim().length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full transition-all duration-300">
    <!-- Desktop Split-Pane Layout -->
    <div
      class="hidden md:block bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 overflow-y-auto sticky top-6 border border-white/10 shadow-2xl transition-all duration-300 {maxHeightDesktop}"
    >
      <h3 class="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span class="text-lg">📖</span> {title}
      </h3>
      <div class="prose prose-invert max-w-none text-gray-300 font-serif leading-relaxed text-sm sm:text-base">
        <MathRenderer content={context.trim()} />
      </div>
    </div>

    <!-- Right Column (Question, Options, etc.) -->
    <div class="w-full">
      {@render children?.()}
    </div>
  </div>

  <!-- Mobile Floating Trigger -->
  <div class="md:hidden fixed bottom-6 right-6 z-40">
    <button
      onclick={() => showContext = true}
      class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold shadow-lg shadow-blue-900/40 border border-white/20 transition-all active:scale-95 text-white"
    >
      <span>📖</span> Ver Lectura
    </button>
  </div>

  <!-- Mobile Context Full-Screen/Overlay Drawer -->
  {#if showContext}
    <div class="fixed inset-0 z-50 bg-gray-950 overflow-y-auto p-6 md:hidden flex flex-col justify-between animate-fade-in">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold flex items-center gap-2 text-white">
            <span>📖</span> {title}
          </h3>
          <button
            onclick={() => showContext = false}
            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-2xl text-white hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <div class="prose prose-invert max-w-none pb-28 text-gray-300 font-serif leading-relaxed text-base">
          <MathRenderer content={context.trim()} />
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <button
          onclick={() => showContext = false}
          class="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-lg border border-white/10 transition-colors shadow-lg"
        >
          Cerrar Lectura
        </button>
      </div>
    </div>
  {/if}
{:else}
  <!-- Standard fallback without context -->
  <div class="w-full">
    {@render children?.()}
  </div>
{/if}

<style>
  /* Optional animations for mobile view */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.25s ease-out forwards;
  }
</style>
