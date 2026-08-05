import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { p2p, estadoMesh, estadoSalon, estudiantesConectados } from '../../src/lib/p2p-edge-mesh';
import { get } from 'svelte/store';

// Define standard mock objects to inspect calls in hoisted block or inside mocks
const {
  mockEdgeMeshInstance,
  mockSalonesManagerInstance,
  mockSalonRegistryInstance,
  mockExamenCompartidoInstance
} = vi.hoisted(() => {
  return {
    mockEdgeMeshInstance: {
      iniciar: vi.fn().mockResolvedValue(undefined),
      detener: vi.fn().mockResolvedValue(undefined),
      on: vi.fn(),
      off: vi.fn(),
      yjsAdapter: {},
    },
    mockSalonesManagerInstance: {
      crearSalon: vi.fn().mockResolvedValue({
        id: 'MOCK-SALON-ID',
        obtenerInfo: vi.fn().mockReturnValue({ creador: 'host', participantes: ['host'] }),
      }),
      unirsePorCodigo: vi.fn().mockResolvedValue({
        id: 'JOINED-SALON-ID',
        obtenerInfo: vi.fn().mockReturnValue({ creador: 'host', nombre: 'Test Room', participantes: ['host', 'player'] }),
      }),
      abandonarSalon: vi.fn().mockResolvedValue(undefined),
    },
    mockSalonRegistryInstance: {
      anunciar: vi.fn().mockImplementation((ad) => ad),
      listar: vi.fn().mockReturnValue([{ codigo: 'ROOM-1', nombre: 'Room 1' }]),
      dispose: vi.fn(),
    },
    mockExamenCompartidoInstance: {
      addEventListener: vi.fn(),
      cargarPreguntas: vi.fn().mockResolvedValue(undefined),
      agregarPregunta: vi.fn().mockResolvedValue(undefined),
      enviarRespuesta: vi.fn().mockResolvedValue(undefined),
      iniciarExamen: vi.fn().mockResolvedValue(undefined),
      finalizarExamen: vi.fn().mockResolvedValue(undefined),
      obtenerPreguntas: vi.fn().mockReturnValue([
        { id: 'q-1', enunciado: 'P1', options: ['A'], respuestaCorrecta: 'A', puntaje: 10 }
      ]),
      obtenerRespuestas: vi.fn().mockReturnValue(new Map([['p1', 'A']])),
      obtenerRespuestasDeEstudiante: vi.fn().mockReturnValue(new Map([['q-1', 'A']])),
      obtenerEstado: vi.fn().mockReturnValue({ current: 'active' }),
    }
  };
});

vi.mock('edge-mesh', () => {
  class MockEdgeMesh {
    iniciar = mockEdgeMeshInstance.iniciar;
    detener = mockEdgeMeshInstance.detener;
    on = mockEdgeMeshInstance.on;
    off = mockEdgeMeshInstance.off;
    yjsAdapter = mockEdgeMeshInstance.yjsAdapter;
  }

  class MockSalonesManager {
    crearSalon = mockSalonesManagerInstance.crearSalon;
    unirsePorCodigo = mockSalonesManagerInstance.unirsePorCodigo;
    abandonarSalon = mockSalonesManagerInstance.abandonarSalon;
    usarRegistry = vi.fn();
  }

  class MockSalonRegistry {
    anunciar = mockSalonRegistryInstance.anunciar;
    listar = mockSalonRegistryInstance.listar;
    dispose = mockSalonRegistryInstance.dispose;
  }

  class MockExamenCompartido {
    addEventListener = mockExamenCompartidoInstance.addEventListener;
    cargarPreguntas = mockExamenCompartidoInstance.cargarPreguntas;
    agregarPregunta = mockExamenCompartidoInstance.agregarPregunta;
    enviarRespuesta = mockExamenCompartidoInstance.enviarRespuesta;
    iniciarExamen = mockExamenCompartidoInstance.iniciarExamen;
    finalizarExamen = mockExamenCompartidoInstance.finalizarExamen;
    obtenerPreguntas = mockExamenCompartidoInstance.obtenerPreguntas;
    obtenerRespuestas = mockExamenCompartidoInstance.obtenerRespuestas;
    obtenerRespuestasDeEstudiante = mockExamenCompartidoInstance.obtenerRespuestasDeEstudiante;
    obtenerEstado = mockExamenCompartidoInstance.obtenerEstado;
  }

  return {
    EdgeMesh: MockEdgeMesh,
    SalonesManager: MockSalonesManager,
    SalonRegistry: MockSalonRegistry,
    ExamenCompartido: MockExamenCompartido,
    TIPO_SALON: {
      EXAMEN: 'EXAMEN',
    },
    TIPO_PREGUNTA: {
      OPCION_MULTIPLE: 'opcion_multiple',
      VERDADERO_FALSO: 'verdadero_falso',
      RESPUESTA_CORTA: 'respuesta_corta',
      ENSAYO: 'ensayo',
    },
  };
});

