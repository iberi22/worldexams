// World Exams - Country Configuration Types
// Shared types for all country repositories

/**
 * Country codes supported by World Exams
 */
export type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'US' | 'PA' | 'CR' | 'GT' | 'DO' | 'SV' | 'HN' | 'NI' | 'ES' | 'PR' | 'GQ' | 'UY' | 'PY' | 'BO';

/**
 * Supported languages
 */
export type LanguageCode = 'es-CO' | 'es-MX' | 'es-AR' | 'es-CL' | 'es-PE' | 'es-EC' | 'pt-BR' | 'en-US' | 'es-PA' | 'es-CR' | 'es-GT' | 'es-DO' | 'es-SV' | 'es-HN' | 'es-NI' | 'es-ES' | 'es-PR' | 'es-GQ' | 'es-UY' | 'es-PY' | 'es-BO';

/**
 * Grade configuration for a country
 */
export interface GradeConfig {
  id: number;
  name: string;
  description?: string;
}

/**
 * Subject configuration for a country
 */
export interface SubjectConfig {
  id: string;
  name: string;
  icon: string;
  globalId: string; // Mapping to global subject ID for sync
}

/**
 * Theme colors for a country
 */
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bgDark: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
}

/**
 * Cultural context for content generation
 */
export interface CulturalContext {
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  cities: string[];
  commonNames: {
    male: string[];
    female: string[];
  };
  culturalReferences: string[];
  languageVariant?: string; // e.g., "voseo" for Argentina
}

export interface ProductFeatures {
  blog?: boolean;
  preuniversitario?: boolean;
  developerPortal?: boolean;
  comments?: boolean;
  mathVideos?: boolean;
}

export interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  lang?: string;
}

export interface ProductConfig {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  guideLabel: string;
  guideYear: number;
  seoKeywords: string[];
  defaultDescription: string;
  features?: ProductFeatures;
  giscus?: GiscusConfig;
}

/**
 * Complete country configuration
 */
export interface CountryConfig {
  // Basic info
  code: CountryCode;
  name: string;
  nameEnglish: string;
  flag: string;

  // Exam info
  examName: string;
  examFullName: string;
  examAuthority: string;

  // Locale settings
  locale: LanguageCode;
  timezone: string;

  // Educational structure
  grades: GradeConfig[];
  subjects: SubjectConfig[];

  // Visual identity
  theme: ThemeConfig;

  // Cultural context for content
  culture: CulturalContext;

  // URLs
  domain?: string;
  githubRepo: string;

  // Product runtime metadata
  product: ProductConfig;
}

// =============================================================================
// COUNTRY CONFIGURATIONS
// =============================================================================

/**
 * 🇨🇴 Colombia - ICFES Saber
 */
export const colombiaConfig: CountryConfig = {
  code: 'CO',
  name: 'Colombia',
  nameEnglish: 'Colombia',
  flag: '🇨🇴',

  examName: 'ICFES Saber',
  examFullName: 'Pruebas Saber del Instituto Colombiano para la Evaluación de la Educación',
  examAuthority: 'ICFES',

  locale: 'es-CO',
  timezone: 'America/Bogota',

  grades: [
    { id: 3, name: '3° Primaria', description: 'Tercer grado de primaria' },
    { id: 5, name: '5° Primaria', description: 'Quinto grado de primaria' },
    { id: 7, name: '7° Secundaria', description: 'Séptimo grado' },
    { id: 9, name: '9° Secundaria', description: 'Noveno grado' },
    { id: 11, name: '11° Media', description: 'Undécimo grado (Saber 11)' },
  ],

  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'lenguaje', name: 'Lenguaje', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
    { id: 'ingles', name: 'Inglés', icon: '🇬🇧', globalId: 'english' },
    { id: 'lectura-critica', name: 'Lectura Crítica', icon: '📚', globalId: 'reading' },
  ],

  theme: {
    primary: '#FCD116',      // Amarillo - Oro
    secondary: '#003893',    // Azul - Cielos
    accent: '#CE1126',       // Rojo - Sangre de héroes
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'COP', symbol: '$', name: 'Pesos colombianos' },
    cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'],
    commonNames: {
      male: ['Juan', 'Carlos', 'Andrés', 'Santiago', 'Sebastián', 'Daniel'],
      female: ['María', 'Valentina', 'Sofía', 'Isabella', 'Camila', 'Laura'],
    },
    culturalReferences: ['café', 'vallenato', 'cumbia', 'orquídeas', 'esmeraldas', 'sombrero vueltiao'],
  },

  githubRepo: 'worldexams/saber-co',
  product: {
    siteName: 'SaberParaTodos',
    siteUrl: 'https://saberparatodos.space',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'ICFES',
    guideYear: 2026,
    seoKeywords: [
      'simulacro icfes gratis',
      'simulacro saber 11',
      'preicfes gratis',
      'banco de preguntas icfes',
      'pruebas saber colombia',
      'practicar icfes online',
      'preguntas icfes matematicas',
      'preguntas icfes lectura critica',
      'guia saber 11',
      'examen icfes online',
    ],
    defaultDescription: 'Practica gratis para el ICFES Saber 11 con simulacros, banco de preguntas y guías por área. Matemáticas, Lectura Crítica, Inglés, Ciencias y más.',
    features: {
      blog: false,
      preuniversitario: true,
      developerPortal: true,
      comments: true,
      mathVideos: true,
    },
    giscus: {
      repo: 'worldexams/worldexams',
      repoId: 'R_kgDONXw98Q',
      category: 'Announcements',
      categoryId: 'DIC_kwDONXw98c4Ckz9-',
      lang: 'es',
    },
  },
};

/**
 * 🇲🇽 México - PLANEA
 */
