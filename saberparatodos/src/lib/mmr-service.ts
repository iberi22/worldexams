
import { getAllLocalResults } from './idb-storage';

export interface MMRStats {
  mmr: number;
  rank: string;
  rankColor: string;
  nextRank: string;
  progressToNext: number; // 0-100
  totalExams: number;
  avgAccuracy: number;
  strongestSubject: string;
}

const RANKS = [
  { name: 'Novato', min: 0, color: 'text-gray-400' },
  { name: 'Aprendiz', min: 500, color: 'text-emerald-400' },
  { name: 'Competente', min: 1000, color: 'text-blue-400' },
  { name: 'Avanzado', min: 1500, color: 'text-purple-400' },
  { name: 'Maestro', min: 2000, color: 'text-yellow-400' },
  { name: 'Leyenda', min: 2500, color: 'text-red-500' }
];

/**
 * Calculate dynamic MMR from local history
 */
export async function calculateLocalMMR(): Promise<MMRStats> {
  try {
    const results = await getAllLocalResults();

    if (!results || results.length === 0) {
      return getEmptyStats();
    }

    // Sort by date (oldest to newest)
    const history = results.sort((a, b) => a.timestamp - b.timestamp);

    // Only consider last 50 exams for "Current Form" to allow recovery
    const recentHistory = history.slice(-50);

    let weightedSum = 0;
    let weightTotal = 0;
    let totalAccuracy = 0;
    const subjectScores: Record<string, number> = {};

    recentHistory.forEach((exam, index) => {
      // 1. Calculate Exam Performance Score (0 - ~300 per exam)
      // Base: Accuracy (0-100)
      // Multiplier: Avg Difficulty (1-5) -> Normalized to 0.5 - 2.5

      const safeQuestions = exam.details || [];
      const avgDifficulty = safeQuestions.length > 0
        ? safeQuestions.reduce((sum: number, q: any) => sum + (q.difficulty || 3), 0) / safeQuestions.length
        : 3;

      // Difficulty Factor: 1 (Easy) -> 0.8, 3 (Medium) -> 1.0, 5 (Hard) -> 1.5
      const difficultyFactor = 0.7 + (avgDifficulty * 0.15);

      const examScore = exam.score * difficultyFactor; // Max ~150 points per exam if perfect Hard

      // 2. Apply Recency Weight (Linear ramp)
      // Newest exams matter much more than old ones
      const weight = 1 + (index / recentHistory.length) * 2; // Weight 1 -> 3

      weightedSum += examScore * weight;
      weightTotal += weight;

      // Stats aggregation
      totalAccuracy += exam.score;
      if (exam.subject) {
        subjectScores[exam.subject] = (subjectScores[exam.subject] || 0) + (exam.score * avgDifficulty);
      }
    });

    // 3. Final MMR Calculation
    // Base MMR = Weighted Average * Volume Bonus
    const baseAvg = weightTotal > 0 ? weightedSum / weightTotal : 0;

    // Volume Bonus: Reward consistent practice (capped at 50 exams)
    // Up to 500 points just for having played a lot recently
    const volumeBonus = Math.min(recentHistory.length * 10, 500);

    // Scale up to 0-3000 range
    // baseAvg is roughly 0-150. * 15 -> 0-2250. + volumeBonus -> 0-2750+
    const mmr = Math.round((baseAvg * 15) + volumeBonus);

    // 4. Determine Rank
    const currentRankIdx = RANKS.findIndex((r, i) => {
      const next = RANKS[i + 1];
      return mmr >= r.min && (!next || mmr < next.min);
    });
    const currentRank = RANKS[currentRankIdx] || RANKS[0];
    const nextRank = RANKS[currentRankIdx + 1];

    let progress = 0;
    if (nextRank) {
      const range = nextRank.min - currentRank.min;
      const current = mmr - currentRank.min;
      progress = Math.min(100, Math.max(0, Math.round((current / range) * 100)));
    } else {
      progress = 100; // Max rank reached
    }

    // 5. Find strongest subject
    const strongestSubject = Object.entries(subjectScores)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    return {
      mmr,
      rank: currentRank.name,
      rankColor: currentRank.color,
      nextRank: nextRank ? nextRank.name : 'Max',
      progressToNext: progress,
      totalExams: history.length,
      avgAccuracy: Math.round(totalAccuracy / recentHistory.length),
      strongestSubject
    };

  } catch (e) {
    console.error('Error calculating MMR:', e);
    return getEmptyStats();
  }
}

function getEmptyStats(): MMRStats {
  return {
    mmr: 0,
    rank: RANKS[0].name,
    rankColor: RANKS[0].color,
    nextRank: RANKS[1].name,
    progressToNext: 0,
    totalExams: 0,
    avgAccuracy: 0,
    strongestSubject: '-'
  };
}

export function generateShareText(stats: MMRStats): string {
  return `🏆 Mi Rango WorldExams: ${stats.rank} (MMR: ${stats.mmr})
📊 Precisión: ${stats.avgAccuracy}% | 🧠 Fuerte: ${stats.strongestSubject}
🚀 Prepárate gratis en saberparatodos.space`;
}
