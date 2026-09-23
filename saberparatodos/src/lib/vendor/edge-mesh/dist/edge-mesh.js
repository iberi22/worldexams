import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import * as Y from "yjs";
import { CAPACIDAD_ESTANDAR, createNamespaceAuthorizer, } from "./authz/index.js";
import { PersistentOfflineQueue } from "./chat/offline-queue.js";
import { createEdgeMeshNode } from "./core/node.js";
import { createAuthorityManager, createGovernanceManager, } from "./governance/index.js";
import { createPostQuantumIdentity, generateKeypair, identityFromSecret, } from "./identity/index.js";
import { MerkleTree } from "./maloca/evidentia.js";
import { MeshGossip } from "./mesh/index.js";
import { NamespaceManager } from "./namespaces/index.js";
import { OpLog } from "./op-log/index.js";
import { PresenceManager } from "./presence/index.js";
import { canonicalStringify } from "./protocol/canonical.js";
import { createEnvelope, MessageDeduplicator, signEnvelope, validateEnvelope, verifyEnvelopeSignature, } from "./protocol/index.js";
import { bytesAHex, hexABytes } from "./protocol/utils.js";
import { createSnapshotManager, } from "./snapshot/index.js";
import { InMemoryStorage, StorageManager } from "./storage/index.js";
import { SyncEngine } from "./sync/engine.js";
import { MemoryTransport } from "./transport/memory.js";
import { PeerJSTransport, } from "./transport/peerjs.js";
import { PqcHandshake, } from "./transport/pqc-handshake.js";
import { TIPO_MENSAJE } from "./types/index.js";
// ─── YJS ADAPTER ───────────────────────────────────────────────────────────
/**
 * Reserved transaction origin used when the mutation guard reverts unauthorized changes (self-healing).
 */
export const MUTATION_REVERT_ORIGIN = "mutation-guard-revert";
/**
 * Utility helper to trace a nested or top-level shared type back to its top-level map collection name.
 */
