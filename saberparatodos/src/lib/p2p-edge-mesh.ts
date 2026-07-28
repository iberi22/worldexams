// ─── ADAPTADOR EDGE-MESH → WORLDEXAMS ──────────────────────────────────────
// Bridge entre edge-mesh (EdgeMesh + SalonesManager + ExamenCompartido)
// y la infraestructura existente de worldexams/saberparatodos.
//
// API real (edge-mesh root export):
//   new EdgeMesh(config) → await mesh.iniciar()
//   new SalonesManager(mesh)
//   new SalonRegistry({ nodoId }) → salones.usarRegistry(registry)
//   new ExamenCompartido(examenId, mesh.yjsAdapter)
//   abandonarSalon / mesh.detener()
//
// DISCOVERY MESH-FIRST:
//   SalonRegistry anuncia cada salón por código y mantiene el directorio
//   regional. unirsePorCodigo descubre el host remoto y crea el proxy local;
//   Supabase no participa en discovery ni es fallback automático.
//
// Trystero (p2p-service) se mantiene como legacy hasta probar este bridge.
// ────────────────────────────────────────────────────────────────────────────

import {
	EdgeMesh,
	SalonesManager,
	SalonRegistry,
	SalonVirtual,
	TIPO_SALON,
	ExamenCompartido,
	TIPO_PREGUNTA,
	type NodoId,
	type SalonAd,
	type TipoPregunta,
	type Pregunta as EdgePregunta,
} from "edge-mesh";

import { writable, derived, type Writable, type Readable } from "svelte/store";
import { getOrCreateSwalInstanceId } from "./swal-instance-id";
import { markNodeActive, clearNodeActive } from "./pro-node";

/** edge-mesh brands NodoId; host apps cast free-form peer ids. */
function asNodoId(id: string): NodoId {
	return id as NodoId;
}

// ─── TIPOS ─────────────────────────────────────────────────────────────────

export type EstadoConexion = "desconectado" | "conectando" | "conectado" | "error";

export interface EstadoMesh {
	conexion: EstadoConexion;
	miNodoId: NodoId | null;
	peersConectados: number;
	peers: NodoId[];
	hostId: NodoId | null;
	/** Persistido localmente; futuro namespace swal/worldexams/{instanceId} */
	instanceId: string | null;
}

export interface EstadoSalonExamen {
	id: string;
	nombre: string;
	/** Room code = salon.id (edge-mesh genera id vía generarId). */
	codigo: string | null;
	hostId: NodoId | null;
	tipo: "EXAMEN";
	estado: "esperando" | "iniciado" | "en_curso" | "finalizado";
	participantes: NodoId[];
	preguntas: Pregunta[];
}

export interface Pregunta {
	id: string;
	tipo: "opcion_multiple" | "verdadero_falso" | "respuesta_corta" | "ensayo";
	enunciado: string;
	opciones?: string[];
	respuestaCorrecta?: unknown;
	puntaje: number;
}

export interface RespuestaEstudiante {
	estudianteId: string;
	preguntaId: string;
	respuesta: unknown;
	timestamp: number;
}

export interface SalonExamenMeta {
	region?: string;
	subject?: string;
	grade?: number;
}

export type AnuncioSalonExamen = Omit<
	SalonAd,
	"createdAt" | "hostNodoId" | "hostPeerId"
> & {
	hostPeerId?: NodoId;
	createdAt?: number;
};

// ─── STORES REACTIVOS (Svelte) ────────────────────────────────────────────

export const estadoMesh: Writable<EstadoMesh> = writable({
	conexion: "desconectado",
	miNodoId: null,
	peersConectados: 0,
	peers: [],
	hostId: null,
	instanceId: null,
});

export const estadoSalon: Writable<EstadoSalonExamen | null> = writable(null);

export const estudiantesConectados: Readable<NodoId[]> = derived(
	estadoSalon,
	($salon) =>
		$salon ? $salon.participantes.filter((p) => p !== $salon.hostId) : [],
);

