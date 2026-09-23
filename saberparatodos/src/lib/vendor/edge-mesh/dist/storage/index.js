import { openDB } from "idb";
// ─── ERROR TYPES ───────────────────────────────────────────────────────────
export class StorageError extends Error {
    codigo;
    constructor(mensaje, codigo = "STORAGE_ERROR") {
        super(mensaje);
        this.name = "StorageError";
        this.codigo = codigo;
    }
}
// ─── IN-MEMORY STORAGE ─────────────────────────────────────────────────────
export class InMemoryStorage {
    datos;
    constructor() {
        this.datos = new Map();
    }
    async get(key) {
        const entry = this.datos.get(key);
        if (entry === undefined)
            return null;
        return entry;
    }
    async set(key, valor) {
        const existente = this.datos.get(key);
        this.datos.set(key, {
            key,
            valor,
            timestamp: Date.now(),
            version: (existente?.version ?? 0) + 1,
        });
    }
    async put(key, valor) {
        return this.set(key, valor);
    }
    async delete(key) {
        return this.datos.delete(key);
    }
    async list(filter) {
        let entries = Array.from(this.datos.values());
        if (filter?.prefijo !== undefined) {
            entries = entries.filter((e) => e.key.startsWith(filter.prefijo));
        }
        if (filter?.desde !== undefined) {
            entries = entries.filter((e) => e.timestamp >= filter.desde);
        }
        if (filter?.hasta !== undefined) {
            entries = entries.filter((e) => e.timestamp <= filter.hasta);
        }
        entries.sort((a, b) => a.timestamp - b.timestamp);
        if (filter?.limite !== undefined && filter.limite > 0) {
            entries = entries.slice(0, filter.limite);
        }
        return entries;
    }
    async clear(prefijo) {
        if (prefijo === undefined) {
            this.datos.clear();
            return;
        }
        for (const key of this.datos.keys()) {
            if (key.startsWith(prefijo)) {
                this.datos.delete(key);
            }
        }
    }
    async size() {
        return this.datos.size;
    }
}
const CONFIG_POR_DEFECTO = {
    dbName: "edge-mesh",
    storeName: "kv",
    version: 1,
};
export class StorageManager {
    config;
    db = null;
    initPromise;
    constructor(config = {}) {
        this.config = { ...CONFIG_POR_DEFECTO, ...config };
        this.initPromise = this.inicializar();
    }
    async inicializar() {
        const storeName = this.config.storeName;
        const db = await openDB(this.config.dbName, this.config.version, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: "key" });
                }
            },
        });
        this.db = db;
        return db;
    }
    async obtenerDb() {
        if (this.db !== null)
            return this.db;
        return this.initPromise;
    }
    async get(key) {
        const db = await this.obtenerDb();
        const result = await db.get(this.config.storeName, key);
        if (result === undefined)
            return null;
        return result;
    }
    async set(key, valor) {
        const db = await this.obtenerDb();
        const existente = await this.get(key);
        const entry = {
            key,
            valor,
            timestamp: Date.now(),
            version: (existente?.version ?? 0) + 1,
        };
        await db.put(this.config.storeName, entry);
    }
    async put(key, valor) {
        return this.set(key, valor);
    }
    async delete(key) {
        const db = await this.obtenerDb();
        const existente = await this.get(key);
        if (existente === null)
            return false;
        await db.delete(this.config.storeName, key);
        return true;
    }
    async list(filter) {
        const db = await this.obtenerDb();
        const all = await db.getAll(this.config.storeName);
        let entries = all;
        if (filter?.prefijo !== undefined) {
            entries = entries.filter((e) => e.key.startsWith(filter.prefijo));
        }
        if (filter?.desde !== undefined) {
            entries = entries.filter((e) => e.timestamp >= filter.desde);
        }
        if (filter?.hasta !== undefined) {
            entries = entries.filter((e) => e.timestamp <= filter.hasta);
        }
        entries.sort((a, b) => a.timestamp - b.timestamp);
        if (filter?.limite !== undefined && filter.limite > 0) {
            entries = entries.slice(0, filter.limite);
        }
        return entries;
    }
    async clear(prefijo) {
        const db = await this.obtenerDb();
        if (prefijo === undefined) {
            await db.clear(this.config.storeName);
            return;
        }
        const all = await db.getAll(this.config.storeName);
        for (const entry of all) {
            if (entry.key.startsWith(prefijo)) {
                await db.delete(this.config.storeName, entry.key);
            }
        }
    }
    async size() {
        const db = await this.obtenerDb();
        const all = await db.getAll(this.config.storeName);
        return all.length;
    }
    async cerrar() {
        if (this.db !== null) {
            this.db.close();
            this.db = null;
        }
    }
}
// ─── Y.DOC PERSISTENCE ─────────────────────────────────────────────────────
export { PayloadOptimizer } from "./optimizer.js";
export { YDocPersistence, } from "./ydoc-persistence.js";
//# sourceMappingURL=index.js.map