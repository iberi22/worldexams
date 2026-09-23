/**
 * Xavier ↔ edge-mesh identity bridge (SWAL Fase 1).
 *
 * Xavier Fase 0 derives `ml_dsa_commitment` (32 bytes) via HKDF domain
 * `swal-ml-dsa-65-seed-v1`. Edge-mesh uses that seed with ML-DSA-65 `keygen(seed)`
 * so challenge → sign → verify works end-to-end.
 */
import type { ParPublico } from "../types/index.js";
import { type PostQuantumIdentity, type PostQuantumKeypair, type SignedNonceChallenge, type SignedNonceResponse, type TipoIdentidad } from "./index.js";
/** Must match Xavier `node_identity::derive::DOMAIN_ML_DSA`. */
export declare const XAVIER_ML_DSA_DOMAIN: "swal-ml-dsa-65-seed-v1";
/** Public card published by Xavier (`identity.public.json` / mesh handshake). */
export interface XavierPublicIdentityCard {
    readonly nodeId: string;
    readonly ed25519PublicHex: string;
    readonly mlDsaCommitmentHex: string;
}
/**
 * Build ML-DSA-65 keypair from Xavier's 32-byte commitment seed.
 */
export declare function keypairFromXavierCommitment(commitment: Uint8Array, tipo?: TipoIdentidad): PostQuantumKeypair;
export declare function keypairFromXavierCommitmentHex(commitmentHex: string, tipo?: TipoIdentidad): PostQuantumKeypair;
/**
 * Create a PostQuantumIdentity whose ML-DSA keys are deterministic from the
 * Xavier vault commitment (nodoId = Xavier node id string).
 */
export declare function identityFromXavierCard(card: XavierPublicIdentityCard): PostQuantumIdentity;
/**
 * End-to-end: issue challenge → sign with commitment-derived identity → verify ML-DSA.
 */
export declare function challengeVerifyWithXavierCommitment(card: XavierPublicIdentityCard, ttlMs?: number): Promise<{
    challenge: SignedNonceChallenge;
    response: SignedNonceResponse;
    ok: boolean;
    parPublicoHex: string;
}>;
/**
 * Check that a published ML-DSA public key matches the Xavier commitment seed.
 */
export declare function publicKeyMatchesCommitment(card: XavierPublicIdentityCard, parPublico: ParPublico): boolean;
//# sourceMappingURL=xavier-bridge.d.ts.map