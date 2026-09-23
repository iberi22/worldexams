// ─── EDGE MESH ─────────────────────────────────────────────────────────────
// Re-export completo de todo el paquete
export { GpuAgentPlugin, runCpuDot, runCpuMatrixScale, runCpuVectorSum, } from "./adapters/gpu-agent/index.js";
// ─── AUTHZ ────────────────────────────────────────────────────────────────
export { CAPACIDAD_ESTANDAR, createNamespaceAuthorizer, NamespaceAuthorizer, } from "./authz/index.js";
// ─── CHAT P2P ─────────────────────────────────────────────────────────────
export { ChatChannel, ExamenCompartido, PersistentOfflineQueue, TIPO_CANAL, TIPO_MENSAJE_CHAT, TIPO_PREGUNTA, } from "./chat/index.js";
export { createEdgeMeshNode, ESTADO_TRANSICIONES } from "./core/node.js";
// ─── CORE ─────────────────────────────────────────────────────────────────
export { EdgeMesh, MUTATION_REVERT_ORIGIN, YjsAdapter } from "./edge-mesh.js";
export { GosBridge } from "./gos/GosBridge.js";
// ─── GOVERNANCE ───────────────────────────────────────────────────────────
export { AuthorityManager, createAuthorityManager, createGovernanceManager, ESTADO_PROPUESTA, GovernanceManager, } from "./governance/index.js";
// ─── IDENTITY ─────────────────────────────────────────────────────────────
export { createPostQuantumIdentity, deserializeKeypair, generateKeypair, identityFromSecret, serializeKeypair, TIPO_IDENTIDAD, } from "./identity/index.js";
export { MalocaBackoffice } from "./maloca/backoffice.js";
export { EventBus, TIPO_EVENTO_MALOCA } from "./maloca/event-bus.js";
export { EvidentiaManager } from "./maloca/evidentia.js";
export { KarmaManager } from "./maloca/karma.js";
export { MalocaKernel } from "./maloca/kernel.js";
export { MetadataManager } from "./maloca/metadata.js";
export { ProfileManager } from "./maloca/perfil.js";
// ─── MALOCA ───────────────────────────────────────────────────────────────
export { PluginRegistry } from "./maloca/plugin-registry.js";
// ─── MESH ESCALABLE ───────────────────────────────────────────────────────
export { ESTRATEGIA_FAN_OUT, MeshManager } from "./mesh/index.js";
// ─── NAMESPACES ───────────────────────────────────────────────────────────
export { getOfferSigningString, NAMESPACE_POR_DEFECTO, NamespaceManager, namespacesAreIsolated, OFFERS_TOPIC, OffersGossip, parseSwalNamespace, SWAL_DATA_COMMONS_OFFERS, swalNamespace, } from "./namespaces/index.js";
export { createNodeMemory } from "./node-memory/index.js";
// ─── OP LOG ───────────────────────────────────────────────────────────────
export { OpLog } from "./op-log/index.js";
// ─── PRESENCE ─────────────────────────────────────────────────────────────
export { HealthChecker } from "./presence/health.js";
export { MeshPresence, PresenceManager } from "./presence/index.js";
export { createPeerHealthMonitor, getReconnectDelay, } from "./presence/peer-health.js";
// ─── PROTOCOL ─────────────────────────────────────────────────────────────
export { canonicalStringify } from "./protocol/canonical.js";
export { canonicalEnvelopeBytes, createEnvelope, MessageDeduplicator, signEnvelope, validateEnvelope, verifyEnvelopeSignature, } from "./protocol/index.js";
export { bytesAHex, generarId, generarNonce, hexABytes, } from "./protocol/utils.js";
// ─── SALONES VIRTUALES ────────────────────────────────────────────────────
export { ESTADO_SALON, SalonesManager, SalonVirtual, TIPO_SALON, } from "./salones/manager.js";
// ─── SNAPSHOT ─────────────────────────────────────────────────────────────
export { createSnapshotManager, SnapshotManager, } from "./snapshot/index.js";
// ─── STORAGE ──────────────────────────────────────────────────────────────
export { InMemoryStorage, StorageError, StorageManager, YDocPersistence, } from "./storage/index.js";
// ─── SYNC ─────────────────────────────────────────────────────────────────
export { SyncEngine } from "./sync/engine.js";
export { MemoryTransport } from "./transport/memory.js";
export { PeerJSTransport } from "./transport/peerjs.js";
export { getRelayConfig, parseRelayUrl, resolveRelayUrl, } from "./transport/relay-config.js";
export { RelayServer } from "./transport/relay-server.js";
export { TorTransportAdapter } from "./transport/TorTransportAdapter.js";
export { generateTorrc, getTorDataDir, TorOnionTransport, } from "./transport/tor.js";
// ─── TYPES ────────────────────────────────────────────────────────────────
export * from "./types/index.js";
//# sourceMappingURL=index.js.map