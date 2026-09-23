import type { PostQuantumIdentity } from "../identity/index.js";
import type { Envolvente, ParPublico } from "../types/index.js";
/**
 * Topic constant for market dataset offers gossip.
 */
export declare const OFFERS_TOPIC: "swal/data-commons/offers";
export declare const SWAL_DATA_COMMONS_OFFERS: "swal/data-commons/offers";
/**
 * DataOffer schema matching docs/SWAL/MARKETPLACE_MALOCA_INTEGRATION.md §5
 */
export interface DataOffer {
    id: string;
    seller_node: string;
    app_id: string;
    title: string;
    tags: string[];
    price?: number | string;
    price_semantics?: number | string;
    license: string;
    size?: number;
    size_bytes?: number;
    content_hash: string;
    signature: string;
    created_at: number;
    active: boolean;
}
export interface OffersGossipConfig {
    identity?: PostQuantumIdentity;
    ttlMs?: number;
    rateLimiterConfig?: {
        tokensPerInterval: number;
        intervalMs: number;
        maxTokens: number;
    };
    getCurrentTime?: () => number;
}
/**
 * Returns canonical string representation of offer fields used for signing/verifying.
 */
export declare function getOfferSigningString(offer: Omit<DataOffer, "signature"> | DataOffer): string;
/**
 * OffersGossip manages dataset offer publishing, receiving, signature verification (ML-DSA-65),
 * per-node rate limiting, and TTL pruning over the topic `swal/data-commons/offers`.
 */
export declare class OffersGossip {
    readonly topic: string;
    private readonly identity?;
    private readonly ttlMs;
    private readonly rateLimiter;
    private readonly getCurrentTime;
    private readonly offers;
    private readonly listeners;
    constructor(config?: OffersGossipConfig);
    /**
     * Sign a DataOffer using the provided PostQuantumIdentity (ML-DSA-65).
     */
    static signOffer(offerInput: Omit<DataOffer, "signature">, identity: PostQuantumIdentity): Promise<DataOffer>;
    /**
     * Verify a DataOffer signature using ML-DSA-65 public key.
     */
    static verifyOfferSignature(offer: DataOffer, publicKey: ParPublico | string, identity: PostQuantumIdentity): Promise<boolean>;
    /**
     * Publish a new dataset offer onto the `swal/data-commons/offers` gossip topic.
     */
    publishOffer(offerParams: Omit<DataOffer, "signature" | "created_at" | "seller_node"> & {
        seller_node?: string;
        created_at?: number;
        signature?: string;
    }, overrideIdentity?: PostQuantumIdentity): Promise<{
        offer: DataOffer;
        envelope: Envolvente;
    }>;
    /**
     * Receive and process an incoming envelope on the gossip network.
     */
    receiveOfferEnvelope(envelope: Envolvente, sellerPublicKey?: ParPublico | string, verifierIdentity?: PostQuantumIdentity): Promise<{
        success: boolean;
        offer?: DataOffer;
        reason?: string;
    }>;
    /**
     * Prune offers older than configured TTL or inactive offers.
     * Returns the number of offers removed.
     */
    pruneExpiredOffers(now?: number): number;
    /**
     * Subscribe to incoming valid offer events.
     */
    onOffer(fn: (offer: DataOffer, env: Envolvente) => void): () => void;
    getOffer(id: string): DataOffer | undefined;
    listOffers(): DataOffer[];
    getActiveOffers(now?: number): DataOffer[];
    clear(): void;
}
//# sourceMappingURL=offers-gossip.d.ts.map