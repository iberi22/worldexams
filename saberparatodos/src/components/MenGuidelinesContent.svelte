<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { CURRICULUM_CO, normalizeTopic } from '../config/curriculum';
  import ReportModal from './ReportModal.svelte';

  let {
    grade = 11,
    subject = 'Matemáticas',
    period = 1
  } = $props();

  // ── Mapeo de competencias ICFES por materia ──────────────────────────────
  const ICFES_COMPETENCIAS: Record<string, { competencias: string[]; componentes: string[]; color: string }> = {
    matematicas: {
      competencias: ['Razonamiento y argumentación', 'Comunicación, representación y modelación', 'Planteamiento y resolución de problemas'],
      componentes: ['Numérico-variacional', 'Geométrico-métrico', 'Aleatorio'],
      color: '#3b82f6'
    },
    lecturacritica: {
      competencias: ['Identificar y entender contenidos', 'Comprender cómo se articulan', 'Reflexionar a partir del texto'],
      componentes: ['Semántico', 'Sintáctico', 'Pragmático'],
      color: '#8b5cf6'
    },
    cienciasnaturales: {
      competencias: ['Uso comprensivo del conocimiento científico', 'Explicación de fenómenos', 'Indagación'],
      componentes: ['Entorno vivo', 'Entorno físico', 'Ciencia, tecnología y sociedad'],
      color: '#10b981'
    },
    sociales: {
      competencias: ['Pensamiento social', 'Interpretación y análisis de perspectivas', 'Pensamiento sistémico y reflexivo'],
      componentes: ['Historia y culturas', 'Espacio, territorio y ambiente', 'Poder, economía y organizaciones sociales'],
      color: '#f59e0b'
    },
    ingles: {
      competencias: ['Pragmatic competence', 'Lexical competence', 'Grammatical competence'],
      componentes: ['Listening comprehension', 'Reading comprehension', 'Vocabulary in context'],
      color: '#ef4444'
    }
  };

  const SUBJECT_LABELS: Record<string, string> = {
    matematicas: 'Matemáticas',
    lecturacritica: 'Lectura Crítica',
    cienciasnaturales: 'Ciencias Naturales',
    sociales: 'Sociales y Ciudadanas',
    ingles: 'Inglés',
  };

  type ReferenceLink = {
    label: string;
    url: string;
    note?: string;
  };

  type ReferenceGroup = {
    title: string;
    description: string;
    tone: string;
    accent: string;
    links: ReferenceLink[];
    open?: boolean;
  };

  const REFERENCE_GROUPS: ReferenceGroup[] = [
    {
      title: 'Fuentes base',
      description: 'Puntos de partida oficiales para definir el foco curricular y la redaccion del bundle.',
      tone: 'emerald',
      accent: '#10b981',
      open: true,
      links: [
        { label: 'Derechos Basicos de Aprendizaje - Colombia Aprende', url: 'https://www.colombiaaprende.edu.co/contenidos/coleccion/derechos-basicos-de-aprendizaje' },
        { label: 'Lineamientos Curriculares MEN (PDF)', url: 'https://www.mineducacion.gov.co/1780/articles-339975_recurso_14.pdf' },
        { label: 'Derechos Basicos de Aprendizaje en todas las areas', url: 'https://www.colombiaaprende.edu.co/recurso-coleccion/derechos-basicos-de-aprendizaje-en-todas-las-areas' }
      ]
    },
    {
      title: 'PDFs descargables',
      description: 'Documentos listos para citar, archivar y usar como respaldo cuando se generen preguntas.',
      tone: 'sky',
      accent: '#38bdf8',
      links: [
        { label: 'Estandares basicos de competencias (PDF)', url: 'https://www.mineducacion.gov.co/1759/articles-340021_recurso_1.pdf' },
        { label: 'DBA Matematicas (PDF)', url: 'https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Matematicas-min.pdf' },
        { label: 'DBA Lenguaje (PDF)', url: 'https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf' },
        { label: 'DBA Ciencias Naturales (PDF)', url: 'https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_C.Naturales-min.pdf' },
        { label: 'DBA Ciencias Sociales (PDF)', url: 'https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_C.Sociales-V2.pdf' }
      ]
    },
    {
      title: 'Guias y blog ICFES',
      description: 'Piezas de divulgacion y apoyo para estudiantes que sirven como referencia viva al crear bundles.',
      tone: 'amber',
      accent: '#f59e0b',
      links: [
        { label: 'Estudiantes ICFES', url: 'https://blog.icfes.gov.co/estudiantes/' },
        { label: 'Plataformas de estudio', url: 'https://blog.icfes.gov.co/estudiantes/plataformas-de-estudio/' },
        { label: 'Audiolibros para estudiantes', url: 'https://blog.icfes.gov.co/estudiantes/audiolibros-estudiantes/' },
        { label: 'Blog ICFES', url: 'https://blog.icfes.gov.co/' }
      ]
    },
    {
      title: 'Divulgacion y comunidad',
      description: 'Lugares donde el contenido se publica, se explica o se actualiza de forma continua.',
      tone: 'violet',
      accent: '#a855f7',
      links: [
        { label: 'Blog ICFES', url: 'https://blog.icfes.gov.co/' },
        { label: 'Estudiantes ICFES', url: 'https://blog.icfes.gov.co/estudiantes/' },
        { label: 'Especiales Colombia Aprende', url: 'https://especiales.colombiaaprende.edu.co/' },
        { label: 'Colombia Aprende se transforma', url: 'https://www.mineducacion.gov.co/1780/w3-article-424299.html' },
        { label: 'Canales oficiales MEN', url: 'https://www.mineducacion.gov.co/1759/w3-printer-398295.html' }
      ]
    },
    {
      title: 'Cuentas oficiales',
      description: 'Canales institucionales para seguimiento, divulgacion y alertas de contenido nuevo.',
      tone: 'rose',
      accent: '#f43f5e',
      links: [
        { label: 'Facebook ICFES', url: 'https://www.facebook.com/icfescol' },
        { label: 'Facebook Ministerio de Educacion', url: 'https://www.facebook.com/Mineducacion' },
        { label: 'Directorio de canales MEN', url: 'https://www.mineducacion.gov.co/1759/w3-printer-398295.html' },
        { label: 'Colombia Aprende se transforma', url: 'https://www.mineducacion.gov.co/1780/w3-article-424299.html' }
      ]
    }
  ];

  // ── Derivados ────────────────────────────────────────────────────────────
  let normSubj = $derived(normalizeTopic(subject));

  let periodData = $derived.by(() => {
    if (normSubj === 'simulacrocompleto') {
      return {
        name: 'Cobertura global del Saber 11',
        topics: [
          'No usa un unico DBA; mezcla competencias de varias areas',
          'Sirve para practicar distribucion real de preguntas por componente',
          'Conviene usarlo como vista general, no como referencia curricular puntual'
        ]
      };
    }
    const gradeData = CURRICULUM_CO[grade];
    if (!gradeData) return null;
    const subjectData = gradeData[normSubj];
    if (!subjectData) return null;
    return subjectData.periods.find(p => p.id === period) ?? null;
  });

  let competencia = $derived(
    ICFES_COMPETENCIAS[normSubj] ??
    ICFES_COMPETENCIAS['cienciasnaturales'] // fallback
  );

  let subjectLabel = $derived(SUBJECT_LABELS[normSubj] ?? subject);

  let accentColor = $derived(competencia.color);
  let showReportModal = $state(false);
  let reportQuestionId = $derived(`men-guidelines-${grade}-${normSubj}-${period}`);
