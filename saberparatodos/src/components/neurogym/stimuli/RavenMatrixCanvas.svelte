<script lang="ts">
  import type { RavenMatrixItem } from '../../../lib/neurogym/secure-items-vault';

  interface Props {
    item: RavenMatrixItem;
    onSelectOption: (optionId: string, isCorrect: boolean) => void;
  }

  let { item, onSelectOption }: Props = $props();
</script>

<div class="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold">Matrices Lógicas Abstractas (Proxy IQ)</span>
    <p class="text-xs text-white/50 mt-1">Identifica el patrón geométrico y selecciona la figura que completa la cuadrícula.</p>
  </div>

  <!-- 3x3 Problem Grid -->
  <div class="p-3 bg-black/60 border border-white/20 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.8)]">
    <div class="grid grid-cols-3 gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
      {#each item.cells as row, rIndex}
        {#each row as cell, cIndex}
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-black/80 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
            {#if cell === '?'}
              <div class="w-full h-full bg-emerald-500/10 border-2 border-dashed border-emerald-400/60 flex items-center justify-center animate-pulse">
                <span class="text-2xl font-black text-emerald-400">?</span>
              </div>
            {:else}
              <svg viewBox="0 0 100 100" class="w-full h-full p-2">
                <defs>
                  <circle id="shape-circle" cx="50" cy="50" r="28" fill="none" stroke="#34d399" stroke-width="4"/>
                  <rect id="shape-rect" x="25" y="25" width="50" height="50" fill="none" stroke="#60a5fa" stroke-width="4" rx="4"/>
                  <polygon id="shape-triangle" points="50,20 80,75 20,75" fill="none" stroke="#f59e0b" stroke-width="4"/>
                  <polygon id="shape-diamond" points="50,15 85,50 50,85 15,50" fill="none" stroke="#ec4899" stroke-width="4"/>
                  <path id="shape-cross" d="M40,20 H60 V40 H80 V60 H60 V80 H40 V60 H20 V40 H40 Z" fill="none" stroke="#a855f7" stroke-width="3"/>
                </defs>
                {@html cell}
              </svg>
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <!-- Options Grid -->
  <div class="w-full space-y-2">
    <span class="text-[10px] uppercase tracking-widest text-white/40 block text-center">Opciones de Respuesta</span>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {#each item.options as opt}
        <button
          type="button"
          onclick={() => onSelectOption(opt.id, opt.isCorrect)}
          class="p-2 bg-white/5 border border-white/20 hover:border-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all flex items-center justify-center cursor-pointer group hover:scale-105"
        >
          <svg viewBox="0 0 100 100" class="w-16 h-16 sm:w-20 sm:h-20">
            <defs>
              <circle id="shape-circle" cx="50" cy="50" r="28" fill="none" stroke="#34d399" stroke-width="4"/>
              <rect id="shape-rect" x="25" y="25" width="50" height="50" fill="none" stroke="#60a5fa" stroke-width="4" rx="4"/>
              <polygon id="shape-triangle" points="50,20 80,75 20,75" fill="none" stroke="#f59e0b" stroke-width="4"/>
              <polygon id="shape-diamond" points="50,15 85,50 50,85 15,50" fill="none" stroke="#ec4899" stroke-width="4"/>
              <path id="shape-cross" d="M40,20 H60 V40 H80 V60 H60 V80 H40 V60 H20 V40 H40 Z" fill="none" stroke="#a855f7" stroke-width="3"/>
            </defs>
            {@html opt.svgContent}
          </svg>
        </button>
      {/each}
    </div>
  </div>
</div>
