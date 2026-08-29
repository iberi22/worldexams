<script lang="ts">
  import { roomState } from '../modules/exam-room/stores/roomState.svelte.ts';
  import FlashlightCard from './FlashlightCard.svelte';
  import { generateQRCodeSVG } from '../lib/qr-generator';

  export let roomCode: string;
  export let onStart: () => void;
  export let onCancel: () => void; // To go back
  export let isHost: boolean = false; // 🆕 Track if current user is host

  let students: any[] = [];
  let generatingAi = false;
  let aiStatus = '';
  let showQrModal = false;

  $: students = roomState.players;

  function getJoinUrl(): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://saberparatodos.pages.dev';
    return `${origin}/sala-examenes?join=${encodeURIComponent(roomCode)}`;
  }

  $: qrSvg = generateQRCodeSVG(getJoinUrl(), { darkColor: '#0f172a', lightColor: '#ffffff', quietZone: true });

  async function generateWithAi() {
    if (!isHost || generatingAi) return;
    generatingAi = true;
    aiStatus = 'Generando examen on-device…';
    try {
      await roomState.generateQuestionsWithAi();
      aiStatus = `Listo: ${roomState.questions.length} preguntas (local-llm)`;
    } catch (e) {
      aiStatus = e instanceof Error ? e.message : 'Error al generar';
    } finally {
      generatingAi = false;
    }
  }
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-6 text-[#F5F5DC] animate-fade-in-up">
  <div class="w-full max-w-4xl text-center">

    <div class="mb-12">
      <h2 class="text-sm uppercase tracking-[0.3em] opacity-60 mb-4">Código de la Sala</h2>
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <button
           type="button"
           class="inline-block relative group cursor-pointer border-none bg-transparent p-0 focus:outline-none"
           onclick={() => navigator.clipboard.writeText(roomCode)}
           onkeydown={(e) => e.key === 'Enter' && navigator.clipboard.writeText(roomCode)}
        >
           <h1 class="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tighter filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group-hover:drop-shadow-[0_0_40px_rgba(16,185,129,0.6)]">
              {roomCode}
           </h1>
           <div class="absolute -bottom-6 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest text-emerald-500">
              Click para copiar
           </div>
        </button>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          type="button"
          onclick={() => showQrModal = true}
          class="px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
        >
          📱 Proyectar Código QR para Estudiantes
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
       <FlashlightCard className="p-8 flex flex-col items-center justify-center min-h-[200px]">
          <div class="text-4xl font-bold mb-2 text-white">{students.length}</div>
          <div class="text-sm uppercase tracking-widest opacity-60">Estudiantes Listos</div>
       </FlashlightCard>

       <div class="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px] max-h-[300px] overflow-y-auto">
          <h3 class="text-xs uppercase tracking-widest opacity-60 mb-4 text-left sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm py-2">Lista de Jugadores</h3>
          <div class="grid grid-cols-2 gap-2">
             {#each students as student}
                <div class="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors animate-fade-in">
                   <div class="w-2 h-2 rounded-full {student.isHost ? 'bg-purple-500' : 'bg-emerald-500'}"></div>
                   <span class="truncate text-sm">{student.name} {student.isHost ? '(Host)' : ''}</span>
                </div>
             {/each}
             {#if students.length === 0}
                <div class="col-span-2 text-center opacity-30 py-8 italic text-sm">
                   Esperando a que se unan...
                </div>
             {/if}
          </div>
       </div>
    </div>

    <div class="flex justify-center gap-4 flex-wrap">
        <button
           onclick={onCancel}
           class="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-sm"
        >
           {isHost ? 'Cancelar' : 'Salir'}
        </button>

        {#if isHost}
          <button
             type="button"
             onclick={generateWithAi}
             disabled={generatingAi}
             class="px-8 py-4 bg-violet-600/80 border border-violet-400/30 rounded-full font-bold uppercase tracking-widest hover:bg-violet-500 transition-all text-sm disabled:opacity-50"
          >
             {generatingAi ? 'Generando IA…' : 'Generar con IA local'}
          </button>
          <button
             onclick={onStart}
             disabled={students.length === 0}
             class="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-white"
          >
             Iniciar Examen
          </button>
        {:else}
          <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-[0.2em] opacity-40 flex items-center gap-3">
             <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
             Esperando al Anfitrión...
          </div>
        {/if}
    </div>
    {#if aiStatus}
      <p class="mt-4 text-xs text-violet-200/80">{aiStatus}</p>
    {/if}

  </div>
</div>

<!-- Modal Código QR / Proyección Aula -->
{#if showQrModal}
  <div class="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
    <div class="bg-[#111827] border border-cyan-500/30 rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl relative">
      <button
        type="button"
        onclick={() => showQrModal = false}
        class="absolute top-4 right-4 text-white/50 hover:text-white text-xl p-2"
        aria-label="Cerrar modal QR"
      >
        ✕
      </button>

      <div>
        <h3 class="text-2xl font-black text-white">Escanea para Unirte</h3>
        <p class="text-xs text-white/60 mt-1">Los estudiantes pueden usar la cámara de su teléfono o tablet</p>
      </div>

      <div class="bg-white p-4 rounded-2xl w-64 h-64 mx-auto shadow-inner flex items-center justify-center">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html qrSvg}
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
        <span class="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Código de Sala</span>
        <span class="text-3xl font-black text-emerald-400 font-mono tracking-wider">{roomCode}</span>
      </div>

      <p class="text-[11px] text-white/40 break-all font-mono">
        {getJoinUrl()}
      </p>
    </div>
  </div>
{/if}
