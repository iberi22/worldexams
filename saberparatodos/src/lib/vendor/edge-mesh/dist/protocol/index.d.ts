import type { PostQuantumIdentity } from "../identity/index.js";
import type { Envolvente, NodoId, ParPublico, TipoMensaje } from "../types/index.js";
export declare function createEnvelope(tipo: TipoMensaje, origen: NodoId, destino: NodoId | "*", payload: unknown, firma?: Uint8Array | null): Envolvente;
export declare function validateEnvelope(env: Envolvente): boolean;
/**
 * Canonical bytes used for ML-DSA sign/verify (excludes `firma`).
 * Payload is JSON-stringified; Uint8Array fields must be pre-encoded by callers.
 */
export declare function canonicalEnvelopeBytes(env: Envolvente): Uint8Array;
export declare function signEnvelope(env: Envolvente, identity: PostQuantumIdentity): Promise<Envolvente>;
export declare function verifyEnvelopeSignature(env: Envolvente, parPublico: ParPublico, identity: PostQuantumIdentity): Promise<boolean>;
export interface DeduplicatorConfig {
    readonly ventanaMs: number;
    readonly maxEntradas: number;
}
export declare class MessageDeduplicator {
    private readonly vistos;
    private readonly config;
    constructor(config?: Partial<DeduplicatorConfig>);
    esDuplicado(env: Envolvente): boolean;
    private limpiar;
    obtenerEstadisticas(): {
        readonly total: number;
        readonly ventanaMs: number;
    };
    reiniciar(): void;
}
//# sourceMappingURL=index.d.ts.map