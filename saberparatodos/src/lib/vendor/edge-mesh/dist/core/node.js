import { DefaultEdgeMeshNode } from "./DefaultEdgeMeshNode.js";
export { DefaultEdgeMeshNode };
// ─── DEFAULT EDGE MESH NODE ────────────────────────────────────────────────
export const ESTADO_TRANSICIONES = {
    offline: ["conectando"],
    conectando: ["online", "offline"],
    online: ["suspendido", "reconectando", "offline"],
    suspendido: ["reconectando", "offline"],
    reconectando: ["online", "offline"],
    eliminado: [],
};
// ─── FACTORY ───────────────────────────────────────────────────────────────
export function createEdgeMeshNode(nodoId) {
    return new DefaultEdgeMeshNode(nodoId);
}
//# sourceMappingURL=node.js.map