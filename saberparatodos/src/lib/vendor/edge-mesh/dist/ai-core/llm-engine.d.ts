import type { LlmWorkerRequest, LlmWorkerResponse } from "./llm-worker.js";
export interface LlmGenerateOptions {
    readonly maxNewTokens?: number;
    readonly temperature?: number;
    readonly modelId?: string;
    readonly signal?: AbortSignal;
}
interface TextGenerationOutput {
    readonly generated_text?: string | readonly {
        readonly role?: string;
        readonly content?: string;
    }[];
}
type TextGenerator = (prompt: string, options: Record<string, unknown>) => Promise<string | TextGenerationOutput | readonly TextGenerationOutput[]>;
interface TransformersModule {
    pipeline(task: "text-generation", model: string, options: Record<string, unknown>): Promise<TextGenerator>;
}
export type TransformersLoader = () => Promise<TransformersModule>;
/** Structural subset of the browser `Worker` used by the engine. */
export interface LlmWorkerLike {
    postMessage(message: LlmWorkerRequest): void;
    terminate(): void;
    onmessage: ((event: {
        readonly data: LlmWorkerResponse;
    }) => void) | null;
    onerror: ((event: unknown) => void) | null;
}
export type LlmWorkerFactory = () => LlmWorkerLike;
export interface LlmEngineOptions {
    readonly transformersLoader?: TransformersLoader;
    /** Overrides worker creation (tests, custom bundler worker URLs). */
    readonly workerFactory?: LlmWorkerFactory;
}
export declare class LlmEngine {
    private readonly transformersLoader;
    private readonly workerFactory?;
    private worker?;
    private workerRequestId;
    private readonly pendingWorker;
    constructor(options?: LlmEngineOptions);
    generate(prompt: string, options?: LlmGenerateOptions): Promise<string>;
    /** Terminates the generation worker, if one was started. */
    dispose(): void;
    private acquireWorker;
    private rejectPendingWorker;
    private generateInWorker;
    private attempts;
}
export {};
//# sourceMappingURL=llm-engine.d.ts.map