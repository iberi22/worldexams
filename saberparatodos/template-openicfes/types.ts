export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  category: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: string;
  score: number;
  time: string;
}

export enum AppView {
  LANDING = 'LANDING',
  EXAM = 'EXAM',
  LEADERBOARD = 'LEADERBOARD',
  RESULTS = 'RESULTS'
}
