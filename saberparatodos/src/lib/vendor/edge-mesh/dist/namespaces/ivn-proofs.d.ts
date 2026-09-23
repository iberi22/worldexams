import type { PostQuantumIdentity } from "../identity/index.js";
export interface RecipientCiphertext {
    readonly validatorPubKey: string;
    readonly kemCipherText: string;
    readonly ciphertext: string;
    readonly iv: string;
    readonly tag: string;
}
export interface ProofMetadata {
    readonly requestId: string;
    readonly namespace: string;
    readonly payloadHash: string;
    readonly payloadSize: number;
    readonly validatorCount: number;
    readonly applicantPubKey: string;
    readonly signature: string;
    readonly timestamp: number;
}
export interface StoredProof {
    readonly metadata: ProofMetadata;
    readonly recipients: readonly RecipientCiphertext[];
}
export interface ValidatorKeyPair {
    readonly publicKey?: Uint8Array | string;
    readonly secretKey: Uint8Array | string;
}
/**
 * IvnProofs manages E2E Encrypted Identity Verification Network (IVN) proofs.
 * Multi-recipient encryption with ML-KEM-768 + AES-256-GCM under namespace `swal/ivn/proofs/{requestId}`.
 */
export declare class IvnProofs {
    private readonly proofs;
    /**
     * Upload an encrypted proof for multiple validator recipients.
     * Payload is encrypted using ML-KEM-768 per validator recipient (E2E multi-recipient).
     * Solicitante signs payload hash with ML-DSA-65 signature.
     */
    uploadProof(applicantIdentity: PostQuantumIdentity, validatorPublicKeys: readonly (Uint8Array | string)[], payload: Uint8Array | string, requestId?: string): Promise<StoredProof>;
    /**
     * Decrypt a stored proof using a validator's ML-KEM-768 secret key.
     * Only the matching validator can decapsulate and decrypt their copy.
     * Also verifies applicant ML-DSA-65 signature on decrypted payload hash.
     */
    decryptProof(validatorKey: ValidatorKeyPair | Uint8Array | string, requestId: string): Promise<Uint8Array>;
    /**
     * Get public metadata for a proof record without disclosing encrypted payload.
     */
    getProofMetadata(requestId: string): ProofMetadata | null;
    /**
     * Clear all stored proofs in memory.
     */
    clear(): void;
}
//# sourceMappingURL=ivn-proofs.d.ts.map