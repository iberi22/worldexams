// =============================================================================
// Edge Function: generate-infographic
// Description: Generate AI-powered infographics using Replicate (Flux/SDXL)
// Cost: 5 credits
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

    const prompt = `Educational infographic explaining ${topic}.
Style: ${styleModifier}.
Include: diagrams, key concepts, visual examples.
High quality, 4K resolution, professional design.`;

    // Call Replicate API
    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${Deno.env.get("REPLICATE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "black-forest-labs/flux-schnell", // Fast model (2-3s)
        input: {
          prompt,
          num_outputs: 1,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 90,
        },
      }),
    });

    if (!replicateResponse.ok) {
      throw new Error(`Replicate API error: ${replicateResponse.statusText}`);
    }

    const prediction = await replicateResponse.json();

    // Poll for completion (Replicate is async)
    let imageUrl = null;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max

    while (!imageUrl && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s

      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Token ${Deno.env.get("REPLICATE_API_KEY")}`,
          },
        }
      );

      const status = await statusResponse.json();

      if (status.status === "succeeded") {
        imageUrl = status.output[0]; // Get first image URL
        break;
      } else if (status.status === "failed") {
        throw new Error("Image generation failed");
      }

      attempts++;
    }

    if (!imageUrl) {
      throw new Error("Image generation timeout");
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