export const mexicoConfig: CountryConfig = {
  code: 'MX',
  name: 'México',
  nameEnglish: 'Mexico',
  flag: '🇲🇽',

  examName: 'EXANI-II',
  examFullName: 'Examen Nacional de Ingreso a la Educación Superior',
  examAuthority: 'CENEVAL / SEP',

  locale: 'es-MX',
  timezone: 'America/Mexico_City',

  grades: [
    { id: 3, name: '3° Primaria', description: 'Tercer grado de primaria' },
    { id: 4, name: '4° Primaria', description: 'Cuarto grado de primaria' },
    { id: 5, name: '5° Primaria', description: 'Quinto grado de primaria' },
    { id: 6, name: '6° Primaria', description: 'Sexto grado de primaria' },
    { id: 7, name: '1° Secundaria', description: 'Primer grado de secundaria' },
    { id: 8, name: '2° Secundaria', description: 'Segundo grado de secundaria' },
    { id: 9, name: '3° Secundaria', description: 'Tercer grado de secundaria' },
    { id: 12, name: '3° Preparatoria', description: 'Tercer grado de preparatoria' },
  ],

  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'espanol', name: 'Español', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias', icon: '🔬', globalId: 'science' },
    { id: 'historia', name: 'Historia', icon: '📜', globalId: 'social' },
    { id: 'civica', name: 'Formación Cívica y Ética', icon: '🏛️', globalId: 'civics' },
  ],

  theme: {
    primary: '#006847',      // Verde - Independencia
    secondary: '#CE1126',    // Rojo - Sangre
    accent: '#FFD700',       // Dorado - Sol azteca
    bgDark: '#1e1e2f',
    bgCard: '#1a2744',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'MXN', symbol: '$', name: 'Pesos mexicanos' },
    cities: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún', 'Tijuana'],
    commonNames: {
      male: ['José', 'Luis', 'Miguel', 'Francisco', 'Diego', 'Alejandro'],
      female: ['María', 'Guadalupe', 'Fernanda', 'Gabriela', 'Andrea', 'Valentina'],
    },
    culturalReferences: ['tacos', 'mariachi', 'Día de Muertos', 'pirámides', 'alebrijes', 'cempasúchil'],
  },

  githubRepo: 'worldexams/saber-mx',
  product: {
    siteName: 'WorldExams Mexico',
    siteUrl: 'https://world-exams.github.io/saber-mx',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'EXANI',
    guideYear: 2026,
    seoKeywords: [
      'guia exani',
      'simulacro exani',
      'planea mexico',
      'admision universitaria mexico',
      'practica ceneval'
    ],
    defaultDescription: 'Practica con simulacros y guias para EXANI y otras pruebas de admision en Mexico.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
  },
};

/**
 * 🇦🇷 Argentina - APRENDER
 */
export const argentinaConfig: CountryConfig = {
  code: 'AR',
  name: 'Argentina',
  nameEnglish: 'Argentina',
  flag: '🇦🇷',

  examName: 'APRENDER',
  examFullName: 'Aprender - Evaluación Nacional de Aprendizajes',
  examAuthority: 'Ministerio de Educación',

  locale: 'es-AR',
  timezone: 'America/Argentina/Buenos_Aires',

  grades: [
    { id: 3, name: '3° Primaria', description: 'Tercer grado de primaria' },
    { id: 6, name: '6° Primaria', description: 'Sexto grado de primaria' },
    { id: 9, name: '3° Secundaria', description: 'Tercer año de secundaria' },
    { id: 12, name: '6° Secundaria', description: 'Sexto año de secundaria' },
  ],

  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua', icon: '📖', globalId: 'language' },
    { id: 'cs-naturales', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'cs-sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],

  theme: {
    primary: '#74ACDF',      // Celeste - Cielo
    secondary: '#FFFFFF',    // Blanco
    accent: '#F6B40E',       // Dorado - Sol de Mayo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'ARS', symbol: '$', name: 'Pesos argentinos' },
    cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata'],
    commonNames: {
      male: ['Matías', 'Nicolás', 'Tomás', 'Facundo', 'Agustín', 'Martín'],
      female: ['Florencia', 'Camila', 'Luciana', 'Valentina', 'Sofía', 'Martina'],
    },
    culturalReferences: ['tango', 'asado', 'mate', 'fútbol', 'gaucho', 'dulce de leche'],
    languageVariant: 'voseo', // Usar "vos" en lugar de "tú"
  },

  githubRepo: 'worldexams/saber-ar',
  product: {
    siteName: 'WorldExams Argentina',
    siteUrl: 'https://world-exams.github.io/ar',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'APRENDER',
    guideYear: 2026,
    seoKeywords: ['aprender argentina', 'simulacro aprender', 'practica escolar argentina'],
    defaultDescription: 'Plantilla de producto para practica y preparacion de evaluaciones nacionales en Argentina.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
  },
};

/**
 * 🇨🇱 Chile - SIMCE
 */
export const chileConfig: CountryConfig = {
  code: 'CL',
  name: 'Chile',
  nameEnglish: 'Chile',
  flag: '🇨🇱',

  examName: 'SIMCE',
  examFullName: 'Sistema de Medición de la Calidad de la Educación',
  examAuthority: 'Agencia de Calidad de la Educación',

  locale: 'es-CL',
  timezone: 'America/Santiago',

  grades: [
    { id: 4, name: '4° Básico', description: 'Cuarto año básico' },
    { id: 8, name: '8° Básico', description: 'Octavo año básico' },
    { id: 10, name: '2° Medio', description: 'Segundo año medio' },
    { id: 12, name: '4° Medio', description: 'Cuarto año medio' },
  ],

  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lenguaje', name: 'Lenguaje y Comunicación', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'historia', name: 'Historia, Geografía y Cs. Sociales', icon: '🌍', globalId: 'social' },
  ],

  theme: {
    primary: '#D52B1E',      // Rojo - Sangre mapuche
    secondary: '#FFFFFF',    // Blanco - Nieve andina
    accent: '#0039A6',       // Azul - Océano Pacífico
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'CLP', symbol: '$', name: 'Pesos chilenos' },
    cities: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'Viña del Mar', 'Temuco'],
    commonNames: {
      male: ['Sebastián', 'Benjamín', 'Matías', 'Vicente', 'Martín', 'Joaquín'],
      female: ['Sofía', 'Martina', 'Florencia', 'Valentina', 'Isidora', 'Catalina'],
    },
    culturalReferences: ['cueca', 'empanadas', 'cóndor', 'cordillera', 'copihue', 'huaso'],
  },

  githubRepo: 'worldexams/saber-cl',
  product: {
    siteName: 'WorldExams Chile',
    siteUrl: 'https://world-exams.github.io/cl',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'SIMCE',
    guideYear: 2026,
    seoKeywords: ['simce chile', 'practica simce', 'evaluacion escolar chile'],
    defaultDescription: 'Plantilla de producto para practica y preparacion de evaluaciones nacionales en Chile.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
  },
};

