<script lang="ts">
  import type { StroopItem } from '../../../lib/neurogym/secure-items-vault';

  interface Props {
    trial: StroopItem;
    onAnswer: (selectedKey: string) => void;
  }

  let { trial, onAnswer }: Props = $props();

  const colorOptions = [
    { label: 'Rojo', key: 'red', bg: 'bg-red-500/20 border-red-500 text-red-400' },
    { label: 'Azul', key: 'blue', bg: 'bg-blue-500/20 border-blue-500 text-blue-400' },
    { label: 'Verde', key: 'green', bg: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
    { label: 'Amarillo', key: 'yellow', bg: 'bg-yellow-500/20 border-yellow-500 text-yellow-400' }
  ];
</script>

<div class="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
  <div class="text-center">
    <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Control Inhibitorio (Test de Stroop)</span>
    <p class="text-xs text-white/50 mt-1">Selecciona el <strong>COLOR de la tinta</strong>, ignorando la palabra escrita.</p>
  </div>

  <!-- Word Display -->
  <div class="w-full py-12 px-6 bg-black/60 border border-white/15 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.7)]">
    <span class="text-5xl sm:text-6xl font-black tracking-widest select-none transition-transform active:scale-95" style="color: {trial.displayColor};">
      {trial.wordText}
    </span>
  </div>

  <!-- Response Buttons -->
  <div class="grid grid-cols-2 gap-4 w-full">
    {#each colorOptions as btn}
      <button
        type="button"
        onclick={() => onAnswer(btn.key)}
        class="py-4 px-4 rounded-xl border-2 font-bold uppercase tracking-wider text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer {btn.bg}"
        style="min-height: 56px;"
      >
        {btn.label}
      </button>
    {/each}
  </div>
</div>
