/**
 * EncryptedPayload: Arma con ciphertext, nonce, clave pública efímera y tag.
 * El cuerpo del ticket viaja SIEMPRE cifrado, nunca por gossip sin cifrar.
 */
export interface EncryptedPayload {
    readonly ciphertext: Uint8Array;
    readonly nonce: Uint8Array;
    readonly ephemeralPubKey: Uint8Array;
    readonly algorithm: "XCHACHA20-POLY1305-X25519";
}
/**
 * Cifra el body de un ticket con XChaCha20-Poly1305 usando una clave derivada
 * vía X25519 ECDH + HKDF.
 *
 * @param body  - Texto plano a cifrar
 * @param recipientPubKey - Clave pública X25519 del destinatario
 * @returns EncryptedPayload listo para transportar (ciphertext + nonce + ephemeralPubKey)
 */
export declare function encrypt(body: string, recipientPubKey: Uint8Array): Promise<EncryptedPayload>;
/**
 * Descifra un EncryptedPayload usando la clave privada X25519 del destinatario
 * y la clave pública efímera del emisor.
 *
 * @param payload - El payload cifrado (incluye ephemeralPubKey del emisor)
 * @param privKey - Clave privada X25519 del destinatario
 * @returns Texto plano (body del ticket)
 */
export declare function decrypt(payload: EncryptedPayload, privKey: Uint8Array): Promise<string>;
//# sourceMappingURL=encrypted-payload.d.ts.map