/**
 * 🇵🇪 Perú - ECE
 */
export const peruConfig: CountryConfig = {
  code: 'PE',
  name: 'Perú',
  nameEnglish: 'Peru',
  flag: '🇵🇪',

  examName: 'ECE',
  examFullName: 'Evaluación Censal de Estudiantes',
  examAuthority: 'MINEDU / UMC',

  locale: 'es-PE',
  timezone: 'America/Lima',

  grades: [
    { id: 2, name: '2° Primaria', description: 'Segundo grado de primaria' },
    { id: 4, name: '4° Primaria', description: 'Cuarto grado de primaria' },
    { id: 6, name: '6° Primaria', description: 'Sexto grado de primaria' },
    { id: 9, name: '2° Secundaria', description: 'Segundo grado de secundaria' },
    { id: 11, name: '4° Secundaria', description: 'Cuarto grado de secundaria' },
  ],

  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'comunicacion', name: 'Comunicación', icon: '📖', globalId: 'language' },
    { id: 'ciencia', name: 'Ciencia y Tecnología', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],

  theme: {
    primary: '#D91023',      // Rojo - Sangre incaica
    secondary: '#FFFFFF',    // Blanco
    accent: '#FFD700',       // Dorado - Oro inca
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'PEN', symbol: 'S/', name: 'Soles' },
    cities: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo', 'Piura'],
    commonNames: {
      male: ['Luis', 'José', 'Carlos', 'Jorge', 'Miguel', 'Diego'],
      female: ['María', 'Rosa', 'Ana', 'Carmen', 'Lucía', 'Valeria'],
    },
    culturalReferences: ['Machu Picchu', 'ceviche', 'llama', 'vicuña', 'quipu', 'incas'],
  },

  githubRepo: 'worldexams/saber-pe',
  product: {
    siteName: 'WorldExams Peru',
    siteUrl: 'https://world-exams.github.io/pe',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'ECE',
    guideYear: 2026,
    seoKeywords: ['ece peru', 'simulacro ece', 'evaluacion censal estudiantes'],
    defaultDescription: 'Plantilla de producto para practica y preparacion de evaluaciones nacionales en Peru.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
  },
};

/**
 * 🇪🇨 Ecuador - SENESCYT
 */
export const ecuadorConfig: CountryConfig = {
  code: 'EC',
  name: 'Ecuador',
  nameEnglish: 'Ecuador',
  flag: '🇪🇨',

  examName: 'SENESCYT',
  examFullName: 'Sistema Nacional de Nivelacion y Admision',
  examAuthority: 'SENESCYT',

  locale: 'es-EC',
  timezone: 'America/Guayaquil',

  grades: [
    { id: 3, name: '3° EGB', description: 'Tercer grado de educacion general basica' },
    { id: 6, name: '6° EGB', description: 'Sexto grado de educacion general basica' },
    { id: 9, name: '9° EGB', description: 'Noveno grado de educacion general basica' },
    { id: 12, name: '3° Bachillerato', description: 'Tercer curso de bachillerato' },
  ],

  subjects: [
    { id: 'matematica', name: 'Matematica', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua y Literatura', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Estudios Sociales', icon: '🌍', globalId: 'social' },
  ],

  theme: {
    primary: '#FCD116',
    secondary: '#003893',
    accent: '#CE1126',
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'USD', symbol: '$', name: 'Dolares estadounidenses' },
    cities: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Manta', 'Loja'],
    commonNames: {
      male: ['Mateo', 'Jose', 'Juan', 'Daniel', 'David', 'Andres'],
      female: ['Sofia', 'Camila', 'Valentina', 'Maria', 'Isabella', 'Daniela'],
    },
    culturalReferences: ['Mitad del Mundo', 'Galapagos', 'pasillo', 'ceviche', 'cacao', 'Cotopaxi'],
  },

  githubRepo: 'worldexams/saber-ec',
  product: {
    siteName: 'WorldExams Ecuador',
    siteUrl: 'https://world-exams.github.io/ec',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'SENESCYT',
    guideYear: 2026,
    seoKeywords: ['senescyt ecuador', 'simulacro senescyt', 'admision universitaria ecuador'],
    defaultDescription: 'Practica con simulacros y guias para SENESCYT y procesos de admision universitaria en Ecuador.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
  },
};

/**
 * 🇧🇷 Brasil - ENEM
 */
export const brasilConfig: CountryConfig = {
  code: 'BR',
  name: 'Brasil',
  nameEnglish: 'Brazil',
  flag: '🇧🇷',

  examName: 'ENEM',
  examFullName: 'Exame Nacional do Ensino Médio',
  examAuthority: 'INEP / MEC',

  locale: 'pt-BR',
  timezone: 'America/Sao_Paulo',

  grades: [
    { id: 5, name: '5º Ano', description: 'Quinto ano do ensino fundamental' },
    { id: 7, name: '7º Ano', description: 'Sétimo ano do ensino fundamental' },
    { id: 9, name: '9º Ano', description: 'Nono ano do ensino fundamental' },
    { id: 12, name: '3º Ano EM', description: 'Terceiro ano do ensino médio' },
  ],

  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'portugues', name: 'Língua Portuguesa', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciências da Natureza', icon: '🔬', globalId: 'science' },
    { id: 'historia', name: 'Ciências Humanas', icon: '🌍', globalId: 'social' },
    { id: 'redacao', name: 'Redação', icon: '✍️', globalId: 'writing' },
  ],

  theme: {
    primary: '#009739',      // Verde - Selva amazónica
    secondary: '#FEDD00',    // Amarillo - Riqueza
    accent: '#002776',       // Azul - Cielo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'BRL', symbol: 'R$', name: 'Reais' },
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Belo Horizonte', 'Fortaleza'],
    commonNames: {
      male: ['João', 'Pedro', 'Lucas', 'Gabriel', 'Matheus', 'Rafael'],
      female: ['Maria', 'Ana', 'Juliana', 'Fernanda', 'Beatriz', 'Camila'],
    },
    culturalReferences: ['samba', 'carnaval', 'futebol', 'Amazônia', 'Cristo Redentor', 'capoeira'],
  },

  githubRepo: 'worldexams/saber-br',
  product: {
    siteName: 'WorldExams Brasil',
    siteUrl: 'https://world-exams.github.io/br',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'ENEM',
    guideYear: 2026,
    seoKeywords: ['enem brasil', 'simulado enem', 'pratica enem'],
    defaultDescription: 'Modelo de producto para practica e preparacao de avaliacoes nacionales no Brasil.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
    giscus: {
      repo: 'worldexams/worldexams',
      repoId: 'R_kgDONXw98Q',
      category: 'Announcements',
      categoryId: 'DIC_kwDONXw98c4Ckz9-',
      lang: 'pt',
    },
  },
};

