// World Exams - Country Configuration Types
// Shared types for all country repositories

/**
 * Country codes supported by World Exams
 */
export type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'US';

/**
 * Supported languages
 */
export type LanguageCode = 'es-CO' | 'es-MX' | 'es-AR' | 'es-CL' | 'es-PE' | 'es-EC' | 'pt-BR' | 'en-US';

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
};

/**
 * 🇲🇽 México - PLANEA
 */
export const mexicoConfig: CountryConfig = {
  code: 'MX',
  name: 'México',
  nameEnglish: 'Mexico',
  flag: '🇲🇽',

  examName: 'PLANEA',
  examFullName: 'Plan Nacional para la Evaluación de los Aprendizajes',
  examAuthority: 'SEP / INEE',

  locale: 'es-MX',
  timezone: 'America/Mexico_City',

  grades: [
    { id: 3, name: '3° Primaria', description: 'Tercer grado de primaria' },
    { id: 6, name: '6° Primaria', description: 'Sexto grado de primaria' },
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
};

// =============================================================================
// HELPER FUNCTIONS
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
  brasilConfig,
  usaConfig,
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
