import type { NodeMemory, NodeMemoryOptions } from "./types.js";
export * from "./types.js";
/**
 * Helper canónico de memoria de nodo en edge-mesh.
 *
 * Namespaces canónicos:
 * - Xavier: app/{appId}/instance/{instanceId} — memoria de agente (RAG)
 * - mesh (si mesh presente): swal/{appId}/{instanceId} — datos P2P
 *
 * @param opts Opciones de configuración de memoria de nodo
 * @returns Instancia de NodeMemory para persistir y sincronizar datos de agente
 */
export declare function createNodeMemory(opts: NodeMemoryOptions): NodeMemory;
//# sourceMappingURL=index.d.ts.map