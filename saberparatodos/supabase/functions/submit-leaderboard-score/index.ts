/**
 * Supabase Edge Function: submit-leaderboard-score
 *
 * Proxy para enviar scores al GitHub Action que actualiza los leaderboards.
 * Esta función permite que el frontend envíe scores sin exponer el token de GitHub.
 *
 * Flujo:
 * 1. Frontend envía score a esta Edge Function
 * 2. Edge Function valida el score
 * 3. Edge Function dispara GitHub Action via repository_dispatch
 * 4. GitHub Action actualiza los archivos JSON del leaderboard
 *
 * Variables de entorno requeridas:
 * - GITHUB_TOKEN: Personal Access Token con permisos repo
 * - GITHUB_OWNER: dueño del repo (ej: "iberi22")
 * - GITHUB_REPO: nombre del repo (ej: "saberparatodos")
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tipos
interface ScoreSubmission {
  anonymousId: string;
  displayName: string;
  grade: number;
  region: string;
  totalPoints: number;
  questionsAnswered: number;
  correctAnswers: number;
  averageDifficulty: number;
  examDurationMs: number;
  timestamp: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Constantes de validación
const VALIDATION_LIMITS = {
  minQuestionsAnswered: 1,
  maxQuestionsAnswered: 100,
  minPoints: 0,
  maxPointsPerQuestion: 500, // 100 * 1.6 * 1.5 * 2.0 ≈ 480
  minExamDurationMs: 30000, // 30 segundos mínimo
  maxExamDurationMs: 7200000, // 2 horas máximo
  minAccuracy: 0,
  maxAccuracy: 1,
};

/**
 * Valida la submission del score
 */
function validateSubmission(data: ScoreSubmission): ValidationResult {
  const errors: string[] = [];

  // Validar campos requeridos
  if (!data.anonymousId || data.anonymousId.length < 10) {
    errors.push('Invalid anonymousId');
  }

  if (!data.displayName || data.displayName.length < 3) {
    errors.push('Invalid displayName');
  }

  if (!data.grade || data.grade < 1 || data.grade > 12) {
    errors.push('Invalid grade');
  }

  if (!data.region || data.region.length < 2 || data.region.length > 5) {
    errors.push('Invalid region');
  }

  // Validar puntos
  if (data.totalPoints < VALIDATION_LIMITS.minPoints) {
    errors.push('Points cannot be negative');
  }

  const maxPossiblePoints = data.questionsAnswered * VALIDATION_LIMITS.maxPointsPerQuestion;
  if (data.totalPoints > maxPossiblePoints) {
    errors.push(`Points (${data.totalPoints}) exceed maximum possible (${maxPossiblePoints})`);
  }

  // Validar preguntas
  if (data.questionsAnswered < VALIDATION_LIMITS.minQuestionsAnswered ||
      data.questionsAnswered > VALIDATION_LIMITS.maxQuestionsAnswered) {
    errors.push('Invalid questionsAnswered count');
  }

  // Validar accuracy
  const accuracy = data.correctAnswers / data.questionsAnswered;
  if (accuracy < VALIDATION_LIMITS.minAccuracy || accuracy > VALIDATION_LIMITS.maxAccuracy) {
    errors.push('Invalid accuracy ratio');
  }

  // Validar duración
  if (data.examDurationMs < VALIDATION_LIMITS.minExamDurationMs ||
      data.examDurationMs > VALIDATION_LIMITS.maxExamDurationMs) {
    errors.push('Invalid exam duration');
  }

  // Validar timestamp
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5 minutos máximo de antigüedad
  if (data.timestamp > now || data.timestamp < now - maxAge) {
    errors.push('Invalid timestamp');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Dispara el GitHub Action via repository_dispatch
 */
async function triggerGitHubAction(
  submission: ScoreSubmission,
  githubToken: string,
  owner: string,
  repo: string
): Promise<{ success: boolean; error?: string }> {
  const url = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        event_type: 'score_submission',
        client_payload: {
          submission: {
            ...submission,
            submittedAt: new Date().toISOString()
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return {
        success: false,
        error: `GitHub API error: ${response.status}`
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error triggering GitHub Action:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Rate limiting simple usando Supabase
 */
async function checkRateLimit(
  supabase: any,
  anonymousId: string
): Promise<{ allowed: boolean; reason?: string }> {
  // Máximo 10 submissions por hora por usuario
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  try {
    const { count, error } = await supabase
      .from('leaderboard_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('anonymous_id', anonymousId)
      .gte('created_at', oneHourAgo);

    if (error) {
      console.error('Rate limit check error:', error);
      // En caso de error, permitir (fail open)
      return { allowed: true };
    }

    if (count && count >= 10) {
      return {
        allowed: false,
        reason: 'Rate limit exceeded. Maximum 10 submissions per hour.'
      };
    }

    return { allowed: true };
  } catch (e) {
    console.error('Rate limit check exception:', e);
    return { allowed: true };
  }
}

/**
 * Guarda un log de la submission en Supabase
 */
async function logSubmission(
  supabase: any,
  submission: ScoreSubmission,
  success: boolean
): Promise<void> {
  try {
    await supabase.from('leaderboard_submissions').insert({
      anonymous_id: submission.anonymousId,
      display_name: submission.displayName,
      grade: submission.grade,
      region: submission.region,
      total_points: submission.totalPoints,
      questions_answered: submission.questionsAnswered,
      correct_answers: submission.correctAnswers,
      success: success
    });
  } catch (e) {
    console.error('Error logging submission:', e);
  }
}

// Handler principal
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Solo permitir POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Obtener variables de entorno
    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
    const GITHUB_OWNER = Deno.env.get('GITHUB_OWNER') || 'iberi22';
    const GITHUB_REPO = Deno.env.get('GITHUB_REPO') || 'saberparatodos';
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parsear body
    const body = await req.json() as { submission: ScoreSubmission };

    if (!body.submission) {
      return new Response(
        JSON.stringify({ error: 'Missing submission data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const submission = body.submission;

    // Validar submission
    const validation = validateSubmission(submission);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: validation.errors
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Crear cliente Supabase para rate limiting y logging
    let supabase = null;
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      // Verificar rate limit
      const rateLimit = await checkRateLimit(supabase, submission.anonymousId);
      if (!rateLimit.allowed) {
        return new Response(
          JSON.stringify({ error: rateLimit.reason }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Disparar GitHub Action
    const result = await triggerGitHubAction(
      submission,
      GITHUB_TOKEN,
      GITHUB_OWNER,
      GITHUB_REPO
    );

    // Log de la submission
    if (supabase) {
      await logSubmission(supabase, submission, result.success);
    }

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to submit score', details: result.error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Score submitted successfully. It will appear in the leaderboard shortly.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
