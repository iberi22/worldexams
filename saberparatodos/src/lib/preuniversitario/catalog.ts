import type { PreuCatalogEntry, PreuSourceRef } from './types';

export const preuMethodologySources: PreuSourceRef[] = [
  {
    title: 'ICFES - Resultados del examen Saber Pro',
    url: 'https://www.icfes.gov.co/evaluaciones-icfes/acerca-del-examen-saber-pro/resultados-del-examen-saber-pro/',
    kind: 'ranking',
    lastVerifiedAt: '2026-03-07'
  },
  {
    title: 'ICFES - Servicios de resultados agregados',
    url: 'https://www.icfes.gov.co/atencion-y-servicios-a-la-ciudadania/servicios/',
    kind: 'ranking',
    lastVerifiedAt: '2026-03-07'
  }
];

export const preuCatalogEntries: PreuCatalogEntry[] = [
  {
    id: 'co-preu-unal-core',
    slug: 'unal',
    institutionName: 'Universidad Nacional de Colombia',
    city: 'Bogota',
    displayName: 'UNAL - Troncal de admision',
    entryType: 'core',
    researchStatus: 'verified',
    summary: 'Simulacro troncal con blueprint institucional y overlays para Medicina e Ingenierias.',
    components: ['Analisis textual', 'Matematicas', 'Ciencias naturales', 'Ciencias sociales'],
    targetPrograms: ['Medicina', 'Ingenieria de Sistemas', 'Ingenieria Industrial', 'Derecho'],
    requiredDocs: ['Documento de identidad', 'Pago de derechos', 'Registro en plataforma'],
    rankingBasis: 'Base ICFES Saber Pro 2024 pendiente de normalizacion final por institucion.',
    officialAdmissionsUrl: 'https://admisiones.unal.edu.co/pregrado/',
    documentationUrl: 'https://admisiones.unal.edu.co/pregrado/',
    cycle: {
      label: '2026-2',
      costCop: 175000,
      registrationWindow: '16 de febrero al 18 de marzo de 2026',
      examWindow: '26 de abril de 2026',
      status: 'verified',
      lastVerifiedAt: '2026-03-07'
    },
    sourceRefs: [
      {
        title: 'UNAL - Admisiones pregrado',
        url: 'https://admisiones.unal.edu.co/pregrado/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'Extraer costo, calendario y PDF de soporte al dossier antes de publicar el mock.'
  },
  {
    id: 'co-preu-udea-core',
    slug: 'udea',
    institutionName: 'Universidad de Antioquia',
    city: 'Medellin',
    displayName: 'UdeA - Troncal de admision',
    entryType: 'core',
    researchStatus: 'verified',
    summary: 'Entrada prioritaria por examen propio, guias publicas y overlays de Medicina, Derecho y Psicologia.',
    components: ['Razonamiento logico', 'Comprension lectora'],
    targetPrograms: ['Medicina', 'Derecho', 'Psicologia', 'Ingenierias'],
    requiredDocs: ['Documento de identidad', 'Credencial impresa', 'Pago de derechos'],
    rankingBasis: 'Base ICFES Saber Pro 2024 pendiente de cruce reproducible con shortlist final.',
    officialAdmissionsUrl: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/',
    documentationUrl: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/calendario-guias-admision/',
    cycle: {
      label: '2026-2',
      costCop: 90800,
      registrationWindow: '19 de febrero al 18 de marzo de 2026',
      examWindow: '25 y 26 de mayo de 2026',
      status: 'verified',
      lastVerifiedAt: '2026-03-07'
    },
    sourceRefs: [
      {
        title: 'UdeA - Pregrado',
        url: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UdeA - Calendario y guias de admision',
        url: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/calendario-guias-admision/',
        kind: 'calendar',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'Convocatoria 2026-2 verificada: 80 preguntas, 3 horas, dos componentes y costos diferenciados por Medellin/campus regionales.'
  },
  {
    id: 'co-preu-uis-core',
    slug: 'uis',
    institutionName: 'Universidad Industrial de Santander',
    city: 'Bucaramanga',
    displayName: 'UIS - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Entrada en auditoria: la admision regular de pregrado se soporta en ponderaciones de Saber 11 y no en un examen propio general.',
    components: ['Saber 11 ponderado por programa', 'Caso especial: prueba adicional en Licenciatura en Musica'],
    targetPrograms: ['Medicina', 'Ingenieria de Sistemas', 'Ingenieria Industrial'],
    requiredDocs: ['Documento de identidad', 'Formulario de admision', 'Pago de derechos'],
    rankingBasis: 'Pendiente decision final de elegibilidad dentro del top 10 exam-first.',
    officialAdmissionsUrl: 'https://uis.edu.co/inscripciones/',
    documentationUrl: 'https://documentos.uis.edu.co/wp-content/uploads/2024/12/procedimiento-de-seleccion-de-aspirantes-a-pregrado.pdf',
    cycle: {
      label: '2026',
      status: 'pending',
      lastVerifiedAt: '2026-03-07'
    },
    sourceRefs: [
      {
        title: 'UIS - Procedimiento seleccion de aspirantes a pregrado',
        url: 'https://documentos.uis.edu.co/wp-content/uploads/2024/12/procedimiento-de-seleccion-de-aspirantes-a-pregrado.pdf',
        kind: 'documentation',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UIS - Inscripciones pregrado',
        url: 'https://uis.edu.co/inscripciones/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'La fuente oficial de procedimiento indica seleccion por puntajes Saber 11 y prueba adicional solo para Musica. Requiere decidir si sale del catalogo exam-first o si entra como caso especial por programa.'
  },
  {
    id: 'co-preu-utp-core',
    slug: 'utp',
    institutionName: 'Universidad Tecnologica de Pereira',
    city: 'Pereira',
    displayName: 'UTP - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Entrada en auditoria: el proceso general de pregrado se publica como admision por puntajes y calendario, sin examen institucional general visible.',
    components: ['Seleccion por puntaje de admision', 'Casos especiales por programa'],
    targetPrograms: ['Medicina', 'Ingenierias', 'Ciencias del deporte'],
    requiredDocs: ['Documento de identidad', 'Registro en portal', 'Pago de derechos'],
    rankingBasis: 'Pendiente decision final de elegibilidad dentro del top 10 exam-first.',
    officialAdmissionsUrl: 'https://utp.edu.co/aspirantes/',
    documentationUrl: 'https://registro.utp.edu.co/calendario-vigente/2091/calendario-inscripciones-pregrado-segundo-semestre-2025/',
    cycle: {
      label: '2026-1',
      status: 'pending',
      lastVerifiedAt: '2026-03-07'
    },
    sourceRefs: [
      {
        title: 'UTP - Apertura de inscripciones 2026-1',
        url: 'https://comunicaciones.utp.edu.co/93989/vicerrectorias/vicerrectorias-vicerrectorias-2/utp-abre-inscripciones-2026-1-con-nuevo-portal-y-gratuidad-en-el-pin/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UTP - Calendario inscripciones pregrado 2026-1',
        url: 'https://registro.utp.edu.co/calendario-vigente/2091/calendario-inscripciones-pregrado-segundo-semestre-2025/',
        kind: 'calendar',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UTP - Reglamento estudiantil admision',
        url: 'https://secretariageneral.utp.edu.co/reglamentoestudiantil/titulo-segundo-de-los-estudiantes-de-pregrado/capitulo-iii-de-la-admision/articulo-11/',
        kind: 'documentation',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UTP - Aspirantes',
        url: 'https://utp.edu.co/aspirantes/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'La evidencia localizada muestra admision general por puntajes y calendario, no un examen propio transversal. Debe auditarse si se excluye del bloque exam-first o si se trabaja solo algun programa especial.'
  },
  {
    id: 'co-preu-univalle-core',
    slug: 'univalle',
    institutionName: 'Universidad del Valle',
    city: 'Cali',
    displayName: 'Univalle - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Candidata prioritaria por selectividad y relevancia academica; requiere confirmar componente y vigencia del examen.',
    components: ['Pendiente de auditoria'],
    targetPrograms: ['Medicina', 'Ingenierias', 'Psicologia'],
    requiredDocs: ['Pendiente de auditoria'],
    rankingBasis: 'Candidata para shortlist Top 10 basada en Saber Pro, pendiente de cierre reproducible.',
    sourceRefs: [],
    researchNotes: 'No publicar hasta confirmar si la convocatoria vigente mantiene examen propio y estructura.'
  },
  {
    id: 'co-preu-uptc-core',
    slug: 'uptc',
    institutionName: 'Universidad Pedagogica y Tecnologica de Colombia',
    city: 'Tunja',
    displayName: 'UPTC - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Candidata para completar el top 10 con foco en ingenierias, salud y licenciaturas selectivas.',
    components: ['Pendiente de auditoria'],
    targetPrograms: ['Medicina', 'Ingenierias', 'Derecho'],
    requiredDocs: ['Pendiente de auditoria'],
    rankingBasis: 'En cola para calculo ICFES + filtro por examen documentable.',
    sourceRefs: [],
    researchNotes: 'Falta confirmar calendario, costo y formato de admision 2026.'
  },
  {
    id: 'co-preu-cauca-core',
    slug: 'unicauca',
    institutionName: 'Universidad del Cauca',
    city: 'Popayan',
    displayName: 'UniCauca - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Entrada congelada por conflicto documental: una pagina oficial describe examen de admision, pero el manual 2026 apunta a seleccion por ponderaciones de Saber 11.',
    components: ['Conflicto entre examen institucional historico y manual 2026 vigente'],
    targetPrograms: ['Medicina', 'Derecho', 'Ingenierias'],
    requiredDocs: ['Pendiente de auditoria'],
    rankingBasis: 'Pendiente cierre normativo antes de decidir si entra como exam-first o sale a hold.',
    officialAdmissionsUrl: 'https://portal.unicauca.edu.co/versionP/admisiones/admisiones-pregrado/examen-de-admision',
    documentationUrl: 'https://www.unicauca.edu.co/wp-content/uploads/2025/12/Manual-proceso-de-admisiones-2026.pdf',
    sourceRefs: [
      {
        title: 'UniCauca - Examen de admision',
        url: 'https://portal.unicauca.edu.co/versionP/admisiones/admisiones-pregrado/examen-de-admision',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UniCauca - Manual proceso de admisiones 2026',
        url: 'https://www.unicauca.edu.co/wp-content/uploads/2025/12/Manual-proceso-de-admisiones-2026.pdf',
        kind: 'documentation',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'No producir profile ni blueprint hasta resolver el choque entre la pagina historica del examen y el manual vigente 2026.'
  },
  {
    id: 'co-preu-cartagena-core',
    slug: 'unicartagena',
    institutionName: 'Universidad de Cartagena',
    city: 'Cartagena',
    displayName: 'UniCartagena - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Candidata fuerte para modulo Caribe con examenes competitivos en salud.',
    components: ['Pendiente de auditoria'],
    targetPrograms: ['Medicina', 'Derecho', 'Ingenierias'],
    requiredDocs: ['Pendiente de auditoria'],
    rankingBasis: 'Pendiente filtro Saber Pro + documentacion oficial.',
    sourceRefs: [],
    researchNotes: 'Se requiere consolidar componentes y documentos del ciclo 2026.'
  },
  {
    id: 'co-preu-caldas-core',
    slug: 'ucaldas',
    institutionName: 'Universidad de Caldas',
    city: 'Manizales',
    displayName: 'U. de Caldas - Troncal de admision',
    entryType: 'core',
    researchStatus: 'queued',
    summary: 'Candidata para bloque regional del eje cafetero.',
    components: ['Pendiente'],
    targetPrograms: ['Medicina', 'Ingenierias', 'Derecho'],
    requiredDocs: ['Pendiente'],
    rankingBasis: 'Pendiente inclusion final tras ranking reproducible.',
    sourceRefs: [],
    researchNotes: 'Aun sin dossier.'
  },
  {
    id: 'co-preu-atlantico-core',
    slug: 'uniatlantico',
    institutionName: 'Universidad del Atlantico',
    city: 'Barranquilla',
    displayName: 'UniAtlantico - Troncal de admision',
    entryType: 'core',
    researchStatus: 'in_research',
    summary: 'Candidata prioritaria para overlays por programa: la admision general usa Saber 11, pero la convocatoria 2026-1 publica pruebas especificas para Medicina, Bellas Artes y Licenciatura en Cultura Fisica, Recreacion y Deporte.',
    components: ['Saber 11 como base', 'Pruebas especificas por programa'],
    targetPrograms: ['Medicina', 'Bellas Artes', 'Licenciatura en Cultura Fisica'],
    requiredDocs: ['Documento de identidad', 'Inscripcion en portal', 'Resultados Saber 11'],
    rankingBasis: 'Mantiene elegibilidad dentro del top 10 como universidad overlay-first, no como exam-first general.',
    officialAdmissionsUrl: 'https://www.uniatlantico.edu.co/apertura-inscripciones-de-pregrado-para-el-primer-periodo-academico-2026/',
    documentationUrl: 'https://www.uniatlantico.edu.co/atencion-aspirantes-proceso-de-admision-2026-1/',
    cycle: {
      label: '2026-1',
      status: 'verified',
      lastVerifiedAt: '2026-03-07'
    },
    sourceRefs: [
      {
        title: 'UniAtlantico - Apertura inscripciones pregrado 2026-1',
        url: 'https://www.uniatlantico.edu.co/apertura-inscripciones-de-pregrado-para-el-primer-periodo-academico-2026/',
        kind: 'admissions',
        lastVerifiedAt: '2026-03-07'
      },
      {
        title: 'UniAtlantico - Atencion aspirantes proceso de admision 2026-1',
        url: 'https://www.uniatlantico.edu.co/atencion-aspirantes-proceso-de-admision-2026-1/',
        kind: 'documentation',
        lastVerifiedAt: '2026-03-07'
      }
    ],
    researchNotes: 'Siguiente frente recomendado: crear overlay `UniAtlantico Medicina` como primer caso program-first del modulo.'
  }
];

export const preuStatusLabels = {
  verified: 'Verificada',
  in_research: 'En levantamiento',
  queued: 'En cola'
} as const;
