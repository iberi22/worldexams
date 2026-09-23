import type { PostQuantumIdentity } from "../identity/index.js";
import { EncryptedChannel } from "../namespaces/encrypted-plugin.js";
import type { NodoId } from "../types/index.js";
export interface PqcChannelState {
    status: "initiating" | "responding" | "ready";
    readonly keysA?: {
        readonly publicKey: Uint8Array;
        readonly secretKey: Uint8Array;
    };
    readonly challengeA?: string;
    readonly challengeB?: string;
    readonly channel?: EncryptedChannel;
}
/**
 * PqcHandshake orchestrates ML-KEM-768 key exchanges with ML-DSA-65 signatures.
 */
export declare class PqcHandshake {
    private readonly identity;
    private readonly getPeerPublicKey;
    constructor(identity: PostQuantumIdentity, getPeerPublicKey: (peerId: NodoId) => Uint8Array | undefined);
    /**
     * Step 1: Alice initiates the handshake.
     */
    initiate(targetPeerId: NodoId): Promise<{
        readonly payload: {
            readonly kemPubKey: string;
            readonly challenge: string;
            readonly signature: string;
        };
        readonly keysA: {
            readonly publicKey: Uint8Array;
            readonly secretKey: Uint8Array;
        };
        readonly challengeA: string;
    }>;
    /**
     * Step 2: Bob responds to Alice's handshake.
     */
    respond(fromPeerId: NodoId, initPayload: {
        readonly kemPubKey: string;
        readonly challenge: string;
        readonly signature: string;
    }): Promise<{
        readonly payload: {
            readonly cipherText: string;
            readonly challenge: string;
            readonly signature: string;
        };
        readonly channel: EncryptedChannel;
        readonly challengeB: string;
    }>;
    /**
     * Step 3: Alice finalizes the handshake.
     */
    finalize(fromPeerId: NodoId, state: PqcChannelState, replyPayload: {
        readonly cipherText: string;
        readonly challenge: string;
        readonly signature: string;
    }): Promise<{
        readonly payload: {
            readonly signature: string;
        };
        readonly channel: EncryptedChannel;
    }>;
    /**
     * Step 4: Bob verifies Alice's final ACK.
     */
    verifyAck(fromPeerId: NodoId, state: PqcChannelState, ackPayload: {
        readonly signature: string;
    }): Promise<void>;
}
//# sourceMappingURL=pqc-handshake.d.ts.map