/**
 * 🇺🇸 USA - SAT/ACT
 */
export const usaConfig: CountryConfig = {
  code: 'US',
  name: 'Estados Unidos',
  nameEnglish: 'United States',
  flag: '🇺🇸',

  examName: 'SAT',
  examFullName: 'SAT (Scholastic Assessment Test)',
  examAuthority: 'College Board',

  locale: 'en-US',
  timezone: 'America/New_York',

  grades: [
    { id: 8, name: '8th Grade', description: 'Eighth grade (Middle School)' },
    { id: 10, name: '10th Grade', description: 'Tenth grade (Sophomore)' },
    { id: 11, name: '11th Grade', description: 'Eleventh grade (Junior)' },
    { id: 12, name: '12th Grade', description: 'Twelfth grade (Senior)' },
  ],

  subjects: [
    { id: 'math', name: 'Mathematics', icon: '🔢', globalId: 'math' },
    { id: 'english', name: 'English', icon: '📖', globalId: 'language' },
    { id: 'science', name: 'Science', icon: '🔬', globalId: 'science' },
    { id: 'history', name: 'History', icon: '📜', globalId: 'social' },
    { id: 'reading', name: 'Reading', icon: '📚', globalId: 'reading' },
  ],

  theme: {
    primary: '#3C3B6E',      // Azul - Unión
    secondary: '#B22234',    // Rojo - Valor
    accent: '#FFFFFF',       // Blanco - Pureza
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },

  culture: {
    currency: { code: 'USD', symbol: '$', name: 'Dollars' },
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'],
    commonNames: {
      male: ['James', 'Michael', 'William', 'David', 'John', 'Christopher'],
      female: ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia', 'Charlotte'],
    },
    culturalReferences: ['baseball', 'Thanksgiving', 'Fourth of July', 'Hollywood', 'NASA', 'Silicon Valley'],
  },

  githubRepo: 'worldexams/saber-us',
  product: {
    siteName: 'WorldExams US',
    siteUrl: 'https://world-exams.github.io/us',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'SAT',
    guideYear: 2026,
    seoKeywords: ['sat practice', 'exam prep usa', 'high school assessment practice'],
    defaultDescription: 'Shared product runtime for practice and preparation around US academic assessments.',
    features: {
      blog: false,
      preuniversitario: false,
      developerPortal: true,
      comments: true,
    },
    giscus: {
      repo: 'worldexams/worldexams',
      repoId: 'R_kgDONXw98Q',
      category: 'Announcements',
      categoryId: 'DIC_kwDONXw98c4Ckz9-',
      lang: 'en',
    },
  },
};

/**
 * 🇵🇦 Panamá - CRECER / Graduandos
 */
