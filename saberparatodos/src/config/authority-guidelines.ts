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
  },
  UY: {
    authorityName: 'ANEP / DGES — UDELAR',
    badgeLabel: 'Evaluación Nacional de Aprendizajes y Admisión UDELAR',
    competencias: {
      matematica: {
        competencias: ['Resolución de problemas', 'Modelización matemática', 'Razonamiento y argumentación'],
        componentes: ['Álgebra y Funciones', 'Geometría y Medida', 'Estadística y Probabilidad', 'Números y Operaciones'],
        color: '#0038a8'
      },
      lengua: {
        competencias: ['Comprensión lectora y análisis textual', 'Producción escrita y propiedad léxica', 'Reflexión sobre el lenguaje'],
        componentes: ['Textos explicativos y argumentativos', 'Cohesión y coherencia', 'Vocabulario en contexto'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Explicación científica de fenómenos', 'Análisis crítico e indagación experimental', 'Uso responsable de tecnología'],
        componentes: ['Física y Química', 'Biología y Ciencias de la Tierra', 'Ciencia, Tecnología y Sociedad'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Comprensión de procesos históricos y sociales', 'Análisis territorial y ambiental', 'Ciudadanía y derechos humanos'],
        componentes: ['Historia nacional y contemporánea', 'Geografía humana y económica', 'Formación ciudadana'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      lengua: 'Lengua y Literatura',
      ciencias: 'Ciencias Naturales',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'ANEP & DGES Uruguay',
        description: 'Marcos curriculares nacionales y pruebas de egreso.',
        tone: 'blue',
        accent: '#0038a8',
        open: true,
        links: [
          { label: 'Administración Nacional de Educación Pública (ANEP)', url: 'https://www.anep.edu.uy/' },
          { label: 'Dirección General de Educación Secundaria (DGES)', url: 'https://www.ces.edu.uy/' },
          { label: 'Universidad de la República (UDELAR) - Ingresos', url: 'https://udelar.edu.uy/' }
        ]
      }
    ]
  },
  PY: {
    authorityName: 'MEC — SNEPE',
    badgeLabel: 'Sistema Nacional de Evaluación del Proceso Educativo (SNEPE)',
    competencias: {
      matematica: {
        competencias: ['Comprensión de conceptos matemáticos', 'Procedimientos y cálculo', 'Resolución de problemas contextualizados'],
        componentes: ['Número y Operaciones', 'Álgebra y Funciones', 'Geometría y Medida', 'Estadística'],
        color: '#d52b1e'
      },
      lengua: {
        competencias: ['Comprensión de lectura en castellano y guaraní', 'Expresión escrita y normativa', 'Análisis crítico de textos'],
        componentes: ['Comprensión literal e inferencial', 'Estructura textual', 'Bilingüismo y sociolingüística'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Indagación científica', 'Comprensión de fenómenos naturales y de la salud', 'Conservación ambiental'],
        componentes: ['Materia y Energía', 'Seres Vivos y Salud', 'Medio Ambiente y Sustentabilidad'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Interpretación histórica del Paraguay y América', 'Ubicación espacio-temporal', 'Formación ética y ciudadana'],
        componentes: ['Historia Paraguaya y Universal', 'Geografía', 'Educación Cívica y Derechos'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      lengua: 'Lengua Castellana y Materna',
      ciencias: 'Ciencias de la Naturaleza',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'Ministerio de Educación y Ciencias (MEC)',
        description: 'Evaluaciones e informes del SNEPE.',
        tone: 'red',
        accent: '#d52b1e',
        open: true,
        links: [
          { label: 'Portal Oficial del Ministerio de Educación y Ciencias (MEC)', url: 'https://www.mec.gov.py/' },
          { label: 'Sistema Nacional de Evaluación del Proceso Educativo (SNEPE)', url: 'https://www.mec.gov.py/snepe/' }
        ]
      }
    ]
  },
  BO: {
    authorityName: 'Ministerio de Educación — UMSA / UAGRM',
    badgeLabel: 'Sistema de Evaluación del Estado Plurinacional y Admisión Universitaria',
    competencias: {
      matematica: {
        competencias: ['Razonamiento lógico-matemático', 'Modelado algebraico y geométrico', 'Resolución de problemas comunitarios'],
        componentes: ['Álgebra y Trigonometría', 'Geometría Analítica y Cálculo', 'Aritmética y Estadística'],
        color: '#007a3d'
      },
      comunicacion: {
        competencias: ['Comprensión lectora y análisis discursivo', 'Redacción académica y técnica', 'Razonamiento verbal'],
        componentes: ['Lenguaje y Literatura', 'Comprensión y Análisis de Textos', 'Ortografía y Gramática'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Explicación de principios físicos y químicos', 'Análisis biológico y ecológico', 'Investigación científica aplicada'],
        componentes: ['Física', 'Química', 'Biología y Geografía'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Análisis sociohistórico plurinacional', 'Geografía y recursos estratégicos', 'Cosmovisiones y formación ciudadana'],
        componentes: ['Historia de Bolivia y Universal', 'Geografía Política y Económica', 'Educación Ciudadana'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      comunicacion: 'Comunicación y Lenguajes',
      ciencias: 'Ciencias Naturales (Física, Química, Biología)',
      sociales: 'Ciencias Sociales e Historia'
    },
    references: [
      {
        title: 'Ministerio de Educación de Bolivia',
        description: 'Leyes educativas y admisiones a universidades públicas (UMSA, UAGRM).',
        tone: 'emerald',
        accent: '#007a3d',
        open: true,
        links: [
          { label: 'Ministerio de Educación del Estado Plurinacional de Bolivia', url: 'https://www.minedu.gob.bo/' },
          { label: 'Universidad Mayor de San Andrés (UMSA) - Admisiones', url: 'https://www.umsa.bo/' },
          { label: 'Universidad Autónoma Gabriel René Moreno (UAGRM)', url: 'https://www.uagrm.edu.bo/' }
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
