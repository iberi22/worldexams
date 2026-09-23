import type { NodoId, TipoTransporte } from "../types/index.js";
import type { ITransport, TransportEventMap } from "./types.js";
export interface TorTransportAdapterOptions {
    /** SOCKS/HTTP Tor proxy URL (e.g., "socks5://127.0.0.1:9050") */
    readonly proxyUrl?: string;
    /** Tor Onion hidden service address for this node (e.g., "abcdef1234567890.onion") */
    readonly onionAddress?: string;
    /** SOCKS proxy port (default: 9050) */
    readonly socksPort?: number;
    /** Control port for Tor process management (default: 9051) */
    readonly controlPort?: number;
    /** Fallback transport if direct Tor proxy tunnel fails */
    readonly fallbackTransport?: ITransport;
    /** Custom tunnel handler function for proxying data over SOCKS/Tor socket */
    readonly tunnelHandler?: (data: unknown, targetOnion?: string) => Promise<unknown>;
    /** Automatically connect proxy tunnel upon creation (default: false) */
    readonly autoConnect?: boolean;
}
/**
 * TorTransportAdapter provides hidden service proxy tunnel fallback for NAT traversal
 * when direct WebRTC or TCP connections fail behind severe CGNAT.
 */
export declare class TorTransportAdapter implements ITransport {
    readonly tipo: TipoTransporte;
    readonly eventTarget: EventTarget;
    readonly nodoId: NodoId;
    private readonly options;
    private readonly deduplicator;
    private readonly onionPeerMap;
    private readonly activeConnections;
    private onionAddress;
    private conectado;
    private tunnelActive;
    constructor(nodoId: NodoId, options?: TorTransportAdapterOptions);
    on<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    off<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    private emit;
    /**
     * Establish Tor onion hidden service proxy tunnel.
     */
    conectar(): Promise<void>;
    /**
     * Register remote peer's onion hidden service address for proxy routing.
     */
    registerOnionPeer(peerId: string, onionAddress: string): void;
    /**
     * Get node's local onion hidden service address.
     */
    getOnionAddress(): string;
    /**
     * Returns true if the proxy tunnel is established and active.
     */
    isTunnelActive(): boolean;
    /**
     * Send envelope or payload to a remote node via Tor hidden service proxy tunnel.
     */
    enviar(destino: NodoId, payload: unknown, tipoMensaje?: string): Promise<void>;
    /**
     * Broadcast envelope or payload across all connected onion hidden service peers.
     */
    transmitir(payload: unknown, tipoMensaje?: string): Promise<void>;
    /**
     * Helper method to process incoming proxy tunnel payloads into the adapter.
     */
    receivePayload(datos: unknown, from?: NodoId): void;
    estaConectado(): boolean;
    obtenerConexiones(): readonly string[];
    cerrar(): Promise<void>;
}
//# sourceMappingURL=TorTransportAdapter.d.ts.map