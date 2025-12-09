/**
 * Sistema de Identidad Anónima para World Exams
 *
 * Genera IDs únicos y memorables sin almacenar datos personales.
 * El estudiante puede verificar su identidad ingresando los mismos datos.
 */

// ============================================================================
// DICCIONARIOS PARA APODOS
// ============================================================================

export const ANIMALES = [
  'Aguila', 'Jaguar', 'Condor', 'Oso', 'Tigre', 'Leon', 'Colibri',
  'Delfin', 'Lobo', 'Halcon', 'Tucan', 'Pantera', 'Buho', 'Serpiente',
  'Tortuga', 'Cocodrilo', 'Armadillo', 'Mapache', 'Zorro', 'Puma',
  'Ballena', 'Tiburon', 'Pulpo', 'Canguro', 'Elefante', 'Gorila',
  'Guacamaya', 'Iguana', 'Koala', 'Lemur', 'Mariposa', 'Nutria',
  'Ornitorrinco', 'Perezoso', 'Quetzal', 'Rinoceronte', 'Salamandra'
] as const;

export const ADJETIVOS = [
  'Veloz', 'Agil', 'Rapido', 'Brillante', 'Astuto', 'Fuerte',
  'Sabio', 'Audaz', 'Noble', 'Valiente', 'Certero', 'Tenaz',
  'Sereno', 'Firme', 'Sagaz', 'Perspicaz', 'Diestro', 'Ingenioso',
  'Intrepido', 'Luminoso', 'Magnifico', 'Preciso', 'Radiante', 'Sublime',
  'Tremendo', 'Unico', 'Vivaz', 'Heroico', 'Epico', 'Legendario',
  'Maestro', 'Genial', 'Supremo', 'Infinito', 'Cosmico', 'Estelar'
] as const;

// Ciudades principales de Colombia con sus códigos
export const CIUDADES_COLOMBIA: Record<string, string> = {
  'Bogotá': 'BOG',
  'Medellín': 'MED',
  'Cali': 'CAL',
  'Barranquilla': 'BAR',
  'Cartagena': 'CAR',
  'Bucaramanga': 'BUC',
  'Pereira': 'PER',
  'Manizales': 'MAN',
  'Santa Marta': 'SMA',
  'Ibagué': 'IBA',
  'Cúcuta': 'CUC',
  'Soledad': 'SOL',
  'Villavicencio': 'VIL',
  'Neiva': 'NEI',
  'Montería': 'MON',
  'Pasto': 'PAS',
  'Armenia': 'ARM',
  'Valledupar': 'VAL',
  'Popayán': 'POP',
  'Sincelejo': 'SIN',
  'Tunja': 'TUN',
  'Florencia': 'FLO',
  'Riohacha': 'RIO',
  'Quibdó': 'QUI',
  'Yopal': 'YOP',
  'Mocoa': 'MOC',
  'Leticia': 'LET',
  'San Andrés': 'SAI',
  'Otra': 'OTR'
};

// Emojis de animales para display
export const ANIMAL_EMOJIS: Record<string, string> = {
  'Aguila': '🦅', 'Jaguar': '🐆', 'Condor': '🦅', 'Oso': '🐻', 'Tigre': '🐯',
  'Leon': '🦁', 'Colibri': '🐦', 'Delfin': '🐬', 'Lobo': '🐺', 'Halcon': '🦅',
  'Tucan': '🦜', 'Pantera': '🐆', 'Buho': '🦉', 'Serpiente': '🐍', 'Tortuga': '🐢',
  'Cocodrilo': '🐊', 'Armadillo': '🦔', 'Mapache': '🦝', 'Zorro': '🦊', 'Puma': '🐆',
  'Ballena': '🐋', 'Tiburon': '🦈', 'Pulpo': '🐙', 'Canguro': '🦘', 'Elefante': '🐘',
  'Gorila': '🦍', 'Guacamaya': '🦜', 'Iguana': '🦎', 'Koala': '🐨', 'Lemur': '🐒',
  'Mariposa': '🦋', 'Nutria': '🦦', 'Ornitorrinco': '🦫', 'Perezoso': '🦥',
  'Quetzal': '🐦', 'Rinoceronte': '🦏', 'Salamandra': '🦎'
};

// ============================================================================
// FUNCIONES DE HASH
// ============================================================================

/**
 * Hash simple y determinístico para strings
 * Basado en djb2 algorithm
 */
export function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Convierte un hash a un índice dentro de un rango
 */
export function hashToIndex(str: string, maxIndex: number): number {
  return simpleHash(str) % maxIndex;
}

