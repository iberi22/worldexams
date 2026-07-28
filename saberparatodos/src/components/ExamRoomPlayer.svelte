<script lang="ts">
  import { onMount } from 'svelte';
  import { roomState } from '../modules/exam-room/stores/roomState.svelte.ts';
  import type { RoomConfig } from '../modules/exam-room/types';
  import FlashlightCard from './FlashlightCard.svelte';

  interface Props {
    // Si viene desde Anfitrión, ya tiene estos datos
    roomCode: string;
    studentName?: string;
    studentId?: string;
    autoJoin?: boolean;
    isHost?: boolean;
  }

  let { roomCode, studentName = '', studentId = '', autoJoin = false, isHost = false }: Props = $props();

  type ViewState = 'joining' | 'lobby' | 'question' | 'finished' | 'error';

  let viewState = $state<ViewState>(autoJoin ? 'lobby' : 'joining');
  let errorMessage = $state<string>('');

  // States locales si no se pasan props
  let localStudentName = $state<string>(studentName);
  let localStudentId = $state<string>(studentId);

  let connectedStudents = $derived(roomState.playersOnline);
  let currentQuestion = $derived(roomState.currentQuestion);
  let selectedAnswer = $state<string | null>(null);
  let questionStartedAt = $state(Date.now());

  onMount(() => {
    if (autoJoin && roomCode) {
      if (roomState.config?.id === roomCode) {
        viewState = 'lobby';
      } else {
        void joinRoom();
      }
    }
  });

  $effect(() => {
    const status = roomState.gameState.status;
    if (status === 'active') viewState = 'question';
    if (status === 'finished') viewState = 'finished';
  });

  $effect(() => {
    roomState.gameState.currentQuestionIndex;
    selectedAnswer = null;
    questionStartedAt = Date.now();
  });

  async function joinRoom() {
    if (!localStudentName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      if (!localStudentId) localStudentId = crypto.randomUUID();

      await roomState.fetchPublicRooms();
      const room = roomState.publicRooms.find(
        (candidate: any) => candidate.party_code === roomCode,
      );

      if (!room) {
        viewState = 'error';
        errorMessage = 'Sala no encontrada. Verifica el código.';
        return;
      }

      const meshConfig = room.exam_config || {};
      const config: RoomConfig = {
        id: roomCode,
        name: meshConfig.name || `Sala ${roomCode}`,
        hostId: room.students?.[0]?.id || room.host_name || 'mesh-host',
        hostName: room.host_name || 'Host',
        maxPlayers: room.max_students || 50,
        timePerQuestion: meshConfig.timePerQuestion || 60,
        totalQuestions: meshConfig.totalQuestions || 20,
        grado: meshConfig.grado || 11,
        asignatura: meshConfig.asignatura || 'General',
        region: meshConfig.region,
        countryCode: meshConfig.countryCode,
        connectionMode: 'edge-mesh',
        createdAt: new Date(room.created_at || Date.now()),
      };

      await roomState.joinRoom(roomCode, localStudentName, config);
      viewState = 'lobby';
    } catch (err) {
      console.error('Error joining room:', err);
      viewState = 'error';
      errorMessage = err instanceof Error ? err.message : 'Error al unirse a la sala';
    }
  }

  function submitAnswer(answer: string) {
    if (!currentQuestion || selectedAnswer) return;

    selectedAnswer = answer;
    const timeTaken = Math.floor((Date.now() - questionStartedAt) / 1000);
    roomState.submitAnswer(currentQuestion.id, answer, timeTaken);
  }
</script>

<div class="h-full w-full flex flex-col items-center justify-center p-4">
  <div class="w-full max-w-lg animate-fade-in-up">

    {#if viewState === 'joining'}
      <!-- Join Form -->
      <div class="text-center">
        <h1 class="text-5xl font-black text-emerald-500 mb-2">{roomCode}</h1>
        <p class="text-sm uppercase tracking-widest opacity-60 mb-8">Únete a la sala</p>

        <FlashlightCard className="p-8">
          <label for="student-name" class="block text-xs uppercase tracking-widest opacity-60 mb-3 text-left">Tu nombre:</label>
          <input
            id="student-name"
            type="text"
            bind:value={localStudentName}
            placeholder="Ej: Juan Pérez"
            onkeydown={(e) => e.key === 'Enter' && joinRoom()}
            class="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white mb-6 focus:outline-none focus:border-emerald-500"
          />
          <button
            onclick={joinRoom}
            class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            Unirse
          </button>
        </FlashlightCard>
      </div>

    {:else if viewState === 'lobby'}
      <!-- Lobby -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-emerald-500 mb-2">
          {#if isHost}
             👑 Estás participando
          {:else}
             ¡Bienvenido, {localStudentName}!
          {/if}
        </h1>
        <p class="text-sm uppercase tracking-widest opacity-60 mb-8">Esperando la siguiente pregunta...</p>

        <div class="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-8"></div>

        {#if !isHost}
        <FlashlightCard className="p-6">
          <p class="opacity-60">{connectedStudents} estudiante{connectedStudents !== 1 ? 's' : ''} conectado{connectedStudents !== 1 ? 's' : ''}</p>
        </FlashlightCard>
        {/if}
      </div>

    {:else if viewState === 'question'}
      <!-- Question -->
      <div class="space-y-6">
        {#if !isHost}
          <h2 class="text-xl font-bold text-emerald-500 uppercase tracking-widest">Pregunta {roomState.gameState.currentQuestionIndex + 1}</h2>
          <FlashlightCard className="p-6">
            <p class="text-lg leading-relaxed">{currentQuestion?.text || currentQuestion?.enunciado || 'Cargando pregunta...'}</p>
          </FlashlightCard>
        {/if}

        <div class="space-y-3">
          {#each currentQuestion?.options || [] as option, index}
            {@const optionId = option.id || ['A', 'B', 'C', 'D'][index]}
            <button
              onclick={() => submitAnswer(optionId)}
              disabled={selectedAnswer !== null}
              class="w-full p-4 rounded-lg text-left font-medium transition-all {selectedAnswer === optionId ? 'bg-emerald-500 text-white border-emerald-500' : selectedAnswer ? 'bg-white/5 border border-white/10 opacity-50' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}"
            >
              <strong class="text-emerald-500">{optionId})</strong> {option.text || option.label || option}
            </button>
          {/each}
        </div>

        {#if selectedAnswer}
          <p class="text-center text-sm uppercase tracking-widest opacity-60">Respuesta enviada ✓</p>
        {/if}
      </div>

    {:else if viewState === 'finished'}
      <!-- Finished -->
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🎉</div>
        <h1 class="text-3xl font-bold text-emerald-500 uppercase tracking-widest mb-4">¡Examen completado!</h1>
        <p class="opacity-60">Gracias por participar.</p>
      </div>

    {:else if viewState === 'error'}
      <!-- Error -->
      <FlashlightCard className="p-8 text-center border-red-500/50">
        <div class="text-5xl mb-4">⚠️</div>
        <h2 class="text-xl font-bold uppercase tracking-widest text-red-400 mb-4">Error</h2>
        <p class="text-red-300 opacity-80">{errorMessage}</p>
        <button
          type="button"
          onclick={() => {
            errorMessage = '';
            viewState = 'joining';
          }}
          class="mt-6 px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-100 font-bold transition-colors"
        >
          Reintentar
        </button>
      </FlashlightCard>
    {/if}

  </div>
</div>
