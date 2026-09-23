import * as Y from "yjs";
import { type NamespaceAuthorizer } from "./authz/index.js";
import { PersistentOfflineQueue } from "./chat/offline-queue.js";
import { type EdgeMeshNode } from "./core/node.js";
import { type AuthorityManager, type GovernanceManager } from "./governance/index.js";
import { type PostQuantumIdentity } from "./identity/index.js";
import { MerkleTree } from "./maloca/evidentia.js";
import { MeshGossip } from "./mesh/index.js";
import { NamespaceManager } from "./namespaces/index.js";
import { OpLog } from "./op-log/index.js";
import { PresenceManager } from "./presence/index.js";
import { MessageDeduplicator } from "./protocol/index.js";
import { type Snapshot, type SnapshotConfig, type SnapshotManager, type Subscription } from "./snapshot/index.js";
import { InMemoryStorage, StorageManager } from "./storage/index.js";
import { SyncEngine } from "./sync/engine.js";
import { type PqcChannelState, PqcHandshake } from "./transport/pqc-handshake.js";
import type { ITransport } from "./transport/types.js";
import type { EdgeMeshConfig, EdgeMeshEventMap, NodoId, ParPublico, TipoMensaje } from "./types/index.js";
/**
 * Reserved transaction origin used when the mutation guard reverts unauthorized changes (self-healing).
 */
export declare const MUTATION_REVERT_ORIGIN = "mutation-guard-revert";
export type MutationGuardFn = (origin: unknown, touched: Map<string, Set<string>>) => boolean | Map<string, Set<string>> | void;
export declare class YjsAdapter {
    readonly doc: Y.Doc;
    /** When false, destroy() only detaches listeners (shared host doc). */
    readonly ownsDoc: boolean;
    private readonly listeners;
    private readonly mutationGuards;
    private readonly afterTransactionHandler;
    constructor(existingDoc?: Y.Doc, ownsDoc?: boolean);
    registerMutationGuard(fn: MutationGuardFn): () => void;
    onUpdate(handler: (update: Uint8Array, origin: unknown) => void): () => void;
    applyUpdate(update: Uint8Array, origin?: unknown): void;
    getState(): Uint8Array;
    getStateVector(): Uint8Array;
    merge(remoteState: Uint8Array): void;
    getMap(name: string): Y.Map<unknown>;
    getArray(name: string): Y.Array<unknown>;
    getText(name: string): Y.Text;
    destroy(): void;
}
export declare class EdgeMesh {
    readonly config: EdgeMeshConfig;
    readonly nodo: EdgeMeshNode;
    readonly eventTarget: EventTarget;
    readonly deduplicator: MessageDeduplicator;
    readonly storage: StorageManager | InMemoryStorage;
    readonly governance: GovernanceManager;
    readonly authority: AuthorityManager;
    readonly identity: PostQuantumIdentity;
    readonly presence: PresenceManager;
    readonly authorizer: NamespaceAuthorizer;
    readonly namespaces: NamespaceManager;
    readonly yjsAdapter: YjsAdapter;
    readonly offlineQueue: PersistentOfflineQueue;
    readonly peerSecureChannels: Map<NodoId, PqcChannelState>;
    readonly pqcHandshake: PqcHandshake;
    readonly meshGossip: MeshGossip;
    private transport;
    private readonly logsDoc;
    private readonly syncs;
    private readonly snapshots;
    readonly subscriptions: Map<string, Subscription>;
    merkleTree: MerkleTree;
    snapshotConfig: SnapshotConfig;
    private snapshotTimer;
    snapshotRestored: boolean;
    /** Registered peer public keys for envelope verification. */
    private readonly peerPublicKeys;
    private readonly sybilRegistry;
    private readonly requireAuthz;
    private readonly requireSignedEnvelopes;
    private readonly defaultSyncNamespace;
    private unsubYjs;
    private transportMessageHandler;
    private iniciado;
    /** True when this mesh created the Y.Doc (false when host injects yDoc). */
    readonly sharesExternalDoc: boolean;
    private readonly relayLocalYjs;
    constructor(config: EdgeMeshConfig);
    registrarClavePublica(nodoId: NodoId, parPublico: ParPublico, origenIp?: string): void;
    obtenerClavePublica(nodoId: NodoId): ParPublico | undefined;
    verificarFirma(mensaje: Uint8Array, firma: Uint8Array, clave: ParPublico | Uint8Array): boolean;
    verificarFirmaVoto(mensaje: Uint8Array, firma: Uint8Array, clave: ParPublico | Uint8Array): boolean;
    /**
     * Attach an external transport (MemoryTransport, adapter over host PeerJS, etc.).
     * Prefer this over `peerId` when the host app already owns a Peer connection.
     * Safe to call after `iniciar()` (Phase C late-bind).
     */
    usarTransport(transport: ITransport): void;
    /** Detach transport without destroying host PeerJS (adapter.cerrar only unsubscribes). */
    detachTransport(): void;
    private ensureYjsRelay;
    iniciar(): Promise<void>;
    detener(): Promise<void>;
    /** Current attached transport (if any). */
    obtenerTransport(): ITransport | null;
    /** Whether yjsAdapter.doc is an externally owned document. */
    isSharedYDoc(): boolean;
    enviar(destino: NodoId, payload: unknown, tipoMensaje?: TipoMensaje): Promise<void>;
    transmitir(payload: unknown, tipoMensaje?: TipoMensaje): Promise<void>;
    private enviarSyncEnvelope;
    iniciarPqcHandshake(destino: NodoId): Promise<void>;
    solicitarSyncYjs(destino: NodoId, docId?: string): Promise<void>;
    /**
     * Publish a CRDT update to peers (optionally signed).
     */
    broadcastYjsUpdate(update: Uint8Array, docId?: string): Promise<void>;
    /** Exposed for tests / external transports feeding envelopes. */
    recibirEnvelope(env: unknown): Promise<void>;
    private procesarMensaje;
    private procesarGossip;
    publicarGossip(payload: unknown, namespace?: string, ttl?: number): Promise<void>;
    private procesarPqcHandshake;
    private procesarKemReply;
    private procesarPqcAck;
    private verificarFirmaEnvelope;
    private decodeSyncBytes;
    private procesarSync;
    private procesarSnapshot;
    private procesarGovernance;
    private procesarAuthz;
    private procesarNamespace;
    private onNodoConectado;
    private onNodoDesconectado;
    obtenerOLog(docId: string): OpLog;
    obtenerSyncEngine(docId: string): SyncEngine;
    obtenerSnapshotManager(docId: string): SnapshotManager;
    generarSnapshotAutomatico(): Promise<Snapshot | null>;
    restaurarDesdeSnapshot(): Promise<boolean>;
    verificarFirmaSnapshot(snapshot: Snapshot): Promise<boolean>;
    private aplicarEstadoSnapshot;
    reconstruirDesdeOpLogCompleto(): Promise<void>;
    on<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    off<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    private emit;
}
//# sourceMappingURL=edge-mesh.d.ts.map