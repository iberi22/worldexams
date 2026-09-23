import crypto from "node:crypto";
import type { PostQuantumIdentity } from "../identity/index.js";
export interface HandshakeInit {
    readonly x25519PubKey: string;
    readonly identityPubKey: string;
    readonly nonce_a: string;
    readonly signature: string;
}
export interface HandshakeResponse {
    readonly x25519PubKey: string;
    readonly identityPubKey: string;
    readonly nonce_b: string;
    readonly signature: string;
}
export declare class EncryptedChannel {
    private readonly key;
    constructor(sharedSecret: Uint8Array);
    encrypt(plaintext: Uint8Array): {
        readonly ciphertext: Uint8Array;
        readonly iv: Uint8Array;
        readonly tag: Uint8Array;
    };
    decrypt(ciphertext: Uint8Array, iv: Uint8Array, tag: Uint8Array): Uint8Array;
}
export declare class EncryptedHandshake {
    private readonly seenNonces;
    /**
     * Alice starts the handshake.
     * Generates X25519 keypair and creates HandshakeInit message.
     */
    initiate(aliceIdentity: PostQuantumIdentity): Promise<{
        readonly message: HandshakeInit;
        readonly ephemeralPrivateKey: crypto.KeyObject;
    }>;
    /**
     * Bob receives Alice's HandshakeInit and responds.
     * Returns Bob's HandshakeResponse and Bob's derived shared secret.
     */
    respond(bobIdentity: PostQuantumIdentity, initMsg: HandshakeInit): Promise<{
        readonly response: HandshakeResponse;
        readonly sharedSecret: Uint8Array;
    }>;
    /**
     * Alice receives Bob's HandshakeResponse and finalizes.
     * Returns Alice's derived shared secret.
     */
    finalize(aliceIdentity: PostQuantumIdentity, aliceEphemeralPrivateKey: crypto.KeyObject, initMsg: HandshakeInit, responseMsg: HandshakeResponse): Promise<Uint8Array>;
    /**
     * Helper method to perform a full simulated handshake between Alice and Bob.
     */
    static perform(alice: PostQuantumIdentity, bob: PostQuantumIdentity, replaySet?: Set<string>): Promise<{
        readonly aliceChannel: EncryptedChannel;
        readonly bobChannel: EncryptedChannel;
    }>;
}
//# sourceMappingURL=encrypted-plugin.d.ts.map