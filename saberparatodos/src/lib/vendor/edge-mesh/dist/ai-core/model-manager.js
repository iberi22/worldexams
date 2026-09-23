import { getModel, recommendFor, } from "./model-registry.js";
class MemoryMetadataStore {
    entries = new Map();
    resumeEntries = new Map();
    async get(modelId) {
        return this.entries.get(modelId);
    }
    async list() {
        return Array.from(this.entries.values());
    }
    async put(model) {
        this.entries.set(model.modelId, model);
    }
    async delete(modelId) {
        return this.entries.delete(modelId);
    }
    async getResume(modelId) {
        return this.resumeEntries.get(modelId);
    }
    async putResume(modelId, state) {
        this.resumeEntries.set(modelId, state);
    }
    async deleteResume(modelId) {
        this.resumeEntries.delete(modelId);
    }
}
class IndexedDbMetadataStore {
    database;
    constructor() {
        this.database = new Promise((resolve, reject) => {
            const request = indexedDB.open("edge-mesh-ai-core", 2);
            request.onupgradeneeded = () => {
                if (!request.result.objectStoreNames.contains("models")) {
                    request.result.createObjectStore("models", { keyPath: "modelId" });
                }
                if (!request.result.objectStoreNames.contains("resume")) {
                    request.result.createObjectStore("resume", { keyPath: "modelId" });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async request(storeName, mode, run) {
        const database = await this.database;
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(storeName, mode);
            const request = run(transaction.objectStore(storeName));
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async get(modelId) {
        return this.request("models", "readonly", (store) => store.get(modelId));
    }
    async list() {
        return this.request("models", "readonly", (store) => store.getAll());
    }
    async put(model) {
        await this.request("models", "readwrite", (store) => store.put(model));
    }
    async delete(modelId) {
        const existing = await this.get(modelId);
        if (existing === undefined)
            return false;
        await this.request("models", "readwrite", (store) => store.delete(modelId));
        return true;
    }
    async getResume(modelId) {
        const record = await this.request("resume", "readonly", (store) => store.get(modelId));
        return record;
    }
    async putResume(modelId, state) {
        await this.request("resume", "readwrite", (store) => store.put({ ...state, modelId }));
    }
    async deleteResume(modelId) {
        await this.request("resume", "readwrite", (store) => store.delete(modelId));
    }
}
async function createMetadataStore(backend) {
    if (backend === "memory" || typeof indexedDB === "undefined") {
        return new MemoryMetadataStore();
    }
    try {
        const store = new IndexedDbMetadataStore();
        await store.list();
        return store;
    }
    catch {
        return new MemoryMetadataStore();
    }
}
function cacheKey(modelId) {
    return `https://edge-mesh.invalid/ai-core/models/${encodeURIComponent(modelId)}`;
}
function sourceUrl(model) {
    if (model.url !== undefined)
        return model.url;
    if (model.hfRepo !== undefined) {
        return `https://huggingface.co/${model.hfRepo}/resolve/main/model.onnx`;
    }
    throw new Error(`Model ${model.id} has no downloadable source`);
}
function parseContentLength(response) {
    const value = Number(response.headers.get("content-length"));
    return Number.isFinite(value) && value > 0 ? value : null;
}
function partialKey(modelId) {
    return `${modelId}:partial`;
}
function concatBytes(chunks) {
    const total = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return bytes;
}
export class ModelManager {
    backend;
    cacheName;
    fetcher;
    onProgress;
    metadata;
    progress = new Map();
    memoryArtifacts = new Map();
    inFlight = new Map();
    constructor(options = {}) {
        this.backend = options.backend ?? "auto";
        this.cacheName = options.cacheName ?? "edge-mesh-ai-core-v1";
        this.fetcher =
            options.fetcher ??
                (typeof globalThis.fetch === "function"
                    ? globalThis.fetch.bind(globalThis)
                    : undefined);
        this.onProgress = options.onProgress;
        this.metadata = createMetadataStore(this.backend);
    }
    recommendFor(device) {
        return recommendFor(device.tier);
    }
    getProgress(modelId) {
        return (this.progress.get(modelId) ?? {
            modelId,
            state: "idle",
            loadedBytes: 0,
            totalBytes: null,
            percent: null,
        });
    }
    async downloaded() {
        const store = await this.metadata;
        return (await store.list()).sort((left, right) => right.downloadedAt - left.downloadedAt);
    }
    async ensure(modelId, onProgress) {
        const model = getModel(modelId);
        if (model === undefined) {
            throw new Error(`Model is not approved: ${modelId}`);
        }
        const store = await this.metadata;
        const existing = await store.get(modelId);
        if (existing !== undefined) {
            this.report({
                modelId,
                state: "ready",
                loadedBytes: existing.sizeBytes,
                totalBytes: existing.sizeBytes,
                percent: 100,
            }, onProgress);
            return existing;
        }
        const active = this.inFlight.get(modelId);
        if (active !== undefined)
            return active;
        const download = this.download(model, onProgress).finally(() => {
            this.inFlight.delete(modelId);
        });
        this.inFlight.set(modelId, download);
        return download;
    }
    async remove(modelId) {
        const store = await this.metadata;
        const existing = await store.get(modelId);
        this.memoryArtifacts.delete(modelId);
        this.memoryArtifacts.delete(partialKey(modelId));
        await store.deleteResume(modelId);
        if (this.canUseCacheApi()) {
            const cache = await caches.open(this.cacheName);
            await cache.delete(cacheKey(modelId));
        }
        const deleted = await store.delete(modelId);
        this.progress.delete(modelId);
        return existing !== undefined || deleted;
    }
    /**
     * Returns the raw bytes of a completed download, from the in-memory
     * artifact map or the Cache API store. Resolves to `undefined` when the
     * model is not fully downloaded.
     */
    async readBytes(modelId) {
        const artifact = this.memoryArtifacts.get(modelId);
        if (artifact !== undefined)
            return artifact;
        if (this.canUseCacheApi()) {
            const cache = await caches.open(this.cacheName);
            const response = await cache.match(cacheKey(modelId));
            if (response !== undefined) {
                return new Uint8Array(await response.arrayBuffer());
            }
        }
        return undefined;
    }
    canUseCacheApi() {
        return (this.backend !== "memory" &&
            typeof caches !== "undefined" &&
            typeof caches.open === "function");
    }
    report(progress, callback) {
        this.progress.set(progress.modelId, progress);
        this.onProgress?.(progress);
        callback?.(progress);
    }
    async consume(stream, modelId, totalBytes, callback, chunks, offset = 0) {
        const reader = stream.getReader();
        let loadedBytes = offset;
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            loadedBytes += value.byteLength;
            chunks?.push(value);
            this.report({
                modelId,
                state: "downloading",
                loadedBytes,
                totalBytes,
                percent: totalBytes === null
                    ? null
                    : Math.min(100, (loadedBytes / totalBytes) * 100),
            }, callback);
        }
        return loadedBytes;
    }
    async clearPartial(store, modelId) {
        this.memoryArtifacts.delete(partialKey(modelId));
        await store.deleteResume(modelId);
    }
    async download(model, callback) {
        const url = sourceUrl(model);
        const expectedBytes = model.sizeBytes;
        const store = await this.metadata;
        let resume = await store.getResume(model.id);
        let resumeBytes = resume?.loadedBytes ?? 0;
        if (resumeBytes > 0 && !this.memoryArtifacts.has(partialKey(model.id))) {
            // Byte-level resume needs the partial payload, which the memory
            // backend keeps in-process; without it, restart the download.
            // TODO(browser): persist partial bytes (IndexedDB/Cache API) so
            // resume survives page reloads on the Cache API backend too.
            await this.clearPartial(store, model.id);
            resume = undefined;
            resumeBytes = 0;
        }
        this.report({
            modelId: model.id,
            state: "downloading",
            loadedBytes: resumeBytes,
            totalBytes: expectedBytes,
            percent: expectedBytes > 0
                ? Math.min(100, (resumeBytes / expectedBytes) * 100)
                : null,
        }, callback);
        const chunks = [];
        let etag;
        let lastModified;
        try {
            if (this.fetcher === undefined) {
                throw new Error("Fetch API is unavailable");
            }
            const headers = {};
            if (resumeBytes > 0) {
                headers.range = `bytes=${resumeBytes}-`;
                const validator = resume?.etag ?? resume?.lastModified;
                if (validator !== undefined)
                    headers["if-range"] = validator;
            }
            let response = await this.fetcher(url, resumeBytes > 0 ? { headers } : undefined);
            if (response.status === 416 && resumeBytes > 0) {
                // The stored range is no longer satisfiable; restart fresh.
                await this.clearPartial(store, model.id);
                resumeBytes = 0;
                response = await this.fetcher(url);
            }
            if (!response.ok) {
                throw new Error(`Model download failed with HTTP ${response.status}`);
            }
            const resumed = resumeBytes > 0 && response.status === 206;
            if (resumeBytes > 0 && !resumed) {
                // The server ignored the Range header; drop the partial state.
                await this.clearPartial(store, model.id);
                resumeBytes = 0;
            }
            etag = response.headers.get("etag") ?? undefined;
            lastModified = response.headers.get("last-modified") ?? undefined;
            const totalBytes = resumed
                ? resumeBytes + (parseContentLength(response) ?? 0)
                : (parseContentLength(response) ?? expectedBytes);
            const offset = resumed ? resumeBytes : 0;
            let loadedBytes = offset;
            if (response.body !== null && this.canUseCacheApi() && !resumed) {
                const [cacheStream, progressStream] = response.body.tee();
                const cache = await caches.open(this.cacheName);
                const cacheWrite = cache.put(cacheKey(model.id), new Response(cacheStream, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                }));
                loadedBytes = await this.consume(progressStream, model.id, totalBytes, callback, undefined, offset);
                await cacheWrite;
            }
            else if (response.body !== null) {
                const prior = this.memoryArtifacts.get(partialKey(model.id));
                loadedBytes = await this.consume(response.body, model.id, totalBytes, callback, chunks, offset);
                const bytes = resumed && prior !== undefined
                    ? concatBytes([prior, ...chunks])
                    : concatBytes(chunks);
                this.memoryArtifacts.set(model.id, bytes);
                await this.clearPartial(store, model.id);
                if (resumed && this.canUseCacheApi()) {
                    const cache = await caches.open(this.cacheName);
                    const payload = bytes.slice();
                    await cache.put(cacheKey(model.id), new Response(payload.buffer, {
                        headers: response.headers,
                    }));
                }
            }
            else {
                const received = new Uint8Array(await response.arrayBuffer());
                const prior = this.memoryArtifacts.get(partialKey(model.id));
                const bytes = resumed && prior !== undefined
                    ? concatBytes([prior, received])
                    : received;
                loadedBytes = offset + received.byteLength;
                this.memoryArtifacts.set(model.id, bytes);
                await this.clearPartial(store, model.id);
            }
            const metadata = {
                modelId: model.id,
                sourceUrl: url,
                sizeBytes: loadedBytes,
                downloadedAt: Date.now(),
            };
            await store.put(metadata);
            await store.deleteResume(model.id);
            this.report({
                modelId: model.id,
                state: "ready",
                loadedBytes,
                totalBytes: loadedBytes,
                percent: 100,
            }, callback);
            return metadata;
        }
        catch (error) {
            const loadedBytes = this.progress.get(model.id)?.loadedBytes ?? resumeBytes;
            if (chunks.length > 0 || resumeBytes > 0) {
                const prior = this.memoryArtifacts.get(partialKey(model.id));
                const partial = prior !== undefined
                    ? concatBytes([prior, ...chunks])
                    : concatBytes(chunks);
                if (partial.byteLength > 0) {
                    this.memoryArtifacts.set(partialKey(model.id), partial);
                    await store.putResume(model.id, {
                        loadedBytes: partial.byteLength,
                        ...(etag !== undefined ? { etag } : {}),
                        ...(lastModified !== undefined ? { lastModified } : {}),
                        updatedAt: Date.now(),
                    });
                }
            }
            this.report({
                modelId: model.id,
                state: "error",
                loadedBytes,
                totalBytes: expectedBytes,
                percent: null,
                error: error instanceof Error ? error.message : String(error),
            }, callback);
            throw error;
        }
    }
}
//# sourceMappingURL=model-manager.js.map