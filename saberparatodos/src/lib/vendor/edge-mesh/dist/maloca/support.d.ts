import type { PostQuantumIdentity } from "../identity/index.js";
import type { MeshManager } from "../mesh/index.js";
import type { NodoId } from "../types/index.js";
import { EventBus } from "./event-bus.js";
import { EvidentiaManager } from "./evidentia.js";
import { KarmaManager } from "./karma.js";
import type { EncryptedPayload } from "./encrypted-payload.js";
import { GovernanceManager } from "../governance/index.js";
export type CategoriaTicket = "simple" | "config_change" | "security" | "feature_request";
export type SeveridadTicket = "low" | "medium" | "high" | "critical";
export type EstadoTicket = "open" | "triaging" | "in_progress" | "resolved" | "escalated";
export interface TicketMetadatos {
    readonly originador: NodoId;
    readonly timestamp: number;
    readonly etiquetas?: readonly string[];
    readonly [key: string]: unknown;
}
/**
 * SupportTicket — unidad atómica de soporte distribuido.
 * - `body` viaja SIEMPRE cifrado como EncryptedPayload
 * - `metadata` (no sensible) es lo único que va por gossip para descubrimiento
 * - `assignedTo` se asigna tras triaje
 * - `proposalId` vincula a governance para config_changes y emergency retroactivos
 */
export interface SupportTicket {
    readonly id: string;
    readonly category: CategoriaTicket;
    readonly severity: SeveridadTicket;
    readonly status: EstadoTicket;
    /** Solo metadata viaja por gossip — no contiene datos sensibles */
    readonly metadata: TicketMetadatos;
    /** Cuerpo cifrado — nunca viaja por gossip sin cifrar */
    readonly body: EncryptedPayload;
    readonly assignedTo?: NodoId;
    readonly resolution?: string;
    readonly proposalId?: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}
export declare const TIPO_EVENTO_SUPPORT: {
    readonly TICKET_CREADO: "SUPPORT:TICKET_CREADO";
    readonly TICKET_ASIGNADO: "SUPPORT:TICKET_ASIGNADO";
    readonly TICKET_RESUELTO: "SUPPORT:TICKET_RESUELTO";
    readonly TICKET_ESCALADO: "SUPPORT:TICKET_ESCALADO";
};
export declare class SupportManager {
    private readonly identity;
    private readonly mesh;
    private readonly eventBus;
    private readonly karma;
    private readonly evidentia;
    private readonly governance;
    private readonly tickets;
    private readonly NAMESPACE;
    private counter;
    constructor(identity: PostQuantumIdentity, mesh: MeshManager, eventBus: EventBus, karma: KarmaManager, evidentia: EvidentiaManager, governance: GovernanceManager);
    /**
     * Crea un nuevo ticket y ejecuta triaje automático.
     */
    createTicket(category: CategoriaTicket, severity: SeveridadTicket, metadata: TicketMetadatos, body: EncryptedPayload): Promise<SupportTicket>;
    /**
     * Triaje automático: 3 vías según categoría y severidad.
     */
    private triaje;
    /**
     * (a) Fast track: simple / low / medium
     * Usa KarmaManager.getBestPeer() para asignar.
     */
    private triajeFast;
    /**
     * (b) Standard: config_change -> GovernanceManager.crearPropuesta() -> voto -> asigna
     */
    private triajeStandard;
    /**
     * (c) Emergency: security / critical
     * Asigna inmediato + notariza + proposal retroactivo
     */
    private triajeEmergency;
    /**
     * Asigna un ticket a un peer.
     */
    private asignar;
    /**
     * Resuelve un ticket con resolución.
     */
    resolveTicket(ticketId: string, resolution: string): Promise<SupportTicket | null>;
    /**
     * Escala un ticket.
     */
    escalateTicket(ticketId: string): Promise<SupportTicket | null>;
    private actualizarEstado;
    private onGossipTicket;
    getTicket(ticketId: string): SupportTicket | null;
    listTickets(filter?: Partial<{
        status: EstadoTicket;
        category: CategoriaTicket;
        severity: SeveridadTicket;
        assignedTo: NodoId;
    }>): readonly SupportTicket[];
    ticketsPendientes(): readonly SupportTicket[];
    ticketsActivos(): readonly SupportTicket[];
}
//# sourceMappingURL=support.d.ts.map