export const panamaConfig: CountryConfig = {
  code: 'PA',
  name: 'Panamá',
  nameEnglish: 'Panama',
  flag: '🇵🇦',
  examName: 'CRECER / Graduandos',
  examFullName: 'Pruebas Nacionales CRECER y de Graduandos',
  examAuthority: 'MEDUCA',
  locale: 'es-PA',
  timezone: 'America/Panama',
  grades: [
    { id: 3, name: '3° Primaria', description: 'Tercer grado de educación básica' },
    { id: 6, name: '6° Primaria', description: 'Sexto grado de educación básica' },
    { id: 9, name: '9° Pre-Media', description: 'Noveno grado (Tercer año de pre-media)' },
    { id: 12, name: '12° Media', description: 'Duodécimo grado (Tercer año de media)' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'espanol', name: 'Español', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#005293',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#D21034',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'USD', symbol: '$', name: 'Balboas / Dólares' },
    cities: ['Ciudad de Panamá', 'Colón', 'David', 'La Chorrera', 'Santiago'],
    commonNames: {
      male: ['Ricardo', 'Jorge', 'Alberto', 'Carlos', 'Luis'],
      female: ['María', 'Ana', 'Yariela', 'Zulay', 'Itzel'],
    },
    culturalReferences: ['Canal de Panamá', 'puente de las Américas', 'pollera', 'tamborito', 'sancocho'],
  },
  githubRepo: 'worldexams/saber-pa',
  product: {
    siteName: 'WorldExams Panamá',
    siteUrl: 'https://world-exams.github.io/pa',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MEDUCA',
    guideYear: 2026,
    seoKeywords: ['pruebas graduandos panama', 'meduca crecer', 'simulacro panama'],
    defaultDescription: 'Práctica para pruebas nacionales CRECER y de Graduandos en Panamá.',
  },
};

/**
 * 🇨🇷 Costa Rica - Pruebas Nacionales
 */
export const costaRicaConfig: CountryConfig = {
  code: 'CR',
  name: 'Costa Rica',
  nameEnglish: 'Costa Rica',
  flag: '🇨🇷',
  examName: 'PNE',
  examFullName: 'Pruebas Nacionales Estandarizadas',
  examAuthority: 'MEP',
  locale: 'es-CR',
  timezone: 'America/Costa_Rica',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado (II Ciclo)' },
    { id: 9, name: '9° Secundaria', description: 'Noveno año (III Ciclo)' },
    { id: 11, name: '11° Bachillerato', description: 'Undécimo año (Educación Diversificada)' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'espanol', name: 'Español', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Estudios Sociales', icon: '🌍', globalId: 'social' },
    { id: 'civica', name: 'Educación Cívica', icon: '🏛️', globalId: 'civics' },
  ],
  theme: {
    primary: '#002B7F',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#CE1126',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'CRC', symbol: '₡', name: 'Colones' },
    cities: ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Puntarenas', 'Limón'],
    commonNames: {
      male: ['José', 'Luis', 'Carlos', 'Andrey', 'Keylor'],
      female: ['María', 'Ana', 'Daniela', 'Ximena', 'Valeria'],
    },
    culturalReferences: ['Pura Vida', 'volcán Arenal', 'café', 'gallo pinto', 'carreta típica'],
  },
  githubRepo: 'worldexams/saber-cr',
  product: {
    siteName: 'WorldExams Costa Rica',
    siteUrl: 'https://world-exams.github.io/cr',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MEP',
    guideYear: 2026,
    seoKeywords: ['pruebas nacionales estandarizadas', 'mep costa rica', 'simulacro cr'],
    defaultDescription: 'Preparación para las Pruebas Nacionales Estandarizadas del MEP en Costa Rica.',
  },
};

/**
 * 🇬🇹 Guatemala - Graduandos
 */
export const guatemalaConfig: CountryConfig = {
  code: 'GT',
  name: 'Guatemala',
  nameEnglish: 'Guatemala',
  flag: '🇬🇹',
  examName: 'Graduandos',
  examFullName: 'Evaluación Nacional de Graduandos',
  examAuthority: 'MINEDUC',
  locale: 'es-GT',
  timezone: 'America/Guatemala',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado primaria' },
    { id: 9, name: '3° Básico', description: 'Tercer año de ciclo básico' },
    { id: 11, name: 'Diversificado', description: 'Último año de ciclo diversificado' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lenguaje', name: 'Comunicación y Lenguaje', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#4997D0',      // Celeste
    secondary: '#FFFFFF',    // Blanco
    accent: '#0061A0',       // Azul oscuro
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'GTQ', symbol: 'Q', name: 'Quetzales' },
    cities: ['Ciudad de Guatemala', 'Mixco', 'Quetzaltenango', 'Villa Nueva', 'Antigua'],
    commonNames: {
      male: ['Juan', 'José', 'Carlos', 'Luis', 'Rigoberto'],
      female: ['María', 'Ana', 'Rosa', 'Glenda', 'Xiomara'],
    },
    culturalReferences: ['Tikal', 'Quetzal', 'marimba', 'volcanes', 'tejidos típicos'],
  },
  githubRepo: 'worldexams/saber-gt',
  product: {
    siteName: 'WorldExams Guatemala',
    siteUrl: 'https://world-exams.github.io/gt',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MINEDUC',
    guideYear: 2026,
    seoKeywords: ['evaluacion graduandos guatemala', 'mineduc', 'simulacro gt'],
    defaultDescription: 'Práctica para la evaluación nacional de graduandos en Guatemala.',
  },
};

/**
 * 🇩🇴 República Dominicana - Pruebas Nacionales
 */
export const dominicanRepublicConfig: CountryConfig = {
  code: 'DO',
  name: 'República Dominicana',
  nameEnglish: 'Dominican Republic',
  flag: '🇩🇴',
  examName: 'Pruebas Nacionales',
  examFullName: 'Pruebas Nacionales de la República Dominicana',
  examAuthority: 'MINERD',
  locale: 'es-DO',
  timezone: 'America/Santo_Domingo',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado primaria' },
    { id: 9, name: '3° Secundaria', description: 'Tercer grado de secundaria' },
    { id: 12, name: '6° Secundaria', description: 'Sexto grado de secundaria' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lengua-espanola', name: 'Lengua Española', icon: '📖', globalId: 'language' },
    { id: 'ciencias-naturaleza', name: 'Ciencias de la Naturaleza', icon: '🔬', globalId: 'science' },
    { id: 'ciencias-sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#002D62',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#CE1126',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'DOP', symbol: '$', name: 'Pesos dominicanos' },
    cities: ['Santo Domingo', 'Santiago', 'La Romana', 'Puerto Plata', 'Punta Cana'],
    commonNames: {
      male: ['Juan', 'José', 'Luis', 'Nelson', 'Rafael'],
      female: ['María', 'Altagracia', 'Carmen', 'Rosa', 'Yanet'],
    },
    culturalReferences: ['Béisbol', 'Merengue', 'Bachata', 'Zona Colonial', 'mangú'],
  },
  githubRepo: 'worldexams/saber-do',
  product: {
    siteName: 'WorldExams Dominicana',
    siteUrl: 'https://world-exams.github.io/do',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MINERD',
    guideYear: 2026,
    seoKeywords: ['pruebas nacionales dominicana', 'minerd', 'simulacro do'],
    defaultDescription: 'Simulacros y práctica para las Pruebas Nacionales de República Dominicana.',
  },
};

/**
 * 🇸🇻 El Salvador - AVANZO
 */
export const elSalvadorConfig: CountryConfig = {
  code: 'SV',
  name: 'El Salvador',
  nameEnglish: 'El Salvador',
  flag: '🇸🇻',
  examName: 'AVANZO',
  examFullName: 'Prueba AVANZO',
  examAuthority: 'MINED',
  locale: 'es-SV',
  timezone: 'America/El_Salvador',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado' },
    { id: 9, name: '9° Secundaria', description: 'Noveno grado' },
    { id: 11, name: 'Bachillerato', description: 'Segundo año de bachillerato' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lenguaje', name: 'Lenguaje y Literatura', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Estudios Sociales y Cívica', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#0047AB',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#D1D1D1',       // Gris/Plata
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'USD', symbol: '$', name: 'Dólar / Bitcoin' },
    cities: ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango', 'Santa Tecla'],
    commonNames: {
      male: ['José', 'Luis', 'Carlos', 'Nayib', 'Jorge'],
      female: ['María', 'Ana', 'Guadalupe', 'Fátima', 'Elena'],
    },
    culturalReferences: ['Pupusas', 'volcán de Izalco', 'Surf City', 'Joya de Cerén', 'Torogoz'],
  },
  githubRepo: 'worldexams/saber-sv',
  product: {
    siteName: 'WorldExams El Salvador',
    siteUrl: 'https://world-exams.github.io/sv',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MINED',
    guideYear: 2026,
    seoKeywords: ['prueba avanzo', 'mined el salvador', 'simulacro sv'],
    defaultDescription: 'Prepárate para la prueba AVANZO en El Salvador.',
  },
};

