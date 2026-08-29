import type { CountryConfig } from './index';

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface InfographicStage {
  grade: string;
  title: string;
  label: string;
  subjects: string[];
}

export interface InfographicData {
  title: string;
  subtitle: string;
  description: string;
  stages: InfographicStage[];
  highlightTitle: string;
  highlightFacts: string[];
  operationalTitle: string;
  operationalNotes: string[];
}

export interface GradeCardData {
  grade: string;
  title: string;
  description: string;
  subjects: string[];
  duration: string;
  questions: string;
  highlight?: boolean;
}

export interface CompetencyArea {
  title: string;
  description: string;
  meta: string;
}

export interface CompetencyData {
  title: string;
  areas: CompetencyArea[];
  reportingTitle: string;
  resultNotes: string[];
}

export interface TipData {
  iconKey: string;
  title: string;
  description: string;
  details: string[];
}

export interface TipSectionData {
  title: string;
  tips: TipData[];
  checklistTitle: string;
  checklistSubtitle: string;
  checklistItems: string[];
  checklistFooter: string;
  strategyTitle: string;
  strategyDescription: string;
  strategySteps: { label: string; duration: string; description: string }[];
  strategyFooter: string;
}

export interface ExamGuideContent {
  variant: 'co' | 'mx' | 'generic';
  badgeLabel: string;
  badgeSourceLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  keywords: string[];
  faq: FaqEntry[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  authoritySummary: string;
  authorityUpdatedLabel: string;
  infographic?: InfographicData;
  gradesTitle?: string;
  gradeCards?: GradeCardData[];
  competencies?: CompetencyData;
  tips?: TipSectionData;
  detailSection?: {
    title: string;
    stats: { label: string; value: string; color: string }[];
    footer: string;
  };
  preuCard?: GradeCardData;
}

const guideContentByCountry: Partial<Record<CountryConfig['code'], ExamGuideContent>> = {
  CO: {
    variant: 'co',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'ICFES',
    heroTitle: 'Guia Pruebas Saber',
    heroSubtitle: 'Pruebas de Estado Saber',
    heroDescription: 'Consulta la estructura vigente de Saber 11, las competencias evaluadas y una ruta de practica enfocada en la convocatoria actual.',
    keywords: [
      'simulacro icfes',
      'simulacro saber 11',
      'preicfes gratis',
      'estructura icfes 2026',
      'competencias icfes',
      'guia saber 11',
    ],
    faq: [
      {
        question: 'Como practicar un simulacro ICFES gratis?',
        answer: 'Puedes practicar por areas, revisar retroalimentacion al finalizar y repetir los bloques donde necesites mas precision.',
      },
      {
        question: 'Este simulacro sirve para Saber 11 en Colombia?',
        answer: 'Si. Esta enfocado en estudiantes de Colombia que se preparan para Saber 11 siguiendo referencias oficiales vigentes.',
      },
      {
        question: 'Simulacro o similacro ICFES: cual es correcto?',
        answer: 'La forma correcta es simulacro ICFES.',
      },
    ],
    ctaTitle: 'Listo para practicar?',
    ctaDescription: 'Accede a preguntas verificadas, identifica tus brechas y mejora tu rendimiento con practica guiada.',
    ctaLabel: 'Iniciar Simulacro Gratuito',
    authoritySummary: 'Esta guía es evaluada y mantenida de forma abierta por la comunidad educativa de WorldExams a partir de fuentes públicas del ICFES.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
    infographic: {
      title: 'Como se organiza la evaluacion en Colombia',
      subtitle: 'Sistema de evaluacion ICFES',
      description: 'La guia publica una progresion clara: evaluaciones de seguimiento en basica y un examen de Estado en grado 11.',
      stages: [
        { grade: '3o', title: 'Saber 3', label: 'Diagnostico temprano', subjects: ['Matematicas', 'Lenguaje'] },
        { grade: '5o', title: 'Saber 5', label: 'Cierre de primaria', subjects: ['Matematicas', 'Lenguaje', 'Ciencias Naturales'] },
        { grade: '7o', title: 'Saber 7', label: 'Seguimiento intermedio', subjects: ['Matematicas', 'Lectura', 'Ciudadania'] },
        { grade: '9o', title: 'Saber 9', label: 'Cierre de basica secundaria', subjects: ['Matematicas', 'Lenguaje', 'Ciencias'] },
        { grade: '11o', title: 'Saber 11', label: 'Examen de Estado', subjects: ['Lectura Critica', 'Matematicas', 'Sociales', 'Ciencias', 'Ingles'] },
      ],
      highlightTitle: 'Lo mas importante de Saber 11',
      highlightFacts: [
        '5 pruebas calificables',
        '230 preguntas calificables',
        '278 con cuestionario socioeconomico',
        '2 sesiones de 4 horas y 30 minutos',
      ],
      operationalTitle: 'Lectura operativa',
      operationalNotes: [
        'La pagina es una referencia visual, no reemplaza la citacion ni el calendario oficial.',
        'Si una convocatoria cambia, los datos de ICFES deben prevalecer sobre cualquier tarjeta interna.',
        'La composicion del examen 11 se mantiene centrada en cinco pruebas y un cuestionario adicional.',
      ],
    },
    gradesTitle: 'Que evalua el sistema por grado',
    gradeCards: [
      {
        grade: '3o',
        title: 'Saber 3',
        description: 'Seguimiento temprano de aprendizajes base en primaria.',
        subjects: ['Matematicas', 'Lenguaje'],
        duration: 'Sesion oficial',
        questions: '80 a 100 reactivos aproximados',
      },
      {
        grade: '5o',
        title: 'Saber 5',
        description: 'Control de competencias basicas al cierre de primaria.',
        subjects: ['Matematicas', 'Lenguaje', 'Ciencias Naturales'],
        duration: 'Sesion unica',
        questions: 'Segun convocatoria',
      },
      {
        grade: '7o',
        title: 'Saber 7',
        description: 'Punto de control intermedio para secundaria.',
        subjects: ['Matematicas', 'Lectura Critica', 'Habilidades Ciudadanas'],
        duration: 'Jornada oficial',
        questions: 'Estructura variable',
      },
      {
        grade: '9o',
        title: 'Saber 9',
        description: 'Evaluacion de cierre de basica secundaria.',
        subjects: ['Matematicas', 'Lenguaje', 'Ciencias', 'Habilidades Ciudadanas'],
        duration: 'Sesion oficial',
        questions: 'Consulta oficial vigente',
      },
      {
        grade: '11o',
        title: 'Saber 11',
        description: 'Examen de Estado para estudiantes de grado 11 y poblacion habilitada.',
        subjects: ['Lectura Critica', 'Matematicas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Ingles'],
        duration: '9 horas en dos sesiones',
        questions: '230 calificables / 278 con cuestionario',
        highlight: true,
      },
    ],
    competencies: {
      title: 'Competencias clave',
      areas: [
        {
          title: 'Matematicas',
          description: 'Evalua interpretacion y representacion, formulacion y ejecucion, y argumentacion a partir de situaciones autenticas.',
          meta: 'Referencia oficial: tres competencias distribuidas por la guia vigente.',
        },
        {
          title: 'Lectura critica',
          description: 'Evalua identificar informacion, comprender relaciones dentro del texto y reflexionar sobre forma y contenido.',
          meta: 'El foco esta en comprension e interpretacion, no en opiniones libres.',
        },
        {
          title: 'Sociales y ciudadanas',
          description: 'Evalua pensamiento social, analisis de perspectivas y razonamiento sobre problemas publicos y contexto historico.',
          meta: 'Las preguntas piden lectura de contexto y uso de informacion.',
        },
        {
          title: 'Ciencias naturales',
          description: 'Evalua explicacion de fenomenos, uso comprensivo del conocimiento cientifico e indagacion.',
          meta: 'La guia oficial prioriza explicacion y aplicacion de conceptos.',
        },
        {
          title: 'Ingles',
          description: 'Evalua comprension lectora y uso del idioma en contexto con niveles de desempeno reportados en el informe.',
          meta: 'El resultado se interpreta por niveles, no por una sola escala global.',
        },
      ],
      reportingTitle: 'Como reporta resultados el ICFES',
      resultNotes: [
        'El puntaje global, los percentiles y los niveles por prueba aparecen en el reporte individual.',
        'El examen reporta desempenos por componente; conviene revisar la lectura de cada area por separado.',
        'Cuando una convocatoria cambia, la guia oficial del ICFES prevalece sobre cualquier resumen interno.',
      ],
    },
    preuCard: {
      grade: 'PreU',
      title: 'Preuniversitario',
      description: 'Ruta adicional para admision universitaria con simulacros y blueprints especificos.',
      subjects: ['Diagnostico', 'Practica por componente', 'Simulacro realista', 'Overlay por carrera'],
      duration: 'Modulos de tiempo real',
      questions: '20 a 120 preguntas',
      highlight: true,
    },
    tips: {
      title: 'Estrategias y recomendaciones',
      tips: [
        {
          iconKey: 'planifica',
          title: 'Define un plan realista',
          description: 'Arma un cronograma de 8 a 12 semanas con bloques cortos y objetivos medibles.',
          details: ['Estudia de 2 a 3 horas diarias', 'Alterna materias y evita saturarte', 'Cierra cada bloque con una meta concreta'],
        },
        {
          iconKey: 'simulacros',
          title: 'Practica con tiempo controlado',
          description: 'Resuelve simulacros completos y revisa el tiempo por seccion para detectar cuellos de botella.',
          details: ['Haz al menos un simulacro semanal', 'Corrige de inmediato los errores', 'Mide velocidad y precision por area'],
        },
        {
          iconKey: 'lectura',
          title: 'Lee todos los dias',
          description: 'La lectura sostenida mejora comprension, inferencia y manejo de instrucciones largas.',
          details: ['Reserva 20 a 30 minutos diarios', 'Combina noticias, ensayos y textos cortos', 'Resume cada lectura en una idea central'],
        },
        {
          iconKey: 'matematicas',
          title: 'Entrena con razonamiento',
          description: 'No memorices procedimientos aislados. Resuelve problemas y explica por que una respuesta funciona.',
          details: ['Practica algebra, geometria y estadistica', 'Escribe el procedimiento antes de responder', 'Revisa errores frecuentes y patrones'],
        },
        {
          iconKey: 'bienestar',
          title: 'Cuida energia y descanso',
          description: 'Dormir y comer bien impacta memoria, atencion y toma de decisiones durante la prueba.',
          details: ['Asegura 7 a 8 horas de sueno', 'Evita cambios bruscos el dia previo', 'Mantente hidratado y llega con margen'],
        },
        {
          iconKey: 'examen',
          title: 'Prepara el dia del examen',
          description: 'Revisa citacion, documentos y elementos permitidos con anticipacion.',
          details: ['Verifica sede, jornada y hora', 'Lleva documento y citacion', 'Revisa lo que si y no puedes ingresar'],
        },
      ],
      checklistTitle: 'Checklist',
      checklistSubtitle: 'Dia del examen',
      checklistItems: [
        'Documento de identidad vigente',
        'Citacion consultada previamente',
        'Ruta hacia la sede confirmada',
        'Elementos permitidos verificados',
        'Tiempo suficiente para llegar',
        'Descanso adecuado la noche anterior',
      ],
      checklistFooter: 'La prioridad es simple: llegar con todo verificado y dejar cero decisiones logisticas para el ultimo momento.',
      strategyTitle: 'Estrategia de tiempo por sesion',
      strategyDescription: 'Usa una primera pasada rapida para asegurar respuestas obvias y reserva el tramo final para revisar las mas dificiles.',
      strategySteps: [
        { label: 'Revisar', duration: '10 min', description: 'Lee todo rapido y marca las preguntas mas seguras.' },
        { label: 'Resolver', duration: 'Mayor parte del tiempo', description: 'Avanza por las preguntas de mayor confianza y evita atascarte.' },
        { label: 'Revisar al final', duration: 'Ultimos minutos', description: 'Retoma las dificiles solo si el tiempo restante lo permite.' },
      ],
      strategyFooter: 'Tip: la estrategia sirve como apoyo de practica; para materiales, horarios y reglas de ingreso, siempre prevalece la citacion oficial.',
    },
  },
  MX: {
    variant: 'mx',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'CENEVAL',
    heroTitle: 'Guia Completa EXANI-II',
    heroSubtitle: 'Examen Nacional de Ingreso a la Educacion Superior',
    heroDescription: 'Domina la estructura del EXANI-II, sus modulos y los componentes transversales con una ruta de practica mas clara.',
    keywords: [
      'guia exani ii',
      'simulacro exani',
      'practica ceneval',
      'admision universitaria mexico',
      'planea mexico',
    ],
    faq: [
      {
        question: 'Para quien sirve esta guia EXANI-II?',
        answer: 'Para aspirantes que necesitan entender estructura, componentes y practica antes de presentar examenes de admision en Mexico.',
      },
      {
        question: 'Esta guia reemplaza la convocatoria oficial?',
        answer: 'No. Siempre debes validar fechas, puntajes y modulos contra la institucion y la fuente oficial vigente.',
      },
    ],
    ctaTitle: 'Listo para practicar?',
    ctaDescription: 'Activa una ruta de practica por componente y entiende mejor como se estructura tu examen objetivo.',
    ctaLabel: 'Iniciar Practica Guiada',
    authoritySummary: 'Esta guía es evaluada y mantenida de forma abierta por la comunidad educativa de WorldExams a partir de fuentes públicas del CENEVAL y EXANI.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
    gradesTitle: 'Estructura general del examen',
    gradeCards: [
      {
        grade: 'A',
        title: 'Transversales',
        description: 'Habilidades fundamentales para todos los aspirantes.',
        subjects: ['Comprension Lectora', 'Redaccion Indirecta', 'Pensamiento Matematico'],
        duration: 'Base del examen',
        questions: '90 preguntas',
        highlight: true,
      },
      {
        grade: 'B',
        title: 'Modulos especificos',
        description: 'Conocimientos ligados a la carrera o institucion.',
        subjects: ['Modulo 1', 'Modulo 2', 'Ejemplos por area'],
        duration: 'Varia segun carrera',
        questions: '48 preguntas',
      },
      {
        grade: 'C',
        title: 'Diagnostico',
        description: 'Informacion adicional fuera del puntaje principal.',
        subjects: ['Ingles', 'Reactivos piloto'],
        duration: 'Seccion final',
        questions: '30 preguntas',
      },
    ],
    detailSection: {
      title: 'EXANI-II en detalle',
      stats: [
        { label: 'Habilidades transversales', value: '54%', color: 'emerald' },
        { label: 'Modulos especificos', value: '28%', color: 'blue' },
        { label: 'Ingles diagnostico', value: '18%', color: 'purple' },
      ],
      footer: 'Total: 168 preguntas | Duracion: 4.5 horas',
    },
    preuCard: {
      grade: 'PreU',
      title: 'Preuniversitario MX',
      description: 'Ruta enfocada en los modulos especificos y transversales de EXANI-II.',
      subjects: ['Simulacro EXANI-II', 'Modulos especificos', 'Comprension lectora', 'Pensamiento matematico'],
      duration: 'Sesion controlada',
      questions: '168 reactivos',
      highlight: true,
    },
  },
  AR: {
    variant: 'generic',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'Ministerio de Educación',
    heroTitle: 'Guia Completa APRENDER',
    heroSubtitle: 'Evaluación Nacional Aprender',
    heroDescription: 'Conoce la estructura base, las competencias y una ruta inicial de practica para la Evaluación Aprender en Argentina.',
    keywords: [
      'guia aprender',
      'simulacro aprender argentina',
      'evaluacion nacional aprender',
      'practica aprender',
    ],
    faq: [
      {
        question: '¿Para quién sirve esta guía APRENDER?',
        answer: 'Para estudiantes y docentes que necesitan entender la estructura y practicar para la evaluación nacional en Argentina.',
      },
      {
        question: '¿La estructura ya esta final para este país?',
        answer: 'Todavia no. Esta plantilla comparte runtime y tenanting mientras se completa la capa de contenido localizado.',
      },
    ],
    ctaTitle: '¿Listo para practicar?',
    ctaDescription: 'Activa una ruta de practica por componente y entiende mejor como se estructura tu examen objetivo.',
    ctaLabel: 'Iniciar Práctica',
    authoritySummary: 'Esta guía es evaluada de forma abierta por la comunidad educativa de WorldExams a partir de información pública del Ministerio de Educación de la Nación.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
  },
  CL: {
    variant: 'generic',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'Agencia de Calidad de la Educación',
    heroTitle: 'Guia Completa SIMCE',
    heroSubtitle: 'Sistema Nacional de Evaluación de Resultados de Aprendizaje',
    heroDescription: 'Conoce la estructura base, las competencias y una ruta inicial de practica para el SIMCE en Chile.',
    keywords: [
      'guia simce',
      'simulacro simce chile',
      'practica simce',
      'agencia de calidad educacion',
    ],
    faq: [
      {
        question: '¿Cómo practicar para el SIMCE?',
        answer: 'Usa la experiencia compartida del producto y luego profundiza con contenido localizado para Chile.',
      },
      {
        question: '¿La estructura ya esta final para este país?',
        answer: 'Todavia no. Esta plantilla comparte runtime y tenanting mientras se completa la capa de contenido localizado.',
      },
    ],
    ctaTitle: '¿Listo para practicar?',
    ctaDescription: 'Activa una ruta de practica por componente y entiende mejor como se estructura tu examen objetivo.',
    ctaLabel: 'Iniciar Práctica',
    authoritySummary: 'Esta guía es evaluada de forma abierta por la comunidad educativa de WorldExams a partir de información pública de la Agencia de Calidad de la Educación.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
    preuCard: {
      grade: 'PreU',
      title: 'Preuniversitario PAES',
      description: 'Ruta de entrenamiento para la Prueba de Acceso a la Educación Superior.',
      subjects: ['Comprensión Lectora', 'Competencia Matemática 1', 'Competencia Matemática 2', 'Ciencias/Historia'],
      duration: 'Módulos oficiales',
      questions: 'Variable según prueba',
      highlight: true,
    },
  },
  PE: {
    variant: 'generic',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'MINEDU',
    heroTitle: 'Guia Completa ECE',
    heroSubtitle: 'Evaluación Censal de Estudiantes',
    heroDescription: 'Conoce la estructura base, las competencias y una ruta inicial de practica para la Evaluación ECE en Perú.',
    keywords: [
      'guia ece peru',
      'simulacro ece',
      'practica ece minedu',
    ],
    faq: [
      {
        question: '¿Cómo practicar para el ECE?',
        answer: 'Usa la experiencia compartida del producto y luego profundiza con contenido localizado para Perú.',
      },
      {
        question: '¿La estructura ya esta final para este país?',
        answer: 'Todavia no. Esta plantilla comparte runtime y tenanting mientras se completa la capa de contenido localizado.',
      },
    ],
    ctaTitle: '¿Listo para practicar?',
    ctaDescription: 'Activa una ruta de practica por componente y entiende mejor como se estructura tu examen objetivo.',
    ctaLabel: 'Iniciar Práctica',
    authoritySummary: 'Esta guía es evaluada de forma abierta por la comunidad educativa de WorldExams a partir de información pública del MINEDU.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
    preuCard: {
      grade: 'PreU',
      title: 'Preuniversitario UNMSM/UNI',
      description: 'Entrenamiento para exámenes de admisión de universidades nacionales.',
      subjects: ['Habilidad Verbal', 'Habilidad Matemática', 'Conocimientos', 'Simulacro DECO'],
      duration: 'Sesión intensiva',
      questions: '100 reactivos',
      highlight: true,
    },
  },
  EC: {
    variant: 'generic',
    badgeLabel: 'Guia verificada con fuentes oficiales',
    badgeSourceLabel: 'SENESCYT',
    heroTitle: 'Guia Completa SENESCYT',
    heroSubtitle: 'Examen de Acceso a la Educación Superior',
    heroDescription: 'Conoce la estructura base, las competencias y una ruta inicial de practica para el examen de la SENESCYT en Ecuador.',
    keywords: [
      'guia senescyt',
      'simulacro senescyt',
      'practica senescyt ecuador',
    ],
    faq: [
      {
        question: '¿Cómo practicar para la SENESCYT?',
        answer: 'Usa la experiencia compartida del producto y luego profundiza con contenido localizado para Ecuador.',
      },
      {
        question: '¿La estructura ya esta final para este país?',
        answer: 'Todavia no. Esta plantilla comparte runtime y tenanting mientras se completa la capa de contenido localizado.',
      },
    ],
    ctaTitle: '¿Listo para practicar?',
    ctaDescription: 'Activa una ruta de practica por componente y entiende mejor como se estructura tu examen objetivo.',
    ctaLabel: 'Iniciar Práctica',
    authoritySummary: 'Esta guía es evaluada de forma abierta por la comunidad educativa de WorldExams a partir de información pública de la SENESCYT.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
    preuCard: {
      grade: 'PreU',
      title: 'Preuniversitario Ecuador',
      description: 'Ruta para el examen de ingreso a la educación superior pública.',
      subjects: ['Razonamiento Verbal', 'Razonamiento Numérico', 'Razonamiento Lógico', 'Atención y Concentración'],
      duration: 'Sesión rápida',
      questions: '80 a 120 preguntas',
      highlight: true,
    },
  },
  BR: {
    variant: 'generic',
    badgeLabel: 'Guia verificada con fuentes oficiais',
    badgeSourceLabel: 'INEP',
    heroTitle: 'Guia Completa ENEM',
    heroSubtitle: 'Exame Nacional do Ensino Médio',
    heroDescription: 'Conheça a estrutura base, as competências e uma rota inicial de prática para o ENEM no Brasil.',
    keywords: [
      'guia enem',
      'simulado enem brasil',
      'pratica enem',
    ],
    faq: [
      {
        question: 'Como praticar para o ENEM?',
        answer: 'Use a experiência compartilhada do produto e depois aprofunde com conteúdo localizado para o Brasil.',
      },
      {
        question: 'A estrutura já está final para este país?',
        answer: 'Ainda não. Este template compartilha runtime e tenanting enquanto se completa a camada de conteúdo localizado.',
      },
    ],
    ctaTitle: 'Pronto para praticar?',
    ctaDescription: 'Ative uma rota de prática por componente e entenda melhor como seu exame alvo é estruturado.',
    ctaLabel: 'Iniciar Prática',
    authoritySummary: 'Este guia é avaliado de forma aberta pela comunidade educativa do WorldExams a partir de informações públicas do INEP.',
    authorityUpdatedLabel: 'Atualizado abril 2026',
  },
};

export function getExamGuideContent(countryConfig: CountryConfig): ExamGuideContent {
  const content = guideContentByCountry[countryConfig.code];
  if (content) return content;

  const preuCard: GradeCardData = {
    grade: 'PreU',
    title: `Preuniversitario ${countryConfig.code}`,
    description: `Ruta adicional para admision universitaria en ${countryConfig.name}.`,
    subjects: ['Diagnostico', 'Practica por componente', 'Simulacro realista'],
    duration: 'Modulos adaptados',
    questions: 'Estructura variable',
    highlight: true,
  };

  return {
    variant: 'generic',
    badgeLabel: 'Guia de examen por tenant',
    badgeSourceLabel: countryConfig.examAuthority,
    heroTitle: `Guia ${countryConfig.product.guideLabel}`,
    heroSubtitle: countryConfig.examFullName,
    heroDescription: `Conoce la estructura base, las competencias y una ruta inicial de practica para ${countryConfig.name}.`,
    keywords: countryConfig.product.seoKeywords,
    faq: [
      {
        question: `¿Cómo practicar para ${countryConfig.product.guideLabel}?`,
        answer: `Usa la experiencia compartida del producto y luego profundiza con contenido localizado para ${countryConfig.name}.`,
      },
      {
        question: 'La estructura ya esta final para este pais?',
        answer: 'Todavia no. Esta plantilla comparte runtime y tenanting mientras se completa la capa de contenido localizado.',
      },
    ],
    ctaTitle: 'Listo para practicar?',
    ctaDescription: `Explora la experiencia base del producto mientras se completa la localizacion de ${countryConfig.name}.`,
    ctaLabel: 'Explorar Practica',
    authoritySummary: `Esta guía es evaluada de forma abierta por la comunidad educativa de WorldExams a partir de información pública de ${countryConfig.examAuthority}.`,
    authorityUpdatedLabel: 'Actualizado abril 2026',
    preuCard,
  };
}
