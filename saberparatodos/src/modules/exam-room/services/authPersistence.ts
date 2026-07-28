import type { User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import type { RoomConfig } from '../types';

export function isSupabaseMirrorEnabled(): boolean {
  return import.meta.env.PUBLIC_ROOMS_SUPABASE_MIRROR === 'true';
}

export async function getSupabaseMirrorUser(): Promise<User | null> {
  if (!isSupabaseMirrorEnabled()) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.warn('[RoomsMirror] No se pudo verificar la sesión:', error.message);
    return null;
  }

  return user;
}

export async function maybePersistPartySession(
  session: Record<string, unknown>,
): Promise<boolean> {
  const user = await getSupabaseMirrorUser();
  if (!user) return false;

  const { error } = await supabase.from('party_sessions').insert(session);
  if (error) throw error;
  return true;
}

export async function maybeGetPartySession(
  partyCode: string,
  columns = '*',
): Promise<Record<string, any> | null> {
  const user = await getSupabaseMirrorUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('party_sessions')
    .select(columns)
    .eq('party_code', partyCode)
    .maybeSingle();
  if (error) throw error;

  return data as Record<string, any> | null;
}

export async function maybeUpdatePartySession(
  partyCode: string,
  updates: Record<string, unknown>,
): Promise<boolean> {
  const user = await getSupabaseMirrorUser();
  if (!user) return false;

  const { error } = await supabase
    .from('party_sessions')
    .update(updates)
    .eq('party_code', partyCode);
  if (error) throw error;

  return true;
}

interface PersistedPlayer {
  id: string;
  name: string;
  score?: number;
  rank?: number;
  correctAnswers?: number;
  joinedAt: Date;
}

export async function maybePersistPartyResults(input: {
  config: RoomConfig;
  players: PersistedPlayer[];
}): Promise<boolean> {
  const user = await getSupabaseMirrorUser();
  if (!user || user.id !== input.config.hostId) return false;

  const { error: roomError } = await supabase.from('parties').insert({
    id: input.config.id,
    pin: input.config.id,
    host_id: user.id,
    status: 'finished',
    config: input.config,
    total_questions: input.config.totalQuestions,
    ended_at: new Date().toISOString(),
  });
  if (roomError) throw roomError;

  const players = input.players.map((player) => ({
    party_id: input.config.id,
    player_id: player.id,
    nickname: player.name,
    score: player.score || 0,
    rank: player.rank,
    correct_answers: player.correctAnswers || 0,
    joined_at: player.joinedAt.toISOString(),
  }));

  if (players.length > 0) {
    const { error: playersError } = await supabase
      .from('party_players')
      .insert(players);
    if (playersError) throw playersError;
  }

  return true;
}

export async function maybeAnalyzePartyResults(
  partyId: string,
): Promise<{ analysis: string } | null> {
  const user = await getSupabaseMirrorUser();
  if (!user) return null;

  const { data, error } = await supabase.functions.invoke('analyze-party-results', {
    body: { partyId },
  });
  if (error) throw error;

  return data as { analysis: string };
}
