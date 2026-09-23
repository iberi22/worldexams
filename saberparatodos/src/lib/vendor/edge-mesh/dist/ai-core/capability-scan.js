function classifyTier(webgpu, estimatedMemoryMB, cores) {
    if (webgpu &&
        estimatedMemoryMB !== null &&
        estimatedMemoryMB >= 8_192 &&
        cores >= 8) {
        return "high";
    }
    if (webgpu ||
        (estimatedMemoryMB !== null && estimatedMemoryMB >= 4_096) ||
        cores >= 4) {
        return "mid";
    }
    return "low";
}
export async function scanDeviceCapabilities() {
    const navigatorLike = typeof navigator === "undefined"
        ? undefined
        : navigator;
    const webgpu = navigatorLike?.gpu !== undefined;
    const estimatedMemoryMB = typeof navigatorLike?.deviceMemory === "number"
        ? navigatorLike.deviceMemory * 1_024
        : null;
    const cores = Math.max(1, navigatorLike?.hardwareConcurrency ?? 1);
    const connectionType = navigatorLike?.connection?.effectiveType ??
        navigatorLike?.connection?.type ??
        null;
    let quotaBytes = null;
    let usageBytes = null;
    try {
        const estimate = await navigatorLike?.storage?.estimate();
        quotaBytes = estimate?.quota ?? null;
        usageBytes = estimate?.usage ?? null;
    }
    catch {
        // Storage estimates are hints and may be blocked by browser privacy modes.
    }
    const availableBytes = quotaBytes === null ? null : Math.max(0, quotaBytes - (usageBytes ?? 0));
    return {
        webgpu,
        estimatedMemoryMB,
        storage: {
            quotaBytes,
            usageBytes,
            availableBytes,
        },
        cores,
        connectionType,
        tier: classifyTier(webgpu, estimatedMemoryMB, cores),
    };
}
//# sourceMappingURL=capability-scan.js.map