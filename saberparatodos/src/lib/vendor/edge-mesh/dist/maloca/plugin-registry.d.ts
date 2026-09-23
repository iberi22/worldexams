import type { MeshManager } from "../mesh/index.js";
import type { NodoId } from "../types/index.js";
export type TipoPlugin = "proyecto" | "servicio" | "adapter";
export type EstadoPlugin = "activo" | "inactivo" | "error";
export interface PluginInfo {
    readonly id: string;
    readonly tipo: TipoPlugin;
    readonly version: string;
    readonly capacidades: readonly string[];
    readonly endpoint?: string;
    readonly estado: EstadoPlugin;
    readonly nodoId: NodoId;
    readonly timestamp: number;
}
export declare class PluginRegistry extends EventTarget {
    private readonly mesh;
    private readonly plugins;
    private readonly NAMESPACE;
    constructor(mesh: MeshManager);
    register(plugin: Omit<PluginInfo, "nodoId" | "timestamp" | "estado">): Promise<void>;
    discover(tipo?: TipoPlugin, capacidad?: string): readonly PluginInfo[];
    getPlugin(pluginId: string): PluginInfo | null;
    listPlugins(): readonly PluginInfo[];
    healthCheck(pluginId: string): Promise<boolean>;
    onPluginEvent(evento: unknown): void;
}
//# sourceMappingURL=plugin-registry.d.ts.map