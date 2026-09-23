import type { EstadoSalud, HealthStatus, NodoId } from "../types/index.js";
export interface HealthCheckerConfig {
    readonly heartbeatIntervalMs: number;
    readonly timeoutMs: number;
    readonly maxFallosConsecutivos: number;
    readonly latenciaAltaMs: number;
}
export interface HealthEventMap {
    heartbeatRecibido: CustomEvent<{
        readonly nodoId: NodoId;
        readonly timestamp: number;
        readonly latenciaMs: number;
    }>;
    saludCambiada: CustomEvent<{
        readonly nodoId: NodoId;
        readonly estadoAnterior: EstadoSalud;
        readonly estadoNuevo: EstadoSalud;
    }>;
    nodoCaido: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
    timeout: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
}
export declare class HealthChecker {
    readonly eventTarget: EventTarget;
    private readonly estados;
    private readonly heartbeatsRecibidos;
    private readonly tiemposEnvio;
    private readonly config;
    private intervalo;
    private secuencia;
    constructor(config?: Partial<HealthCheckerConfig>);
    generarHeartbeat(nodoId: NodoId): {
        readonly nodoId: NodoId;
        readonly timestamp: number;
        readonly secuencia: number;
        readonly intervaloMs: number;
    };
    recibirHeartbeat(nodoId: NodoId, timestamp: number): void;
    verificarTimeouts(): void;
    iniciar(): void;
    detener(): void;
    obtenerSalud(nodoId: NodoId): HealthStatus | null;
    obtenerTodasLasSaludes(): readonly HealthStatus[];
    obtenerNodosActivos(): readonly NodoId[];
    obtenerLatencia(nodoId: NodoId): number | null;
    on<K extends keyof HealthEventMap>(tipo: K, handler: (ev: HealthEventMap[K]) => void): void;
    off<K extends keyof HealthEventMap>(tipo: K, handler: (ev: HealthEventMap[K]) => void): void;
    private emit;
    reiniciar(): void;
}
//# sourceMappingURL=health.d.ts.map