import type { PostQuantumIdentity } from "../identity/index.js";
import type { NodoId, ParPublico } from "../types/index.js";
export declare const PQC_SESSION_INFO: "edge-mesh/pqc-session/v1";
export interface PayloadPqcHandshake {
    readonly subtipo: "handshake";
    /** ML-KEM-768 public key of the initiator (hex). */
    readonly kemPublicKey: string;
    /** Random 32-byte challenge (hex); also used as HKDF salt. */
    readonly challenge: string;
    /** ML-DSA-65 signature over the canonical handshake payload (hex). */
    readonly firma: string;
    /** ML-DSA-65 public key of the initiator (hex). */
    readonly dsaPublicKey: string;
}
export interface PayloadPqcKemReply {
    readonly subtipo: "kem_reply";
    /** ML-KEM-768 ciphertext encapsulating the shared secret (hex). */
    readonly cipherText: string;
    /** Echo of the initiator challenge (hex). */
    readonly challenge: string;
    readonly firma: string;
    readonly dsaPublicKey: string;
}
export interface PayloadPqcAck {
    readonly subtipo: "ack";
    readonly challenge: string;
    readonly firma: string;
}
export type PayloadPqc = PayloadPqcHandshake | PayloadPqcKemReply | PayloadPqcAck;
/** Encrypted SYNC payload marker (payload = AES-GCM of the JSON payload). */
export interface PayloadCifrado {
    readonly cifrado: true;
    readonly algoritmo: "AES-256-GCM";
    readonly iv: string;
    readonly datos: string;
}
export declare function esPayloadCifrado(valor: unknown): valor is PayloadCifrado;
export interface PqcSessionManagerDeps {
    readonly nodoId: NodoId;
    readonly identity: PostQuantumIdentity;
    /** Send a PQC payload to a peer (EdgeMesh wraps it in an envelope). */
    readonly enviar: (peerId: NodoId, payload: PayloadPqc) => Promise<void>;
    /** Trust-on-first-use: handshake payloads carry the peer ML-DSA key. */
    readonly registrarClavePublica: (peerId: NodoId, parPublico: ParPublico) => void;
    readonly obtenerClavePublica: (peerId: NodoId) => ParPublico | undefined;
    readonly emitError: (mensaje: string) => void;
    readonly onSessionEstablished: (peerId: NodoId) => void;
}
export declare class PqcSessionManager {
    private readonly deps;
    private readonly sessions;
    private readonly pendientes;
    constructor(deps: PqcSessionManagerDeps);
    /**
     * Deterministic initiator election: the lexicographically smaller
     * NodoId starts the handshake. Both sides call this on peer connect;
     * only the initiator actually sends PQC_HANDSHAKE.
     */
    iniciarHandshakeSiIniciador(peerId: NodoId): Promise<void>;
    /** Force a handshake as initiator (rekey / tests). */
    iniciarHandshake(peerId: NodoId): Promise<void>;
    private handshakeSignBytes;
    private replySignBytes;
    private ackSignBytes;
    procesarMensaje(origen: NodoId, payload: unknown): Promise<void>;
    private procesarHandshake;
    private procesarKemReply;
    private procesarAck;
    /**
     * HKDF-SHA256(sharedSecret, salt=challenge, info=v1|peerA|peerB) →
     * AES-256-GCM key. Both sides derive the same key because the info
     * string sorts the peer ids.
     */
    private derivarClaveSesion;
    hasSession(peerId: NodoId): boolean;
    getEstablishedPeers(): readonly NodoId[];
    clearPeer(peerId: NodoId): void;
    limpiar(): void;
    /** Encrypt a JSON-serializable payload with the peer session key. */
    cifrarPayload(peerId: NodoId, payload: unknown): Promise<PayloadCifrado | null>;
    /** Decrypt an encrypted payload; null when no session or bad tag. */
    descifrarPayload(peerId: NodoId, payload: PayloadCifrado): Promise<unknown | null>;
}
//# sourceMappingURL=pqc-session.d.ts.map