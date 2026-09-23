import type { OpLog } from "../op-log/index.js";
import type { PerfilHumano, PerfilServicio } from "./types.js";
/**
 * ProfileManager — gestiona perfiles de nodos humanos y servicios
 * usando Operational Log (OpLog) como store subyacente.
 * No contiene lógica de negocio; es infraestructura genérica de la mesh.
 */
export type Perfil = PerfilHumano | PerfilServicio;
export declare class ProfileManager {
    private readonly oplog;
    private cache;
    constructor(oplog: OpLog);
    /**
     * Carga todos los perfiles desde el OpLog hacia el cache en memoria.
     * Debe llamarse después de crear la instancia y antes de usar.
     */
    loadProfiles(keepExistingCache?: boolean): Promise<void>;
    exportCache(): [string, Perfil][];
    importCache(entries: [string, Perfil][]): void;
    /**
     * Registra o actualiza un perfil en la mesh.
     */
    upsertProfile(perfil: Perfil, autor: string): Promise<void>;
    /**
     * Obtiene un perfil por su ID.
     */
    getProfile(id: string): Perfil | undefined;
    /**
     * Lista todos los perfiles registrados.
     */
    listProfiles(): Perfil[];
    /**
     * Busca perfiles por alias (humanos) o por tipo (servicios).
     */
    searchProfiles(query: string): Perfil[];
    /**
     * Vincula un perfil humano a un proyecto.
     */
    linkToProject(profileId: string, projectId: string): Promise<void>;
    /**
     * Registra o actualiza un perfil en la mesh.
     */
    register(profile: Perfil): Promise<void>;
    /**
     * Obtiene un perfil por su ID (cache local + lookup en la mesh/OpLog).
     */
    get(id: string): Promise<Perfil | undefined>;
    /**
     * Actualiza un perfil con sync.
     */
    update(id: string, delta: Partial<Perfil>): Promise<void>;
    /**
     * Búsqueda distribuida de perfiles (recargando opLog).
     */
    search(query: string): Promise<Perfil[]>;
}
//# sourceMappingURL=perfil.d.ts.map