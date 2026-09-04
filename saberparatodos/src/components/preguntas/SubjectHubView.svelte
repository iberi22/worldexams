<script lang="ts">
  import { fade } from 'svelte/transition';
  import BundleList from './BundleList.svelte';
  import TeacherToolkit from '../docentes/TeacherToolkit.svelte';
  import { getAuthorityGuidelines } from '../../config/authority-guidelines';
  import { CURRICULUM_CO, normalizeTopic } from '../../config/curriculum';

  interface ListBundle {
    id: string;
    country: string;
    countryName?: string;
    flag?: string;
    subject: string;
    gradeSlug: string;
    grade: number | null;
    week: string;
    tema: string;
    total: number;
    url: string;
  }

  interface Props {
    countryCode?: string;
    countryName?: string;
    countryFlag?: string;
    examName?: string;
    gradeSlug?: string;
    gradeNum?: number | null;
    subjectSlug?: string;
    subjectName?: string;
    bundles?: ListBundle[];
    runtimeCountry?: any;
  }

  let {
    countryCode = 'CO',
    countryName = 'Colombia',
    countryFlag = '🇨🇴',
    examName = 'ICFES Saber 11',
    gradeSlug = 'grado-11',
    gradeNum = 11,
    subjectSlug = 'matematicas',
    subjectName = 'Matemáticas',
    bundles = [],
    runtimeCountry = undefined,
  }: Props = $props();

  let activeRole = $state<'student' | 'teacher'>('student');

  const authorityGuidelines = $derived(getAuthorityGuidelines((countryCode || 'CO').toUpperCase() as any));

  // Determine periods from curriculum if available
  const curriculumPeriods = $derived.by(() => {
    const numericGrade = gradeNum || 11;
    const gradeMap = CURRICULUM_CO[numericGrade];
    if (!gradeMap) return [];

    const normSub = (subjectSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const matchedKey = Object.keys(gradeMap).find((k) => k.replace(/[^a-z0-9]/g, '').includes(normSub) || normSub.includes(k.replace(/[^a-z0-9]/g, '')));

    if (matchedKey && gradeMap[matchedKey]?.periods) {
      return gradeMap[matchedKey].periods;
    }
    return [
      { id: 1, name: 'Periodo 1: Fundamentos y Conceptos Clave', topics: ['Conceptos básicos', 'Lógica inicial', 'Planteamiento de problemas'] },
      { id: 2, name: 'Periodo 2: Desarrollo y Aplicación Analítica', topics: ['Modelación', 'Procedimientos estándar', 'Interpretación'] },
      { id: 3, name: 'Periodo 3: Profundización y Razonamiento', topics: ['Análisis crítico', 'Resolución compleja', 'Evaluación de hipótesis'] },
      { id: 4, name: 'Periodo 4: Integración Curricular y Simulacro', topics: ['Pruebas integradas', 'Tiempo de respuesta', 'Análisis de distractores'] }
    ];
  });

  // Subject-specific common misconceptions and distractor traps
  const commonMisconceptions = $derived.by(() => {
    const s = (subjectSlug || '').toLowerCase();
    if (s.includes('mat')) {
      return [
        {
          title: '⚠️ Confusión de Signos y Operaciones Inversas',
          description: 'Olvidar invertir el signo de desigualdad al multiplicar o dividir por un número negativo en inecuaciones.',
          remedy: 'Recuerda verificar con un número de prueba dentro del intervalo solución.'
        },
        {
          title: '⚠️ Errores Dimensionales y de Unidades',
          description: 'Confundir unidades de longitud (cm), área (cm²) y volumen (cm³) o no realizar la conversión previa.',
          remedy: 'Convierte todas las dimensiones a la misma unidad antes de calcular áreas o volúmenes.'
        },
        {
          title: '⚠️ Mala Interpretación de Gráficas de Frecuencia',
          description: 'Confundir el valor de la variable en el eje X con la frecuencia acumulada en el eje Y al hallar la mediana.',
          remedy: 'Ubica primero el 50% de la población acumulada para encontrar la posición mediana.'
        }
      ];
    } else if (s.includes('lect') || s.includes('lengu') || s.includes('espa')) {
      return [
        {
          title: '⚠️ Distractor de Sobregeneralización',
          description: 'Elegir una opción que afirma una verdad universal no respaldada ni contenida en el texto.',
          remedy: 'Cíñete estrictamente a las premisas y evidencias aportadas por el autor.'
        },
        {
          title: '⚠️ Confusión entre Inferencia y Suposición',
          description: 'Asumir conclusiones basadas en prejuicios personales en lugar de deducciones lógicas del texto.',
          remedy: 'Toda inferencia correcta debe apoyarse directamente en una pista explícita del escrito.'
        },
        {
          title: '⚠️ Desatención al Tono o Intención del Autor',
          description: 'Tomar literalmente afirmaciones irónicas, satíricas o hiperbólicas del ensayo.',
          remedy: 'Analiza la postura crítica y la tipología del texto antes de responder.'
        }
      ];
    } else if (s.includes('cienc') || s.includes('fisi') || s.includes('quim') || s.includes('bio')) {
      return [
        {
          title: '⚠️ Confusión entre Calor y Temperatura',
          description: 'Tratar el calor (energía térmica en tránsito) y la temperatura (medida de la energía cinética promedio de las partículas) como sinónimos.',
          remedy: 'El calor se transfiere entre cuerpos debido a una diferencia de temperatura; la temperatura mide el nivel térmico intrínseco.'
        },
        {
          title: '⚠️ Confusión entre Masa y Peso',
          description: 'Tratar la masa (propiedad intrínseca en kg) y el peso (fuerza gravitacional en N) como conceptos idénticos.',
          remedy: 'La masa permanece constante en cualquier lugar; el peso varía proporcionalmente con la gravedad (W = m·g).'
        },
        {
          title: '⚠️ Explicación Lamarckiana vs. Selección Natural Darwiniana',
          description: 'Atribuir la evolución a modificaciones adquiridas por "necesidad u uso del individuo" (Lamarck) en lugar de la selección de variaciones fenotípicas preexistentes (Darwin).',
          remedy: 'La selección natural actúa sobre variantes genéticas heredables en la población, no sobre cambios adquiridos individualmente durante la vida.'
        },
        {
          title: '⚠️ Aislamiento Incorrecto de Variables en Experimentos',
          description: 'Atribuir cambios en el resultado a una variable de estudio sin haber mantenido constantes las variables de control.',
          remedy: 'En un experimento válido solo se altera una variable independiente a la vez mientras se controlan las demás.'
        }
      ];
    } else if (s.includes('soc') || s.includes('hist') || s.includes('ciudad')) {
      return [
        {
          title: '⚠️ Anacronismo Histórico',
          description: 'Juzgar hechos, valores o decisiones del pasado utilizando categorías, tecnologías o normas morales del presente.',
          remedy: 'Contextualiza cada acontecimiento dentro del marco temporal, cultural e ideológico de su propia época.'
        },
        {
          title: '⚠️ Sesgo de Causa Única (Monocausalidad)',
          description: 'Reducir un proceso histórico, social o económico complejo a una sola causa simplificada.',
          remedy: 'Analiza los factores multicausales (políticos, económicos, sociales y culturales) que interactúan en el proceso.'
        },
        {
          title: '⚠️ Confusión de Poderes del Estado y Mecanismos Constitucionales',
          description: 'Atribuir funciones legislativas o judiciales al poder ejecutivo, o confundir instrumentos de protección de derechos (ej: Acción de Tutela vs Acción Popular).',
          remedy: 'Diferencia claramente las funciones constitucionales de cada rama y el ámbito de protección individual vs colectivo.'
        }
      ];
    } else {
      return [
        {
          title: '⚠️ Falsos Amigos Comunes (False Friends)',
          description: 'Traducir literalmente falsos cognados comunes como "actually" (en realidad, no actualmente), "embarrassed" (avergonzado/a, no embarazada) o "library" (biblioteca, no librería).',
          remedy: 'Verifica el significado contextual en inglés sin asumir la equivalencia morfológica directa con el español.'
        },
        {
          title: '⚠️ Errores de Tiempos y Aspectos Verbales',
          description: 'Confundir acciones concluidas en el pasado simple (Past Simple) con acciones iniciadas en el pasado con relevancia en el presente (Present Perfect).',
          remedy: 'Identifica las señales temporales del contexto (ej: "yesterday" o "in 2010" vs "since", "for", "already").'
        },
        {
          title: '⚠️ Desatención a Conectores Discursivos y Cohesión Textual',
          description: 'Malinterpretar la relación lógica entre oraciones al ignorar conectores de contraste, causa o consecuencia (however, despite, furthermore, therefore).',
          remedy: 'Presta atención a las transiciones para identificar si la idea secundaria apoya, contradice o complementa la idea principal.'
        }
      ];
    }
  });

  const matchedCompetencyData = $derived.by(() => {
    const keys = Object.keys(authorityGuidelines.competencias || {});
    const normSub = (subjectSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const matchedKey = keys.find((k) => normSub.includes(k) || k.includes(normSub)) || keys[0];
    if (matchedKey && authorityGuidelines.competencias[matchedKey]) {
      return authorityGuidelines.competencias[matchedKey];
    }
    return {
      competencias: ['Comunicación y representación', 'Razonamiento y argumentación', 'Planteamiento y resolución de problemas'],
      componentes: ['Conceptual', 'Procedimental', 'Aplicación en contexto'],
      color: '#10b981'
    };
  });
</script>

<div class="space-y-8">
  <!-- Top Switcher Bar -->
  <div class="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-700/80 rounded-2xl shadow-lg">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono text-slate-400 uppercase tracking-wider px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
        Perspectiva de Aprendizaje
      </span>
    </div>

    <div class="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
      <button
        type="button"
        onclick={() => (activeRole = 'student')}
        aria-pressed={activeRole === 'student'}
        class={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
          activeRole === 'student'
            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
        }`}
      >
        <span>🎓</span>
        <span>Para Estudiantes</span>
      </button>

      <button
        type="button"
        onclick={() => (activeRole = 'teacher')}
        aria-pressed={activeRole === 'teacher'}
        class={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
          activeRole === 'teacher'
            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
        }`}
      >
        <span>🧑‍🏫</span>
        <span>Para Profesores</span>
      </button>
    </div>
  </div>

  <!-- PERSPECTIVE: ESTUDIANTE -->
  {#if activeRole === 'student'}
    <div class="space-y-8" in:fade={{ duration: 200 }}>
      <!-- Concept Map & Curricular Progress Grid -->
      <section class="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              🗺️ Mapa de Conceptos Evaluados
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1">
              Contenidos y Periodos de {subjectName} (Grado {gradeNum || 11}°)
            </h2>
          </div>
          <a
            href={`/sala-examenes?quickLaunch=10&subject=${encodeURIComponent(subjectName)}&grade=${gradeNum || 11}`}
            class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
          >
            ⚡ Iniciar Práctica Rápida (10 Preguntas)
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each curriculumPeriods as period}
            <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/50 hover:border-emerald-500/40 transition flex flex-col justify-between space-y-3">
              <div>
                <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Periodo {period.id}
                </span>
                <h3 class="text-sm font-bold text-white mt-1 leading-snug">{period.name}</h3>
              </div>
              <ul class="space-y-1.5 pt-2 border-t border-slate-800">
                {#each period.topics as topic}
                  <li class="flex items-start gap-1.5 text-xs text-slate-300">
                    <span class="text-emerald-400 font-bold">•</span>
                    <span>{topic}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </section>

      <!-- Common Misconceptions & Distractor Traps -->
      <section class="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="border-b border-slate-700/60 pb-4">
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            💡 Análisis Pedagógico de Trampas
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1">
            Errores Comunes Frecuentes en {subjectName}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            Identifica las distracciones típicas diseñadas en los exámenes oficiales ({authorityGuidelines.authorityName}) para evitarlas durante la prueba.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each commonMisconceptions as item}
            <div class="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-3 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-sm font-bold text-amber-300 leading-snug">{item.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
              <div class="pt-3 border-t border-slate-800 text-[11px] text-emerald-300/90 font-medium bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                <strong class="text-emerald-400 block mb-0.5">✔ Estrategia sugerida:</strong>
                {item.remedy}
              </div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Weekly Bundles List -->
      <section class="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              📚 Banco de Práctica Semanal
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1">
              Simulacros y Guías Semanales de {subjectName}
            </h2>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            {bundles.length} bundles disponibles
          </span>
        </div>

        <BundleList
          bundles={bundles}
          label={`${subjectName} Grado ${gradeNum || 11}°`}
        />
      </section>
    </div>
  {/if}

  <!-- PERSPECTIVE: DOCENTE -->
  {#if activeRole === 'teacher'}
    <div class="space-y-8" in:fade={{ duration: 200 }}>
      <!-- Exam Competency Matrix Header -->
      <section class="bg-slate-800/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              🧑‍🏫 Matriz de Competencias Curriculares
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1">
              Estándares Educativos — {authorityGuidelines.authorityName}
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1">
              {authorityGuidelines.badgeLabel}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-5 bg-slate-900/80 border border-slate-700/60 rounded-2xl space-y-3">
            <h3 class="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>🎯</span>
              <span>Competencias Evaluadas</span>
            </h3>
            <ul class="space-y-2 text-xs text-slate-200">
              {#each matchedCompetencyData.competencias as comp}
                <li class="flex items-start gap-2 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/40">
                  <span class="text-amber-400 font-bold">•</span>
                  <span>{comp}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="p-5 bg-slate-900/80 border border-slate-700/60 rounded-2xl space-y-3">
            <h3 class="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <span>🧩</span>
              <span>Componentes / Dominios Curriculares</span>
            </h3>
            <div class="flex flex-wrap gap-2 pt-1">
              {#each matchedCompetencyData.componentes as comp}
                <span class="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                  {comp}
                </span>
              {/each}
            </div>
            <p class="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              Las evaluaciones combinan estos componentes para asegurar una cobertura equilibrada de saberes teóricos y aplicados.
            </p>
          </div>
        </div>
      </section>

      <!-- Embedded Printable Workshop Generator -->
      <section class="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="border-b border-slate-700/60 pb-4">
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            🛠️ Herramientas de Aula e Impresión
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1">
            Generador de Talleres & Evaluaciones Imprimibles
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            Exporta talleres en Markdown (.md), páginas web HTML o imprime directamente en PDF con clave de respuestas y justificación pedagógica.
          </p>
        </div>

        <TeacherToolkit
          runtimeCountry={runtimeCountry}
          initialSubject={subjectName}
          initialGrade={gradeNum || 11}
        />
      </section>
    </div>
  {/if}
</div>
