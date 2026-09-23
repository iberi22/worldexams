/**
 * Salon registry — cross-peer room directory for mesh-first lobbies.
 *
 * Announces salon ads on namespace `salon:{codigo}` via gossip and keeps a
 * local directory for list/discover. Join-by-code for remote peers uses
 * hostPeerId from the ad (SalonesManager.unirseSalonRemoto hydrates locally).
 */
import { generarId } from "../protocol/utils.js";
const DISCOVER_DEFAULT_MS = 2_500;
function isSalonAd(value) {
    if (!value || typeof value !== "object")
        return false;
    const v = value;
    return (typeof v.codigo === "string" &&
        typeof v.hostPeerId === "string" &&
        typeof v.hostNodoId === "string" &&
        typeof v.nombre === "string" &&
        typeof v.status === "string" &&
        typeof v.createdAt === "number");
}
export class SalonRegistry {
    mesh;
    localNodoId;
    directory = new Map();
    pending = new Map();
    onGossip;
    constructor(opts) {
        this.localNodoId = opts.nodoId;
        this.mesh = opts.mesh ?? null;
        this.onGossip = ((ev) => {
            const detail = ev.detail;
            this.handleGossipPayload(detail?.mensaje?.payload);
        });
        if (this.mesh) {
            this.mesh.addEventListener("gossipRecibido", this.onGossip);
        }
    }
    dispose() {
        if (this.mesh) {
            this.mesh.removeEventListener("gossipRecibido", this.onGossip);
        }
        for (const p of this.pending.values())
            clearTimeout(p.timer);
        this.pending.clear();
    }
    anunciar(ad) {
        const full = {
            ...ad,
            hostNodoId: this.localNodoId,
            createdAt: ad.createdAt ?? Date.now(),
        };
        this.directory.set(full.codigo, full);
        void this.mesh?.unirANamespace(`salon:${full.codigo}`);
        void this.mesh?.transmitirConGossip(`salon:${full.codigo}`, {
            tipo: "salon_announce",
            ad: full,
        });
        return full;
    }
    retirar(codigo) {
        const existing = this.directory.get(codigo);
        if (existing) {
            const closed = { ...existing, status: "closed" };
            this.directory.set(codigo, closed);
            void this.mesh?.transmitirConGossip(`salon:${codigo}`, {
                tipo: "salon_announce",
                ad: closed,
            });
        }
        this.directory.delete(codigo);
        void this.mesh?.abandonarNamespace(`salon:${codigo}`);
    }
    listar(region) {
        const all = Array.from(this.directory.values()).filter((a) => a.status !== "closed");
        if (!region)
            return all;
        const want = region.toUpperCase();
        return all.filter((a) => !a.region || a.region.toUpperCase() === want || a.region.toUpperCase() === "LATAM");
    }
    obtener(codigo) {
        return this.directory.get(codigo) ?? null;
    }
    /** Upsert a remote ad (tests / inbound gossip). */
    upsert(ad) {
        if (ad.status === "closed") {
            this.directory.delete(ad.codigo);
            return;
        }
        this.directory.set(ad.codigo, ad);
    }
    /**
     * Awaitable discovery: gossip ask + collect replies for timeoutMs.
     * Also returns any local directory hits immediately in the final set.
     */
    async descubrir(codigo, timeoutMs = DISCOVER_DEFAULT_MS) {
        const local = this.directory.get(codigo);
        if (local && local.status !== "closed") {
            return { ads: [local], peers: [local.hostPeerId] };
        }
        if (!this.mesh) {
            return { ads: [], peers: [] };
        }
        const preguntaId = `discover:${codigo}:${generarId()}`;
        const ads = new Map();
        const peers = new Set();
        const result = await new Promise((resolve) => {
            const timer = setTimeout(() => {
                this.pending.delete(preguntaId);
                resolve({ ads: Array.from(ads.values()), peers: Array.from(peers) });
            }, timeoutMs);
            this.pending.set(preguntaId, { resolve, timer, ads, peers });
            void this.mesh.transmitirConGossip(this.mesh.obtenerNamespaces()[0] ?? "global", {
                tipo: "discover",
                salonId: codigo,
                preguntaId,
            });
            // Also ask specifically on salon namespace
            void this.mesh.transmitirConGossip(`salon:${codigo}`, {
                tipo: "discover",
                salonId: codigo,
                preguntaId,
            });
        });
        return result;
    }
    handleGossipPayload(payload) {
        if (!payload || typeof payload !== "object")
            return;
        const p = payload;
        if (p.tipo === "salon_announce" && isSalonAd(p.ad)) {
            this.upsert(p.ad);
            // Satisfy any pending discovers for this code
            for (const [id, pending] of this.pending) {
                if (id.includes(p.ad.codigo)) {
                    pending.ads.set(p.ad.codigo, p.ad);
                    pending.peers.add(p.ad.hostPeerId);
                }
            }
            return;
        }
        if (p.tipo === "discover" && typeof p.salonId === "string" && typeof p.preguntaId === "string") {
            const ad = this.directory.get(p.salonId);
            if (ad && ad.hostNodoId === this.localNodoId) {
                void this.mesh?.transmitirConGossip(`salon:${p.salonId}`, {
                    tipo: "discover_response",
                    preguntaId: p.preguntaId,
                    ad,
                });
            }
            return;
        }
        if (p.tipo === "discover_response" && typeof p.preguntaId === "string" && isSalonAd(p.ad)) {
            const pending = this.pending.get(p.preguntaId);
            if (pending) {
                pending.ads.set(p.ad.codigo, p.ad);
                pending.peers.add(p.ad.hostPeerId);
                this.upsert(p.ad);
                clearTimeout(pending.timer);
                this.pending.delete(p.preguntaId);
                pending.resolve({
                    ads: Array.from(pending.ads.values()),
                    peers: Array.from(pending.peers),
                });
            }
            else {
                this.upsert(p.ad);
            }
        }
    }
}
//# sourceMappingURL=registry.js.map