import type { NodoId, TipoTransporte } from "../types/index.js";
import type { ITransport, TransportEventMap } from "./types.js";
export interface PeerJSTransportOptions {
    readonly peerId: string;
    readonly host?: string;
    readonly port?: number;
    readonly path?: string;
    readonly key?: string;
    readonly debug?: number;
    readonly config?: RTCConfiguration;
    readonly relayUrl?: string;
    readonly secure?: boolean;
}
export type { TransportEventMap };
export declare class PeerJSTransport implements ITransport {
    readonly tipo: TipoTransporte;
    readonly eventTarget: EventTarget;
    readonly nodoId: NodoId;
    private peer;
    private readonly opciones;
    private readonly conexiones;
    private readonly deduplicator;
    private conectado;
    private reconnectAttempts;
    private reconnectTimer?;
    private pendingConnectionRequests;
    constructor(nodoId: NodoId, options: PeerJSTransportOptions);
    private iniciarPeer;
    private programarReconexion;
    private programarReinit;
    private flushPendingConnections;
    private broadcastPeerList;
    on<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    off<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    private emit;
    private manejarConexion;
    private manejarDatos;
    enviar(destino: NodoId, payload: unknown, tipoMensaje?: string): Promise<void>;
    transmitir(payload: unknown, tipoMensaje?: string): Promise<void>;
    conectarRemoto(remotoId: string): Promise<void>;
    estaConectado(): boolean;
    obtenerConexiones(): readonly string[];
    cerrar(): Promise<void>;
}
//# sourceMappingURL=peerjs.d.ts.map