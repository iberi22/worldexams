import { Bot, webhookCallback, InlineKeyboard } from "https://deno.land/x/grammy@v1.34.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { getTutorResponse } from "../_shared/deepseek.ts";

// Environment variables
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") || "";
const LINK_TELEGRAM_URL = Deno.env.get("LINK_TELEGRAM_URL") || "https://saberparatodos.co/vincular-telegram";
const REPORT_BASE_URL = Deno.env.get("REPORT_BASE_URL") || "https://saberparatodos.co/informes/bot/";

if (!TELEGRAM_BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is required");
if (!SUPABASE_URL) throw new Error("SUPABASE_URL is required");
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for bot practice sessions");

// Initialize bot
const bot = new Bot(TELEGRAM_BOT_TOKEN);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type PracticeSessionRow = {
  id: string;
  user_id: string | null;
  telegram_id: number;
  country_code: string;
  exam_type: string;
  subject: string;
  questions: Array<{
    id: string;
    enunciado: string;
    opciones: Array<{ text: string; correct?: boolean; isCorrect?: boolean }>;
    asignatura: string;
    explicacion?: string;
  }>;
  answers: Array<{ question_id: string; selected_index: number; is_correct: boolean; answered_at: string }>;
  completed_at: string | null;
  share_token: string;
};

type CommentModerationPayload = {
  id: string | number;
  content: string;
  user_name: string;
  question_id: string;
};

type TelegramModerationCallback = {
  id: string;
  data?: string;
  message?: {
    message_id?: number;
    text?: string;
    chat?: {
      id?: number;
    };
  };
};

const PRACTICE_EXAM_TYPES = [
  { id: "saber11", label: "ICFES Saber 11" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "simulacro", label: "Simulacro" },
];

const PRACTICE_SUBJECTS = [
  { id: "Matemáticas", label: "Matemáticas" },
  { id: "Lectura Crítica", label: "Lectura Crítica" },
  { id: "Ciencias Naturales", label: "Ciencias Naturales" },
  { id: "Sociales", label: "Sociales" },
  { id: "Inglés", label: "Inglés" },
];

function mapSubjectToApiFolder(subjectId: string): string {
  switch (subjectId) {
    case "Matemáticas":
      return "matematicas";
    case "Lectura Crítica":
      return "lectura_critica";
    case "Ciencias Naturales":
      return "ciencias_naturales";
    case "Sociales":
      return "sociales_y_ciudadanas";
    case "Inglés":
      return "ingles";
    default:
      return "matematicas";
  }
}

async function fetchPracticeQuestionsFromApi(subjectId: string, limit: number) {
  const apiSubject = mapSubjectToApiFolder(subjectId);
  const origin = new URL(REPORT_BASE_URL).origin;
  const url = `${origin}/api/CO/icfes/11/${apiSubject}/1.json?t=${Date.now()}`;

  const resp = await fetch(url, { cache: "no-cache" });
  if (!resp.ok) return [];

  const data = await resp.json().catch(() => null);
  const raw = (data?.questions || []) as any[];

  const normalized = raw
    .filter((q) => q && q.statement && Array.isArray(q.options))
    .slice(0, Math.max(1, Math.min(limit, 10)))
    .map((q) => ({
      id: String(q.id || q.bundle_id || crypto.randomUUID()),
      enunciado: String(q.statement),
      opciones: (q.options as any[]).map((o) => ({
        text: String(o.text),
        correct: !!o.is_correct,
      })),
      asignatura: subjectId,
      explicacion: q.explanation ? String(q.explanation) : undefined,
    }));

  return normalized;
}

function buildExamTypeKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  for (const t of PRACTICE_EXAM_TYPES) {
    kb.text(t.label, `prcfg:type:${t.id}`).row();
  }
  return kb;
}

function buildSubjectKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  for (const s of PRACTICE_SUBJECTS) {
    kb.text(s.label, `prcfg:sub:${encodeURIComponent(s.id)}`).row();
  }
  return kb;
}

