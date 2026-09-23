import type { EdgeMesh } from "../edge-mesh.js";
import type { PresenceManager } from "../presence/index.js";
export interface BandwidthTelemetry {
    readonly bytesSent: number;
    readonly bytesReceived: number;
    readonly txRateBytesPerSec: number;
    readonly rxRateBytesPerSec: number;
}
export interface NodeTelemetry {
    readonly nodeId: string;
    readonly timestamp: number;
    readonly uptimeMs: number;
    readonly status: "online" | "offline" | "degraded";
    readonly activePeers: number;
    readonly bandwidth: BandwidthTelemetry;
}
export interface GosBridgeConfig {
    readonly intervalMs?: number;
    readonly presence?: PresenceManager;
    readonly onTelemetry?: (telemetry: NodeTelemetry) => void;
}
export declare class GosBridge {
    readonly nodeId: string;
    private readonly mesh?;
    private readonly presence?;
    private readonly config;
    private readonly eventTarget;
    private readonly startTime;
    private bytesSent;
    private bytesReceived;
    private lastBytesSent;
    private lastBytesReceived;
    private lastSampleTime;
    private txRate;
    private rxRate;
    private intervalTimer;
    private running;
    constructor(meshOrNodeId: EdgeMesh | string, config?: GosBridgeConfig);
    recordBytesSent(bytes: number): void;
    recordBytesReceived(bytes: number): void;
    start(): void;
    stop(): void;
    isStreaming(): boolean;
    getTelemetry(): NodeTelemetry;
    private calculateRates;
    private emitTelemetry;
    onTelemetry(callback: (telemetry: NodeTelemetry) => void): () => void;
}
//# sourceMappingURL=GosBridge.d.ts.map