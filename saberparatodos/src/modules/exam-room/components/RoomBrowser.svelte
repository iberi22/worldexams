<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { roomState } from '../stores/roomState.svelte.ts';
  import FlashlightCard from '../../../components/FlashlightCard.svelte';

  interface Props {
    onBack: () => void;
    onJoin: (code: string) => void;
  }

  let { onBack, onJoin }: Props = $props();
  let loading = $state(true);
  let interval: any;

  onMount(async () => {
    await loadRooms();
    // Refresh every 10 seconds
    interval = setInterval(loadRooms, 10000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  async function loadRooms() {
    loading = true;
    await roomState.fetchPublicRooms();
    loading = false;
  }

  function getTimeAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `Hace ${hours}h`;
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
  <div class="flex items-center justify-between mb-8">
    <button
      onclick={onBack}
      class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white flex items-center gap-2"
    >
      ← Volver
    </button>
    <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
      🔭 Explorar Salas
    </h2>
    <div class="w-24"></div> <!-- Spacer for centering -->
  </div>

  {#if loading && roomState.publicRooms.length === 0}
    <div class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  {:else if roomState.publicRooms.length === 0}
    <div class="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700">
      <div class="text-6xl mb-4">🏜️</div>
      <h3 class="text-xl font-bold text-white mb-2">No hay salas activas</h3>
      <p class="text-gray-400 mb-6">Sé el primero en crear una sala para desafiar a otros.</p>
      <button
        onclick={onBack}
        class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
      >
        Crear Sala
      </button>
    </div>
  {:else}
    <div class="grid md:grid-cols-2 gap-4">
      {#each roomState.publicRooms as room}
        <FlashlightCard className="p-5 hover:border-purple-500/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-xl font-bold text-white mb-1">{room.exam_config.name}</h3>
              <p class="text-sm text-gray-400 flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                Host: {room.host_name}
              </p>
            </div>
            <span class="px-3 py-1 bg-gray-700/50 rounded text-xs font-mono text-gray-300">
              {room.party_code}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div class="bg-black/20 p-2 rounded">
              <span class="text-gray-500 block text-xs">Asignatura</span>
              <span class="text-gray-200">{room.exam_config.stopConfig ? 'Speed Mode' : room.exam_config.asignatura}</span>
            </div>
            <div class="bg-black/20 p-2 rounded">
              <span class="text-gray-500 block text-xs">Jugadores</span>
              <span class="text-gray-200">{room.students?.length || 1} / {room.max_students}</span>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-500">{getTimeAgo(room.created_at)}</span>
            <button
              onclick={() => onJoin(room.party_code)}
              class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-purple-900/20"
            >
              Unirse
            </button>
          </div>
        </FlashlightCard>
      {/each}
    </div>
  {/if}
</div>
