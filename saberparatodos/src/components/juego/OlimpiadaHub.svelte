<script lang="ts">
  import type { ElegibilidadResultado, HallEntry, VentanaEstado } from '../../lib/juego/olimpiada';

  interface Props {
    season: string;
    estado: VentanaEstado;
    elegibilidad: ElegibilidadResultado;
    optIn: boolean;
    hall: HallEntry[];
    onOptIn?: () => void;
  }

  let { season, estado, elegibilidad, optIn, hall, onOptIn }: Props = $props();
</script>

<div class="olimpiada-hub space-y-6 p-6 max-w-4xl mx-auto">
  <div class="header flex items-center justify-between border-b pb-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Olimpiada Escolar WorldExams</h1>
      <p class="text-sm text-slate-600">Temporada: <span data-testid="oli-season" class="font-mono font-semibold text-slate-800">{season}</span></p>
    </div>
    <div data-testid="oli-estado" class="badge px-3 py-1 rounded-full text-xs font-semibold capitalize bg-blue-100 text-blue-800">
      Ventana {estado}
    </div>
  </div>

  <div class="elegibilidad-panel bg-white p-4 rounded-lg shadow-sm border">
    <h2 class="text-lg font-semibold mb-2 text-slate-800">Estado de Elegibilidad</h2>
    {#if elegibilidad.esElegible}
      <div class="text-green-600 font-medium mb-3">✓ Eres elegible para competir en la Olimpiada</div>
      {#if !optIn}
        <button
          data-testid="oli-optin"
          onclick={onOptIn}
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors"
        >
          Quiero competir
        </button>
      {:else}
        <div data-testid="oli-optin" class="text-indigo-600 font-semibold text-sm">
          ✓ Te has registrado para competir
        </div>
      {/if}
    {:else}
      <div data-testid="oli-motivos" class="space-y-2">
        <p class="text-amber-700 text-sm font-medium">Requisitos pendientes para clasificar:</p>
        <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
          {#each elegibilidad.motivosIneligibilidad as motivo}
            <li>{motivo}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <div data-testid="oli-hall" class="hall-of-fame bg-white p-4 rounded-lg shadow-sm border">
    <h2 class="text-lg font-semibold mb-3 text-slate-800">Salón de la Fama (GOAT)</h2>
    {#if hall.length === 0}
      <p class="text-sm text-slate-500 italic">No hay campeones registrados aún para este período.</p>
    {:else}
      <ul class="divide-y text-sm">
        {#each hall as entry}
          <li class="py-2 flex justify-between items-center">
            <span class="font-medium text-slate-800">{entry.alias} · {entry.pais.toUpperCase()} · {entry.season}</span>
            <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Campeón</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
