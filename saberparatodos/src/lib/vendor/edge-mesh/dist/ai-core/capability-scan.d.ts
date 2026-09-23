export type DeviceTier = "high" | "mid" | "low";
export interface DeviceStorageEstimate {
    readonly quotaBytes: number | null;
    readonly usageBytes: number | null;
    readonly availableBytes: number | null;
}
export interface DeviceCapabilities {
    readonly webgpu: boolean;
    readonly estimatedMemoryMB: number | null;
    readonly storage: DeviceStorageEstimate;
    readonly cores: number;
    readonly connectionType: string | null;
    readonly tier: DeviceTier;
}
export declare function scanDeviceCapabilities(): Promise<DeviceCapabilities>;
//# sourceMappingURL=capability-scan.d.ts.map