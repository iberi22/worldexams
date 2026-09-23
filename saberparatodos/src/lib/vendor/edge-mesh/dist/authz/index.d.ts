import { type IStorage } from "../storage/index.js";
import type { NamespaceCapabilityGrant, NodoId } from "../types/index.js";
/** Rol de un sujeto dentro de un namespace (string, consistente con updateRole/revokeRole). */
export type Role = string;
export interface RoleAssignment {
    readonly id: string;
    readonly rol: string;
    readonly sujeto: NodoId;
}
export interface Capability {
    readonly nombre: string;
    readonly descripcion?: string;
}
export declare const CAPACIDAD_ESTANDAR: {
    readonly LEER: "read";
    readonly ESCRIBIR: "write";
    readonly ADMIN: "admin";
    readonly SINC: "sync";
    readonly PRESENCIA: "presence";
    readonly GOBERNANZA: "governance";
};
export type CapacidadEstandar = (typeof CAPACIDAD_ESTANDAR)[keyof typeof CAPACIDAD_ESTANDAR];
export interface AuthzEventMap {
    capacidadConcedida: CustomEvent<{
        readonly grant: NamespaceCapabilityGrant;
    }>;
    capacidadRevocada: CustomEvent<{
        readonly id: string;
        readonly espacio: string;
        readonly sujeto: NodoId;
    }>;
    autorizacionFallida: CustomEvent<{
        readonly espacio: string;
        readonly sujeto: NodoId;
        readonly capacidad: string;
        readonly razon: string;
    }>;
}
export declare class NamespaceAuthorizer {
    readonly eventTarget: EventTarget;
    private grants;
    private readonly reglasLocales;
    private roleAssignments;
    private capabilities;
    private readonly storage;
    constructor(storage?: IStorage);
    saveGrants(): Promise<void>;
    loadGrants(): Promise<void>;
    saveRoleAssignments(): Promise<void>;
    loadRoleAssignments(): Promise<void>;
    saveCapabilities(): Promise<void>;
    loadCapabilities(): Promise<void>;
    concederCapacidad(espacio: string, sujeto: NodoId, capacidad: string, expiracionMs?: number, firma?: Uint8Array): NamespaceCapabilityGrant;
    grant(espacio: string, sujeto: NodoId, capacidad: string, expiracionMs?: number, firma?: Uint8Array): NamespaceCapabilityGrant;
    revocarCapacidad(espacio: string, sujeto: NodoId, capacidad: string): boolean;
    revoke(espacio: string, sujeto: NodoId, capacidad: string): boolean;
    verificarCapacidad(espacio: string, sujeto: NodoId, capacidad: string): boolean;
    private verificarGrant;
    agregarReglaLocal(espacio: string, regla: string): void;
    removerReglaLocal(espacio: string, regla: string): boolean;
    verificarReglaLocal(espacio: string, regla: string): boolean;
    obtenerGrantsDeNodo(sujeto: NodoId): readonly NamespaceCapabilityGrant[];
    obtenerGrantsDeEspacio(espacio: string): readonly NamespaceCapabilityGrant[];
    obtenerTodosLosGrants(): readonly NamespaceCapabilityGrant[];
    limpiarGrantsExpirados(): number;
    updateRole(sujeto: NodoId, rol: string): void;
    obtenerRoles(): Map<string, RoleAssignment>;
    revokeRole(sujeto: NodoId): boolean;
    concederCapacidades(espacio: string, caps: Capability[]): void;
    obtenerCapacidades(espacio: string): Capability[] | undefined;
    obtenerGrantsMap(): Map<string, NamespaceCapabilityGrant>;
    obtenerRoleAssignmentsMap(): Map<string, RoleAssignment>;
    cargarGrantsMap(grants: [string, NamespaceCapabilityGrant][]): void;
    cargarRoleAssignmentsMap(roleAssignments: [string, RoleAssignment][]): void;
    on<K extends keyof AuthzEventMap>(tipo: K, handler: (ev: AuthzEventMap[K]) => void): void;
    off<K extends keyof AuthzEventMap>(tipo: K, handler: (ev: AuthzEventMap[K]) => void): void;
    private emit;
    private crearClave;
}
export declare function createNamespaceAuthorizer(storage?: IStorage): NamespaceAuthorizer;
//# sourceMappingURL=index.d.ts.map