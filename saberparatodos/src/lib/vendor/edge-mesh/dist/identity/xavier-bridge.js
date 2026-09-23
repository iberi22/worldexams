/**
 * Xavier ↔ edge-mesh identity bridge (SWAL Fase 1).
 *
 * Xavier Fase 0 derives `ml_dsa_commitment` (32 bytes) via HKDF domain
 * `swal-ml-dsa-65-seed-v1`. Edge-mesh uses that seed with ML-DSA-65 `keygen(seed)`
 * so challenge → sign → verify works end-to-end.
 */
import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { bytesAHex, hexABytes } from "../protocol/utils.js";
import { createPostQuantumIdentity, createSignedNonceChallenge, signNonceChallenge, TIPO_IDENTIDAD, verifySignedNonceResponse, } from "./index.js";
/** Must match Xavier `node_identity::derive::DOMAIN_ML_DSA`. */
export const XAVIER_ML_DSA_DOMAIN = "swal-ml-dsa-65-seed-v1";
const ALGORITMO = "ML-DSA-65";
/**
 * Build ML-DSA-65 keypair from Xavier's 32-byte commitment seed.
 */
export function keypairFromXavierCommitment(commitment, tipo = TIPO_IDENTIDAD.MAESTRA) {
    if (commitment.length !== 32) {
        throw new Error(`Xavier ML-DSA commitment must be 32 bytes, got ${commitment.length}`);
    }
    const seed = new Uint8Array(commitment);
    const { secretKey, publicKey } = ml_dsa65.keygen(seed);
    return {
        parPrivado: secretKey,
        parPublico: publicKey,
        algoritmo: ALGORITMO,
        tipo,
        fechaCreacion: Date.now(),
    };
}
export function keypairFromXavierCommitmentHex(commitmentHex, tipo) {
    return keypairFromXavierCommitment(hexABytes(commitmentHex), tipo);
}
/**
 * Create a PostQuantumIdentity whose ML-DSA keys are deterministic from the
 * Xavier vault commitment (nodoId = Xavier node id string).
 */
export function identityFromXavierCard(card) {
    const kp = keypairFromXavierCommitmentHex(card.mlDsaCommitmentHex);
    return createPostQuantumIdentity(card.nodeId, kp);
}
/**
 * End-to-end: issue challenge → sign with commitment-derived identity → verify ML-DSA.
 */
export async function challengeVerifyWithXavierCommitment(card, ttlMs) {
    const identity = identityFromXavierCard(card);
    const challenge = createSignedNonceChallenge(ttlMs);
    const response = await signNonceChallenge(identity, challenge);
    const ok = await verifySignedNonceResponse(response);
    return {
        challenge,
        response,
        ok,
        parPublicoHex: bytesAHex(identity.exportarPublico()),
    };
}
/**
 * Check that a published ML-DSA public key matches the Xavier commitment seed.
 */
export function publicKeyMatchesCommitment(card, parPublico) {
    const expected = keypairFromXavierCommitmentHex(card.mlDsaCommitmentHex)
        .parPublico;
    if (expected.length !== parPublico.length)
        return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
        diff |= expected[i] ^ parPublico[i];
    }
    return diff === 0;
}
//# sourceMappingURL=xavier-bridge.js.map