async function getActivePracticeSession(userId: string): Promise<PracticeSessionRow | null> {
  const { data, error } = await supabaseAdmin
    .from("bot_practice_sessions")
    .select("id,user_id,telegram_id,country_code,exam_type,subject,questions,answers,completed_at,share_token")
    .eq("user_id", userId)
    .is("completed_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return (data as any) || null;
}

async function getActiveGuestSession(telegramId: number): Promise<PracticeSessionRow | null> {
  const { data, error } = await supabaseAdmin
    .from("bot_practice_sessions")
    .select("id,user_id,telegram_id,country_code,exam_type,subject,questions,answers,completed_at,share_token")
    .is("user_id", null)
    .eq("telegram_id", telegramId)
    .is("completed_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return (data as any) || null;
}

async function loadSessionById(sessionId: string): Promise<PracticeSessionRow | null> {
  const { data, error } = await supabaseAdmin
    .from("bot_practice_sessions")
    .select("id,user_id,telegram_id,country_code,exam_type,subject,questions,answers,completed_at,share_token")
    .eq("id", sessionId)
    .maybeSingle();

  if (error) return null;
  return (data as any) || null;
}

async function sendPracticeQuestion(ctx: any, session: PracticeSessionRow, questionIndex: number) {
  const question = (session.questions || [])[questionIndex];
  if (!question) return;

  const options = (question as any).opciones as any[];
  const keyboard = new InlineKeyboard();
  options.forEach((opt: any, idx: number) => {
    keyboard.text(`${String.fromCharCode(65 + idx)}) ${opt.text}`, `prans:${session.id}:${questionIndex}:${idx}`).row();
  });

  await ctx.reply(
    `📚 <b>${session.subject}</b> · <b>${session.exam_type}</b>\n` +
      `Pregunta ${questionIndex + 1} de ${(session.questions || []).length}\n\n` +
      `${(question as any).enunciado}`,
    { reply_markup: keyboard, parse_mode: "HTML" },
  );
}

async function sendCommentModerationMessage(comment: CommentModerationPayload) {
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
  if (!chatId) {
    console.warn("TELEGRAM_CHAT_ID is required for comment moderation notifications");
    return new Response("missing chat", { status: 500 });
  }

  const text =
    `📝 <b>Nuevo Comentario para Moderar</b>\n\n` +
    `👤 <b>Usuario:</b> ${comment.user_name}\n` +
    `❓ <b>Pregunta ID:</b> ${comment.question_id}\n` +
    `💬 <b>Comentario:</b>\n<i>${comment.content}</i>`;

  const keyboard = new InlineKeyboard()
    .text("✅ Aprobar", `mod:app:${comment.id}`)
    .text("❌ Rechazar", `mod:rej:${comment.id}`);

  await bot.api.sendMessage(chatId, text, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function handleCommentModerationCallback(ctx: any, action: string, commentId: string) {
  if (action === "app") {
    const { error } = await supabaseAdmin
      .from("question_comments")
      .update({ is_approved: true })
      .eq("id", commentId);

    if (error) throw error;

    try {
      await ctx.answerCallbackQuery({ text: "✅ Comentario aprobado" });
      if (ctx.callbackQuery.message?.chat?.id && ctx.callbackQuery.message?.message_id) {
        await bot.api.editMessageText(
          ctx.callbackQuery.message.chat.id,
          ctx.callbackQuery.message.message_id,
          `✅ <b>Comentario Aprobado</b>\n\n${ctx.callbackQuery.message.text || ""}`,
          {
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: [] },
          },
        );
      }
    } catch (telegramError) {
      console.error("Telegram callback response failed after approval", telegramError);
    }
    return;
  }

  if (action === "rej") {
    const { error } = await supabaseAdmin
      .from("question_comments")
      .delete()
      .eq("id", commentId);

    if (error) throw error;

    try {
      await ctx.answerCallbackQuery({ text: "❌ Comentario rechazado" });
      if (ctx.callbackQuery.message?.chat?.id && ctx.callbackQuery.message?.message_id) {
        await bot.api.editMessageText(
          ctx.callbackQuery.message.chat.id,
          ctx.callbackQuery.message.message_id,
          `❌ <b>Comentario Rechazado/Eliminado</b>\n\n${ctx.callbackQuery.message.text || ""}`,
          {
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: [] },
          },
        );
      }
    } catch (telegramError) {
      console.error("Telegram callback response failed after rejection", telegramError);
    }
    return;
  }

  await ctx.answerCallbackQuery({ text: "Acción inválida" });
}

async function handleCommentModerationWebhook(callbackQuery: TelegramModerationCallback) {
  const data = callbackQuery.data || "";
  const [_prefix, action, commentId] = data.split(":");

  if (action === "app") {
    const { error } = await supabaseAdmin
      .from("question_comments")
      .update({ is_approved: true })
      .eq("id", commentId);

    if (error) throw error;

    try {
      await bot.api.answerCallbackQuery(callbackQuery.id, { text: "✅ Comentario aprobado" });
      if (callbackQuery.message?.chat?.id && callbackQuery.message?.message_id) {
        await bot.api.editMessageText(
          callbackQuery.message.chat.id,
          callbackQuery.message.message_id,
          `✅ <b>Comentario Aprobado</b>\n\n${callbackQuery.message.text || ""}`,
          {
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: [] },
          },
        );
      }
    } catch (telegramError) {
      console.error("Telegram webhook response failed after approval", telegramError);
    }

    return new Response("OK");
  }

  if (action === "rej") {
    const { error } = await supabaseAdmin
      .from("question_comments")
      .delete()
      .eq("id", commentId);

    if (error) throw error;

    try {
      await bot.api.answerCallbackQuery(callbackQuery.id, { text: "❌ Comentario rechazado" });
      if (callbackQuery.message?.chat?.id && callbackQuery.message?.message_id) {
        await bot.api.editMessageText(
          callbackQuery.message.chat.id,
          callbackQuery.message.message_id,
          `❌ <b>Comentario Rechazado/Eliminado</b>\n\n${callbackQuery.message.text || ""}`,
          {
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: [] },
          },
        );
      }
    } catch (telegramError) {
      console.error("Telegram webhook response failed after rejection", telegramError);
    }

    return new Response("OK");
  }

  try {
    await bot.api.answerCallbackQuery(callbackQuery.id, { text: "Acción inválida" });
  } catch (telegramError) {
    console.error("Telegram webhook response failed for invalid moderation action", telegramError);
  }

  return new Response("OK");
}

