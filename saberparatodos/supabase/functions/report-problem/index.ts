import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type ReportBody = {
  reportType?: string;
  questionId?: string | null;
  message?: string;
  userContext?: string;
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const telegramChatIds = [
  Deno.env.get("TELEGRAM_CHAT_ID") || "",
  Deno.env.get("TELEGRAM_MODERATOR_CHAT_ID") || "",
].filter((value, index, list) => value && list.indexOf(value) === index);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function toTelegramMessage(body: Required<Pick<ReportBody, "reportType" | "message">> &
  Pick<ReportBody, "questionId" | "userContext">) {
  const headerEmoji = body.reportType.toLowerCase().includes("feedback")
    ? "💡 FEEDBACK"
    : "🚨 ERROR";

  return [
    headerEmoji,
    `Tipo: ${body.reportType}`,
    `Pregunta: ${body.questionId || "N/A"}`,
    `Contexto: ${body.userContext || "Anonimo"}`,
    "Mensaje:",
    body.message,
  ].join("\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as ReportBody;
    const reportType = String(body.reportType || "").trim();
    const message = String(body.message || "").trim();
    const questionId = body.questionId ? String(body.questionId).trim() : null;
    const userContext = body.userContext ? String(body.userContext).trim() : "";

    if (!reportType || !message) {
      return jsonResponse({ error: "reportType and message are required" }, 400);
    }

    let dbSuccess = false;
    let dbError = "";

    if (!supabaseUrl || !serviceRoleKey) {
      dbError = "Supabase service role is not configured";
    } else {
      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const { error } = await supabase.from("user_reports").insert([
        {
          report_type: reportType,
          question_id: questionId,
          message,
          user_context: userContext || null,
        },
      ]);

      if (error) {
        dbError = error.message;
        console.error("[report-problem] Database error:", error);
      } else {
        dbSuccess = true;
      }
    }

    let telegramSuccess = false;
    let telegramError = "";

    if (!telegramBotToken || telegramChatIds.length === 0) {
      telegramError = "Telegram secrets not configured in Supabase Edge";
    } else {
      try {
        const text = toTelegramMessage({
          reportType,
          questionId,
          message,
          userContext,
        });

        for (const chatId of telegramChatIds) {
          const telegramResponse = await fetch(
            `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text,
              }),
            },
          );

          const telegramResult = await telegramResponse.json().catch(() => ({}));
          telegramSuccess = !!telegramResult.ok;
          if (telegramSuccess) {
            telegramError = "";
            break;
          }

          telegramError = telegramResult.description || "Unknown Telegram error";
        }
      } catch (error) {
        telegramError = error instanceof Error ? error.message : "Unknown Telegram error";
        console.error("[report-problem] Telegram error:", error);
      }
    }

    const success = dbSuccess && telegramSuccess;
    const status = success ? 200 : dbSuccess || telegramSuccess ? 207 : 500;

    return jsonResponse(
      {
        success,
        db: dbSuccess,
        dbError: dbError || undefined,
        telegram: telegramSuccess,
        telegramError: telegramError || undefined,
      },
      status,
    );
  } catch (error) {
    console.error("[report-problem] Unexpected error:", error);
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500,
    );
  }
});
