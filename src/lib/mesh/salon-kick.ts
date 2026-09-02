/**
 * Wave-Gov #1163 — Host Kick Peer.
 *
 * El host puede expulsar a un peer en caliente durante el salon.
 * La expulsion se anuncia con un broadcast de evento mesh-local
 * (`salon:kick`) para que todos los nodos del salon lo repliquen.
 */

import {
  type SalonEventBus,
  type SalonPeer,
  type SalonTenant,
} from './salon-shared';

export interface KickPayload {
  hostId: string;
  peerId: string;
  reason: string;
}

export interface SalonKickRegistry {
  addPeer(peer: SalonPeer): void;
  removePeer(peerId: string): boolean;
  peers(): SalonPeer[];
  isKicked(peerId: string): boolean;
  /** Solo el host autenticado puede expulsar. Retorna false si no es el host. */
  hostKick(hostId: string, peerId: string, reason?: string): boolean;
  /** Host permite reingreso tras rectificar (no borra la bitacora). */
  liftKick(hostId: string, peerId: string): boolean;
  log(): KickPayload[];
}

/**
 * Registro de expulsiones del salon. Requiere `hostId` correcto:
 * cualquier intento de kick de un peer no-host se rechaza sin efecto.
 */
export function createSalonKickRegistry(
  tenant: SalonTenant,
  hostId: string,
  bus?: SalonEventBus,
): SalonKickRegistry {
  const peers = new Map<string, SalonPeer>();
  const kicked = new Map<string, KickPayload>();
  const auditLog: KickPayload[] = [];

  function hostKick(callerId: string, peerId: string, reason = 'sin motivo'): boolean {
    if (callerId !== hostId) return false;
    if (peerId === hostId) return false; // el host no puede expulsarse a si mismo
    const payload: KickPayload = { hostId, peerId, reason };
    peers.delete(peerId);
    kicked.set(peerId, payload);
    auditLog.push(payload);
    bus?.emit('salon:kick', tenant, payload);
    return true;
  }

  return {
    addPeer(peer) {
      if (kicked.has(peer.peerId)) return; // expulsado no reentra sin lift
      peers.set(peer.peerId, peer);
    },
    removePeer(peerId) {
      return peers.delete(peerId);
    },
    peers() {
      return [...peers.values()];
    },
    isKicked(peerId) {
      return kicked.has(peerId);
    },
    hostKick,
    liftKick(callerId, peerId) {
      if (callerId !== hostId) return false;
      return kicked.delete(peerId);
    },
    log() {
      return [...auditLog];
    },
  };
}
