
import { getAllLocalResults, type ExamResultRecord } from './idb-storage'; // Fix import path if needed (idb-storage is in same folder)
import {
  calculateNewMMR,
  BASE_MMR,
  getRankTitle,
  estimateIcfesScore,
  type IcfesEstimate,
  type IcfesModuleScores
} from './mmr-system';
import { CO_ICFES_2026_BENCHMARK, type IcfesBenchmarkConfig } from '../config/icfes-benchmarks';

export interface CompetencyStats {
  id: string;
  name: string;
  seen: number;
  correct: number;
  mmr: number;
}

export interface SubjectStats {
  name: string;
  mmr: number;
  questionsAnswered: number;
  accuracy: number;
}

export interface TopicStats {
  name: string;
  seen: number;
  correct: number;
  accuracy: number;
}

export interface AdvancedMetrics {
  avgTimeCorrect: number; // ms
  avgTimeIncorrect: number; // ms
  consistencyScore: number; // 0-100
  worstTopics: TopicStats[];
}

export interface UserProfile {
  globalMMR: number;
  icfesEstimate: IcfesEstimate;
  rankTitle: string;
  totalQuestions: number;
  globalAccuracy: number;
  subjects: Record<string, SubjectStats>;
  competencies: Record<string, CompetencyStats>;
  topics: Record<string, TopicStats>;
  dailyActivity: Record<string, number>;
  recentHistory: { mmr: number, timestamp: number }[];
  advancedMetrics: AdvancedMetrics; // 🆕 Added field
}

export interface ExamPerformanceSnapshot {
  hasHistory: boolean;
  latestSessionAt: number | null;
  latestScore: number | null;
  icfesEstimate: IcfesEstimate | null;
  benchmarkScore: number;
  benchmarkDelta: number | null;
  goalScore: number;
  goalDelta: number | null;
  rankTitle: string | null;
  latestSubject: string | null;
}

function normalizeIcfesSubjectKey(subject: string | undefined | null): keyof IcfesModuleScores | null {
  const normalized = String(subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]/g, ' ')
    .trim();

  if (!normalized) return null;
  if (normalized.includes('lect') || normalized.includes('leng') || normalized.includes('espa')) return 'lectura';
  if (normalized.includes('mat')) return 'matematicas';
  if (normalized.includes('soci') || normalized.includes('ciudad') || normalized.includes('hist')) return 'sociales';
  if (normalized.includes('cien') || normalized.includes('biolog') || normalized.includes('quim') || normalized.includes('fis')) return 'ciencias';
  if (normalized.includes('ing')) return 'ingles';
  return null;
}

function buildSubjectModuleEstimates(
  subjects: Record<string, SubjectStats>
): { moduleScores: IcfesModuleScores; subjectCoverage: number } {
  const moduleScores: IcfesModuleScores = {};

  for (const subject of Object.values(subjects)) {
    const moduleKey = normalizeIcfesSubjectKey(subject.name);
    if (!moduleKey || subject.questionsAnswered < 10) continue;

    moduleScores[moduleKey] = estimateIcfesScore({
      mmr: subject.mmr,
      accuracy: subject.accuracy,
      evidenceCount: subject.questionsAnswered,
      averageDifficulty: 3,
      consistencyScore: 60,
      subjectCoverage: 1
    }).score / 5;

    moduleScores[moduleKey] = Math.round(Math.min(100, Math.max(0, moduleScores[moduleKey] || 0)));
  }

  return {
    moduleScores,
    subjectCoverage: Object.keys(moduleScores).length
  };
}

/**
 * Reconstruct user profile by replaying history
 */
