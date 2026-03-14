import { joinRoom, selfId } from 'trystero/supabase';
import { supabaseUrl, supabaseAnonKey } from './supabase';
import { RelayRoom } from './p2p-relay-room';
import {
  clearP2PState,

  setupLifecycleHandlers,
  onSwMessage,
  type P2PState
} from './p2p-sw-bridge';

export type P2PMessageType = 'CONFIG_UPDATE' | 'START_EXAM' | 'READY_STATE' | 'EXAM_RESULT' | 'FOCUS_EVENT';

export interface P2PMessage {
  type: P2PMessageType;
  payload: any;
  senderId?: string;
  senderName?: string;
}

export class P2PService {
  private room: any = null;
  private isHost: boolean = false;
  private myPeerId: string = '';
  private hostPeerId: string | null = null; // 🆕 Track Host ID
  private connections: string[] = []; // Peer IDs
  private sendDataAction: any = null;
  private sendFullAction: any = null;

  // 🆕 State persistence
  private partyCode: string = '';
  private playerName: string = '';
  private cleanupLifecycle: (() => void) | null = null;
  private cleanupSwMessages: (() => void) | null = null;

  // Callbacks - Now support multiple listeners
  private dataCallbacks: Set<(data: P2PMessage) => void> = new Set();
  private onConnCallback: ((conn: any) => void) | null = null;

  constructor() {
    this.connections = [];
    this.dataCallbacks = new Set();
    this.setupReconnectionListener();
  }

  // 🆕 Setup reconnection listener for SW messages
  private setupReconnectionListener() {
    this.cleanupSwMessages = onSwMessage((data) => {
      if (data.type === 'P2P_RECONNECT_REQUEST' && data.payload) {
        console.log('📡 SW requested reconnection to party:', data.payload.partyCode);
        window.dispatchEvent(new CustomEvent('p2p-reconnect-request', {
          detail: data.payload
        }));
      }
    });
  }

  // 🆕 Get current state for persistence
  private getCurrentState(): P2PState | null {
    if (!this.partyCode || !this.myPeerId) return null;
    return {
      partyCode: this.partyCode,
      peerId: this.myPeerId,
      isHost: this.isHost,
      hostPeerId: this.hostPeerId || undefined,
      playerName: this.playerName,
      timestamp: Date.now()
    };
  }

  // 🆕 Set player name for state persistence
  setPlayerName(name: string) {
    this.playerName = name;
  }

  // Set Host ID (for Guests to filter traffic)
  setHostId(id: string) {
      this.hostPeerId = id;
      console.log('🎯 P2P Host ID set:', id);
  }

  // Initialize as Host
  async initHost(partyCode: string): Promise<string> {
    this.isHost = true;
    this.myPeerId = selfId;
    this.hostPeerId = selfId; // I am host

    // Use exported values from supabase.ts to ensure consistency
    const sbUrl = supabaseUrl?.trim();
    const sbKey = supabaseAnonKey?.trim();

    if (!sbUrl || !sbUrl.startsWith('http')) {
        console.error('❌ Invalid Supabase URL:', sbUrl);
        throw new Error('Invalid Supabase URL');
    }

    // Trystero Supabase strategy: `appId` MUST be your Supabase project URL
    const config = {
        appId: sbUrl,
        supabaseKey: sbKey,
        rtcConfig: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }
    };

    console.log('📡 Initializing P2P Host (Strategy: Supabase)...');
    try {
        this.room = joinRoom(config, partyCode);
    } catch (e) {
        console.warn('⚠️ Supabase signaling failed, falling back to Hive Relay:', e);
        this.room = new RelayRoom(config.rtcConfig);
        await (this.room as RelayRoom).join(partyCode, selfId);
    }

    // Setup Actions
    const [sendData, getData] = this.room.makeAction('data');
    this.sendDataAction = sendData;
    getData((data: any, peerId: string) => this.handleData(data, peerId));

    const [sendFull, _getFull] = this.room.makeAction('party_full');
    this.sendFullAction = sendFull;

    this.room.onPeerJoin((peerId: string) => {
      console.log('👤 New Peer Joined:', peerId);

      // Soft Cap Logic: Limit to 30 peers
      if (this.connections.length >= 30) {
          console.warn('⚠️ Soft Cap Reached. Rejecting peer:', peerId);
          this.sendFullAction('FULL', peerId);
          return;
      }

      this.connections.push(peerId);
      if (this.onConnCallback) this.onConnCallback({ peer: peerId, open: true });
    });

    this.room.onPeerLeave((peerId: string) => {
      console.log('❌ Peer Left:', peerId);
      this.connections = this.connections.filter(id => id !== peerId);
    });

    // 🆕 Save party code and setup lifecycle handlers
    this.partyCode = partyCode;
    this.cleanupLifecycle = setupLifecycleHandlers(() => this.getCurrentState());

