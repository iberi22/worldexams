import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { connectionService } from '../../src/modules/exam-room/services/connection';
import { p2p } from '../../src/lib/p2p-edge-mesh';
import { supabase } from '../../src/lib/supabase';
import { rustBackend } from '../../src/lib/rust-backend';
import { isSupabaseMirrorEnabled } from '../../src/modules/exam-room/services/authPersistence';

// Mock authPersistence
vi.mock('../../src/modules/exam-room/services/authPersistence', () => {
  return {
    isSupabaseMirrorEnabled: vi.fn().mockReturnValue(true),
  };
});

// Mock rust-backend
vi.mock('../../src/lib/rust-backend', () => {
  return {
    detectBackendMode: vi.fn().mockResolvedValue('local'),
    rustBackend: {
      connectToParty: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn(),
      send: vi.fn(),
      onMessage: vi.fn(),
    },
  };
});

// Mock supabase client
const mockChannel = {
  on: vi.fn().mockReturnThis(),
  send: vi.fn(),
  subscribe: vi.fn((cb) => {
    cb('SUBSCRIBED');
  }),
  unsubscribe: vi.fn(),
  state: 'joined',
  presenceState: vi.fn().mockReturnValue({ 'user-1': {} }),
};

vi.mock('../../src/lib/supabase', () => {
  return {
    supabase: {
      channel: vi.fn().mockImplementation(() => mockChannel),
    },
  };
});

// Mock p2p-edge-mesh
const mockEstadoMesh = {
  conexion: 'conectado',
};

vi.mock('../../src/lib/p2p-edge-mesh', () => {
  return {
    p2p: {
      iniciar: vi.fn().mockResolvedValue('test-nodo-id'),
      crearSalonExamen: vi.fn().mockResolvedValue('CREATION-ROOM-CODE'),
      unirseSalonExamen: vi.fn().mockResolvedValue(undefined),
      salirSalonExamen: vi.fn().mockResolvedValue(undefined),
      cerrar: vi.fn().mockResolvedValue(undefined),
      obtenerCodigoSalon: vi.fn().mockReturnValue('SALA-P2P'),
    },
    estadoMesh: {
      subscribe: vi.fn((run) => {
        run({ conexion: 'conectado' });
        return () => {};
      }),
    },
    estadoSalon: {
      subscribe: vi.fn((run) => {
        run({ id: 'active-id' });
        return () => {};
      }),
    },
  };
});

describe('ConnectionService Mode Connections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await connectionService.disconnect();
  });

  it('should auto-connect default to edge-mesh and call p2p.iniciar', async () => {
    await connectionService.autoConnect({
      id: 'ROOM1',
      name: 'Test Room',
      hostId: 'h1',
      nombreUsuario: 'Host A',
      maxPlayers: 10,
      timePerQuestion: 60,
      totalQuestions: 10,
      grado: 11,
      asignatura: 'sociales',
      region: 'LATAM',
      connectionMode: 'edge-mesh',
      createdAt: new Date(),
    });

    expect(connectionService.getMode()).toBe('edge-mesh');
    expect(p2p.iniciar).toHaveBeenCalledWith('Host A');
    expect(p2p.unirseSalonExamen).toHaveBeenCalledWith('ROOM1');
  });

  it('should trigger room creation when mode is edge-mesh and intent is create', async () => {
    await connectionService.connect({
      id: 'create',
      name: 'Asignatura Room',
      hostId: 'h1',
      nombreUsuario: 'Host B',
      maxPlayers: 10,
      timePerQuestion: 60,
      totalQuestions: 10,
      grado: 11,
      asignatura: 'sociales',
      region: 'LATAM',
      connectionMode: 'edge-mesh',
      meshIntent: 'create',
      createdAt: new Date(),
    });

    expect(p2p.crearSalonExamen).toHaveBeenCalledWith(
      'Asignatura Room',
      10,
      expect.objectContaining({ subject: 'sociales', grade: 11 })
    );
  });

  it('should connect via Supabase mode when specified and enabled', async () => {
    vi.mocked(isSupabaseMirrorEnabled).mockReturnValue(true);

    await connectionService.connect({
      id: 'SALA-SUPA',
      nombreUsuario: 'Host C',
      connectionMode: 'supabase',
      grado: 11,
      asignatura: 'lectura-critica',
      createdAt: new Date(),
    } as any);

    expect(connectionService.getMode()).toBe('supabase');
    expect(supabase.channel).toHaveBeenCalledWith('party:SALA-SUPA', expect.any(Object));
    expect(mockChannel.subscribe).toHaveBeenCalled();
  });

  it('should throw error connecting via Supabase mode when disabled', async () => {
    vi.mocked(isSupabaseMirrorEnabled).mockReturnValue(false);

    await expect(
      connectionService.connect({
        id: 'SALA-SUPA',
        connectionMode: 'supabase',
      } as any)
    ).rejects.toThrow('El modo Supabase para salones está desactivado');
  });

  it('should connect via local mode using Rust Backend', async () => {
    await connectionService.connect({
      id: 'SALA-RUST',
      connectionMode: 'local',
    } as any);

    expect(connectionService.getMode()).toBe('local');
    expect(rustBackend.connectToParty).toHaveBeenCalledWith('SALA-RUST');
  });
});

