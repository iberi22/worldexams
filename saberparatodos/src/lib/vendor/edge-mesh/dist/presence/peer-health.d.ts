export type PeerHealthStatus = "healthy" | "stale" | "offline";
export interface PeerHealthState {
    readonly peerId: string;
    readonly status: PeerHealthStatus;
    readonly lastSeen: number;
    readonly lastPingAt?: number;
    readonly lastPongAt?: number;
}
export interface PeerHealthMonitorOptions {
    readonly staleAfterMs?: number;
    readonly offlineAfterMs?: number;
    readonly now?: () => number;
}
export interface ReconnectDelayOptions {
    readonly initialDelayMs?: number;
    readonly maxDelayMs?: number;
    readonly jitterRatio?: number;
    readonly random?: () => number;
}
type HealthEventName = "peer:healthy" | "peer:stale" | "peer:offline" | "sync:error";
export type PeerHealthEventPayload = PeerHealthState | {
    peerId: string;
    error: unknown;
};
export interface PeerHealthMonitor {
    on(eventName: HealthEventName, listener: (...args: never[]) => void): PeerHealthMonitor;
    off(eventName: HealthEventName, listener: (...args: never[]) => void): PeerHealthMonitor;
    markConnected(peerId: string): PeerHealthState;
    markPing(peerId: string): PeerHealthState;
    markPong(peerId: string): PeerHealthState;
    markOffline(peerId: string): PeerHealthState;
    reportSyncError(peerId: string, error: unknown): void;
    sweep(): PeerHealthState[];
    get(peerId: string): PeerHealthState | undefined;
    list(): PeerHealthState[];
}
export declare function getReconnectDelay(attempt: number, options?: ReconnectDelayOptions): number;
export declare function createPeerHealthMonitor(options?: PeerHealthMonitorOptions): PeerHealthMonitor;
export {};
//# sourceMappingURL=peer-health.d.ts.map