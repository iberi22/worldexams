<script lang="ts">
  import {
    psychoacoustics,
    BRAINWAVE_PRESETS,
    type BrainwaveTarget
  } from '../../lib/neurogym/psychoacoustic-engine';

  let activeTarget = $state<BrainwaveTarget | null>(null);
  let isPlaying = $state(false);

  const targets: BrainwaveTarget[] = ['alpha_focus', 'beta_speed', 'gamma_memory', 'theta_creativity'];

  function toggleAudio(target: BrainwaveTarget) {
    if (activeTarget === target && isPlaying) {
      psychoacoustics.stop();
      isPlaying = false;
      activeTarget = null;
    } else {
      psychoacoustics.startBinaural(target);
      activeTarget = target;
      isPlaying = true;
    }
  }
</script>

<div class="p-6 bg-black/70 border border-white/15 rounded-3xl space-y-5 shadow-2xl">
  <div class="border-b border-white/10 pb-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🎧</span>
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wider text-white">Estación Psicoacústica (Ondas Binaurales)</h3>
        <p class="text-[10px] text-white/50">Estimulación por arrastre de frecuencias (Web Audio API en tiempo real)</p>
      </div>
    </div>
    {#if isPlaying}
      <span class="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded animate-pulse">
        ● EN REPRODUCCIÓN
      </span>
    {/if}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {#each targets as t}
      {@const preset = BRAINWAVE_PRESETS[t]}
      {@const isActive = activeTarget === t && isPlaying}
      <button
        type="button"
        onclick={() => toggleAudio(t)}
        class="p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 {isActive ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/10'}"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white">{preset.name}</span>
          <span class="text-base">{isActive ? '⏹️' : '▶️'}</span>
        </div>
        <p class="text-[10px] text-white/60 leading-relaxed">{preset.description}</p>
        <span class="text-[9px] font-mono text-emerald-400/80">Portadora: {preset.carrierHz}Hz | Pulso: {preset.beatHz}Hz</span>
      </button>
    {/each}
  </div>

  <p class="text-[10px] text-white/40 text-center font-mono">
    💡 <em>Para obtener el efecto binaural completo, se recomienda el uso de auriculares estéreo.</em>
  </p>
</div>
