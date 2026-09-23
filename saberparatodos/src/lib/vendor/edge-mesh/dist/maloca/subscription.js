import { TIPO_EVENTO_MALOCA } from "./event-bus.js";
// ─── RF-003: Sistema de Suscripciones ──────────────────────────────────────
// Pro = nodo activo en la mesh (uptime + karma + peers). Sin Stripe.
// Free opera normal pero NO vota ni crea subredes.
// Compliance se verifica en cada heartbeat; fallo → grace 7d → expired.
export const SUBSCRIPTION_TIER = {
    FREE: "free",
    PRO: "pro",
    ENTERPRISE: "enterprise",
};
export const SUBSCRIPTION_STATUS = {
    ACTIVE: "active",
    GRACE: "grace",
    EXPIRED: "expired",
};
/** Grace period tras fallar compliance (RF-003). */
export const GRACE_PERIOD_MS = 7 * 24 * 60 * 60 * 1000;
/** Ventana rolling de uptime (30 días). */
export const UPTIME_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
/** Requisitos por defecto (RF-003: pro ≥95% uptime, karma≥100, ≥3 peers). */
export const REQUIREMENTS_POR_TIER = {
    free: {
        minUptimeHours: 0,
        minUptimeRatio: 0,
        minKarma: 0,
        minPeersConnected: 0,
    },
    pro: {
        minUptimeHours: 0.95 * 30 * 24,
        minUptimeRatio: 0.95,
        minKarma: 100,
        minPeersConnected: 3,
    },
    enterprise: {
        minUptimeHours: 0.99 * 30 * 24,
        minUptimeRatio: 0.99,
        minKarma: 500,
        minPeersConnected: 5,
        minStorageGB: 10,
    },
};
function emptyCompliance(now) {
    return {
        uptimeOk: true,
        karmaOk: true,
        peersOk: true,
        storageOk: true,
        lastCheck: now,
        uptimeRatio: 1,
        karmaScore: 0,
        peersConnected: 0,
        failures: [],
    };
}
function snapshot(sub) {
    return {
        peerId: sub.peerId,
        tier: sub.tier,
        status: sub.status,
        requirements: { ...sub.requirements },
        compliance: { ...sub.compliance, failures: [...sub.compliance.failures] },
        subscribedAt: sub.subscribedAt,
        graceStartedAt: sub.graceStartedAt,
        storageGB: sub.storageGB,
    };
}
/**
 * SubscriptionManager — gate de suscripción mesh (RF-003).
 *
 * Free: puede operar, pero `canVote` / `canCreateSubnet` = false.
 * Pro/Enterprise: compliance en cada heartbeat; fallo → grace 7d → expired.
 */
