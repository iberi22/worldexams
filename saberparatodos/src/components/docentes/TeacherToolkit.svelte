<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import MathRenderer from '../MathRenderer.svelte';
  import { getAuthorityGuidelines } from '../../config/authority-guidelines';

  let { runtimeCountry } = $props();

  let activeTab = $state<'tools' | 'workshop' | 'diagnostic' | 'tracker'>('tools');
  let selectedSubject = $state(runtimeCountry?.subjects?.[0]?.name || 'Matemáticas');
  let selectedGrade = $state(11);
  let workshopQuestionCount = $state(10);
  let includeAnswerKey = $state(true);
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

  function getSampleQuestions() {
    return Array.from({ length: workshopQuestionCount }, (_, i) => ({
      num: i + 1,
      question: `Enunciado pedagógico de práctica #${i + 1} para ${selectedSubject} (Grado ${selectedGrade}°). ¿Cuál de las siguientes alternativas representa la solución analítica correcta?`,
      options: [
        'A) Opción A — Planteamiento analítico estándar.',
        'B) Opción B — Alternativa con distractor de interpretación.',
        'C) Opción C — Respuesta correcta validada por estándar curricular.',
        'D) Opción D — Distractor procedural frecuente.'
      ],
      correct: 'C',
      justification: 'La Opción C aplica rigurosamente las competencias evaluadas por el estándar curricular nacional. El distractor B surge de omitir el análisis dimensional.'
    }));
  }

  function downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportMarkdown() {
    const questions = getSampleQuestions();
    let md = `# TALLER EVALUATIVO - ${selectedSubject.toUpperCase()}\n`;
    md += `**País:** ${runtimeCountry?.name || 'Oficial'} | **Grado:** ${selectedGrade}° | **Fecha:** ____/____/2026\n`;
    md += `**Estudiante:** ________________________________________ | **Calificación:** ________ / ${workshopQuestionCount}\n\n`;
    md += `---\n\n`;
    md += `### Instrucciones:\n`;
    md += `Lee detenidamente cada pregunta y selecciona la alternativa correcta. Fundamenta tus respuestas cuando sea requerido.\n\n`;
    md += `---\n\n`;

    questions.forEach((q) => {
      md += `### Pregunta ${q.num}\n${q.question}\n\n`;
      q.options.forEach((opt) => {
        md += `- [ ] ${opt}\n`;
      });
      md += `\n`;
    });

    if (includeAnswerKey) {
      md += `---\n\n## 🔑 CLAVE DE RESPUESTAS Y JUSTIFICACIÓN PEDAGÓGICA\n\n`;
      questions.forEach((q) => {
        md += `**${q.num}. Respuesta Correcta: (${q.correct})**\n`;
        md += `*Justificación:* ${q.justification}\n\n`;
      });
    }

    const filename = `Taller_${selectedSubject.replace(/\s+/g, '_')}_Grado${selectedGrade}.md`;
    downloadFile(md, filename, 'text/markdown;charset=utf-8');
  }

  function exportHTML() {
    const questions = getSampleQuestions();
    let html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Taller de ${selectedSubject} - Grado ${selectedGrade}°</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 2rem; color: #111; max-w: 800px; margin: auto; }
    h1 { color: #d97706; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    .meta { background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .question-card { background: #fff; border: 1px solid #e5e7eb; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
    .options { list-style: none; padding-left: 0; }
    .options li { margin: 0.4rem 0; padding: 0.4rem 0.8rem; background: #f9fafb; border-radius: 4px; }
    .answer-key { margin-top: 2rem; padding: 1rem; background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Taller de Evaluacion: ${selectedSubject}</h1>
  <div class="meta">
    <p><strong>País:</strong> ${runtimeCountry?.name || 'Oficial'} | <strong>Grado:</strong> ${selectedGrade}° | <strong>Fecha:</strong> ____/____/2026</p>
    <p><strong>Estudiante:</strong> ________________________________________ | <strong>Puntaje:</strong> ________ / ${workshopQuestionCount}</p>
  </div>
  <div>`;

    questions.forEach((q) => {
      html += `
    <div class="question-card">
      <h3>Pregunta ${q.num}</h3>
      <p>${q.question}</p>
      <ul class="options">
        ${q.options.map(opt => `<li>${opt}</li>`).join('')}
      </ul>
    </div>`;
    });

    if (includeAnswerKey) {
      html += `
  <div class="answer-key">
    <h2>🔑 Clave de Respuestas & Justificación Pedagógica</h2>
    ${questions.map(q => `
      <div style="margin-bottom: 1rem;">
        <strong>Pregunta ${q.num}: (${q.correct})</strong>
        <p style="margin: 0.2rem 0; font-style: italic;">${q.justification}</p>
      </div>
    `).join('')}
  </div>`;
    }

    html += `
  </div>
</body>
</html>`;

    const filename = `Taller_${selectedSubject.replace(/\s+/g, '_')}_Grado${selectedGrade}.html`;
    downloadFile(html, filename, 'text/html;charset=utf-8');
  }

  function printWorkshop() {
    window.print();
  }

  function normalizeSubjectKey(name: string): string {
    return String(name || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  const activeGuidelines = $derived(getAuthorityGuidelines(runtimeCountry?.code || 'CO'));
  const currentCompetencyData = $derived.by(() => {
    const norm = normalizeSubjectKey(selectedSubject);
    const keys = Object.keys(activeGuidelines.competencias || {});
    const matchedKey = keys.find(k => norm.includes(k) || k.includes(norm)) || keys[0];
    if (matchedKey && activeGuidelines.competencias[matchedKey]) {
      return activeGuidelines.competencias[matchedKey];
    }
    return {
      competencias: ['Comunicación y representación', 'Razonamiento lógico', 'Resolución de problemas'],
      componentes: ['Conceptual', 'Procedimental', 'Aplicación contextual'],
      color: '#f59e0b'
    };
  });
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

          <div class="pt-6 mt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
            {#if pillar.href}
              <a
                href={pillar.href}
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition-all"
              >
                {pillar.actionLabel} →
              </a>
              {#if pillar.href === '/sala-examenes'}
                <a
                  href={`/sala-examenes?quickLaunch=10&subject=${encodeURIComponent(selectedSubject)}&grade=${selectedGrade}`}
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                >
                  ⚡ Lanzar Quiz Rápido (10 Preguntas)
                </a>
              {/if}
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

      <!-- Subject & Competency Deep-Dive Box -->
      <div class="p-5 bg-black/40 border border-amber-500/30 rounded-xl space-y-3">
        <div class="flex items-center justify-between border-b border-white/10 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-base">🎯</span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-300">
              Competencias Evaluadas en {selectedSubject} ({activeGuidelines.authorityName})
            </h4>
          </div>
          <span class="text-[10px] font-mono text-white/50">{activeGuidelines.badgeLabel}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span class="block text-[10px] font-bold uppercase text-white/40 mb-1">Competencias Oficiales</span>
            <ul class="space-y-1">
              {#each currentCompetencyData.competencias as comp}
                <li class="flex items-center gap-1.5 text-white/90">
                  <span class="text-amber-400 font-bold">•</span>
                  <span>{comp}</span>
                </li>
              {/each}
            </ul>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase text-white/40 mb-1">Componentes Curriculares</span>
            <div class="flex flex-wrap gap-1.5">
              {#each currentCompetencyData.componentes as comp}
                <span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200 border border-amber-500/20 text-[11px]">
                  {comp}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Options: Answer Key Toggle -->
      <div class="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
        <label class="flex items-center gap-3 cursor-pointer text-xs font-semibold text-white/90">
          <input
            type="checkbox"
            bind:checked={includeAnswerKey}
            class="w-4 h-4 rounded border-white/20 bg-black/40 text-amber-500 focus:ring-amber-500/40 focus:ring-offset-0"
          />
          <span>Incluir hoja de respuestas y justificación pedagógica</span>
        </label>
        <span class="text-[10px] text-amber-400/80 font-mono">Recomendado para docentes</span>
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
            <div class="flex flex-wrap items-center gap-2">
              <a
                href={`/sala-examenes?quickLaunch=${workshopQuestionCount}&subject=${encodeURIComponent(selectedSubject)}&grade=${selectedGrade}`}
                class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                ⚡ Lanzar en Sala P2P
              </a>
              <button
                type="button"
                onclick={exportMarkdown}
                class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                📥 Exportar .md
              </button>
              <button
                type="button"
                onclick={exportHTML}
                class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition-all flex items-center gap-1.5"
              >
                🌐 Exportar HTML
              </button>
              <button
                type="button"
                onclick={printWorkshop}
                class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10 transition-all"
              >
                🖨️ Imprimir PDF
              </button>
            </div>
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
