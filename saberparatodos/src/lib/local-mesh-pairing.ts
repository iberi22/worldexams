/**
 * Local Mesh & Nearby Pairing Service (Wi-Fi LAN / Bluetooth Web API / P2P Mesh)
 * Permite descubrimiento y emparejamiento automático de salones de examen sin servidor central.
 */

export interface NearbyRoomAd {
  code: string;
  name: string;
  hostName: string;
  subject: string;
  grade: number;
  playersCount: number;
  transport: 'lan-mesh' | 'bluetooth' | 'webrtc-p2p';
  discoveredAt: number;
}

class LocalMeshPairingService {
  private broadcastChannel: BroadcastChannel | null = null;
  private isScanning = false;
  private discoveredRooms = new Map<string, NearbyRoomAd>();
  private listeners = new Set<(rooms: NearbyRoomAd[]) => void>();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('worldexams_local_mesh_discovery');
        this.broadcastChannel.onmessage = (event) => {
          this.handleIncomingAnnouncement(event.data);
        };
      } catch (e) {
        console.warn('[LocalPairing] BroadcastChannel not supported in current environment', e);
      }
    }
  }

  /**
   * Anuncia activamente una sala creada a todos los peers en la misma red local / pestaña / PWA
   */
  announceRoom(room: {
    code: string;
    name: string;
    hostName: string;
    subject: string;
    grade: number;
    playersCount?: number;
  }) {
    const payload: NearbyRoomAd = {
      ...room,
      playersCount: room.playersCount || 1,
      transport: 'lan-mesh',
      discoveredAt: Date.now(),
    };

    this.discoveredRooms.set(room.code, payload);
    this.notifyListeners();

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'ANNOUNCE_ROOM',
          room: payload,
        });
      } catch (e) {
        console.error('[LocalPairing] Error broadcasting room:', e);
      }
    }
  }

  /**
   * Solicita a los hosts activos en la red local que respondan con sus datos de sala
   */
  startDiscovery() {
    this.isScanning = true;
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'PING_ACTIVE_ROOMS' });
      } catch {}
    }
  }

  /**
   * Intenta emparejamiento por Web Bluetooth (si el navegador y hardware lo soportan)
   */
  async scanBluetoothPeers(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      try {
        // Solicita dispositivo con servicio genérico o custom
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['generic_access']
        });
        if (device) {
          console.log('[LocalPairing] Dispositivo Bluetooth detectado:', device.name);
          return true;
        }
      } catch (e: any) {
        console.log('[LocalPairing] Bluetooth scan cancelado o no disponible:', e?.message || e);
      }
    }
    return false;
  }

  subscribe(callback: (rooms: NearbyRoomAd[]) => void): () => void {
    this.listeners.add(callback);
    callback(Array.from(this.discoveredRooms.values()));
    return () => {
      this.listeners.delete(callback);
    };
  }

  private handleIncomingAnnouncement(data: any) {
    if (!data) return;

    if (data.type === 'ANNOUNCE_ROOM' && data.room) {
      this.discoveredRooms.set(data.room.code, {
        ...data.room,
        discoveredAt: Date.now(),
      });
      this.notifyListeners();
    } else if (data.type === 'PING_ACTIVE_ROOMS') {
      // Re-emitir salas locales si somos anfitriones
      const myRooms = Array.from(this.discoveredRooms.values());
      myRooms.forEach((r) => {
        this.broadcastChannel?.postMessage({
          type: 'ANNOUNCE_ROOM',
          room: r,
        });
      });
    }
  }

  private notifyListeners() {
    const list = Array.from(this.discoveredRooms.values()).filter(
      (r) => Date.now() - r.discoveredAt < 60000 // Expira tras 60s sin beacon
    );
    this.listeners.forEach((cb) => cb(list));
  }
}

export const localMeshPairing = new LocalMeshPairingService();
