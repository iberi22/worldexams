<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import PartyPlayer from './PartyPlayer.svelte';
  import PartyHostView from '../modules/exam-room/components/PartyHostView.svelte';
  import { PartyHostSession, HOST_STORAGE_KEY, type SavedHostSession } from '../modules/exam-room/party/hostSession';
  import { PartyPlayerSession, type SavedPlayerSession } from '../modules/exam-room/party/playerSession';
  import { normalizeRoomCode } from '../modules/exam-room/party/protocol';

  /** Entrada de /party: el docente crea la sala; el estudiante se une con código o enlace. */
  type View = 'loading' | 'home' | 'host' | 'player';

  let view = $state<View>('loading');
  let joinCode = $state('');
  let savedHost = $state<SavedHostSession | null>(null);
  let savedPlayer = $state<SavedPlayerSession | null>(null);
  let resumeHost = $state<SavedHostSession | null>(null);

  function safeSessionStorage(): Storage | null {
    try {
      return window.sessionStorage;
    } catch {
      return null;
    }
  }

  onMount(() => {
    const storage = safeSessionStorage();
    savedHost = PartyHostSession.loadSaved(storage);
    savedPlayer = PartyPlayerSession.loadSaved(storage);

    const params = new URLSearchParams(window.location.search);
    const join = normalizeRoomCode(params.get('join') || '');
    if (join) {
      joinCode = join;
      window.history.replaceState({}, '', '/party');
      view = 'player';
      return;
    }
    // Recarga en medio de una partida como estudiante: volver a la misma sala.
    if (savedPlayer) {
      view = 'player';
      return;
    }
    view = 'home';
  });

  function goHome() {
    joinCode = '';
    savedPlayer = null;
    resumeHost = null;
    savedHost = PartyHostSession.loadSaved(safeSessionStorage());
    view = 'home';
  }

  function continueHost() {
    resumeHost = savedHost;
    view = 'host';
  }

  function discardHost() {
    try {
      safeSessionStorage()?.removeItem(HOST_STORAGE_KEY);
    } catch {
      /* noop */
    }
    savedHost = null;
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#F5F5DC] p-6 flex flex-col items-center justify-center">
  {#if view === 'loading'}
    <div class="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  {:else if view === 'home'}
    <div class="w-full max-w-md animate-fade-in-up" data-testid="party-home">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
          PARTY MODE
        </h1>
        <p class="text-sm uppercase tracking-widest opacity-60">Preguntas en vivo para toda la clase</p>
      </div>

      {#if savedHost}
        <FlashlightCard className="p-5 mb-4">
          <p class="text-sm mb-3">Tienes una sala abierta: <strong class="font-mono">{savedHost.config.code}</strong></p>
          <div class="flex gap-3">
            <button type="button" onclick={continueHost} class="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold" data-testid="host-resume">
              Reanudar sala
            </button>
            <button type="button" onclick={discardHost} class="py-2 px-3 rounded-lg border border-white/20 text-sm">Descartar</button>
          </div>
        </FlashlightCard>
      {/if}

      <div class="grid gap-4">
        <button
          type="button"
          onclick={() => (view = 'player')}
          class="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg"
          data-testid="party-join-choice"
        >
          🎓 Unirme con código
        </button>
        <button
          type="button"
          onclick={() => {
            resumeHost = null;
            view = 'host';
          }}
          class="w-full py-5 bg-white/10 hover:bg-white/20 font-bold uppercase tracking-widest rounded-lg border border-white/10"
          data-testid="party-host-choice"
        >
          👩‍🏫 Crear sala (docente)
        </button>
      </div>
    </div>
  {:else if view === 'host'}
    <PartyHostView resume={resumeHost} onExit={goHome} />
  {:else}
    <PartyPlayer partyCode={joinCode} resume={savedPlayer} onExit={goHome} />
  {/if}
</div>
