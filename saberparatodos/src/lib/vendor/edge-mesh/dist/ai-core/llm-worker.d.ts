/**
 * Web Worker host for transformers.js text generation.
 *
 * Protocol (structured-clone messages):
 *   request:  { id, prompt, options: { modelId, maxNewTokens, temperature } }
 *   response: { id, text } | { id, error }
 *
 * The pipeline is cached per (model, device, dtype) so repeated generations
 * do not re-download or re-initialize the model.
 */
export interface LlmWorkerRequest {
    readonly id: number;
    readonly prompt: string;
    readonly options: {
        readonly model?: string;
        readonly device?: string;
        readonly dtype?: string;
        readonly maxNewTokens?: number;
        readonly temperature?: number;
    };
}
export interface LlmWorkerResponse {
    readonly id: number;
    readonly text?: string;
    readonly error?: string;
}
//# sourceMappingURL=llm-worker.d.ts.map