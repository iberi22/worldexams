<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../lib/supabase';
  import type { RealtimeChannel } from '@supabase/supabase-js';

  type ViewState = 'creating' | 'lobby' | 'active' | 'finished' | 'error';

  let viewState = $state<ViewState>('creating');
  let partyCode = $state<string>('');
  let shareUrl = $state<string>('');
  let partySession = $state<any>(null);
  let channel: RealtimeChannel | null = null;
  let connectedStudents = $state<number>(0);
  let studentsData = $state<any[]>([]);
  let currentQuestionIndex = $state<number>(0);
  let questions = $state<any[]>([]);
  let answers = $state<Map<string, any>>(new Map());
  let errorMessage = $state<string>('');
  let copied = $state<boolean>(false);

  const CLOUD_URL = 'https://saberparatodos.pages.dev';

  function generatePartyCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  async function createParty() {
    try {
      partyCode = generatePartyCode();

      // Crear party en Supabase
      const { data, error } = await supabase
        .from('party_sessions')
        .insert({
          party_code: partyCode,
          host_name: 'Host Web',
          exam_config: {
            subject: 'matematicas',
            grade: 11,
            num_questions: 10,
            difficulty: 'mixed',
            time_per_question: 60
          },
          students: [],
          max_students: 10, // Free tier limit
          status: 'waiting'
        })
        .select()
        .single();

      if (error) {
        // Check if rate limit
        if (error.message.includes('Free tier limit')) {
          errorMessage = error.message;
          viewState = 'error';
          return;
        }
        throw error;
      }

      partySession = data;
      shareUrl = `${CLOUD_URL}/party?join=${partyCode}`;

      // Subscribe a Realtime
      subscribeToParty();

      viewState = 'lobby';
    } catch (err) {
      console.error('Error creating party:', err);
      errorMessage = err instanceof Error ? err.message : 'Error al crear party';
      viewState = 'error';
    }
  }

  function subscribeToParty() {
    channel = supabase.channel(`party:${partyCode}`)
      // Student joined
      .on('broadcast', { event: 'student_joined' }, (payload) => {
        console.log('[host] Student joined:', payload);
        // Refresh students list
        refreshStudents();
      })
      // Answer submitted
      .on('broadcast', { event: 'answer_submit' }, (payload) => {
        console.log('[host] Answer received:', payload);
        const data = payload.payload;
        answers.set(data.student_id, {
          question_id: data.question_id,
          answer: data.answer,
          time_taken: data.time_taken,
          student_name: data.student_name
        });
      })
      // Presence tracking
      .on('presence', { event: 'sync' }, () => {
        const state = channel?.presenceState() || {};
        connectedStudents = Object.keys(state).length;
      })
      .subscribe((status) => {
        console.log('[host] Channel subscription status:', status);
      });

    // Track host presence
    channel.track({ role: 'host' });
  }

  async function refreshStudents() {
    const { data } = await supabase
      .from('party_sessions')
      .select('students')
      .eq('party_code', partyCode)
      .single();

    if (data) {
      studentsData = data.students || [];
    }
  }

  function copyShareUrl() {
    navigator.clipboard.writeText(shareUrl);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  async function shareViaWeb() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Únete al examen',
          text: `Código: ${partyCode}`,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      copyShareUrl();
    }
  }

  function startExam() {
    viewState = 'active';
    currentQuestionIndex = 0;

    // TODO: Load questions from database
    questions = [
      {
        id: 'CO-MAT-11-001',
        enunciado: '¿Cuál es el resultado de 2 + 2?',
        options: [
          { id: 'A', text: '3' },
          { id: 'B', text: '4' },
          { id: 'C', text: '5' },
          { id: 'D', text: '6' }
        ],
        correcta: 'B'
      }
      // Add more questions...
    ];

    sendQuestion();
  }

  function sendQuestion() {
    if (!channel || currentQuestionIndex >= questions.length) return;

    const question = questions[currentQuestionIndex];

    channel.send({
      type: 'broadcast',
      event: 'question_start',
      payload: {
        question_index: currentQuestionIndex + 1,
        question_id: question.id,
        question_text: question.enunciado,
        options: question.options,
        time_limit: 60,
        started_at: Date.now()
      }
    });
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      finishExam();
    } else {
      answers.clear();
      sendQuestion();
    }
  }

  function finishExam() {
    viewState = 'finished';

    channel?.send({
      type: 'broadcast',
      event: 'party_finish',
      payload: {}
    });

    // TODO: Save results to database
  }

  onMount(() => {
    createParty();
  });

  onDestroy(() => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  });
</script>

<div style="
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: white;
  padding: 24px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
