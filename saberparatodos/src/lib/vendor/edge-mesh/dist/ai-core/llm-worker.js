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
const generators = new Map();
async function loadGenerator(request) {
    if (request.model === undefined) {
        throw new Error("LlmWorker requires options.model");
    }
    const device = request.device ?? "webgpu";
    const dtype = request.dtype ?? "q4f16";
    const key = `${request.model}|${device}|${dtype}`;
    const cached = generators.get(key);
    if (cached !== undefined)
        return cached;
    // biome-ignore lint/suspicious/noTsIgnore: package intentionally may be absent.
    // @ts-ignore -- optional peer; absence surfaces as a worker error reply.
    const modulePromise = import("@huggingface/transformers");
    const transformers = (await modulePromise);
    const pending = transformers.pipeline("text-generation", request.model, {
        device,
        dtype,
    });
    generators.set(key, pending);
    pending.catch(() => generators.delete(key));
    return pending;
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
async function handle(request) {
    try {
        const generator = await loadGenerator(request.options);
        const temperature = request.options.temperature ?? 0.7;
        const output = await generator(request.prompt, {
            max_new_tokens: request.options.maxNewTokens ?? 128,
            temperature,
            do_sample: temperature > 0,
            // Required by transformers.js generation after PR #1681.
            num_logits_to_keep: 1,
        });
        const text = outputText(output);
        if (text === null || text.length === 0) {
            return { id: request.id, error: "Generation produced no text" };
        }
        return { id: request.id, text };
    }
    catch (error) {
        return {
            id: request.id,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
const workerScope = globalThis;
workerScope.onmessage = (event) => {
    void handle(event.data).then((response) => {
        workerScope.postMessage(response);
    });
};
export {};
//# sourceMappingURL=llm-worker.js.map