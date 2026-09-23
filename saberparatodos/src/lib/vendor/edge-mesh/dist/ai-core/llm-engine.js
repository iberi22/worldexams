import { getModel } from "./model-registry.js";
function defaultWorkerFactory() {
    if (typeof Worker === "undefined") {
        throw new Error("Web Workers are unavailable on this platform");
    }
    return new Worker(new URL("./llm-worker.js", import.meta.url), {
        type: "module",
    });
}
async function loadTransformers() {
    // biome-ignore lint/suspicious/noTsIgnore: package intentionally may be absent.
    // @ts-ignore -- optional peer: absence is handled by the template fallback.
    return (await import("@huggingface/transformers"));
}
function outputText(output) {
    if (typeof output === "string")
        return output;
    const first = Array.isArray(output) ? output[0] : output;
    const generated = first?.generated_text;
    if (typeof generated === "string")
        return generated;
    if (Array.isArray(generated)) {
        const content = generated.at(-1)?.content;
        return typeof content === "string" ? content : null;
    }
    return null;
}
function templateStub(prompt) {
    const normalized = prompt.trim().replace(/\s+/g, " ");
    const excerpt = normalized.length > 240 ? `${normalized.slice(0, 237)}...` : normalized;
    return [
        "Respuesta local (modo plantilla)",
        `Solicitud: ${excerpt || "(vacía)"}`,
        "Estado: ningún runtime LLM compatible está disponible en este dispositivo.",
        "Siguiente paso: descarga un modelo aprobado y vuelve a intentarlo.",
    ].join("\n");
}
export class LlmEngine {
    transformersLoader;
    workerFactory;
    worker;
    workerRequestId = 0;
    pendingWorker = new Map();
    constructor(options = {}) {
        this.transformersLoader = options.transformersLoader ?? loadTransformers;
        this.workerFactory = options.workerFactory;
    }
    async generate(prompt, options = {}) {
        // AbortSignal cannot cross postMessage reliably; skip the worker then.
        if (options.signal === undefined) {
            for (const attempt of this.attempts(options.modelId)) {
                const model = getModel(attempt.modelId);
                if (model?.hfRepo === undefined)
                    continue;
                try {
                    const text = await this.generateInWorker(prompt, model.hfRepo, {
                        device: attempt.device,
                        dtype: attempt.dtype,
                        maxNewTokens: options.maxNewTokens,
                        temperature: options.temperature,
                    });
                    if (text !== null && text.length > 0)
                        return text;
                }
                catch {
                    break; // Worker broken; fall through to in-thread generation.
                }
            }
        }
        try {
            const transformers = await this.transformersLoader();
            for (const attempt of this.attempts(options.modelId)) {
                try {
                    const model = getModel(attempt.modelId);
                    if (model?.hfRepo === undefined)
                        continue;
                    const generator = await transformers.pipeline("text-generation", model.hfRepo, {
                        device: attempt.device,
                        dtype: attempt.dtype,
                    });
                    const output = await generator(prompt, {
                        max_new_tokens: options.maxNewTokens ?? 128,
                        temperature: options.temperature ?? 0.7,
                        do_sample: (options.temperature ?? 0.7) > 0,
                        signal: options.signal,
                        // Required by transformers.js generation after PR #1681.
                        num_logits_to_keep: 1,
                    });
                    const text = outputText(output);
                    if (text !== null && text.length > 0)
                        return text;
                }
                catch {
                    // Try the next local backend/model; generation must soft-fail.
                }
            }
        }
        catch {
            // The optional transformers package is absent in the minimal build.
        }
        return templateStub(prompt);
    }
    /** Terminates the generation worker, if one was started. */
    dispose() {
        this.worker?.terminate();
        this.worker = null;
        this.rejectPendingWorker(new Error("LlmEngine was disposed"));
    }
    acquireWorker() {
        if (this.worker === null)
            return undefined;
        if (this.worker !== undefined)
            return this.worker;
        try {
            const factory = this.workerFactory ?? defaultWorkerFactory;
            const worker = factory();
            worker.onmessage = (event) => {
                const response = event.data;
                const pending = this.pendingWorker.get(response.id);
                if (pending === undefined)
                    return;
                this.pendingWorker.delete(response.id);
                if (response.text !== undefined && response.text.length > 0) {
                    pending.resolve(response.text);
                }
                else {
                    pending.reject(new Error(response.error ?? "Worker generation failed"));
                }
            };
            worker.onerror = () => {
                this.rejectPendingWorker(new Error("LLM worker crashed"));
                worker.terminate();
                this.worker = null;
            };
            this.worker = worker;
            return worker;
        }
        catch {
            this.worker = null;
            return undefined;
        }
    }
    rejectPendingWorker(error) {
        for (const pending of this.pendingWorker.values()) {
            pending.reject(error);
        }
        this.pendingWorker.clear();
    }
    generateInWorker(prompt, hfRepo, options) {
        const worker = this.acquireWorker();
        if (worker === undefined)
            return Promise.resolve(null);
        this.workerRequestId += 1;
        const id = this.workerRequestId;
        const request = {
            id,
            prompt,
            options: {
                model: hfRepo,
                device: options.device,
                dtype: options.dtype,
                maxNewTokens: options.maxNewTokens,
                temperature: options.temperature,
            },
        };
        return new Promise((resolve, reject) => {
            this.pendingWorker.set(id, { resolve, reject });
            try {
                worker.postMessage(request);
            }
            catch (error) {
                this.pendingWorker.delete(id);
                reject(error instanceof Error ? error : new Error(String(error)));
            }
        });
    }
    attempts(requestedModel) {
        const defaults = [
            {
                modelId: "gemma-4-E2B-it-ONNX",
                device: "webgpu",
                dtype: "q4f16",
            },
            {
                modelId: "Qwen2.5-0.5B-Instruct",
                device: "webgpu",
                dtype: "q4",
            },
            {
                modelId: "Qwen2.5-0.5B-Instruct",
                device: "wasm",
                dtype: "q8",
            },
        ];
        if (requestedModel === undefined)
            return defaults;
        return [
            { modelId: requestedModel, device: "webgpu", dtype: "q4f16" },
            ...defaults.filter((attempt) => attempt.modelId !== requestedModel),
        ];
    }
}
//# sourceMappingURL=llm-engine.js.map