describe('P2PEdgeMesh Lifecycle and Setup', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await p2p.cerrar();
  });

  afterEach(async () => {
    await p2p.cerrar();
  });

  it('should initialize correctly and transition estadoMesh store to conectado', async () => {
    // Initial state before starting
    expect(get(estadoMesh).conexion).toBe('desconectado');

    // Start mesh
    const nodoId = await p2p.iniciar('Lucas');

    expect(nodoId).toContain('we-');
    expect(get(estadoMesh).conexion).toBe('conectado');
    expect(get(estadoMesh).miNodoId).toBe(nodoId);
    expect(mockEdgeMeshInstance.iniciar).toHaveBeenCalled();
  });

  it('should skip double mesh initialization if already running', async () => {
    const firstNodoId = await p2p.iniciar('Lucas');
    const secondNodoId = await p2p.iniciar('Lucas');

    expect(firstNodoId).toBe(secondNodoId);
    expect(mockEdgeMeshInstance.iniciar).toHaveBeenCalledTimes(1);
  });

  it('should reset stores and dispose elements when cerrar is called', async () => {
    await p2p.iniciar('Lucas');
    await p2p.cerrar();

    expect(get(estadoMesh).conexion).toBe('desconectado');
    expect(get(estadoMesh).miNodoId).toBeNull();
    expect(mockEdgeMeshInstance.detener).toHaveBeenCalled();
    expect(mockSalonRegistryInstance.dispose).toHaveBeenCalled();
  });
});

describe('P2PEdgeMesh Rooms and Exams Sync', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await p2p.iniciar('Profesor');
  });

  afterEach(async () => {
    await p2p.cerrar();
  });

  it('should create a new salon and update estadoSalon correctly', async () => {
    const roomCode = await p2p.crearSalonExamen('Examen Matematicas', 40, { region: 'ES' });

    expect(roomCode).toBe('MOCK-SALON-ID');
    expect(mockSalonesManagerInstance.crearSalon).toHaveBeenCalledWith(
      'Examen Matematicas',
      'EXAMEN',
      40,
      { region: 'ES' }
    );

    const activeSalon = get(estadoSalon);
    expect(activeSalon).not.toBeNull();
    expect(activeSalon?.id).toBe('MOCK-SALON-ID');
    expect(activeSalon?.nombre).toBe('Examen Matematicas');
    expect(activeSalon?.estado).toBe('esperando');
  });

  it('should join an existing salon and update state', async () => {
    await p2p.unirseSalonExamen('SALA-123');

    expect(mockSalonesManagerInstance.unirsePorCodigo).toHaveBeenCalledWith('SALA-123');
    const activeSalon = get(estadoSalon);
    expect(activeSalon?.id).toBe('SALA-123');
    expect(activeSalon?.nombre).toBe('Test Room');
  });

  it('should leave current salon and set store to null', async () => {
    await p2p.unirseSalonExamen('SALA-123');
    await p2p.salirSalonExamen();

    expect(mockSalonesManagerInstance.abandonarSalon).toHaveBeenCalledWith('JOINED-SALON-ID');
    expect(get(estadoSalon)).toBeNull();
  });

  it('should list and announce salons correctly', () => {
    const list = p2p.listarSalones('ES');
    expect(mockSalonRegistryInstance.listar).toHaveBeenCalledWith('ES');
    expect(list).toHaveLength(1);
    expect(list[0].codigo).toBe('ROOM-1');

    p2p.anunciarSalon({ id: 'MY-SALON', nombre: 'My Salon' } as any);
    expect(mockSalonRegistryInstance.anunciar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'MY-SALON', nombre: 'My Salon' })
    );
  });

  it('should call examenCompartido actions correctly', async () => {
    await p2p.crearSalonExamen('Math', 10);

    // standard questions charging
    const questions = [
      { id: 'q-1', tipo: 'opcion_multiple' as const, enunciado: 'P1', puntaje: 10 }
    ];
    await p2p.cargarPreguntas(questions);
    expect(mockExamenCompartidoInstance.cargarPreguntas).toHaveBeenCalled();

    // add question
    await p2p.agregarPregunta({ id: 'q-2', tipo: 'verdadero_falso' as const, enunciado: 'P2', puntaje: 5 });
    expect(mockExamenCompartidoInstance.agregarPregunta).toHaveBeenCalled();

    // send answer
    await p2p.enviarRespuesta('q-1', 'A');
    expect(mockExamenCompartidoInstance.enviarRespuesta).toHaveBeenCalled();

    // start & finish
    await p2p.iniciarExamen();
    expect(mockExamenCompartidoInstance.iniciarExamen).toHaveBeenCalled();

    await p2p.finalizarExamen();
    expect(mockExamenCompartidoInstance.finalizarExamen).toHaveBeenCalled();

    // getters
    const qs = await p2p.obtenerPreguntas();
    expect(qs).toHaveLength(1);
    expect(qs[0].id).toBe('q-1');

    const responses = await p2p.obtenerRespuestas();
    expect(responses.get('p1')).toBe('A');

    const studentResp = await p2p.obtenerRespuestasDeEstudiante('p1');
    expect(studentResp.get('q-1')).toBe('A');

    const state = await p2p.obtenerEstadoExamen();
    expect(state.current).toBe('active');
  });
});
