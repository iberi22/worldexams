import type { NodoId, TipoMensaje, TipoTransporte } from "../types/index.js";
import type { ITransport, TransportEventMap } from "./types.js";
export interface TorConfig {
    readonly enabled: boolean;
    readonly localPort?: number;
    readonly dataDir?: string;
    readonly socksPort?: number;
    readonly controlPort?: number;
    readonly torBinary?: string;
}
export declare const DEFAULT_TOR_CONFIG: TorConfig;
/**
 * Resolve data directory for Tor state and hidden service keys.
 */
export declare function getTorDataDir(customPath?: string): string;
/**
 * Generate standard torrc configuration for an Onion v3 Hidden Service.
 */
export declare function generateTorrc(config: TorConfig, dataDir: string): string;
/**
 * TorOnionTransport provides opt-in Tor Onion v3 Hidden Service connectivity.
 */
export declare class TorOnionTransport implements ITransport {
    readonly tipo: TipoTransporte;
    readonly eventTarget: EventTarget;
    readonly nodoId: NodoId;
    readonly config: TorConfig;
    private readonly deduplicator;
    private torProcess;
    private onionAddress;
    private conectado;
    private readonly dataDir;
    constructor(nodoId: NodoId, config?: Partial<TorConfig>);
    start(localPort?: number): Promise<string | null>;
    getOnionAddress(): string | null;
    conectar(_peerId: string): Promise<void>;
    desconectar(): Promise<void>;
    transmitir(datos: unknown, tipo?: TipoMensaje): Promise<void>;
    enviar(destino: NodoId, datos: unknown, tipo?: TipoMensaje): Promise<void>;
    obtenerConexiones(): readonly string[];
    estaConectado(): boolean;
    cerrar(): Promise<void>;
    on<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    off<K extends keyof TransportEventMap>(tipo: K, handler: (ev: TransportEventMap[K]) => void): void;
    private emit;
}
//# sourceMappingURL=tor.d.ts.map