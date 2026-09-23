import type { PresenceManager } from "../presence/index.js";
import type { NodoId } from "../types/index.js";
export interface AuthorityEventMap {
    failover: CustomEvent<{
        readonly antiguoMaster: NodoId | null;
        readonly nuevoMaster: NodoId;
        readonly razon: "timeout" | "forced" | "manual";
    }>;
    promocionado: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
    degradado: CustomEvent<{
        readonly nodoId: NodoId;
    }>;
}
export declare class AuthorityManager {
    readonly eventTarget: EventTarget;
    private readonly localNodeId;
    private readonly presence;
    private currentMaster;
    private running;
    private checkInterval;
    constructor(localNodeId: NodoId, presence: PresenceManager, options?: {
        initialMaster?: NodoId;
    });
    selectSuccessor(nodosActivos: readonly NodoId[], masterActual?: NodoId | null): NodoId | null;
    promoteSuccessor(nuevoMaster: NodoId, razon?: "timeout" | "forced" | "manual"): void;
    checkHostHealth(hostId: NodoId): boolean;
    forceHostFailover(): void;
    iniciar(): void;
    detener(): void;
    obtenerMaster(): NodoId | null;
    obtenerTodosLosNodosActivos(): readonly NodoId[];
    private handleNodoDesaparecio;
    private verificarSaludMaster;
    private handleMasterFailure;
    on<K extends keyof AuthorityEventMap>(tipo: K, handler: (ev: AuthorityEventMap[K]) => void): void;
    off<K extends keyof AuthorityEventMap>(tipo: K, handler: (ev: AuthorityEventMap[K]) => void): void;
    private emit;
}
export declare function createAuthorityManager(localNodeId: NodoId, presence: PresenceManager, options?: {
    initialMaster?: NodoId;
}): AuthorityManager;
//# sourceMappingURL=authority.d.ts.map