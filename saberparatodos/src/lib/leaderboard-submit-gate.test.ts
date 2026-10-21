import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./p2p-edge-mesh', () => ({
  p2p: {},
  estadoMesh: {}
}));

vi.mock('./supabase', () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: { success: true }, error: null })
    }
  }
}));

import { submitScoreInput, type ScoreSubmissionInput } from './leaderboard-service';
import { saveLeaderboardSettings } from './leaderboard-service';
import { supabase } from './supabase';

const baseInput: ScoreSubmissionInput = {
  anonymousId: 'anon-123',
  displayName: 'Estudiante',
  grade: 11,
  region: 'BOG',
  totalPoints: 250,
  questionsAnswered: 60,
  correctAnswers: 50,
  averageDifficulty: 3,
  examDurationMs: 120000,
  timestamp: Date.now()
};

describe('leaderboard submit gate', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(supabase.functions.invoke).mockClear();
    vi.mocked(supabase.functions.invoke).mockResolvedValue({ data: { success: true }, error: null } as any);
  });

  it('sin opt-in: 0 llamadas de red', async () => {
    const input = { ...baseInput, questionsAnswered: 60 };
    const res = await submitScoreInput(input);
    expect(res).toBe(false);
    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('opt-in + 20 preguntas: 0 llamadas', async () => {
    saveLeaderboardSettings({ isOptedIn: true });
    const input = { ...baseInput, questionsAnswered: 20 };
    const res = await submitScoreInput(input);
    expect(res).toBe(false);
    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('opt-in + 60 preguntas: 1 llamada y payload sin displayName si anónimo', async () => {
    saveLeaderboardSettings({ isOptedIn: true });
    const input = { ...baseInput, questionsAnswered: 60 };
    const res = await submitScoreInput(input);
    expect(res).toBe(true);
    expect(supabase.functions.invoke).toHaveBeenCalledTimes(1);
    const call = vi.mocked(supabase.functions.invoke).mock.calls[0];
    const body = (call[1] as any).body;
    expect(body.submission).not.toHaveProperty('displayName');
  });
});