export async function generateUserProfile(): Promise<UserProfile> {
  const results = await getAllLocalResults();

  // Flatten all question attempts
  let attempts: any[] = [];
  let examScores: number[] = []; // for consistency calc

  results.forEach(exam => {
    if (exam.details && Array.isArray(exam.details)) {
      let examCorrect = 0;
      exam.details.forEach(q => {
        if (q.isCorrect) examCorrect++;
        attempts.push({
          timestamp: exam.timestamp,
          subject: (q.category ? q.category.split(' :: ')[0] : exam.subject).toUpperCase(),
          topic: q.topic || (q.category && q.category.includes('::') ? q.category.split(' :: ')[1] : 'GENERAL'),
          competency: q.competency || 'GENERAL',
          difficulty: q.difficulty || 3,
          isCorrect: q.isCorrect,
          questionId: q.id || q.questionId,
          timeSpentMs: q.timeSpentMs || 0 // 🆕 Capture time
        });
      });
      if (exam.details.length > 0) {
        examScores.push((examCorrect / exam.details.length) * 100);
      }
    }
  });

  // Sort by time (oldest first)
  attempts.sort((a, b) => a.timestamp - b.timestamp);

  // Initialize Profile state
  let globalMMR = BASE_MMR;
  const subjects: Record<string, SubjectStats> = {};
  const competencies: Record<string, CompetencyStats> = {};
  const topics: Record<string, TopicStats> = {};
  const dailyActivity: Record<string, number> = {};
  const recentHistory: { mmr: number, timestamp: number }[] = [];

  let correctCount = 0;

  // Time Tracking
  let totalTimeCorrect = 0;
  let countTimeCorrect = 0;
  let totalTimeIncorrect = 0;
  let countTimeIncorrect = 0;

  // Replay history
  for (const attempt of attempts) {
    // 1. Update Global MMR
    const { newRating } = calculateNewMMR(globalMMR, attempt.difficulty, attempt.isCorrect);
    globalMMR = newRating;

    // 2. Update Subject MMR
    if (!subjects[attempt.subject]) {
      subjects[attempt.subject] = {
        name: attempt.subject,
        mmr: BASE_MMR,
        questionsAnswered: 0,
        accuracy: 0
      };
    }

    // Recalculate subject stats
    const subj = subjects[attempt.subject];
    const subjResult = calculateNewMMR(subj.mmr, attempt.difficulty, attempt.isCorrect);
    subj.mmr = subjResult.newRating;

    const prevCorrect = Math.round(subj.accuracy * subj.questionsAnswered);
    subj.questionsAnswered++;
    subj.accuracy = (prevCorrect + (attempt.isCorrect ? 1 : 0)) / subj.questionsAnswered;

    // 3. Update Competency Stats
    if (attempt.competency && attempt.competency !== 'GENERAL') {
      const compKey = attempt.competency;
      if (!competencies[compKey]) {
        competencies[compKey] = {
          id: compKey,
          name: compKey,
          seen: 0,
          correct: 0,
          mmr: BASE_MMR
        };
      }
      const comp = competencies[compKey];
      comp.seen++;
      if (attempt.isCorrect) comp.correct++;
      const compResult = calculateNewMMR(comp.mmr, attempt.difficulty, attempt.isCorrect);
      comp.mmr = compResult.newRating;
    }

    // 4. Update Topic Stats
    if (attempt.topic && attempt.topic !== 'GENERAL') {
      const topicKey = attempt.topic;
      if (!topics[topicKey]) {
        topics[topicKey] = {
          name: topicKey,
          seen: 0,
          correct: 0,
          accuracy: 0
        };
      }
      const top = topics[topicKey];
      top.seen++;
      if (attempt.isCorrect) top.correct++;
      top.accuracy = top.correct / top.seen;
    }

    // 5. Update Daily Activity
    const dateKey = new Date(attempt.timestamp).toISOString().split('T')[0];
    dailyActivity[dateKey] = (dailyActivity[dateKey] || 0) + 1;

    if (attempt.isCorrect) {
      correctCount++;
      if (attempt.timeSpentMs > 0 && attempt.timeSpentMs < 300000) { // Filter outliers > 5min
        totalTimeCorrect += attempt.timeSpentMs;
        countTimeCorrect++;
      }
    } else {
      if (attempt.timeSpentMs > 0 && attempt.timeSpentMs < 300000) {
        totalTimeIncorrect += attempt.timeSpentMs;
        countTimeIncorrect++;
      }
    }

    // Record history point
    recentHistory.push({ mmr: globalMMR, timestamp: attempt.timestamp });
  }

  // Downsample history for chart (max 50 points)
  const sampledHistory = recentHistory.filter((_, i, arr) => {
    if (arr.length <= 50) return true;
    return i % Math.ceil(arr.length / 50) === 0 || i === arr.length - 1;
  });

  // Calculate Advanced Metrics
  // 1. Consistency Score (based on exam score variance)
  let consistencyScore = 100;
  if (examScores.length > 2) {
    const mean = examScores.reduce((a, b) => a + b, 0) / examScores.length;
    const variance = examScores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / examScores.length;
    const stdDev = Math.sqrt(variance);
    // 0 SD = 100 Consistency. 20 SD = 60 Consistency.
    consistencyScore = Math.max(0, Math.min(100, 100 - (stdDev * 1.5)));
  }

  // 2. Worst Topics
  const worstTopics = Object.values(topics)
    .filter(t => t.seen >= 3 && t.accuracy < 0.6) // Only visible weakness
    .sort((a, b) => a.accuracy - b.accuracy) // Lowest accuracy first
    .slice(0, 5);

  const advancedMetrics: AdvancedMetrics = {
    avgTimeCorrect: countTimeCorrect > 0 ? Math.round(totalTimeCorrect / countTimeCorrect) : 0,
    avgTimeIncorrect: countTimeIncorrect > 0 ? Math.round(totalTimeIncorrect / countTimeIncorrect) : 0,
    consistencyScore: Math.round(consistencyScore),
    worstTopics
  };

  const { moduleScores, subjectCoverage } = buildSubjectModuleEstimates(subjects);
  const icfesEstimate = estimateIcfesScore({
    mmr: globalMMR,
    accuracy: attempts.length > 0 ? correctCount / attempts.length : 0,
    evidenceCount: attempts.length,
    averageDifficulty: attempts.length > 0
      ? attempts.reduce((sum, attempt) => sum + (attempt.difficulty || 3), 0) / attempts.length
      : 3,
    consistencyScore: advancedMetrics.consistencyScore,
    subjectCoverage,
    estimatedModuleScores: subjectCoverage > 0 ? moduleScores : undefined
  });

  return {
    globalMMR: Math.round(globalMMR),
    icfesEstimate,
    rankTitle: getRankTitle(globalMMR),
    totalQuestions: attempts.length,
    globalAccuracy: attempts.length > 0 ? correctCount / attempts.length : 0,
    subjects,
    competencies,
    topics,
    dailyActivity,
    recentHistory: sampledHistory,
    advancedMetrics // 🆕
  };
}

