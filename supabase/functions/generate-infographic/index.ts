// =============================================================================
// Edge Function: generate-infographic
// Description: Generate AI-powered infographics using Google Gemini 2.0 Flash
// Cost: 5 credits
// Updated: 2025-12-15 - Migrated from Replicate to Gemini (more cost-effective)
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface InfographicRequest {
  topic: string; // e.g., "Álgebra Lineal"
  visual_style: string; // e.g., "cyberpunk", "anime", "minimalist"
  training_session_id?: string;
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

    const { topic, visual_style, training_session_id }: InfographicRequest =
      await req.json();

    if (!topic || !visual_style) {
      return new Response(
        JSON.stringify({ error: "Missing topic or visual_style" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Spend credits first
    const spendResponse = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/spend-credits`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 5,
          service: "infographic",
          reference_id: training_session_id || `infographic_${Date.now()}`,
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

    // Build prompt based on style and topic
    const stylePrompts = {
      cyberpunk:
        "neon lights, dark background, futuristic, holographic UI, tech aesthetic",
      anime: "anime art style, colorful, manga-inspired, clean lines, kawaii",
      minimalist:
        "simple, clean, white background, geometric shapes, modern design",
      default: "educational infographic, clear typography, organized layout",
    };

    const styleModifier =
      stylePrompts[visual_style as keyof typeof stylePrompts] ||
      stylePrompts.default;

    const prompt = `Create an educational infographic about ${topic}.
Style: ${styleModifier}.
Include: diagrams, key concepts, visual examples, clear labels.
High quality, professional design, organized layout with hierarchy.
Make it visually engaging for students studying for exams.`;

    // Call Google Gemini API (Imagen 3 via Gemini)
    const geminiApiKey = Deno.env.get("GOOGLE_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GOOGLE_API_KEY not configured in Supabase secrets");
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt,
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: "16:9",
            safetySetting: "block_some",
            personGeneration: "allow_adult",
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
    }

    const geminiResult = await geminiResponse.json();

    // Extract image from Gemini response
    const imageUrl = geminiResult.predictions?.[0]?.bytesBase64Encoded
      ? `data:image/png;base64,${geminiResult.predictions[0].bytesBase64Encoded}`
      : null;

    if (!imageUrl) {
      console.error("No image in Gemini response:", geminiResult);
      throw new Error("Image generation failed - no image in response");
    }

    // Save generated content
    const { data: content, error: saveError } = await supabase
      .from("generated_content")
      .insert({
        user_id: user.id,
        training_session_id,
        type: "infographic",
        prompt_used: prompt,
        content_payload: {
          url: imageUrl,
          topic,
          style: visual_style,
        },
        cost: 5,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({
        success: true,
        image_url: imageUrl,
        content_id: content.id,
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
