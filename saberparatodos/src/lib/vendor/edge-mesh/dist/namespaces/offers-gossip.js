import { canonicalStringify } from "../protocol/canonical.js";
import { createEnvelope, signEnvelope, validateEnvelope, verifyEnvelopeSignature, } from "../protocol/index.js";
import { hexABytes } from "../protocol/utils.js";
import { TokenBucketRateLimiter } from "../security/rate-limiter.js";
import { TIPO_MENSAJE } from "../types/index.js";
/**
 * Topic constant for market dataset offers gossip.
 */
export const OFFERS_TOPIC = "swal/data-commons/offers";
export const SWAL_DATA_COMMONS_OFFERS = OFFERS_TOPIC;
/**
 * Returns canonical string representation of offer fields used for signing/verifying.
 */
export function getOfferSigningString(offer) {
    const priceVal = offer.price_semantics ?? offer.price ?? 0;
    const sizeVal = offer.size_bytes ?? offer.size ?? 0;
    const payload = {
        active: offer.active,
        app_id: offer.app_id,
        content_hash: offer.content_hash,
        created_at: offer.created_at,
        id: offer.id,
        license: offer.license,
        price_semantics: priceVal,
        seller_node: offer.seller_node,
        size_bytes: sizeVal,
        tags: [...offer.tags].sort(),
        title: offer.title,
    };
    return canonicalStringify(payload);
}
/**
 * OffersGossip manages dataset offer publishing, receiving, signature verification (ML-DSA-65),
 * per-node rate limiting, and TTL pruning over the topic `swal/data-commons/offers`.
 */
