// ─── SUPPORT EVENTS ────────────────────────────────────────────────────────
export const TIPO_EVENTO_SUPPORT = {
    TICKET_CREADO: "SUPPORT:TICKET_CREADO",
    TICKET_ASIGNADO: "SUPPORT:TICKET_ASIGNADO",
    TICKET_RESUELTO: "SUPPORT:TICKET_RESUELTO",
    TICKET_ESCALADO: "SUPPORT:TICKET_ESCALADO",
};
// ─── SUPPORT MANAGER ───────────────────────────────────────────────────────
export class SupportManager {
    identity;
    mesh;
    eventBus;
    karma;
    evidentia;
    governance;
    tickets;
    NAMESPACE = "_maloca:support";
    counter = 0;
    constructor(identity, mesh, eventBus, karma, evidentia, governance) {
        this.identity = identity;
        this.mesh = mesh;
        this.eventBus = eventBus;
        this.karma = karma;
        this.evidentia = evidentia;
        this.governance = governance;
        this.tickets = new Map();
        // Escuchar gossip para tickets remotos
        this.mesh.addEventListener("gossipRecibido", (ev) => {
            const customEv = ev;
            const { mensaje } = customEv.detail;
            if (mensaje.namespace === this.NAMESPACE) {
                this.onGossipTicket(mensaje.payload);
            }
        });
        // Escuchar eventos del bus local
        this.eventBus.subscribe(TIPO_EVENTO_SUPPORT.TICKET_CREADO, (evento) => {
            const ticket = evento.payload;
            if (!this.tickets.has(ticket.id)) {
                this.tickets.set(ticket.id, ticket);
            }
        });
    }
    /**
     * Crea un nuevo ticket y ejecuta triaje automático.
     */
    async createTicket(category, severity, metadata, body) {
        const id = `ticket:${this.identity.nodoId}:${Date.now()}:${++this.counter}:${Math.random().toString(36).substring(2, 7)}`;
        const now = Date.now();
        const ticket = {
            id,
            category,
            severity,
            status: "open",
            metadata: {
                ...metadata,
                originador: this.identity.nodoId,
                timestamp: now,
            },
            body,
            createdAt: now,
            updatedAt: now,
        };
        this.tickets.set(id, ticket);
        // Difundir metadata por gossip — el body viaja cifrado pero el metadata
        // (categoría, severidad, origen) es público para que peers ayuden en triaje
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "TICKET_CREATED",
            ticket: {
                id: ticket.id,
                category: ticket.category,
                severity: ticket.severity,
                status: ticket.status,
                metadata: ticket.metadata,
                assignedTo: ticket.assignedTo,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
                // body NO va por gossip
            },
        });
        this.eventBus.emit(TIPO_EVENTO_SUPPORT.TICKET_CREADO, ticket);
        // Ejecutar triaje inmediato
        await this.triaje(ticket);
        return ticket;
    }
    /**
     * Triaje automático: 3 vías según categoría y severidad.
     */
    async triaje(ticket) {
        // Actualizar estado a triaging
        this.actualizarEstado(ticket.id, "triaging");
        if (ticket.severity === "critical" || ticket.category === "security") {
            // (c) Emergency: security/critical
            await this.triajeEmergency(ticket);
        }
        else if (ticket.category === "config_change") {
            // (b) Standard: config_change -> governance
            await this.triajeStandard(ticket);
        }
        else {
            // (a) Fast track: simple/low/medium
            await this.triajeFast(ticket);
        }
    }
    /**
     * (a) Fast track: simple / low / medium
     * Usa KarmaManager.getBestPeer() para asignar.
     */
    async triajeFast(ticket) {
        // getBestPeer() devuelve el peer con mejor karma en la mesh
        const bestPeer = this.karma.getBestPeer();
        if (bestPeer) {
            await this.asignar(ticket.id, bestPeer);
        }
        // Notarizar en Evidentia como hecho notarial
        const contenidoNotarial = {
            tipo: "support_fast_track",
            ticketId: ticket.id,
            category: ticket.category,
            severity: ticket.severity,
            assignedTo: ticket.assignedTo ?? "pending",
            timestamp: Date.now(),
        };
        await this.evidentia.notarize(contenidoNotarial, "support:fast_track");
    }
    /**
     * (b) Standard: config_change -> GovernanceManager.crearPropuesta() -> voto -> asigna
     */
    async triajeStandard(ticket) {
        // Crear propuesta de governance para el cambio de configuración
        const propuestaId = `prop:support:${ticket.id}`;
        const propuesta = this.governance.crearPropuesta(propuestaId, "support:config_change", this.identity.nodoId, {
            ticketId: ticket.id,
            category: ticket.category,
            severity: ticket.severity,
            summary: `Config change request: ${ticket.metadata.originador}`,
        }, 60_000);
        // Almacenar proposalId en el ticket
        const existing = this.tickets.get(ticket.id);
        if (existing) {
            const updated = { ...existing, proposalId: propuestaId, updatedAt: Date.now() };
            this.tickets.set(ticket.id, updated);
        }
        // Escuchar resultado de la propuesta
        this.governance.on("propuestaResultado", async (ev) => {
            const { propuesta: propId, resultado } = ev.detail;
            if (propId !== propuestaId)
                return;
            if (resultado === "aprobada") {
                const bestPeer = this.karma.getBestPeer();
                if (bestPeer) {
                    await this.asignar(ticket.id, bestPeer);
                }
            }
            else {
                this.actualizarEstado(ticket.id, "escalated");
            }
        });
        // Notarizar
        const contenidoNotarial = {
            tipo: "support_standard_governance",
            ticketId: ticket.id,
            propuestaId,
            timestamp: Date.now(),
        };
        await this.evidentia.notarize(contenidoNotarial, "support:standard");
    }
    /**
     * (c) Emergency: security / critical
     * Asigna inmediato + notariza + proposal retroactivo
     */
    async triajeEmergency(ticket) {
        // Asignación inmediata al mejor peer disponible
        const bestPeer = this.karma.getBestPeer();
        if (bestPeer) {
            await this.asignar(ticket.id, bestPeer);
        }
        // Notarización inmediata (evidencia forense)
        const contenidoNotarial = {
            tipo: "support_emergency",
            ticketId: ticket.id,
            category: ticket.category,
            severity: ticket.severity,
            assignedTo: ticket.assignedTo ?? "emergency_pool",
            timestamp: Date.now(),
        };
        await this.evidentia.notarize(contenidoNotarial, "support:emergency");
        // Proposal retroactivo para validación posterior
        const propuestaRetroId = `prop:retro:support:${ticket.id}`;
        this.governance.crearPropuesta(propuestaRetroId, "support:emergency_retroactive", this.identity.nodoId, {
            ticketId: ticket.id,
            category: ticket.category,
            severity: ticket.severity,
            assignedTo: ticket.assignedTo ?? "emergency_pool",
            emergencyAction: "immediate_assignment",
            summary: `Emergency action retroactive validation: ${ticket.metadata.originador}`,
        }, 120_000);
        // Vincular proposalId al ticket
        const existing = this.tickets.get(ticket.id);
        if (existing) {
            const updated = {
                ...existing,
                proposalId: propuestaRetroId,
                updatedAt: Date.now(),
            };
            this.tickets.set(ticket.id, updated);
        }
    }
    /**
     * Asigna un ticket a un peer.
     */
    async asignar(ticketId, peer) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket)
            return;
        const updated = {
            ...ticket,
            assignedTo: peer,
            status: "in_progress",
            updatedAt: Date.now(),
        };
        this.tickets.set(ticketId, updated);
        // Notificar por gossip
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "TICKET_ASSIGNED",
            ticketId,
            assignedTo: peer,
        });
        this.eventBus.emit(TIPO_EVENTO_SUPPORT.TICKET_ASIGNADO, updated);
    }
    /**
     * Resuelve un ticket con resolución.
     */
    async resolveTicket(ticketId, resolution) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket)
            return null;
        const updated = {
            ...ticket,
            status: "resolved",
            resolution,
            updatedAt: Date.now(),
        };
        this.tickets.set(ticketId, updated);
        // Notarizar resolución
        await this.evidentia.notarize({
            tipo: "support_resolution",
            ticketId,
            resolution,
            resolvedBy: this.identity.nodoId,
            timestamp: Date.now(),
        }, "support:resolved");
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "TICKET_RESOLVED",
            ticketId,
            resolution,
        });
        this.eventBus.emit(TIPO_EVENTO_SUPPORT.TICKET_RESUELTO, updated);
        return updated;
    }
    /**
     * Escala un ticket.
     */
    async escalateTicket(ticketId) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket)
            return null;
        const updated = {
            ...ticket,
            status: "escalated",
            updatedAt: Date.now(),
        };
        this.tickets.set(ticketId, updated);
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "TICKET_ESCALATED",
            ticketId,
        });
        this.eventBus.emit(TIPO_EVENTO_SUPPORT.TICKET_ESCALADO, updated);
        return updated;
    }
    // ─── HELPERS ───────────────────────────────────────────────────────────
    actualizarEstado(ticketId, status) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket)
            return;
        this.tickets.set(ticketId, { ...ticket, status, updatedAt: Date.now() });
    }
    onGossipTicket(payload) {
        if (typeof payload !== "object" || payload === null)
            return;
        const msg = payload;
        if (msg.tipo === "TICKET_CREATED" && msg.ticket?.id) {
            if (!this.tickets.has(msg.ticket.id)) {
                // Solo almacenamos metadata (body no viaja por gossip)
                const partial = msg.ticket;
                const now = Date.now();
                const ticket = {
                    id: partial.id,
                    category: partial.category ?? "simple",
                    severity: partial.severity ?? "low",
                    status: "open",
                    metadata: partial.metadata ?? {
                        originador: "unknown",
                        timestamp: now,
                    },
                    // body no disponible por gossip — el destinatario original tiene el body cifrado
                    body: {},
                    createdAt: partial.createdAt ?? now,
                    updatedAt: now,
                };
                this.tickets.set(ticket.id, ticket);
            }
        }
        else if (msg.tipo === "TICKET_ASSIGNED" && msg.ticketId) {
            const ticket = this.tickets.get(msg.ticketId);
            if (ticket) {
                this.tickets.set(msg.ticketId, {
                    ...ticket,
                    assignedTo: msg.assignedTo,
                    status: "in_progress",
                    updatedAt: Date.now(),
                });
            }
        }
        else if (msg.tipo === "TICKET_RESOLVED" && msg.ticketId) {
            const ticket = this.tickets.get(msg.ticketId);
            if (ticket) {
                this.tickets.set(msg.ticketId, {
                    ...ticket,
                    status: "resolved",
                    resolution: msg.resolution,
                    updatedAt: Date.now(),
                });
            }
        }
    }
    // ─── QUERIES ───────────────────────────────────────────────────────────
    getTicket(ticketId) {
        return this.tickets.get(ticketId) ?? null;
    }
    listTickets(filter) {
        let results = Array.from(this.tickets.values());
        if (filter) {
            if (filter.status)
                results = results.filter((t) => t.status === filter.status);
            if (filter.category)
                results = results.filter((t) => t.category === filter.category);
            if (filter.severity)
                results = results.filter((t) => t.severity === filter.severity);
            if (filter.assignedTo)
                results = results.filter((t) => t.assignedTo === filter.assignedTo);
        }
        return results;
    }
    ticketsPendientes() {
        return this.listTickets({ status: "open" });
    }
    ticketsActivos() {
        return this.listTickets({ status: "in_progress" });
    }
}
//# sourceMappingURL=support.js.map