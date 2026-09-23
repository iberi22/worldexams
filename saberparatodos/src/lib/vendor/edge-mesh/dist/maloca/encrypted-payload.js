import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { x25519 } from "@noble/curves/ed25519";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const NONCE_LEN = 24;
const KEY_LEN = 32;
// ─── HKDF-SHA256 ───────────────────────────────────────────────────────────
async function hkdfDeriveKey(sharedSecret, salt, info) {
    // Web Crypto requires ArrayBuffer (not Uint8Array<ArrayBufferLike>)
    const toBuf = (u) => u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength);
    // HKDF-Extract: HMAC-SHA256(salt, sharedSecret)
    const extractKey = await crypto.subtle.importKey("raw", toBuf(salt), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const prk = new Uint8Array(await crypto.subtle.sign("HMAC", extractKey, toBuf(sharedSecret)));
    // HKDF-Expand: 1 block => 32 bytes
    const expandKey = await crypto.subtle.importKey("raw", toBuf(prk), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const infoBytes = new TextEncoder().encode(info);
    const counter = new Uint8Array([1]);
    const combined = new Uint8Array(infoBytes.length + counter.length);
    combined.set(infoBytes);
    combined.set(counter, infoBytes.length);
    const output = new Uint8Array(await crypto.subtle.sign("HMAC", expandKey, toBuf(combined)));
    return output.slice(0, KEY_LEN);
}
// ─── ENCRYPT ───────────────────────────────────────────────────────────────
/**
 * Cifra el body de un ticket con XChaCha20-Poly1305 usando una clave derivada
 * vía X25519 ECDH + HKDF.
 *
 * @param body  - Texto plano a cifrar
 * @param recipientPubKey - Clave pública X25519 del destinatario
 * @returns EncryptedPayload listo para transportar (ciphertext + nonce + ephemeralPubKey)
 */
export async function encrypt(body, recipientPubKey) {
    // 1. Par efímero X25519 (uno por ticket)
    const ephemeralPriv = x25519.utils.randomPrivateKey();
    const ephemeralPub = x25519.getPublicKey(ephemeralPriv);
    // 2. ECDH: shared = x25519(ephemeralPriv, recipientPubKey)
    const sharedSecret = x25519.getSharedSecret(ephemeralPriv, recipientPubKey);
    // 3. HKDF derive symmetric key (nonce contribuye al salt)
    const nonce = randomBytes(NONCE_LEN);
    const salt = nonce.slice(0, 16);
    const aesKey = await hkdfDeriveKey(sharedSecret, salt, "swal-support-encrypt");
    // 4. Cifrar con XChaCha20-Poly1305 (AEAD)
    const aead = xchacha20poly1305(aesKey, nonce);
    const plaintextBytes = new TextEncoder().encode(body);
    const ciphertext = aead.encrypt(plaintextBytes);
    return {
        ciphertext,
        nonce,
        ephemeralPubKey: ephemeralPub,
        algorithm: "XCHACHA20-POLY1305-X25519",
    };
}
// ─── DECRYPT ───────────────────────────────────────────────────────────────
/**
 * Descifra un EncryptedPayload usando la clave privada X25519 del destinatario
 * y la clave pública efímera del emisor.
 *
 * @param payload - El payload cifrado (incluye ephemeralPubKey del emisor)
 * @param privKey - Clave privada X25519 del destinatario
 * @returns Texto plano (body del ticket)
 */
export async function decrypt(payload, privKey) {
    // 1. ECDH: shared = x25519(privKey, ephemeralPubKey)
    const sharedSecret = x25519.getSharedSecret(privKey, payload.ephemeralPubKey);
    // 2. HKDF derive symmetric key (mismo salt: primeros 16 del nonce)
    const salt = payload.nonce.slice(0, 16);
    const aesKey = await hkdfDeriveKey(sharedSecret, salt, "swal-support-encrypt");
    // 3. Descifrar con XChaCha20-Poly1305
    try {
        const aead = xchacha20poly1305(aesKey, payload.nonce);
        const plaintextBytes = aead.decrypt(payload.ciphertext);
        return new TextDecoder().decode(plaintextBytes);
    }
    catch (err) {
        throw new Error(`Decryption failed: ${err instanceof Error ? err.message : String(err)}`);
    }
}
//# sourceMappingURL=encrypted-payload.js.map