export class OffersGossip {
    topic = OFFERS_TOPIC;
    identity;
    ttlMs;
    rateLimiter;
    getCurrentTime;
    offers = new Map();
    listeners = new Set();
    constructor(config = {}) {
        this.identity = config.identity;
        // Default TTL: 7 days
        this.ttlMs = config.ttlMs ?? 7 * 24 * 60 * 60 * 1000;
        this.getCurrentTime = config.getCurrentTime ?? (() => Date.now());
        const rlConfig = config.rateLimiterConfig ?? {
            tokensPerInterval: 10,
            intervalMs: 1000,
            maxTokens: 20,
        };
        this.rateLimiter = new TokenBucketRateLimiter(rlConfig);
    }
    /**
     * Sign a DataOffer using the provided PostQuantumIdentity (ML-DSA-65).
     */
    static async signOffer(offerInput, identity) {
        const signingStr = getOfferSigningString(offerInput);
        const signatureHex = await identity.sign(signingStr);
        return {
            ...offerInput,
            signature: signatureHex,
        };
    }
    /**
     * Verify a DataOffer signature using ML-DSA-65 public key.
     */
    static async verifyOfferSignature(offer, publicKey, identity) {
        if (!offer.signature)
            return false;
        const signingStr = getOfferSigningString(offer);
        const pubKeyBytes = typeof publicKey === "string" ? hexABytes(publicKey) : publicKey;
        return identity.verify(signingStr, offer.signature, pubKeyBytes);
    }
    /**
     * Publish a new dataset offer onto the `swal/data-commons/offers` gossip topic.
     */
    async publishOffer(offerParams, overrideIdentity) {
        const activeIdentity = overrideIdentity ?? this.identity;
        if (!activeIdentity) {
            throw new Error("PostQuantumIdentity is required to publish an offer");
        }
        const sellerNode = offerParams.seller_node ?? activeIdentity.nodoId;
        const createdAt = offerParams.created_at ?? this.getCurrentTime();
        const baseOffer = {
            id: offerParams.id,
            seller_node: sellerNode,
            app_id: offerParams.app_id,
            title: offerParams.title,
            tags: offerParams.tags,
            price: offerParams.price,
            price_semantics: offerParams.price_semantics ?? offerParams.price,
            license: offerParams.license,
            size: offerParams.size,
            size_bytes: offerParams.size_bytes ?? offerParams.size,
            content_hash: offerParams.content_hash,
            created_at: createdAt,
            active: offerParams.active,
        };
        let signedOffer;
        if (offerParams.signature) {
            signedOffer = { ...baseOffer, signature: offerParams.signature };
        }
        else {
            signedOffer = await OffersGossip.signOffer(baseOffer, activeIdentity);
        }
        const payload = {
            topic: OFFERS_TOPIC,
            offer: signedOffer,
        };
        const env = createEnvelope(TIPO_MENSAJE.NAMESPACE, sellerNode, "*", payload);
        const signedEnvelope = await signEnvelope(env, activeIdentity);
        // Store locally
        this.offers.set(signedOffer.id, signedOffer);
        return { offer: signedOffer, envelope: signedEnvelope };
    }
    /**
     * Receive and process an incoming envelope on the gossip network.
     */
    async receiveOfferEnvelope(envelope, sellerPublicKey, verifierIdentity) {
        if (!validateEnvelope(envelope)) {
            return { success: false, reason: "Invalid envelope format" };
        }
        // Check topic match
        const payload = envelope.payload;
        if (!payload || payload.topic !== OFFERS_TOPIC || !payload.offer) {
            return { success: false, reason: "Envelope payload topic mismatch" };
        }
        const offer = payload.offer;
        // Rate limit per origin node
        if (!this.rateLimiter.consume(envelope.origen)) {
            return { success: false, reason: "Rate limit exceeded for origin node" };
        }
        // Verify envelope signature if verifier Identity & seller Public Key are available
        if (verifierIdentity && sellerPublicKey && envelope.firma) {
            const pubKeyBytes = typeof sellerPublicKey === "string"
                ? hexABytes(sellerPublicKey)
                : sellerPublicKey;
            const validEnvSig = await verifyEnvelopeSignature(envelope, pubKeyBytes, verifierIdentity);
            if (!validEnvSig) {
                return {
                    success: false,
                    reason: "Envelope signature verification failed",
                };
            }
        }
        // Verify DataOffer internal ML-DSA-65 signature if sellerPublicKey & verifierIdentity provided
        if (verifierIdentity && sellerPublicKey) {
            const validOfferSig = await OffersGossip.verifyOfferSignature(offer, sellerPublicKey, verifierIdentity);
            if (!validOfferSig) {
                return {
                    success: false,
                    reason: "DataOffer signature verification failed",
                };
            }
        }
        // Check TTL expiry
        const now = this.getCurrentTime();
        if (now - offer.created_at > this.ttlMs) {
            return { success: false, reason: "DataOffer has expired (TTL)" };
        }
        // Store offer
        this.offers.set(offer.id, offer);
        // Emit to listeners
        for (const listener of this.listeners) {
            try {
                listener(offer, envelope);
            }
            catch {
                // Prevent listener error from disrupting loop
            }
        }
        return { success: true, offer };
    }
    /**
     * Prune offers older than configured TTL or inactive offers.
     * Returns the number of offers removed.
     */
    pruneExpiredOffers(now = this.getCurrentTime()) {
        let prunedCount = 0;
        for (const [id, offer] of this.offers.entries()) {
            if (!offer.active || now - offer.created_at > this.ttlMs) {
                this.offers.delete(id);
                prunedCount++;
            }
        }
        return prunedCount;
    }
    /**
     * Subscribe to incoming valid offer events.
     */
    onOffer(fn) {
        this.listeners.add(fn);
        return () => {
            this.listeners.delete(fn);
        };
    }
    getOffer(id) {
        return this.offers.get(id);
    }
    listOffers() {
        return Array.from(this.offers.values());
    }
    getActiveOffers(now = this.getCurrentTime()) {
        return Array.from(this.offers.values()).filter((o) => o.active && now - o.created_at <= this.ttlMs);
    }
    clear() {
        this.offers.clear();
    }
}
//# sourceMappingURL=offers-gossip.js.map