/**
 * Agregador de analítica de uso de preguntas (issue #1035).
 * Funciones puras: reciben eventos y devuelven métricas agregadas.
 * Sin tracking invasivo: solo consume eventos ya anonimizados que la app
 * registra localmente; si no hay suficientes datos devuelve hasData=false
 * para que la UI muestre "No hay datos suficientes" (nunca inventar).
 */

export interface UsageEvent {
  questionId: string;
  bundleId: string;
  country: string;
  grade: number;
  subject: string;
  /** ISO 8601 timestamp del intento */
  usedAt: string;
  correct: boolean;
  /** tiempo en milisegundos para responder */
  timeMs: number;
}

export interface TopQuestion {
  questionId: string;
  bundleId: string;
  country: string;
  grade: number;
  subject: string;
  uses: number;
  /** 0..1 — aciertos / usos */
  accuracy: number;
  avgTimeMs: number;
}

export interface HeatmapCell {
  country: string;
  grade: number;
  uses: number;
  accuracy: number;
  bundles: string[];
}

export interface BundlePerformance {
  bundleId: string;
  country: string;
  grade: number;
  subject: string;
  uses: number;
  uniqueQuestions: number;
  accuracy: number;
  avgTimeMs: number;
}

export interface UsageSummary {
  windowDays: number;
  totalEvents: number;
  hasData: boolean;
  topUsed: TopQuestion[];
  topMissed: TopQuestion[];
  heatmap: HeatmapCell[];
  bundles: BundlePerformance[];
}

export interface AggregateOptions {
  /** ventana de análisis en días (defecto 30) */
  windowDays?: number;
  /** fecha "ahora" inyectable para tests deterministas */
  now?: Date;
  /** mínimo de eventos totales para considerar que hay datos (defecto 10) */
  minTotalEvents?: number;
  /** mínimo de usos por pregunta para candidatearla a "peor tasa de acierto" (defecto 5) */
  minUsesPerQuestion?: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function safeRatio(part: number, total: number): number {
  if (!total) return 0;
  return part / total;
}

export function filterByWindow(
  events: UsageEvent[],
  windowDays: number,
  now: Date = new Date()
): UsageEvent[] {
  const cutoff = now.getTime() - windowDays * DAY_MS;
  return events.filter((e) => {
    const ts = Date.parse(e.usedAt);
    return Number.isFinite(ts) && ts >= cutoff && ts <= now.getTime() + DAY_MS;
  });
}

interface QuestionAccumulator {
  questionId: string;
  bundleId: string;
  country: string;
  grade: number;
  subject: string;
  uses: number;
  correctCount: number;
  totalTimeMs: number;
}

export function aggregateUsage(events: UsageEvent[], options: AggregateOptions = {}): UsageSummary {
  const windowDays = options.windowDays ?? 30;
  const now = options.now ?? new Date();
  const minTotalEvents = options.minTotalEvents ?? 10;
  const minUsesPerQuestion = options.minUsesPerQuestion ?? 5;

  const windowed = filterByWindow(events, windowDays, now);

  const empty: UsageSummary = {
    windowDays,
    totalEvents: windowed.length,
    hasData: false,
    topUsed: [],
    topMissed: [],
    heatmap: [],
    bundles: [],
  };

  if (windowed.length < minTotalEvents) return empty;

  const byQuestion = new Map<string, QuestionAccumulator>();
  const byBundle = new Map<
    string,
    { bundleId: string; country: string; grade: number; subject: string; uses: number; correctCount: number; totalTimeMs: number; questionIds: Set<string> }
  >();
  const byCell = new Map<
    string,
    { country: string; grade: number; uses: number; correctCount: number; bundles: Set<string> }
  >();

  for (const e of windowed) {
    if (!e.questionId || !e.bundleId) continue;
    const q = byQuestion.get(e.questionId) ?? {
      questionId: e.questionId,
      bundleId: e.bundleId,
      country: e.country,
      grade: e.grade,
      subject: e.subject,
      uses: 0,
      correctCount: 0,
      totalTimeMs: 0,
    };
    q.uses += 1;
    if (e.correct) q.correctCount += 1;
    q.totalTimeMs += Number.isFinite(e.timeMs) && e.timeMs > 0 ? e.timeMs : 0;
    byQuestion.set(e.questionId, q);

    const b = byBundle.get(e.bundleId) ?? {
      bundleId: e.bundleId,
      country: e.country,
      grade: e.grade,
      subject: e.subject,
      uses: 0,
      correctCount: 0,
      totalTimeMs: 0,
      questionIds: new Set<string>(),
    };
    b.uses += 1;
    if (e.correct) b.correctCount += 1;
    b.totalTimeMs += Number.isFinite(e.timeMs) && e.timeMs > 0 ? e.timeMs : 0;
    b.questionIds.add(e.questionId);
    byBundle.set(e.bundleId, b);

    const cellKey = `${e.country}/${e.grade}`;
    const cell = byCell.get(cellKey) ?? {
      country: e.country,
      grade: e.grade,
      uses: 0,
      correctCount: 0,
      bundles: new Set<string>(),
    };
    cell.uses += 1;
    if (e.correct) cell.correctCount += 1;
    cell.bundles.add(e.bundleId);
    byCell.set(cellKey, cell);
  }

  const questionStats: TopQuestion[] = [...byQuestion.values()].map((q) => ({
    questionId: q.questionId,
    bundleId: q.bundleId,
    country: q.country,
    grade: q.grade,
    subject: q.subject,
    uses: q.uses,
    accuracy: safeRatio(q.correctCount, q.uses),
    avgTimeMs: Math.round(safeRatio(q.totalTimeMs, q.uses)),
  }));

  const topUsed = [...questionStats]
    .sort((a, b) => b.uses - a.uses || a.questionId.localeCompare(b.questionId))
    .slice(0, 10);

  const topMissed = [...questionStats]
    .filter((q) => q.uses >= minUsesPerQuestion)
    .sort((a, b) => a.accuracy - b.accuracy || b.uses - a.uses || a.questionId.localeCompare(b.questionId))
    .slice(0, 10);

  const heatmap: HeatmapCell[] = [...byCell.values()]
    .map((c) => ({
      country: c.country,
      grade: c.grade,
      uses: c.uses,
      accuracy: safeRatio(c.correctCount, c.uses),
      bundles: [...c.bundles].sort(),
    }))
    .sort((a, b) => a.country.localeCompare(b.country) || a.grade - b.grade);

  const bundles: BundlePerformance[] = [...byBundle.values()]
    .map((b) => ({
      bundleId: b.bundleId,
      country: b.country,
      grade: b.grade,
      subject: b.subject,
      uses: b.uses,
      uniqueQuestions: b.questionIds.size,
      accuracy: safeRatio(b.correctCount, b.uses),
      avgTimeMs: Math.round(safeRatio(b.totalTimeMs, b.uses)),
    }))
    .sort((a, b) => b.uses - a.uses || a.bundleId.localeCompare(b.bundleId));

  return {
    windowDays,
    totalEvents: windowed.length,
    hasData: true,
    topUsed,
    topMissed,
    heatmap,
    bundles,
  };
}

export function formatAccuracy(accuracy: number): string {
  return `${Math.round(accuracy * 100)}%`;
}

export function formatAvgTime(avgTimeMs: number): string {
  if (!Number.isFinite(avgTimeMs) || avgTimeMs <= 0) return '—';
  const seconds = avgTimeMs / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}
