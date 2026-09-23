/**
 * Deterministic stringify of any value by sorting object keys alphabetically.
 * Uint8Array instances are serialized as their hex representation.
 */
export declare function canonicalStringify(val: any): string;
/**
 * Returns canonical byte serialization of any value.
 */
export declare function canonicalSerialize(val: any): Uint8Array;
//# sourceMappingURL=canonical.d.ts.map