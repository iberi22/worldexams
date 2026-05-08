import type { CountryConfig } from './index';

export interface FaqEntry {
  question: string;
  answer: string;
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
    authoritySummary: 'Esta guia sintetiza la informacion publica del ICFES y la organiza en una experiencia de estudio mas accionable.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
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
    authoritySummary: 'Esta guia resume estructura y criterios de practica a partir de referencias publicas del ecosistema EXANI y CENEVAL.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
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
    authoritySummary: 'Esta guia usa la plantilla compartida del producto y la metadata actual del Ministerio de Educación de la Nación.',
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
    authoritySummary: 'Esta guia usa la plantilla compartida del producto y la metadata actual de la Agencia de Calidad de la Educación.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
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
    authoritySummary: 'Esta guia usa la plantilla compartida del producto y la metadata actual del MINEDU.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
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
    authoritySummary: 'Esta guia usa la plantilla compartida del producto y la metadata actual de la SENESCYT.',
    authorityUpdatedLabel: 'Actualizado abril 2026',
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
    authoritySummary: 'Este guia usa o template compartilhado do produto e os metadados atuais do INEP.',
    authorityUpdatedLabel: 'Atualizado abril 2026',
  },
};

export function getExamGuideContent(countryConfig: CountryConfig): ExamGuideContent {
  return guideContentByCountry[countryConfig.code] || {
    variant: 'generic',
    badgeLabel: 'Guia de examen por tenant',
    badgeSourceLabel: countryConfig.examAuthority,
    heroTitle: `Guia ${countryConfig.product.guideLabel}`,
    heroSubtitle: countryConfig.examFullName,
    heroDescription: `Conoce la estructura base, las competencias y una ruta inicial de practica para ${countryConfig.name}.`,
    keywords: countryConfig.product.seoKeywords,
    faq: [
      {
        question: `Como practicar para ${countryConfig.product.guideLabel}?`,
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
    authoritySummary: `Esta guia usa la plantilla compartida del producto y la metadata actual de ${countryConfig.examAuthority}.`,
    authorityUpdatedLabel: 'Actualizado abril 2026',
  };
}