">
  <div style="max-width: 800px; margin: 0 auto;">

    {#if viewState === 'creating'}
      <!-- Loading -->
      <div style="text-align: center; padding: 64px 0;">
        <div style="
          display: inline-block;
          width: 64px;
          height: 64px;
          border: 4px solid #3b82f6;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        "></div>
        <h2 style="font-size: 24px; font-weight: 600; margin: 0;">Creando party...</h2>
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
        <p style="color: #fecaca; margin: 0 0 24px 0;">
          {errorMessage}
        </p>
        <button
          onclick={() => window.location.reload()}
          style="
            padding: 12px 24px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          "
        >
          Reintentar
        </button>
      </div>

    {:else if viewState === 'lobby'}
      <!-- Lobby: Waiting for students -->
      <div>
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="
            font-size: 48px;
            font-weight: 800;
            margin: 0 0 8px 0;
            background: linear-gradient(to right, #60a5fa, #22d3ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">
            {partyCode}
          </h1>
          <p style="color: #94a3b8; margin: 0;">
            Código de la party
          </p>
        </div>

        <!-- Share Card -->
        <div style="
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          <label style="display: block; color: #cbd5e1; margin-bottom: 12px; font-weight: 500;">
            Comparte este link:
          </label>
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <input
              type="text"
              readonly
              value={shareUrl}
              style="
                flex: 1;
                padding: 16px;
                border-radius: 8px;
                background: rgba(15, 23, 42, 0.8);
                border: 1px solid #475569;
                color: #93c5fd;
                font-size: 14px;
                font-family: monospace;
              "
            />
            <button
              onclick={copyShareUrl}
              style="
                padding: 16px 24px;
                border-radius: 8px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                {copied ? 'background: #16a34a; color: white;' : 'background: #2563eb; color: white;'}
              "
            >
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>

          {#if navigator.share}
            <button
              onclick={shareViaWeb}
              style="
                width: 100%;
                padding: 16px;
                background: #10b981;
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
              "
            >
              <span>📱</span>
              <span>Compartir por WhatsApp/Telegram</span>
            </button>
          {/if}
        </div>

        <!-- Students List -->
        <div style="
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          <h3 style="color: #cbd5e1; margin: 0 0 16px 0; display: flex; justify-content: space-between;">
            <span>Estudiantes</span>
            <span style="color: #60a5fa;">{studentsData.length}/10</span>
          </h3>

          {#if studentsData.length === 0}
            <p style="color: #94a3b8; text-align: center; padding: 32px 0;">
              Esperando que los estudiantes se unan...
            </p>
          {:else}
            <div style="display: flex; flex-direction: column; gap: 8px;">
              {#each studentsData as student}
                <div style="
                  padding: 12px 16px;
                  background: rgba(15, 23, 42, 0.8);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  gap: 12px;
                ">
                  <div style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></div>
                  <span style="color: #e2e8f0;">{student.name}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Start Button -->
        <button
          onclick={startExam}
          disabled={studentsData.length === 0}
          style="
            width: 100%;
            padding: 20px;
            background: {studentsData.length > 0 ? '#2563eb' : '#475569'};
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 18px;
            cursor: {studentsData.length > 0 ? 'pointer' : 'not-allowed'};
            transition: background 0.2s;
          "
        >
          Iniciar Examen
        </button>
      </div>

    {:else if viewState === 'active'}
      <!-- Active Exam -->
      <div>
        <div style="margin-bottom: 24px;">
          <h2 style="color: #60a5fa; margin: 0 0 8px 0;">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </h2>
          <div style="
            height: 8px;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 8px;
            overflow: hidden;
          ">
            <div style="
              height: 100%;
              background: #2563eb;
              width: {((currentQuestionIndex + 1) / questions.length) * 100}%;
              transition: width 0.3s;
            "></div>
          </div>
        </div>

        <!-- Question Display -->
        <div style="
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          <p style="color: #e2e8f0; font-size: 18px; line-height: 1.6; margin: 0;">
            {questions[currentQuestionIndex]?.enunciado}
          </p>
        </div>

        <!-- Answers Received -->
        <div style="
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #475569;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          <h3 style="color: #cbd5e1; margin: 0 0 16px 0;">
            Respuestas recibidas: {answers.size}/{studentsData.length}
          </h3>

          {#if answers.size === 0}
            <p style="color: #94a3b8; text-align: center; padding: 16px 0;">
              Esperando respuestas...
            </p>
          {:else}
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
              {#each ['A', 'B', 'C', 'D'] as option}
                {@const count = Array.from(answers.values()).filter(a => a.answer === option).length}
                <div style="
                  padding: 16px;
                  background: rgba(15, 23, 42, 0.8);
                  border-radius: 8px;
                  text-align: center;
                ">
                  <div style="font-size: 24px; font-weight: 700; color: #60a5fa;">{count}</div>
                  <div style="font-size: 14px; color: #94a3b8;">Opción {option}</div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Controls -->
        <button
          onclick={nextQuestion}
          style="
            width: 100%;
            padding: 20px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
          "
        >
          {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Examen'}
        </button>
      </div>

    {:else if viewState === 'finished'}
      <!-- Finished -->
      <div style="text-align: center;">
        <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
        <h1 style="font-size: 36px; color: #60a5fa; margin: 0 0 16px 0;">
          ¡Examen Completado!
        </h1>
        <p style="color: #94a3b8; margin: 0 0 32px 0;">
          {studentsData.length} estudiante{studentsData.length !== 1 ? 's' : ''} participaron
        </p>

        <button
          onclick={() => window.location.href = '/party'}
          style="
            padding: 16px 32px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          "
        >
          Crear Nueva Party
        </button>
      </div>
    {/if}

  </div>
</div>

<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
