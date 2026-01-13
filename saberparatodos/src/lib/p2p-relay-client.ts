/**
 * Hive Relay WebSocket Client
 *
 * Client for the hive-relay signaling server.
 * Handles room joining and message routing for WebRTC signaling.
 */

import { relayUrl } from './supabase';

export type SignalType = 'join' | 'leave' | 'offer' | 'answer' | 'ice' | 'peer_joined' | 'peer_left' | 'room_info' | 'error';

export interface SignalMessage {
  type: SignalType;
  room?: string;
  peer_id?: string;
  to?: string;
  sdp?: string;
  candidate?: string;
  error?: string;
  peers?: string[];
}

export class RelayClient {
  private ws: WebSocket | null = null;
  private roomCode: string | null = null;
  private peerId: string | null = null;
  private onMessage: (msg: SignalMessage) => void;
  private reconnectTimer: any = null;

  constructor(onMessage: (msg: SignalMessage) => void) {
    this.onMessage = onMessage;
  }

  async connect(roomCode: string, peerId: string): Promise<void> {
    this.roomCode = roomCode;
    this.peerId = peerId;

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(relayUrl);

        this.ws.onopen = () => {
          console.log('🐝 Hive Relay: Connected');
          this.send({
            type: 'join',
            room: roomCode,
            peer_id: peerId
          });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data: SignalMessage = JSON.parse(event.data);
            this.onMessage(data);
          } catch (e) {
            console.error('🐝 Hive Relay: Failed to parse message', e);
          }
        };

        this.ws.onerror = (error) => {
          console.error('🐝 Hive Relay: WebSocket error', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('🐝 Hive Relay: Connection closed');
          this.scheduleReconnect();
        };

      } catch (e) {
        reject(e);
      }
    });
  }

  send(msg: SignalMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      console.warn('🐝 Hive Relay: Cannot send, socket not open');
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.roomCode && this.peerId) {
        console.log('🐝 Hive Relay: Attempting reconnect...');
        this.connect(this.roomCode, this.peerId).catch(() => {});
      }
    }, 5000);
  }

  disconnect() {
    this.roomCode = null;
    this.peerId = null;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}