function mapTipoPregunta(tipo: Pregunta["tipo"]): TipoPregunta {
	switch (tipo) {
		case "verdadero_falso":
			return TIPO_PREGUNTA.VERDADERO_FALSO;
		case "respuesta_corta":
			return TIPO_PREGUNTA.RESPUESTA_CORTA;
		case "ensayo":
			return TIPO_PREGUNTA.ENSAYO;
		default:
			return TIPO_PREGUNTA.OPCION_MULTIPLE;
	}
}

function toEdgePregunta(p: Pregunta): EdgePregunta {
	return {
		id: p.id,
		tipo: mapTipoPregunta(p.tipo),
		enunciado: p.enunciado,
		opciones: p.opciones ?? [],
		respuestaCorrecta: p.respuestaCorrecta,
		puntaje: p.puntaje,
	};
}

function fromEdgePregunta(p: EdgePregunta): Pregunta {
	return {
		id: p.id,
		tipo: p.tipo as Pregunta["tipo"],
		enunciado: p.enunciado,
		opciones: p.opciones ? [...p.opciones] : undefined,
		respuestaCorrecta: p.respuestaCorrecta,
		puntaje: p.puntaje,
	};
}

// ─── CLASE PRINCIPAL ───────────────────────────────────────────────────────

export class P2PEdgeMesh {
	private static instancia: P2PEdgeMesh | null = null;

	private mesh: EdgeMesh | null = null;
	private salones: SalonesManager | null = null;
	private registry: SalonRegistry | null = null;
	private salonActivo: SalonVirtual | null = null;
	private examenActivo: ExamenCompartido | null = null;

	private miNodoId: NodoId = asNodoId("");
	private nombreUsuario: string = "";
	private instanceId: string = "";

	private onNodoConectado = (ev: CustomEvent<{ readonly nodoId: NodoId }>) => {
		const nodoRemoto = ev.detail.nodoId;
		estadoMesh.update((s) => {
			if (s.peers.includes(nodoRemoto)) return s;
			const peers = [...s.peers, nodoRemoto];
			return { ...s, peers, peersConectados: peers.length };
		});
	};

	private onNodoDesconectado = (
		ev: CustomEvent<{ readonly nodoId: NodoId }>,
	) => {
		const nodoRemoto = ev.detail.nodoId;
		estadoMesh.update((s) => {
			const peers = s.peers.filter((p) => p !== nodoRemoto);
			return { ...s, peers, peersConectados: peers.length };
		});
	};

	private constructor() {
		// singleton
	}

	static obtener(): P2PEdgeMesh {
		if (!P2PEdgeMesh.instancia) {
			P2PEdgeMesh.instancia = new P2PEdgeMesh();
		}
		return P2PEdgeMesh.instancia;
	}

	// ─── INICIALIZACIÓN ────────────────────────────────────────────────────

	async iniciar(nombreUsuario?: string): Promise<NodoId> {
		if (this.mesh && this.salones && this.registry) {
			return this.miNodoId;
		}

		this.nombreUsuario = nombreUsuario || `estudiante-${Date.now().toString(36)}`;
		this.instanceId = getOrCreateSwalInstanceId();
		// nodoId estable por instancia SWAL + sufijo de sesión corta
		const session = crypto.randomUUID().slice(0, 8);
		this.miNodoId = asNodoId(`we-${this.instanceId.slice(0, 8)}-${session}`);

		estadoMesh.update((s) => ({
			...s,
			conexion: "conectando",
			miNodoId: this.miNodoId,
			instanceId: this.instanceId,
		}));

		try {
			// peerId presente → EdgeMesh abre PeerJSTransport (0.peerjs.com por defecto)
			this.mesh = new EdgeMesh({
				nodoId: this.miNodoId,
				peerId: this.miNodoId,
				storageBackend: "idb",
				logLevel: "warn",
			});

			await this.mesh.iniciar();

			this.salones = new SalonesManager(this.mesh);
			this.registry = new SalonRegistry({ nodoId: this.miNodoId });
			this.salones.usarRegistry(this.registry);

			this.mesh.on("nodoConectado", this.onNodoConectado);
			this.mesh.on("nodoDesconectado", this.onNodoDesconectado);

			estadoMesh.update((s) => ({ ...s, conexion: "conectado" }));
			markNodeActive();
			return this.miNodoId;
		} catch (error) {
			const mensaje =
				error instanceof Error ? error.message : "Error desconocido";
			estadoMesh.update((s) => ({ ...s, conexion: "error" }));
			throw new Error(`Error al iniciar mesh: ${mensaje}`);
		}
	}

