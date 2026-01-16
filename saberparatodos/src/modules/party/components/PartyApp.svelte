<script lang="ts">
  import { partyState } from '../stores/partyState.svelte';
  import { rustBackend, detectBackendMode } from '../../../lib/rust-backend';
  import PartyLobby from './PartyLobby.svelte';
  import HostControls from './HostControls.svelte';
  import PlayerView from './PlayerView.svelte';
  import PartyResults from './PartyResults.svelte';
  import StopModeSetup from './StopModeSetup.svelte';

  let view = $state<'home' | 'create' | 'create-stop' | 'join' | 'lobby' | 'game' | 'results'>('home');
  let backendMode = $state<'rust' | 'supabase'>('supabase');
  let isCheckingBackend = $state(true);

  // Form state
  let hostName = $state('');
  let partyName = $state('');
  let playerName = $state('');
  let partyCode = $state('');
  let selectedGrade = $state(11);
  let selectedSubject = $state('Matemáticas');

  // Detectar backend disponible al cargar
  $effect(() => {
    detectBackendMode().then((mode) => {
      backendMode = mode;
      isCheckingBackend = false;
    });
  });

  async function handleCreateParty() {
    try {
      const partyId = await partyState.createParty(
        hostName,
        partyName,
        selectedGrade,
        selectedSubject,
        {
          connectionMode: backendMode === 'rust' ? 'local' : 'supabase',
          maxPlayers: 100,
          timePerQuestion: 60,
          totalQuestions: 20,
          mode: 'standard'
        }
      );

      view = 'lobby';
    } catch (error) {
      console.error('Error creating party:', error);
      alert('Error al crear la party. Verifica que el servidor esté corriendo.');
    }
  }

  async function handleCreateStopParty(config: any) {
    try {
      const partyId = await partyState.createParty(
        config.hostName,
        config.partyName,
        11, // Default grade for Stop Mode (uses pool)
        'Stop Mode',
        {
          connectionMode: backendMode === 'rust' ? 'local' : 'supabase',
          maxPlayers: 100,
          timePerQuestion: 15,
          totalQuestions: config.totalQuestions,
          mode: 'stop',
          stopConfig: {
            includeEnglish: config.includeEnglish,
            difficulty: config.difficulty
          }
        }
      );
      view = 'lobby';
    } catch (error) {
      console.error('Error creating stop party:', error);
      alert('Error al crear la sala Stop. (Modo Offline Activado)');
      // Force Lobby view for testing/offline scenarios
      view = 'lobby';
    }
  }

  async function handleJoinParty() {
    try {
      // TODO: Fetch party config from backend by code
      const mockConfig = {
        id: partyCode,
        name: 'Party Demo',
        hostId: 'host-id',
        hostName: 'Host',
        maxPlayers: 100,
        timePerQuestion: 60,
        totalQuestions: 20,
        grado: 11,
        asignatura: 'Matemáticas',
        connectionMode: backendMode === 'rust' ? ('local' as const) : ('supabase' as const),
        createdAt: new Date(),
      };

      await partyState.joinParty(partyCode, playerName, mockConfig);
      view = 'lobby';
    } catch (error) {
      console.error('Error joining party:', error);
      alert('Error al unirse a la party. Verifica el código.');
    }
  }

  function handleGameStart() {
    view = 'game';
  }

  function handleGameFinish() {
    view = 'results';
  }

  // Detectar cambios de estado del juego
  $effect(() => {
    console.log('[PartyApp] Game status:', partyState.gameState.status, 'View:', view);
    if (partyState.gameState.status === 'active' && view !== 'game') {
      view = 'game';
    }
    if (partyState.gameState.status === 'finished' && view !== 'results') {
      view = 'results';
    }
  });
</script>