    return selfId;
  }

  // Initialize as Guest and Connect to Host (via Room)
  async connectToHost(partyCode: string): Promise<void> {
    this.isHost = false;
    this.myPeerId = selfId;

    const sbUrl = supabaseUrl?.trim();
    const sbKey = supabaseAnonKey?.trim();

    if (!sbUrl || !sbUrl.startsWith('http')) {
        console.error('❌ Invalid Supabase URL:', sbUrl);
        throw new Error('Invalid Supabase URL');
    }

    // Trystero Supabase strategy: `appId` MUST be your Supabase project URL
    const config = {
        appId: sbUrl,
        supabaseKey: sbKey,
        rtcConfig: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }
    };

    console.log('📡 Connecting to P2P Room (Strategy: Supabase):', partyCode);
    try {
        this.room = joinRoom(config, partyCode);
    } catch (e) {
        console.warn('⚠️ Supabase signaling failed, falling back to Hive Relay:', e);
        this.room = new RelayRoom(config.rtcConfig);
        await (this.room as RelayRoom).join(partyCode, selfId);
    }

    // Setup Actions
    const [sendData, getData] = this.room.makeAction('data');
    this.sendDataAction = sendData;
    getData((data: any, _peerId: string) => this.handleData(data, _peerId));

    const [_sendFull, getFull] = this.room.makeAction('party_full');
    getFull((msg: string, _peerId: string) => {
        if (msg === 'FULL') {
            console.warn('⛔ Party is full (P2P). Disconnecting.');
            this.disconnect();
            // Ideally trigger an event to UI to switch to fallback
        }
    });

    this.room.onPeerJoin((peerId: string) => {
        console.log('👤 Connected to Peer (Host/Guest):', peerId);
        this.connections.push(peerId);
        if (this.onConnCallback) this.onConnCallback({ peer: peerId, open: true });
    });

    this.room.onPeerLeave((peerId: string) => {
        this.connections = this.connections.filter(id => id !== peerId);
    });

    // 🆕 Save party code and setup lifecycle handlers
    this.partyCode = partyCode;
    this.cleanupLifecycle = setupLifecycleHandlers(() => this.getCurrentState());
  }

  private handleData(data: any, peerId: string) {
      // console.log('📥 P2P Data Received:', data.type, 'from:', peerId);

      // 🛡️ Star Topology Simulation:
      // If I am a Guest, ONLY accept messages from the Host.
      // Exception: If we haven't identified Host yet (handshake phase), or specific allowed types.
      if (!this.isHost && this.hostPeerId && peerId !== this.hostPeerId) {
          // Ignore traffic from other guests to reduce processing noise
          return;
      }

      const message: P2PMessage = {
          ...data,
          senderId: peerId
      };

      // 🔥 Call ALL registered callbacks
      for (const callback of this.dataCallbacks) {
          try {
              callback(message);
          } catch (e) {
              console.error('P2P callback error:', e);
          }
      }

      // If Host, relay important messages to all other guests
      if (this.isHost) {
          if (data.type === 'READY_STATE' || data.type === 'FOCUS_EVENT') {
              // Relay to all other connections
              // Note: Trystero is mesh, so everyone gets it. But we want to be the authority.
              // Actually, if we are Host, we just process it. We don't need to relay it back to everyone unless needed.
              // For READY_STATE, maybe we want everyone to know?
              // For now, let's NOT relay to avoid storms, unless specifically requested.
          }
      }
  }

  // Broadcast message to all connected peers
  broadcast(type: P2PMessageType, payload: any) {
    if (this.sendDataAction) {
        this.sendDataAction({ type, payload, senderId: this.myPeerId });
    }
  }

  // Send to specific peer
  sendTo(peerId: string, type: P2PMessageType, payload: any) {
     if (this.sendDataAction) {
         this.sendDataAction({ type, payload, senderId: this.myPeerId }, peerId);
     }
  }

  // Send to Host (Guest only)
  sendToHost(type: P2PMessageType, payload: any) {
      // For now, broadcast. Host will filter. Guests will ignore.
      this.broadcast(type, payload);
  }

  // Listeners - Returns unsubscribe function
  onData(cb: (data: P2PMessage) => void): () => void {
    this.dataCallbacks.add(cb);
    // Return unsubscribe function
    return () => {
      this.dataCallbacks.delete(cb);
    };
  }

  onConnection(cb: (conn: any) => void) {
      this.onConnCallback = cb;
  }

  // Check if P2P is connected
  isConnected(): boolean {
      return this.connections.length > 0;
  }

  // Get connection count
  getConnectionCount(): number {
      return this.connections.length;
  }

  // Get all peers with metadata
  getPeers(): Record<string, any> {
      return this.room ? this.room.getPeers() : {};
  }

  // Cleanup
  destroy() {
    // 🆕 Clean up lifecycle handlers
    if (this.cleanupLifecycle) {
      this.cleanupLifecycle();
      this.cleanupLifecycle = null;
    }

    if (this.cleanupSwMessages) {
      this.cleanupSwMessages();
      this.cleanupSwMessages = null;
    }

    if (this.room) {
        this.room.leave();
        this.room = null;
    }
    this.connections = [];
    this.dataCallbacks.clear();
    this.hostPeerId = null;
    this.partyCode = '';
    this.playerName = '';

    // 🆕 Clear persisted state
    clearP2PState();
  }

  // Alias for cleanup
  disconnect() {
    this.destroy();
  }
}

export const p2pService = new P2PService();
