/**
 * OpenIcfes Telegram Bot - Edge Function
 *
 * Bot profesional para consultar preguntas del banco de preguntas ICFES
 * Usa grammY framework y validación de seguridad via secret_token
 *
 * @see https://supabase.com/docs/guides/functions/examples/telegram-bot
 * @see https://grammy.dev/
 */

import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.34.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Environment variables
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const FUNCTION_SECRET = Deno.env.get("FUNCTION_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

// Validate required env vars
if (!TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is required");
}

// Initialize bot
const bot = new Bot(TELEGRAM_BOT_TOKEN);

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// Bot Commands
// ─────────────────────────────────────────────────────────────────────────────

// /start - Mensaje de bienvenida
bot.command("start", async (ctx) => {
  const welcomeMessage = `
🎓 <b>¡Bienvenido a OpenIcfes Bot!</b>

Soy tu asistente para consultar el banco de preguntas de las pruebas Saber Colombia.

<b>📚 ¿Qué puedo hacer?</b>
• Buscar preguntas por ID
• Mostrar estadísticas del banco
• Información sobre grados y asignaturas

<b>🔍 Comandos disponibles:</b>
/help - Ver todos los comandos
/stats - Estadísticas del banco
/grados - Ver grados disponibles
/buscar [término] - Buscar preguntas

<b>💡 Tip:</b> Envía directamente un ID de pregunta (ej: <code>MAT12345-01</code>) para ver su contenido.

🌐 <a href="https://saberparatodos.vercel.app">Visita nuestra web</a>
`;
  await ctx.reply(welcomeMessage, { parse_mode: "HTML" });
});

// /help - Ayuda completa
bot.command("help", async (ctx) => {
  const helpMessage = `
📖 <b>Ayuda de OpenIcfes Bot</b>

<b>Comandos básicos:</b>
/start - Iniciar el bot
/help - Esta ayuda
/stats - Estadísticas del banco de preguntas
/grados - Lista de grados disponibles
/asignaturas - Lista de asignaturas

<b>Búsqueda de preguntas:</b>
/buscar [término] - Buscar por tema
Envía un ID directamente: <code>MAT12345-01</code>

<b>Formato de IDs:</b>
• <code>MAT</code> - Matemáticas
• <code>LEN</code> - Lenguaje
• <code>CIE</code> - Ciencias
• <code>SOC</code> - Sociales
• <code>ING</code> - Inglés
• <code>LEC</code> - Lectura Crítica

<b>Ejemplo:</b> <code>MAT12345-01</code>
• MAT = Asignatura
• 12345 = Hash único
• 01 = Versión

<b>🔗 Enlaces útiles:</b>
• <a href="https://saberparatodos.vercel.app">Web principal</a>
• <a href="https://github.com/tonderflash/saberparatodos">GitHub</a>
`;
  await ctx.reply(helpMessage, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
});

// /stats - Estadísticas del banco
bot.command("stats", async (ctx) => {
  try {
    // TODO: Implementar consulta real a Supabase cuando tengamos la tabla de preguntas
    const statsMessage = `
📊 <b>Estadísticas del Banco de Preguntas</b>

<b>Total de preguntas:</b> 58+
<b>Grados cubiertos:</b> 3°, 5°, 7°, 9°, 11°
<b>Asignaturas:</b> 9

<b>Por asignatura:</b>
📐 Matemáticas: 15+
📝 Lenguaje: 8+
🔬 Ciencias: 10+
🌎 Sociales: 8+
🇬🇧 Inglés: 10+
📚 Lectura Crítica: 7+

<i>Banco en constante crecimiento 🚀</i>
`;
    await ctx.reply(statsMessage, { parse_mode: "HTML" });
  } catch (error) {
    console.error("Error fetching stats:", error);
    await ctx.reply("❌ Error al obtener estadísticas. Intenta más tarde.");
  }
});

// /grados - Lista de grados
bot.command("grados", async (ctx) => {
  const gradosMessage = `
🎒 <b>Grados Disponibles</b>

📗 <b>Grado 3°</b> - Pruebas Saber 3
📘 <b>Grado 5°</b> - Pruebas Saber 5
📙 <b>Grado 7°</b> - Pruebas Saber 7
📕 <b>Grado 9°</b> - Pruebas Saber 9
📓 <b>Grado 11°</b> - Pruebas Saber 11 (ICFES)

<i>Cada grado tiene preguntas adaptadas a su nivel educativo según los estándares del MEN Colombia.</i>
`;
  await ctx.reply(gradosMessage, { parse_mode: "HTML" });
});

// /asignaturas - Lista de asignaturas
bot.command("asignaturas", async (ctx) => {
  const asignaturasMessage = `
📚 <b>Asignaturas Disponibles</b>

📐 <b>Matemáticas</b> (MAT)
   Álgebra, geometría, estadística

📝 <b>Lenguaje</b> (LEN)
   Comprensión lectora, gramática

🔬 <b>Ciencias Naturales</b> (CIE)
   Biología, física, química

🌎 <b>Ciencias Sociales</b> (SOC)
   Historia, geografía, civismo

🇬🇧 <b>Inglés</b> (ING)
   Reading, grammar, vocabulary

📖 <b>Lectura Crítica</b> (LEC)
   Análisis, inferencia, argumentación

🧪 <b>Física</b> (FIS) - Solo grado 11°
⚗️ <b>Química</b> (QUI) - Solo grado 11°
💭 <b>Filosofía</b> (FIL) - Solo grado 11°
`;
  await ctx.reply(asignaturasMessage, { parse_mode: "HTML" });
});

// Detector de IDs de preguntas (formato: ABC12345-01)
bot.hears(/([A-Z]{3}\d{5}-\d{2})/, async (ctx) => {
  const questionId = ctx.match[1];

  // Determinar asignatura desde el prefijo
  const prefixMap: Record<string, string> = {
    "MAT": "Matemáticas",
    "LEN": "Lenguaje",
    "CIE": "Ciencias",
    "SOC": "Sociales",
    "ING": "Inglés",
    "LEC": "Lectura Crítica",
    "FIS": "Física",
    "QUI": "Química",
    "FIL": "Filosofía",
  };

  const prefix = questionId.substring(0, 3);
  const asignatura = prefixMap[prefix] || "Desconocida";

  await ctx.reply(
    `🔍 <b>Buscando pregunta:</b> <code>${questionId}</code>\n\n` +
    `📚 <b>Asignatura:</b> ${asignatura}\n\n` +
    `<i>⏳ Esta funcionalidad estará disponible pronto cuando conectemos la base de datos de preguntas.</i>\n\n` +
    `🌐 Mientras tanto, visita: <a href="https://saberparatodos.vercel.app">saberparatodos.vercel.app</a>`,
    { parse_mode: "HTML" }
  );
});

// Mensaje genérico para texto no reconocido
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  // Si no es un comando ni un ID, dar una respuesta útil
  if (!text.startsWith("/")) {
    await ctx.reply(
      `🤔 No reconozco ese mensaje.\n\n` +
      `<b>¿Qué puedes hacer?</b>\n` +
      `• Envía un ID de pregunta: <code>MAT12345-01</code>\n` +
      `• Usa /help para ver comandos\n` +
      `• Usa /start para comenzar`,
      { parse_mode: "HTML" }
    );
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Webhook Handler con Seguridad
// ─────────────────────────────────────────────────────────────────────────────

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);

    // Verificar secret_token si está configurado
    // Telegram envía el secret en el header X-Telegram-Bot-Api-Secret-Token
    if (FUNCTION_SECRET) {
      const secretHeader = req.headers.get("X-Telegram-Bot-Api-Secret-Token");

      // También aceptar via query param para configuración inicial
      const secretParam = url.searchParams.get("secret");

      if (secretHeader !== FUNCTION_SECRET && secretParam !== FUNCTION_SECRET) {
        console.warn("Unauthorized request - invalid secret");
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Procesar update de Telegram
    return await handleUpdate(req);

  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
