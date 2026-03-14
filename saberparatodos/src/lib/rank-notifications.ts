/**
 * Notification Service for Leaderboard Changes
 *
 * Tracks user's best score and position, showing alerts
 * when someone beats their score or when they climb/drop ranks.
 *
 * Uses LocalStorage for persistence.
 */

import type { LeaderboardEntry, LeaderboardPeriod } from './leaderboard';

// Storage keys
const STORAGE_KEY = 'wx_rank_tracking';

export interface RankTracking {
  anonymousId: string;
  displayName: string;
  lastKnownRank: Record<LeaderboardPeriod, number | null>;
  lastKnownScore: Record<LeaderboardPeriod, number | null>;
  lastChecked: string;
}

export interface RankChange {
  period: LeaderboardPeriod;
  type: 'improved' | 'dropped' | 'overtaken' | 'new_entry';
  previousRank: number | null;
  currentRank: number | null;
  previousScore: number | null;
  currentScore: number | null;
  message: string;
}

/**
 * Load tracking data from localStorage
 */
export function loadRankTracking(): RankTracking | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Save tracking data to localStorage
 */
export function saveRankTracking(tracking: RankTracking): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
  } catch (e) {
    console.error('Failed to save rank tracking:', e);
  }
}

/**
 * Initialize tracking for a user
 */
export function initRankTracking(anonymousId: string, displayName: string): RankTracking {
  const tracking: RankTracking = {
    anonymousId,
    displayName,
    lastKnownRank: {
      weekly: null,
      monthly: null,
      annual: null,
      alltime: null,
      'semester-a': null,
      'semester-b': null
    },
    lastKnownScore: {
      weekly: null,
      monthly: null,
      annual: null,
      alltime: null,
      'semester-a': null,
      'semester-b': null
    },
    lastChecked: new Date().toISOString()
  };

  saveRankTracking(tracking);
  return tracking;
}

/**
 * Check for rank changes and generate notifications
 */
export function checkRankChanges(
  tracking: RankTracking,
  period: LeaderboardPeriod,
  currentEntry: LeaderboardEntry | null
): RankChange | null {
  const previousRank = tracking.lastKnownRank[period];
  const previousScore = tracking.lastKnownScore[period];

  // No previous data - first time checking
  if (previousRank === null && currentEntry) {
    // User is new to the leaderboard!
    return {
      period,
      type: 'new_entry',
      previousRank: null,
      currentRank: currentEntry.rank,
      previousScore: null,
      currentScore: currentEntry.score,
      message: `🎉 ¡Felicidades! Entraste al ranking ${formatPeriod(period)} en el puesto #${currentEntry.rank}`
    };
  }

  // User was on leaderboard but is not anymore
  if (previousRank !== null && !currentEntry) {
    return {
      period,
      type: 'dropped',
      previousRank,
      currentRank: null,
      previousScore,
      currentScore: null,
      message: `😢 Saliste del top 100 del ranking ${formatPeriod(period)}. ¡Sigue practicando!`
    };
  }

  // User is on leaderboard - check for changes
  if (previousRank !== null && currentEntry) {
    // Rank improved
    if (currentEntry.rank < previousRank) {
      const diff = previousRank - currentEntry.rank;
      return {
        period,
        type: 'improved',
        previousRank,
        currentRank: currentEntry.rank,
        previousScore,
        currentScore: currentEntry.score,
        message: `🚀 ¡Subiste ${diff} puesto${diff > 1 ? 's' : ''}! Ahora estás #${currentEntry.rank} en ${formatPeriod(period)}`
      };
    }

    // Rank dropped (someone overtook)
    if (currentEntry.rank > previousRank) {
      const diff = currentEntry.rank - previousRank;
      return {
        period,
        type: 'overtaken',
        previousRank,
        currentRank: currentEntry.rank,
        previousScore,
        currentScore: currentEntry.score,
        message: `⚠️ Alguien te superó. Bajaste ${diff} puesto${diff > 1 ? 's' : ''} a #${currentEntry.rank} en ${formatPeriod(period)}`
      };
    }
  }

  return null;
}

/**
 * Update tracking data after checking
 */
export function updateTracking(
  tracking: RankTracking,
  period: LeaderboardPeriod,
  entry: LeaderboardEntry | null
): RankTracking {
  const updated = { ...tracking };

  if (entry) {
    updated.lastKnownRank[period] = entry.rank;
    updated.lastKnownScore[period] = entry.score;
  } else {
    updated.lastKnownRank[period] = null;
    updated.lastKnownScore[period] = null;
  }

  updated.lastChecked = new Date().toISOString();
  saveRankTracking(updated);

  return updated;
}

/**
 * Format period name for display
 */
function formatPeriod(period: LeaderboardPeriod): string {
  const names: Record<LeaderboardPeriod, string> = {
    weekly: 'semanal',
    monthly: 'mensual',
    annual: 'anual',
    alltime: 'histórico',
    'semester-a': 'semestre A',
    'semester-b': 'semestre B'
  };
  return names[period] || period;
}

/**
 * Clear all tracking data
 */
export function clearRankTracking(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if we should show notifications (rate limit)
 * Only show notifications once per hour to avoid spam
 */
export function shouldShowNotification(tracking: RankTracking): boolean {
  const lastChecked = new Date(tracking.lastChecked);
  const now = new Date();
  const hoursSinceLastCheck = (now.getTime() - lastChecked.getTime()) / (1000 * 60 * 60);

  // Show notifications if more than 1 hour since last check
  return hoursSinceLastCheck >= 1;
}
