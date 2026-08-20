<script lang="ts">
  import { onMount } from 'svelte';
  import { getAiCore } from '../../lib/ai/ai-core-client';
  import { getAiTierPreference, saveAiTierPreference } from '../../lib/idb-storage';

  interface Props {
    onSelect?: (tier: string) => void;
  }

  let { onSelect }: Props = $props();

  export interface TierCapability {
    id: 'chrome-nano' | 'webgpu' | 'ollama' | 'cloud';
    name: string;
    description: string;
    available: boolean;
    badge: string;
  }

  let loading = $state(true);
  let selectedTier = $state<string>('cloud');
  let capabilities = $state<TierCapability[]>([
    {
      id: 'chrome-nano',
      name: 'Chrome Nano',
      description: 'Modelo local ultra-rápido integrado en el navegador',
      available: false,
      badge: 'Buscando...',
    },
    {
      id: 'webgpu',
      name: 'WebGPU',
      description: 'Ejecución en GPU local con modelos SLM optimizados',
      available: false,
      badge: 'Buscando...',
    },
    {
      id: 'ollama',
      name: 'Ollama',
      description: 'Servidor local Ollama (localhost:11434)',
      available: false,
      badge: 'Buscando...',
    },
    {
      id: 'cloud',
      name: 'Cloud',
      description: 'Procesamiento en la nube para máximo rendimiento',
      available: true,
      badge: 'Disponible',
    },
  ]);

  onMount(async () => {
    try {
      await detectCapabilities();
      const savedTier = await getAiTierPreference();
      if (savedTier) {
        selectedTier = savedTier;
      } else {
        // Recommend best available tier
        const bestAvailable = capabilities.find((c) => c.available);
        if (bestAvailable) {
          selectedTier = bestAvailable.id;
        }
      }
    } catch (e) {
      console.warn('Error detectando capacidades:', e);
    } finally {
      loading = false;
    }
  });

  async function detectCapabilities() {
    let hasChromeNano = false;
    let hasWebGpu = false;
    let hasOllama = false;
    let hasCloud = typeof navigator !== 'undefined' ? navigator.onLine : true;

    // Check Chrome Nano (Window AI / Chrome AI)
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.ai || win.chrome?.ai || win.modelExecution) {
        hasChromeNano = true;
      }
    }

    // Check WebGPU
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      try {
        const adapter = await (navigator as any).gpu.requestAdapter();
        if (adapter) hasWebGpu = true;
      } catch {
        hasWebGpu = false;
      }
    }

    // Query AiCore scan for WebGPU/Tier
    try {
      const ai = getAiCore();
      const caps = await ai.scan();
      if (caps?.webgpu) hasWebGpu = true;
      if (caps?.tier === 'high' || caps?.tier === 'medium') {
        if ('gpu' in navigator) hasWebGpu = true;
      }
    } catch {
      // Fallback to feature checks
    }

    // Probe Ollama endpoint
    if (typeof fetch !== 'undefined') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const res = await fetch('http://localhost:11434/api/tags', {
          method: 'GET',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (res.ok || res.status === 200) {
          hasOllama = true;
        }
      } catch {
        hasOllama = false;
      }
    }

    capabilities = [
      {
        id: 'chrome-nano',
        name: 'Chrome Nano',
        description: 'Modelo local ultra-rápido integrado en el navegador',
        available: hasChromeNano,
        badge: hasChromeNano ? 'Disponible' : 'No detectado',
      },
      {
        id: 'webgpu',
        name: 'WebGPU',
        description: 'Ejecución en GPU local con modelos SLM optimizados',
        available: hasWebGpu,
        badge: hasWebGpu ? 'Disponible' : 'No soportado',
      },
      {
        id: 'ollama',
        name: 'Ollama',
        description: 'Servidor local Ollama (localhost:11434)',
        available: hasOllama,
        badge: hasOllama ? 'Conectado' : 'Sin conexión',
      },
      {
        id: 'cloud',
        name: 'Cloud',
        description: 'Procesamiento en la nube para máximo rendimiento',
        available: hasCloud,
        badge: hasCloud ? 'Disponible' : 'Sin internet',
      },
    ];
  }

  async function selectTier(tierId: string) {
    selectedTier = tierId;
    await saveAiTierPreference(tierId);
    if (onSelect) {
      onSelect(tierId);
    }
  }

  function handleKeyDown(e: KeyboardEvent, tierId: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      void selectTier(tierId);
    }
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
        <span>Selección de Tier del Tutor</span>
        {#if loading}
          <span class="text-xs text-amber-300 font-normal animate-pulse">(Detectando...)</span>
        {/if}
      </h2>
      <p class="text-xs sm:text-sm text-white/60">
        Elige el motor de IA preferido para las explicaciones e interacciones de tutoría.
      </p>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 gap-3"
    role="radiogroup"
    aria-label="Selección de motor de Inteligencia Artificial para el tutor"
  >
    {#each capabilities as tier (tier.id)}
      {@const isSelected = selectedTier === tier.id}
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-label={`${tier.name}: ${tier.available ? 'Disponible' : 'No disponible'}. ${tier.description}`}
        tabindex="0"
        onclick={() => selectTier(tier.id)}
        onkeydown={(e) => handleKeyDown(e, tier.id)}
        class={`group relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
          isSelected
            ? 'border-sky-400 bg-sky-500/15 shadow-lg shadow-sky-500/10'
            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
        }`}
      >
        <div class="flex items-start justify-between w-full gap-2">
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold" aria-hidden="true">
              {tier.available ? '✅' : '❌'}
            </span>
            <span class="font-bold text-sm text-white group-hover:text-sky-200">
              {tier.name}
            </span>
          </div>

          <span
            class={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              tier.available
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                : 'bg-white/5 text-white/40 border-white/10'
            }`}
          >
            {tier.badge}
          </span>
        </div>

        <p class="text-xs text-white/70 mt-2 line-clamp-2">
          {tier.description}
        </p>

        <div class="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          <span class={isSelected ? 'text-sky-300 font-bold' : 'text-white/40'}>
            {isSelected ? '● Seleccionado' : 'Hacer clic para seleccionar'}
          </span>
          {#if isSelected}
            <span class="text-emerald-400 text-[11px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              Activo
            </span>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>
