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
  EC: {
    authorityName: 'SENESCYT / Ineval — Examen de Acceso a la Educación Superior / Ser Bachiller',
    badgeLabel: 'Alineación oficial SENESCYT e Ineval — EAES / Ser Bachiller',
    competencias: {
      matematica: {
        competencias: ['Razonamiento cuantitativo', 'Resolución de problemas matemáticos', 'Modelación y abstracción'],
        componentes: ['Álgebra y Funciones', 'Geometría y Medida', 'Estadística y Probabilidad'],
        color: '#3b82f6'
      },
      matematicas: {
        competencias: ['Razonamiento cuantitativo', 'Resolución de problemas matemáticos', 'Modelación y abstracción'],
        componentes: ['Álgebra y Funciones', 'Geometría y Medida', 'Estadística y Probabilidad'],
        color: '#3b82f6'
      },
      lengua: {
        competencias: ['Comprensión lectora', 'Dominio lingüístico', 'Análisis crítico de textos'],
        componentes: ['Comprensión de textos', 'Semántica y léxico', 'Estructura textual y sintaxis'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Explicación de fenómenos naturales', 'Indagación científica', 'Razonamiento científico'],
        componentes: ['Cuerpo humano y salud', 'Materia y energía', 'Ecosistemas y biodiversidad'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Comprensión del contexto histórico y social', 'Pensamiento crítico social', 'Análisis geográfico y ciudadano'],
        componentes: ['Historia y sociedad', 'Identidad y cultura', 'Ciudadanía y convivencia'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      matematicas: 'Matemáticas',
      lengua: 'Lengua y Literatura',
      ciencias: 'Ciencias Naturales',
      sociales: 'Estudios Sociales'
    },
    references: [
      {
        title: 'SENESCYT e Ineval',
        description: 'Fuentes oficiales para exámenes de admisión universitaria y evaluación nacional en Ecuador.',
        tone: 'yellow',
        accent: '#fcd116',
        open: true,
        links: [
          { label: 'Secretaría de Educación Superior, Ciencia, Tecnología e Innovación (SENESCYT)', url: 'https://www.educacionsuperior.gob.ec/' },
          { label: 'Instituto Nacional de Evaluación Educativa (Ineval)', url: 'https://www.evaluacion.gob.ec/' }
        ]
      }
    ]
  },
  BR: {
    authorityName: 'INEP / MEC — Exame Nacional do Ensino Médio (ENEM)',
    badgeLabel: 'Alinhamento Matriz de Referência ENEM — INEP / MEC',
    competencias: {
      matematica: {
        competencias: ['Matemática e suas Tecnologias', 'Raciocínio lógico-matemático', 'Resolução de problemas contextuais'],
        componentes: ['Conhecimentos numéricos', 'Conhecimentos geométricos', 'Conhecimentos de estatística e probabilidade', 'Conhecimentos algébricos'],
        color: '#009739'
      },
      portugues: {
        competencias: ['Linguagens, Códigos e suas Tecnologias', 'Compreensão e interpretação textual', 'Análise crítica de linguagens e artes'],
        componentes: ['Estudo do texto', 'Análise linguística', 'Literatura e artes', 'Educação física e tecnologias'],
        color: '#8b5cf6'
      },
      linguagens: {
        competencias: ['Linguagens, Códigos e suas Tecnologias', 'Compreensão e interpretação textual', 'Análise crítica de linguagens e artes'],
        componentes: ['Estudo do texto', 'Análise linguística', 'Literatura e artes', 'Educação física e tecnologias'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Ciências da Natureza e suas Tecnologias', 'Investigação e explicação de fenômenos', 'Aplicações tecnológicas e ambientais'],
        componentes: ['Física', 'Química', 'Biologia'],
        color: '#10b981'
      },
      historia: {
        competencias: ['Ciências Humanas e suas Tecnologias', 'Análise de processos históricos e sociais', 'Compreensão do espaço e cidadania'],
        componentes: ['História', 'Geografia', 'Filosofia e Sociologia'],
        color: '#f59e0b'
      },
      humanas: {
        competencias: ['Ciências Humanas e suas Tecnologias', 'Análise de processos históricos e sociais', 'Compreensão do espaço e cidadania'],
        componentes: ['História', 'Geografia', 'Filosofia e Sociologia'],
        color: '#f59e0b'
      },
      redacao: {
        competencias: ['Domínio da norma culta escrita', 'Compreensão da proposta e aplicação de áreas do conhecimento', 'Elaboração de proposta de intervenção social'],
        componentes: ['Estrutura dissertativo-argumentativa', 'Coesão e coerência', 'Proposta de intervenção'],
        color: '#ef4444'
      }
    },
    subjectLabels: {
      matematica: 'Matemática e suas Tecnologias',
      portugues: 'Linguagens, Códigos e suas Tecnologias',
      linguagens: 'Linguagens, Códigos e suas Tecnologias',
      ciencias: 'Ciências da Natureza e suas Tecnologias',
      historia: 'Ciências Humanas e suas Tecnologias',
      humanas: 'Ciências Humanas e suas Tecnologias',
      redacao: 'Redação'
    },
    references: [
      {
        title: 'INEP / MEC Brasil',
        description: 'Matrizes de referência e documentos oficiais do ENEM.',
        tone: 'emerald',
        accent: '#009739',
        open: true,
        links: [
          { label: 'Portal Oficial do ENEM - INEP', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem' },
          { label: 'Matriz de Referência do ENEM (PDF)', url: 'https://download.inep.gov.br/download/enem/matriz_referencia.pdf' }
        ]
      }
    ]
  },
  PA: {
    authorityName: 'MEDUCA — Pruebas CRECER y Admisión Universitaria (UP, UTP)',
    badgeLabel: 'Alineación oficial MEDUCA — Pruebas CRECER y Graduandos',
    competencias: {
      matematicas: {
        competencias: ['Razonamiento lógico-matemático', 'Resolución de problemas', 'Pensamiento variacional'],
        componentes: ['Aritmética y Álgebra', 'Geometría y Medida', 'Estadística y Probabilidad'],
        color: '#005293'
      },
      matematica: {
        competencias: ['Razonamiento lógico-matemático', 'Resolución de problemas', 'Pensamiento variacional'],
        componentes: ['Aritmética y Álgebra', 'Geometría y Medida', 'Estadística y Probabilidad'],
        color: '#005293'
      },
      espanol: {
        competencias: ['Comprensión e interpretación lectora', 'Competencia comunicativa y lingüística', 'Análisis crítico'],
        componentes: ['Comprensión textual', 'Gramática y Ortografía', 'Literatura y Expresión'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Explicación de fenómenos científicos', 'Indagación y razonamiento experimental', 'Ciencia y sociedad'],
        componentes: ['Biología y Entorno', 'Física y Química', 'Ciencias de la Tierra'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Pensamiento histórico y espacial', 'Análisis cívico y geográfico', 'Formación ciudadana'],
        componentes: ['Historia de Panamá y Universal', 'Geografía y Democracia', 'Cultura y Sociedad'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      matematica: 'Matemáticas',
      espanol: 'Español',
      ciencias: 'Ciencias',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'MEDUCA Panamá',
        description: 'Documentos oficiales del Ministerio de Educación de Panamá.',
        tone: 'blue',
        accent: '#005293',
        open: true,
        links: [
          { label: 'Ministerio de Educación de Panamá (MEDUCA)', url: 'https://www.meduca.gob.pa/' },
          { label: 'Dirección Nacional de Evaluación Educativa', url: 'https://www.meduca.gob.pa/evaluacion-educativa/' }
        ]
      }
    ]
  },
  CR: {
    authorityName: 'MEP — Pruebas Nacionales Estandarizadas (PNE)',
    badgeLabel: 'Alineación oficial MEP — Pruebas Nacionales Estandarizadas (PNE)',
    competencias: {
      matematica: {
        competencias: ['Razonamiento y argumentación', 'Resolución de problemas', 'Comunicación y representación'],
        componentes: ['Números y Operaciones', 'Relaciones y Álgebra', 'Geometría', 'Estadística y Probabilidad'],
        color: '#002B7F'
      },
      matematicas: {
        competencias: ['Razonamiento y argumentación', 'Resolución de problemas', 'Comunicación y representación'],
        componentes: ['Números y Operaciones', 'Relaciones y Álgebra', 'Geometría', 'Estadística y Probabilidad'],
        color: '#002B7F'
      },
      espanol: {
        competencias: ['Comprensión lectora inferencial y crítica', 'Análisis de textos literarios y no literarios', 'Uso normativo de la lengua'],
        componentes: ['Lectura e Interpretación', 'Expresión Escrita', 'Gramática y Vocabulario'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Comprensión de conceptos científicos', 'Aplicación del método científico', 'Análisis de procesos e impactos'],
        componentes: ['Biología', 'Física', 'Química'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Pensamiento crítico-social', 'Uso e interpretación de fuentes históricas', 'Conciencia geográfica e identidad nacional'],
        componentes: ['Historia de Costa Rica y Mundial', 'Geografía Humana y Física', 'Educación Cívica y Democracia'],
        color: '#f59e0b'
      },
      civica: {
        competencias: ['Comprensión de los principios democráticos', 'Análisis de la organización del Estado y los derechos humanos', 'Participación y convivencia ciudadana'],
        componentes: ['Derechos y Deberes', 'Institucionalidad Democrática', 'Cultura de Paz'],
        color: '#ef4444'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      matematicas: 'Matemáticas',
      espanol: 'Español',
      ciencias: 'Ciencias',
      sociales: 'Estudios Sociales',
      civica: 'Educación Cívica'
    },
    references: [
      {
        title: 'MEP Costa Rica',
        description: 'Información y marcos conceptuales de las Pruebas Nacionales Estandarizadas.',
        tone: 'indigo',
        accent: '#002b7f',
        open: true,
        links: [
          { label: 'Ministerio de Educación Pública de Costa Rica (MEP)', url: 'https://www.mep.go.cr/' },
          { label: 'Dirección de Gestión y Evaluación de la Calidad (DGEC)', url: 'https://dgec.mep.go.cr/' }
        ]
      }
    ]
  },
  GT: {
    authorityName: 'MINEDUC / DIGEDUCA — Evaluación Graduandos',
    badgeLabel: 'Alineación oficial MINEDUC / DIGEDUCA — Evaluación Nacional de Graduandos',
    competencias: {
      matematica: {
        competencias: ['Razonamiento matemático', 'Resolución de problemas', 'Pensamiento lógico-estructurado'],
        componentes: ['Aritmética', 'Álgebra', 'Geometría y Trigonometría', 'Estadística'],
        color: '#4997D0'
      },
      matematicas: {
        competencias: ['Razonamiento matemático', 'Resolución de problemas', 'Pensamiento lógico-estructurado'],
        componentes: ['Aritmética', 'Álgebra', 'Geometría y Trigonometría', 'Estadística'],
        color: '#4997D0'
      },
      lenguaje: {
        competencias: ['Comprensión lectora directa e inferencial', 'Estrategias de lectura crítica', 'Vocabulario en contexto'],
        componentes: ['Estrategias de lectura', 'Análisis de intencionalidad', 'Gramática y Lenguaje'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Comprensión de procesos biológicos y físicos', 'Indagación y pensamiento científico'],
        componentes: ['Biología', 'Física y Química', 'Ecología'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Comprensión del contexto sociocultural', 'Pensamiento crítico histórico', 'Ciudadanía e interculturalidad'],
        componentes: ['Historia y Geografía de Guatemala', 'Estructura social y Democracia'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      matematicas: 'Matemáticas',
      lenguaje: 'Comunicación y Lenguaje',
      ciencias: 'Ciencias Naturales',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'MINEDUC / DIGEDUCA Guatemala',
        description: 'Informes y guías del proceso nacional de Evaluación de Graduandos.',
        tone: 'sky',
        accent: '#4997d0',
        open: true,
        links: [
          { label: 'Dirección General de Evaluación de la Calidad Educativa (DIGEDUCA)', url: 'https://www.mineduc.gob.gt/digeduca/' },
          { label: 'Ministerio de Educación de Guatemala (MINEDUC)', url: 'https://www.mineduc.gob.gt/' }
        ]
      }
    ]
  },
  DO: {
    authorityName: 'MINERD — Pruebas Nacionales',
    badgeLabel: 'Alineación oficial MINERD — Pruebas Nacionales de la República Dominicana',
    competencias: {
      matematica: {
        competencias: ['Razonamiento y argumentación matemática', 'Resolución de problemas contextualizados', 'Comunicación de ideas matemáticas'],
        componentes: ['Numeración y Operaciones', 'Álgebra y Geometría', 'Medición y Estadística'],
        color: '#002D62'
      },
      matematicas: {
        competencias: ['Razonamiento y argumentación matemática', 'Resolución de problemas contextualizados', 'Comunicación de ideas matemáticas'],
        componentes: ['Numeración y Operaciones', 'Álgebra y Geometría', 'Medición y Estadística'],
        color: '#002D62'
      },
      'lengua-espanola': {
        competencias: ['Comprensión de textos ficcionales y funcionales', 'Análisis textual y producción crítica', 'Apropiación lingüística'],
        componentes: ['Comprensión Lectora', 'Estructura Lingüística y Semántica', 'Gramática'],
        color: '#8b5cf6'
      },
      lengua: {
        competencias: ['Comprensión de textos ficcionales y funcionales', 'Análisis textual y producción crítica', 'Apropiación lingüística'],
        componentes: ['Comprensión Lectora', 'Estructura Lingüística y Semántica', 'Gramática'],
        color: '#8b5cf6'
      },
      'ciencias-naturaleza': {
        competencias: ['Explicación científica de fenómenos', 'Diseño de experimentos e indagación', 'Comprensión del medio biofísico'],
        componentes: ['Materia, Energía y Movimiento', 'Seres Vivos y Salud', 'Tierra y Universo'],
        color: '#10b981'
      },
      ciencias: {
        competencias: ['Explicación científica de fenómenos', 'Diseño de experimentos e indagación', 'Comprensión del medio biofísico'],
        componentes: ['Materia, Energía y Movimiento', 'Seres Vivos y Salud', 'Tierra y Universo'],
        color: '#10b981'
      },
      'ciencias-sociales': {
        competencias: ['Análisis de procesos históricos y sociales', 'Pensamiento geográfico y ambiental', 'Conciencia ciudadana e institucional'],
        componentes: ['Historia Dominicana y Universal', 'Geografía y Demografía', 'Ciudadanía y Constitución'],
        color: '#f59e0b'
      },
      sociales: {
        competencias: ['Análisis de procesos históricos y sociales', 'Pensamiento geográfico y ambiental', 'Conciencia ciudadana e institucional'],
        componentes: ['Historia Dominicana y Universal', 'Geografía y Demografía', 'Ciudadanía y Constitución'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      matematicas: 'Matemáticas',
      'lengua-espanola': 'Lengua Española',
      lengua: 'Lengua Española',
      'ciencias-naturaleza': 'Ciencias de la Naturaleza',
      ciencias: 'Ciencias de la Naturaleza',
      'ciencias-sociales': 'Ciencias Sociales',
      sociales: 'Ciencias Sociales'
    },
    references: [
      {
        title: 'MINERD República Dominicana',
        description: 'Sitio oficial de Pruebas Nacionales y Ministerio de Educación.',
        tone: 'blue',
        accent: '#002d62',
        open: true,
        links: [
          { label: 'Ministerio de Educación de la República Dominicana (MINERD)', url: 'https://www.ministeriodeeducacion.gob.do/' },
          { label: 'Dirección de Evaluación de la Calidad Educativa', url: 'https://www.ministeriodeeducacion.gob.do/servicios/docentes/evaluacion-de-la-calidad-educativa' }
        ]
      }
    ]
  }
,
  SV: {
    authorityName: 'MINED — Prueba AVANZO',
    badgeLabel: 'Evaluación Nacional AVANZO — Ministerio de Educación de El Salvador',
    competencias: {
      matematica: {
        competencias: ['Razonamiento lógico matemático', 'Comunicación con lenguaje matemático', 'Aplicación de la matemática al entorno'],
        componentes: ['Aritmética y Álgebra', 'Geometría y Trigonometría', 'Estadística y Probabilidad'],
        color: '#0047ab'
      },
      lenguaje: {
        competencias: ['Comprensión lectora', 'Expresión escrita', 'Comunicación literaria'],
        componentes: ['Lectura de textos literarios', 'Lectura de textos no literarios', 'Sintaxis y morfología'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Comunicación de la información científica', 'Indagación de fenómenos y procesos', 'Aplicación de actitudes científicas'],
        componentes: ['Física', 'Química', 'Biología y Geología'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Análisis de la realidad social e histórica', 'Investigación de la realidad social', 'Participación crítica y responsable'],
        componentes: ['Historia de El Salvador y Centroamérica', 'Geografía y Medio Ambiente', 'Democracia y Derechos Humanos'],
        color: '#f59e0b'
      },
      ingles: {
        competencias: ['Reading comprehension', 'Grammatical accuracy', 'Vocabulary in context'],
        componentes: ['Reading', 'Use of English', 'Pragmatics'],
        color: '#ef4444'
      }
    },
    subjectLabels: {
      matematica: 'Matemática',
      lenguaje: 'Lenguaje y Literatura',
      ciencias: 'Ciencias Naturales',
      sociales: 'Estudios Sociales y Cívica',
      ingles: 'Inglés'
    },
    references: [
      {
        title: 'MINED El Salvador',
        description: 'Información oficial de la Prueba AVANZO y marcos curriculares del MINED.',
        tone: 'blue',
        accent: '#0047ab',
        open: true,
        links: [
          { label: 'Ministerio de Educación de El Salvador (MINED)', url: 'https://www.mined.gob.sv/' },
          { label: 'Plataforma Evaluaciones AVANZO', url: 'https://evaluaciones.mined.gob.sv/' }
        ]
      }
    ]
  },
  HN: {
    authorityName: 'SEDUC — Evaluaciones Nacionales',
    badgeLabel: 'Alineación Curricular SEDUC — Pruebas Formativas y Fin de Ciclo',
    competencias: {
      matematicas: {
        competencias: ['Resolución de problemas', 'Razonamiento y comunicación matemática', 'Representación y modelación'],
        componentes: ['Números y Operaciones', 'Álgebra y Funciones', 'Geometría y Medida', 'Estadística descriptiva'],
        color: '#0073cf'
      },
      espanol: {
        competencias: ['Comprensión lectora', 'Producción de textos', 'Apreciación literaria'],
        componentes: ['Lectura e Interpretación', 'Escritura y Gramática', 'Lenguaje oral y pragmática'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Comprensión de conceptos científicos', 'Análisis de procesos naturales', 'Indagación y experimentación'],
        componentes: ['Los seres vivos y su ambiente', 'La materia y la energía', 'La Tierra y el universo'],
        color: '#10b981'
      },
      sociales: {
        competencias: ['Comprensión de procesos históricos', 'Análisis del espacio geográfico', 'Formación ciudadana y ética'],
        componentes: ['Historia de Honduras', 'Geografía e Interacción Social', 'Democracia y Civismo'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      espanol: 'Español',
      ciencias: 'Ciencias Naturales',
      sociales: 'Estudios Sociales'
    },
    references: [
      {
        title: 'SEDUC Honduras',
        description: 'Secretaría de Educación de Honduras y Currículo Nacional Básico (CNB).',
        tone: 'sky',
        accent: '#0073cf',
        open: true,
        links: [
          { label: 'Secretaría de Educación de Honduras (SEDUC)', url: 'https://www.se.gob.hn/' },
          { label: 'Currículo Nacional Básico (CNB)', url: 'https://www.se.gob.hn/cnb/' }
        ]
      }
    ]
  },
  NI: {
    authorityName: 'MINED / CNU — Educación Secundaria y Admisión',
    badgeLabel: 'Evaluación de Aprendizajes MINED y Examen de Admisión CNU',
    competencias: {
      matematicas: {
        competencias: ['Comprensión conceptual', 'Destreza de cálculo y algorítmica', 'Resolución de problemas aplicados'],
        componentes: ['Aritmética y Álgebra', 'Geometría analítica y euclidiana', 'Funciones y Trigonometría'],
        color: '#0067c6'
      },
      'lengua-literatura': {
        competencias: ['Comprensión lectora y crítica', 'Análisis gramatical y ortográfico', 'Valoración literaria hispanoamericana'],
        componentes: ['Comprensión de textos', 'Morfosintaxis y Ortografía', 'Literatura nicaragüense y universal'],
        color: '#8b5cf6'
      },
      ciencias: {
        competencias: ['Explicación de fenómenos científicos', 'Uso del método científico', 'Conciencia ambiental y biológica'],
        componentes: ['Biología celular y ecología', 'Física elemental', 'Química general'],
        color: '#10b981'
      },
      'geografia-historia': {
        competencias: ['Ubicación espacial y análisis geográfico', 'Comprensión de la evolución histórica', 'Pensamiento crítico social'],
        componentes: ['Geografía de Nicaragua y el mundo', 'Historia nacional y centroamericana', 'Educación cívica'],
        color: '#f59e0b'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      'lengua-literatura': 'Lengua y Literatura',
      ciencias: 'Ciencias Naturales',
      'geografia-historia': 'Geografía e Historia'
    },
    references: [
      {
        title: 'MINED Nicaragua',
        description: 'Ministerio de Educación de Nicaragua y Consejo Nacional de Universidades.',
        tone: 'blue',
        accent: '#0067c6',
        open: true,
        links: [
          { label: 'Ministerio de Educación de Nicaragua (MINED)', url: 'https://www.mined.gob.ni/' },
          { label: 'Consejo Nacional de Universidades (CNU)', url: 'https://www.cnu.edu.ni/' }
        ]
      }
    ]
  },
  PR: {
    authorityName: 'DEPR / College Board — META-PR y PAA',
    badgeLabel: 'Pruebas META-PR y Prueba de Aptitud Académica (PAA)',
    competencias: {
      matematicas: {
        competencias: ['Aptitud matemática y razonamiento cuantitativo', 'Resolución de problemas estratégicos', 'Interpretación de datos y gráficas'],
        componentes: ['Aritmética', 'Álgebra y Funciones', 'Geometría', 'Estadística y Probabilidad'],
        color: '#0050a1'
      },
      lectura: {
        competencias: ['Análisis crítico de lecturas', 'Razonamiento verbal y vocabulario en contexto', 'Redacción indirecta e inferencial'],
        componentes: ['Comprensión de lectura literaria e informativa', 'Vocabulario', 'Estructura del texto y gramática'],
        color: '#8b5cf6'
      },
      ingles: {
        competencias: ['English reading comprehension', 'Language usage and structure', 'Contextual vocabulary'],
        componentes: ['Reading passages', 'Sentence completion and editing', 'Grammar'],
        color: '#ef4444'
      },
      ciencias: {
        competencias: ['Indagación científica', 'Interpretación de modelos y tablas', 'Razonamiento científico'],
        componentes: ['Ciencias Biológicas', 'Ciencias Físicas', 'Ciencias Terrestres y del Espacio'],
        color: '#10b981'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      lectura: 'Lectura y Redacción',
      ingles: 'Inglés',
      ciencias: 'Ciencias'
    },
    references: [
      {
        title: 'DEPR y College Board PR',
        description: 'Departamento de Educación de Puerto Rico y College Board América Latina.',
        tone: 'blue',
        accent: '#0050a1',
        open: true,
        links: [
          { label: 'Departamento de Educación de Puerto Rico', url: 'https://de.pr.gov/' },
          { label: 'College Board Puerto Rico y América Latina (PAA)', url: 'https://latam.collegeboard.org/' }
        ]
      }
    ]
  },
  ES: {
    authorityName: 'MEFP / Universidades — Selectividad (PAU / EBAU)',
    badgeLabel: 'Alineación Currículo LOMLOE — Pruebas de Acceso a la Universidad (PAU / EBAU)',
    competencias: {
      matematicas: {
        competencias: ['Modelización matemática', 'Resolución de problemas con métodos rigurosos', 'Razonamiento y argumentación matemática'],
        componentes: ['Álgebra lineal y Matrices', 'Análisis matemático y Cálculo', 'Geometría en R3', 'Probabilidad y Estadística'],
        color: '#aa151b'
      },
      lengua: {
        competencias: ['Comprensión y comentario crítico de texto', 'Análisis sintáctico y morfológico', 'Conocimiento de la literatura española'],
        componentes: ['Comentario de texto y Cohesión', 'Lengua castellana y Gramática', 'Literatura española contemporánea'],
        color: '#8b5cf6'
      },
      historia: {
        competencias: ['Análisis e interpretación de fuentes históricas', 'Comprensión de procesos historiográficos', 'Sintesis temporal y conceptual'],
        componentes: ['Historia de España contemporánea', 'Procesos socio-políticos de los siglos XIX y XX'],
        color: '#f59e0b'
      },
      ingles: {
        competencias: ['Reading comprehension', 'Written expression and synthesis', 'Use of English'],
        componentes: ['Text analysis', 'Writing task', 'Use of English and grammar'],
        color: '#ef4444'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      lengua: 'Lengua Castellana y Literatura',
      historia: 'Historia de España',
      ingles: 'Inglés'
    },
    references: [
      {
        title: 'Ministerio de Educación y Formación Profesional',
        description: 'Normativa oficial EBAU/PAU y currículo de Bachillerato (LOMLOE).',
        tone: 'red',
        accent: '#aa151b',
        open: true,
        links: [
          { label: 'Ministerio de Educación y Formación Profesional', url: 'https://www.educacionfpe.gob.es/' },
          { label: 'Información EBAU / PAU', url: 'https://www.educacionfpe.gob.es/enseñanzas/bachillerato/ebau.html' }
        ]
      }
    ]
  },
  GQ: {
    authorityName: 'UNGE / Ministerio de Educación — Selectividad Nacional',
    badgeLabel: 'Pruebas de Acceso a la Universidad — Universidad Nacional de Guinea Ecuatorial',
    competencias: {
      matematicas: {
        competencias: ['Dominio del cálculo y álgebra', 'Resolución de problemas geométricos', 'Análisis de datos cuantitativos'],
        componentes: ['Álgebra y Funciones', 'Geometría y Trigonometría', 'Estadística descriptiva'],
        color: '#319400'
      },
      lengua: {
        competencias: ['Comprensión y análisis de textos en español', 'Expresión escrita y ortografía', 'Gramática e historia de la lengua'],
        componentes: ['Lectura comprensiva', 'Morfosintaxis y Léxico', 'Literatura hispanoafricana y española'],
        color: '#8b5cf6'
      },
      historia: {
        competencias: ['Análisis del devenir histórico nacional y continental', 'Comprensión del contexto sociopolítico', 'Interpretación geográfica'],
        componentes: ['Historia de Guinea Ecuatorial y África', 'Geografía física y humana de África'],
        color: '#f59e0b'
      },
      frances: {
        competencias: ['Compréhension écrite', 'Production écrite', 'Grammaire et vocabulaire'],
        componentes: ['Compréhension de texte', 'Grammaire et conjugaison', 'Vocabulaire'],
        color: '#002395'
      }
    },
    subjectLabels: {
      matematicas: 'Matemáticas',
      lengua: 'Lengua Española',
      historia: 'Historia',
      frances: 'Francés'
    },
    references: [
      {
        title: 'UNGE y Ministerio de Educación GQ',
        description: 'Universidad Nacional de Guinea Ecuatorial y Ministerio de Educación.',
        tone: 'emerald',
        accent: '#319400',
        open: true,
        links: [
          { label: 'Universidad Nacional de Guinea Ecuatorial (UNGE)', url: 'https://www.unge.education/' },
          { label: 'Gobierno de la República de Guinea Ecuatorial', url: 'https://www.guineaecuatorialpress.com/' }
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
