<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import MathRenderer from '../MathRenderer.svelte';

  let { runtimeCountry } = $props();

  let activeTab = $state<'tools' | 'workshop' | 'diagnostic' | 'tracker'>('tools');
  let selectedSubject = $state(runtimeCountry?.subjects?.[0]?.name || 'Matemáticas');
  let selectedGrade = $state(11);
  let workshopQuestionCount = $state(10);
  let isGeneratingWorkshop = $state(false);
  let workshopReady = $state(false);

  const teacherPillars = [
    {
      icon: '🏫',
      title: 'Salones de Práctica en Vivo',
      desc: 'Crea una sala multijugador P2P instantánea para tus estudiantes. Proyecta las preguntas en clase y observa el progreso en tiempo real sin requerir correos ni logins.',
      actionLabel: 'Abrir Sala de Examen',
      href: '/sala-examenes'
    },
    {
      icon: '📝',
      title: 'Generador de Talleres & Evaluaciones',
      desc: 'Genera hojas de trabajo imprimibles en PDF o Markdown con clave de respuestas, análisis de distractores y justificación pedagógica lista para entregar.',
      actionLabel: 'Crear Taller Rápido',
      tabTarget: 'workshop'
    },
    {
      icon: '📊',
      title: 'Calendario & Periodos Académicos',
      desc: 'Consulta fechas oficiales de simulacros, cierre de periodos escolares y ponderaciones de competencias por asignatura según el ministerio o instituto evaluador.',
      actionLabel: 'Ver Cronograma',
      tabTarget: 'tracker'
    },
    {
      icon: '🧠',
      title: 'Estudio de Preguntas (RAG Local)',
      desc: 'Sube tus guías curriculares o lecturas en PDF para extraer preguntas automáticas con taxonomía de Bloom y formato estándar sin enviar datos a servidores externos.',
      actionLabel: 'Ir al Estudio RAG',
      href: '/estudio'
    }
  ];

  function generateWorkshopPreview() {
    isGeneratingWorkshop = true;
    setTimeout(() => {
      isGeneratingWorkshop = false;
      workshopReady = true;
    }, 600);
  }

  function printWorkshop() {
    window.print();
  }
</script>

<div class="space-y-8">
  <!-- Navigation Tabs -->
  <div class="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-2xl mx-auto">
    <button
      type="button"
      onclick={() => activeTab = 'tools'}
      class={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
        activeTab === 'tools'
          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      🛠️ Herramientas Docentes
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'workshop'}
      class={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
        activeTab === 'workshop'
          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      📄 Generador de Talleres
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'tracker'}
      class={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
        activeTab === 'tracker'
          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      📅 Seguimiento Curricular
    </button>
  </div>

  <!-- TAB: HERRAMIENTAS -->
  {#if activeTab === 'tools'}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" in:fade>
      {#each teacherPillars as pillar}
        <div class="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group">
          <div class="space-y-3">
            <div class="text-3xl mb-1">{pillar.icon}</div>
            <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              {pillar.title}
            </h3>
            <p class="text-xs sm:text-sm text-white/65 leading-relaxed">
              {pillar.desc}
            </p>
          </div>

          <div class="pt-6 mt-4 border-t border-white/5">
            {#if pillar.href}
              <a
                href={pillar.href}
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/10 transition-all"
              >
                {pillar.actionLabel} →
              </a>
            {:else if pillar.tabTarget}
              <button
                type="button"
                onclick={() => activeTab = pillar.tabTarget as any}
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 transition-all"
              >
                {pillar.actionLabel} →
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- TAB: GENERADOR DE TALLERES -->
  {#if activeTab === 'workshop'}
    <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto" in:fade>
      <div class="border-b border-white/10 pb-4">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          📄 Generador de Talleres para Aula e Impresión
        </h3>
        <p class="text-xs sm:text-sm text-white/60 mt-1">
          Configura un set de preguntas oficiales del banco para evaluar en clase de forma presencial o digital.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Asignatura</label>
          <select
            bind:value={selectedSubject}
            class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
          >
            {#each (runtimeCountry?.subjects || []) as sub}
              <option value={sub.name}>{sub.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Grado Escolar</label>
          <select
            bind:value={selectedGrade}
            class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
          >
            <option value={11}>Grado 11° (Salida / ICFES)</option>
            <option value={10}>Grado 10°</option>
            <option value={9}>Grado 9°</option>
            <option value={7}>Grado 7°</option>
            <option value={5}>Grado 5°</option>
            <option value={3}>Grado 3°</option>
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">N° Preguntas</label>
          <select
            bind:value={workshopQuestionCount}
            class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
          >
            <option value={5}>5 preguntas (Quiz rápido)</option>
            <option value={10}>10 preguntas (Taller estándar)</option>
            <option value={20}>20 preguntas (Evaluación periódica)</option>
            <option value={30}>30 preguntas (Simulacro)</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onclick={generateWorkshopPreview}
          disabled={isGeneratingWorkshop}
          class="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
        >
          {isGeneratingWorkshop ? 'Preparando...' : 'Generar Taller Imprimible'}
        </button>
      </div>

      {#if workshopReady}
        <div class="mt-8 pt-6 border-t border-white/10 space-y-4 bg-black/30 p-6 rounded-xl border border-amber-500/20" in:fly={{ y: 10 }}>
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <span class="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Documento Listo</span>
              <h4 class="text-lg font-bold text-white">Taller de {selectedSubject} — Grado {selectedGrade}° ({workshopQuestionCount} preguntas)</h4>
            </div>
            <button
              type="button"
              onclick={printWorkshop}
              class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10"
            >
              🖨️ Imprimir / Guardar PDF
            </button>
          </div>

          <div class="text-xs text-white/70 space-y-2">
            <p><strong>Institución:</strong> ________________________________________ <strong>Estudiante:</strong> ________________________________________</p>
            <p><strong>Fecha:</strong> ____/____/2026 <strong>Calificación:</strong> ________ / {workshopQuestionCount}</p>
          </div>

          <div class="p-4 bg-white/5 rounded-lg text-xs text-white/80 space-y-2 border border-white/5">
            <p class="font-bold text-amber-300">Instrucciones para el estudiante:</p>
            <p>Lee atentamente cada enunciado. Selecciona la opción correcta rellenando el círculo correspondiente y justifica tu procedimiento en las preguntas abiertas.</p>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- TAB: SEGUIMIENTO CURRICULAR -->
  {#if activeTab === 'tracker'}
    <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto" in:fade>
      <div class="border-b border-white/10 pb-4">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          📅 Cronograma & Estructura de Periodos en {runtimeCountry?.name}
        </h3>
        <p class="text-xs sm:text-sm text-white/60 mt-1">
          Alineado con el calendario académico oficial ({runtimeCountry?.examName}).
        </p>
      </div>

      {#if runtimeCountry?.schedules?.periods}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {#each runtimeCountry.schedules.periods as period}
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span class="text-[10px] font-black uppercase tracking-widest text-amber-400">Periodo {period.id}</span>
              <h4 class="text-sm font-bold text-white">{period.name}</h4>
              <p class="text-[11px] text-white/50">
                Inicia: {period.startDay}/{period.startMonth} · Cierra: {period.endDay}/{period.endMonth}
              </p>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-xs text-white/50">Cronograma de periodos activo todo el año.</p>
      {/if}

      <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-3">
        <span class="text-xl">💡</span>
        <p>
          Los bundles de preguntas en el banco rotan semanalmente para cubrir los estándares curriculares de cada periodo sin agotar la variedad de ejercicios.
        </p>
      </div>
    </div>
  {/if}
</div>
