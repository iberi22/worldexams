/**
 * Hybrid pack auth helper (Fase 3) — Ed25519 verified elsewhere + ML-DSA via commitment.
 * Complements Xavier `hybrid_pack` / edge-mesh xavier-bridge.
 */
import { type XavierPublicIdentityCard } from "./xavier-bridge.js";
export interface HybridPackProof {
    readonly contentHashHex: string;
    readonly ed25519PublicHex: string;
    readonly ed25519SignatureHex: string;
    readonly mlDsaCommitmentHex: string;
    readonly mlDsaSignatureHex?: string;
}
export declare function isHybridReady(proof: HybridPackProof): boolean;
/** Attach ML-DSA signature over the same payload string Xavier signs. */
export declare function attachMlDsaSignature(card: XavierPublicIdentityCard, payloadUtf8: string, proof: HybridPackProof): Promise<HybridPackProof>;
export declare function verifyMlDsaSignature(proof: HybridPackProof, payloadUtf8: string): Promise<boolean>;
//# sourceMappingURL=hybrid-pack.d.ts.map