/**
 * Genera un hash corto alfanumérico
 */
export function shortHash(str: string, length: number = 4): string {
  const hash = simpleHash(str);
  return hash.toString(36).toUpperCase().slice(0, length).padEnd(length, '0');
}

// ============================================================================
// NORMALIZACIÓN DE DATOS
// ============================================================================

/**
 * Normaliza un string removiendo tildes y caracteres especiales
 */
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '');
}

/**
 * Obtiene el código de ciudad o genera uno
 */
export function getCityCode(ciudad: string): string {
  const normalized = ciudad.trim();

  // Buscar en diccionario
  if (CIUDADES_COLOMBIA[normalized]) {
    return CIUDADES_COLOMBIA[normalized];
  }

  // Buscar por normalización
  const normalizedSearch = normalizeString(ciudad);
  for (const [city, code] of Object.entries(CIUDADES_COLOMBIA)) {
    if (normalizeString(city) === normalizedSearch) {
      return code;
    }
  }

  // Generar código de 3 letras
  return normalizeString(ciudad).substring(0, 3).toUpperCase();
}

/**
 * Extrae el grado del formato de curso (ej: "11-A" -> "11")
 */
export function extractGrade(curso: string): string {
  const match = curso.match(/(\d+)/);
  return match ? match[1] : '0';
}

// ============================================================================
// GENERACIÓN DE ID ANÓNIMO
// ============================================================================

export interface IdentityInput {
  nombre: string;
  ciudad: string;
  colegio: string;
  curso: string;
}

export interface AnonymousIdentity {
  id: string;
  displayName: string;
  emoji: string;
  animal: string;
  adjetivo: string;
  region: string;
  grade: string;
  hash: string;
}

/**
 * Genera un ID anónimo único y memorable
 *
 * Formato: "{Adjetivo}{Animal}_{REGION}_{GRADO}_{HASH}"
 * Ejemplo: "VelozAguila_BOG_11_K7F2"
 */
export function generateAnonymousId(input: IdentityInput): AnonymousIdentity {
  const { nombre, ciudad, colegio, curso } = input;

  // Normalizar datos para consistencia
  const dataString = normalizeString(`${nombre}${ciudad}${colegio}${curso}`);

  // Seleccionar animal y adjetivo basados en hash
  const animalIndex = hashToIndex(dataString, ANIMALES.length);
  const adjetivoIndex = hashToIndex(dataString + 'adj', ADJETIVOS.length);

  const animal = ANIMALES[animalIndex];
  const adjetivo = ADJETIVOS[adjetivoIndex];

  // Obtener códigos
  const region = getCityCode(ciudad);
  const grade = extractGrade(curso);
  const hash = shortHash(dataString, 4);

  // Construir ID
  const id = `${adjetivo}${animal}_${region}_${grade}_${hash}`;

  // Display name con espacios
  const emoji = ANIMAL_EMOJIS[animal] || '🎯';
  const displayName = `${emoji} ${adjetivo} ${animal}`;

  return {
    id,
    displayName,
    emoji,
    animal,
    adjetivo,
    region,
    grade,
    hash
  };
}

/**
 * Verifica si los datos de entrada producen el mismo ID
 */
export function verifyIdentity(input: IdentityInput, expectedId: string): boolean {
  const generated = generateAnonymousId(input);
  return generated.id === expectedId;
}

// ============================================================================
// ALMACENAMIENTO LOCAL
// ============================================================================

const STORAGE_KEY = 'worldexams_identity';

export interface StoredIdentity {
  identity: AnonymousIdentity;
  createdAt: string;
  lastUsed: string;
}

/**
 * Guarda la identidad en localStorage
 */
export function saveLocalIdentity(identity: AnonymousIdentity): void {
  if (typeof localStorage === 'undefined') return;

  const stored: StoredIdentity = {
    identity,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

/**
 * Recupera la identidad de localStorage
 */
export function getLocalIdentity(): StoredIdentity | null {
  if (typeof localStorage === 'undefined') return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as StoredIdentity;
  } catch {
    return null;
  }
}

/**
 * Actualiza el timestamp de último uso
 */
export function updateLastUsed(): void {
  if (typeof localStorage === 'undefined') return;

  const stored = getLocalIdentity();
  if (stored) {
    stored.lastUsed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
}

/**
 * Elimina la identidad local
 */
export function clearLocalIdentity(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Verifica si existe una identidad local
 */
export function hasLocalIdentity(): boolean {
  return getLocalIdentity() !== null;
}
