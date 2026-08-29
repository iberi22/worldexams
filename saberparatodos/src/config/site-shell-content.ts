import type { RuntimeCountryConfig } from './index';

interface FeatureCard {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContactLinkCopy {
  title: string;
  description: string;
  cta: string;
}

interface AboutStatsCard {
  value: string;
  label: string;
}

export interface SiteShellContent {
  footerDescription: string;
  footerDisclaimer: string;
  about: {
    title: string;
    description: string;
    heroIntro: string;
    missionTitle: string;
    missionParagraphs: string[];
    missionVisualCaption: string;
    missionVisualSubcaption: string;
    ecosystemTitle: string;
    ecosystemDescription: string;
    featureSectionTitle: string;
    features: FeatureCard[];
    statsSectionTitle: string;
    stats: AboutStatsCard[];
    feedbackTitle: string;
    feedbackDescription: string;
    contributionCta: string;
    practiceCta: string;
  };
  contact: {
    title: string;
    description: string;
    github: ContactLinkCopy;
    email: ContactLinkCopy;
    faqTitle: string;
    faq: FaqItem[];
    ctaLabel: string;
    ctaButton: string;
  };
  preparacion: {
    heroIntro: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    planOfficialNote?: string;
  };
}

type SiteShellContentOverride = {
  footerDescription?: string;
  footerDisclaimer?: string;
  about?: Partial<SiteShellContent['about']>;
  contact?: Partial<SiteShellContent['contact']> & {
    github?: Partial<ContactLinkCopy>;
    email?: Partial<ContactLinkCopy>;
  };
  preparacion?: Partial<SiteShellContent['preparacion']>;
};

function buildDefaultContent(countryConfig: RuntimeCountryConfig): SiteShellContent {
  const examLabel = countryConfig.examName;
  const guideLabel = countryConfig.product.guideLabel;
  const countryName = countryConfig.name;
  const siteName = countryConfig.product.siteName;
  const authority = countryConfig.institutionName;

  return {
    footerDescription: `Plataforma abierta de práctica para ${countryName}. WorldExams es una plataforma educativa abierta para estudiantes de países hispanohablantes.`,
    footerDisclaimer: `No afiliado oficialmente con ${authority}. Contenido educativo de libre acceso basado en información pública y curaduría abierta.`,
    about: {
      title: `Sobre ${siteName}`,
      description: `WorldExams es una plataforma educativa abierta para estudiantes de países hispanohablantes, ofreciendo preparación gratuita para ${countryName} y la región.`,
      heroIntro: `WorldExams es una plataforma educativa abierta para estudiantes de países hispanohablantes, ofreciendo simulacros, guías de estudio e inteligencia educativa accesible para todos.`,
      missionTitle: 'Nuestra misión',
      missionParagraphs: [
        `Queremos democratizar el acceso a la preparación para ${examLabel} y reducir las brechas educativas en Latinoamérica y España.`,
        'Ofrecemos un entorno de práctica libre, abierto e interactivo donde cada estudiante puede evaluar sus conocimientos, recibir tutoría explicativa y medir su progreso.',
        'WorldExams se construye como una iniciativa abierta y sin fines de lucro, impulsada por la comunidad académica y tecnológica.'
      ],
      missionVisualCaption: `${countryName} en la red educativa regional`,
      missionVisualSubcaption: `Plataforma abierta. Contenido localizado. Guía ${guideLabel}.`,
      ecosystemTitle: 'Ecosistema de estudio',
      ecosystemDescription: `Integración continua de práctica adaptativa, analítica de aprendizaje y asistentes explicativos para ${countryName}.`,
      featureSectionTitle: 'Qué ofrece la plataforma',
      features: [
        {
          title: 'Simulacros adaptativos',
          description: 'Preguntas agrupadas por asignaturas, competencias y niveles acordes al marco educativo de cada país.'
        },
        {
          title: 'Acceso abierto y gratuito',
          description: 'Sin muros de pago ni suscripciones obligatorias para que cualquier estudiante pueda practicar libremente.'
        },
        {
          title: 'Tecnología offline-first',
          description: 'Funciona incluso con conectividades inestables o sin internet mediante almacenamiento local inteligente.'
        },
        {
          title: 'Explicaciones paso a paso',
          description: 'Retroalimentación pedagógica detallada y razonada para potenciar el aprendizaje conceptual.'
        },
        {
          title: 'Cobertura regional',
          description: `Diseñado para estudiantes de ${countryName} y adaptado a los sistemas educativos de diversos países hispanohablantes.`
        },
        {
          title: 'Código abierto',
          description: 'Desarrollado como iniciativa transparente y colaborativa abierta a la contribución comunitaria.'
        }
      ],
      statsSectionTitle: 'En números',
      stats: [
        { value: '24/7', label: 'Práctica disponible' },
        { value: '100%', label: 'Acceso abierto' },
        { value: '15+', label: 'Países soportados' },
        { value: 'OSS', label: 'Código abierto' },
      ],
      feedbackTitle: 'Tu opinión fortalece la plataforma',
      feedbackDescription: `Si encuentras imprecisiones en las preguntas de ${countryName} o tienes sugerencias de contenido, reportarlo ayuda a mejorar la experiencia para miles de estudiantes.`,
      contributionCta: 'Guía de contribución',
      practiceCta: 'Comenzar a practicar'
    },
    contact: {
      title: `Contacto ${siteName}`,
      description: `Escribenos para resolver dudas sobre ${examLabel}, reportar problemas del runtime o coordinar colaboraciones editoriales para ${countryName}.`,
      github: {
        title: 'GitHub',
        description: 'Reporta bugs, propone mejoras al runtime o deja contexto tecnico para nuevos tenants.',
        cta: 'Abrir repositorio'
      },
      email: {
        title: 'Email directo',
        description: `Canal para consultas sobre contenido, despliegue o coordinacion institucional alrededor de ${countryName}.`,
        cta: 'Enviar email'
      },
      faqTitle: 'Preguntas frecuentes',
      faq: [
        {
          question: `El proyecto es gratis para estudiantes de ${countryName}?`,
          answer: 'La base de practica y el runtime compartido estan pensados para acceso abierto. Algunas superficies pueden activarse por tenant segun el plan editorial vigente.'
        },
        {
          question: 'Puedo contribuir al proyecto?',
          answer: 'Si. Puedes reportar bugs, proponer copy localizado, revisar contenido o abrir cambios tecnicos desde GitHub.'
        },
        {
          question: `Las preguntas son del examen oficial ${guideLabel}?`,
          answer: `No. El producto trabaja con contenido propio y materiales de referencia publicos. Cuando aplica, se documenta el protocolo activo y la autoridad curricular correspondiente.`
        },
        {
          question: 'Como se generan y mantienen las preguntas?',
          answer: 'Se usan protocolos documentados, revision editorial y configuracion por tenant. La autoridad vigente para contenido nuevo siempre se valida en docs/specs/ACTIVE_PROTOCOLS.md.'
        },
        {
          question: 'Mis datos estan seguros?',
          answer: 'La plataforma usa controles de acceso y separa contenido publico de datos de usuario. Cuando no hace falta cuenta, el runtime permite practica sin friccion adicional.'
        }
      ],
      ctaLabel: 'Listo para entrar al producto?',
      ctaButton: 'Iniciar practica'
    },
    preparacion: {
      heroIntro: `Desde la convocatoria institucional hasta tu primera ruta de practica para ${examLabel}.`,
      step1Title: 'Confirma tu convocatoria',
      step1Description: `Revisa la convocatoria oficial de ${authority}, valida requisitos y confirma fechas vigentes.`,
      step2Title: 'Registro oficial',
      step2Description: 'Completa tu registro o ficha de admision asegurando que tus datos coincidan con tus documentos oficiales.',
      planOfficialNote: `Cuando una convocatoria cambie, la fuente oficial de ${authority} prevalece sobre cualquier resumen interno.`
    }
  };
}

const localizedContent: Partial<Record<RuntimeCountryConfig['code'], SiteShellContentOverride>> = {
  CO: {
    footerDescription: 'Plataforma abierta de práctica para las pruebas Saber en Colombia. WorldExams ofrece preparación libre y sin costo para estudiantes de todo el país.',
    about: {
      stats: [
        { value: '24/7', label: 'Práctica disponible' },
        { value: '100%', label: 'Acceso abierto' },
        { value: '580+', label: 'Bundles curados' },
        { value: 'OSS', label: 'Código abierto' },
      ],
    },
    footerDisclaimer: 'No afiliado oficialmente con el ICFES. Contenido educativo basado en información pública y curaduría editorial abierta.',
    preparacion: {
      heroIntro: 'Desde la inscripción oficial hasta tu primera sesión de simulacro para ICFES Saber.',
      step1Title: 'Confirma tu calendario',
      step1Description: 'Verifica las fechas oficiales, el tipo de registro y la ruta vigente publicada por el ICFES antes de pagar o diligenciar formularios.',
      step2Title: 'Registro oficial',
      step2Description: 'Confirma que nombres, documento y datos socioeconómicos coincidan exactamente con tus documentos oficiales.',
      planOfficialNote: 'La fuente oficial del ICFES prevalece sobre cualquier resumen de esta plataforma.'
    }
  },
  MX: {
    about: {
      heroIntro: 'WorldExams en México ofrece guías, simulacros y material educativo para la preparación de pruebas como PLANEA y EXANI de forma abierta y gratuita.',
      missionParagraphs: [
        'Nuestra meta es poner al alcance de cada estudiante mexicano herramientas de práctica de alta calidad sin costo.',
        'Localizamos los temarios, competencias curriculares y guías de admisión para alinearlos al contexto de la educación media y superior en México.',
        'Fomentamos el aprendizaje autónomo e inclusivo para postulantes a universidades e instituciones de todo el país.'
      ],
      missionVisualSubcaption: 'Plataforma abierta adaptada a la comunidad educativa en México.'
    },
    contact: {
      description: 'Escríbenos para dudas sobre los recursos en México, colaboración editorial o aportes al proyecto educativo.'
    },
    preparacion: {
      heroIntro: 'Desde la convocatoria institucional hasta tu primera ruta de práctica para EXANI-II.',
      step1Title: 'Confirma tu convocatoria',
      step1Description: 'Revisa la convocatoria publicada por tu universidad o sede aplicadora, valida requisitos y confirma si usarás una ficha institucional o un registro directo.',
      step2Title: 'Completa tu ficha de admisión',
      step2Description: 'Confirma folio, sede, carrera objetivo y todos tus datos personales antes de cerrar el proceso de admisión.',
      planOfficialNote: 'Cuando una universidad publique reglas específicas, esa convocatoria prevalece sobre cualquier resumen informativo de EXANI-II.'
    }
  },
  AR: {
    about: {
      heroIntro: 'WorldExams en Argentina acerca recursos de ejercitación y guías académicas abiertas para estudiantes secundarios y aspirantes universitarios.',
      missionParagraphs: [
        'Buscamos respaldar el ingreso universitario y la nivelación de conocimientos mediante ejercitación continua y explicaciones conceptuales claras.',
        'Nuestros módulos incorporan preguntas orientadas a los temarios de nivel secundario y pruebas de ingreso en universidades nacionales.',
        'Promovemos una comunidad de aprendizaje colaborativa y de libre acceso.'
      ],
      missionVisualSubcaption: 'Recursos abiertos de práctica académica para Argentina.'
    },
    contact: {
      description: 'Canal abierto para sugerencias sobre contenidos académicos y colaboración en Argentina.',
      faq: [
        {
          question: 'Esta versión ya está disponible para estudiantes en Argentina?',
          answer: 'Sí. La plataforma permite la práctica y consulta de guías, y su banco de contenidos académicos se actualiza periódicamente.'
        },
        {
          question: 'Cómo se adapta el contenido al sistema educativo argentino?',
          answer: 'Revisamos temarios de secundaria e ingreso universitario para ofrecer ejercitación alineada a las exigencias académicas locales.'
        },
        {
          question: 'Es una plataforma gratuita?',
          answer: 'Sí. WorldExams es 100% gratuita y abierta para toda la comunidad de estudiantes.'
        }
      ]
    }
  }
};

function mergeContent(base: SiteShellContent, override: SiteShellContentOverride | undefined): SiteShellContent {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
    about: {
      ...base.about,
      ...override.about,
      features: override.about?.features || base.about.features,
      missionParagraphs: override.about?.missionParagraphs || base.about.missionParagraphs,
      stats: override.about?.stats || base.about.stats,
    },
    contact: {
      ...base.contact,
      ...override.contact,
      github: {
        ...base.contact.github,
        ...override.contact?.github,
      },
      email: {
        ...base.contact.email,
        ...override.contact?.email,
      },
      faq: override.contact?.faq || base.contact.faq,
    },
    preparacion: {
      ...base.preparacion,
      ...override.preparacion,
    }
  };
}

export function getSiteShellContent(countryConfig: RuntimeCountryConfig): SiteShellContent {
  const base = buildDefaultContent(countryConfig);
  return mergeContent(base, localizedContent[countryConfig.code]);
}