/**
 * 🇭🇳 Honduras - Pruebas Nacionales
 */
export const hondurasConfig: CountryConfig = {
  code: 'HN',
  name: 'Honduras',
  nameEnglish: 'Honduras',
  flag: '🇭🇳',
  examName: 'Pruebas Nacionales',
  examFullName: 'Pruebas Nacionales de Honduras',
  examAuthority: 'SEDUC',
  locale: 'es-HN',
  timezone: 'America/Tegucigalpa',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado' },
    { id: 9, name: '9° Secundaria', description: 'Noveno grado' },
    { id: 11, name: 'Bachillerato', description: 'Último año de media' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'espanol', name: 'Español', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Estudios Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#0073CF',      // Azul Maya
    secondary: '#FFFFFF',    // Blanco
    accent: '#00BFFF',       // Celeste
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'HNL', symbol: 'L', name: 'Lempiras' },
    cities: ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choloma', 'Comayagua'],
    commonNames: {
      male: ['Juan', 'José', 'Carlos', 'Luis', 'Rigoberto'],
      female: ['María', 'Ana', 'Xiomara', 'Suyapa', 'Iris'],
    },
    culturalReferences: ['Copán Ruinas', 'Baleadas', 'Punta', 'Islas de la Bahía', 'Lempira'],
  },
  githubRepo: 'worldexams/saber-hn',
  product: {
    siteName: 'WorldExams Honduras',
    siteUrl: 'https://world-exams.github.io/hn',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'SEDUC',
    guideYear: 2026,
    seoKeywords: ['pruebas nacionales honduras', 'seduc', 'simulacro hn'],
    defaultDescription: 'Práctica para las pruebas nacionales de Honduras.',
  },
};

/**
 * 🇳🇮 Nicaragua - Bachillerato
 */
export const nicaraguaConfig: CountryConfig = {
  code: 'NI',
  name: 'Nicaragua',
  nameEnglish: 'Nicaragua',
  flag: '🇳🇮',
  examName: 'Bachillerato',
  examFullName: 'Exámenes de Bachillerato',
  examAuthority: 'MINED',
  locale: 'es-NI',
  timezone: 'America/Managua',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto grado' },
    { id: 9, name: '9° Secundaria', description: 'Noveno grado' },
    { id: 11, name: '11° Bachillerato', description: 'Undécimo grado' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'lengua-literatura', name: 'Lengua y Literatura', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'geografia-historia', name: 'Geografía e Historia', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#0067C6',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#FFD700',       // Oro
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'NIO', symbol: 'C$', name: 'Córdobas' },
    cities: ['Managua', 'León', 'Granada', 'Masaya', 'Chinandega'],
    commonNames: {
      male: ['Juan', 'José', 'Carlos', 'Luis', 'Augusto'],
      female: ['María', 'Ana', 'Gioconda', 'Rosario', 'Idania'],
    },
    culturalReferences: ['Rubén Darío', 'volcán Masaya', 'lago Cocibolca', 'Gallo Pinto', 'Güegüense'],
  },
  githubRepo: 'worldexams/saber-ni',
  product: {
    siteName: 'WorldExams Nicaragua',
    siteUrl: 'https://world-exams.github.io/ni',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MINED',
    guideYear: 2026,
    seoKeywords: ['examenes bachillerato nicaragua', 'mined', 'simulacro ni'],
    defaultDescription: 'Práctica para los exámenes de bachillerato en Nicaragua.',
  },
};

/**
 * 🇪🇸 España - Selectividad
 */
export const spainConfig: CountryConfig = {
  code: 'ES',
  name: 'España',
  nameEnglish: 'Spain',
  flag: '🇪🇸',
  examName: 'Selectividad / EBAU',
  examFullName: 'Evaluación de Bachillerato para el Acceso a la Universidad',
  examAuthority: 'Ministerio de Educación',
  locale: 'es-ES',
  timezone: 'Europe/Madrid',
  grades: [
    { id: 11, name: '1º Bachillerato', description: 'Primer curso de bachillerato' },
    { id: 12, name: '2º Bachillerato', description: 'Segundo curso de bachillerato (EBAU)' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua Castellana', icon: '📖', globalId: 'language' },
    { id: 'historia', name: 'Historia de España', icon: '📜', globalId: 'social' },
    { id: 'ingles', name: 'Inglés', icon: '🇬🇧', globalId: 'english' },
  ],
  theme: {
    primary: '#AA151B',      // Rojo
    secondary: '#F1BF00',    // Gualda (Amarillo)
    accent: '#AA151B',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'EUR', symbol: '€', name: 'Euros' },
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga'],
    commonNames: {
      male: ['Antonio', 'Manuel', 'José', 'Francisco', 'David', 'Juan'],
      female: ['María', 'Carmen', 'Ana', 'Isabel', 'Dolores', 'Pilar'],
    },
    culturalReferences: ['El Quijote', 'flamenco', 'paella', 'siesta', 'tapas'],
  },
  githubRepo: 'worldexams/saber-es',
  product: {
    siteName: 'WorldExams España',
    siteUrl: 'https://world-exams.github.io/es',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'EBAU',
    guideYear: 2026,
    seoKeywords: ['selectividad ebau', 'evau madrid', 'practica ebau', 'examenes selectividad'],
    defaultDescription: 'Prepárate para la Selectividad (EBAU/EvAU) en España con simulacros y exámenes de años anteriores.',
  },
};

