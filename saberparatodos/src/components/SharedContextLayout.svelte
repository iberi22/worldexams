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
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start w-full transition-all duration-500 ease-in-out">
    <!-- Desktop Split-Pane Layout (Left Panel: Context) -->
    <div
      class="hidden md:block bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-7 overflow-y-auto sticky top-6 border border-white/10 shadow-2xl transition-all duration-300 {maxHeightDesktop} scrollbar-thin scrollbar-thumb-white/10"
    >
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <span class="text-base">📖</span> {title}
        </h3>
        <span class="text-[10px] text-white/30 font-mono">Panel de Lectura</span>
      </div>
      <div class="prose prose-invert max-w-none text-gray-200 font-serif leading-relaxed text-base lg:text-lg selection:bg-emerald-500/30">
        <MathRenderer content={context.trim()} />
      </div>
    </div>

    <!-- Right Column (Question, Options, etc.) -->
    <div class="w-full">
      {@render children?.()}
    </div>
  </div>

  <!-- Mobile Floating Trigger -->
  <div class="md:hidden fixed bottom-24 right-6 z-40">
    <button
      onclick={() => showContext = true}
      class="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full font-bold shadow-lg shadow-emerald-900/40 border border-white/20 transition-all active:scale-95 text-white"
    >
      <span class="text-lg">📖</span> <span class="uppercase tracking-widest text-xs font-black">Ver Lectura</span>
    </button>
  </div>

  <!-- Mobile Context Full-Screen/Overlay Drawer -->
  {#if showContext}
    <div class="fixed inset-0 z-[60] bg-gray-950 md:hidden flex flex-col animate-fade-in">
      <div class="flex-none px-6 pt-6 pb-4 border-b border-white/10 bg-gray-950 z-20 shadow-sm">
        <div class="max-w-2xl mx-auto w-full flex justify-between items-center">
          <h3 class="text-xl font-black flex items-center gap-3 text-emerald-500 uppercase tracking-tighter">
            <span>📖</span> {title}
          </h3>
          <button
            onclick={() => showContext = false}
            class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl text-white hover:bg-white/10 border border-white/10 transition-all active:scale-90"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="max-w-2xl mx-auto w-full">
          <div class="prose prose-invert max-w-none text-gray-200 font-serif leading-relaxed text-lg">
            <MathRenderer content={context.trim()} />
          </div>
        </div>
      </div>

      <div class="flex-none p-6 bg-gray-950 border-t border-white/10 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div class="max-w-2xl mx-auto w-full">
          <button
            onclick={() => showContext = false}
            class="w-full flex py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg border border-white/20 transition-all shadow-2xl items-center justify-center gap-2"
          >
            Entendido, Volver
          </button>
        </div>
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
