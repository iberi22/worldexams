import { EventEmitter } from "node:events";
export interface IceServerConfig {
    urls: string | string[];
    username?: string;
    credential?: string;
}
export interface RelayServerOptions {
    port?: number;
    host?: string;
    path?: string;
    key?: string;
    iceServers?: IceServerConfig[];
    rateLimitTokensPerSec?: number;
    rateLimitMaxTokens?: number;
}
export declare class RelayServer extends EventEmitter {
    private readonly port;
    private readonly host;
    private readonly path;
    private readonly key;
    private readonly iceServers;
    private readonly rateLimiter;
    private httpServer?;
    private wss?;
    private clients;
    private running;
    private actualPort;
    constructor(options?: RelayServerOptions);
    start(): Promise<number>;
    private handleConnection;
    private handleSignalingMessage;
    getConnectedPeers(): string[];
    getPort(): number;
    getIceServers(): IceServerConfig[];
    close(): Promise<void>;
}
//# sourceMappingURL=relay-server.d.ts.map