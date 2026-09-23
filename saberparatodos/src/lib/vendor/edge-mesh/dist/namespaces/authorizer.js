// ─── NAMESPACE AUTHORIZER ─────────────────────────────────────────────────
// Extiende autorización de namespaces: verifica que el nodo "posee la clave
// de grupo" para namespaces cifrados.
// ─── NAMESPACE AUTHORIZER ─────────────────────────────────────────────────
export class NamespaceAuthorizer {
    nodeId;
    keyManager;
    constructor(nodeId, keyManager) {
        this.nodeId = nodeId;
        this.keyManager = keyManager;
    }
    /**
     * Verify that a node has the group key for an encrypted namespace.
     * This is the core "posse la clave de grupo" check.
     */
    checkGroupKey(spaceId, targetNodeId) {
        // Only the encrypted namespace plugin holds keys per namespace
        if (spaceId !== this.nodeId && targetNodeId !== this.nodeId) {
            // Remote authorization check: verify via capability grant or key presence
            const hasKey = this.keyManager.hasKey(targetNodeId);
            return hasKey
                ? { allowed: true, reason: "Node holds current group key" }
                : { allowed: false, reason: "Node does not hold group key" };
        }
        const hasKey = this.keyManager.hasKey(targetNodeId);
        return hasKey
            ? { allowed: true, reason: "Local node holds current group key" }
            : { allowed: false, reason: "Local node does not hold group key" };
    }
    /**
     * Verify that a capability grant permits 'subnet.encrypted' action.
     */
    checkCapability(grant, required) {
        if (grant.capacidad !== required) {
            return {
                allowed: false,
                reason: `Grant gives '${grant.capacidad}', required '${required}'`,
            };
        }
        if (Date.now() > grant.fechaExpiracion) {
            return { allowed: false, reason: "Grant expired" };
        }
        return { allowed: true, reason: `Capability '${required}' granted` };
    }
    /**
     * Check that a node can perform 'subnet.encrypted' action.
     */
    canEncrypt(spaceId, targetNodeId) {
        return this.checkGroupKey(spaceId, targetNodeId);
    }
}
//# sourceMappingURL=authorizer.js.map