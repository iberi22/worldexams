<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { localMeshPairing, type NearbyRoomAd } from '../../../lib/local-mesh-pairing';

  interface Props {
    onSelectRoom: (code: string) => void;
    onClose: () => void;
  }

  let { onSelectRoom, onClose }: Props = $props();

  let bluetoothAvailable = $state(false);
  let isBluetoothScanning = $state(false);
  let nearbyRooms = $state<NearbyRoomAd[]>([]);
  let unsubscribe: (() => void) | null = null;
  let now = $state(Date.now());
  let timer: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    bluetoothAvailable = typeof navigator !== 'undefined' && 'bluetooth' in navigator;
    localMeshPairing.startDiscovery();
    unsubscribe = localMeshPairing.subscribe((rooms) => {
      nearbyRooms = rooms;
    });

    timer = setInterval(() => {
      now = Date.now();
    }, 1000);
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
    if (timer) clearInterval(timer);
  });

  async function handleBluetoothScan() {
    isBluetoothScanning = true;
    try {
      await localMeshPairing.scanBluetoothPeers();
    } finally {
      isBluetoothScanning = false;
    }
  }

  function formatTimeSinceBeacon(lastBeaconAt: number): string {
    const elapsedSec = Math.max(0, Math.floor((now - lastBeaconAt) / 1000));
    if (elapsedSec === 0) return 'Ahora mismo';
    return `Hace ${elapsedSec}s`;
  }

  function getSignalBadge(room: NearbyRoomAd) {
    const quality = room.signalQuality || 'excellent';
    const ping = room.pingMs ? `${room.pingMs}ms` : '<5ms';

    if (quality === 'excellent') {
      return {
        label: `📶 Excelente / En la misma red (${ping})`,
        colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      };
    } else if (quality === 'good') {
      return {
        label: `📶 Buena / Red local (${ping})`,
        colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      };
    } else {
      return {
        label: `📶 Aceptable / Mesh distante (${ping})`,
        colorClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      };
    }
  }
</script>

<div
  class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
  transition:fade={{ duration: 200 }}
>
  <div
    class="bg-[#121218] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
    in:fly={{ y: 20, duration: 300 }}
  >
    <!-- Radar Glow Effect -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Header -->
    <div class="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-400">
          📡
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">Radar de Salones Cercanos</h3>
          <p class="text-xs text-white/50">Emparejamiento por Wi-Fi LAN / Bluetooth / Mesh</p>
        </div>
      </div>
      <button
        type="button"
        onclick={onClose}
        class="text-white/40 hover:text-white p-1 rounded-lg text-lg transition-colors"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>

    <!-- Radar Animation -->
    <div class="flex flex-col items-center justify-center py-6 bg-white/[0.02] border border-white/5 rounded-xl relative overflow-hidden">
      <div class="relative w-24 h-24 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping"></div>
        <div class="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse"></div>
        <div class="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-black text-xs">
          MESH
        </div>
      </div>
      <p class="text-[11px] text-cyan-300/80 font-mono mt-3 uppercase tracking-wider">
        {nearbyRooms.length > 0 ? `${nearbyRooms.length} Salón(es) Detectado(s)` : 'Buscando salones en tu red local...'}
      </p>
    </div>

    <!-- Discovered Rooms List -->
    <div class="space-y-3 max-h-64 overflow-y-auto pr-1">
      {#if nearbyRooms.length > 0}
        {#each nearbyRooms as room}
          {@const signal = getSignalBadge(room)}
          <div class="p-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 rounded-xl flex items-center justify-between gap-3 transition-all group">
            <div class="min-w-0 flex-1 space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm font-bold text-white truncate">{room.name}</span>
                <span class="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {room.transport}
                </span>
                <span class="px-2 py-0.5 rounded text-[9px] font-bold border {signal.colorClass}">
                  {signal.label}
                </span>
              </div>
              <p class="text-xs text-white/50">
                Profesor: <strong class="text-white/80">{room.hostName}</strong> · {room.subject} (Grado {room.grade}°)
              </p>
              <div class="flex items-center gap-3 text-[10px] text-white/40">
                <span>⏱️ Última baliza: <strong class="text-cyan-300">{formatTimeSinceBeacon(room.lastBeaconAt)}</strong></span>
                <span>👥 {room.playersCount} participante(s)</span>
              </div>
            </div>
            <button
              type="button"
              onclick={() => onSelectRoom(room.code)}
              class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider transition-all shrink-0 active:scale-95 shadow-md shadow-cyan-500/20"
            >
              Conectar
            </button>
          </div>
        {/each}
      {:else}
        <div class="text-center py-4 text-xs text-white/40 border border-dashed border-white/10 rounded-xl p-4">
          Si el docente o anfitrión abrió una sala en este salón o Wi-Fi, aparecerá automáticamente aquí.
        </div>
      {/if}
    </div>

    <!-- Bluetooth Scanner Action -->
    {#if bluetoothAvailable}
      <div class="pt-2 border-t border-white/10 flex items-center justify-between">
        <span class="text-xs text-white/50 flex items-center gap-1.5">
          <span>🔵</span> Bluetooth Web API activo
        </span>
        <button
          type="button"
          onclick={handleBluetoothScan}
          disabled={isBluetoothScanning}
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold transition-colors disabled:opacity-50"
        >
          {isBluetoothScanning ? 'Emparejando...' : 'Escanear por Bluetooth'}
        </button>
      </div>
    {/if}
  </div>
</div>
