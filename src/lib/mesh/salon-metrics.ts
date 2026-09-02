/**
 * Wave-Gov #1168 — Group Metrics Engine.
 *
 * Estadistica del salon calculada mesh-local sobre los resultados:
 * media, mediana, desvio estandar y analisis de distractores por pregunta
 * (cuantos estudiantes eligieron cada opcion incorrecta).
 */

import type { SalonResult } from './salon-shared';

export type OptionLetter = 'A' | 'B' | 'C' | 'D';
export const OPTION_LETTERS: readonly OptionLetter[] = ['A', 'B', 'C', 'D'];

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Desvio estandar muestral (n-1). 0 para n < 2. */
export function stdev(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;
  const m = mean(values);
  const variance = values.reduce((acc, v) => acc + (v - m) ** 2, 0) / (n - 1);
  return Math.sqrt(variance);
}

export interface QuestionMetric {
  questionId: string;
  answeredBy: number;
  correctCount: number;
  successRate: number; // 0..1
  /** Distribucion de seleccion por opcion (incluye la correcta). */
  optionCounts: Record<OptionLetter, number>;
  /** Porcentaje de distractores (opciones incorrectas) sobre quienes respondieron. */
  distractorRate: number; // 0..1
}

export interface RoomMetrics {
  n: number;
  mean: number;
  median: number;
  stdev: number;
  min: number;
  max: number;
  questions: QuestionMetric[];
  /** Preguntas mas dificiles (menor successRate). */
  hardest: string[];
}

export function computeRoomMetrics(
  results: SalonResult[],
  answerKey: Record<string, OptionLetter>,
): RoomMetrics {
  const scores = results.map((r) => r.score);
  const questionIds = Object.keys(answerKey);
  const questions: QuestionMetric[] = questionIds.map((qid) => {
    const optionCounts: Record<OptionLetter, number> = { A: 0, B: 0, C: 0, D: 0 };
    let answeredBy = 0;
    let correctCount = 0;
    for (const r of results) {
      const picked = r.answers[qid];
      if (!picked) continue;
      answeredBy += 1;
      optionCounts[picked as OptionLetter] += 1;
      if (picked === answerKey[qid]) correctCount += 1;
    }
    const successRate = answeredBy === 0 ? 0 : correctCount / answeredBy;
    return {
      questionId: qid,
      answeredBy,
      correctCount,
      successRate,
      optionCounts,
      distractorRate: 1 - successRate,
    };
  });

  const hardest = [...questions]
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, 3)
    .map((q) => q.questionId);

  return {
    n: results.length,
    mean: round2(mean(scores)),
    median: round2(median(scores)),
    stdev: round2(stdev(scores)),
    min: scores.length ? Math.min(...scores) : 0,
    max: scores.length ? Math.max(...scores) : 0,
    questions,
    hardest,
  };
}

export function round2(v: number): number {
  return Math.round(v * 100) / 100;
}
