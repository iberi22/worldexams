import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, unmount, flushSync, tick } from 'svelte';

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
  detectBackendMode: vi.fn().mockResolvedValue('edge-mesh'),
}));

vi.mock('../../src/lib/local-mesh-pairing', () => ({
  localMeshPairing: { announceRoom: vi.fn(), startScanning: vi.fn(), stopScanning: vi.fn(), subscribe: vi.fn(() => () => {}) },
}));

import { roomState } from '../../src/modules/exam-room/stores/roomState.svelte';
import RoomApp from '../../src/modules/exam-room/components/RoomApp.svelte';
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

});

describe('RoomApp join (/sala-examenes) uses the host config', () => {
  let app: ReturnType<typeof mount> | null = null;

  afterEach(() => {
    if (app) unmount(app);
    app = null;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  async function openJoinForm(code: string, name: string) {
    window.history.replaceState({}, '', `/sala-examenes?join=${code}`);
    app = mount(RoomApp, { target: document.body });
    // detectBackendMode resolves → join view (from ?join=CODE)
    await vi.waitFor(() => expect(document.body.textContent).toContain('Unirse a una Sala'));
    const nameInput = document.querySelector<HTMLInputElement>('input[placeholder="Ej: Juan Pérez"]')!;
    nameInput.value = name;
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    flushSync();
    const button = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('Unirse a Sala'))!;
    button.click();
    await tick();
  }

  it('joins with the config announced by the host', async () => {
    const joinRoom = vi.spyOn(roomState, 'joinRoom').mockResolvedValue(undefined);
    await openJoinForm('SALA-REAL', 'Juli');

    await vi.waitFor(() => expect(joinRoom).toHaveBeenCalledTimes(1));
    const [code, name, config] = joinRoom.mock.calls[0];
    expect(code).toBe('SALA-REAL');
    expect(name).toBe('Juli');
    expect(config).toMatchObject({ name: 'Química 9B', grado: 9, asignatura: 'ciencias', maxPlayers: 35 });
  });

  it('does not join an unknown room and shows "room not found"', async () => {
    const joinRoom = vi.spyOn(roomState, 'joinRoom').mockResolvedValue(undefined);
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    await openJoinForm('NOPE42', 'Juli');

    await vi.waitFor(() => expect(alert).toHaveBeenCalledWith(ROOM_NOT_FOUND_MESSAGE));
    expect(joinRoom).not.toHaveBeenCalled();
  });
});
