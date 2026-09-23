import type { GovernancePolicy, NodoId, PayloadVotacion, VerificadorVotos } from "../types/index.js";
export type { VerificadorVotos };
export interface Propuesta {
    readonly id: string;
    readonly tipo: string;
    readonly proponente: NodoId;
    readonly datos: unknown;
    readonly timestamp: number;
    readonly expiracion: number;
    votos: PayloadVotacion[];
    estado: EstadoPropuesta;
}
export declare const ESTADO_PROPUESTA: {
    readonly ABIERTA: "abierta";
    readonly APROBADA: "aprobada";
    readonly RECHAZADA: "rechazada";
    readonly EXPIRADA: "expirada";
};
export type EstadoPropuesta = (typeof ESTADO_PROPUESTA)[keyof typeof ESTADO_PROPUESTA];
export interface GovernanceEventMap {
    propuestaCreada: CustomEvent<{
        readonly propuesta: Propuesta;
    }>;
    votoRecibido: CustomEvent<{
        readonly propuesta: string;
        readonly voto: PayloadVotacion;
    }>;
    propuestaResultado: CustomEvent<{
        readonly propuesta: string;
        readonly resultado: EstadoPropuesta;
    }>;
    politicaCambiada: CustomEvent<{
        readonly politica: GovernancePolicy;
    }>;
}
export interface GovernanceManagerOptions {
    readonly requireSignedVotes?: boolean;
}
export declare class GovernanceManager {
    readonly eventTarget: EventTarget;
    private politica;
    private readonly propuestas;
    private readonly timers;
    private readonly verificador?;
    private readonly requireSignedVotes;
    constructor(politica?: GovernancePolicy, verificador?: VerificadorVotos, options?: GovernanceManagerOptions);
    crearPropuesta(id: string, tipo: string, proponente: NodoId, datos: unknown, expiracionMs?: number): Propuesta;
    votar(id: string, voto: PayloadVotacion): boolean;
    private cerrarPropuesta;
    private verificarUmbral;
    private calcularPesoTotal;
    actualizarPolitica(politica: Partial<GovernancePolicy>): void;
    obtenerPolitica(): GovernancePolicy;
    obtenerPropuestas(estado?: EstadoPropuesta): readonly Propuesta[];
    obtenerPropuesta(id: string): Propuesta | null;
    importarPropuestas(propuestas: readonly Propuesta[]): void;
    on<K extends keyof GovernanceEventMap>(tipo: K, handler: (ev: GovernanceEventMap[K]) => void): void;
    off<K extends keyof GovernanceEventMap>(tipo: K, handler: (ev: GovernanceEventMap[K]) => void): void;
    private emit;
    limpiarPropuestasExpiradas(): void;
    destruir(): void;
}
export declare function createGovernanceManager(politica?: GovernancePolicy, verificador?: VerificadorVotos, options?: GovernanceManagerOptions): GovernanceManager;
export * from "./authority.js";
export * from "./merge.js";
//# sourceMappingURL=index.d.ts.map