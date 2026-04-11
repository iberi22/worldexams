import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getAuthenticatedCorsHeaders } from "../_shared/cors.ts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExamResult {
  user_name: string;
  score: number;
  total_questions: number;
  max_score?: number;
  subject: string;
  grade?: number;
  /** tiempo en segundos (alias legacy) */
  time_taken?: number;
  duration_seconds?: number;
  mode?: string;
  exam_id?: string;
  /** ID pregunta → respuesta seleccionada */
  answers?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

interface SubmitExamRequest {
  result: ExamResult;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  corsHeaders: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validateResult(
  result: ExamResult,
  corsHeaders: Record<string, string>
): Response | null {
  if (typeof result.score !== "number" || result.score < 0) {
    return jsonResponse({ error: "Score debe ser un número >= 0" }, 400, corsHeaders);
  }
  if (typeof result.total_questions !== "number" || result.total_questions <= 0) {
    return jsonResponse({ error: "total_questions debe ser > 0" }, 400, corsHeaders);
  }
  if (result.score > result.total_questions) {
    return jsonResponse(
      { error: "Score no puede ser mayor que total_questions" },
      400,
      corsHeaders
    );
  }
  if (!result.subject || result.subject.trim() === "") {
    return jsonResponse({ error: "Se requiere 'subject'" }, 400, corsHeaders);
  }
  return null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req: Request): Promise<Response> => {
  const corsHeaders = getAuthenticatedCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Método no permitido" }, 405, corsHeaders);
  }

  try {
    // ── Auth ────────────────────────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse({ error: "Unauthorized" }, 401, corsHeaders);
    }
    const accessToken = authHeader.replace("Bearer ", "").trim();

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return jsonResponse({ error: "Unauthorized" }, 401, corsHeaders);
    }

    // ── Parse & Validate ────────────────────────────────────────────────────
    const body = (await req.json()) as SubmitExamRequest;
    const { result } = body;

    if (!result) {
      return jsonResponse({ error: "Se requiere el campo 'result'" }, 400, corsHeaders);
    }

    const validationError = validateResult(result, corsHeaders);
    if (validationError) return validationError;

    // ── Sanitize username (server-side to prevent spoofing) ─────────────────
    const derivedUserName =
      (user.user_metadata?.["user_name"] as string | undefined) ??
      (user.user_metadata?.["full_name"] as string | undefined) ??
      user.email?.split("@")[0] ??
      result.user_name ??
      "Anonymous";

    const sanitizedUserName = String(derivedUserName)
      .trim()
      .slice(0, 50)
      .replace(/[<>]/g, "");

    const durationSeconds: number | null =
      typeof result.duration_seconds === "number"
        ? result.duration_seconds
        : typeof result.time_taken === "number"
        ? result.time_taken
        : null;

    // ── Insert ──────────────────────────────────────────────────────────────
    const { data, error } = await supabase
      .from("exam_results")
      .insert({
        user_name: sanitizedUserName,
        user_id: user.id,
        score: result.score,
        total_questions: result.total_questions,
        max_score: result.max_score ?? result.total_questions,
        subject: result.subject.trim(),
        grade: result.grade ?? null,
        time_taken: result.time_taken ?? null,
        duration_seconds: durationSeconds,
        mode: result.mode ?? null,
        exam_id: result.exam_id ?? null,
        metadata: result.metadata ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error insertando resultado:", error);
      return jsonResponse(
        { error: "Error al guardar resultado", details: error.message },
        500,
        corsHeaders
      );
    }

    // ── Ranking ─────────────────────────────────────────────────────────────
    const { count: betterScores } = await supabase
      .from("exam_results")
      .select("*", { count: "exact", head: true })
      .eq("subject", result.subject.trim())
      .gt("score", result.score);

    const rank = (betterScores ?? 0) + 1;

    return jsonResponse(
      {
        success: true,
        message: "Resultado guardado exitosamente",
        data: {
          id: data.id,
          user_name: data.user_name,
          score: data.score,
          total_questions: data.total_questions,
          max_score: data.max_score,
          percentage: data.percentage,
          subject: data.subject,
          rank,
          created_at: data.created_at,
        },
      },
      201,
      corsHeaders
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error en submit-exam:", message);
    return jsonResponse(
      { error: "Error interno del servidor", details: message },
      500,
      corsHeaders
    );
  }
});
