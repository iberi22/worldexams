/**
 * Generic plugin interface for namespace extensions.
 */
export interface Plugin {
    readonly id: string;
    readonly type: string;
    readonly version: string;
    initialize(): Promise<void>;
    getOpaqueMetadata(): unknown;
}
//# sourceMappingURL=types.d.ts.map