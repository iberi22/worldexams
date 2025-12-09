// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ExamResult {
  user_name: string;
  score: number;
  total_questions: number;
  subject: string;
  grade?: number;
  time_taken?: number; // tiempo en segundos
  answers?: Record<string, string>; // ID pregunta -> respuesta seleccionada
}

interface SubmitExamRequest {
  result: ExamResult;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Solo permitir POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método no permitido" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Crear cliente Supabase con Service Role para bypass RLS si es necesario
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Parsear el body
    const body: SubmitExamRequest = await req.json();
    const { result } = body;

    // Validaciones
    if (!result) {
      return new Response(
        JSON.stringify({ error: "Se requiere el campo 'result'" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!result.user_name || result.user_name.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Se requiere 'user_name'" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (typeof result.score !== "number" || result.score < 0) {
      return new Response(
        JSON.stringify({ error: "Score debe ser un número >= 0" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (typeof result.total_questions !== "number" || result.total_questions <= 0) {
      return new Response(
        JSON.stringify({ error: "total_questions debe ser > 0" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (result.score > result.total_questions) {
      return new Response(
        JSON.stringify({ error: "Score no puede ser mayor que total_questions" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!result.subject || result.subject.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Se requiere 'subject'" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Sanitizar nombre de usuario (prevenir XSS/injection)
    const sanitizedUserName = result.user_name
      .trim()
      .slice(0, 50) // Máximo 50 caracteres
      .replace(/[<>]/g, ""); // Remover caracteres peligrosos

    // Insertar resultado
    const { data, error } = await supabase
      .from("exam_results")
      .insert({
        user_name: sanitizedUserName,
        score: result.score,
        total_questions: result.total_questions,
        subject: result.subject.trim(),
        grade: result.grade || null,
        time_taken: result.time_taken || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error insertando resultado:", error);
      return new Response(
        JSON.stringify({ 
          error: "Error al guardar resultado", 
          details: error.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Obtener posición en el ranking
    const { count: betterScores } = await supabase
      .from("exam_results")
      .select("*", { count: "exact", head: true })
      .eq("subject", result.subject.trim())
      .gt("score", result.score);

    const rank = (betterScores || 0) + 1;

    // Respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        message: "Resultado guardado exitosamente",
        data: {
          id: data.id,
          user_name: data.user_name,
          score: data.score,
          total_questions: data.total_questions,
          percentage: data.percentage,
          subject: data.subject,
          rank: rank,
          created_at: data.created_at,
        },
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error en submit-exam:", error);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
