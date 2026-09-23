import { TIPO_MENSAJE } from "../types/index.js";
// ─── ENVELOPE CREATION ─────────────────────────────────────────────────────
let contadorGlobal = 0;
function generarId() {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    const seq = (contadorGlobal++).toString(36);
    return `${ts}-${rand}-${seq}`;
}
function generarNonce() {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    return Array.from(buf)
        .map((b) => b.toString(36).padStart(2, "0"))
        .join("");
}
export function createEnvelope(tipo, origen, destino, payload, firma = null) {
    return {
        id: generarId(),
        tipo,
        origen,
        destino,
        timestamp: Date.now(),
        firma,
        payload,
        version: 1,
        nonce: generarNonce(),
    };
}
export function validateEnvelope(env) {
    if (!env.id || typeof env.id !== "string")
        return false;
    if (!env.tipo || !Object.values(TIPO_MENSAJE).includes(env.tipo))
        return false;
    if (!env.origen || typeof env.origen !== "string")
        return false;
    if (!env.destino || typeof env.destino !== "string")
        return false;
    if (typeof env.timestamp !== "number" || env.timestamp <= 0)
        return false;
    if (env.version < 1)
        return false;
    if (!env.nonce || typeof env.nonce !== "string")
        return false;
    return true;
}
/**
 * Canonical bytes used for ML-DSA sign/verify (excludes `firma`).
 * Payload is JSON-stringified; Uint8Array fields must be pre-encoded by callers.
 */
export function canonicalEnvelopeBytes(env) {
    const body = JSON.stringify({
        id: env.id,
        tipo: env.tipo,
        origen: env.origen,
        destino: env.destino,
        timestamp: env.timestamp,
        payload: env.payload,
        version: env.version,
        nonce: env.nonce,
    });
    return new TextEncoder().encode(body);
}
export async function signEnvelope(env, identity) {
    const firma = await identity.firmar(canonicalEnvelopeBytes(env));
    return { ...env, firma };
}
export async function verifyEnvelopeSignature(env, parPublico, identity) {
    if (!env.firma || env.firma.length === 0)
        return false;
    return identity.verificar(canonicalEnvelopeBytes(env), env.firma, parPublico);
}
const CONFIG_POR_DEFECTO = {
    ventanaMs: 5_000,
    maxEntradas: 10_000,
};
export class MessageDeduplicator {
    vistos;
    config;
    constructor(config = {}) {
        this.vistos = new Map();
        this.config = { ...CONFIG_POR_DEFECTO, ...config };
    }
    esDuplicado(env) {
        const ahora = Date.now();
        const clave = `${env.id}:${env.origen}`;
        const visto = this.vistos.get(clave);
        if (visto !== undefined && ahora - visto < this.config.ventanaMs) {
            return true;
        }
        this.vistos.set(clave, ahora);
        this.limpiar(ahora);
        return false;
    }
    limpiar(ahora) {
        if (this.vistos.size >= this.config.maxEntradas) {
            const limite = ahora - this.config.ventanaMs;
            for (const [clave, ts] of this.vistos) {
                if (ts < limite) {
                    this.vistos.delete(clave);
                }
            }
        }
    }
    obtenerEstadisticas() {
        return {
            total: this.vistos.size,
            ventanaMs: this.config.ventanaMs,
        };
    }
    reiniciar() {
        this.vistos.clear();
    }
}
//# sourceMappingURL=index.js.map