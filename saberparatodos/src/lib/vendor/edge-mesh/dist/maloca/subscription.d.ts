import type { MeshManager } from "../mesh/index.js";
import type { EventBus } from "./event-bus.js";
import type { KarmaManager } from "./karma.js";
export declare const SUBSCRIPTION_TIER: {
    readonly FREE: "free";
    readonly PRO: "pro";
    readonly ENTERPRISE: "enterprise";
};
export type SubscriptionTier = (typeof SUBSCRIPTION_TIER)[keyof typeof SUBSCRIPTION_TIER];
export declare const SUBSCRIPTION_STATUS: {
    readonly ACTIVE: "active";
    readonly GRACE: "grace";
    readonly EXPIRED: "expired";
};
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];
/** Grace period tras fallar compliance (RF-003). */
export declare const GRACE_PERIOD_MS: number;
/** Ventana rolling de uptime (30 días). */
export declare const UPTIME_WINDOW_MS: number;
export interface SubscriptionRequirements {
    readonly minUptimeHours: number;
    readonly minUptimeRatio: number;
    readonly minKarma: number;
    readonly minPeersConnected: number;
    readonly minStorageGB?: number;
}
/** Requisitos por defecto (RF-003: pro ≥95% uptime, karma≥100, ≥3 peers). */
export declare const REQUIREMENTS_POR_TIER: Readonly<Record<SubscriptionTier, SubscriptionRequirements>>;
export interface SubscriptionCompliance {
    readonly uptimeOk: boolean;
    readonly karmaOk: boolean;
    readonly peersOk: boolean;
    readonly storageOk: boolean;
    readonly lastCheck: number;
    readonly uptimeRatio: number;
    readonly karmaScore: number;
    readonly peersConnected: number;
    readonly failures: readonly string[];
}
export interface Subscription {
    readonly peerId: string;
    readonly tier: SubscriptionTier;
    readonly status: SubscriptionStatus;
    readonly requirements: SubscriptionRequirements;
    readonly compliance: SubscriptionCompliance;
    readonly subscribedAt: number;
    readonly graceStartedAt: number | null;
    readonly storageGB: number;
}
export interface SubscriptionManagerDeps {
    readonly karma?: KarmaManager;
    readonly mesh?: MeshManager;
    readonly eventBus?: EventBus;
    readonly now?: () => number;
    /** Intervalo esperado entre heartbeats (ms) para estimar uptime. */
    readonly heartbeatIntervalMs?: number;
}
export interface HeartbeatMetrics {
    readonly peersConnected?: number;
    readonly karmaScore?: number;
    readonly storageGB?: number;
    readonly uptimeRatio?: number;
}
export interface SubscriptionEventMap {
    subscriptionCreada: CustomEvent<{
        readonly sub: Subscription;
    }>;
    subscriptionActualizada: CustomEvent<{
        readonly sub: Subscription;
    }>;
    complianceFallida: CustomEvent<{
        readonly peerId: string;
        readonly failures: readonly string[];
        readonly status: SubscriptionStatus;
    }>;
    graceIniciada: CustomEvent<{
        readonly peerId: string;
        readonly graceStartedAt: number;
    }>;
    subscriptionExpirada: CustomEvent<{
        readonly peerId: string;
    }>;
}
/**
 * SubscriptionManager — gate de suscripción mesh (RF-003).
 *
 * Free: puede operar, pero `canVote` / `canCreateSubnet` = false.
 * Pro/Enterprise: compliance en cada heartbeat; fallo → grace 7d → expired.
 */
export declare class SubscriptionManager {
    readonly eventTarget: EventTarget;
    private readonly subs;
    private readonly karma;
    private readonly mesh;
    private readonly eventBus;
    private readonly now;
    private readonly heartbeatIntervalMs;
    private heartbeatUnsub;
    constructor(deps?: SubscriptionManagerDeps);
    /** Engancha compliance al MESH_HEARTBEAT del EventBus (si existe). */
    attachToEventBus(): void;
    detachFromEventBus(): void;
    subscribe(peerId: string, tier?: SubscriptionTier, overrides?: Partial<SubscriptionRequirements>): Subscription;
    get(peerId: string): Subscription | null;
    list(): readonly Subscription[];
    setStorageGB(peerId: string, storageGB: number): void;
    upgrade(peerId: string, tier: SubscriptionTier): Subscription | null;
    /**
     * Llamar en cada heartbeat del peer.
     * Calcula compliance real (karma + peers mesh + uptime rolling) y
     * transiciona active → grace → expired.
     */
    onHeartbeat(peerId: string, metrics?: HeartbeatMetrics): Subscription | null;
    /** Alias explícito: compliance check cada heartbeat. */
    checkCompliance(peerId: string): SubscriptionCompliance | null;
    /** Free no vota. Pro/enterprise solo si active (no grace/expired). */
    canVote(peerId: string): boolean;
    /** Free no crea subredes. Pro/enterprise solo si active. */
    canCreateSubnet(peerId: string): boolean;
    isProEnabled(peerId: string): boolean;
    revoke(peerId: string): void;
    on<K extends keyof SubscriptionEventMap>(tipo: K, handler: (ev: SubscriptionEventMap[K]) => void): void;
    off<K extends keyof SubscriptionEventMap>(tipo: K, handler: (ev: SubscriptionEventMap[K]) => void): void;
    private pruneHeartbeats;
    private computeUptimeRatio;
    private evaluateCompliance;
    private applyComplianceTransition;
    private emit;
}
//# sourceMappingURL=subscription.d.ts.map