describe('ConnectionService Communication and Status', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await connectionService.disconnect();
  });

  it('should handle broadcast properly depending on active mode', async () => {
    const dummyMsg = { type: 'chat_message', sender: 'Lucas', text: 'Hola' } as any;

    // 1. Supabase Mode Broadcast
    vi.mocked(isSupabaseMirrorEnabled).mockReturnValue(true);
    await connectionService.connect({
      id: 'SALA-BROAD',
      connectionMode: 'supabase',
    } as any);

    connectionService.broadcast(dummyMsg);
    expect(mockChannel.send).toHaveBeenCalledWith({
      type: 'broadcast',
      event: 'party_message',
      payload: dummyMsg,
    });

    // 2. Local Mode Broadcast
    await connectionService.connect({
      id: 'SALA-BROAD-LOCAL',
      connectionMode: 'local',
    } as any);

    connectionService.broadcast(dummyMsg);
    expect(rustBackend.send).toHaveBeenCalledWith(dummyMsg);
  });

  it('should return correct connection status based on mode', async () => {
    // 1. edge-mesh mode state lookup (uses store subscription we mocked to 'conectado')
    await connectionService.connect({
      id: 'SALA-STATUS-MESH',
      connectionMode: 'edge-mesh',
    } as any);
    expect(connectionService.getConnectionStatus()).toBe('connected');

    // 2. supabase mode state lookup (uses channel.state)
    mockChannel.state = 'joined';
    await connectionService.connect({
      id: 'SALA-STATUS-SUPA',
      connectionMode: 'supabase',
    } as any);
    expect(connectionService.getConnectionStatus()).toBe('connected');
  });

  it('should clear message handlers and trigger disconnect cleanup', async () => {
    await connectionService.connect({
      id: 'SALA-DISCONNECT',
      connectionMode: 'edge-mesh',
    } as any);

    await connectionService.disconnect();
    expect(p2p.salirSalonExamen).toHaveBeenCalled();
    expect(p2p.cerrar).toHaveBeenCalled();
  });

  it('should return correct room code from getCodigoSala', async () => {
    await connectionService.connect({
      id: 'INITIAL-CODE',
      connectionMode: 'edge-mesh',
    } as any);

    // Should return value from p2p.obtenerCodigoSalon first
    expect(connectionService.getCodigoSala()).toBe('SALA-P2P');

    // If p2p returns null, fallback to the one set in connect
    vi.spyOn(p2p, 'obtenerCodigoSalon').mockReturnValue(null);
    expect(connectionService.getCodigoSala()).toBe('INITIAL-CODE');
  });
});
