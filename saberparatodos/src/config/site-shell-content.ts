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
    footerDescription: `Runtime compartido de practica para ${countryName}. Branding, SEO y contenido curricular se localizan por tenant sin duplicar el shell del producto.`,
    footerDisclaimer: `No afiliado oficialmente con ${authority}. Contenido educativo basado en informacion publica y configuracion local del tenant.`,
    about: {
      title: `Sobre ${siteName}`,
      description: `Conoce como ${siteName} funciona como runtime reutilizable para ${countryName} y otros paises de World Exams.`,
      heroIntro: `${siteName} convierte la misma base de producto en una experiencia local para ${countryName}, manteniendo shell compartido y contenido localizado por tenant.`,
      missionTitle: 'Nuestra mision',
      missionParagraphs: [
        `Queremos que preparar ${examLabel} no dependa de clonar aplicaciones ni de rehacer la interfaz para cada pais.`,
        'El runtime central vive en saberparatodos, mientras la identidad editorial, SEO, guias y contenidos curriculares se resuelven desde configuracion compartida y modulos localizados.',
        'Eso nos permite lanzar nuevos paises con una base coherente, controlando deuda tecnica y manteniendo una experiencia profesional para estudiantes y equipos internos.'
      ],
      missionVisualCaption: `${countryName} dentro de una arquitectura multi-pais`,
      missionVisualSubcaption: `Shell compartido. Contenido localizado. Guia ${guideLabel}.`,
      ecosystemTitle: 'Ecosistema de estudio',
      ecosystemDescription: `El runtime integra practica, analitica, feedback y componentes editoriales listos para adaptarse a ${countryName}.`,
      featureSectionTitle: 'Que ofrece esta plantilla',
      features: [
        {
          title: 'Tenanting centralizado',
          description: 'La identidad del pais, el examen, los grados, las asignaturas y el theming se resuelven desde config compartida.'
        },
        {
          title: 'SEO localizado',
          description: 'Titulos, descripciones, FAQs y schema se ajustan al tenant activo sin bifurcar layouts.'
        },
        {
          title: 'Runtime reutilizable',
          description: 'La UI base, navegacion y widgets se conservan, mientras el contenido institucional se desacopla en modulos especificos.'
        },
        {
          title: 'Operacion documentada',
          description: 'La separacion entre sitio institucional y runtime de producto queda trazada en docs, skills y manifests.'
        },
        {
          title: 'Extensible por pais',
          description: `Se pueden sumar nuevos paises como ${countryName} agregando configuracion y contenido, no forks enteros.`
        },
        {
          title: 'Open source',
          description: 'El trabajo sigue visible para auditoria, correccion y colaboracion tecnica dentro del monorepo.'
        }
      ],
      statsSectionTitle: 'En numeros',
      stats: [
        { value: '24/7', label: 'Practica disponible' },
        { value: '1', label: 'Runtime compartido' },
        { value: 'N', label: 'Paises configurables' },
        { value: 'OSS', label: 'Operacion abierta' },
      ],
      feedbackTitle: 'Tu feedback mejora el runtime',
      feedbackDescription: `Si encuentras errores en la experiencia de ${countryName} o ves copy que aun no es tenant-aware, reportarlo ayuda a endurecer la plantilla para los siguientes paises.`,
      contributionCta: 'Guia de contribucion',
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
    footerDescription: 'Plataforma abierta de practica para las pruebas Saber en Colombia. El runtime compartido mantiene shell comun y localiza contenido, SEO y guias por tenant.',
    about: {
      stats: [
        { value: '24/7', label: 'Practica disponible' },
        { value: '1', label: 'Runtime compartido' },
        { value: '580+', label: 'Bundles curados' },
        { value: 'OSS', label: 'Operacion abierta' },
      ],
    },
    footerDisclaimer: 'No afiliado oficialmente con el ICFES. Contenido educativo basado en informacion publica y curaduria editorial interna.',
    preparacion: {
      heroIntro: 'Desde la inscripcion oficial hasta tu primera sesion de simulacro para ICFES Saber.',
      step1Title: 'Confirma tu calendario',
      step1Description: 'Verifica las fechas oficiales, el tipo de registro y la ruta vigente publicada por el ICFES antes de pagar o diligenciar formularios.',
      step2Title: 'Registro oficial',
      step2Description: 'Confirma que nombres, documento y datos socioeconomicos coincidan exactamente con tus documentos oficiales.',
      planOfficialNote: 'La fuente oficial del ICFES prevalece sobre cualquier resumen interno de este runtime.'
    }
  },
  MX: {
    about: {
      heroIntro: 'Esta experiencia adapta el runtime de World Exams a Mexico para trabajar guias, practica y componentes editoriales alrededor de PLANEA y EXANI sin rehacer la plataforma.',
      missionParagraphs: [
        'La meta no es clonar sitios por pais. La meta es reutilizar la misma base tecnica y cambiar solo lo que realmente debe localizarse para Mexico.',
        'Eso incluye branding, metadata SEO, nomenclatura escolar, guias y copy institucional, mientras la experiencia base sigue siendo compartida.',
        'Con este enfoque, el onboarding de nuevos paises se convierte en una operacion de configuracion y contenido, no en una bifurcacion costosa del frontend.'
      ],
      missionVisualSubcaption: 'Mexico como tenant activo sobre runtime comun.'
    },
    contact: {
      description: 'Escribenos para dudas sobre la plantilla de Mexico, localizacion curricular o siguientes pasos del runtime tenant-aware.'
    },
    preparacion: {
      heroIntro: 'Desde la convocatoria institucional hasta tu primera ruta de practica para EXANI-II.',
      step1Title: 'Confirma tu convocatoria',
      step1Description: 'Revisa la convocatoria publicada por tu universidad o sede aplicadora, valida requisitos y confirma si usaras una ficha institucional o un registro directo.',
      step2Title: 'Completa tu ficha de admision',
      step2Description: 'Confirma folio, sede, carrera objetivo y todos tus datos personales antes de cerrar el proceso de admision.',
      planOfficialNote: 'Cuando una universidad publique reglas especificas, esa convocatoria prevalece sobre cualquier resumen editorial de EXANI-II.'
    }
  },
  AR: {
    about: {
      heroIntro: 'Esta variante usa el mismo runtime para Argentina, pero ya incorpora copy localizado para validar que la plantilla no depende de un esquema binario CO/MX.',
      missionParagraphs: [
        'La prueba argentina sirve como ensayo real del modelo multi-pais: misma base tecnica, distinta capa editorial.',
        'En vez de duplicar rutas y componentes, localizamos metadatos, textos institucionales, labels y mensajes de soporte desde un modulo dedicado.',
        'Eso deja lista la plantilla para sumar contenido curricular argentino de forma incremental sin tocar el shell compartido.'
      ],
      missionVisualSubcaption: 'Argentina como tercer tenant de validacion.'
    },
    contact: {
      description: 'Si ves algo que todavia suena generico o demasiado colombiano en la experiencia de Argentina, este canal sirve justamente para detectar esos residuos.',
      faq: [
        {
          question: 'Esta version ya esta lista para un lanzamiento completo en Argentina?',
          answer: 'Todavia no. La plantilla ya soporta tenanting coherente, pero el contenido curricular y las rutas editoriales siguen en expansion.'
        },
        {
          question: 'Por que usar Argentina como tenant de prueba?',
          answer: 'Porque obliga a validar un tercer contexto real y a sacar del runtime cualquier supuesto escondido que solo funcione para Colombia o Mexico.'
        },
        {
          question: 'Se puede sumar contenido localizado sin tocar el shell?',
          answer: 'Si. Ese es precisamente el objetivo: usar modulos tenant-aware para copy y contenido, mientras layouts y componentes base permanecen compartidos.'
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
