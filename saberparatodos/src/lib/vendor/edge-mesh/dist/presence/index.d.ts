import { type IdentityProvider, type PostQuantumIdentity } from "../identity/index.js";
import type { EstadoSalud, HealthStatus, NodoId } from "../types/index.js";
import { HealthChecker } from "./health.js";
export interface PresenceManagerConfig {
    readonly heartbeatIntervalMs: number;
    readonly timeoutMs: number;
    readonly maxFallosConsecutivos: number;
    readonly latenciaAltaMs: number;
    readonly anuncioIntervalMs: number;
}
export type PresenciaHandler = (nodoId: NodoId) => void;
export type TransmitirHandler = (payload: unknown) => Promise<void>;
export interface SignedHeartbeat {
    peerId: string;
    timestamp: number;
    status: "online" | "away" | "busy";
    signature: string;
}
export interface PresenceEventMap {
    nodoAparecio: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
    nodoDesaparecio: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
    latenciaActualizada: CustomEvent<{
        readonly nodoId: NodoId;
        readonly latenciaMs: number;
    }>;
    presenciaActualizada: CustomEvent<{
        readonly nodos: readonly NodoId[];
        readonly total: number;
    }>;
    estadoSaludCambiado: CustomEvent<{
        readonly nodoId: NodoId;
        readonly estado: EstadoSalud;
    }>;
}
export declare class MeshPresence {
    private static readonly onlineNodes;
    static isOnline(peerId: string): boolean;
    static setOnline(peerId: string, online: boolean): void;
    static clear(): void;
}
export declare class PresenceManager {
    readonly eventTarget: EventTarget;
    readonly healthChecker: HealthChecker;
    private readonly config;
    private readonly nodosConocidos;
    private readonly nodosAparecieron;
    private transmitirHandler;
    private intervaloAnuncio;
    private readonly onOnlineCallbacks;
    peerId: string;
    private localIdentity?;
    private readonly publicKeys;
    private defaultIdentityValue?;
    private readonly mesh;
    constructor(config?: Partial<PresenceManagerConfig>);
    iniciar(nodoId: NodoId, transmitir: TransmitirHandler, identity?: PostQuantumIdentity): Promise<void>;
    detener(): void;
    registrarClavePublica(nodoId: string, parPublico: Uint8Array): void;
    getPublicKey(peerId: string): Uint8Array | undefined;
    get defaultIdentity(): PostQuantumIdentity;
    sendHeartbeat(identity: IdentityProvider): Promise<void>;
    onHeartbeat(peerId: string, signed: SignedHeartbeat, identity: IdentityProvider): Promise<boolean>;
    private anunciarPresencia;
    procesarHeartbeat(datos: unknown): Promise<void>;
    obtenerNodosActivos(): readonly NodoId[];
    obtenerNodosConocidos(): readonly NodoId[];
    obtenerSalud(nodoId: NodoId): HealthStatus | null;
    obtenerLatencia(nodoId: NodoId): number | null;
    obtenerTotalNodos(): number;
    onOnline(peerId: string, callback?: (peerId: string) => void): void;
    /**
     * Registra un listener global que se invoca con el peerId cuando un nodo
     * pasa a online (sin requerir el peerId en la llamada).
     */
    addOnlineListener(callback: (peerId: string) => void): void;
    on<K extends keyof PresenceEventMap>(tipo: K, handler: (ev: PresenceEventMap[K]) => void): void;
    off<K extends keyof PresenceEventMap>(tipo: K, handler: (ev: PresenceEventMap[K]) => void): void;
    private emit;
    reiniciar(): void;
}
//# sourceMappingURL=index.d.ts.map