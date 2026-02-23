import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const payload = await req.json().catch(() => ({}));

    const organizationId = String(payload.organization_id ?? "").trim();
    const name = String(payload.name ?? "").trim();
    const grade = payload.grade ? String(payload.grade).trim() : null;
    const section = payload.section ? String(payload.section).trim() : null;

    if (!organizationId || !name) {
      return jsonResponse(
        { error: "organization_id and name are required" },
        400,
      );
    }

    if (name.length > 100) {
      return jsonResponse({ error: "name is too long" }, 400);
    }

    // Explicit role check to guarantee only org admins/owners can create groups.
    const { data: membership, error: membershipError } = await supabase
      .from("organization_members")
      .select("role")
      .eq("organization_id", organizationId)
      .in("role", ["owner", "admin"])
      .limit(1);

    if (membershipError) {
      return jsonResponse({ error: membershipError.message }, 403);
    }

    if (!membership || membership.length === 0) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const { data, error } = await supabase
      .from("organization_groups")
      .insert({
        organization_id: organizationId,
        name,
        grade,
        section,
      })
      .select()
      .single();

    if (error) {
      return jsonResponse({ error: error.message }, 500);
    }

    return jsonResponse({ success: true, group: data });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500,
    );
  }
});
