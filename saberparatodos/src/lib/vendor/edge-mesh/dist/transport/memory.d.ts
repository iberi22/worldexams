import type { NodoId } from "../types/index.js";
import type { ITransport, TransportEventMap } from "./types.js";
export interface MemoryTransportOptions {
    /** Shared room id so multiple MemoryTransport instances can find each other. */
    readonly roomId?: string;
}
/**
 * Deterministic multi-node transport for unit/integration tests (no WebRTC).
 */
export declare class MemoryTransport implements ITransport {
    readonly tipo: "memoria";
    readonly eventTarget: EventTarget;
    readonly nodoId: NodoId;
    private readonly roomId;
    private readonly deduplicator;
    private conectado;
    constructor(nodoId: NodoId, options?: MemoryTransportOptions);
    on<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    off<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    private emit;
    conectar(): Promise<void>;
    enviar(destino: NodoId, payload: unknown, tipoMensaje?: string): Promise<void>;
    transmitir(payload: unknown, tipoMensaje?: string): Promise<void>;
    private recibir;
    estaConectado(): boolean;
    obtenerConexiones(): readonly string[];
    cerrar(): Promise<void>;
    /** Test helper: wipe all rooms (avoid cross-test pollution). */
    static resetAll(): void;
}
//# sourceMappingURL=memory.d.ts.map