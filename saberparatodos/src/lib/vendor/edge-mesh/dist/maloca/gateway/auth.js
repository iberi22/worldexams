import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { TokenBucketRateLimiter } from "../../security/rate-limiter.js";
/**
 * SSO Centralizado con identidad PQC + JWT
 */
// Helpers cross-platform (no Buffer/Node.js)
function bytesToHex(bytes) {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
function base64url(bytes) {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
function base64urlDecode(str) {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/") +
        "=".repeat((4 - (str.length % 4)) % 4);
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
// HMAC-SHA256 via Web Crypto API
async function hmacSha256(secret, data) {
    const subtle = crypto.subtle;
    const key = await subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = await subtle.sign("HMAC", key, data);
    return new Uint8Array(sig);
}
// Secreto para JWT
const JWT_SECRET = new TextEncoder().encode("maloca-gateway-default-secret-change-me");
export const authRateLimiter = new TokenBucketRateLimiter({
    tokensPerInterval: 3,
    intervalMs: 1000,
    maxTokens: 5,
});
/** Deriva un profileId corto desde una clave pública PQC */
function deriveProfileId(publicKey) {
    return bytesToHex(publicKey).slice(0, 16);
}
/**
 * Autenticación vía firma PQC.
 */
export async function loginWithPQC(firma, publicKey, challenge = new TextEncoder().encode("maloca-login-challenge"), clientIp = "127.0.0.1") {
    if (!authRateLimiter.consume(clientIp)) {
        console.warn(`Rate limit exceeded for IP: ${clientIp} on Auth login`);
        throw new Error("Rate limit exceeded: 429");
    }
    try {
        const isValid = ml_dsa65.verify(firma, challenge, publicKey);
        if (isValid) {
            const profileId = deriveProfileId(publicKey);
            return generateJWT(profileId);
        }
    }
    catch (error) {
        console.error("PQC Auth Error:", error);
    }
    return null;
}
/**
 * Genera un JWT para sesión externa usando HMAC-SHA256.
 */
export async function generateJWT(profileId) {
    const headerEncoded = base64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
    const payloadEncoded = base64url(new TextEncoder().encode(JSON.stringify({
        sub: profileId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
    })));
    const hmacResult = await hmacSha256(JWT_SECRET, new TextEncoder().encode(`${headerEncoded}.${payloadEncoded}`));
    const signatureEncoded = base64url(hmacResult);
    return `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;
}
/**
 * Verifica un JWT usando HMAC-SHA256.
 */
export async function verifyToken(token) {
    try {
        const parts = token.split(".");
        if (parts.length !== 3)
            return false;
        const [header, payload, signature] = parts;
        const hmacResult = await hmacSha256(JWT_SECRET, new TextEncoder().encode(`${header}.${payload}`));
        const expectedSignature = base64url(hmacResult);
        if (signature !== expectedSignature)
            return false;
        // Verificar expiración
        const decodedPayload = JSON.parse(new TextDecoder().decode(base64urlDecode(payload)));
        if (decodedPayload.exp &&
            decodedPayload.exp < Math.floor(Date.now() / 1000)) {
            return false;
        }
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Obtiene el perfil desde el token.
 */
export async function getProfileFromToken(token) {
    try {
        if (!(await verifyToken(token)))
            return null;
        const parts = token.split(".");
        const decodedPayload = JSON.parse(new TextDecoder().decode(base64urlDecode(parts[1])));
        return decodedPayload.sub;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=auth.js.map