// ─────────────────────────────────────────────────────────────────────────────
// Middleware: Auth & Context
// ─────────────────────────────────────────────────────────────────────────────

// Attach user profile to context
bot.use(async (ctx, next) => {
  if (!ctx.from) return next();

  // Try to find user by telegram_id
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, credits, subscription_tier')
    .eq('telegram_id', ctx.from.id)
    .single();

  ctx.session = { profile }; // Simple session-like storage in context
  await next();
});

// ─────────────────────────────────────────────────────────────────────────────
// Commands
// ─────────────────────────────────────────────────────────────────────────────

bot.command("start", async (ctx) => {
  const args = ctx.match; // Get arguments after /start

  if (args && args.length > 0) {
    // Linking Account
    const code = String(args).trim();
    if (!code) {
      return ctx.reply("❌ <b>Código inválido.</b>", { parse_mode: "HTML" });
    }

    const { data: linkCode, error } = await supabaseAdmin
      .from('bot_linking_codes')
      .select('user_id')
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !linkCode) {
      return ctx.reply("❌ <b>Código inválido o expirado.</b>\nGenera uno nuevo en tu dashboard web.", { parse_mode: "HTML" });
    }

    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ telegram_id: ctx.from?.id })
      .eq('id', linkCode.user_id);

    if (updateError) {
      return ctx.reply("❌ Error al vincular la cuenta.");
    }

    // Delete used code
    await supabaseAdmin.from('bot_linking_codes').delete().eq('code', code);

    return ctx.reply("✅ <b>¡Cuenta vinculada con éxito!</b>\nAhora puedes usar tus créditos del sitio web aquí.", { parse_mode: "HTML" });
  }

  // Welcome Message
  await ctx.reply(
    `👋 <b>¡Hola parcero! Soy SaberBot.</b>\n\n` +
    `Estoy aquí para ayudarte a estudiar para el ICFES Saber 11.\n\n` +
    `🚀 <b>Comandos:</b>\n` +
    `/practicar - Práctica guiada (5 preguntas aleatorias)\n` +
    `/perfil - Mira tus créditos y racha\n` +
    `/ayuda - Información sobre mí\n\n` +
    `💡 <b>Tip:</b> Puedes practicar gratis sin límites. Para guardar tu progreso y ver análisis completo, vincula tu cuenta: genera un código y envía <code>/start CODIGO</code>.\n` +
    `👉 ${LINK_TELEGRAM_URL}`,
    { parse_mode: "HTML" }
  );
});