function findTopLevelName(doc, type) {
    let current = type;
    while (current && current._item) {
        current = current.parent;
    }
    if (!current)
        return null;
    for (const [name, sharedType] of doc.share.entries()) {
        if (sharedType === current) {
            return name;
        }
    }
    return null;
}
export class YjsAdapter {
    doc;
    /** When false, destroy() only detaches listeners (shared host doc). */
    ownsDoc;
    listeners;
    mutationGuards;
    afterTransactionHandler;
    constructor(existingDoc, ownsDoc = !existingDoc) {
        this.doc = existingDoc ?? new Y.Doc();
        this.ownsDoc = ownsDoc;
        this.listeners = new Map();
        this.mutationGuards = new Set();
        this.afterTransactionHandler = (tr) => {
            if (tr.origin === MUTATION_REVERT_ORIGIN) {
                return;
            }
            if (this.mutationGuards.size === 0) {
                return;
            }
            // Collect all touched keys in Y.Map instances under their top-level collection names
            const touched = new Map();
            tr.changedParentTypes.forEach((events, type) => {
                if (type instanceof Y.Map) {
                    const mapName = findTopLevelName(this.doc, type);
                    if (!mapName)
                        return;
                    if (!touched.has(mapName)) {
                        touched.set(mapName, new Set());
                    }
                    const keySet = touched.get(mapName);
                    for (const event of events) {
                        if (event instanceof Y.YMapEvent) {
                            for (const key of event.keys.keys()) {
                                keySet.add(key);
                            }
                        }
                    }
                }
            });
            if (touched.size === 0) {
                return;
            }
            let rejectAll = false;
            const rejectedKeys = new Map();
            for (const guard of this.mutationGuards) {
                try {
                    const result = guard(tr.origin, touched);
                    if (result === false) {
                        rejectAll = true;
                    }
                    else if (result instanceof Map) {
                        for (const [mapName, keys] of result.entries()) {
                            if (!rejectedKeys.has(mapName)) {
                                rejectedKeys.set(mapName, new Set());
                            }
                            const set = rejectedKeys.get(mapName);
                            for (const k of keys) {
                                set.add(k);
                            }
                        }
                    }
                }
                catch (error) {
                    rejectAll = true;
                    console.error("Mutation guard threw an error, rejecting all changes:", error);
                }
            }
            if (rejectAll) {
                for (const [mapName, keys] of touched.entries()) {
                    if (!rejectedKeys.has(mapName)) {
                        rejectedKeys.set(mapName, new Set());
                    }
                    const set = rejectedKeys.get(mapName);
                    for (const k of keys) {
                        set.add(k);
                    }
                }
            }
            // Apply surgical self-healing/reversion if any keys were rejected
            if (rejectedKeys.size > 0) {
                this.doc.transact(() => {
                    tr.changedParentTypes.forEach((events, type) => {
                        if (type instanceof Y.Map) {
                            const mapName = findTopLevelName(this.doc, type);
                            if (!mapName)
                                return;
                            const keysToReject = rejectedKeys.get(mapName);
                            if (!keysToReject)
                                return;
                            for (const event of events) {
                                if (event instanceof Y.YMapEvent) {
                                    event.keys.forEach((change, key) => {
                                        if (keysToReject.has(key)) {
                                            if (change.action === "update" ||
                                                change.action === "delete") {
                                                event.target.set(key, change.oldValue);
                                            }
                                            else if (change.action === "add") {
                                                event.target.delete(key);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }, MUTATION_REVERT_ORIGIN);
            }
        };
        this.doc.on("afterTransaction", this.afterTransactionHandler);
    }
    registerMutationGuard(fn) {
        this.mutationGuards.add(fn);
        return () => {
            this.mutationGuards.delete(fn);
        };
    }
    onUpdate(handler) {
        const id = "global";
        const handlers = this.listeners.get(id) ?? new Set();
        handlers.add(handler);
        this.listeners.set(id, handlers);
        this.doc.on("update", handler);
        return () => {
            this.doc.off("update", handler);
            handlers.delete(handler);
        };
    }
    applyUpdate(update, origin = null) {
        Y.applyUpdate(this.doc, update, origin);
    }
    getState() {
        return Y.encodeStateAsUpdate(this.doc);
    }
    getStateVector() {
        return Y.encodeStateVector(this.doc);
    }
    merge(remoteState) {
        Y.applyUpdate(this.doc, remoteState);
    }
    getMap(name) {
        return this.doc.getMap(name);
    }
    getArray(name) {
        return this.doc.getArray(name);
    }
    getText(name) {
        return this.doc.getText(name);
    }
    destroy() {
        // Detach update handlers first
        for (const handlers of this.listeners.values()) {
            for (const handler of handlers) {
                this.doc.off("update", handler);
            }
        }
        this.listeners.clear();
        this.mutationGuards.clear();
        this.doc.off("afterTransaction", this.afterTransactionHandler);
        if (this.ownsDoc) {
            this.doc.destroy();
        }
    }
}
// ─── EDGE MESH ─────────────────────────────────────────────────────────────
export class EdgeMesh {
    config;
    nodo;
    eventTarget;
    deduplicator;
    storage;
    governance;
    authority;
    identity;
    presence;
    authorizer;
    namespaces;
    yjsAdapter;
    offlineQueue;
    peerSecureChannels;
    pqcHandshake;
    meshGossip;
    transport = null;
    logsDoc;
    syncs;
    snapshots;
    subscriptions;
    merkleTree;
    snapshotConfig;
    snapshotTimer = null;
    snapshotRestored = false;
    /** Registered peer public keys for envelope verification. */
    peerPublicKeys;
    sybilRegistry;
    requireAuthz;
    requireSignedEnvelopes;
    defaultSyncNamespace;
    unsubYjs = null;
    transportMessageHandler = null;
    iniciado = false;
    /** True when this mesh created the Y.Doc (false when host injects yDoc). */
    sharesExternalDoc;
    relayLocalYjs;
    constructor(config) {
        this.config = config;
        this.logsDoc = new Map();
        this.syncs = new Map();
        this.snapshots = new Map();
        this.peerPublicKeys = new Map();
        this.sybilRegistry = new Map();
        this.requireAuthz = config.requireAuthz !== false;
        this.requireSignedEnvelopes = config.requireSignedEnvelopes === true;
        this.defaultSyncNamespace = config.defaultSyncNamespace ?? "global";
        this.sharesExternalDoc = config.yDoc !== undefined;
        // Host-owned doc (dbSync) already broadcasts via p2pManager YJS_UPDATE — avoid double relay.
        this.relayLocalYjs = config.relayLocalYjs ?? config.yDoc === undefined;
        // Core — mesh uses its own EventTarget so emit("error") does not re-enter nodo handlers
        this.nodo = createEdgeMeshNode(config.nodoId);
        this.eventTarget = new EventTarget();
        this.deduplicator = new MessageDeduplicator();
        this.peerSecureChannels = new Map();
        // Storage
        this.storage =
            config.storageBackend === "mem"
                ? new InMemoryStorage()
                : new StorageManager({
                    dbName: `edge-mesh-${config.nodoId}`,
                });
        // Identity — never pair a custom private key with an empty public key
        if (config.identitySecret && config.identitySecret.length > 0) {
            this.identity = identityFromSecret(config.nodoId, config.identitySecret, "maestra");
        }
        else {
            this.identity = createPostQuantumIdentity(config.nodoId, generateKeypair("maestra"));
        }
        this.registrarClavePublica(config.nodoId, this.identity.exportarPublico());
        this.pqcHandshake = new PqcHandshake(this.identity, (peerId) => this.obtenerClavePublica(peerId));
        // Yjs — Phase B: optional shared host document (e.g. dbSync.doc)
        const externalDoc = config.yDoc;
        this.yjsAdapter = new YjsAdapter(externalDoc, !externalDoc);
        // Governance with crypto verifier
        this.governance = createGovernanceManager(config.governancePolicy, this, {
            requireSignedVotes: config.requireSignedVotes,
        });
        // Mesh Gossip
        this.meshGossip = new MeshGossip({
            nodoId: config.nodoId,
            fanOut: config.gossipFanOut ?? 3,
            gossipTTL: config.gossipTTL ?? 5,
        }, this);
        this.meshGossip.addEventListener("gossipRecibido", (ev) => {
            this.emit("gossipRecibido", ev.detail);
        });
        // Presence
        this.presence = new PresenceManager({
            heartbeatIntervalMs: config.heartbeatIntervalMs ?? 5_000,
            timeoutMs: config.heartbeatTimeoutMs ?? 15_000,
        });
        // Authority
        this.authority = createAuthorityManager(config.nodoId, this.presence, {
            initialMaster: config.initialMaster,
        });
        // Forward authority events
        this.authority.on("failover", (ev) => {
            this.emit("failover", ev.detail);
        });
        this.presence.registrarClavePublica(config.nodoId, this.identity.exportarPublico());
        // Authz
        this.authorizer = createNamespaceAuthorizer(this.storage);
        this.subscriptions = new Map();
        this.merkleTree = new MerkleTree();
        const defaultSnapConfig = {
            intervalMs: 5 * 60 * 1000, // 5 min
            maxSnapshots: 3,
            include: [],
        };
        this.snapshotConfig = { ...defaultSnapConfig, ...config.snapshotConfig };
        // Namespaces
        this.namespaces = new NamespaceManager();
        // Offline Queue
        this.offlineQueue = new PersistentOfflineQueue(this.storage);
        this.presence.addOnlineListener((peerId) => {
            void this.offlineQueue.handlePeerReconnect(peerId);
            if (this.config.enablePqcEncryption !== false &&
                this.config.nodoId < peerId) {
                void this.iniciarPqcHandshake(peerId);
            }
            void this.solicitarSyncYjs(peerId);
        });
        // Re-encolar eventos del nodo (forward to mesh EventTarget without looping)
        this.nodo.on("nodoConectado", (ev) => {
            this.onNodoConectado(ev.detail.nodoId);
            this.emit("nodoConectado", ev.detail);
        });
        this.nodo.on("nodoDesconectado", (ev) => {
            this.onNodoDesconectado(ev.detail.nodoId);
            this.emit("nodoDesconectado", ev.detail);
        });
        this.nodo.on("estadoCambiado", (ev) => {
            this.emit("estadoCambiado", ev.detail);
        });
        // Note: do NOT re-emit nodo "error" onto the same shared target pattern —
        // mesh-level errors use this.emit("error") on a dedicated EventTarget.
    }
    // ─── PUBLIC KEY REGISTRY ─────────────────────────────────────────────
    registrarClavePublica(nodoId, parPublico, origenIp = "127.0.0.1") {
        const threshold = this.config.sybilThreshold ?? 10;
        let registered = this.sybilRegistry.get(origenIp);
        if (!registered) {
            registered = new Set();
            this.sybilRegistry.set(origenIp, registered);
        }
        if (registered.size >= threshold && !registered.has(nodoId)) {
            throw new Error(`Sybil attack detected: threshold exceeded for IP ${origenIp}`);
        }
        registered.add(nodoId);
        this.peerPublicKeys.set(nodoId, new Uint8Array(parPublico));
        if (this.presence) {
            this.presence.registrarClavePublica(nodoId, new Uint8Array(parPublico));
        }
    }
    obtenerClavePublica(nodoId) {
        return this.peerPublicKeys.get(nodoId);
    }
    verificarFirma(mensaje, firma, clave) {
        return this.verificarFirmaVoto(mensaje, firma, clave);
    }
    verificarFirmaVoto(mensaje, firma, clave) {
        try {
            return ml_dsa65.verify(firma, mensaje, clave);
        }
        catch {
            return false;
        }
    }
    // ─── INICIALIZACION ──────────────────────────────────────────────────
    /**
     * Attach an external transport (MemoryTransport, adapter over host PeerJS, etc.).
     * Prefer this over `peerId` when the host app already owns a Peer connection.
     * Safe to call after `iniciar()` (Phase C late-bind).
     */
    usarTransport(transport) {
        if (this.transport && this.transportMessageHandler) {
            this.transport.off("mensaje", this.transportMessageHandler);
        }
        this.transport = transport;
        this.transportMessageHandler = (ev) => {
            void this.procesarMensaje(ev.detail.envolvente);
        };
        this.transport.on("mensaje", this.transportMessageHandler);
        // Late-bind Yjs relay if mesh already started
        if (this.iniciado) {
            this.ensureYjsRelay();
        }
    }
    /** Detach transport without destroying host PeerJS (adapter.cerrar only unsubscribes). */
    detachTransport() {
        if (this.transport && this.transportMessageHandler) {
            this.transport.off("mensaje", this.transportMessageHandler);
        }
        this.transportMessageHandler = null;
        this.transport = null;
        if (this.unsubYjs) {
            this.unsubYjs();
            this.unsubYjs = null;
        }
    }
    ensureYjsRelay() {
        if (this.unsubYjs || this.transport === null || !this.relayLocalYjs)
            return;
        this.unsubYjs = this.yjsAdapter.onUpdate((update, origin) => {
            if (origin === "remote" || origin === this.config.nodoId)
                return;
            // Local writes: string "local" or object { origin: "local", branchId }
            const isLocalObject = typeof origin === "object" &&
                origin !== null &&
                origin.origin === "local";
            if (origin !== "local" && !isLocalObject && origin !== null)
                return;
            void this.broadcastYjsUpdate(update);
        });
    }
    async iniciar() {
        // Cargar persistencia de authz
        await this.authorizer.loadGrants();
        await this.authorizer.loadRoleAssignments();
        await this.authorizer.loadCapabilities();
        // Intentar restaurar desde snapshot al iniciar
        await this.restaurarDesdeSnapshot();
        // Optional built-in PeerJS — skip when host provides transport or omits peerId
        if (this.transport === null && this.config.peerId !== undefined) {
            const opts = {
                peerId: this.config.peerId,
                ...this.config.transportConfig,
            };
            const peerTransport = new PeerJSTransport(this.config.nodoId, opts);
            this.usarTransport(peerTransport);
        }
        // Connect memory transport if already attached
        if (this.transport instanceof MemoryTransport) {
            await this.transport.conectar();
        }
        this.ensureYjsRelay();
        // Iniciar presencia
        await this.presence.iniciar(this.config.nodoId, async (payload) => {
            await this.transmitir(payload, TIPO_MENSAJE.HEARTBEAT);
        }, this.identity);
        // Iniciar autoridad
        this.authority.iniciar();
        // Conectar nodo
        await this.nodo.conectar();
        this.iniciado = true;
        // Programar snapshot automático
        if (this.snapshotTimer === null) {
            this.snapshotTimer = setInterval(() => {
                void this.generarSnapshotAutomatico();
            }, this.snapshotConfig.intervalMs);
        }
    }
    async detener() {
        this.iniciado = false;
        if (this.snapshotTimer !== null) {
            clearInterval(this.snapshotTimer);
            this.snapshotTimer = null;
        }
        this.presence.detener();
        this.authority.detener();
        if (this.unsubYjs) {
            this.unsubYjs();
            this.unsubYjs = null;
        }
        if (this.transport !== null) {
            if (this.transportMessageHandler) {
                this.transport.off("mensaje", this.transportMessageHandler);
                this.transportMessageHandler = null;
            }
            await this.transport.cerrar();
            this.transport = null;
        }
        await this.nodo.desconectar();
        // Shared host docs are only detached (listeners cleared), never destroyed.
        this.yjsAdapter.destroy();
        this.governance.destruir();
        this.meshGossip.destruir();
    }
    /** Current attached transport (if any). */
    obtenerTransport() {
        return this.transport;
    }
    /** Whether yjsAdapter.doc is an externally owned document. */
    isSharedYDoc() {
        return this.sharesExternalDoc;
    }
    // ─── TRANSPORTE ──────────────────────────────────────────────────────
    async enviar(destino, payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        if (this.transport !== null) {
            await this.transport.enviar(destino, payload, tipoMensaje);
        }
        await this.nodo.enviar(destino, payload);
    }
    async transmitir(payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        if (tipoMensaje === TIPO_MENSAJE.SYNC) {
            const connections = this.transport
                ? this.transport.obtenerConexiones()
                : [];
            if (connections.length > 0) {
                const promesas = connections.map((peerId) => this.enviarSyncEnvelope(peerId, payload));
                await Promise.all(promesas);
                return;
            }
        }
        if (this.transport !== null) {
            await this.transport.transmitir(payload, tipoMensaje);
        }
        await this.nodo.transmitir(payload);
    }
    async enviarSyncEnvelope(destino, payload) {
        const rawPayload = esEnvolvente(payload) ? payload.payload : payload;
        let finalPayload = rawPayload;
        const secureChannel = this.peerSecureChannels.get(destino);
        if (secureChannel &&
            secureChannel.status === "ready" &&
            secureChannel.channel) {
            const plaintext = new TextEncoder().encode(JSON.stringify(rawPayload));
            const encrypted = secureChannel.channel.encrypt(plaintext);
            finalPayload = {
                encrypted: true,
                ciphertext: bytesAHex(encrypted.ciphertext),
                iv: bytesAHex(encrypted.iv),
                tag: bytesAHex(encrypted.tag),
            };
        }
        let env = createEnvelope(TIPO_MENSAJE.SYNC, this.config.nodoId, destino, finalPayload);
        if (this.requireSignedEnvelopes) {
            env = await signEnvelope(env, this.identity);
        }
        await this.enviar(destino, env, TIPO_MENSAJE.SYNC);
    }
    async iniciarPqcHandshake(destino) {
        if (this.config.enablePqcEncryption === false)
            return;
        const existing = this.peerSecureChannels.get(destino);
        if (existing &&
            (existing.status === "initiating" || existing.status === "ready")) {
            return;
        }
        // Set status synchronously to prevent concurrent triggers!
        this.peerSecureChannels.set(destino, { status: "initiating" });
        try {
            const { payload, keysA, challengeA } = await this.pqcHandshake.initiate(destino);
            this.peerSecureChannels.set(destino, {
                status: "initiating",
                keysA,
                challengeA,
            });
            await this.enviar(destino, payload, TIPO_MENSAJE.PQC_HANDSHAKE);
        }
        catch (err) {
            this.peerSecureChannels.delete(destino);
            this.emit("error", {
                mensaje: `Error al iniciar PQC handshake con ${destino}: ${err.message}`,
            });
        }
    }
    async solicitarSyncYjs(destino, docId = "default") {
        const stateVector = this.yjsAdapter.getStateVector();
        const payload = {
            tipoSync: "solicitud",
            docId,
            datos: Array.from(stateVector),
            clock: Date.now(),
            namespace: this.defaultSyncNamespace,
        };
        await this.enviarSyncEnvelope(destino, payload);
    }
    /**
     * Publish a CRDT update to peers (optionally signed).
     */
    async broadcastYjsUpdate(update, docId = "default") {
        const payload = {
            tipoSync: "delta",
            docId,
            // JSON-safe encoding for transports that serialize to JSON
            datos: Array.from(update),
            clock: Date.now(),
        };
        let env = createEnvelope(TIPO_MENSAJE.SYNC, this.config.nodoId, "*", payload);
        if (this.requireSignedEnvelopes) {
            env = await signEnvelope(env, this.identity);
        }
        if (this.transport !== null) {
            await this.transmitir(env, TIPO_MENSAJE.SYNC);
        }
    }
    // ─── PROCESAMIENTO DE MENSAJES ───────────────────────────────────────
    /** Exposed for tests / external transports feeding envelopes. */
    async recibirEnvelope(env) {
        await this.procesarMensaje(env);
    }
    async procesarMensaje(env) {
        if (!validateEnvelope(env))
            return;
        const envolvente = env;
        if (this.deduplicator.esDuplicado(envolvente))
            return;
        // Handshake trigger
        if (this.config.enablePqcEncryption !== false &&
            this.config.nodoId < envolvente.origen &&
            !this.peerSecureChannels.has(envolvente.origen) &&
            envolvente.tipo !== TIPO_MENSAJE.PQC_HANDSHAKE &&
            envolvente.tipo !== TIPO_MENSAJE.KEM_REPLY &&
            envolvente.tipo !== TIPO_MENSAJE.PQC_ACK) {
            void this.iniciarPqcHandshake(envolvente.origen);
        }
        let processedEnvelope = envolvente;
        if (envolvente.tipo === TIPO_MENSAJE.SYNC &&
            envolvente.payload &&
            typeof envolvente.payload === "object" &&
            envolvente.payload.encrypted === true) {
            const secureChannel = this.peerSecureChannels.get(envolvente.origen);
            if (secureChannel &&
                (secureChannel.status === "ready" ||
                    secureChannel.status === "responding") &&
                secureChannel.channel) {
                try {
                    const encPayload = envolvente.payload;
                    const decryptedBytes = secureChannel.channel.decrypt(hexABytes(encPayload.ciphertext), hexABytes(encPayload.iv), hexABytes(encPayload.tag));
                    const decryptedPayload = JSON.parse(new TextDecoder().decode(decryptedBytes));
                    processedEnvelope = {
                        ...envolvente,
                        payload: decryptedPayload,
                    };
                }
                catch (err) {
                    this.emit("error", {
                        mensaje: `Error descifrando SYNC de ${envolvente.origen}: ${err.message}`,
                    });
                    return;
                }
            }
            else {
                this.emit("error", {
                    mensaje: `SYNC cifrado recibido de ${envolvente.origen} pero no hay canal seguro listo`,
                });
                return;
            }
        }
        // Signature gate for sensitive message types
        if (this.requireSignedEnvelopes &&
            (processedEnvelope.tipo === TIPO_MENSAJE.SYNC ||
                processedEnvelope.tipo === TIPO_MENSAJE.AUTHZ)) {
            const ok = await this.verificarFirmaEnvelope(processedEnvelope);
            if (!ok) {
                this.emit("error", {
                    mensaje: `Firma invalida o ausente de ${processedEnvelope.origen} (${processedEnvelope.tipo})`,
                });
                return;
            }
        }
        this.emit("mensajeRecibido", { envolvente: processedEnvelope });
        switch (processedEnvelope.tipo) {
            case TIPO_MENSAJE.HEARTBEAT:
                await this.presence.procesarHeartbeat(processedEnvelope.payload);
                break;
            case TIPO_MENSAJE.SYNC:
                await this.procesarSync(processedEnvelope);
                break;
            case TIPO_MENSAJE.SNAPSHOT:
                await this.procesarSnapshot(processedEnvelope);
                break;
            case TIPO_MENSAJE.GOVERNANCE:
                await this.procesarGovernance(processedEnvelope);
                break;
            case TIPO_MENSAJE.AUTHZ:
                await this.procesarAuthz(processedEnvelope);
                break;
            case TIPO_MENSAJE.NAMESPACE:
                await this.procesarNamespace(processedEnvelope);
                break;
            case TIPO_MENSAJE.PQC_HANDSHAKE:
                await this.procesarPqcHandshake(processedEnvelope);
                break;
            case TIPO_MENSAJE.KEM_REPLY:
                await this.procesarKemReply(processedEnvelope);
                break;
            case TIPO_MENSAJE.PQC_ACK:
                await this.procesarPqcAck(processedEnvelope);
                break;
            case TIPO_MENSAJE.GOSSIP:
                await this.procesarGossip(processedEnvelope);
                break;
            default:
                break;
        }
    }
    async procesarGossip(env) {
        const payload = env.payload;
        const mensaje = (payload?.mensaje ?? payload);
        this.meshGossip.recibirGossip(env.origen, mensaje);
    }
    async publicarGossip(payload, namespace = "global", ttl) {
        const mensaje = {
            id: crypto.randomUUID(),
            namespace,
            ttl: ttl ?? this.config.gossipTTL ?? 5,
            payload,
            origen: this.config.nodoId,
            timestamp: Date.now(),
            ruta: [this.config.nodoId],
        };
        await this.meshGossip.propagarGossip(mensaje);
    }
    async procesarPqcHandshake(env) {
        if (this.config.enablePqcEncryption === false)
            return;
        const payload = env.payload;
        const existing = this.peerSecureChannels.get(env.origen);
        if (existing &&
            (existing.status === "responding" || existing.status === "ready")) {
            return;
        }
        // Synchronous reservation
        this.peerSecureChannels.set(env.origen, { status: "responding" });
        try {
            const { payload: replyPayload, channel, challengeB, } = await this.pqcHandshake.respond(env.origen, payload);
            this.peerSecureChannels.set(env.origen, {
                status: "responding",
                challengeB,
                channel,
            });
            await this.enviar(env.origen, replyPayload, TIPO_MENSAJE.KEM_REPLY);
        }
        catch (err) {
            this.peerSecureChannels.delete(env.origen);
            this.emit("error", {
                mensaje: `Error procesando PQC_HANDSHAKE de ${env.origen}: ${err.message}`,
            });
        }
    }
    async procesarKemReply(env) {
        if (this.config.enablePqcEncryption === false)
            return;
        const payload = env.payload;
        const state = this.peerSecureChannels.get(env.origen);
        if (!state || state.status !== "initiating")
            return;
        // Move state synchronously to ready
        this.peerSecureChannels.set(env.origen, { status: "ready" });
        try {
            const { payload: ackPayload, channel } = await this.pqcHandshake.finalize(env.origen, state, payload);
            this.peerSecureChannels.set(env.origen, {
                status: "ready",
                channel,
            });
            this.emit("handshakeCompletado", { peerId: env.origen });
            await this.enviar(env.origen, ackPayload, TIPO_MENSAJE.PQC_ACK);
        }
        catch (err) {
            this.peerSecureChannels.set(env.origen, state); // revert state
            this.emit("error", {
                mensaje: `Error procesando KEM_REPLY de ${env.origen}: ${err.message}`,
            });
        }
    }
    async procesarPqcAck(env) {
        if (this.config.enablePqcEncryption === false)
            return;
        const payload = env.payload;
        const state = this.peerSecureChannels.get(env.origen);
        if (!state || state.status !== "responding")
            return;
        // Move state synchronously to ready
        this.peerSecureChannels.set(env.origen, { status: "ready" });
        try {
            await this.pqcHandshake.verifyAck(env.origen, state, payload);
            this.peerSecureChannels.set(env.origen, {
                status: "ready",
                channel: state.channel,
            });
            this.emit("handshakeCompletado", { peerId: env.origen });
        }
        catch (err) {
            this.peerSecureChannels.set(env.origen, state); // revert state
            this.emit("error", {
                mensaje: `Error procesando PQC_ACK de ${env.origen}: ${err.message}`,
            });
        }
    }
    async verificarFirmaEnvelope(env) {
        const pub = this.peerPublicKeys.get(env.origen);
        if (!pub)
            return false;
        return verifyEnvelopeSignature(env, pub, this.identity);
    }
    decodeSyncBytes(datos) {
        if (datos instanceof Uint8Array)
            return datos;
        if (Array.isArray(datos))
            return new Uint8Array(datos);
        if (typeof datos === "object" && datos !== null && "data" in datos) {
            const arr = datos.data;
            if (Array.isArray(arr))
                return new Uint8Array(arr);
        }
        return null;
    }
    async procesarSync(env) {
        const payload = env.payload;
        if (payload === undefined || typeof payload !== "object")
            return;
        const docId = payload.docId;
        if (docId === undefined)
            return;
        const namespace = payload.namespace ?? this.defaultSyncNamespace;
        if (this.requireAuthz) {
            const allowed = this.authorizer.verificarCapacidad(namespace, env.origen, CAPACIDAD_ESTANDAR.ESCRIBIR) ||
                this.authorizer.verificarCapacidad(namespace, env.origen, CAPACIDAD_ESTANDAR.SINC) ||
                this.authorizer.verificarCapacidad(namespace, env.origen, CAPACIDAD_ESTANDAR.ADMIN);
            if (!allowed) {
                this.emit("error", {
                    mensaje: `SYNC denegado: ${env.origen} sin write/sync en ${namespace}`,
                });
                return;
            }
        }
        const bytes = this.decodeSyncBytes(payload.datos);
        if (!bytes)
            return;
        const tipoSync = payload.tipoSync ?? "delta";
        if (tipoSync === "solicitud") {
            const diff = Y.encodeStateAsUpdate(this.yjsAdapter.doc, bytes);
            const responsePayload = {
                tipoSync: "delta",
                docId,
                datos: Array.from(diff),
                clock: Date.now(),
                namespace,
            };
            await this.enviarSyncEnvelope(env.origen, responsePayload);
        }
        else {
            if (bytes.length > 0) {
                this.yjsAdapter.applyUpdate(bytes, env.origen);
            }
            this.emit("syncCompletado", {
                docId,
                clock: payload.clock ?? 0,
            });
        }
    }
    async procesarSnapshot(env) {
        const snapshot = env.payload;
        const snapManager = this.snapshots.get(snapshot.docId);
        if (snapManager !== undefined) {
            await snapManager.recibirSnapshot({
                docId: snapshot.docId,
                version: snapshot.version,
                datos: snapshot.datos,
                nodosConfirmados: snapshot.nodosConfirmados,
            });
        }
    }
    async procesarGovernance(env) {
        const payload = env.payload;
        if (payload.accion === "votar" && payload.voto !== undefined) {
            this.governance.votar(payload.propuesta, payload.voto);
        }
    }
    async procesarAuthz(env) {
        const payload = env.payload;
        // Never accept unauthenticated remote capability grants
        if (this.requireAuthz) {
            const isAdmin = this.authorizer.verificarCapacidad(payload.espacio, env.origen, CAPACIDAD_ESTANDAR.ADMIN);
            const signedOk = !this.requireSignedEnvelopes ||
                (await this.verificarFirmaEnvelope(env));
            if (!isAdmin || !signedOk) {
                // Even without requireSignedEnvelopes, still require admin capability
                // for remote grants when requireAuthz is on.
                if (!isAdmin) {
                    this.emit("error", {
                        mensaje: `AUTHZ denegado: ${env.origen} no es admin de ${payload.espacio}`,
                    });
                    return;
                }
            }
        }
        if (payload.accion === "conceder") {
            this.authorizer.concederCapacidad(payload.espacio, payload.sujeto, payload.capacidad);
        }
    }
    async procesarNamespace(env) {
        const payload = env.payload;
        if (payload.accion === "unir") {
            const espacio = this.namespaces.obtenerEspacioPorNombre(payload.espacio);
            if (espacio !== null) {
                this.namespaces.unirNodo(espacio.id, payload.nodoId);
            }
        }
    }
    // ─── EVENTOS DE NODO ────────────────────────────────────────────────
    onNodoConectado(nodoId) {
        this.namespaces.unirNodo(this.namespaces.obtenerEspacioPorNombre("global")?.id ?? "", nodoId);
    }
    onNodoDesconectado(nodoId) {
        const espacios = this.namespaces.obtenerEspaciosDeNodo(nodoId);
        for (const espacio of espacios) {
            this.namespaces.abandonarNodo(espacio.id, nodoId);
        }
    }
    // ─── OP LOG ──────────────────────────────────────────────────────────
    obtenerOLog(docId) {
        const existente = this.logsDoc.get(docId);
        if (existente !== undefined)
            return existente;
        const opLog = new OpLog({
            docId,
            storage: this.storage,
        });
        this.logsDoc.set(docId, opLog);
        return opLog;
    }
    // ─── SYNC ────────────────────────────────────────────────────────────
    obtenerSyncEngine(docId) {
        const existente = this.syncs.get(docId);
        if (existente !== undefined)
            return existente;
        const opLog = this.obtenerOLog(docId);
        const sync = new SyncEngine({
            docId,
            opLog,
        });
        this.syncs.set(docId, sync);
        return sync;
    }
    // ─── SNAPSHOT ────────────────────────────────────────────────────────
    obtenerSnapshotManager(docId) {
        const existente = this.snapshots.get(docId);
        if (existente !== undefined)
            return existente;
        const snap = createSnapshotManager({
            docId,
            storage: this.storage,
            interval: this.config.snapshotInterval,
        });
        this.snapshots.set(docId, snap);
        return snap;
    }
    // ─── SNAPSHOT RECOVERY & COMPACTION ──────────────────────────────────
    async generarSnapshotAutomatico() {
        try {
            const latestSnapshotEntry = await this.storage.get("storage:snapshot:latest");
            const prevSnapshotId = latestSnapshotEntry
                ? latestSnapshotEntry.valor.id
                : undefined;
            const grants = Array.from(this.authorizer.obtenerGrantsMap().entries());
            const roleAssignments = Array.from(this.authorizer.obtenerRoleAssignmentsMap().entries());
            let profiles = [];
            if (this.profiles) {
                profiles = this.profiles.exportCache();
            }
            const merkleTree = this.merkleTree;
            const propuestas = this.governance.obtenerPropuestas();
            const governance = {
                propuestas: [...propuestas],
                timestamp: Date.now(),
            };
            const subscriptions = Array.from(this.subscriptions.entries());
            let lastOpSequence = 0;
            for (const opLog of this.logsDoc.values()) {
                lastOpSequence = Math.max(lastOpSequence, opLog.obtenerUltimaSecuencia());
            }
            const id = `snapshot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
            const state = {
                grants,
                roleAssignments,
                profiles,
                merkleTree,
                governance,
                subscriptions,
                lastOpSequence,
            };
            const snapshot = {
                id,
                timestamp: Date.now(),
                state,
                prevSnapshotId,
            };
            if (this.identity) {
                const serialized = canonicalStringify(JSON.parse(JSON.stringify(state)));
                const signatureBytes = await this.identity.firmar(new TextEncoder().encode(serialized));
                snapshot.signature = bytesAHex(signatureBytes);
            }
            await this.storage.set("storage:snapshot:latest", snapshot);
            const historyEntry = await this.storage.get("storage:snapshot:history");
            let history = historyEntry ? historyEntry.valor : [];
            if (!Array.isArray(history)) {
                history = [];
            }
            history.push(snapshot);
            const maxSnaps = this.snapshotConfig.maxSnapshots || 3;
            if (history.length > maxSnaps) {
                history = history.slice(-maxSnaps);
            }
            await this.storage.set("storage:snapshot:history", history);
            if (lastOpSequence > 0) {
                for (const opLog of this.logsDoc.values()) {
                    await opLog.compactar(lastOpSequence);
                }
            }
            return snapshot;
        }
        catch (err) {
            this.emit("error", {
                mensaje: `Error al generar snapshot automático: ${err.message}`,
            });
            return null;
        }
    }
    async restaurarDesdeSnapshot() {
        try {
            const latestEntry = await this.storage.get("storage:snapshot:latest");
            if (!latestEntry) {
                await this.reconstruirDesdeOpLogCompleto();
                return false;
            }
            const snapshot = latestEntry.valor;
            if (snapshot.signature) {
                const isValid = await this.verificarFirmaSnapshot(snapshot);
                if (!isValid) {
                    throw new Error("Firma del snapshot invalida o corrupta");
                }
            }
            await this.aplicarEstadoSnapshot(snapshot);
            this.snapshotRestored = true;
            const lastSeq = snapshot.state.lastOpSequence ?? 0;
            for (const [docId, opLog] of this.logsDoc.entries()) {
                if (docId === "maloca_profiles" && this.profiles) {
                    await this.profiles.loadProfiles(true);
                }
                else if (docId === "maloca_karma" && this.karma) {
                    await this.karma.loadFromOpLog(true);
                }
            }
            return true;
        }
        catch (err) {
            this.emit("error", {
                mensaje: `Recuperacion desde snapshot fallida, cayendo a OpLog completo: ${err.message}`,
            });
            await this.reconstruirDesdeOpLogCompleto();
            return false;
        }
    }
    async verificarFirmaSnapshot(snapshot) {
        if (!snapshot.signature)
            return false;
        try {
            const serialized = canonicalStringify(JSON.parse(JSON.stringify(snapshot.state)));
            const signatureBytes = hexABytes(snapshot.signature);
            const pubKey = this.identity.exportarPublico();
            return await this.identity.verificar(new TextEncoder().encode(serialized), signatureBytes, pubKey);
        }
        catch {
            return false;
        }
    }
    async aplicarEstadoSnapshot(snapshot) {
        if (snapshot.state.grants) {
            this.authorizer.cargarGrantsMap(snapshot.state.grants);
        }
        if (snapshot.state.roleAssignments) {
            this.authorizer.cargarRoleAssignmentsMap(snapshot.state.roleAssignments);
        }
        if (snapshot.state.profiles && this.profiles) {
            this.profiles.importCache(snapshot.state.profiles);
        }
        if (snapshot.state.merkleTree) {
            const mtData = snapshot.state.merkleTree;
            if (Array.isArray(mtData.leaves)) {
                const mt = new MerkleTree(mtData.leaves);
                if (mtData.signature) {
                    mt.signature = mtData.signature;
                }
                this.merkleTree = mt;
            }
            else if (mtData instanceof MerkleTree) {
                this.merkleTree = mtData;
            }
        }
        if (snapshot.state.governance && snapshot.state.governance.propuestas) {
            this.governance.importarPropuestas(snapshot.state.governance.propuestas);
        }
        if (snapshot.state.subscriptions) {
            this.subscriptions.clear();
            for (const [k, v] of snapshot.state.subscriptions) {
                this.subscriptions.set(k, v);
            }
        }
    }
    async reconstruirDesdeOpLogCompleto() {
        this.snapshotRestored = false;
        this.authorizer.cargarGrantsMap([]);
        this.authorizer.cargarRoleAssignmentsMap([]);
        if (this.profiles) {
            this.profiles.importCache([]);
        }
        this.merkleTree = new MerkleTree();
        this.governance.destruir();
        this.subscriptions.clear();
        if (this.profiles) {
            await this.profiles.loadProfiles(false);
        }
        if (this.karma) {
            await this.karma.loadFromOpLog(false);
        }
    }
    // ─── EVENTOS ─────────────────────────────────────────────────────────
    on(tipo, handler) {
        this.eventTarget.addEventListener(tipo, handler);
    }
    off(tipo, handler) {
        this.eventTarget.removeEventListener(tipo, handler);
    }
    emit(tipo, detalle) {
        const evento = new CustomEvent(tipo, { detail: detalle });
        this.eventTarget.dispatchEvent(evento);
    }
}
function esEnvolvente(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const candidate = valor;
    return (typeof candidate.id === "string" &&
        typeof candidate.tipo === "string" &&
        typeof candidate.origen === "string" &&
        typeof candidate.destino === "string" &&
        typeof candidate.timestamp === "number" &&
        candidate.payload !== undefined);
}
//# sourceMappingURL=edge-mesh.js.map