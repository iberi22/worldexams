export class ChunkSyncManager {
    nodeId;
    currentLamport = 0;
    chunks = new Map();
    retryQueue = [];
    maxRetries;
    retryDelayMs;
    constructor(config) {
        this.nodeId = config.nodeId;
        this.maxRetries = config.maxRetries ?? 3;
        this.retryDelayMs = config.retryDelayMs ?? 1000;
    }
    getLamportTimestamp() {
        return this.currentLamport;
    }
    tick() {
        this.currentLamport += 1;
        return this.currentLamport;
    }
    createChunk(docId, payload) {
        const ts = this.tick();
        const chunkId = `${docId}_${this.nodeId}_${ts}_${Date.now()}`;
        const chunk = {
            id: chunkId,
            docId,
            payload,
            lamportTimestamp: ts,
            nodeId: this.nodeId,
            version: 1,
            createdAt: Date.now(),
        };
        this.chunks.set(docId, chunk);
        return chunk;
    }
    receiveChunk(incoming) {
        // Advance local Lamport clock
        this.currentLamport =
            Math.max(this.currentLamport, incoming.lamportTimestamp) + 1;
        const existing = this.chunks.get(incoming.docId);
        if (!existing) {
            this.chunks.set(incoming.docId, incoming);
            return { accepted: true };
        }
        // Conflict reconciliation using Lamport timestamps
        if (incoming.lamportTimestamp > existing.lamportTimestamp) {
            this.chunks.set(incoming.docId, incoming);
            return {
                accepted: true,
                resolution: {
                    winner: incoming,
                    loser: existing,
                    resolutionStrategy: "lamport",
                },
            };
        }
        else if (incoming.lamportTimestamp < existing.lamportTimestamp) {
            return {
                accepted: false,
                resolution: {
                    winner: existing,
                    loser: incoming,
                    resolutionStrategy: "lamport",
                },
            };
        }
        else {
            // Deterministic tie-breaker: lex compare node IDs
            if (incoming.nodeId > existing.nodeId) {
                this.chunks.set(incoming.docId, incoming);
                return {
                    accepted: true,
                    resolution: {
                        winner: incoming,
                        loser: existing,
                        resolutionStrategy: "node_tiebreak",
                    },
                };
            }
            else {
                return {
                    accepted: false,
                    resolution: {
                        winner: existing,
                        loser: incoming,
                        resolutionStrategy: "node_tiebreak",
                    },
                };
            }
        }
    }
    getChunk(docId) {
        return this.chunks.get(docId);
    }
    enqueueRetry(chunk) {
        this.retryQueue.push({
            chunk,
            attempts: 0,
            nextRetry: Date.now() + this.retryDelayMs,
        });
    }
    getPendingRetries() {
        const now = Date.now();
        return this.retryQueue
            .filter((item) => item.nextRetry <= now && item.attempts < this.maxRetries)
            .map((item) => {
            item.attempts += 1;
            item.nextRetry = now + this.retryDelayMs * 2 ** item.attempts;
            return item.chunk;
        });
    }
    clearQueue() {
        this.retryQueue.length = 0;
    }
}
//# sourceMappingURL=ChunkSyncManager.js.map