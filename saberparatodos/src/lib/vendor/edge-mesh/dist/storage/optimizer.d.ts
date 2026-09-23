/**
 * Initializes the WASM module for Zstd.
 * Must be called once before compressing or decompressing.
 */
export declare function initializeOptimizer(): Promise<void>;
/**
 * Utility class to compress large payloads before storing them in local databases (IndexedDB/OPFS)
 * or broadcasting them across the P2P network.
 *
 * It serializes objects to CBOR (Concise Binary Object Representation) and then compresses
 * the binary stream using Zstandard (Zstd), significantly reducing the required space.
 */
export declare class PayloadOptimizer {
    /**
     * Serializes an object to CBOR and compresses it with Zstd.
     * @param payload Any serializable JavaScript object.
     * @param level Compression level (default 10).
     * @returns A Uint8Array containing the compressed binary data.
     */
    static compressPayload<T>(payload: T, level?: number): Promise<Uint8Array>;
    /**
     * Decompresses Zstd data and deserializes it from CBOR back to the original object.
     * @param buffer The compressed binary data (Uint8Array).
     * @returns The original parsed object.
     */
    static decompressPayload<T>(buffer: Uint8Array): Promise<T>;
}
//# sourceMappingURL=optimizer.d.ts.map