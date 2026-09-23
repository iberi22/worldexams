<script lang="ts">
  import type { SemaforoNodo } from '../../lib/juego/semaforo';
  import type { SemaforoEstado } from '../../lib/juego/types';

  interface Props {
    nodos: SemaforoNodo[];
    narrativa: string;
  }

  let { nodos, narrativa }: Props = $props();

  const META: Record<SemaforoEstado, { icon: string; label: string; bar: string; text: string }> = {
    dominado: { icon: '🟢', label: 'Dominado', bar: 'bg-emerald-500', text: 'text-emerald-300' },
    desarrollo: { icon: '🟡', label: 'En desarrollo', bar: 'bg-yellow-500', text: 'text-yellow-300' },
    mejorar: { icon: '🔴', label: 'Por mejorar', bar: 'bg-red-500', text: 'text-red-300' },
  };
</script>

<div class="w-full space-y-4" aria-label="Semáforo de habilidades">
  <p class="text-sm text-white/80 leading-relaxed">{narrativa}</p>

  {#if nodos.length === 0}
    <p class="text-xs text-white/40 italic">Sin datos por micro-competencia aún.</p>
  {:else}
    <ul class="space-y-3">
      {#each nodos as nodo (nodo.tema)}
        {@const meta = META[nodo.estado]}
        {@const pct = Math.round(nodo.accuracy * 100)}
        <li class="space-y-1">
          <div class="flex items-center justify-between gap-2 text-xs">
            <span class="font-semibold text-white/85">
              {meta.icon} {nodo.tema}
            </span>
            <span class="{meta.text} font-mono">
              {meta.label} · {nodo.correctas}/{nodo.totales} ({pct}%)
            </span>
          </div>
          <div
            class="h-2 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={nodo.tema}
          >
            <div class="h-full rounded-full {meta.bar} transition-all" style="width: {pct}%"></div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
