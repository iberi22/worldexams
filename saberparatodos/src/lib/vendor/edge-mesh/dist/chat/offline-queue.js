export class MeshPresence {
    static onlineNodes = new Set();
    static isOnline(peerId) {
        return MeshPresence.onlineNodes.has(peerId);
    }
    static setOnline(peerId, online) {
        if (online) {
            MeshPresence.onlineNodes.add(peerId);
        }
        else {
            MeshPresence.onlineNodes.delete(peerId);
        }
    }
    static clear() {
        MeshPresence.onlineNodes.clear();
    }
}
export class PersistentOfflineQueue {
    storage;
    maxCapacity;
    senders = new Map();
    channelPeers = new Map(); // channelId -> peerId
    constructor(storage, maxCapacity = 1000) {
        this.storage = storage;
        this.maxCapacity = maxCapacity;
    }
    obtenerKey(channelId) {
        return `offline:queue:${channelId}`;
    }
    async enqueue(channelId, message) {
        const key = this.obtenerKey(channelId);
        const entry = await this.storage.get(key);
        const queue = entry ? entry.valor || [] : [];
        if (queue.length >= this.maxCapacity) {
            console.warn(`[OfflineQueue] Límite de tamaño alcanzado para el canal ${channelId}. Descartando el mensaje más viejo.`);
            queue.shift(); // FIFO/LRU: discard oldest
        }
        queue.push(message);
        await this.storage.set(key, queue);
    }
    async dequeue(channelId) {
        const key = this.obtenerKey(channelId);
        const entry = await this.storage.get(key);
        const queue = entry ? entry.valor || [] : [];
        if (queue.length === 0)
            return null;
        const message = queue.shift();
        await this.storage.set(key, queue);
        return message;
    }
    async peek(channelId) {
        const key = this.obtenerKey(channelId);
        const entry = await this.storage.get(key);
        return entry ? entry.valor || [] : [];
    }
    async size(channelId) {
        const key = this.obtenerKey(channelId);
        const entry = await this.storage.get(key);
        return entry ? (entry.valor || []).length : 0;
    }
    async flush(channelId) {
        const key = this.obtenerKey(channelId);
        const entry = await this.storage.get(key);
        if (!entry || !entry.valor || entry.valor.length === 0)
            return 0;
        const queue = entry.valor;
        const count = queue.length;
        const sender = this.senders.get(channelId);
        if (sender) {
            for (const msg of queue) {
                await sender(msg);
            }
        }
        await this.storage.set(key, []);
        return count;
    }
    registerChannel(channelId, peerId, sender) {
        this.channelPeers.set(channelId, peerId);
        this.senders.set(channelId, sender);
    }
    async handlePeerReconnect(peerId) {
        // Flush all channels registered to this peerId
        for (const [channelId, associatedPeerId] of this.channelPeers.entries()) {
            if (associatedPeerId === peerId) {
                await this.flush(channelId);
            }
        }
        // Also support flushing if the channel name itself is the peerId or private:peerId
        await this.flush(peerId);
        await this.flush(`private:${peerId}`);
    }
}
//# sourceMappingURL=offline-queue.js.map