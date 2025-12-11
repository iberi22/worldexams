import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { partyId } = await req.json();
    if (!partyId) throw new Error("Missing partyId");

    // Init Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Fetch Party Data
    const { data: party, error: partyError } = await supabase
      .from("parties")
      .select("*, party_players(*)")
      .eq("id", partyId)
      .single();

    if (partyError || !party) throw new Error("Party not found");

    // 2. Calculate Stats
    const players = party.party_players || [];
    const totalPlayers = players.length;
    
    let avgScore = 0;
    let topScore = 0;

    if (totalPlayers > 0) {
      avgScore = players.reduce((acc: number, p: any) => acc + (p.score || 0), 0) / totalPlayers;
      topScore = Math.max(...players.map((p: any) => p.score || 0));
    }

    // 3. Call Gemini
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.error("GEMINI_API_KEY missing");
      return new Response(
        JSON.stringify({ error: "AI Service not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `
      Analiza los resultados de esta sesión de examen grupal (Party Mode):
      - Asignatura: ${party.config?.asignatura || "General"}
      - Grado: ${party.config?.grado || "N/A"}
      - Total Estudiantes: ${totalPlayers}
      - Promedio de Puntaje: ${avgScore.toFixed(1)}
      - Puntaje Máximo: ${topScore}
      
      Provee un análisis pedagógico breve (max 150 palabras) para el profesor.
      Destaca fortalezas del grupo y áreas generales de mejora.
      Usa un tono profesional y motivador.
      Idioma: Español.
    `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    const analysisText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar el análisis.";

    // 4. Update Party with Analysis
    // Store in 'ai_analysis' column (will create migration)
    await supabase
      .from("parties")
      .update({ ai_analysis: analysisText })
      .eq("id", partyId);

    return new Response(
      JSON.stringify({ analysis: analysisText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
