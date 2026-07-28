/**
 * Connection Service - Triple Mode
 *
 * MODO EDGE-MESH (Default):
 *   - Usa EdgeMesh + SalonesManager + ExamenCompartido (PeerJS + Yjs)
 *   - 100% P2P local, sin Supabase, sin servidor central
 *   - Signaling via PeerJS público (0.peerjs.com) o relay custom
 *   - Sincronización CRDT via Yjs (preguntas, respuestas, estado)
 *   - Soporta 1-100 dispositivos en mesh
 *   - Latencia: <50ms (LAN), <150ms (WAN)
 *
 * MODO SUPABASE (Mirror/Legacy opt-in):
 *   - Usa Supabase Realtime Channels (WebSockets)
 *   - Solo disponible con PUBLIC_ROOMS_SUPABASE_MIRROR=true
 *   - Requiere internet
 *   - Latencia: ~50-150ms
 *
 * MODO LOCAL (Legacy):
 *   - Requiere servidor Node.js externo o Rust Backend
 *   - Mantenido por compatibilidad
 */

import { p2p, estadoMesh, estadoSalon } from '../../../lib/p2p-edge-mesh';
import { supabase } from '../../../lib/supabase';
import { rustBackend, detectBackendMode } from '../../../lib/rust-backend';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { ConnectionMode, WSMessage, PartyConfig } from '../types';
import { isSupabaseMirrorEnabled } from './authPersistence';
import { get } from 'svelte/store';

type MessageHandler = (message: WSMessage) => void;

class ConnectionService {
  private mode: ConnectionMode = 'edge-mesh';
  private channel?: RealtimeChannel;
  private ws?: WebSocket;
  private messageHandlers: MessageHandler[] = [];
  private nombreUsuario: string = '';
  private codigoSala: string = '';

  /**
   * Auto-detecta el modo de conexión y conecta
   */
  async autoConnect(config: PartyConfig): Promise<void> {
    this.mode = config.connectionMode ?? 'edge-mesh';
    this.nombreUsuario = config.nombreUsuario ?? '';

    return this.connect(config);
  }

  /**
   * Conecta al modo seleccionado
   */
  async connect(config: PartyConfig): Promise<void> {
    this.mode = config.connectionMode ?? 'edge-mesh';
    this.nombreUsuario = config.nombreUsuario ?? '';
    this.codigoSala = config.id;

    const meshIntent = config.meshIntent ?? 'join';

    switch (this.mode) {
      case 'edge-mesh':
        await this.connectEdgeMesh(config, meshIntent);
        break;
      case 'supabase':
        if (!isSupabaseMirrorEnabled()) {
          throw new Error(
            'El modo Supabase para salones está desactivado. Activa PUBLIC_ROOMS_SUPABASE_MIRROR para usarlo.',
          );
        }
        await this.connectSupabase(this.codigoSala);
        break;
      case 'local':
        await this.connectRustBackend(this.codigoSala);
        break;
      default:
        // Por defecto intenta edge-mesh
        await this.connectEdgeMesh(config, meshIntent);
    }
  }

  /**
   * Desconecta de la sala
   */
  async disconnect(): Promise<void> {
    if (this.mode === 'edge-mesh') {
      await p2p.salirSalonExamen();
      await p2p.cerrar();
    }

    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = undefined;
    }

