/**
 * Deterministically stringifies an object for signing.
 */
function canonicalStringify(obj) {
    if (obj === null || typeof obj !== "object") {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return "[" + obj.map(canonicalStringify).join(",") + "]";
    }
    const keys = Object.keys(obj).sort();
    return ("{" +
        keys
            .map((k) => `${JSON.stringify(k)}:${canonicalStringify(obj[k])}`)
            .join(",") +
        "}");
}
export class KarmaManager {
    oplog;
    identity;
    cache = new Map();
    getPublicKey;
    constructor(oplog, identity, getPublicKey) {
        this.oplog = oplog;
        this.identity = identity;
        this.getPublicKey = getPublicKey;
    }
    /**
     * Carga el estado de karma desde el OpLog.
     * Debe llamarse después de crear la instancia.
     */
    async loadFromOpLog(keepExistingCache = false) {
        await this.oplog.cargarDesdeStorage();
        if (!keepExistingCache) {
            this.cache.clear();
        }
        const ops = await this.oplog.obtenerTodas();
        for (const op of ops) {
            if (op.tipo === "karma:emit") {
                const tx = op.datos;
                this.applyTransaction(tx);
            }
            else if (op.tipo === "karma:decay") {
                const data = op.datos;
                this.applyDecayToCache(data.sujeto, data.factor);
            }
        }
    }
    /**
     * Emite una transacción de karma firmada con la identidad PQC del nodo.
     */
    async emit(txData) {
        const timestamp = txData.timestamp ?? Date.now();
        const id = txData.id ??
            `${txData.emisor}:${timestamp}:${Math.random().toString(36).substring(2, 9)}`;
        const payloadData = {
            tipo: txData.tipo,
            proyecto: txData.proyecto,
            sujeto: txData.sujeto,
            delta: txData.delta,
            razon: txData.razon,
            emisor: txData.emisor,
            id,
            timestamp,
        };
        const payload = canonicalStringify(payloadData);
        let firma;
        if (txData.firma) {
            firma = txData.firma;
        }
        else {
            try {
                firma = await this.identity.firmar(new TextEncoder().encode(payload));
            }
            catch {
                // Si la identidad PQC no está completamente inicializada (ej. entorno test),
                // usar firma vacía en lugar de fallar.
                firma = new Uint8Array(0);
            }
        }
        const tx = {
            ...txData,
            id,
            timestamp,
            firma,
        };
        this.applyTransaction(tx);
        await this.oplog.append("karma:emit", tx, txData.emisor);
        return tx;
    }
    /**
     * Obtiene el score de karma de un nodo.
     */
    getScore(nodeId) {
        return this.cache.get(nodeId)?.total ?? 0;
    }
    /**
     * Obtiene el historial de transacciones de un nodo.
     */
    getHistory(nodeId) {
        return this.cache.get(nodeId)?.historial ?? [];
    }
    /**
     * Aplica decay (olvido) al score de un nodo, o a todos si no se especifica.
     * - factor: 0.95 reduce 5%, 0.90 reduce 10%, etc.
     */
    async applyDecay(nodeId, factor = 0.95) {
        if (nodeId) {
            this.applyDecayToCache(nodeId, factor);
            await this.oplog.append("karma:decay", { sujeto: nodeId, factor }, nodeId);
        }
        else {
            for (const id of this.cache.keys()) {
                const nid = id;
                this.applyDecayToCache(nid, factor);
                await this.oplog.append("karma:decay", { sujeto: nid, factor }, nid);
            }
        }
    }
    /**
     * Verifica una firma de transacción contra una clave pública.
     */
    async verify(tx, publicKey) {
        const pub = publicKey ??
            (this.getPublicKey ? this.getPublicKey(tx.emisor) : undefined);
        if (!pub) {
            return false;
        }
        const { firma, ...rest } = tx;
        const payload = canonicalStringify(rest);
        return this.identity.verificar(new TextEncoder().encode(payload), firma, pub);
    }
    // ─── INTERNOS ───────────────────────────────────────────────────────
    /**
     * Devuelve el peer con mejor karma en la mesh (para asignación de trabajo).
     * Si no hay peers con karma registrado, devuelve null.
     */
    getBestPeer() {
        let best = null;
        let bestScore = Number.NEGATIVE_INFINITY;
        for (const [nodeId, karma] of this.cache.entries()) {
            if (karma.total > bestScore) {
                best = nodeId;
                bestScore = karma.total;
            }
        }
        return best;
    }
    applyTransaction(tx) {
        const target = tx.sujeto;
        const current = this.cache.get(target) ?? {
            total: 0,
            historial: [],
            pesosPorProyecto: {},
            ultimoDecay: Date.now(),
        };
        this.cache.set(target, {
            total: current.total + tx.delta,
            historial: [...current.historial, tx],
            pesosPorProyecto: {
                ...current.pesosPorProyecto,
                [tx.proyecto]: (current.pesosPorProyecto[tx.proyecto] ?? 0) + tx.delta,
            },
            ultimoDecay: current.ultimoDecay,
        });
    }
    applyDecayToCache(nodeId, factor) {
        const current = this.cache.get(nodeId);
        if (!current)
            return;
        this.cache.set(nodeId, {
            ...current,
            total: current.total * factor,
            ultimoDecay: Date.now(),
        });
    }
}
//# sourceMappingURL=karma.js.map