/**
 * Generate a smart prompt for External AI (NotebookLM/ChatGPT)
 */
export function generateAIAnalysisPrompt(_profile: UserProfile): string {
  return "Análisis deshabilitado temporalmente para debugging.";
}

/**
 * Generate insights based on user profile
 */
export function generateInsights(profile: UserProfile): string[] {
  const insights: string[] = [];

  // 1. Global Performance
  if (profile.totalQuestions < 10) {
    insights.push("🔍 Continúa practicando para desbloquear tu análisis detallado (mínimo 10 preguntas).");
    return insights;
  }

  // 2. Strongest Subject
  const sortedSubjects = Object.values(profile.subjects).sort((a, b) => b.mmr - a.mmr);
  if (sortedSubjects.length > 0) {
    const best = sortedSubjects[0];
    insights.push(`🌟 Tu fortaleza principal es **${best.name}** (Rating: ${Math.round(best.mmr)}).`);
  }

  // 3. Weakest Subject
  if (sortedSubjects.length > 1) {
    const worst = sortedSubjects[sortedSubjects.length - 1];
    insights.push(`📉 Enfócate en mejorar **${worst.name}**. Un refuerzo aquí subirá tu promedio rápidamente.`);
  }

  // 4. Competency Gaps
  const gaps = Object.values(profile.competencies)
    .filter(c => c.seen >= 3 && (c.correct / c.seen) < 0.5)
    .sort((a, b) => a.mmr - b.mmr);

  if (gaps.length > 0) {
    const gap = gaps[0];
    insights.push(`⚠️ Se detectaron dificultades en la competencia: **${gap.name}**. Intenta ejercicios específicos de este tipo.`);
  }

  // 5. Momentum
  const history = profile.recentHistory;
  if (history.length >= 10) {
    const recent = history.slice(-5);
    const improvement = recent[recent.length-1].mmr - recent[0].mmr;
    if (improvement > 20) {
      insights.push("🔥 ¡Estás en racha! Tu rendimiento ha mejorado significativamente en las últimas sesiones.");
    } else if (improvement < -20) {
      insights.push("💤 Tu rendimiento ha bajado levemente. ¡Tómate un descanso y vuelve con energía!");
    }
  }

  return insights;
}

/**
 * Get the current global MMR of the user
 */
export async function getLatestMMR(): Promise<number> {
  const profile = await generateUserProfile();
  return profile.globalMMR;
}

export function buildExamPerformanceSnapshot(
  results: ExamResultRecord[],
  profile: UserProfile,
  benchmark: IcfesBenchmarkConfig = CO_ICFES_2026_BENCHMARK
): ExamPerformanceSnapshot {
  const latestResult: ExamResultRecord | undefined = results[0];
  if (!latestResult) {
    return {
      hasHistory: false,
      latestSessionAt: null,
      latestScore: null,
      icfesEstimate: null,
      benchmarkScore: benchmark.benchmarkScore,
      benchmarkDelta: null,
      goalScore: benchmark.goalScore,
      goalDelta: null,
      rankTitle: null,
      latestSubject: null
    };
  }

  const simulatedScore = profile.icfesEstimate.score;

  return {
    hasHistory: true,
    latestSessionAt: latestResult.timestamp,
    latestScore: latestResult.score,
    icfesEstimate: profile.icfesEstimate,
    benchmarkScore: benchmark.benchmarkScore,
    benchmarkDelta: simulatedScore - benchmark.benchmarkScore,
    goalScore: benchmark.goalScore,
    goalDelta: simulatedScore - benchmark.goalScore,
    rankTitle: profile.rankTitle,
    latestSubject: latestResult.subject || null
  };
}

export async function generateExamPerformanceSnapshot(
  benchmark: IcfesBenchmarkConfig = CO_ICFES_2026_BENCHMARK
): Promise<ExamPerformanceSnapshot> {
  const [results, profile] = await Promise.all([
    getAllLocalResults(),
    generateUserProfile()
  ]);

  return buildExamPerformanceSnapshot(results, profile, benchmark);
}