</script>

<div class="space-y-6 p-1">

  <!-- ── Header contextual ──────────────────────────────────────── -->
  <div class="text-center" in:fade={{ duration: 200 }}>
    <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
        Grado {grade}° · {subjectLabel} · Periodo {period}
      </span>
    </div>
    <div class="inline-block p-3 rounded-2xl mb-3 border border-white/10" style="background: {accentColor}15;">
      <span class="text-3xl">🏛️</span>
    </div>
    <h2 class="text-2xl font-black uppercase tracking-tight text-white mb-1">
      Lineamientos <span style="color: {accentColor}">M.E.N.</span>
    </h2>
    <p class="text-white/40 text-xs max-w-xs mx-auto leading-relaxed">
      Alineación curricular 2026 — Derechos Básicos de Aprendizaje vigentes
    </p>
  </div>

  <!-- ── Periodo activo ────────────────────────────────────────── -->
  {#if periodData}
    <div
      class="p-4 rounded-2xl border"
      style="background: {accentColor}10; border-color: {accentColor}30;"
      in:fly={{ y: 12, duration: 300, delay: 50 }}
    >
      <p class="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style="color: {accentColor};">
        Periodo activo — DBA
      </p>
      <h3 class="text-sm font-black text-white mb-3 leading-tight">{periodData.name}</h3>

      <div class="space-y-1.5">
        {#each periodData.topics as topic, i}
          <div
            class="flex items-center gap-2"
            in:fly={{ x: -8, duration: 200, delay: i * 40 }}
          >
            <span class="w-1 h-1 rounded-full shrink-0" style="background: {accentColor};"></span>
            <span class="text-[11px] text-white/70 capitalize">{topic.replace(/-/g, ' ')}</span>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="p-4 rounded-2xl border border-white/10 bg-white/5 text-center space-y-2">
      <p class="text-[11px] text-white/40">Sin datos DBA para esta combinación</p>
      {#if normSubj === 'simulacrocompleto'}
        <p class="text-[10px] text-white/30 leading-relaxed">
          El simulacro completo no tiene DBA propios. Si quieres ver lineamientos por contenido, cambia a una materia concreta como Matemáticas, Lectura Crítica o Ciencias Naturales.
        </p>
      {/if}
    </div>
  {/if}

  <!-- ── Competencias ICFES ────────────────────────────────────── -->
  <div in:fly={{ y: 12, duration: 300, delay: 100 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
      Competencias evaluadas — ICFES Saber
    </p>
    <div class="space-y-2">
      {#each competencia.competencias as comp, i}
        <div
          class="flex items-start gap-2 p-2.5 bg-white/5 border border-white/5 rounded-xl"
          in:fly={{ x: -8, duration: 200, delay: 150 + i * 50 }}
        >
          <span class="text-xs font-black shrink-0" style="color: {accentColor};">{i + 1}</span>
          <span class="text-[11px] text-white/70 leading-relaxed">{comp}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- ── Componentes curriculares ─────────────────────────────── -->
  <div in:fly={{ y: 12, duration: 300, delay: 160 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
      Componentes curriculares
    </p>
    <div class="flex flex-wrap gap-2">
      {#each competencia.componentes as comp}
        <span
          class="px-2.5 py-1 text-[10px] font-bold rounded-full border"
          style="color: {accentColor}; border-color: {accentColor}40; background: {accentColor}10;"
        >
          {comp}
        </span>
      {/each}
    </div>
  </div>

  <!-- ── Cómo usar esto para crear bundles ────────────────────── -->
  <div
    class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
    in:fly={{ y: 12, duration: 300, delay: 200 }}
  >
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
      Guía para crear bundles
    </p>
    <ul class="space-y-1.5">
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">Cada pregunta debe cubrir al menos uno de los tópicos DBA listados arriba.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">Los distractores deben reflejar errores conceptuales alineados con las competencias ICFES.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">El nivel de dificultad progresa v1–v10 por bundle, siguiendo la progresión evaluativa Saber.</span>
      </li>
    </ul>
  </div>

  <!-- ── Referencias oficiales ────────────────────────────────── -->
  <div in:fly={{ y: 12, duration: 300, delay: 240 }}>
    <div class="flex items-center justify-between gap-3 mb-3">
      <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 text-center">
        Referencias oficiales 2026
      </p>
      <span class="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
        Abrir en nueva pestaña
      </span>
    </div>
    <div class="space-y-3">
      {#each REFERENCE_GROUPS as group}
        <details class="group rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden" open={group.open}>
          <summary class="cursor-pointer list-none p-4 flex items-start justify-between gap-3 hover:bg-white/[0.03] transition-colors">
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2 h-2 rounded-full shrink-0" style="background: {group.accent};"></span>
                <h4 class="text-xs font-black uppercase tracking-[0.18em] text-white/80">{group.title}</h4>
              </div>
              <p class="text-[10px] leading-relaxed text-white/40">{group.description}</p>
            </div>
            <svg class="w-4 h-4 shrink-0 mt-0.5 text-white/35 transition-transform duration-200 group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </summary>
          <div class="px-4 pb-4 pt-1 space-y-2">
            {#each group.links as link}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/20 text-white/55 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all group/link"
              >
                <span class="text-[10px] font-bold leading-tight pr-3">{link.label}</span>
                <svg class="w-4 h-4 shrink-0 text-white/35 transform group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            {/each}
          </div>
        </details>
      {/each}
    </div>
  </div>

  <!-- ── Badge sync ────────────────────────────────────────────── -->
  <div class="flex items-center justify-center gap-2 pt-2">
    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: {accentColor};"></div>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
      Sincronizado con World Exams Core v1.2
    </p>
  </div>

</div>

<div class="mt-4 flex items-center justify-start">
  <div class="relative group/report inline-flex">
    <button
      onclick={() => showReportModal = true}
      class="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/45 transition-all duration-300 uppercase tracking-widest text-[9px] font-bold active:scale-95 rounded-lg"
      title="Reportar una anomalía"
      aria-label="Reportar una anomalía"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16m0-16c5.5 0 5.5 3 11 3v9c-5.5 0-5.5-3-11-3V4z" />
      </svg>
      <span class="hidden sm:inline">Reportar</span>
    </button>
    <div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-[#0a0a0a]/95 text-yellow-100 text-[10px] rounded-xl opacity-0 group-hover/report:opacity-100 transition-all duration-200 pointer-events-none border border-yellow-500/20 shadow-2xl z-50 whitespace-nowrap">
      Reportar una anomalía
    </div>
  </div>
</div>

{#if showReportModal}
  <ReportModal
    show={showReportModal}
    onClose={() => showReportModal = false}
    questionId={reportQuestionId}
    userContext="MenGuidelinesContent"
    questionData={{
      title: 'Lineamientos M.E.N. Colombia',
      grade,
      subject,
      period,
      subjectLabel,
      normSubj
    }}
  />
{/if}
