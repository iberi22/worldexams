<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../lib/supabase';
  import type { RealtimeChannel } from '@supabase/supabase-js';

  interface Props {
    code: string;
  }

  let { code }: Props = $props();

  type ViewState = 'joining' | 'lobby' | 'question' | 'finished' | 'error';

  let viewState = $state<ViewState>('joining');
  let errorMessage = $state<string>('');
  let studentName = $state<string>('');
  let studentId = $state<string>('');
  let partySession = $state<any>(null);
  let channel: RealtimeChannel | null = null;
  let connectedStudents = $state<number>(0);
  let currentQuestion = $state<any>(null);

  async function joinParty() {
    if (!studentName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      studentId = crypto.randomUUID();

      // Verificar que la party existe
      const { data: party, error: fetchError } = await supabase
        .from('party_sessions')
        .select('*')
        .eq('party_code', code)
        .single();

      if (fetchError || !party) {
        viewState = 'error';
        errorMessage = 'Party no encontrada. Verifica el código.';
        return;
      }

      partySession = party;

      // Agregar estudiante a la party
      const students = party.students || [];
      students.push({
        id: studentId,
        name: studentName,
        joined_at: new Date().toISOString()
      });

      const { error: updateError } = await supabase
        .from('party_sessions')
        .update({ students })
        .eq('party_code', code);

      if (updateError) {
        console.error('Error updating party:', updateError);
        throw updateError;
      }

      // Subscribe a Realtime
      subscribeToParty();

      // Broadcast student joined
      channel?.send({
        type: 'broadcast',
        event: 'student_joined',
        payload: {
          student_id: studentId,
          name: studentName
        }
      });

      viewState = 'lobby';
    } catch (err) {
      console.error('Error joining party:', err);
      viewState = 'error';
      errorMessage = err instanceof Error ? err.message : 'Error al unirse a la party';
    }
  }

  function subscribeToParty() {
    console.log('[party] Subscribing to channel:', `party:${code}`);

    channel = supabase.channel(`party:${code}`)
      // Host inicia pregunta
      .on('broadcast', { event: 'question_start' }, (payload) => {
        console.log('[party] Question started:', payload);
        currentQuestion = payload.payload;
        viewState = 'question';
      })
      // Host finaliza party
      .on('broadcast', { event: 'party_finish' }, () => {
        console.log('[party] Party finished');
        viewState = 'finished';
      })
      // Presence tracking
      .on('presence', { event: 'sync' }, () => {
        const state = channel?.presenceState() || {};
        connectedStudents = Object.keys(state).length;
      })
      .subscribe((status) => {
        console.log('[party] Channel subscription status:', status);
      });

    // Track presence
    channel.track({
      role: 'student',
      student_id: studentId,
      name: studentName
    });
  }

  function submitAnswer(answer: string) {
    if (!currentQuestion || !channel) return;

    const timeTaken = Math.floor((Date.now() - currentQuestion.started_at) / 1000);

    channel.send({
      type: 'broadcast',
      event: 'answer_submit',
      payload: {
        student_id: studentId,
        student_name: studentName,
        question_id: currentQuestion.question_id,
        answer,
        time_taken: timeTaken
      }
    });

    console.log('[party] Answer submitted:', { answer, timeTaken });
  }

  onDestroy(() => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  });
</script>

<main style="
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: white;
  padding: 24px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
">
  <div style="max-width: 600px; margin: 0 auto;">

    {#if viewState === 'joining'}
      <!-- Join Form -->
      <div style="text-align: center;">
        <h1 style="
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 16px 0;
          background: linear-gradient(to right, #60a5fa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        ">
          {code}
        </h1>
        <p style="color: #94a3b8; margin: 0 0 32px 0;">
          Únete a la party
        </p>

        <div style="
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 32px;
        ">
          <label style="display: block; color: #cbd5e1; margin-bottom: 12px; font-weight: 500;">
            Tu nombre:
          </label>
          <input
            type="text"
            bind:value={studentName}
            placeholder="Ej: Juan Pérez"
            onkeydown={(e) => e.key === 'Enter' && joinParty()}
            style="
              width: 100%;
              padding: 16px;
              border-radius: 8px;
              background: rgba(15, 23, 42, 0.8);
              border: 1px solid #475569;
              color: white;
              font-size: 16px;
              margin-bottom: 24px;
            "
          />

          <button
            onclick={joinParty}
            style="
              width: 100%;
              padding: 16px;
              background: #2563eb;
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              cursor: pointer;
              transition: background 0.2s;
            "
          >
            Unirse
          </button>
        </div>
      </div>

    {:else if viewState === 'lobby'}
      <!-- Lobby: Waiting for host to start -->
      <div style="text-align: center;">
        <h1 style="
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: #60a5fa;
        ">
          ¡Bienvenido, {studentName}!
        </h1>
        <p style="color: #94a3b8; font-size: 18px;">
          Esperando que el host inicie el examen...
        </p>

        <div style="
          margin-top: 32px;
          display: inline-block;
          width: 64px;
          height: 64px;
          border: 4px solid #3b82f6;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>

        <div style="
          margin-top: 32px;
          padding: 16px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 8px;
        ">
          <p style="color: #cbd5e1; margin: 0;">
            {connectedStudents} estudiante{connectedStudents !== 1 ? 's' : ''} conectado{connectedStudents !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

    {:else if viewState === 'question'}
      <!-- Question View -->
      <div>
        <h2 style="color: #60a5fa; margin: 0 0 24px 0;">
          Pregunta {currentQuestion?.question_index || 1}
        </h2>

        <div style="
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          <p style="color: #e2e8f0; font-size: 18px; line-height: 1.6;">
            {currentQuestion?.question_text || 'Cargando pregunta...'}
          </p>
        </div>

        <!-- Options (ejemplo) -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          {#each ['A', 'B', 'C', 'D'] as option}
            <button
              onclick={() => submitAnswer(option)}
              style="
                padding: 16px;
                background: rgba(30, 41, 59, 0.5);
                border: 1px solid #475569;
                border-radius: 8px;
                color: white;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s;
              "
            >
              <strong>{option})</strong> Opción {option}
            </button>
          {/each}
        </div>
      </div>

    {:else if viewState === 'finished'}
      <!-- Finished -->
      <div style="text-align: center;">
        <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
        <h1 style="font-size: 36px; color: #60a5fa; margin: 0 0 16px 0;">
          ¡Examen completado!
        </h1>
        <p style="color: #94a3b8;">
          Gracias por participar, {studentName}
        </p>
      </div>

    {:else if viewState === 'error'}
      <!-- Error -->
      <div style="
        background: rgba(153, 27, 27, 0.3);
        border: 1px solid #ef4444;
        border-radius: 16px;
        padding: 32px;
        text-align: center;
      ">
        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
        <h2 style="color: #fca5a5; margin: 0 0 16px 0;">Error</h2>
        <p style="color: #fecaca; margin: 0;">
          {errorMessage}
        </p>
      </div>
    {/if}

  </div>
</main>

<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
