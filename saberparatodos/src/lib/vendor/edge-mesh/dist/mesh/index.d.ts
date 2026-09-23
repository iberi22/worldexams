import type { EdgeMesh } from "../edge-mesh.js";
import type { NodoId } from "../types/index.js";
export declare const ESTRATEGIA_FAN_OUT: {
    readonly ALEATORIA: "aleatoria";
    readonly POR_SALUD: "por_salud";
    readonly POR_LATENCIA: "por_latencia";
};
export type EstrategiaFanOut = (typeof ESTRATEGIA_FAN_OUT)[keyof typeof ESTRATEGIA_FAN_OUT];
export interface MeshConfig {
    readonly nodoId: NodoId;
    readonly fanOut: number;
    readonly maxPeers: number;
    readonly heartbeatIntervalMs: number;
    readonly peerTimeoutMs: number;
    readonly gossipTTL: number;
    readonly estrategia: EstrategiaFanOut;
    readonly namespacePorDefecto: string;
}
export interface PeerInfo {
    readonly nodoId: NodoId;
    readonly timestamp: number;
    readonly ultimoHeartbeat: number;
    readonly latenciaMs: number;
    readonly fanOutIndex: number;
    readonly estado: "activo" | "lento" | "caido";
    readonly intentosReconexion: number;
    readonly namespace?: string;
}
export interface GossipMessage {
    readonly id: string;
    readonly namespace: string;
    readonly ttl: number;
    readonly payload: unknown;
    readonly origen: NodoId;
    readonly timestamp: number;
    readonly ruta: readonly NodoId[];
}
export interface MeshEventMap {
    peerConectado: CustomEvent<{
        readonly peerId: NodoId;
        readonly namespace?: string;
    }>;
    peerDesconectado: CustomEvent<{
        readonly peerId: NodoId;
    }>;
    peerDescubierto: CustomEvent<{
        readonly peerId: NodoId;
        readonly via: NodoId;
    }>;
    gossipRecibido: CustomEvent<{
        readonly mensaje: GossipMessage;
    }>;
    meshSaludActualizada: CustomEvent<{
        readonly peersActivos: number;
        readonly peersTotales: number;
    }>;
    namespaceSincronizado: CustomEvent<{
        readonly namespace: string;
        readonly peers: readonly NodoId[];
    }>;
    error: CustomEvent<{
        readonly mensaje: string;
        readonly error?: Error;
    }>;
    rate_limited: CustomEvent<{
        readonly peerId: string;
        readonly resource: string;
    }>;
}
export declare class MeshManager extends EventTarget {
    readonly config: MeshConfig;
    private readonly edgeMesh;
    private readonly peers;
    private readonly gossipsVistos;
    private readonly gossipRateLimiter;
    private readonly namespacePeers;
    private activo;
    private intervalos;
    constructor(config: Partial<MeshConfig> & {
        nodoId: NodoId;
    }, edgeMesh: EdgeMesh);
    iniciar(): Promise<void>;
    detener(): Promise<void>;
    conectarPeer(peerId: NodoId, namespace?: string): Promise<void>;
    desconectarPeer(peerId: NodoId): Promise<void>;
    private encontrarPeorPeer;
    private agregarPeerANamespace;
    unirANamespace(namespace: string, peerId?: NodoId): Promise<void>;
    abandonarNamespace(namespace: string, peerId?: NodoId): Promise<void>;
    obtenerPeersEnNamespace(namespace: string): readonly NodoId[];
    transmitirConGossip(namespace: string, payload: unknown, fanOut?: number): Promise<void>;
    private seleccionarPeersParaFanOut;
    private seleccionAleatoria;
    private seleccionPorSalud;
    private seleccionPorLatencia;
    procesarGossip(mensaje: GossipMessage): void;
    private reenviarGossip;
    private transmitirHeartbeat;
    procesarHeartbeatPeer(peerId: NodoId, peersConocidos: readonly NodoId[], namespaces: readonly string[]): void;
    descubrirSalon(salonId: string): Promise<readonly NodoId[]>;
    obtenerPeersConectados(): readonly NodoId[];
    obtenerPeersActivos(): readonly NodoId[];
    obtenerPeersLentos(): readonly string[];
    obtenerPeerInfo(peerId: NodoId): PeerInfo | null;
    obtenerTotalPeers(): number;
    obtenerNamespaces(): readonly string[];
    estaActivo(): boolean;
    private actualizarLatencia;
    private marcarPeerCaido;
    private limpiarPeersCaidos;
    private limpiarGossipCache;
    private emitMeshSalud;
    destruir(): void;
}
export declare class MeshGossip extends MeshManager {
    recibirGossip(_origen: NodoId, mensaje: GossipMessage): void;
    propagarGossip(mensaje: GossipMessage): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map