import { normalizeSubjectKey } from '../api-service';

export function normalizeSubjectName(subject: string | null | undefined): string {
  if (!subject) return '';
  return String(subject)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]/g, ' ')
    .trim();
}

export function subjectsMatch(categorySubject: string | null | undefined, selectedSubject: string | null | undefined): boolean {
  if (!selectedSubject || selectedSubject === 'Simulacro Completo') return true;
  if (!categorySubject) return false;

  const normalizedCategory = normalizeSubjectName(String(categorySubject).split(' :: ')[0]);
  const normalizedSelected = normalizeSubjectName(selectedSubject);

  return normalizedCategory === normalizedSelected ||
    normalizedCategory.startsWith(normalizedSelected) ||
    normalizedSelected.startsWith(normalizedCategory);
}

export function resolveApiSubject(selectedSubject: string | null | undefined): string {
  const raw = String(selectedSubject || '');
  if (!raw) return '';

  const normalizedReadable = normalizeSubjectName(raw);
  // "Simulacro Completo" es un MODO de la UI (todas las áreas), no una asignatura
  // en questions_data. Enviarla como subject al API produce 404 en questions y
  // packs; devolver '' hace que el pool use el grado-completo (fallback correcto).
  if (normalizedReadable.includes('SIMULACRO') && normalizedReadable.includes('COMPLET')) {
    return '';
  }
  if (normalizedReadable.includes('INGLES') && normalizedReadable.includes('DIAGNOST')) {
    return 'ingles';
  }

  return normalizeSubjectKey(raw);
}