bot.command("perfil", async (ctx) => {
  const profile = ctx.session?.profile;
  if (!profile) {
    return ctx.reply("⚠️ <b>Cuenta no vinculada.</b>\nUsa <code>/start CODIGO</code> para vincular.", { parse_mode: "HTML" });
  }

  await ctx.reply(
    `👤 <b>Tu Perfil</b>\n\n` +
    `💰 Créditos: <b>${profile.credits}</b>\n` +
    `🏆 Plan: <b>${profile.subscription_tier || 'Free'}</b>`,
    { parse_mode: "HTML" }
  );
});

bot.command("practicar", async (ctx) => {
  const profile = ctx.session?.profile;
  const telegramId = ctx.from?.id;
  if (!telegramId) return;

  // Guest flow: unlimited free 5-question sessions
  if (!profile) {
    const activeGuest = await getActiveGuestSession(telegramId);
    if (activeGuest) {
      const answered = (activeGuest.answers || []).length;
      if (answered < (activeGuest.questions || []).length) {
        await ctx.reply(`🔁 Retomando tu práctica: Pregunta ${answered + 1} de ${(activeGuest.questions || []).length}.`);
        return await sendPracticeQuestion(ctx, activeGuest, answered);
      }
    }

    await ctx.reply(
      "🧪 <b>Práctica gratis (5 preguntas aleatorias)</b>\n\nElige el tipo de prueba:",
      { parse_mode: "HTML", reply_markup: buildExamTypeKeyboard() },
    );
    return;
  }

  // If there is an active session, continue where it left off
  const active = await getActivePracticeSession(profile.id);
  if (active) {
    const answered = (active.answers || []).length;
    if (answered < (active.questions || []).length) {
      await ctx.reply(`🔁 Retomando tu práctica: Pregunta ${answered + 1} de ${(active.questions || []).length}.`);
      return await sendPracticeQuestion(ctx, active, answered);
    }
  }

  // Start config flow
  await ctx.reply(
    "🧪 <b>Vamos a practicar (5 preguntas)</b>\n\nElige el tipo de prueba:",
    { parse_mode: "HTML", reply_markup: buildExamTypeKeyboard() },
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Callbacks (Button Clicks)
// ─────────────────────────────────────────────────────────────────────────────

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data.startsWith("mod:")) {
    const [_prefix, action, commentId] = data.split(":");
    try {
      await handleCommentModerationCallback(ctx, action, commentId);
    } catch (error) {
      console.error("Comment moderation callback failed", error);
      await ctx.answerCallbackQuery({ text: "Error moderando comentario" });
    }
    return;
  }

  // Practice config callbacks
  if (data.startsWith("prcfg:")) {
    const profile = ctx.session?.profile;
    const telegramId = ctx.from?.id;
    if (!telegramId) {
      await ctx.answerCallbackQuery();
      return;
    }

    const parts = data.split(":");
    const kind = parts[1];
    const value = parts.slice(2).join(":");

    // Store temp config on a lightweight row in DB? We'll create session only after subject.
    // We'll stash chosen exam_type in message via an ephemeral session row keyed by user + telegram.
    // For simplicity: store exam_type in a dedicated active session row with empty questions until subject is chosen.

    if (kind === "type") {
      const examTypeId = value;
      const examTypeLabel = PRACTICE_EXAM_TYPES.find((t) => t.id === examTypeId)?.label || "ICFES Saber 11";

      // Upsert a draft session (no questions yet)
      const { data: draft } = await supabaseAdmin
        .from("bot_practice_sessions")
        .insert({
          user_id: profile?.id ?? null,
          telegram_id: telegramId,
          country_code: "CO",
          exam_type: examTypeLabel,
          subject: "",
          questions: [],
          answers: [],
        })
        .select("id")
        .single();

      await ctx.answerCallbackQuery();
      await ctx.reply("📚 Ahora elige la materia:", { reply_markup: buildSubjectKeyboard() });
      // Keep draft session id in callback? Not available. We'll just rely on latest active (subject empty).
      return;
    }

    if (kind === "sub") {
      const subject = decodeURIComponent(value);

      // Find latest draft session (subject empty)
      const { data: draft } = await supabaseAdmin
        .from("bot_practice_sessions")
        .select("id, exam_type")
        .eq("telegram_id", telegramId)
        .eq("subject", "")
        .is("completed_at", null)
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!draft) {
        await ctx.answerCallbackQuery();
        await ctx.reply("⚠️ Empecemos de nuevo: escribe /practicar");
        return;
      }

      const qs = await fetchPracticeQuestionsFromApi(subject, 5);
      if (!qs || qs.length === 0) {
        await ctx.answerCallbackQuery();
        await ctx.reply("⚠️ No encontré preguntas para esa materia. Prueba otra.");
        return;
      }

      // Update draft session to real session
      const { data: updated, error: updErr } = await supabaseAdmin
        .from("bot_practice_sessions")
        .update({ subject, questions: qs })
        .eq("id", (draft as any).id)
        .select("id,user_id,telegram_id,country_code,exam_type,subject,questions,answers,completed_at,share_token")
        .single();

      if (updErr || !updated) {
        await ctx.answerCallbackQuery();
        await ctx.reply("⚠️ No pude iniciar la práctica. Intenta /practicar de nuevo.");
        return;
      }

      // Note: practice is free. Credits are intended for AI/tutor features.

      await ctx.answerCallbackQuery();
      await ctx.reply(
        `✅ Listo. Empezamos ahora.\n` +
          `Tip: al final te doy un enlace con el informe completo en la plataforma.`,
      );
      return await sendPracticeQuestion(ctx, updated as any, 0);
    }

    await ctx.answerCallbackQuery();
    return;
  }

  if (data.startsWith("prans:")) {
    const profile = ctx.session?.profile;
    const telegramId = ctx.from?.id;
    if (!telegramId) {
      await ctx.answerCallbackQuery();
      return;
    }

    const [_tag, sessionId, qIndexStr, optIdxStr] = data.split(":");
    const questionIndex = parseInt(qIndexStr, 10);
    const optionIndex = parseInt(optIdxStr, 10);

    const session = await loadSessionById(sessionId);
    const isOwner = profile ? session?.user_id === profile.id : session?.telegram_id === telegramId;
    if (!session || !isOwner) {
      await ctx.answerCallbackQuery();
      return;
    }

    // Prevent double answers
    const qId = String(((session.questions || [])[questionIndex] as any)?.id || "");
    const existing = (session.answers || []).find((a) => a.question_id === qId);
    if (existing) {
      await ctx.answerCallbackQuery("Ya respondiste esta pregunta");
      return;
    }

    const question = (session.questions || [])[questionIndex];
    const options = (question as any)?.opciones as any[];
    const selected = options?.[optionIndex];
    const isCorrect = !!(selected?.correct || selected?.isCorrect);

    const newAnswer = {
      question_id: qId,
      selected_index: optionIndex,
      is_correct: isCorrect,
      answered_at: new Date().toISOString(),
    };

    const updatedAnswers = [...(session.answers || []), newAnswer];

    const done = updatedAnswers.length >= (session.questions || []).length;
    const { data: updated } = await supabaseAdmin
      .from("bot_practice_sessions")
      .update({ answers: updatedAnswers, completed_at: done ? new Date().toISOString() : null })
      .eq("id", session.id)
      .select("id,user_id,telegram_id,country_code,exam_type,subject,questions,answers,completed_at,share_token")
      .single();

    await ctx.answerCallbackQuery();

    if (isCorrect) {
      await ctx.reply(
        `✅ <b>Correcto</b>\n` +
          `Resumen rápido aquí; el detalle completo queda en el informe final.`,
        { parse_mode: "HTML" },
      );
    } else {
      await ctx.reply(
        `❌ <b>Incorrecto</b>\n` +
          `No pasa nada: mira el informe al final para ver el detalle y mejorar.`,
        { parse_mode: "HTML" },
      );
    }

    const reportUrl = `${REPORT_BASE_URL}${(updated as any).share_token}`;
    await ctx.reply(
      `🏁 <b>¡Terminaste tus 5 preguntas!</b>\n\n` +
        `📊 Mira tu informe detallado aquí (incluye publicidad):\n` +
        `${reportUrl}\n\n` +
        `🚀 Para practicar más y prepararte mejor para tus próximos exámenes, crea/vincula tu cuenta en la plataforma:\n` +
        `${LINK_TELEGRAM_URL}`,
      { parse_mode: "HTML" },
    );
    return;
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// FAQ & Predefined Responses
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_RESPONSES: Record<string, string> = {
  "que es esto": "SaberBot es tu tutor virtual para prepararte para el ICFES Saber 11. Puedo ayudarte con preguntas de práctica y resolver dudas. 📚",
  "como funciona": "Puedes practicar con preguntas reales del ICFES, ver explicaciones detalladas y hablar conmigo para resolver dudas. Primero debes crear una cuenta gratuita.",
  "gratis": "Sí, el servicio es gratuito. Solo necesitas registrarte en la web para acceder a todas las funciones. 🎓",
  "precio": "Es completamente gratis. Sin costos, sin trampas. Solo queremos ayudarte a pasar el ICFES.",
  "ayuda": "Usa /start para comenzar, /practicar para responder preguntas y /perfil para ver tus créditos. Pero primero, regístrate en la web! 😉"
};

function getFAQResponse(text: string): string | null {
  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerText.includes(keyword)) {
      return response;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Chat (Fallback)
// ─────────────────────────────────────────────────────────────────────────────

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  const profile = ctx.session?.profile;

  // If user is NOT linked, respond with predefined messages
  if (!profile) {
    const faqResponse = getFAQResponse(text);

    if (faqResponse) {
      await ctx.reply(faqResponse);
    } else {
      await ctx.reply(
        `⚠️ <b>Para usar el tutor IA, necesitas crear una cuenta.</b>\n\n` +
        `🎓 Con tu cuenta puedes:\n` +
        `• Hablar con SaberBot sin límites\n` +
        `• Practicar con miles de preguntas\n` +
        `• Ver tu progreso y estadísticas\n\n` +
        `👉 <a href="${LINK_TELEGRAM_URL}">Vincula tu cuenta aquí</a> (genera un código y vuelve)\n\n` +
        `Luego envíame <code>/start CODIGO</code> y quedará vinculado. 🚀`,
        { parse_mode: "HTML" }
      );
    }
    return;
  }

  // User is linked - use AI (consume credits)
  await ctx.replyWithChatAction("typing");

  const context = `Usuario vinculado. Créditos: ${profile.credits}.`;
  const response = await getTutorResponse(text, DEEPSEEK_API_KEY, context);
  await ctx.reply(response || "Lo siento, me quedé sin palabras.");
});

// ─────────────────────────────────────────────────────────────────────────────
// Server Entrypoint
// ─────────────────────────────────────────────────────────────────────────────

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const expectedSecret = Deno.env.get("FUNCTION_SECRET") || "";
    const querySecret = url.searchParams.get("secret");
    const headerSecret = req.headers.get("x-telegram-bot-api-secret-token");
    const isAuthorized = (querySecret && querySecret === expectedSecret) || (headerSecret && headerSecret === expectedSecret);

    if (!isAuthorized) {
      return new Response("not allowed", { status: 405 });
    }

    const clonedReq = req.clone();
    const body = await clonedReq.json().catch(() => null);
    if (body?.type === "comment_moderation" && body?.comment) {
      return await sendCommentModerationMessage(body.comment as CommentModerationPayload);
    }
    if (body?.callback_query?.data?.startsWith?.("mod:")) {
      return await handleCommentModerationWebhook(body.callback_query as TelegramModerationCallback);
    }

    return await handleUpdate(req);
  } catch (err) {
    console.error(err);
    return new Response();
  }
});