    if (this.mode === 'local') {
      rustBackend.disconnect();
    }

    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }

    this.messageHandlers = [];
    console.log('[ConnectionService] Desconectado');
  }

  /**
   * Envía un mensaje a todos los participantes
   */
  broadcast(message: WSMessage): void {
    if (this.mode === 'edge-mesh') {
      // EdgeMesh ya maneja broadcast via Yjs + gossip
      console.log('[EdgeMesh] Broadcast no necesario — CRDT sincroniza automáticamente');
    } else if (this.mode === 'supabase' && this.channel) {
      this.channel.send({
        type: 'broadcast',
        event: 'party_message',
        payload: message,
      });
    } else if (this.mode === 'local') {
      rustBackend.send(message);
    }
  }

  /**
   * Registra un handler para mensajes entrantes
   */
  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  // ─── MODO EDGE-MESH ──────────────────────────────────────────────────────

  private async connectEdgeMesh(
    config: PartyConfig,
    intent: 'create' | 'join' = 'join',
  ): Promise<void> {
    const roomId = config.id;
    try {
      console.log('[EdgeMesh] Iniciando conexión mesh P2P...');

      const nodoId = await p2p.iniciar(this.nombreUsuario);
      console.log(`[EdgeMesh] ✅ Mesh iniciado como ${nodoId}`);

      const wantsCreate =
        intent === 'create' || !roomId || roomId === 'new' || roomId === 'create';

      if (wantsCreate) {
        const codigo = await p2p.crearSalonExamen(
          config.name || `Examen-${Date.now().toString(36).toUpperCase()}`,
          config.maxPlayers || 100,
          {
            region: config.countryCode || config.region,
            subject: config.asignatura,
            grade: config.grado,
          },
        );
        this.codigoSala = codigo;
        console.log(`[EdgeMesh] ✅ Sala creada (room code = salon.id): ${codigo}`);
      } else {
        await p2p.unirseSalonExamen(roomId);
        console.log(`[EdgeMesh] ✅ Unido a sala ${roomId}`);
      }

    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido';
      console.error('[EdgeMesh] ❌ Error de conexión:', mensaje);
      throw new Error(
        `No se pudo conectar al salón por edge-mesh: ${mensaje}. Puedes reintentar.`,
        { cause: error },
      );
    }
  }

  // ─── MODO SUPABASE ───────────────────────────────────────────────────────

  private async connectSupabase(roomId: string): Promise<void> {
    const channelName = `party:${roomId}`;

    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: true },
        presence: { key: '' },
      },
    });

    this.channel.on('broadcast', { event: 'party_message' }, ({ payload }) => {
      this.handleMessage(payload as WSMessage);
    });

    this.channel.on('presence', { event: 'sync' }, () => {
      const state = this.channel!.presenceState();
      console.log('[Supabase] Usuarios online:', Object.keys(state).length);
    });

    // Suscribirse con reintentos
    let status = 'INITIAL';
    let retries = 3;

    while (retries > 0) {
      status = await new Promise<string>((resolve) => {
        void this.channel!.subscribe((s) => resolve(s));
      });

      if (status === 'SUBSCRIBED') {
        console.log(`[Supabase] ✅ Conectado a ${channelName}`);
        return;
      }

      console.warn(
        `[Supabase] ⚠️ Intento fallido: ${status}. Reintentando... (${retries} restantes)`,
      );
      retries--;
      if (retries > 0) await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (status !== 'SUBSCRIBED') {
      console.error(
        `[Supabase] ❌ No se pudo conectar a ${channelName}. Estado: ${status}`,
      );
    }
  }

  // ─── MODO LOCAL (Rust Backend) ──────────────────────────────────────────

  private async connectRustBackend(partyCode: string): Promise<void> {
    await rustBackend.connectToParty(partyCode);

    rustBackend.onMessage((message) => {
      this.handleMessage(message);
    });

    console.log(`[RustBackend] Conectado a party ${partyCode}`);
  }

  // ─── MANEJO DE MENSAJES ──────────────────────────────────────────────────

  private handleMessage(message: WSMessage): void {
    this.messageHandlers.forEach((handler) => handler(message));
  }

  // ─── GETTERS DE ESTADO ───────────────────────────────────────────────────

  getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' {
    if (this.mode === 'edge-mesh') {
      const estado = get(estadoMesh);
      if (estado.conexion === 'conectado') return 'connected';
      if (estado.conexion === 'conectando') return 'connecting';
      return 'disconnected';
    }

    if (this.mode === 'supabase') {
      return this.channel?.state === 'joined' ? 'connected' : 'disconnected';
    }

    if (this.mode === 'local') {
      if (!this.ws) return 'disconnected';
      switch (this.ws.readyState) {
        case WebSocket.CONNECTING:
          return 'connecting';
        case WebSocket.OPEN:
          return 'connected';
        default:
          return 'disconnected';
      }
    }

    return 'disconnected';
  }

  /**
   * Obtiene el estado reactivo del mesh (stores Svelte)
   */
  getEstadoMesh() {
    return estadoMesh;
  }

  /**
   * Obtiene el estado reactivo del salón de examen
   */
  getEstadoSalon() {
    return estadoSalon;
  }

  /** Room code activo (salon.id en edge-mesh) tras create/join. */
  getCodigoSala(): string {
    return p2p.obtenerCodigoSalon() ?? this.codigoSala;
  }

  getMode(): ConnectionMode {
    return this.mode;
  }
}

// Singleton
export const connectionService = new ConnectionService();
