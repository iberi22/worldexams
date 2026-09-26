import { getDeviceHash } from '../leaderboard-service';

export type RankedErrorCode = 'RATE_LIMITED' | 'UNAVAILABLE' | 'ALREADY_SUBMITTED' | 'NETWORK' | 'UNKNOWN';

export class RankedError extends Error {
  code: RankedErrorCode;

  constructor(message: string, code: RankedErrorCode) {
    super(message);
    this.name = 'RankedError';
    this.code = code;
  }
}

export interface RankedQuestion {
  id: string;
  subject: string;
  statement: string;
  context?: string;
  options: { letter: string; text: string }[];
}

export interface RankedStartResponse {
  sessionId: string;
  seed: number;
  expiresAt: string;
  questions: RankedQuestion[];
}

export interface RankedAnswer {
  questionId: string;
  letter: string;
  ms: number;
}

export interface IntegritySummary {
  tabSwitches: number;
  focusLoss: number;
  fullscreenExits: number;
  copyPaste: number;
  rightClick: number;
  devtools: number;
}

export interface RankedSubmitResponse {
  status: 'valid' | 'flagged' | 'not_eligible_min_questions';
  score: number;
  correct: number;
  answered: number;
  total: number;
  review: {
    questionId: string;
    correctLetter: string;
    feedback: string;
    explanation: string;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  score: number;
  correct: number;
  answered: number;
  createdAt: string;
}

export interface LeaderboardResponse {
  season: string;
  average: number;
  entries: LeaderboardEntry[];
}

export const RANKED_MIN_ANSWERED = 31;
export const RANKED_TOTAL_QUESTIONS = 40;

export function getRankedApiBase(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_RANKED_API_BASE_URL) {
    return import.meta.env.PUBLIC_RANKED_API_BASE_URL;
  }
  return 'https://api.saberparatodos.space';
}

export async function startRanked(nickname: string, country?: string, grade?: number): Promise<RankedStartResponse> {
  const deviceId = getDeviceHash();
  const url = `${getRankedApiBase()}/v1/ranked/start`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, nickname, country, grade })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new RankedError('Rate limited', 'RATE_LIMITED');
      } else if (response.status === 503) {
        throw new RankedError('Ranked module unavailable', 'UNAVAILABLE');
      }
      throw new RankedError(`HTTP error! status: ${response.status}`, 'UNKNOWN');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RankedError) {
      throw error;
    }
    throw new RankedError('Network error', 'NETWORK');
  }
}

export async function submitRanked(
  sessionId: string,
  answers: RankedAnswer[],
  integrity: IntegritySummary
): Promise<RankedSubmitResponse> {
  const url = `${getRankedApiBase()}/v1/ranked/submit`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answers, integrity })
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new RankedError('Already submitted', 'ALREADY_SUBMITTED');
      }
      throw new RankedError(`HTTP error! status: ${response.status}`, 'UNKNOWN');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RankedError) {
      throw error;
    }
    throw new RankedError('Network error', 'NETWORK');
  }
}

export async function fetchLeaderboard(season?: string): Promise<LeaderboardResponse> {
  let url = `${getRankedApiBase()}/v1/leaderboard?limit=50`;
  if (season) {
    url += `&season=${encodeURIComponent(season)}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new RankedError(`HTTP error! status: ${response.status}`, 'UNKNOWN');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RankedError) {
      throw error;
    }
    throw new RankedError('Network error', 'NETWORK');
  }
}

export interface ActiveRankedSession {
  sessionId: string;
  expiresAt: string;
  questions: RankedQuestion[];
  answers: RankedAnswer[];
}

const SESSION_KEY = 'worldexams_ranked_active';

export function saveActiveRankedSession(session: ActiveRankedSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('Failed to save ranked session', e);
  }
}

export function loadActiveRankedSession(): ActiveRankedSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as ActiveRankedSession;
    const expiresAt = new Date(session.expiresAt).getTime();
    const now = Date.now();

    if (now > expiresAt) {
      clearActiveRankedSession();
      return null;
    }

    return session;
  } catch (e) {
    console.warn('Failed to load ranked session', e);
    return null;
  }
}

export function clearActiveRankedSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn('Failed to clear ranked session', e);
  }
}

export function validateNickname(nickname: string): boolean {
  return /^[\p{L}\p{N} _-]{3,20}$/u.test(nickname);
}
