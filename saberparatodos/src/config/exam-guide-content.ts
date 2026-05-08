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
