// =============================================================================
// Edge Function: generate-analysis
// Description: Generate AI-powered exam analysis using Gemini
// Cost: 10 credits
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface AnalysisRequest {
  exam_result_id: number;
}

serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { exam_result_id }: AnalysisRequest = await req.json();

    // Fetch exam result
    const { data: exam, error: examError } = await supabase
      .from("exam_results")
      .select("*")
      .eq("id", exam_result_id)
      .eq("user_id", user.id) // Security: only own results
      .single();

    if (examError || !exam) {
      return new Response(JSON.stringify({ error: "Exam not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if analysis already exists
    const { data: existing } = await supabase
      .from("analysis_reports")
      .select("id")
      .eq("exam_result_id", exam_result_id)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Analysis already exists", id: existing.id }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Call spend-credits function
    const spendResponse = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/spend-credits`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10,
          service: "analysis",
          reference_id: `exam_${exam_result_id}`,
        }),
      }
    );

    if (!spendResponse.ok) {
      const error = await spendResponse.json();
      return new Response(JSON.stringify(error), {
        status: spendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate analysis with Gemini
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${Deno.env.get(
        "GEMINI_API_KEY"
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Eres un tutor experto en educación colombiana. Analiza este resultado de examen Saber 11:

Puntaje: ${exam.score}/${exam.total_questions} (${exam.percentage}%)
Asignatura: ${exam.subject}
Grado: ${exam.grade}
Tiempo: ${exam.time_taken} segundos

Genera un análisis DETALLADO con:
1. Fortalezas (qué hizo bien)
2. Debilidades (temas a reforzar)
3. Plan de Estudio (3 acciones concretas)
4. Predicción de Puntaje en examen real
5. Motivación personalizada

Formato JSON:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "study_plan": ["..."],
  "predicted_score": 0-500,
  "motivation": "..."
}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    const analysisText =
      geminiData.candidates[0]?.content?.parts[0]?.text || "{}";
    const analysis = JSON.parse(
      analysisText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
    );

    // Save analysis
    const { data: report, error: saveError } = await supabase
      .from("analysis_reports")
      .insert({
        exam_result_id,
        content: analysis,
        cost: 10,
        paid_by_user_id: user.id,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({ success: true, report }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
