/**
 * Lógica pura del modo práctica del "Banco social" y del intercalado de anuncios.
 */

export interface PracticeOption {
  id: string;
  text: string;
  feedback?: string;
}

export interface PracticeQuestion {
  options?: PracticeOption[];
  correctOptionId?: string;
  correctOptionIds?: string[];
}

export interface PracticeResult {
  isCorrect: boolean;
  correctOptionId: string;
  feedback: string;
}

function normalizeOptionId(id: unknown): string {
  return String(id ?? '').replace(/\)\s*$/, '').trim().toUpperCase();
}

export function isCorrectOption(question: PracticeQuestion, optionId: string): boolean {
  const target = normalizeOptionId(optionId);
  if (!target) return false;
  if (normalizeOptionId(question.correctOptionId) === target) return true;
  return (question.correctOptionIds || []).some((id) => normalizeOptionId(id) === target);
}

export function evaluateChoice(question: PracticeQuestion, optionId: string): PracticeResult {
  const option = (question.options || []).find((o) => normalizeOptionId(o.id) === normalizeOptionId(optionId));
  return {
    isCorrect: isCorrectOption(question, optionId),
    correctOptionId: normalizeOptionId(question.correctOptionId),
    feedback: String(option?.feedback || '').trim(),
  };
}

/** Breakpoint `sm` de Tailwind: por debajo se considera móvil. */
export const MOBILE_MAX_WIDTH = 639;
export const AD_INTERVAL_DESKTOP = 6;
export const AD_INTERVAL_MOBILE = 12;

export function adIntervalFor(isMobile: boolean): number {
  return isMobile ? AD_INTERVAL_MOBILE : AD_INTERVAL_DESKTOP;
}

export type BancoItem<T> =
  | { type: 'question'; id: string; data: T }
  | { type: 'ad'; id: string; data: null };

/** Intercala un anuncio después de cada `interval` tarjetas. */
export function withAds<T extends { id: string | number }>(items: T[], interval: number): BancoItem<T>[] {
  const step = Math.max(1, Math.floor(interval));
  const result: BancoItem<T>[] = [];
  for (let i = 0; i < items.length; i++) {
    result.push({ type: 'question', id: String(items[i].id), data: items[i] });
    if ((i + 1) % step === 0) {
      result.push({ type: 'ad', id: `ad-${i}`, data: null });
    }
  }
  return result;
}
