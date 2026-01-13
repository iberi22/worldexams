import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const relayUrl = import.meta.env.PUBLIC_RELAY_URL || 'ws://localhost:8765/ws';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// =============================================================================
// Edge Function Helpers
// =============================================================================

export interface TrainingSessionResponse {
  success: boolean;
  session_id: string;
  starting_difficulty: number;
  recommended_topic: string;
  performance_analysis: {
    avg_percentage: number;
    exams_analyzed: number;
  };
  initial_questions: any[];
}

export interface InfographicResponse {
  success: boolean;
  image_url: string;
  content_id: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis_id: string;
  analysis: {
    fortalezas: string[];
    debilidades: string[];
    plan_mejora: string[];
  };
}

/**
 * Start a new adaptive training session
 */
export async function startTrainingSession(
  subject: string,
  topic?: string
): Promise<TrainingSessionResponse> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('No authenticated session');
  }

  const response = await fetch(
    `${supabaseUrl}/functions/v1/start-training-session`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, topic }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to start training session');
  }

  return response.json();
}

/**
 * Generate AI infographic
 */
export async function generateInfographic(
  topic: string,
  visual_style: string,
  training_session_id?: string
): Promise<InfographicResponse> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('No authenticated session');
  }

  const response = await fetch(
    `${supabaseUrl}/functions/v1/generate-infographic`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, visual_style, training_session_id }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate infographic');
  }

  return response.json();
}

/**
 * Generate exam analysis with AI
 */
export async function generateAnalysis(
  exam_result_id: string
): Promise<AnalysisResponse> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('No authenticated session');
  }

  const response = await fetch(
    `${supabaseUrl}/functions/v1/generate-analysis`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exam_result_id }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate analysis');
  }

  return response.json();
}

/**
 * Get current user profile with credits
 */
export async function getUserProfile() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}
