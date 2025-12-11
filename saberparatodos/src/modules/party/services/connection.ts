/**
 * Connection Service - Dual Mode
 *
 * MODO SUPABASE (Default):
 *   - Usa Supabase Realtime Channels (WebSockets)
 *   - Soporta hasta 100 jugadores (Free Tier: 200 conexiones concurrentes)
 *   - Requiere internet
 *   - Latencia: ~50-150ms
 *
 * MODO LOCAL (Experimental):
 *   - Requiere que el Host ejecute un servidor Node.js externo
 *   - Comando: `npx party-host-server --port 8080`
 *   - Players se conectan a ws://[IP_LOCAL]:8080
 *   - Latencia: <10ms (LAN)
 *   - Soporta hasta 50-100 jugadores (depende del hardware del Host)
 */

import { supabase } from '../../../lib/supabase';
import { rustBackend, detectBackendMode } from '../../../lib/rust-backend';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { ConnectionMode, WSMessage, PartyConfig } from '../types';

type MessageHandler = (message: WSMessage) => void;

class ConnectionService {
  private mode: ConnectionMode = 'supabase';
  private channel?: RealtimeChannel;
  private ws?: WebSocket;
  private messageHandlers: MessageHandler[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private autoDetected = false;

  /**
   * Auto-detecta el backend disponible y conecta
   */
  async autoConnect(config: PartyConfig): Promise<void> {
    if (!this.autoDetected) {
      const detectedMode = await detectBackendMode();
      this.mode = detectedMode;
      this.autoDetected = true;
    }

    return this.connect(config);
  }

  /**
   * Conecta a una party room
   */
  async connect(config: PartyConfig): Promise<void> {
    this.mode = config.connectionMode;

    if (this.mode === 'supabase') {
      await this.connectSupabase(config.id);
    } else {
      await this.connectRustBackend(config.id);
    }
  }

  /**
   * Desconecta de la party
   */
  disconnect(): void {
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
    if (this.mode === 'supabase' && this.channel) {
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

  /**
   * MODO SUPABASE: Conecta via Realtime Channels
   */
  private async connectSupabase(roomId: string): Promise<void> {
    const channelName = `party:${roomId}`;

    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: true }, // Recibir propios mensajes
        presence: { key: '' }, // Tracking de usuarios online
      },
    });

    // Escuchar mensajes broadcast
    this.channel.on('broadcast', { event: 'party_message' }, ({ payload }) => {
      this.handleMessage(payload as WSMessage);
    });

    // Escuchar cambios de presencia
    this.channel.on('presence', { event: 'sync' }, () => {
      const state = this.channel!.presenceState();
      console.log('[Supabase] Usuarios online:', Object.keys(state).length);
    });

    // Suscribirse
    const status = await this.channel.subscribe();

    if (status === 'SUBSCRIBED') {
      console.log(`[Supabase] Conectado a ${channelName}`);
    } else {
      throw new Error(`Failed to subscribe to ${channelName}`);
    }
  }

  /**
   * MODO LOCAL: Conecta via Rust Backend WebSocket
   */
  private async connectRustBackend(partyCode: string): Promise<void> {
    await rustBackend.connectToParty(partyCode);

    rustBackend.onMessage((message) => {
      this.handleMessage(message);
    });

    console.log(`[RustBackend] Conectado a party ${partyCode}`);
  }

  /**
   * MODO LOCAL (Legacy): Conecta via WebSocket nativo
   * @deprecated Use connectRustBackend instead
   */
  private async connectLocal(roomId: string): Promise<void> {
    // En producción, el Host debería proporcionar su IP local
    // Ejemplo: ws://192.168.1.100:8080/party/ABC123
    const wsUrl = `ws://localhost:8080/party/${roomId}`;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log(`[WebSocket] Conectado a ${wsUrl}`);
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage;
          this.handleMessage(message);
        } catch (error) {
          console.error('[WebSocket] Error parseando mensaje:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error de conexión:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.warn('[WebSocket] Conexión cerrada');
        this.attemptReconnect(roomId);
      };
    });
  }

  /**
   * Intenta reconectar automáticamente (solo modo local)
   */
  private async attemptReconnect(roomId: string): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WebSocket] Máximo de intentos de reconexión alcanzado');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    console.log(
      `[WebSocket] Reintentando conexión en ${delay / 1000}s (intento ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connectLocal(roomId).catch((error) => {
        console.error('[WebSocket] Fallo en reconexión:', error);
      });
    }, delay);
  }

  /**
   * Maneja mensajes entrantes de cualquier modo
   */
  private handleMessage(message: WSMessage): void {
    this.messageHandlers.forEach((handler) => handler(message));
  }

  /**
   * Obtiene el estado actual de la conexión
   */
  getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' {
    if (this.mode === 'supabase') {
      return this.channel?.state === 'joined' ? 'connected' : 'disconnected';
    } else {
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
  }
}

// Singleton
export const connectionService = new ConnectionService();
