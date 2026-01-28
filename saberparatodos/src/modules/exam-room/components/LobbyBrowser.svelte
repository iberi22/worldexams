<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '../../../lib/supabase';
  import { fade, fly } from 'svelte/transition';
  import FlashlightCard from '../../../components/FlashlightCard.svelte';

  interface Props {
    onJoin: (roomId: string, roomName: string) => void;
    onClose: () => void;
  }

  let { onJoin, onClose }: Props = $props();

  let lobbies = $state<any[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Name Prompt State
  let guestName = $state('');
  let selectedRoom = $state<{code: string, hostName: string} | null>(null);

  function handleLobbyClick(session: any) {
      selectedRoom = { code: session.party_code, hostName: session.host_name };
  }

  function confirmJoin() {
      if (!guestName.trim() || !selectedRoom) return;
      onJoin(selectedRoom.code, guestName);
  }

  async function fetchLobbies() {
    isLoading = true;
    error = null;
    try {
      const { data, error: sbError } = await supabase
        .from('party_sessions')
        .select('*')
        .eq('status', 'waiting')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;

      // Filter public stop mode lobbies
      lobbies = (data || []).filter(session =>
        session.exam_config?.mode === 'stop' &&
        session.exam_config?.is_public === true
      );
      console.log(`[Lobby] Found ${lobbies.length} public stop sessions`);
    } catch (e: any) {
      console.error('Error fetching lobbies:', e);
      error = 'No se pudieron cargar las partidas activas.';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchLobbies();

    // Subscribe to changes to keep it updated
    const channel = supabase.channel('lobby-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'party_sessions'
      }, () => {
        fetchLobbies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });
</script>

<div class="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" transition:fade>
  <div
    class="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
    transition:fly={{ y: 50, duration: 400 }}
  >
    <!-- Header -->
    <div class="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
      <div>
        <h2 class="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Salas Públicas
        </h2>
        <p class="text-xs text-white/40 mt-1 uppercase tracking-widest font-bold">Busca un desafío y únete</p>
      </div>

      <button
        onclick={onClose}
        class="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
        aria-label="Cerrar"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6 scrollbar-hide">
      {#if isLoading && lobbies.length === 0}
        <div class="flex flex-col items-center justify-center py-20 animate-pulse">
            <div class="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p class="text-white/40 font-mono text-sm">Escaneando el multiverso...</p>
        </div>
      {:else if error}
        <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-center">
            <p class="text-red-400 font-bold mb-4">{error}</p>
            <button
                onclick={fetchLobbies}
                class="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-lg font-bold transition-all"
            >
                Reintentar
            </button>
        </div>
      {:else if lobbies.length === 0}
        <div class="text-center py-20">
            <div class="text-white/10 mb-6 flex justify-center">
                <svg class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <h3 class="text-xl font-bold text-white/60 mb-2">No hay partidas activas</h3>
            <p class="text-white/30 text-sm max-w-xs mx-auto">Sé el primero en crear un desafío Speed para que otros se unan.</p>

            <button
                onclick={onClose}
                class="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/5"
            >
                Volver
            </button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each lobbies as session (session.party_code)}
            <button
                onclick={() => handleLobbyClick(session)}
                class="text-left group w-full"
            >
                <FlashlightCard className="p-5 hover:border-pink-500/40 transition-all duration-300 relative overflow-hidden h-full w-full">
                    <div class="flex items-start justify-between relative z-10 w-full">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="px-2 py-0.5 bg-pink-500 text-white text-[10px] font-black rounded uppercase">SPEED</span>
                                <span class="text-white/40 text-[10px] font-bold uppercase tracking-widest">{session.party_code}</span>
                            </div>
                            <h3 class="text-lg font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                                {session.exam_config.name || `Sala de ${session.host_name}`}
                            </h3>
                            <p class="text-sm text-white/40 mt-1">Anfitrión: <span class="text-white/60">{session.host_name}</span></p>

                            <div class="flex items-center gap-4 mt-4">
                                <div class="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
                                    <span class="text-xs text-emerald-400">●</span>
                                    <span class="text-xs text-white/60 font-medium">
                                        {(session.students || []).length} Jugadores
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
                                    <span class="text-xs text-pink-400">⏱</span>
                                    <span class="text-xs text-white/60 font-medium">
                                        {session.exam_config.timePerQuestion || 15}s / preg
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center self-center group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-all">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </FlashlightCard>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Footer Action -->
    <div class="p-6 bg-white/[0.02] border-t border-white/5 flex justify-center">
        <button
            onclick={fetchLobbies}
            class="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
            <svg class="w-4 h-4 {isLoading ? 'animate-spin' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refrescar Lista
        </button>
    </div>
  </div>

  <!-- Name Prompt Modal -->
  {#if selectedRoom}
    <div class="absolute inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-gray-900 border border-white/20 p-6 rounded-xl w-full max-w-sm shadow-2xl" transition:fly={{ y: 20 }}>
            <h3 class="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                ¡Casi listo!
            </h3>
            <p class="text-gray-400 text-sm mb-4">Ingresa tu nombre para entrar a la sala de <span class="text-white font-bold">{selectedRoom.hostName}</span></p>

            <input
                type="text"
                bind:value={guestName}
                placeholder="Tu Apodo / Nombre"
                class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                autofocus
            />

            <div class="flex gap-3">
                <button
                    onclick={() => selectedRoom = null}
                    class="flex-1 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onclick={confirmJoin}
                    disabled={!guestName.trim()}
                    class="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-colors"
                >
                    Entrar
                </button>
            </div>
        </div>
    </div>
  {/if}
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
