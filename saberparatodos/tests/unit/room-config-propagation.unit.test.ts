import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

(globalThis as any).$state = (val: any) => val;

vi.mock('../../src/lib/p2p-edge-mesh', () => ({
  p2p: {
    iniciar: vi.fn().mockResolvedValue('lobby-browser'),
    listarSalones: vi.fn().mockReturnValue([
      {
        codigo: 'SALA-REAL',
        nombre: 'Química 9B',
        hostPeerId: 'profe-peer',
        hostNodoId: 'profe-node',
        subject: 'ciencias',
        grade: 9,
        maxParticipantes: 35,
        status: 'esperando',
        createdAt: Date.now(),
        region: 'CO',
      },
    ]),
  },
}));

vi.mock('../../src/lib/rust-backend', () => ({
  rustBackend: {
    getPartyByCode: vi.fn(async (code: string) => {
      if (code !== 'RUST01') throw new Error('Party not found');
      return {
        id: 'RUST01',
        name: 'Sala Rust',
        hostId: 'h1',
        hostName: 'Profe Rust',
        maxPlayers: 40,
        timePerQuestion: 30,
        totalQuestions: 12,
        grado: 5,
        asignatura: 'lenguaje',
        connectionMode: 'local',
        createdAt: new Date(),
      };
    }),
  },
  detectBackendMode: vi.fn(),
}));

import { roomState } from '../../src/modules/exam-room/stores/roomState.svelte';
import {
  ROOM_NOT_FOUND_MESSAGE,
  roomConfigFromDirectoryEntry,
} from '../../src/modules/exam-room/services/roomConfig';

describe('Room config propagation (/sala-examenes join)', () => {
  it('builds the config from the host announcement', async () => {
    const config = await roomState.resolveRoomConfig('SALA-REAL');
    expect(config).toMatchObject({
      id: 'SALA-REAL',
      name: 'Química 9B',
      grado: 9,
      asignatura: 'ciencias',
      maxPlayers: 35,
      countryCode: 'CO',
      connectionMode: 'edge-mesh',
    });
    expect(config.name).not.toBe('Sala Demo');
  });

  it('throws "room not found" instead of joining with a placeholder config', async () => {
    await expect(roomState.resolveRoomConfig('NOPE42')).rejects.toThrow(ROOM_NOT_FOUND_MESSAGE);
    await expect(roomState.resolveRoomConfig('')).rejects.toThrow(ROOM_NOT_FOUND_MESSAGE);
  });

  it('uses the Rust server config in local mode', async () => {
    const config = await roomState.resolveRoomConfig('RUST01', 'local');
    expect(config).toMatchObject({ id: 'RUST01', grado: 5, asignatura: 'lenguaje', connectionMode: 'local' });
    await expect(roomState.resolveRoomConfig('OTHER1', 'local')).rejects.toThrow(ROOM_NOT_FOUND_MESSAGE);
  });

  it('rejects incomplete announcements', () => {
    expect(() => roomConfigFromDirectoryEntry({ party_code: 'X', exam_config: {} })).toThrow(/anuncio incompleto/);
  });

  it('has no reachable mock config in the join paths', () => {
    const files = [
      '../../src/modules/exam-room/components/RoomApp.svelte',
      '../../src/components/ExamRoomHost.svelte',
      '../../src/components/PartyPlayer.svelte',
      '../../src/modules/exam-room/components/PartyHostView.svelte',
    ];
    for (const rel of files) {
      const source = readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');
      expect(source, rel).not.toMatch(/mockConfig|Sala Demo|coming soon/i);
    }
  });
});
