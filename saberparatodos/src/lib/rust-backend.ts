/**
 * Rust Backend Client
 * Conecta el frontend Svelte con el servidor Rust local
 */

import type { PartyConfig, WSMessage, Player } from '../modules/party/types';

interface RustBackendConfig {
  host: string;
  port: number;
  secure: boolean;
}

class RustBackendClient {
  private ws?: WebSocket;
  private config: RustBackendConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private messageHandlers: ((message: WSMessage) => void)[] = [];

  constructor(config: Partial<RustBackendConfig> = {}) {
    this.config = {
      host: config.host || 'localhost',
      port: config.port || 8080,
      secure: config.secure || false,
    };
  }

  /**
   * Crea una nueva party en el servidor Rust
   */
  async createParty(
    hostName: string,
    partyName: string,
    grade: number,
    subject: string,
    options: Partial<PartyConfig> = {}
  ): Promise<{ partyId: string; code: string }> {
    const response = await fetch(`${this.getHttpUrl()}/api/parties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: partyName,
        host_name: hostName,
        max_players: options.maxPlayers || 100,
        time_per_question: options.timePerQuestion || 60,
        total_questions: options.totalQuestions || 20,
        grade,
        subject,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create party: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      partyId: data.id,
      code: data.code,
    };
  }

  /**
   * Obtiene información de una party por código
   */
  async getPartyByCode(code: string): Promise<PartyConfig> {
    const response = await fetch(`${this.getHttpUrl()}/api/parties/${code}`);

    if (!response.ok) {
      throw new Error(`Party not found: ${code}`);
    }

    const data = await response.json();
    return this.mapToPartyConfig(data);
  }

  /**
   * Conecta al WebSocket de la party
   */
  async connectToParty(code: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = `${this.getWsUrl()}/ws/${code}`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log(`[RustBackend] Connected to party ${code}`);
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage;
          this.handleMessage(message);
        } catch (error) {
          console.error('[RustBackend] Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[RustBackend] WebSocket error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.warn('[RustBackend] Connection closed');
        this.attemptReconnect(code);
      };
    });
  }

  /**
   * Envía un mensaje al servidor
   */
  send(message: WSMessage): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('[RustBackend] WebSocket not connected');
      return;
    }

    this.ws.send(JSON.stringify(message));
  }

  /**
   * Registra un handler para mensajes entrantes
   */
  onMessage(handler: (message: WSMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  /**
   * Desconecta del servidor
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
    this.messageHandlers = [];
  }

  /**
   * Verifica si el servidor Rust está disponible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.getHttpUrl()}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene estadísticas del servidor
   */
  async getServerStats(): Promise<{
    version: string;
    uptime: number;
    activeParties: number;
    totalPlayers: number;
  }> {
    const response = await fetch(`${this.getHttpUrl()}/api/stats`);

    if (!response.ok) {
      throw new Error('Failed to fetch server stats');
    }

    return response.json();
  }

  private getHttpUrl(): string {
    const protocol = this.config.secure ? 'https' : 'http';
    return `${protocol}://${this.config.host}:${this.config.port}`;
  }

  private getWsUrl(): string {
    const protocol = this.config.secure ? 'wss' : 'ws';
    return `${protocol}://${this.config.host}:${this.config.port}`;
  }

  private handleMessage(message: WSMessage): void {
    this.messageHandlers.forEach((handler) => handler(message));
  }

  private async attemptReconnect(code: string): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[RustBackend] Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    console.log(
      `[RustBackend] Reconnecting in ${delay / 1000}s (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connectToParty(code).catch((error) => {
        console.error('[RustBackend] Reconnection failed:', error);
      });
    }, delay);
  }

  private mapToPartyConfig(data: any): PartyConfig {
    return {
      id: data.id,
      name: data.name,
      hostId: data.host_id,
      hostName: data.host_name,
      maxPlayers: data.max_players,
      timePerQuestion: data.time_per_question,
      totalQuestions: data.total_questions,
      grado: data.grade,
      asignatura: data.subject,
      connectionMode: 'local',
      createdAt: new Date(data.created_at),
    };
  }
}

// Singleton instance
export const rustBackend = new RustBackendClient();

// Auto-detect if Rust server is available
export async function detectBackendMode(): Promise<'rust' | 'supabase'> {
  const isRustAvailable = await rustBackend.healthCheck();

  if (isRustAvailable) {
    console.log('[Backend] Rust server detected, using local mode');
    return 'rust';
  } else {
    console.log('[Backend] Rust server not available, falling back to Supabase');
    return 'supabase';
  }
}
