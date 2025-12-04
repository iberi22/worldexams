/**
 * QuestionLoader - Sistema de carga de preguntas compartidas
 *
 * Combina preguntas de _shared/ (universales) con preguntas específicas por país.
 * Permite filtrar por grado, asignatura y tema.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Question = CollectionEntry<'questions'>;

export interface QuestionFilter {
  country?: string;
  grado?: number;
  asignatura?: string;
  tema?: string;
  estado?: 'draft' | 'published' | 'archived';
}

/**
 * Carga preguntas para un país específico
 * Combina automáticamente _shared/ + [país]/
 */
export async function loadQuestionsForCountry(
  countryCode: string,
  filter?: Omit<QuestionFilter, 'country'>
): Promise<Question[]> {
  const allQuestions = await getCollection('questions');

  // Filtrar: incluir _shared (sin country) + preguntas del país específico
  let questions = allQuestions.filter(q => {
    const questionCountry = getCountryFromPath(q.id);
    return questionCountry === '_shared' || questionCountry === countryCode;
  });

  // Aplicar filtros adicionales
  if (filter?.grado) {
    questions = questions.filter(q => q.data.grado === filter.grado);
  }

  if (filter?.asignatura) {
    questions = questions.filter(q =>
      q.data.asignatura.toLowerCase() === filter.asignatura!.toLowerCase()
    );
  }

  if (filter?.tema) {
    questions = questions.filter(q =>
      q.data.tema.toLowerCase() === filter.tema!.toLowerCase()
    );
  }

  if (filter?.estado) {
    questions = questions.filter(q => q.data.estado === filter.estado);
  }

  return questions;
}

/**
 * Carga solo preguntas universales (_shared)
 */
export async function loadSharedQuestions(
  filter?: Omit<QuestionFilter, 'country'>
): Promise<Question[]> {
  const allQuestions = await getCollection('questions');

  let questions = allQuestions.filter(q => {
    const questionCountry = getCountryFromPath(q.id);
    return questionCountry === '_shared';
  });

  // Aplicar filtros
  if (filter?.grado) {
    questions = questions.filter(q => q.data.grado === filter.grado);
  }

  if (filter?.asignatura) {
    questions = questions.filter(q =>
      q.data.asignatura.toLowerCase() === filter.asignatura!.toLowerCase()
    );
  }

  return questions;
}

/**
 * Carga solo preguntas específicas de un país
 */
export async function loadCountrySpecificQuestions(
  countryCode: string,
  filter?: Omit<QuestionFilter, 'country'>
): Promise<Question[]> {
  const allQuestions = await getCollection('questions');

  let questions = allQuestions.filter(q => {
    const questionCountry = getCountryFromPath(q.id);
    return questionCountry === countryCode;
  });

  if (filter?.grado) {
    questions = questions.filter(q => q.data.grado === filter.grado);
  }

  if (filter?.asignatura) {
    questions = questions.filter(q =>
      q.data.asignatura.toLowerCase() === filter.asignatura!.toLowerCase()
    );
  }

  return questions;
}

/**
 * Obtiene el código de país desde el path de la pregunta
 * Ejemplo: "_shared/matematicas/grado-11/algebra/math-001.md" -> "_shared"
 *          "colombia/sociales/grado-11/historia/soc-001.md" -> "colombia"
 */
function getCountryFromPath(questionId: string): string {
  const parts = questionId.split('/');
  return parts[0] || '_shared';
}

/**
 * Obtiene estadísticas del banco de preguntas
 */
export async function getQuestionStats(): Promise<{
  total: number;
  shared: number;
  byCountry: Record<string, number>;
  byAsignatura: Record<string, number>;
  byGrado: Record<number, number>;
}> {
  const allQuestions = await getCollection('questions');

  const stats = {
    total: allQuestions.length,
    shared: 0,
    byCountry: {} as Record<string, number>,
    byAsignatura: {} as Record<string, number>,
    byGrado: {} as Record<number, number>,
  };

  for (const q of allQuestions) {
    const country = getCountryFromPath(q.id);

    if (country === '_shared') {
      stats.shared++;
    }

    stats.byCountry[country] = (stats.byCountry[country] || 0) + 1;
    stats.byAsignatura[q.data.asignatura] = (stats.byAsignatura[q.data.asignatura] || 0) + 1;
    stats.byGrado[q.data.grado] = (stats.byGrado[q.data.grado] || 0) + 1;
  }

  return stats;
}

/**
 * Lista de países soportados
 */
export const SUPPORTED_COUNTRIES = [
  { code: 'mexico', name: 'México', exam: 'EXANI-II', flag: '🇲🇽' },
  { code: 'colombia', name: 'Colombia', exam: 'Saber 11', flag: '🇨🇴' },
  { code: 'brasil', name: 'Brasil', exam: 'ENEM', flag: '🇧🇷' },
  { code: 'usa', name: 'Estados Unidos', exam: 'SAT', flag: '🇺🇸' },
  { code: 'argentina', name: 'Argentina', exam: 'Ingreso UBA', flag: '🇦🇷' },
  { code: 'chile', name: 'Chile', exam: 'PAES', flag: '🇨🇱' },
  { code: 'peru', name: 'Perú', exam: 'Admisión', flag: '🇵🇪' },
  { code: 'china', name: 'China', exam: '高考', flag: '🇨🇳' },
  { code: 'india', name: 'India', exam: 'JEE', flag: '🇮🇳' },
  { code: 'japan', name: 'Japón', exam: '共通テスト', flag: '🇯🇵' },
  { code: 'korea', name: 'Corea', exam: '수능', flag: '🇰🇷' },
  { code: 'france', name: 'Francia', exam: 'Baccalauréat', flag: '🇫🇷' },
  { code: 'russia', name: 'Rusia', exam: 'ЕГЭ', flag: '🇷🇺' },
  { code: 'indonesia', name: 'Indonesia', exam: 'SNBT', flag: '🇮🇩' },
  { code: 'egypt', name: 'Egipto', exam: 'الثانوية', flag: '🇪🇬' },
  { code: 'nigeria', name: 'Nigeria', exam: 'UTME', flag: '🇳🇬' },
] as const;

export type CountryCode = typeof SUPPORTED_COUNTRIES[number]['code'];