	// ─── CRUD DE SALONES DE EXAMEN ────────────────────────────────────────

	/**
	 * Crea un salón EXAMEN. El room code compartible es `salon.id`
	 * (no hay campo `codigo` separado en edge-mesh).
	 */
	async crearSalonExamen(
		nombre: string,
		maxPeers: number = 50,
		meta?: SalonExamenMeta,
	): Promise<string> {
		if (!this.mesh || !this.salones) {
			throw new Error("Mesh no inicializado. Llama a iniciar() primero.");
		}

		const salon = await this.salones.crearSalon(
			nombre,
			TIPO_SALON.EXAMEN,
			maxPeers,
			meta,
		);

		this.salonActivo = salon;
		// Room code = salon.id (Map key en SalonesManager)
		const codigoSala = salon.id;

		this.examenActivo = new ExamenCompartido(
			codigoSala,
			this.mesh.yjsAdapter,
		);
		this.wireExamenEvents();

		const info = salon.obtenerInfo();
		estadoSalon.set({
			id: codigoSala,
			nombre,
			codigo: codigoSala,
			hostId: this.miNodoId,
			tipo: "EXAMEN",
			estado: "esperando",
			participantes: [...info.participantes] as NodoId[],
			preguntas: [],
		});

		return codigoSala;
	}

	/** Anuncia o actualiza metadatos de un salón en el directorio mesh. */
	anunciarSalon(meta: AnuncioSalonExamen): SalonAd {
		if (!this.registry) {
			throw new Error("Mesh no inicializado.");
		}

		return this.registry.anunciar({
			...meta,
			hostPeerId: meta.hostPeerId ?? this.miNodoId,
		});
	}

	/** Lista los anuncios activos conocidos, con filtro regional opcional. */
	listarSalones(region?: string): readonly SalonAd[] {
		return this.registry?.listar(region) ?? [];
	}

	/** Descubre y se une a un salón local o remoto usando su room code. */
	async unirseSalonExamen(codigoSala: string): Promise<void> {
		if (!this.mesh || !this.salones) {
			throw new Error("Mesh no inicializado.");
		}

		const salon = await this.salones.unirsePorCodigo(codigoSala);
		this.salonActivo = salon;

		this.examenActivo = new ExamenCompartido(
			codigoSala,
			this.mesh.yjsAdapter,
		);
		this.wireExamenEvents();

		const info = salon.obtenerInfo();
		estadoSalon.set({
			id: codigoSala,
			nombre: info.nombre,
			codigo: null,
			hostId: info.creador,
			tipo: "EXAMEN",
			estado: "esperando",
			participantes: [...info.participantes] as NodoId[],
			preguntas: [],
		});
	}

	async salirSalonExamen(): Promise<void> {
		if (this.salonActivo && this.salones) {
			await this.salones.abandonarSalon(this.salonActivo.id);
		}
		this.salonActivo = null;
		this.examenActivo = null;
		estadoSalon.set(null);
	}

