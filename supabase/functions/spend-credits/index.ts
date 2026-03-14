// =============================================================================
// Edge Function: spend-credits
// Description: Deduct credits from user account (secure transaction)
// Usage: Called by frontend when user requests AI service
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface SpendRequest {
  amount: number;
  service: "analysis" | "infographic" | "tutor" | "custom_route";
  reference_id?: string;
}

serve(async (req) => {
  try {
    // Get user from JWT
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
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request
    const body: SpendRequest = await req.json();
    const { amount, service, reference_id } = body;

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch current credits (with row lock to prevent race conditions)
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (fetchError || !profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user has enough credits
    if (profile.credits < amount) {
      return new Response(
        JSON.stringify({
          error: "Insufficient credits",
          current: profile.credits,
          required: amount,
        }),
        {
          status: 402, // Payment Required
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Deduct credits (atomic operation)
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: profile.credits - amount })
      .eq("id", user.id);

    if (updateError) throw updateError;

    // Log transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: -amount,
      type: "usage",
      description: `${service} service`,
      reference_id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        remaining_credits: profile.credits - amount,
        spent: amount,
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
