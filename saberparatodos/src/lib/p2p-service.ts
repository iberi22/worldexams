import { joinRoom, selfId } from 'trystero/supabase';

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

  // Callbacks
  private onDataCallback: ((data: P2PMessage) => void) | null = null;
  private onConnCallback: ((conn: any) => void) | null = null;

  constructor() {
    this.connections = [];
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

    const config = {
        appId: 'saberparatodos-party',
        supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
        supabaseKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        rtcConfig: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }
    };

    console.log('📡 Initializing P2P Host with Trystero/Supabase...');
    this.room = joinRoom(config, partyCode);

    // Setup Actions
    const [sendData, getData] = this.room.makeAction('data');
    this.sendDataAction = sendData;
    getData((data: any, peerId: string) => this.handleData(data, peerId));

    const [sendFull, getFull] = this.room.makeAction('party_full');
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

    return selfId;
  }

  // Initialize as Guest and Connect to Host (via Room)
  async connectToHost(partyCode: string): Promise<void> {
    this.isHost = false;
    this.myPeerId = selfId;

    const config = {
        appId: 'saberparatodos-party',
        supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
        supabaseKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        rtcConfig: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }
    };

    console.log('📡 Connecting to P2P Room:', partyCode);
    this.room = joinRoom(config, partyCode);

    // Setup Actions
    const [sendData, getData] = this.room.makeAction('data');
    this.sendDataAction = sendData;
    getData((data: any, peerId: string) => this.handleData(data, peerId));

    const [sendFull, getFull] = this.room.makeAction('party_full');
    getFull((msg: string, peerId: string) => {
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

      if (this.onDataCallback) {
          const message: P2PMessage = {
              ...data,
              senderId: peerId
          };
          this.onDataCallback(message);
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

  // Listeners
  onData(cb: (data: P2PMessage) => void) {
    this.onDataCallback = cb;
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
    if (this.room) {
        this.room.leave();
        this.room = null;
    }
    this.connections = [];
  }

  // Alias for cleanup
  disconnect() {
    this.destroy();
  }
}

export const p2pService = new P2PService();