	private wireExamenEvents(): void {
		if (!this.examenActivo) return;

		this.examenActivo.addEventListener("examenIniciado", () => {
			estadoSalon.update((s) => (s ? { ...s, estado: "iniciado" } : null));
		});

		this.examenActivo.addEventListener("examenFinalizado", () => {
			estadoSalon.update((s) => (s ? { ...s, estado: "finalizado" } : null));
		});

		this.examenActivo.addEventListener("respuestaNueva", ((ev: Event) => {
			const { estudianteId, preguntaId, respuesta } = (
				ev as CustomEvent<{
					estudianteId: string;
					preguntaId: string;
					respuesta: unknown;
				}>
			).detail;
			console.log(
				`[P2PExamen] Respuesta de ${estudianteId} en pregunta ${preguntaId}:`,
				respuesta,
			);
		}) as EventListener);
	}

	// ─── GESTIÓN DE EXAMEN (Host) ─────────────────────────────────────────

	async cargarPreguntas(preguntas: Pregunta[]): Promise<void> {
		if (!this.examenActivo) {
			throw new Error("No hay examen activo. Crea o únete a un salón primero.");
		}

		await this.examenActivo.cargarPreguntas(preguntas.map(toEdgePregunta));

		estadoSalon.update((s) =>
			s ? { ...s, preguntas, estado: "en_curso" } : null,
		);
	}

	async agregarPregunta(pregunta: Pregunta): Promise<void> {
		if (!this.examenActivo) throw new Error("No hay examen activo.");

		await this.examenActivo.agregarPregunta(toEdgePregunta(pregunta));

		estadoSalon.update((s) =>
			s ? { ...s, preguntas: [...s.preguntas, pregunta] } : null,
		);
	}

	async enviarRespuesta(
		preguntaId: string,
		respuesta: unknown,
	): Promise<void> {
		if (!this.examenActivo) throw new Error("No hay examen activo.");

		await this.examenActivo.enviarRespuesta(
			this.miNodoId,
			preguntaId,
			respuesta,
		);
	}

	async iniciarExamen(): Promise<void> {
		if (!this.examenActivo) throw new Error("No hay examen activo.");
		await this.examenActivo.iniciarExamen();
	}

	async finalizarExamen(): Promise<void> {
		if (!this.examenActivo) throw new Error("No hay examen activo.");
		await this.examenActivo.finalizarExamen();
	}

	async obtenerPreguntas(): Promise<Pregunta[]> {
		if (!this.examenActivo) return [];
		return this.examenActivo.obtenerPreguntas().map(fromEdgePregunta);
	}

	async obtenerRespuestas(): Promise<Map<string, unknown>> {
		if (!this.examenActivo) return new Map();
		const r = await this.examenActivo.obtenerRespuestas();
		return new Map(r);
	}

	async obtenerRespuestasDeEstudiante(
		estudianteId: string,
	): Promise<Map<string, unknown>> {
		if (!this.examenActivo) return new Map();
		const r =
			await this.examenActivo.obtenerRespuestasDeEstudiante(estudianteId);
		return new Map(r);
	}

	async obtenerEstadoExamen(): Promise<Record<string, unknown>> {
		if (!this.examenActivo) return {};
		return this.examenActivo.obtenerEstado();
	}

	/** Código de sala activo (= salon.id) o null. */
	obtenerCodigoSalon(): string | null {
		return this.salonActivo?.id ?? null;
	}

	// ─── CIERRE ────────────────────────────────────────────────────────────

	async cerrar(): Promise<void> {
		if (this.salonActivo) {
			await this.salirSalonExamen();
		}
		if (this.mesh) {
			this.mesh.off("nodoConectado", this.onNodoConectado);
			this.mesh.off("nodoDesconectado", this.onNodoDesconectado);
			await this.mesh.detener();
		}
		this.registry?.dispose();
		this.mesh = null;
		this.salones = null;
		this.registry = null;
		this.examenActivo = null;

		estadoMesh.set({
			conexion: "desconectado",
			miNodoId: null,
			peersConectados: 0,
			peers: [],
			hostId: null,
			instanceId: this.instanceId || null,
		});
		estadoSalon.set(null);
		clearNodeActive();

		P2PEdgeMesh.instancia = null;
	}
}

// ─── EXPORT SINGLETON ──────────────────────────────────────────────────────

export const p2p = P2PEdgeMesh.obtener();