<div class="min-h-screen bg-gray-900 text-white">
  {#if isCheckingBackend}
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-4"></div>
        <p class="text-xl text-gray-400">Detectando servidor...</p>
      </div>
    </div>
  {:else if view === 'home'}
    <!-- Home Screen -->
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4">🎮 Party Mode</h1>
        <p class="text-xl text-gray-400 mb-2">Aula Virtual Multiplayer</p>
        <div class="inline-block px-4 py-2 rounded-lg {backendMode === 'rust' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}">
          {backendMode === 'rust' ? '🦀 Modo Local (Rust)' : '☁️ Modo Cloud (Supabase)'}
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Stop Mode (New) -->
        <div class="md:col-span-2 bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-xl p-8 border-2 border-purple-500/50 hover:border-purple-500 transition-all shadow-[0_0_30px_rgba(168,85,247,0.15)] group relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-50">
             <span class="text-6xl">⚡</span>
          </div>
          <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">⚡ SPEED CHALLENGE</h2>
          <p class="text-gray-300 mb-6 text-lg">Modo rápido y furioso. 15 segundos por pregunta. ¿Estás listo?</p>
          <button
            onclick={() => view = 'create-stop'}
            class="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg font-bold text-xl transition-all shadow-lg shadow-purple-900/40 transform group-hover:scale-[1.02]"
          >
            CREAR SALA STOP
          </button>
        </div>

        <!-- Create Party -->
        <div class="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-blue-500 transition-all">
          <h2 class="text-2xl font-bold mb-6">👑 Crear Party</h2>
          <p class="text-gray-400 mb-6">Eres el profesor, crea una sesión para tus estudiantes</p>
          <button
            onclick={() => view = 'create'}
            class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition-colors"
          >
            Crear Party
          </button>
        </div>

        <!-- Join Party -->
        <div class="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-green-500 transition-all">
          <h2 class="text-2xl font-bold mb-6">🎓 Unirse a Party</h2>
          <p class="text-gray-400 mb-6">Eres estudiante, únete con el código que te dieron</p>
          <button
            onclick={() => view = 'join'}
            class="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-lg transition-colors"
          >
            Unirse a Party
          </button>
        </div>
      </div>

      <!-- Server Info -->
      <div class="mt-12 p-6 bg-gray-800 rounded-lg">
        <h3 class="text-lg font-bold mb-3">ℹ️ Información del Servidor</h3>
        <div class="space-y-2 text-sm text-gray-400">
          {#if backendMode === 'rust'}
            <p>✅ Servidor Rust detectado en <code>localhost:8080</code></p>
            <p>💡 Puedes tener hasta 1000+ participantes simultáneos</p>
            <p>🚀 Latencia ultra-baja (&lt;5ms en LAN)</p>
          {:else}
            <p>☁️ Usando Supabase Realtime</p>
            <p>📊 Límite: 200 conexiones concurrentes (Free Tier)</p>
            <p>🌐 Funciona desde cualquier lugar con internet</p>
          {/if}
        </div>
      </div>
    </div>

  {:else if view === 'create'}
    <!-- Create Party Form -->
    <div class="container mx-auto px-4 py-12 max-w-2xl">
      <button
        onclick={() => view = 'home'}
        class="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
      >
        ← Volver
      </button>

      <div class="bg-gray-800 rounded-xl p-8">
        <h2 class="text-3xl font-bold mb-8">Crear Nueva Party</h2>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Tu Nombre (Host)</label>
            <input
              type="text"
              bind:value={hostName}
              placeholder="Ej: Profesor García"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Nombre de la Party</label>
            <input
              type="text"
              bind:value={partyName}
              placeholder="Ej: Examen Final Matemáticas 11°"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Grado</label>
              <select
                bind:value={selectedGrade}
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3°</option>
                <option value={5}>5°</option>
                <option value={9}>9°</option>
                <option value={11}>11°</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Asignatura</label>
              <select
                bind:value={selectedSubject}
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Matemáticas</option>
                <option>Lectura Crítica</option>
                <option>Ciencias Naturales</option>
                <option>Sociales</option>
                <option>Inglés</option>
              </select>
            </div>
          </div>

          <button
            onclick={handleCreateParty}
            disabled={!hostName || !partyName}
            class="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition-colors"
          >
            🚀 Crear Party
          </button>
        </div>
      </div>
    </div>

  {:else if view === 'create-stop'}
     <StopModeSetup
        onBack={() => view = 'home'}
        onCreate={handleCreateStopParty}
     />


  {:else if view === 'join'}
    <!-- Join Party Form -->
    <div class="container mx-auto px-4 py-12 max-w-2xl">
      <button
        onclick={() => view = 'home'}
        class="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
      >
        ← Volver
      </button>

      <div class="bg-gray-800 rounded-xl p-8">
        <h2 class="text-3xl font-bold mb-8">Unirse a una Party</h2>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Tu Nombre</label>
            <input
              type="text"
              bind:value={playerName}
              placeholder="Ej: Juan Pérez"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Código de Party</label>
            <input
              type="text"
              bind:value={partyCode}
              placeholder="Ej: ABC123"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase text-center text-2xl font-mono tracking-widest"
              maxlength="6"
            />
            <p class="text-sm text-gray-400 mt-2">Ingresa el código de 6 caracteres que te dio tu profesor</p>
          </div>

          <button
            onclick={handleJoinParty}
            disabled={!playerName || partyCode.length !== 6}
            class="w-full px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition-colors"
          >
            🎓 Unirse a Party
          </button>
        </div>
      </div>
    </div>

  {:else if view === 'lobby'}
    <PartyLobby onStartGame={handleGameStart} />

  {:else if view === 'game'}
    {#if partyState.isHost}
      <div class="container mx-auto px-4 py-6">
        <HostControls
          onNextQuestion={() => {}}
          onPauseGame={() => {}}
          onFinishGame={handleGameFinish}
        />
      </div>
    {:else}
      <PlayerView />
    {/if}

  {:else if view === 'results'}
    <PartyResults results={partyState.results} />
  {/if}
</div>

<style>
  code {
    @apply bg-gray-700 px-2 py-1 rounded text-yellow-400;
  }
</style>
