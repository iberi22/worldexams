// =============================================================================
// Edge Function: start-training-session
// Description: Create adaptive learning session based on student weaknesses
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface SessionRequest {
  subject: string; // e.g., "matematicas"
  topic?: string; // e.g., "algebra" (optional, auto-detect if missing)
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

    const { subject, topic }: SessionRequest = await req.json();

    if (!subject) {
      return new Response(JSON.stringify({ error: "Missing subject" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Analyze user's exam history to find weaknesses
    const { data: results, error: resultsError } = await supabase
      .from("exam_results")
      .select("*")
      .eq("user_id", user.id)
      .eq("subject", subject)
      .order("created_at", { ascending: false })
      .limit(10); // Last 10 exams

    if (resultsError) throw resultsError;

    // Calculate average performance
    const avgPercentage = results && results.length > 0
      ? results.reduce((sum, r) => sum + r.percentage, 0) / results.length
      : 50; // Default if no history

    // Determine starting difficulty (1-5 scale)
    let startingDifficulty = 3; // Default medium
    if (avgPercentage < 40) startingDifficulty = 1; // Weak → Start easy
    else if (avgPercentage < 60) startingDifficulty = 2;
    else if (avgPercentage < 75) startingDifficulty = 3;
    else if (avgPercentage < 90) startingDifficulty = 4;
    else startingDifficulty = 5; // Strong → Challenge

    // Auto-detect topic from recent mistakes if not provided
    let selectedTopic = topic;
    if (!selectedTopic && results && results.length > 0) {
      // Simple heuristic: find most common wrong answer pattern
      // In production, this would analyze `answers` JSONB field
      selectedTopic = "repaso-general"; // Fallback
    }

    // Create training session
    const { data: session, error: sessionError } = await supabase
      .from("training_sessions")
      .insert({
        user_id: user.id,
        subject,
        topic: selectedTopic || "diagnostic",
        current_difficulty: startingDifficulty,
        questions_answered: 0,
        correct_answers: 0,
        status: "active",
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    // Fetch initial question set (5 questions at current difficulty)
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: questions, error: questionsError } = await adminSupabase
      .from("questions_global")
      .select("*")
      .eq("subject_global_id", subject)
      .eq("difficulty", startingDifficulty)
      .limit(5);

    if (questionsError) throw questionsError;

    return new Response(
      JSON.stringify({
        success: true,
        session_id: session.id,
        starting_difficulty: startingDifficulty,
        recommended_topic: selectedTopic,
        performance_analysis: {
          avg_percentage: Math.round(avgPercentage),
          exams_analyzed: results?.length || 0,
        },
        initial_questions: questions || [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
