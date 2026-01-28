<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../lib/supabase';
  import type { RealtimeChannel } from '@supabase/supabase-js';
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

  let roomSession = $state<any>(null);
  let channel: RealtimeChannel | null = null;
  let connectedStudents = $state<number>(0);
  let currentQuestion = $state<any>(null);
  let selectedAnswer = $state<string | null>(null);

  onMount(() => {
    if (autoJoin && roomCode) {
      subscribeToRoom();
    }
  });

  async function joinRoom() {
    if (!localStudentName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      if (!localStudentId) localStudentId = crypto.randomUUID();

      const { data: roomData, error: fetchError } = await supabase
        .from('party_sessions')
        .select('*')
        .eq('party_code', roomCode)
        .maybeSingle();

      if (fetchError || !roomData) {
        viewState = 'error';
        errorMessage = 'Sala no encontrada. Verifica el código.';
        return;
      }

      const room: any = roomData;
      roomSession = room;

      const students = room.students || [];
      students.push({ id: localStudentId, name: localStudentName, joined_at: new Date().toISOString(), isHost });

      const { error: updateError } = await supabase
        .from('party_sessions')
        .update({ students } as any)
        .eq('party_code', roomCode);

      if (updateError) throw updateError;

      subscribeToRoom();

      channel?.send({
        type: 'broadcast',
        event: 'student_joined',
        payload: { student_id: localStudentId, name: localStudentName, isHost }
      });

      viewState = 'lobby';
    } catch (err) {
      console.error('Error joining room:', err);
      viewState = 'error';
      errorMessage = err instanceof Error ? err.message : 'Error al unirse a la sala';
    }
  }

  function subscribeToRoom() {
    // Si ya estamos suscritos, no duplicar
    if (channel) return;

    channel = supabase.channel(`party:${roomCode}`)
      .on('broadcast', { event: 'game_state_update' }, (payload) => {
         const data = payload.payload;

         if (data.status === 'finished') {
             viewState = 'finished';
             return;
         }

         if (data.question_data) {
             // Map ExamView Question format to RoomPlayer format
             const q = data.question_data;
             currentQuestion = {
                 question_index: (data.current_question_index || 0) + 1,
                 question_id: q.id,
                 question_text: q.text,
                 // Ensure options have text property (ExamView uses 'text', RoomPlayer used 'text')
                 options: q.options.map((o: any) => ({
                     id: o.id,
                     text: o.text || o.label || 'Opción'
                 })),
                 started_at: Date.now() // Reset timer for client
             };
             selectedAnswer = null;
             viewState = 'question';
         }
      })
      // Legacy event fallback (if using mixed hosts)
      .on('broadcast', { event: 'question_start' }, (payload) => {
        currentQuestion = payload.payload;
        selectedAnswer = null;
        viewState = 'question';
      })
      .on('broadcast', { event: 'party_finish' }, () => {
        viewState = 'finished';
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel?.presenceState() || {};
        connectedStudents = Object.keys(state).length;
      })
      .subscribe();

    channel.track({ role: 'student', student_id: localStudentId, name: localStudentName || studentName, isHost });
  }

  function submitAnswer(answer: string) {
    if (!currentQuestion || !channel || selectedAnswer) return;

    selectedAnswer = answer;
    const timeTaken = Math.floor((Date.now() - currentQuestion.started_at) / 1000);

    /*
       Si soy ANFITRIÓN, no necesito enviar mi respuesta por broadcast si solo yo la consumiré,
       pero para mantener consistencia y que aparezca en el dashboard del anfitrión (que soy yo mismo en otra vista),
       la enviamos igual.
    */
    channel.send({
      type: 'broadcast',
      event: 'answer_submit',
      payload: {
        student_id: localStudentId,
        student_name: localStudentName || studentName,
        question_id: currentQuestion.question_id,
        answer,
        time_taken: timeTaken,
        isHost
      }
    });
  }

  onDestroy(() => { if (channel) supabase.removeChannel(channel); });
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
          <h2 class="text-xl font-bold text-emerald-500 uppercase tracking-widest">Pregunta {currentQuestion?.question_index || 1}</h2>
          <FlashlightCard className="p-6">
            <p class="text-lg leading-relaxed">{currentQuestion?.question_text || 'Cargando pregunta...'}</p>
          </FlashlightCard>
        {/if}

        <div class="space-y-3">
          {#each currentQuestion?.options || [] as option}
            <button
              onclick={() => submitAnswer(option.id)}
              disabled={selectedAnswer !== null}
              class="w-full p-4 rounded-lg text-left font-medium transition-all {selectedAnswer === option.id ? 'bg-emerald-500 text-white border-emerald-500' : selectedAnswer ? 'bg-white/5 border border-white/10 opacity-50' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}"
            >
              <strong class="text-emerald-500">{option.id})</strong> {option.text}
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
      </FlashlightCard>
    {/if}

  </div>
</div>
