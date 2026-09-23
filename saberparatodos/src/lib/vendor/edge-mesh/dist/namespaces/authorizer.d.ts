import type { NodoId } from "../types/index.js";
import type { KeyManager } from "./encrypted-plugin.js";
import type { NamespaceCapabilityGrant } from "../types/index.js";
export interface AuthorizationDecision {
    readonly allowed: boolean;
    readonly reason: string;
}
export declare class NamespaceAuthorizer {
    private readonly nodeId;
    private readonly keyManager;
    constructor(nodeId: NodoId, keyManager: KeyManager);
    /**
     * Verify that a node has the group key for an encrypted namespace.
     * This is the core "posse la clave de grupo" check.
     */
    checkGroupKey(spaceId: string, targetNodeId: NodoId): AuthorizationDecision;
    /**
     * Verify that a capability grant permits 'subnet.encrypted' action.
     */
    checkCapability(grant: NamespaceCapabilityGrant, required: string): AuthorizationDecision;
    /**
     * Check that a node can perform 'subnet.encrypted' action.
     */
    canEncrypt(spaceId: string, targetNodeId: NodoId): AuthorizationDecision;
}
//# sourceMappingURL=authorizer.d.ts.map