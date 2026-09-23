import type { EdgeMesh } from "../../edge-mesh.js";
export type GpuKernelType = "vector-sum" | "dot" | "matrix-scale";
export interface GpuTask {
    readonly id: string;
    readonly kernel: GpuKernelType;
    readonly inputA: readonly number[];
    readonly inputB?: readonly number[];
    readonly scalar?: number;
}
export interface GpuTaskResult {
    readonly taskId: string;
    readonly result: readonly number[] | number;
    readonly durationMs: number;
    readonly fallbackUsed: boolean;
    readonly success: boolean;
    readonly error?: string;
}
export declare function runCpuVectorSum(a: readonly number[], b: readonly number[]): number[];
export declare function runCpuDot(a: readonly number[], b: readonly number[]): number;
export declare function runCpuMatrixScale(matrix: readonly number[], scalar: number): number[];
export declare class GpuAgentPlugin {
    private readonly edgeMesh?;
    private readonly taskQueue;
    private mockDevice;
    constructor(edgeMesh?: EdgeMesh);
    /**
     * Obtiene la instancia asociada de EdgeMesh.
     */
    getEdgeMesh(): EdgeMesh | undefined;
    /**
     * Configura un dispositivo mock de WebGPU para propósitos de prueba/depuración.
     */
    setMockDevice(device: any): void;
    /**
     * Obtiene el tamaño de la cola de tareas.
     */
    getQueueSize(): number;
    /**
     * Detecta si WebGPU está soportado y disponible.
     */
    isWebGpuSupported(): boolean;
    /**
     * Ejecuta un kernel en CPU.
     */
    executeOnCpu(task: GpuTask): readonly number[] | number;
    /**
     * Ejecuta una tarea en GPU usando WebGPU.
     */
    executeOnGpu(task: GpuTask): Promise<readonly number[] | number>;
    /**
     * Encola y ejecuta una tarea. Si WebGPU está disponible e inicia correctamente,
     * se ejecuta en GPU. De lo contrario, se activa automáticamente el CPU fallback.
     */
    enqueueTask(task: GpuTask): Promise<GpuTaskResult>;
    /**
     * Hook/Método de verificación para validar que el resultado de una tarea sea correcto.
     * Ejecuta el cálculo correspondiente en CPU y lo compara con un margen de tolerancia (épsilon).
     */
    verifyTask(task: GpuTask, resultToVerify: readonly number[] | number, tolerance?: number): boolean;
}
//# sourceMappingURL=index.d.ts.map