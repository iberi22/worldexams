/**
 * Salon registry — cross-peer room directory for mesh-first lobbies.
 *
 * Announces salon ads on namespace `salon:{codigo}` via gossip and keeps a
 * local directory for list/discover. Join-by-code for remote peers uses
 * hostPeerId from the ad (SalonesManager.unirseSalonRemoto hydrates locally).
 */
import type { MeshManager } from "../mesh/index.js";
import type { NodoId } from "../types/index.js";
export type SalonStatus = "waiting" | "active" | "closed";
export interface SalonAd {
    readonly codigo: string;
    readonly hostPeerId: NodoId;
    readonly hostNodoId: NodoId;
    readonly nombre: string;
    readonly region?: string;
    readonly subject?: string;
    readonly grade?: number;
    readonly status: SalonStatus;
    readonly createdAt: number;
    readonly maxParticipantes?: number;
}
export interface DiscoverResult {
    readonly ads: readonly SalonAd[];
    readonly peers: readonly NodoId[];
}
export declare class SalonRegistry {
    private readonly mesh;
    private readonly localNodoId;
    private readonly directory;
    private readonly pending;
    private readonly onGossip;
    constructor(opts: {
        nodoId: NodoId;
        mesh?: MeshManager | null;
    });
    dispose(): void;
    anunciar(ad: Omit<SalonAd, "createdAt" | "hostNodoId"> & {
        createdAt?: number;
    }): SalonAd;
    retirar(codigo: string): void;
    listar(region?: string): readonly SalonAd[];
    obtener(codigo: string): SalonAd | null;
    /** Upsert a remote ad (tests / inbound gossip). */
    upsert(ad: SalonAd): void;
    /**
     * Awaitable discovery: gossip ask + collect replies for timeoutMs.
     * Also returns any local directory hits immediately in the final set.
     */
    descubrir(codigo: string, timeoutMs?: number): Promise<DiscoverResult>;
    private handleGossipPayload;
}
//# sourceMappingURL=registry.d.ts.map