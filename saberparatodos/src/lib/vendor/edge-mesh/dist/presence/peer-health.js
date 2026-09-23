// ─── PEER HEALTH MONITOR + RECONNECT BACKOFF ───────────────────────────────
// Lightweight helpers used by app-layer transports (e.g. p2p-mesh-core).
export function getReconnectDelay(attempt, options = {}) {
    const initialDelayMs = options.initialDelayMs ?? 1_000;
    const maxDelayMs = options.maxDelayMs ?? 30_000;
    const jitterRatio = options.jitterRatio ?? 0;
    const baseDelay = Math.min(initialDelayMs * 2 ** Math.max(0, attempt), maxDelayMs);
    if (jitterRatio <= 0)
        return baseDelay;
    const random = options.random ?? Math.random;
    const jitter = baseDelay * jitterRatio * random();
    return Math.min(Math.round(baseDelay + jitter), maxDelayMs);
}
class PeerHealthMonitorImpl {
    peers = new Map();
    listeners = new Map();
    now;
    staleAfterMs;
    offlineAfterMs;
    constructor(options = {}) {
        this.now = options.now ?? (() => Date.now());
        this.staleAfterMs = options.staleAfterMs ?? 30_000;
        this.offlineAfterMs = options.offlineAfterMs ?? 60_000;
    }
    on(eventName, listener) {
        const set = this.listeners.get(eventName) ?? new Set();
        set.add(listener);
        this.listeners.set(eventName, set);
        return this;
    }
    off(eventName, listener) {
        this.listeners
            .get(eventName)
            ?.delete(listener);
        return this;
    }
    emit(eventName, payload) {
        const set = this.listeners.get(eventName);
        if (!set)
            return;
        for (const listener of set)
            listener(payload);
    }
    markConnected(peerId) {
        return this.setStatus(peerId, "healthy", { lastSeen: this.now() });
    }
    markPing(peerId) {
        const current = this.getOrCreate(peerId);
        return this.setStatus(peerId, current.status, { lastPingAt: this.now() });
    }
    markPong(peerId) {
        return this.setStatus(peerId, "healthy", {
            lastSeen: this.now(),
            lastPongAt: this.now(),
        });
    }
    markOffline(peerId) {
        return this.setStatus(peerId, "offline", {
            lastSeen: this.getOrCreate(peerId).lastSeen,
        });
    }
    reportSyncError(peerId, error) {
        this.emit("sync:error", { peerId, error });
    }
    sweep() {
        const now = this.now();
        const changed = [];
        for (const state of this.peers.values()) {
            if (state.status === "offline")
                continue;
            const age = now - state.lastSeen;
            if (age >= this.offlineAfterMs) {
                changed.push(this.setStatus(state.peerId, "offline"));
            }
            else if (age >= this.staleAfterMs && state.status !== "stale") {
                changed.push(this.setStatus(state.peerId, "stale"));
            }
        }
        return changed;
    }
    get(peerId) {
        const state = this.peers.get(peerId);
        return state ? { ...state } : undefined;
    }
    list() {
        return Array.from(this.peers.values()).map((state) => ({ ...state }));
    }
    getOrCreate(peerId) {
        const existing = this.peers.get(peerId);
        if (existing)
            return existing;
        const state = {
            peerId,
            status: "healthy",
            lastSeen: this.now(),
        };
        this.peers.set(peerId, state);
        return state;
    }
    setStatus(peerId, status, patch = {}) {
        const previous = this.getOrCreate(peerId);
        const next = {
            ...previous,
            ...patch,
            peerId,
            status,
        };
        this.peers.set(peerId, next);
        if (previous.status !== next.status || status === "healthy") {
            this.emit(`peer:${status}`, { ...next });
        }
        return { ...next };
    }
}
export function createPeerHealthMonitor(options = {}) {
    return new PeerHealthMonitorImpl(options);
}
//# sourceMappingURL=peer-health.js.map