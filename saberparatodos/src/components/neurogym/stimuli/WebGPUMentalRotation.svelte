<script lang="ts">
  import { onMount } from 'svelte';
  import { WebGPUSpatialEngine, type WebGPUCapabilities } from '../../../lib/neurogym/webgpu-spatial-engine';
  import { neuroAudio } from '../../../lib/neurogym/audio-synthesizer';

  interface Props {
    onComplete?: (success: boolean, latencyMs: number) => void;
    /** Orientación objetivo en grados (múltiplos de 15°). */
    targetAngle?: { x: number; y: number };
  }

  let { onComplete, targetAngle: targetProp }: Props = $props();

  let canvasElem: HTMLCanvasElement;
  let engine: WebGPUSpatialEngine;
  let capabilities = $state<WebGPUCapabilities | null>(null);

  let targetAngle = $derived({ x: normalize(targetProp?.x ?? 30), y: normalize(targetProp?.y ?? 45), z: 0 });
  let userAngle = $state({ x: 0, y: 0, z: 0 });
  let startTime = 0;
  let isMatched = $state(false);

  function renderLoop() {
    if (engine && canvasElem) {
      engine.renderMentalRotationFrame(userAngle.x, userAngle.y, userAngle.z);
    }
  }

  function normalize(deg: number): number {
    return ((deg % 360) + 360) % 360;
  }

  function handleRotate(axis: 'x' | 'y', delta: number) {
    if (isMatched) return;
    if (axis === 'x') userAngle.x = normalize(userAngle.x + delta);
    if (axis === 'y') userAngle.y = normalize(userAngle.y + delta);
    neuroAudio.playTone(300 + Math.abs(userAngle.y) * 2, 0.05);
    renderLoop();
    checkAlignment();
  }

  function checkAlignment() {
    const diffX = Math.abs(normalize(userAngle.x) - targetAngle.x);
    const diffY = Math.abs(normalize(userAngle.y) - targetAngle.y);

    if (!isMatched && (diffX < 15 || diffX > 345) && (diffY < 15 || diffY > 345)) {
      isMatched = true;
      neuroAudio.playSuccess();
      const latency = Math.round(performance.now() - startTime);
      setTimeout(() => {
        onComplete?.(true, latency);
      }, 800);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    const map: Record<string, ['x' | 'y', number]> = {
      ArrowUp: ['x', -15],
      ArrowDown: ['x', 15],
      ArrowLeft: ['y', -15],
      ArrowRight: ['y', 15]
    };
    const action = map[event.key];
    if (action) {
      event.preventDefault();
      handleRotate(action[0], action[1]);
    }
  }

  onMount(async () => {
    engine = new WebGPUSpatialEngine();
    capabilities = await engine.init(canvasElem);
    startTime = performance.now();
    renderLoop();
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex flex-col items-center gap-4 w-full max-w-xl mx-auto select-none">
  <div class="text-center">
    <div class="flex items-center justify-center gap-2">
      <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold">Juego 3D de Rotación Mental</span>
      {#if capabilities}
        <span class="text-[9px] font-mono px-2 py-0.5 rounded border {capabilities.supported ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-white/10 border-white/20 text-white/50'}">
          {capabilities.supported ? '⚡ WebGPU activo' : '🎨 Modo Canvas 2D'}
        </span>
      {/if}
    </div>
    <p class="text-xs text-white/60 mt-1">
      Gira el poliedro 3D hasta alinearlo con la orientación objetivo (X: {targetAngle.x}°, Y: {targetAngle.y}°).
    </p>
    <p class="text-[10px] text-white/40 font-mono mt-1" aria-live="polite">
      Orientación actual: X {userAngle.x}° · Y {userAngle.y}° — usa las flechas del teclado
    </p>
  </div>

  <!-- 3D Viewport -->
  <div class="relative w-72 h-72 sm:w-80 sm:h-80 bg-black/80 border-2 {isMatched ? 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.6)]' : 'border-white/20'} rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
    <canvas
      bind:this={canvasElem}
      width={320}
      height={320}
      class="w-full h-full"
    ></canvas>
  </div>

  <!-- 3D Rotation Controls -->
  <div class="grid grid-cols-4 gap-2 w-full max-w-xs">
    <button
      type="button"
      onclick={() => handleRotate('x', -15)}
      class="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
    >
      ▲ Arriba
    </button>
    <button
      type="button"
      onclick={() => handleRotate('x', 15)}
      class="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
    >
      ▼ Abajo
    </button>
    <button
      type="button"
      onclick={() => handleRotate('y', -15)}
      class="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
    >
      ◀ Izq
    </button>
    <button
      type="button"
      onclick={() => handleRotate('y', 15)}
      class="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
    >
      ▶ Der
    </button>
  </div>
</div>
