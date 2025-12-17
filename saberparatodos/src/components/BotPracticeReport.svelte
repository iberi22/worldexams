<script lang="ts">
  import { onMount } from 'svelte';
  import ScoreDisplay from './ScoreDisplay.svelte';
  import AdBanner from './AdBanner.svelte';
  import { supabase } from '../lib/supabase';
  import { calculateExamScore, type ExamResult } from '../lib/scoring';

  export let token: string;

  function resolveToken(): string {
    const t = (token || '').trim();
    if (t && t !== '_') return t;

    if (typeof window === 'undefined') return t;
    const parts = window.location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    // In case we're served the placeholder route (/informes/bot/_)
    if (last && last !== '_') return last;
    return '';
  }

  type ReportSession = {
    id: string;
    country_code: string;
    exam_type: string;
    subject: string;
    started_at: string;
    completed_at: string | null;
    answers: Array<{ question_id: string; selected_index: number; is_correct: boolean; answered_at: string }>;
  };

  type ReportQuestion = {
    id: string;
    enunciado: string;
    opciones: Array<{ text: string; correct?: boolean; isCorrect?: boolean }>;
    asignatura: string;
    explicacion?: string;
  };

  let loading = true;
  let error: string | null = null;
  let session: ReportSession | null = null;
  let questions: ReportQuestion[] = [];

  let examScore: any = null;

  function computeScore() {
    if (!session) return;

    const exam: ExamResult = {
      questions: (session.answers || []).map((a) => ({
        questionId: a.question_id,
        difficulty: 3,
        isCorrect: !!a.is_correct,
        timeSeconds: 10,
        currentStreak: 0,
      })),
      totalTimeSeconds: 0,
      startedAt: session.started_at,
      completedAt: session.completed_at || new Date().toISOString(),
    };

    examScore = calculateExamScore(exam);
  }

  onMount(async () => {
    loading = true;
    error = null;

    try {
      const effectiveToken = resolveToken();
      if (!effectiveToken) throw new Error('invalid_token');

      const { data, error: rpcError } = await supabase.rpc('get_bot_practice_report', {
        p_token: effectiveToken,
      });

      if (rpcError) throw rpcError;
      if (!data || data?.error) throw new Error(data?.error || 'not_found');

      session = data.session as ReportSession;
      questions = (data.questions || []) as ReportQuestion[];

      computeScore();
    } catch (e: any) {
      error = e?.message || 'No se pudo cargar el informe.';
    } finally {
      loading = false;
    }
  });

  function correctCount() {
    if (!session?.answers) return 0;
    return session.answers.filter((a) => a.is_correct).length;
  }
</script>

<div class="min-h-screen bg-[#0B0B0F] text-white">
  <div class="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl sm:text-3xl font-bold">📊 Informe de práctica</h1>
      <p class="text-white/60 text-sm mt-2">
        {#if session}
          {session.exam_type} · {session.subject}
        {:else}
          Resultados
        {/if}
      </p>
    </div>

    {#if loading}
      <div class="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-white/70">
        Cargando informe…
      </div>
    {:else if error}
      <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-200">
        No se pudo cargar el informe ({error}).
      </div>
    {:else}
      <!-- Ad block (shows for anonymous users) -->
      <AdBanner className="max-w-3xl mx-auto" />

      <!-- Minimal per-question summary -->
      <div class="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Resumen</h2>
        <div class="flex items-center justify-between text-sm">
          <span class="text-white/70">Correctas</span>
          <span class="font-mono font-bold text-emerald-400">{correctCount()}/{questions.length}</span>
        </div>
      </div>

      <div class="max-w-3xl mx-auto space-y-3">
        <h2 class="text-sm font-bold uppercase tracking-widest text-white/60">Detalle por pregunta</h2>

        {#each questions as q, idx}
          {@const a = session?.answers?.find((x) => x.question_id === q.id)}
          {@const ok = a?.is_correct}
          <div class={`p-4 rounded-xl border bg-white/5 ${ok ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs uppercase tracking-widest text-white/50">Pregunta {idx + 1}</span>
              <span class={`text-xs font-bold uppercase tracking-widest ${ok ? 'text-emerald-400' : 'text-red-400'}`}>
                {ok ? 'Correcta' : 'Incorrecta'}
              </span>
            </div>

            <p class="text-white/90 text-sm leading-relaxed">{q.enunciado}</p>
          </div>
        {/each}
      </div>

      <div class="max-w-3xl mx-auto">
        <AdBanner className="mt-6" />
      </div>
    {/if}
  </div>
</div>
