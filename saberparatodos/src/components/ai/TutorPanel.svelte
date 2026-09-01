<script lang="ts">
  import { createTutorSession, type TutorSession, type TutorTurn } from '../../lib/ai/tutor-session';

  interface Props {
    questionText?: string;
    userAnswer?: string;
    explanation?: string;
    subject?: string;
    grade?: number;
  }

  let {
    questionText = '',
    userAnswer = '',
    explanation = '',
    subject = '',
    grade = undefined,
  }: Props = $props();

  let open = $state(false);
  let input = $state('');
  let listening = $state(false);
  let busy = $state(false);
  let turns = $state<TutorTurn[]>([]);
  let session = $state<TutorSession | null>(null);
  let mediaRecorder: MediaRecorder | null = null;
  let chunks: BlobPart[] = [];

  $effect(() => {
    if (!session) session = createTutorSession();
    session?.updateContext({
      questionText,
      userAnswer,
      explanation,
      subject,
      grade,
    });
  });

  async function sendText() {
    if (!input.trim() || !session || busy) return;
    busy = true;
    try {
      const turn = await session.respondText(input.trim(), { speak: true });
      turns = [...turns, turn];
      input = '';
      if (turn.audioWav) playWav(turn.audioWav);
    } finally {
      busy = false;
    }
  }

  function playWav(buf: ArrayBuffer) {
    try {
      const blob = new Blob([buf], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      void audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }

  async function toggleMic() {
    if (listening) {
      mediaRecorder?.stop();
      listening = false;
      return;
    }
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      // Fallback text command
      busy = true;
      try {
        const turn = await session!.respondVoice(new ArrayBuffer(0), { speak: true });
        turns = [...turns, turn];
        if (turn.audioWav) playWav(turn.audioWav);
      } finally {
        busy = false;
      }
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const buf = await blob.arrayBuffer();
      busy = true;
      try {
        const turn = await session!.respondVoice(buf, { speak: true });
        turns = [...turns, turn];
        if (turn.audioWav) playWav(turn.audioWav);
      } finally {
        busy = false;
      }
    };
    mediaRecorder.start();
    listening = true;
  }
</script>

<div class="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
  {#if open}
    <div class="w-[min(100vw-2rem,22rem)] rounded-2xl border border-white/15 bg-slate-950/95 shadow-2xl p-3 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white">Tutor de voz</h3>
        <a href="/ajustes/ia" class="text-[10px] text-sky-300 underline">Modelos</a>
      </div>
      <div class="max-h-48 overflow-y-auto space-y-2 text-xs">
        {#each turns as t}
          <div class="rounded-lg bg-white/5 px-2 py-1.5 text-white/80">
            <div class="text-white/40">Tú: {t.userText}</div>
            <div class="mt-1">{t.assistantText}</div>
          </div>
        {:else}
          <p class="text-white/40">Pregunta una pista. No revelaré la respuesta directa.</p>
        {/each}
      </div>
      <div class="flex gap-2">
        <input
          class="flex-1 rounded-lg bg-white/10 border border-white/10 px-2 py-1.5 text-sm text-white"
          placeholder="¿Qué no entiendo?"
          bind:value={input}
          onkeydown={(e) => e.key === 'Enter' && sendText()}
        />
        <button
          type="button"
          class="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 text-xs font-bold"
          disabled={busy}
          onclick={sendText}
        >Enviar</button>
        <button
          type="button"
          class={`px-2 py-1 rounded-lg border text-xs font-bold ${listening ? 'bg-red-500/30 border-red-400/40 text-red-100' : 'bg-sky-500/20 border-sky-400/30 text-sky-100'}`}
          disabled={busy}
          onclick={toggleMic}
          aria-label={listening ? 'Detener grabación' : 'Iniciar grabación'}
        >{listening ? '■' : '🎤'}</button>
      </div>
    </div>
  {/if}
  <button
    type="button"
    class="rounded-full w-12 h-12 bg-violet-600 hover:bg-violet-500 text-white shadow-lg font-black text-lg"
    onclick={() => (open = !open)}
    aria-label="Abrir tutor"
  >AI</button>
</div>
