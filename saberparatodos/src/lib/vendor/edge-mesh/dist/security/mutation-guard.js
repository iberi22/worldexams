// ─── MUTATION GUARD ────────────────────────────────────────────────────────
// Generic pre-commit guard for remote CRDT mutations with surgical revert
// (self-healing). Reference: Shelf p2p-mesh-core database-sync.ts security
// guard (snapshot → apply → revert with reserved origin).
/**
 * Reserved Yjs transaction origin used for security reverts.
 * A revert transaction MUST NOT re-trigger guards nor be relayed to peers
 * as a new mutation of the remote peer.
 */
export const SECURITY_REVERT_ORIGIN = "edge-mesh:security-revert";
export function decisionPermitida(decision) {
    return typeof decision === "boolean" ? decision : decision.permitido;
}
export function decisionRazon(decision, origen) {
    if (typeof decision === "object" && decision.razon !== undefined) {
        return decision.razon;
    }
    return `Mutacion denegada por guard (origen: ${String(origen)})`;
}
//# sourceMappingURL=mutation-guard.js.map