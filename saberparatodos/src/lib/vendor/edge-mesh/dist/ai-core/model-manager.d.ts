import type { DeviceCapabilities } from "./capability-scan.js";
import { type ModelRecommendation } from "./model-registry.js";
export type DownloadState = "idle" | "downloading" | "ready" | "error";
/** Persisted state allowing an interrupted download to resume via Range. */
export interface DownloadResumeState {
    readonly loadedBytes: number;
    readonly etag?: string;
    readonly lastModified?: string;
    readonly updatedAt: number;
}
export interface ModelDownloadProgress {
    readonly modelId: string;
    readonly state: DownloadState;
    readonly loadedBytes: number;
    readonly totalBytes: number | null;
    readonly percent: number | null;
    readonly error?: string;
}
export interface DownloadedModel {
    readonly modelId: string;
    readonly sourceUrl: string;
    readonly sizeBytes: number;
    readonly downloadedAt: number;
}
export type ModelProgressCallback = (progress: ModelDownloadProgress) => void;
export interface ModelManagerOptions {
    readonly backend?: "auto" | "memory";
    readonly cacheName?: string;
    readonly fetcher?: typeof fetch;
    readonly onProgress?: ModelProgressCallback;
}
export declare class ModelManager {
    private readonly backend;
    private readonly cacheName;
    private readonly fetcher;
    private readonly onProgress?;
    private readonly metadata;
    private readonly progress;
    private readonly memoryArtifacts;
    private readonly inFlight;
    constructor(options?: ModelManagerOptions);
    recommendFor(device: DeviceCapabilities): ModelRecommendation;
    getProgress(modelId: string): ModelDownloadProgress;
    downloaded(): Promise<DownloadedModel[]>;
    ensure(modelId: string, onProgress?: ModelProgressCallback): Promise<DownloadedModel>;
    remove(modelId: string): Promise<boolean>;
    /**
     * Returns the raw bytes of a completed download, from the in-memory
     * artifact map or the Cache API store. Resolves to `undefined` when the
     * model is not fully downloaded.
     */
    readBytes(modelId: string): Promise<Uint8Array | undefined>;
    private canUseCacheApi;
    private report;
    private consume;
    private clearPartial;
    private download;
}
//# sourceMappingURL=model-manager.d.ts.map