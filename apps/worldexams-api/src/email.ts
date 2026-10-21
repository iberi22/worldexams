// Outbound email for the institutions panel. Production uses the Cloudflare
// Email Sending binding (`send_email` in wrangler.toml, bound as `EMAIL`).

export interface OutboundEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailSender {
  send(message: OutboundEmail): Promise<void>;
}

export interface EmailEnv {
  EMAIL?: SendEmail;
  INST_EMAIL_FROM?: string;
}

export const DEFAULT_INST_EMAIL_FROM = "no-reply@saberparatodos.space";
const FROM_NAME = "SaberParaTodos";

/** Sender backed by `env.EMAIL`, or null when the binding is not configured. */
export function createEmailSender(env: EmailEnv): EmailSender | null {
  const binding = env.EMAIL;
  if (!binding) return null;
  const from = env.INST_EMAIL_FROM || DEFAULT_INST_EMAIL_FROM;
  return {
    async send(message) {
      await binding.send({
        from: { name: FROM_NAME, email: from },
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Spanish magic-link email (HTML + plain text). */
export function buildMagicLinkEmail(to: string, link: string, ttlMinutes: number): OutboundEmail {
  const safeLink = escapeHtml(link);
  const subject = "Tu enlace para entrar a SaberParaTodos Instituciones";
  const text = [
    "Hola,",
    "",
    "Recibimos una solicitud para entrar al panel de instituciones de SaberParaTodos.",
    "Abre este enlace para iniciar sesión:",
    "",
    link,
    "",
    `El enlace funciona una sola vez y vence en ${ttlMinutes} minutos.`,
    "Si no pediste este correo, puedes ignorarlo: nadie entrará a tu cuenta sin el enlace.",
    "",
    "— Equipo SaberParaTodos",
  ].join("\n");
  const html = `<!doctype html>
<html lang="es">
<body style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;background:#f9fafb;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px">
    <h1 style="font-size:20px;margin:0 0 16px">Entra a SaberParaTodos Instituciones</h1>
    <p>Hola,</p>
    <p>Recibimos una solicitud para entrar al panel de instituciones de SaberParaTodos.</p>
    <p style="text-align:center;margin:24px 0">
      <a href="${safeLink}" style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;display:inline-block">Iniciar sesión</a>
    </p>
    <p style="font-size:13px;color:#4b5563">Si el botón no funciona, copia este enlace en tu navegador:<br><a href="${safeLink}">${safeLink}</a></p>
    <p style="font-size:13px;color:#4b5563">El enlace funciona una sola vez y vence en ${ttlMinutes} minutos.
    Si no pediste este correo, puedes ignorarlo: nadie entrará a tu cuenta sin el enlace.</p>
    <p>— Equipo SaberParaTodos</p>
  </div>
</body>
</html>`;
  return { to, subject, html, text };
}
