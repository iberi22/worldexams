/**
 * Resolución de la configuración real de una sala a partir de su anuncio.
 *
 * Los jugadores nunca inventan la configuración: o la publica el host en el
 * directorio mesh (edge-mesh) o la devuelve el servidor (modo local/Rust).
 */

import type { ConnectionMode, RoomConfig } from '../types';

export const ROOM_NOT_FOUND_MESSAGE =
  'Sala no encontrada. Verifica el código y que estés en la misma red Wi-Fi que el anfitrión.';

/** Entrada de `roomState.publicRooms` (anuncio del directorio mesh). */
export interface DirectoryRoomEntry {
  party_code: string;
  host_name?: string;
  exam_config?: Partial<RoomConfig> & { countryCode?: string; region?: string };
  students?: Array<{ id?: string; name?: string }>;
  max_students?: number;
  created_at?: string;
}

export function roomConfigFromDirectoryEntry(
  room: DirectoryRoomEntry,
  connectionMode: ConnectionMode = 'edge-mesh',
): RoomConfig {
  const meshConfig = room.exam_config || {};
  if (!meshConfig.asignatura || !meshConfig.grado) {
    throw new Error(`${ROOM_NOT_FOUND_MESSAGE} (anuncio incompleto)`);
  }
  return {
    id: room.party_code,
    name: meshConfig.name || `Sala ${room.party_code}`,
    hostId: room.students?.[0]?.id || room.host_name || 'mesh-host',
    hostName: room.host_name || 'Anfitrión',
    maxPlayers: room.max_students || meshConfig.maxPlayers || 50,
    timePerQuestion: meshConfig.timePerQuestion || 60,
    totalQuestions: meshConfig.totalQuestions || 20,
    grado: meshConfig.grado,
    asignatura: meshConfig.asignatura,
    region: meshConfig.region,
    countryCode: meshConfig.countryCode,
    connectionMode,
    createdAt: new Date(room.created_at || Date.now()),
  };
}
