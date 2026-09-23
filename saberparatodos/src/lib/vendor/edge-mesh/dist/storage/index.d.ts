import type { StorageEntry, StorageFilter } from "../types/index.js";
export interface IStorage {
    get<T>(key: string): Promise<StorageEntry<T> | null>;
    set<T>(key: string, valor: T): Promise<void>;
    put<T>(key: string, valor: T): Promise<void>;
    delete(key: string): Promise<boolean>;
    list(filter?: StorageFilter): Promise<readonly StorageEntry<unknown>[]>;
    clear(prefijo?: string): Promise<void>;
    size(): Promise<number>;
}
export declare class StorageError extends Error {
    readonly codigo: string;
    constructor(mensaje: string, codigo?: string);
}
export declare class InMemoryStorage implements IStorage {
    private readonly datos;
    constructor();
    get<T>(key: string): Promise<StorageEntry<T> | null>;
    set<T>(key: string, valor: T): Promise<void>;
    put<T>(key: string, valor: T): Promise<void>;
    delete(key: string): Promise<boolean>;
    list(filter?: StorageFilter): Promise<readonly StorageEntry<unknown>[]>;
    clear(prefijo?: string): Promise<void>;
    size(): Promise<number>;
}
export interface StorageManagerConfig {
    readonly dbName: string;
    readonly storeName: string;
    readonly version: number;
}
export declare class StorageManager implements IStorage {
    private readonly config;
    private db;
    private readonly initPromise;
    constructor(config?: Partial<StorageManagerConfig>);
    private inicializar;
    private obtenerDb;
    get<T>(key: string): Promise<StorageEntry<T> | null>;
    set<T>(key: string, valor: T): Promise<void>;
    put<T>(key: string, valor: T): Promise<void>;
    delete(key: string): Promise<boolean>;
    list(filter?: StorageFilter): Promise<readonly StorageEntry<unknown>[]>;
    clear(prefijo?: string): Promise<void>;
    size(): Promise<number>;
    cerrar(): Promise<void>;
}
export { PayloadOptimizer } from "./optimizer.js";
export { YDocPersistence, type YDocPersistenceOptions, } from "./ydoc-persistence.js";
//# sourceMappingURL=index.d.ts.map