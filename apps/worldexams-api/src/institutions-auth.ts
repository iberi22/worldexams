// Token primitives for the institutions panel (docs/institutions/CONTRACT.md).
// Raw tokens only ever travel to the client; D1 stores their SHA-256 hash.

export const INST_TOKEN_BYTES = 32;
export const INST_LOGIN_TOKEN_TTL_S = 15 * 60;
export const INST_TEACHER_SESSION_TTL_S = 30 * 24 * 60 * 60;
export const INST_STUDENT_SESSION_TTL_S = 180 * 24 * 60 * 60;

const TOKEN_RE = /^[0-9a-f]{64}$/;

/** Random hex string of `bytes` bytes (crypto.getRandomValues, Workers-safe). */
export function randomHex(bytes: number = INST_TOKEN_BYTES): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** New opaque token (32 random bytes as 64 hex chars). */
export function newToken(): string {
  return randomHex(INST_TOKEN_BYTES);
}

/** Shape check before any hashing or D1 lookup. */
export function isTokenShape(value: unknown): value is string {
  return typeof value === "string" && TOKEN_RE.test(value);
}

export async function sha256Hex(message: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time string compare (length is not secret: both sides are fixed-size hashes). */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Bearer token from the Authorization header, or null when absent/malformed. */
export function bearerToken(request: Request): string | null {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(\S+)$/i);
  if (!match || !isTokenShape(match[1])) return null;
  return match[1];
}

// Join codes skip look-alike characters (0/O, 1/I/L).
export const JOIN_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const JOIN_CODE_LENGTH = 6;
const JOIN_CODE_RE = new RegExp(`^[${JOIN_CODE_ALPHABET}]{${JOIN_CODE_LENGTH}}$`);

/** 6-char join code drawn with rejection sampling, so every symbol is equally likely. */
export function newJoinCode(): string {
  const n = JOIN_CODE_ALPHABET.length;
  const limit = 256 - (256 % n);
  let code = "";
  const buffer = new Uint8Array(16);
  while (code.length < JOIN_CODE_LENGTH) {
    crypto.getRandomValues(buffer);
    for (const byte of buffer) {
      if (byte >= limit) continue;
      code += JOIN_CODE_ALPHABET[byte % n];
      if (code.length === JOIN_CODE_LENGTH) break;
    }
  }
  return code;
}

export function isJoinCode(value: string): boolean {
  return JOIN_CODE_RE.test(value);
}
