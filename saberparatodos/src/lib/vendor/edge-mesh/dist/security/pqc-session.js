import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";
import { canonicalBytes } from "../protocol/canonical.js";
import { bytesAHex, hexABytes } from "../protocol/utils.js";
// ─── PQC SESSION (ML-KEM-768 + AES-256-GCM) ────────────────────────────────
// Per-peer encrypted session for the SYNC path (dual-ready).
// Reference: Shelf p2p-mesh-core p2p.ts PQC_HANDSHAKE → KEM_REPLY → ACK and
// crypto-pqc.ts wrappers. Decision (owner): ML-KEM stays in the core.
export const PQC_SESSION_INFO = "edge-mesh/pqc-session/v1";
const AES_GCM_IV_BYTES = 12;
export function esPayloadCifrado(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const p = valor;
    return (p.cifrado === true &&
        p.algoritmo === "AES-256-GCM" &&
        typeof p.iv === "string" &&
        typeof p.datos === "string");
}
export class PqcSessionManager {
    deps;
    sessions = new Map();
    pendientes = new Map();
    constructor(deps) {
        this.deps = deps;
    }
    // ─── HANDSHAKE ───────────────────────────────────────────────────────
    /**
     * Deterministic initiator election: the lexicographically smaller
     * NodoId starts the handshake. Both sides call this on peer connect;
     * only the initiator actually sends PQC_HANDSHAKE.
     */
    async iniciarHandshakeSiIniciador(peerId) {
        if (this.sessions.has(peerId))
            return;
        if (this.deps.nodoId > peerId)
            return;
        await this.iniciarHandshake(peerId);
    }
    /** Force a handshake as initiator (rekey / tests). */
    async iniciarHandshake(peerId) {
        const { publicKey, secretKey } = ml_kem768.keygen();
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        this.pendientes.set(peerId, {
            secretKey,
            challenge,
            startedAt: Date.now(),
        });
        const firma = await this.deps.identity.firmar(this.handshakeSignBytes(peerId, publicKey, challenge));
        await this.deps.enviar(peerId, {
            subtipo: "handshake",
            kemPublicKey: bytesAHex(publicKey),
            challenge: bytesAHex(challenge),
            firma: bytesAHex(firma),
            dsaPublicKey: bytesAHex(this.deps.identity.exportarPublico()),
        });
    }
    handshakeSignBytes(peerId, kemPublicKey, challenge) {
        return canonicalBytes({
            tipo: "pqc-handshake",
            from: this.deps.nodoId,
            to: peerId,
            kemPublicKey: bytesAHex(kemPublicKey),
            challenge: bytesAHex(challenge),
        });
    }
    replySignBytes(peerId, cipherText, challenge) {
        return canonicalBytes({
            tipo: "pqc-kem-reply",
            from: this.deps.nodoId,
            to: peerId,
            cipherText: bytesAHex(cipherText),
            challenge: bytesAHex(challenge),
        });
    }
    ackSignBytes(peerId, challenge) {
        return canonicalBytes({
            tipo: "pqc-ack",
            from: this.deps.nodoId,
            to: peerId,
            challenge: bytesAHex(challenge),
        });
    }
    async procesarMensaje(origen, payload) {
        if (typeof payload !== "object" || payload === null)
            return;
        const subtipo = payload.subtipo;
        switch (subtipo) {
            case "handshake":
                await this.procesarHandshake(origen, payload);
                break;
            case "kem_reply":
                await this.procesarKemReply(origen, payload);
                break;
            case "ack":
                await this.procesarAck(origen, payload);
                break;
            default:
                // Unknown future subtype: ignore (graceful degradation).
                break;
        }
    }
    async procesarHandshake(origen, payload) {
        const kemPublicKey = hexABytes(payload.kemPublicKey);
        const challenge = hexABytes(payload.challenge);
        const firma = hexABytes(payload.firma);
        const dsaPublicKey = hexABytes(payload.dsaPublicKey);
        if (kemPublicKey.length === 0 ||
            challenge.length === 0 ||
            dsaPublicKey.length === 0) {
            this.deps.emitError(`PQC handshake malformado de ${origen}`);
            return;
        }
        // TOFU: register the initiator ML-DSA key, then verify the challenge.
        this.deps.registrarClavePublica(origen, dsaPublicKey);
        const firmanteOk = await this.deps.identity.verificar(canonicalBytes({
            tipo: "pqc-handshake",
            from: origen,
            to: this.deps.nodoId,
            kemPublicKey: payload.kemPublicKey,
            challenge: payload.challenge,
        }), firma, dsaPublicKey);
        if (!firmanteOk) {
            this.deps.emitError(`PQC handshake con firma invalida de ${origen}`);
            return;
        }
        const { cipherText, sharedSecret } = ml_kem768.encapsulate(kemPublicKey);
        const key = await this.derivarClaveSesion(origen, sharedSecret, challenge);
        this.sessions.set(origen, { key, establishedAt: Date.now(), ack: false });
        const firmaReply = await this.deps.identity.firmar(this.replySignBytes(origen, cipherText, challenge));
        await this.deps.enviar(origen, {
            subtipo: "kem_reply",
            cipherText: bytesAHex(cipherText),
            challenge: payload.challenge,
            firma: bytesAHex(firmaReply),
            dsaPublicKey: bytesAHex(this.deps.identity.exportarPublico()),
        });
    }
    async procesarKemReply(origen, payload) {
        const pendiente = this.pendientes.get(origen);
        if (pendiente === undefined)
            return; // unsolicited reply
        if (bytesAHex(pendiente.challenge) !== payload.challenge)
            return;
        const cipherText = hexABytes(payload.cipherText);
        const firma = hexABytes(payload.firma);
        const dsaPublicKey = hexABytes(payload.dsaPublicKey);
        if (cipherText.length === 0 || dsaPublicKey.length === 0) {
            this.deps.emitError(`PQC kem_reply malformado de ${origen}`);
            return;
        }
        this.deps.registrarClavePublica(origen, dsaPublicKey);
        const firmaOk = await this.deps.identity.verificar(canonicalBytes({
            tipo: "pqc-kem-reply",
            from: origen,
            to: this.deps.nodoId,
            cipherText: payload.cipherText,
            challenge: payload.challenge,
        }), firma, dsaPublicKey);
        if (!firmaOk) {
            this.deps.emitError(`PQC kem_reply con firma invalida de ${origen}`);
            return;
        }
        let sharedSecret;
        try {
            sharedSecret = ml_kem768.decapsulate(cipherText, pendiente.secretKey);
        }
        catch {
            this.deps.emitError(`PQC decapsulate fallo con ${origen}`);
            this.pendientes.delete(origen);
            return;
        }
        this.pendientes.delete(origen);
        const key = await this.derivarClaveSesion(origen, sharedSecret, pendiente.challenge);
        this.sessions.set(origen, {
            key,
            establishedAt: Date.now(),
            ack: true,
        });
        const firmaAck = await this.deps.identity.firmar(this.ackSignBytes(origen, pendiente.challenge));
        await this.deps.enviar(origen, {
            subtipo: "ack",
            challenge: payload.challenge,
            firma: bytesAHex(firmaAck),
        });
        this.deps.onSessionEstablished(origen);
    }
    async procesarAck(origen, payload) {
        const session = this.sessions.get(origen);
        if (session === undefined)
            return;
        const parPublico = this.deps.obtenerClavePublica(origen);
        if (parPublico === undefined)
            return;
        // The responder cannot reconstruct the initiator challenge bytes from
        // state, so it verifies against the challenge echoed in the ACK using
        // the canonical form (challenge is hex; re-derive bytes).
        const firmaOk = await this.deps.identity.verificar(canonicalBytes({
            tipo: "pqc-ack",
            from: origen,
            to: this.deps.nodoId,
            challenge: payload.challenge,
        }), hexABytes(payload.firma), parPublico);
        if (!firmaOk) {
            this.deps.emitError(`PQC ack con firma invalida de ${origen}`);
            return;
        }
        const firstEstablish = !session.ack;
        session.ack = true;
        if (firstEstablish) {
            this.deps.onSessionEstablished(origen);
        }
    }
    // ─── SESSION KEYS ────────────────────────────────────────────────────
    /**
     * HKDF-SHA256(sharedSecret, salt=challenge, info=v1|peerA|peerB) →
     * AES-256-GCM key. Both sides derive the same key because the info
     * string sorts the peer ids.
     */
    async derivarClaveSesion(peerId, sharedSecret, challenge) {
        const ikm = await crypto.subtle.importKey("raw", sharedSecret, "HKDF", false, ["deriveBits"]);
        const pareja = [this.deps.nodoId, peerId]
            .sort()
            .join("|");
        const bits = await crypto.subtle.deriveBits({
            name: "HKDF",
            hash: "SHA-256",
            salt: challenge,
            info: new TextEncoder().encode(`${PQC_SESSION_INFO}|${pareja}`),
        }, ikm, 256);
        return crypto.subtle.importKey("raw", bits, { name: "AES-GCM" }, false, [
            "encrypt",
            "decrypt",
        ]);
    }
    // ─── STATE ───────────────────────────────────────────────────────────
    hasSession(peerId) {
        return this.sessions.has(peerId);
    }
    getEstablishedPeers() {
        return Array.from(this.sessions.keys());
    }
    clearPeer(peerId) {
        this.sessions.delete(peerId);
        this.pendientes.delete(peerId);
    }
    limpiar() {
        this.sessions.clear();
        this.pendientes.clear();
    }
    // ─── PAYLOAD ENCRYPTION ──────────────────────────────────────────────
    /** Encrypt a JSON-serializable payload with the peer session key. */
    async cifrarPayload(peerId, payload) {
        const session = this.sessions.get(peerId);
        if (session === undefined)
            return null;
        const iv = new Uint8Array(AES_GCM_IV_BYTES);
        crypto.getRandomValues(iv);
        const plain = new TextEncoder().encode(JSON.stringify(payload));
        const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, session.key, plain);
        return {
            cifrado: true,
            algoritmo: "AES-256-GCM",
            iv: bytesAHex(iv),
            datos: bytesAHex(new Uint8Array(ct)),
        };
    }
    /** Decrypt an encrypted payload; null when no session or bad tag. */
    async descifrarPayload(peerId, payload) {
        const session = this.sessions.get(peerId);
        if (session === undefined)
            return null;
        try {
            const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: hexABytes(payload.iv) }, session.key, hexABytes(payload.datos));
            return JSON.parse(new TextDecoder().decode(plain));
        }
        catch {
            return null;
        }
    }
}
//# sourceMappingURL=pqc-session.js.map