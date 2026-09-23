import type { NamespacePartition, NodoId } from "../types/index.js";
export * from "./ivn-proofs.js";
export * from "./offers-gossip.js";
export declare const NAMESPACE_POR_DEFECTO: "global";
/**
 * Canonical SWAL mesh data-plane namespace (NODE_PRO_AND_INSTANCES / DL-F1-02).
 * Two installs of the same app MUST use distinct instanceIds.
 */
export declare function swalNamespace(appId: string, instanceId: string): string;
/** Parse `swal/{appId}/{instanceId}` → parts, or null if invalid. */
export declare function parseSwalNamespace(ns: string): {
    appId: string;
    instanceId: string;
} | null;
/** True when two namespaces belong to different instances (must not mix). */
export declare function namespacesAreIsolated(a: string, b: string): boolean;
export interface NamespaceEventMap {
    espacioCreado: CustomEvent<{
        readonly espacio: NamespacePartition;
    }>;
    espacioEliminado: CustomEvent<{
        readonly id: string;
    }>;
    nodoUnido: CustomEvent<{
        readonly espacio: string;
        readonly nodoId: NodoId;
    }>;
    nodoAbandono: CustomEvent<{
        readonly espacio: string;
        readonly nodoId: NodoId;
    }>;
}
export declare class NamespaceManager {
    readonly eventTarget: EventTarget;
    private readonly espacios;
    constructor();
    crearEspacio(nombre: string, metadatos?: Readonly<Record<string, string>>): NamespacePartition;
    private crearEspacioInterno;
    eliminarEspacio(id: string): boolean;
    unirNodo(espacioId: string, nodoId: NodoId): boolean;
    abandonarNodo(espacioId: string, nodoId: NodoId): boolean;
    obtenerEspacio(id: string): NamespacePartition | null;
    obtenerEspacioPorNombre(nombre: string): NamespacePartition | null;
    obtenerTodosLosEspacios(): readonly NamespacePartition[];
    obtenerNodosEnEspacio(nombre: string): readonly NodoId[];
    obtenerEspaciosDeNodo(nodoId: NodoId): readonly NamespacePartition[];
    on<K extends keyof NamespaceEventMap>(tipo: K, handler: (ev: NamespaceEventMap[K]) => void): void;
    off<K extends keyof NamespaceEventMap>(tipo: K, handler: (ev: NamespaceEventMap[K]) => void): void;
    private emit;
    reiniciar(): void;
}
//# sourceMappingURL=index.d.ts.map