// =============================================================================
// Edge Function: refill-credits
// Description: Weekly credit regeneration (Cron Job)
// Schedule: Every Monday at 00:00 UTC
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // Verify cron secret (security)
    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer ${Deno.env.get("CRON_SECRET")}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase Admin Client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const now = new Date().toISOString();

    // Refill credits for users whose refill_at has passed
    const { data: users, error: fetchError } = await supabase
      .from("profiles")
      .select("id, subscription_tier, credits")
      .lte("credits_refill_at", now);

    if (fetchError) throw fetchError;

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to refill", count: 0 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Batch update credits
    const updates = users.map((user) => {
      const refillAmount = user.subscription_tier === "pro" ? 500 : 50;
      return supabase
        .from("profiles")
        .update({
          credits: user.credits + refillAmount,
          credits_refill_at: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // +7 days
        })
        .eq("id", user.id);
    });

    await Promise.all(updates);

    // Log transactions
    const transactions = users.map((user) => ({
      user_id: user.id,
      amount: user.subscription_tier === "pro" ? 500 : 50,
      type: "weekly_refill",
      description: "Recarga semanal automática",
    }));

    await supabase.from("transactions").insert(transactions);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Refilled ${users.length} users`,
        refilled: users.length,
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
