import type { CountryCode } from './index';

export interface AuthorityCompetency {
  competencias: string[];
  componentes: string[];
  color: string;
}

export interface AuthorityReferenceLink {
  label: string;
  url: string;
  note?: string;
}

export interface AuthorityReferenceGroup {
  title: string;
  description: string;
  tone: string;
  accent: string;
  links: AuthorityReferenceLink[];
  open?: boolean;
}

export interface AuthorityGuidelines {
  authorityName: string;
  badgeLabel: string;
  competencias: Record<string, AuthorityCompetency>;
  subjectLabels: Record<string, string>;
  references: AuthorityReferenceGroup[];
}

const guidelinesByCountry: Partial<Record<CountryCode, AuthorityGuidelines>> = {
  CO: {
    authorityName: 'M.E.N. e ICFES',
    badgeLabel: 'Alineación curricular 2026 — Derechos Básicos de Aprendizaje vigentes',
    competencias: {
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
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      lecturacritica: 'Lectura Crítica',
      cienciasnaturales: 'Ciencias Naturales',
      sociales: 'Sociales y Ciudadanas',
      ingles: 'Inglés',
    },
    references: [
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
      }
    ]
  },
  MX: {
    authorityName: 'CENEVAL / EXANI-II',
    badgeLabel: 'Referencia oficial EXANI-II — Estructura vigente CENEVAL',
    competencias: {
      matematicas: {
        competencias: ['Pensamiento matemático', 'Resolución de problemas', 'Modelación matemática'],
        componentes: ['Aritmética', 'Álgebra', 'Geometría', 'Estadística y Probabilidad'],
        color: '#3b82f6'
      },
      lenguaje: {
        competencias: ['Comprensión lectora', 'Redacción indirecta'],
        componentes: ['Comunicación', 'Gramática y Semántica'],
        color: '#8b5cf6'
      }
    },
    subjectLabels: {
      matematicas: 'Pensamiento Matemático',
      lenguaje: 'Comprensión Lectora / Redacción',
    },
    references: [
      {
        title: 'CENEVAL Oficial',
        description: 'Fuentes oficiales para el examen EXANI-II.',
        tone: 'blue',
        accent: '#2563eb',
        open: true,
        links: [
          { label: 'Guía EXANI-II', url: 'https://www.ceneval.edu.mx/exani-ii' },
          { label: 'Estructura del examen', url: 'https://ceneval.edu.mx/examenes-ingreso-exani_ii/' }
        ]
      }
    ]
  },
  AR: {
    authorityName: 'Ministerio de Educación — APRENDER / NAP',
    badgeLabel: 'Alineación Núcleos de Aprendizaje Prioritarios (NAP) y Operativo Aprender',
    competencias: {
      matematica: {
        competencias: ['Reconocimiento de conceptos', 'Resolución de problemas', 'Argumentación y validación'],
        componentes: ['Número y Operaciones', 'Geometría y Medida', 'Álgebra y Funciones', 'Estadística y Probabilidad'],
        color: '#74acdf'
      },
      lengua: {
        competencias: ['Comprensión lectora global', 'Lectura crítica e inferencial', 'Reconocimiento de estructuras textuales'],
        componentes: ['Comprensión de textos ficcionales y no ficcionales', 'Reflexión sobre la lengua'],
        color: '#8b5cf6'
      },
      cienciasnaturales: {
        competencias: ['Explicación de fenómenos naturales', 'Comprensión de conceptos científicos', 'Análisis de procesos e indagación'],
        componentes: ['Seres vivos y salud', 'Materia y energía', 'Tierra y universo'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Análisis de procesos históricos', 'Comprensión del espacio geográfico', 'Pensamiento crítico y ciudadanía'],
        componentes: ['Sociedades a través del tiempo', 'Sociedades y espacios geográficos'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      lengua: 'Lengua',
      cienciasnaturales: 'Ciencias Naturales',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'Ministerio de Educación de la Nación',
        description: 'Documentos oficiales del Operativo Aprender y NAP.',
        tone: 'sky',
        accent: '#74acdf',
        open: true,
        links: [
          { label: 'Operativo Aprender - Evaluación Educativa', url: 'https://www.argentina.gob.ar/educacion/evaluacion-educativa/aprender' },
          { label: 'Núcleos de Aprendizaje Prioritarios (NAP)', url: 'https://www.argentina.gob.ar/educacion/nap' }
        ]
      }
    ]
  },
  CL: {
    authorityName: 'DEMRE / MINEDUC — PAES',
    badgeLabel: 'Alineación Bases Curriculares y Criterios DEMRE 2026',
    competencias: {
      matematica: {
        competencias: ['Resolver problemas', 'Representar', 'Modelar', 'Argumentar'],
        componentes: ['Números', 'Álgebra y Funciones', 'Geometría', 'Probabilidad y Estadística'],
        color: '#d52b1e'
      },
      lenguaje: {
        competencias: ['Rastrear - Localizar', 'Relacionar - Interpretar', 'Evaluar - Reflexionar'],
        componentes: ['Comprensión Lectora en textos literarios y no literarios'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Procesar e interpretar datos', 'Explicar fenómenos', 'Diseñar e investigar'],
        componentes: ['Biología', 'Física', 'Química'],
        color: '#10b981'
      },
      historia: {
        competencias: ['Pensamiento temporal y espacial', 'Análisis de fuentes', 'Pensamiento crítico'],
        componentes: ['Historia en perspectiva regional y mundial', 'Formación ciudadana', 'Economía y sociedad'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Competencia Matemática',
      lenguaje: 'Competencia Lectora',
      ciencias: 'Ciencias',
      historia: 'Historia y Ciencias Sociales'
    },
    references: [
      {
        title: 'DEMRE Universidad de Chile',
        description: 'Modelos oficiales y temarios PAES.',
        tone: 'red',
        accent: '#d52b1e',
        open: true,
        links: [
          { label: 'Temarios Oficiales PAES DEMRE', url: 'https://demre.cl/pruebas/paes/temarios' },
          { label: 'Modelos de Prueba DEMRE', url: 'https://demre.cl/publicaciones/modelos-pruebas' }
        ]
      }
    ]
  },
  PE: {
    authorityName: 'MINEDU / UMC — ECE / CNEB',
    badgeLabel: 'Curriculo Nacional de la Educación Básica (CNEB) vigente',
    competencias: {
      matematica: {
        competencias: ['Resuelve problemas de cantidad', 'Resuelve problemas de regularidad, equivalencia y cambio', 'Resuelve problemas de forma, movimiento y localización', 'Resuelve problemas de gestión de datos e incertidumbre'],
        componentes: ['Números y Operaciones', 'Álgebra', 'Geometría', 'Estadística'],
        color: '#d91023'
      },
      comunicacion: {
        competencias: ['Lee diversos tipos de textos escritos', 'Escribe diversos tipos de textos', 'Se comunica oralmente'],
        componentes: ['Obtiene información', 'Infiere e interpreta', 'Reflexiona y evalúa'],
        color: '#8b5cf6'
      },
      ciencia: {
        competencias: ['Indaga mediante métodos científicos', 'Explica el mundo físico basándose en conocimientos científicos', 'Diseña y construye soluciones tecnológicas'],
        componentes: ['Materia y energía', 'Biodiversidad, Tierra y universo'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Construye interpretaciones históricas', 'Gestiona responsablemente el espacio y el ambiente', 'Gestiona responsablemente los recursos económicos'],
        componentes: ['Historia', 'Geografía', 'Economía'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      comunicacion: 'Comunicación',
      ciencia: 'Ciencia y Tecnología',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'MINEDU UMC Perú',
        description: 'Evaluación Censal de Estudiantes y CNEB.',
        tone: 'red',
        accent: '#d91023',
        open: true,
        links: [
          { label: 'Oficina de Medición de la Calidad de los Aprendizajes (UMC)', url: 'http://umc.minedu.gob.pe/' },
          { label: 'Currículo Nacional de la Educación Básica', url: 'http://www.minedu.gob.pe/curriculo/' }
        ]
      }
    ]
  }
};

export function getAuthorityGuidelines(countryCode: CountryCode): AuthorityGuidelines {
  return guidelinesByCountry[countryCode] || {
    authorityName: 'Autoridad Educativa Local',
    badgeLabel: 'Referencia educativa nacional vigente',
    competencias: {},
    subjectLabels: {},
    references: []
  };
}
