import type { RoleAssignment } from "../authz/index.js";
import type { GovernanceSnapshot } from "../governance/merge.js";
import type { MerkleTree } from "../maloca/evidentia.js";
import type { Perfil as Profile } from "../maloca/perfil.js";
import { type IStorage } from "../storage/index.js";
import type { NamespaceCapabilityGrant, NodoId, PayloadSnapshot } from "../types/index.js";
export type Grant = NamespaceCapabilityGrant;
export interface Subscription {
    id: string;
    topic: string;
    subscriber: string;
    timestamp: number;
}
export interface SnapshotConfig {
    intervalMs: number;
    maxSnapshots: number;
    include: string[];
}
export interface Snapshot {
    id: string;
    timestamp: number;
    state: {
        grants: [string, Grant][];
        roleAssignments: [string, RoleAssignment][];
        profiles: [string, Profile][];
        merkleTree: MerkleTree;
        governance: GovernanceSnapshot;
        subscriptions: [string, Subscription][];
        lastOpSequence?: number;
    };
    signature?: string;
    prevSnapshotId?: string;
}
export interface SnapshotManagerConfig {
    readonly docId: string;
    readonly interval?: number;
    readonly storage?: IStorage;
    readonly maxSnapshots?: number;
}
export interface SnapshotMetadata {
    readonly version: number;
    readonly timestamp: number;
    readonly nodos: readonly NodoId[];
    readonly tamanio: number;
    readonly hash: string;
}
export interface SnapshotEventMap {
    snapshotCreado: CustomEvent<{
        readonly snapshot: SnapshotMetadata;
        readonly docId: string;
    }>;
    snapshotRestaurado: CustomEvent<{
        readonly version: number;
        readonly docId: string;
    }>;
    snapshotCompartido: CustomEvent<{
        readonly snapshot: PayloadSnapshot;
    }>;
}
export declare class SnapshotManager {
    readonly eventTarget: EventTarget;
    readonly docId: string;
    private readonly interval;
    private readonly storage;
    private readonly maxSnapshots;
    private contadorOperaciones;
    private versionActual;
    private datosActuales;
    private readonly nodosConfirmados;
    constructor(config: SnapshotManagerConfig);
    incrementarOperaciones(): boolean;
    crearSnapshot(datos?: Uint8Array, nodos?: readonly NodoId[]): Promise<boolean>;
    restaurarSnapshot(version: number): Promise<Uint8Array | null>;
    restaurarUltimoSnapshot(): Promise<Uint8Array | null>;
    prepararSnapshotCompartido(): Promise<PayloadSnapshot | null>;
    recibirSnapshot(snapshot: PayloadSnapshot): Promise<boolean>;
    confirmarNodo(nodoId: NodoId): void;
    obtenerNodosConfirmados(): readonly NodoId[];
    obtenerVersionActual(): number;
    obtenerContadorOperaciones(): number;
    obtenerSnapshotsDisponibles(): Promise<readonly SnapshotMetadata[]>;
    private limpiarSnapshotsViejos;
    on<K extends keyof SnapshotEventMap>(tipo: K, handler: (ev: SnapshotEventMap[K]) => void): void;
    off<K extends keyof SnapshotEventMap>(tipo: K, handler: (ev: SnapshotEventMap[K]) => void): void;
    private emit;
    private calcularHash;
    reiniciar(): void;
}
export declare function createSnapshotManager(config: SnapshotManagerConfig): SnapshotManager;
//# sourceMappingURL=index.d.ts.map