export class SubscriptionManager {
    eventTarget;
    subs = new Map();
    karma;
    mesh;
    eventBus;
    now;
    heartbeatIntervalMs;
    heartbeatUnsub = null;
    constructor(deps = {}) {
        this.eventTarget = new EventTarget();
        this.karma = deps.karma;
        this.mesh = deps.mesh;
        this.eventBus = deps.eventBus;
        this.now = deps.now ?? (() => Date.now());
        this.heartbeatIntervalMs = deps.heartbeatIntervalMs ?? 5_000;
    }
    /** Engancha compliance al MESH_HEARTBEAT del EventBus (si existe). */
    attachToEventBus() {
        if (!this.eventBus || this.heartbeatUnsub)
            return;
        const handler = (evento) => {
            const payload = (evento.payload ?? {});
            this.onHeartbeat(evento.origen, {
                peersConnected: payload.peersConocidos?.length,
                storageGB: payload.storageGB,
            });
        };
        this.eventBus.subscribe(TIPO_EVENTO_MALOCA.MESH_HEARTBEAT, handler);
        this.heartbeatUnsub = () => {
            this.eventBus?.unsubscribe(TIPO_EVENTO_MALOCA.MESH_HEARTBEAT, handler);
        };
    }
    detachFromEventBus() {
        this.heartbeatUnsub?.();
        this.heartbeatUnsub = null;
    }
    subscribe(peerId, tier = SUBSCRIPTION_TIER.FREE, overrides) {
        const now = this.now();
        const requirements = {
            ...REQUIREMENTS_POR_TIER[tier],
            ...overrides,
        };
        const existing = this.subs.get(peerId);
        const sub = {
            peerId,
            tier,
            status: SUBSCRIPTION_STATUS.ACTIVE,
            requirements,
            compliance: emptyCompliance(now),
            subscribedAt: existing?.subscribedAt ?? now,
            graceStartedAt: null,
            storageGB: existing?.storageGB ?? 0,
            heartbeats: existing?.heartbeats ?? [now],
        };
        this.subs.set(peerId, sub);
        const snap = snapshot(sub);
        this.emit("subscriptionCreada", { sub: snap });
        return snap;
    }
    get(peerId) {
        const sub = this.subs.get(peerId);
        return sub ? snapshot(sub) : null;
    }
    list() {
        return Array.from(this.subs.values()).map(snapshot);
    }
    setStorageGB(peerId, storageGB) {
        const sub = this.subs.get(peerId);
        if (!sub)
            return;
        sub.storageGB = Math.max(0, storageGB);
    }
    upgrade(peerId, tier) {
        const sub = this.subs.get(peerId);
        if (!sub)
            return null;
        sub.tier = tier;
        sub.requirements = { ...REQUIREMENTS_POR_TIER[tier] };
        sub.status = SUBSCRIPTION_STATUS.ACTIVE;
        sub.graceStartedAt = null;
        const snap = snapshot(sub);
        this.emit("subscriptionActualizada", { sub: snap });
        return snap;
    }
    /**
     * Llamar en cada heartbeat del peer.
     * Calcula compliance real (karma + peers mesh + uptime rolling) y
     * transiciona active → grace → expired.
     */
    onHeartbeat(peerId, metrics) {
        let sub = this.subs.get(peerId);
        if (!sub) {
            this.subscribe(peerId, SUBSCRIPTION_TIER.FREE);
            sub = this.subs.get(peerId);
        }
        const now = this.now();
        sub.heartbeats.push(now);
        this.pruneHeartbeats(sub, now);
        if (metrics?.storageGB !== undefined) {
            sub.storageGB = metrics.storageGB;
        }
        const compliance = this.evaluateCompliance(sub, now, metrics);
        sub.compliance = compliance;
        const previously = sub.status;
        if (sub.tier === SUBSCRIPTION_TIER.FREE) {
            // Free siempre "active" operativamente; gates restringen acciones.
            sub.status = SUBSCRIPTION_STATUS.ACTIVE;
            sub.graceStartedAt = null;
        }
        else {
            this.applyComplianceTransition(sub, compliance, now);
        }
        const snap = snapshot(sub);
        this.emit("subscriptionActualizada", { sub: snap });
        if (compliance.failures.length > 0 && sub.tier !== SUBSCRIPTION_TIER.FREE) {
            this.emit("complianceFallida", {
                peerId,
                failures: compliance.failures,
                status: sub.status,
            });
        }
        if (previously !== SUBSCRIPTION_STATUS.GRACE &&
            sub.status === SUBSCRIPTION_STATUS.GRACE) {
            this.emit("graceIniciada", {
                peerId,
                graceStartedAt: sub.graceStartedAt ?? now,
            });
        }
        if (previously !== SUBSCRIPTION_STATUS.EXPIRED &&
            sub.status === SUBSCRIPTION_STATUS.EXPIRED) {
            this.emit("subscriptionExpirada", { peerId });
        }
        return snap;
    }
    /** Alias explícito: compliance check cada heartbeat. */
    checkCompliance(peerId) {
        const result = this.onHeartbeat(peerId);
        return result?.compliance ?? null;
    }
    /** Free no vota. Pro/enterprise solo si active (no grace/expired). */
    canVote(peerId) {
        const sub = this.subs.get(peerId);
        if (!sub)
            return false;
        if (sub.tier === SUBSCRIPTION_TIER.FREE)
            return false;
        return sub.status === SUBSCRIPTION_STATUS.ACTIVE;
    }
    /** Free no crea subredes. Pro/enterprise solo si active. */
    canCreateSubnet(peerId) {
        return this.canVote(peerId);
    }
    isProEnabled(peerId) {
        const sub = this.subs.get(peerId);
        if (!sub)
            return false;
        return ((sub.tier === SUBSCRIPTION_TIER.PRO ||
            sub.tier === SUBSCRIPTION_TIER.ENTERPRISE) &&
            sub.status === SUBSCRIPTION_STATUS.ACTIVE);
    }
    revoke(peerId) {
        const sub = this.subs.get(peerId);
        if (!sub)
            return;
        sub.status = SUBSCRIPTION_STATUS.EXPIRED;
        sub.graceStartedAt = null;
        this.emit("subscriptionExpirada", { peerId });
        this.emit("subscriptionActualizada", { sub: snapshot(sub) });
    }
    on(tipo, handler) {
        this.eventTarget.addEventListener(tipo, handler);
    }
    off(tipo, handler) {
        this.eventTarget.removeEventListener(tipo, handler);
    }
    // ─── INTERNOS ──────────────────────────────────────────────────────────
    pruneHeartbeats(sub, now) {
        const cutoff = now - UPTIME_WINDOW_MS;
        sub.heartbeats = sub.heartbeats.filter((t) => t >= cutoff);
    }
    computeUptimeRatio(sub, now) {
        const windowStart = Math.max(sub.subscribedAt, now - UPTIME_WINDOW_MS);
        const windowMs = Math.max(1, now - windowStart);
        const expected = Math.max(1, Math.floor(windowMs / this.heartbeatIntervalMs));
        const observed = sub.heartbeats.filter((t) => t >= windowStart).length;
        return Math.min(1, observed / expected);
    }
    evaluateCompliance(sub, now, metrics) {
        const req = sub.requirements;
        const uptimeRatio = metrics?.uptimeRatio ?? this.computeUptimeRatio(sub, now);
        const karmaScore = metrics?.karmaScore ?? this.karma?.getScore(sub.peerId) ?? 0;
        const peersConnected = metrics?.peersConnected ?? this.mesh?.obtenerPeersActivos().length ?? 0;
        const storageGB = metrics?.storageGB ?? sub.storageGB;
        const failures = [];
        const uptimeOk = uptimeRatio >= req.minUptimeRatio;
        if (!uptimeOk) {
            failures.push(`uptime ${(uptimeRatio * 100).toFixed(1)}% < ${(req.minUptimeRatio * 100).toFixed(0)}%`);
        }
        const karmaOk = karmaScore >= req.minKarma;
        if (!karmaOk) {
            failures.push(`karma ${karmaScore} < ${req.minKarma}`);
        }
        const peersOk = peersConnected >= req.minPeersConnected;
        if (!peersOk) {
            failures.push(`peers ${peersConnected} < ${req.minPeersConnected}`);
        }
        const storageOk = req.minStorageGB === undefined || storageGB >= req.minStorageGB;
        if (!storageOk) {
            failures.push(`storage ${storageGB}GB < ${req.minStorageGB}GB`);
        }
        return {
            uptimeOk,
            karmaOk,
            peersOk,
            storageOk,
            lastCheck: now,
            uptimeRatio,
            karmaScore,
            peersConnected,
            failures,
        };
    }
    applyComplianceTransition(sub, compliance, now) {
        const ok = compliance.uptimeOk &&
            compliance.karmaOk &&
            compliance.peersOk &&
            compliance.storageOk;
        if (ok) {
            sub.status = SUBSCRIPTION_STATUS.ACTIVE;
            sub.graceStartedAt = null;
            return;
        }
        if (sub.status === SUBSCRIPTION_STATUS.ACTIVE) {
            sub.status = SUBSCRIPTION_STATUS.GRACE;
            sub.graceStartedAt = now;
            return;
        }
        if (sub.status === SUBSCRIPTION_STATUS.GRACE) {
            const started = sub.graceStartedAt ?? now;
            if (now - started >= GRACE_PERIOD_MS) {
                sub.status = SUBSCRIPTION_STATUS.EXPIRED;
            }
        }
        // expired permanece expired hasta upgrade/subscribe explícito
    }
    emit(tipo, detalle) {
        this.eventTarget.dispatchEvent(new CustomEvent(tipo, { detail: detalle }));
    }
}
//# sourceMappingURL=subscription.js.map