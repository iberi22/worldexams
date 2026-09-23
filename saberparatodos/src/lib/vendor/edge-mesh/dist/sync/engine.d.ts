import type { OpLog } from "../op-log/index.js";
import type { NodoId } from "../types/index.js";
export type SyncDirection = "bidireccional" | "entrante" | "saliente";
export interface SyncEngineConfig {
    readonly docId: string;
    readonly opLog: OpLog;
    readonly batchSize?: number;
    readonly timeoutMs?: number;
    readonly direction?: SyncDirection;
}
export interface SyncResult {
    readonly docId: string;
    readonly operacionesEnviadas: number;
    readonly operacionesRecibidas: number;
    readonly conflictos: number;
    readonly duracionMs: number;
    readonly exito: boolean;
}
export interface SyncEngineEventMap {
    syncIniciado: CustomEvent<{
        readonly docId: string;
        readonly peerId: NodoId;
        readonly direction: SyncDirection;
    }>;
    syncCompletado: CustomEvent<{
        readonly resultado: SyncResult;
        readonly peerId: NodoId;
    }>;
    syncError: CustomEvent<{
        readonly docId: string;
        readonly peerId: NodoId;
        readonly error: string;
    }>;
    conflictoDetectado: CustomEvent<{
        readonly docId: string;
        readonly operacionLocal: unknown;
        readonly operacionRemota: unknown;
    }>;
}
export declare class SyncEngine {
    readonly eventTarget: EventTarget;
    readonly docId: string;
    private readonly opLog;
    private readonly batchSize;
    private readonly timeoutMs;
    private readonly _direction;
    private sincronizando;
    private clockLocal;
    private readonly clocksRemotos;
    constructor(config: SyncEngineConfig);
    sincronizar(peerId: NodoId, enviar: (ops: readonly unknown[]) => Promise<void>, recibir: () => Promise<readonly unknown[]>): Promise<SyncResult>;
    actualizarClockLocal(clock: number): void;
    actualizarClockRemoto(peerId: NodoId, clock: number): void;
    obtenerClockLocal(): number;
    obtenerClockRemoto(peerId: NodoId): number;
    estaSincronizando(): boolean;
    on<K extends keyof SyncEngineEventMap>(tipo: K, handler: (ev: SyncEngineEventMap[K]) => void): void;
    off<K extends keyof SyncEngineEventMap>(tipo: K, handler: (ev: SyncEngineEventMap[K]) => void): void;
    private emit;
}
//# sourceMappingURL=engine.d.ts.map