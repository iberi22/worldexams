import { type IStorage } from "../storage/index.js";
import type { NodoId, Operacion } from "../types/index.js";
export interface OpLogConfig {
    readonly docId: string;
    readonly storage?: IStorage;
    readonly maxEnMemoria?: number;
}
export interface OpLogEventMap {
    operacionAgregada: CustomEvent<{
        readonly operacion: Operacion;
        readonly total: number;
    }>;
    logComprimido: CustomEvent<{
        readonly desde: number;
        readonly hasta: number;
    }>;
    error: CustomEvent<{
        readonly mensaje: string;
        readonly operacion?: Operacion;
    }>;
}
export declare class OpLog {
    readonly eventTarget: EventTarget;
    readonly docId: string;
    private readonly storage;
    private readonly cache;
    private readonly maxEnMemoria;
    private ultimaSecuencia;
    private totalOperaciones;
    constructor(config: OpLogConfig);
    cargarDesdeStorage(): Promise<void>;
    append(tipo: string, datos: unknown, autor: NodoId): Promise<Operacion>;
    obtenerRango(desde: number, hasta: number): Promise<readonly Operacion[]>;
    obtenerDesde(desde: number): Promise<readonly Operacion[]>;
    obtenerTodas(): Promise<readonly Operacion[]>;
    obtenerPorId(id: string): Promise<Operacion | null>;
    obtenerUltimaSecuencia(): number;
    obtenerTotalOperaciones(): number;
    obtenerTamanioStorage(): Promise<number>;
    comprimir(keepLast?: number): Promise<void>;
    compactar(secuencia: number): Promise<void>;
    reiniciar(): Promise<void>;
    aplicarOperaciones(operaciones: readonly Operacion[]): Promise<number>;
    on<K extends keyof OpLogEventMap>(tipo: K, handler: (ev: OpLogEventMap[K]) => void): void;
    off<K extends keyof OpLogEventMap>(tipo: K, handler: (ev: OpLogEventMap[K]) => void): void;
    private emit;
    private crearClave;
}
//# sourceMappingURL=index.d.ts.map