/**
 * 🇵🇷 Puerto Rico - PAA
 */
export const puertoRicoConfig: CountryConfig = {
  code: 'PR',
  name: 'Puerto Rico',
  nameEnglish: 'Puerto Rico',
  flag: '🇵🇷',
  examName: 'PAA',
  examFullName: 'Prueba de Aptitud Académica',
  examAuthority: 'College Board',
  locale: 'es-PR',
  timezone: 'America/Puerto_Rico',
  grades: [
    { id: 9, name: '9° Grado', description: 'Noveno grado (Superior)' },
    { id: 10, name: '10° Grado', description: 'Décimo grado' },
    { id: 11, name: '11° Grado', description: 'Undécimo grado' },
    { id: 12, name: '12° Grado', description: 'Duodécimo grado' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'lectura', name: 'Lectura y Redacción', icon: '📖', globalId: 'language' },
    { id: 'ingles', name: 'Inglés', icon: '🇬🇧', globalId: 'english' },
  ],
  theme: {
    primary: '#0050A1',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#E4002B',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'USD', symbol: '$', name: 'Dólares' },
    cities: ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas'],
    commonNames: {
      male: ['Luis', 'José', 'Carlos', 'Juan', 'Jorge'],
      female: ['María', 'Ana', 'Carmen', 'Yolanda', 'Rosa'],
    },
    culturalReferences: ['Mofongo', 'Coquí', 'Viejo San Juan', 'Bomba y Plena', 'El Yunque'],
  },
  githubRepo: 'worldexams/saber-pr',
  product: {
    siteName: 'WorldExams Puerto Rico',
    siteUrl: 'https://world-exams.github.io/pr',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'PAA',
    guideYear: 2026,
    seoKeywords: ['paa puerto rico', 'college board pr', 'repaso paa', 'upr admision'],
    defaultDescription: 'Repaso y práctica para la PAA (College Board) en Puerto Rico.',
  },
};

/**
 * 🇬🇶 Guinea Ecuatorial - Selectividad
 */
export const equatorialGuineaConfig: CountryConfig = {
  code: 'GQ',
  name: 'Guinea Ecuatorial',
  nameEnglish: 'Equatorial Guinea',
  flag: '🇬🇶',
  examName: 'Selectividad',
  examFullName: 'Pruebas de Acceso a la Universidad',
  examAuthority: 'UNGE',
  locale: 'es-GQ',
  timezone: 'Africa/Malabo',
  grades: [
    { id: 11, name: '1º Bachillerato', description: 'Primer curso' },
    { id: 12, name: '2º Bachillerato', description: 'Segundo curso' },
  ],
  subjects: [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua Española', icon: '📖', globalId: 'language' },
    { id: 'historia', name: 'Historia', icon: '📜', globalId: 'social' },
    { id: 'frances', name: 'Francés', icon: '🇫🇷', globalId: 'french' },
  ],
  theme: {
    primary: '#319400',      // Verde
    secondary: '#FFFFFF',    // Blanco
    accent: '#E32118',       // Rojo
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Franco CFA' },
    cities: ['Malabo', 'Bata', 'Ebibeyin', 'Mongomo', 'Djibloho'],
    commonNames: {
      male: ['Teodoro', 'Bonifacio', 'Santiago', 'Manuel', 'Juan'],
      female: ['Maria', 'Teresa', 'Constancia', 'Esperanza', 'Silvia'],
    },
    culturalReferences: ['Ceiba', 'Malabo II', 'Pico Basile', 'Danza balélé'],
  },
  githubRepo: 'worldexams/saber-gq',
  product: {
    siteName: 'WorldExams Guinea Ecuatorial',
    siteUrl: 'https://world-exams.github.io/gq',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'UNGE',
    guideYear: 2026,
    seoKeywords: ['selectividad guinea ecuatorial', 'unge', 'acceso universidad gq'],
    defaultDescription: 'Práctica para la Selectividad y acceso a la Universidad Nacional de Guinea Ecuatorial.',
  },
};

/**
 * 🇺🇾 Uruguay - PISA / Admisión
 */
export const uruguayConfig: CountryConfig = {
  code: 'UY',
  name: 'Uruguay',
  nameEnglish: 'Uruguay',
  flag: '🇺🇾',
  examName: 'PISA / Admisión',
  examFullName: 'Evaluación de Educación Media y Admisión Universitaria',
  examAuthority: 'ANEP / UDELAR',
  locale: 'es-UY',
  timezone: 'America/Montevideo',
  grades: [
    { id: 9, name: '9° Grado', description: 'Noveno año de Educación Básica Integrada' },
    { id: 12, name: '12° Grado', description: 'Sexto año de Bachillerato' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua y Literatura', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias de la Naturaleza', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#0038A8',      // Azul
    secondary: '#FFFFFF',    // Blanco
    accent: '#FFD700',       // Amarillo - Sol
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'UYU', symbol: '$U', name: 'Pesos uruguayos' },
    cities: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Rivera'],
    commonNames: {
      male: ['Mateo', 'Juan', 'Santiago', 'Nicolás', 'Diego'],
      female: ['Valentina', 'Martina', 'Lucía', 'Sofía', 'María'],
    },
    culturalReferences: ['mate', 'asado', 'fútbol', 'Candombe', 'rambla'],
    languageVariant: 'voseo',
  },
  githubRepo: 'worldexams/saber-uy',
  product: {
    siteName: 'WorldExams Uruguay',
    siteUrl: 'https://world-exams.github.io/uy',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'ANEP',
    guideYear: 2026,
    seoKeywords: ['pisa uruguay', 'admision udelar', 'practica escolar uruguay'],
    defaultDescription: 'Preparación para evaluaciones nacionales y admisión universitaria en Uruguay.',
  },
};

/**
 * 🇵🇾 Paraguay - Pruebas Nacionales
 */
