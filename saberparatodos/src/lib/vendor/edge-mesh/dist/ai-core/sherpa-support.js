/**
 * Shared helpers for the optional `sherpa-onnx` WASM runtime.
 *
 * The npm package ships the Node.js WASM build (Emscripten, synchronous
 * initialization). In browsers the k2-fsa project distributes the WASM
 * assets (`sherpa-onnx-wasm-main.js` / `.wasm` / `.data`) separately, so
 * browser deployments must provide their own loader until the assets are
 * bundled here.
 */
async function importSherpaOnnx() {
    // biome-ignore lint/suspicious/noTsIgnore: package intentionally may be absent.
    // @ts-ignore -- optional peer: absence is handled by callers' fallbacks.
    const imported = (await import("sherpa-onnx"));
    // The package is CommonJS, so ESM interop may wrap it in `default`.
    if ("createOfflineTts" in imported)
        return imported;
    return imported.default;
}
/**
 * Loads `sherpa-onnx` via dynamic import. Resolves to `undefined` when the
 * optional dependency is not installed instead of throwing.
 */
export async function loadSherpaOnnx(loader) {
    try {
        return await (loader ?? importSherpaOnnx)();
    }
    catch {
        return undefined;
    }
}
const NODE_FS_ERROR = "sherpa-onnx WASM requires filesystem-backed model files; " +
    "writing model bytes is only supported on Node.js. " +
    "TODO(browser): mount bytes into the Emscripten FS (Module.FS.writeFile) " +
    "or pre-extract model packs to a served directory.";
function importNodeModule(specifier) {
    switch (specifier) {
        case "node:fs/promises":
            // biome-ignore lint/suspicious/noTsIgnore: optional Node builtin types.
            // @ts-ignore -- node: specifiers resolve at runtime on Node only.
            return import("node:fs/promises");
        case "node:os":
            // biome-ignore lint/suspicious/noTsIgnore: optional Node builtin types.
            // @ts-ignore -- node: specifiers resolve at runtime on Node only.
            return import("node:os");
        case "node:path":
            // biome-ignore lint/suspicious/noTsIgnore: optional Node builtin types.
            // @ts-ignore -- node: specifiers resolve at runtime on Node only.
            return import("node:path");
        default:
            // biome-ignore lint/suspicious/noTsIgnore: optional Node builtin types.
            // @ts-ignore -- node: specifiers resolve at runtime on Node only.
            return import("node:crypto");
    }
}
/**
 * Writes named binary/text model files into a fresh temporary directory and
 * returns its absolute path. Only available where `node:fs` exists (the
 * sherpa-onnx npm WASM build reads model files from the real filesystem).
 */
export async function writeModelFiles(files) {
    let fs;
    let os;
    let path;
    let crypto;
    try {
        const [fsModule, osModule, pathModule, cryptoModule] = await Promise.all([
            importNodeModule("node:fs/promises"),
            importNodeModule("node:os"),
            importNodeModule("node:path"),
            importNodeModule("node:crypto"),
        ]);
        fs = fsModule;
        os = osModule;
        path = pathModule;
        crypto = cryptoModule;
    }
    catch {
        throw new Error(NODE_FS_ERROR);
    }
    const dir = path.join(os.tmpdir(), `edge-mesh-sherpa-${crypto.randomBytes(6).toString("hex")}`);
    await fs.mkdir(dir, { recursive: true });
    for (const [name, content] of Object.entries(files)) {
        if (name.includes("/") || name.includes("..")) {
            throw new Error(`Unsafe model file name: ${name}`);
        }
        const target = path.join(dir, name);
        if (typeof content === "string") {
            await fs.writeFile(target, content, "utf8");
        }
        else {
            await fs.writeFile(target, new Uint8Array(content));
        }
    }
    return {
        dir,
        async cleanup() {
            await fs.rm(dir, { recursive: true, force: true });
        },
    };
}
/** Encodes mono float PCM into a 16-bit RIFF/WAVE buffer. */
export function encodeWav(samples, sampleRate) {
    const bytesPerSample = 2;
    const dataSize = samples.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeText = (offset, value) => {
        for (let index = 0; index < value.length; index += 1) {
            view.setUint8(offset + index, value.charCodeAt(index));
        }
    };
    writeText(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeText(8, "WAVE");
    writeText(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeText(36, "data");
    view.setUint32(40, dataSize, true);
    for (let index = 0; index < samples.length; index += 1) {
        const sample = Math.max(-1, Math.min(1, samples[index] ?? 0));
        view.setInt16(44 + index * bytesPerSample, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    }
    return buffer;
}
/** Decodes a RIFF/WAVE buffer (16-bit PCM or 32-bit float) to mono float PCM. */
export function decodeWavToFloat32(audio) {
    const view = new DataView(audio);
    if (audio.byteLength < 44)
        throw new Error("WAV payload is too small");
    const readTag = (offset) => String.fromCharCode(view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3));
    if (readTag(0) !== "RIFF" || readTag(8) !== "WAVE") {
        throw new Error("Not a RIFF/WAVE payload");
    }
    let format = 1;
    let channels = 1;
    let sampleRate = 16_000;
    let bitsPerSample = 16;
    let dataOffset = -1;
    let dataSize = 0;
    let offset = 12;
    while (offset + 8 <= audio.byteLength) {
        const tag = readTag(offset);
        const size = view.getUint32(offset + 4, true);
        if (tag === "fmt ") {
            format = view.getUint16(offset + 8, true);
            channels = view.getUint16(offset + 10, true);
            sampleRate = view.getUint32(offset + 12, true);
            bitsPerSample = view.getUint16(offset + 22, true);
        }
        else if (tag === "data") {
            dataOffset = offset + 8;
            dataSize = Math.min(size, audio.byteLength - dataOffset);
        }
        offset += 8 + size + (size % 2);
    }
    if (dataOffset < 0)
        throw new Error("WAVE data chunk is missing");
    if (format !== 1 && format !== 3) {
        throw new Error(`Unsupported WAVE encoding: ${format}`);
    }
    if (channels < 1)
        throw new Error("WAVE file has no channels");
    const frameCount = Math.floor(dataSize / (bitsPerSample / 8) / Math.max(1, channels));
    const samples = new Float32Array(frameCount);
    for (let frame = 0; frame < frameCount; frame += 1) {
        let mixed = 0;
        for (let channel = 0; channel < channels; channel += 1) {
            const at = dataOffset + (frame * channels + channel) * (bitsPerSample / 8);
            mixed +=
                format === 3
                    ? view.getFloat32(at, true)
                    : view.getInt16(at, true) / 0x8000;
        }
        samples[frame] = mixed / channels;
    }
    return { samples, sampleRate };
}
/** Naive linear resampler; sufficient for VAD/ASR preview-quality audio. */
export function resampleLinear(samples, fromRate, toRate) {
    if (fromRate === toRate || samples.length === 0)
        return samples;
    const length = Math.max(1, Math.round((samples.length * toRate) / fromRate));
    const output = new Float32Array(length);
    for (let index = 0; index < length; index += 1) {
        const source = (index * fromRate) / toRate;
        const lower = Math.floor(source);
        const upper = Math.min(samples.length - 1, lower + 1);
        const fraction = source - lower;
        output[index] =
            (samples[lower] ?? 0) * (1 - fraction) + (samples[upper] ?? 0) * fraction;
    }
    return output;
}
//# sourceMappingURL=sherpa-support.js.map