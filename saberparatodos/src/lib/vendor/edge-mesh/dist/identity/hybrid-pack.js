/**
 * Hybrid pack auth helper (Fase 3) — Ed25519 verified elsewhere + ML-DSA via commitment.
 * Complements Xavier `hybrid_pack` / edge-mesh xavier-bridge.
 */
import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { bytesAHex, hexABytes } from "../protocol/utils.js";
import { keypairFromXavierCommitmentHex, } from "./xavier-bridge.js";
export function isHybridReady(proof) {
    return (proof.mlDsaCommitmentHex.length === 64 &&
        proof.ed25519SignatureHex.length > 0 &&
        proof.contentHashHex.length === 64);
}
/** Attach ML-DSA signature over the same payload string Xavier signs. */
export async function attachMlDsaSignature(card, payloadUtf8, proof) {
    const kp = keypairFromXavierCommitmentHex(card.mlDsaCommitmentHex);
    const msg = new TextEncoder().encode(payloadUtf8);
    const firma = ml_dsa65.sign(msg, kp.parPrivado);
    return {
        ...proof,
        mlDsaCommitmentHex: card.mlDsaCommitmentHex,
        mlDsaSignatureHex: bytesAHex(firma),
    };
}
export async function verifyMlDsaSignature(proof, payloadUtf8) {
    if (!proof.mlDsaSignatureHex)
        return false;
    const kp = keypairFromXavierCommitmentHex(proof.mlDsaCommitmentHex);
    const msg = new TextEncoder().encode(payloadUtf8);
    try {
        return ml_dsa65.verify(hexABytes(proof.mlDsaSignatureHex), msg, kp.parPublico);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=hybrid-pack.js.map