export const paraguayConfig: CountryConfig = {
  code: 'PY',
  name: 'Paraguay',
  nameEnglish: 'Paraguay',
  flag: '🇵🇾',
  examName: 'Pruebas Nacionales',
  examFullName: 'Evaluación Nacional de Logros de Aprendizaje (SNEPE)',
  examAuthority: 'MEC',
  locale: 'es-PY',
  timezone: 'America/Asuncion',
  grades: [
    { id: 9, name: '9° Grado', description: 'Noveno grado de Educación Escolar Básica' },
    { id: 12, name: '3° Curso', description: 'Tercer curso de Nivel Medio' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lengua', name: 'Lengua y Literatura Castellana', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias de la Naturaleza', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#D52B1E',      // Rojo
    secondary: '#FFFFFF',    // Blanco
    accent: '#0038A8',       // Azul
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'PYG', symbol: '₲', name: 'Guaraníes' },
    cities: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque', 'Capiatá'],
    commonNames: {
      male: ['Juan', 'José', 'Carlos', 'Luis', 'Jorge'],
      female: ['María', 'Ana', 'Ramona', 'Gloria', 'Blanca'],
    },
    culturalReferences: ['terere', 'guarani', 'ñanduti', 'harpa', 'asado'],
    languageVariant: 'voseo',
  },
  githubRepo: 'worldexams/saber-py',
  product: {
    siteName: 'WorldExams Paraguay',
    siteUrl: 'https://world-exams.github.io/py',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'MEC',
    guideYear: 2026,
    seoKeywords: ['snepe paraguay', 'mec paraguay', 'simulacro py'],
    defaultDescription: 'Práctica para evaluaciones nacionales y exámenes del MEC en Paraguay.',
  },
};

/**
 * 🇧🇴 Bolivia - Bachillerato / Admisión
 */
export const boliviaConfig: CountryConfig = {
  code: 'BO',
  name: 'Bolivia',
  nameEnglish: 'Bolivia',
  flag: '🇧🇴',
  examName: 'Bachillerato',
  examFullName: 'Diploma de Bachiller y Admisión Universitaria',
  examAuthority: 'Ministerio de Educación / Universidades',
  locale: 'es-BO',
  timezone: 'America/La_Paz',
  grades: [
    { id: 6, name: '6° Primaria', description: 'Sexto año de primaria' },
    { id: 12, name: '6° Secundaria', description: 'Sexto año de secundaria' },
  ],
  subjects: [
    { id: 'matematica', name: 'Matemática', icon: '🔢', globalId: 'math' },
    { id: 'lenguaje', name: 'Lenguaje y Literatura', icon: '📖', globalId: 'language' },
    { id: 'ciencias', name: 'Ciencias Naturales', icon: '🔬', globalId: 'science' },
    { id: 'sociales', name: 'Ciencias Sociales', icon: '🌍', globalId: 'social' },
  ],
  theme: {
    primary: '#E23E29',      // Rojo
    secondary: '#FFD700',    // Amarillo
    accent: '#007A33',       // Verde
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
  },
  culture: {
    currency: { code: 'BOB', symbol: 'Bs', name: 'Bolivianos' },
    cities: ['Santa Cruz de la Sierra', 'El Alto', 'La Paz', 'Cochabamba', 'Oruro'],
    commonNames: {
      male: ['Juan', 'José', 'Carlos', 'Luis', 'David'],
      female: ['María', 'Ana', 'Elena', 'Guadalupe', 'Martha'],
    },
    culturalReferences: ['Tiahuanaco', 'Salar de Uyuni', 'folklore', 'Andes', 'Amazonas'],
  },
  githubRepo: 'worldexams/saber-bo',
  product: {
    siteName: 'WorldExams Bolivia',
    siteUrl: 'https://world-exams.github.io/bo',
    contactEmail: 'contacto@saberparatodos.space',
    guideLabel: 'Bachillerato',
    guideYear: 2026,
    seoKeywords: ['bachillerato bolivia', 'admision universitaria bo', 'simulacro bo'],
    defaultDescription: 'Práctica para el bachillerato y exámenes de ingreso universitario en Bolivia.',
  },
};

// =============================================================================
// HELPER FUNCTIONS & EXPORTS
// =============================================================================

/**
 * Get all country configurations
 */
export const allCountries: CountryConfig[] = [
  colombiaConfig,
  mexicoConfig,
  argentinaConfig,
  chileConfig,
  peruConfig,
  ecuadorConfig,
  brasilConfig,
  usaConfig,
  panamaConfig,
  costaRicaConfig,
  guatemalaConfig,
  dominicanRepublicConfig,
  elSalvadorConfig,
  hondurasConfig,
  nicaraguaConfig,
  spainConfig,
  puertoRicoConfig,
  equatorialGuineaConfig,
  uruguayConfig,
  paraguayConfig,
  boliviaConfig,
];

/**
 * Get country config by code
 */
export function getCountryConfig(code: CountryCode): CountryConfig | undefined {
  return allCountries.find(c => c.code === code);
}

/**
 * Get subject mapping between countries
 */
export function mapSubject(globalId: string, targetCountry: CountryCode): SubjectConfig | undefined {
  const country = getCountryConfig(targetCountry);
  return country?.subjects.find(s => s.globalId === globalId);
}

/**
 * Get grade mapping (approximate, not all countries have same structure)
 */
export function findClosestGrade(sourceGrade: number, targetCountry: CountryCode): GradeConfig | undefined {
  const country = getCountryConfig(targetCountry);
  if (!country) return undefined;

  // Find exact match or closest
  const exact = country.grades.find(g => g.id === sourceGrade);
  if (exact) return exact;

  // Find closest
  return country.grades.reduce((prev, curr) =>
    Math.abs(curr.id - sourceGrade) < Math.abs(prev.id - sourceGrade) ? curr : prev
  );
}

/**
 * Generate CSS variables from theme
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  return `
:root {
  --color-primary: ${theme.primary};
  --color-secondary: ${theme.secondary};
  --color-accent: ${theme.accent};
  --bg-dark: ${theme.bgDark};
  --bg-card: ${theme.bgCard};
  --text-primary: ${theme.textPrimary};
  --text-secondary: ${theme.textSecondary};
}
  `.trim();
}
