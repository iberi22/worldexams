import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';

// Define the Svelte $state rune globally before importing roomState
(globalThis as any).$state = (val: any) => val;

import { defaultQuestionRepository, filterValidQuestions, prepareStopModeQuestions } from '../../src/lib/questions';

// Mock connectionService
vi.mock('../../src/modules/exam-room/services/connection', () => {
  return {
    connectionService: {
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      broadcast: vi.fn(),
      onMessage: vi.fn(),
      getCodigoSala: vi.fn().mockReturnValue('ROOM_MOCK_CODE'),
    },
  };
});

// Mock antiCheatService
vi.mock('../../src/modules/exam-room/services/antiCheat', () => {
  return {
    antiCheatService: {
      startMonitoring: vi.fn(),
      stopMonitoring: vi.fn(),
    },
  };
});

// Mock p2p-edge-mesh
vi.mock('../../src/lib/p2p-edge-mesh', () => {
  return {
    p2p: {
      iniciar: vi.fn().mockResolvedValue('lobby-browser'),
      listarSalones: vi.fn().mockReturnValue([]),
    },
  };
});

// Mock authPersistence
vi.mock('../../src/modules/exam-room/services/authPersistence', () => {
  return {
    getSupabaseMirrorUser: vi.fn().mockResolvedValue(null),
    isSupabaseMirrorEnabled: vi.fn().mockReturnValue(false),
    maybePersistPartySession: vi.fn().mockResolvedValue(false),
    maybePersistPartyResults: vi.fn().mockResolvedValue(false),
    maybeAnalyzePartyResults: vi.fn().mockResolvedValue(null),
  };
});

// Mock questions module
vi.mock('../../src/lib/questions', () => {
  return {
    defaultQuestionRepository: {
      fetchQuestions: vi.fn(),
    },
    filterValidQuestions: vi.fn(),
    prepareStopModeQuestions: vi.fn(),
  };
});

let roomState: any;

describe('ExamRoom Empty Pool & No Fallback Questions (WAVE-15.01)', () => {
  beforeAll(async () => {
    const mod = await import('../../src/modules/exam-room/stores/roomState.svelte');
    roomState = mod.roomState;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    roomState.currentPlan = 'pro';
  });

  afterEach(() => {
    roomState.leaveRoom();
  });

  it('(a) should set poolStatus === empty and questions.length === 0 when source returns empty/404', async () => {
    vi.mocked(defaultQuestionRepository.fetchQuestions).mockResolvedValue([]);
    vi.mocked(filterValidQuestions).mockReturnValue({ validQuestions: [] });

    await roomState.createRoom('Host Test', 'Room Empty Pool', 3, 'matematicas', {
      totalQuestions: 10,
    });

    expect(roomState.poolStatus).toBe('empty');
    expect(roomState.questions).toHaveLength(0);
    expect(roomState.poolEmptyReason).toBeTruthy();
    expect(typeof roomState.poolEmptyReason).toBe('string');
  });

  it('(b) should set poolStatus === ready and questions.length === 1 when source returns 1 question', async () => {
    const singleQuestion = {
      id: 'real-q-101',
      text: '¿Cuál es la capital de Colombia?',
      options: [
        { id: 'A', text: 'Bogotá' },
        { id: 'B', text: 'Medellín' },
        { id: 'C', text: 'Cali' },
        { id: 'D', text: 'Barranquilla' },
      ],
      correctOptionId: 'A',
      grade: 5,
      category: 'sociales_y_ciudadanas',
      difficulty: 2,
    };

    vi.mocked(defaultQuestionRepository.fetchQuestions).mockResolvedValue([singleQuestion]);
    vi.mocked(filterValidQuestions).mockReturnValue({ validQuestions: [singleQuestion] });

    await roomState.createRoom('Host Test', 'Room Ready Pool', 5, 'sociales_y_ciudadanas', {
      totalQuestions: 1,
    });

    expect(roomState.poolStatus).toBe('ready');
    expect(roomState.questions).toHaveLength(1);
    expect(roomState.questions[0].id).toBe('real-q-101');
    expect(roomState.poolEmptyReason).toBeNull();
  });

  it('(c) should never generate question IDs starting with q-fallback- or text with (Respaldo)', async () => {
    // 1. Test standard mode fetch failure
    vi.mocked(defaultQuestionRepository.fetchQuestions).mockRejectedValue(new Error('HTTP 404: QUESTIONS_NOT_FOUND'));
    vi.mocked(filterValidQuestions).mockReturnValue({ validQuestions: [] });

    await roomState.createRoom('Host Test', 'Standard Mode 404', 9, 'lectura_critica', {
      totalQuestions: 20,
    });

    expect(roomState.poolStatus).toBe('empty');
    expect(roomState.questions).toHaveLength(0);

    const fallbackIdsStandard = roomState.questions.filter((q: any) => q.id && String(q.id).startsWith('q-fallback-'));
    const respaldoTextStandard = roomState.questions.filter((q: any) => q.text && String(q.text).includes('(Respaldo)'));

    expect(fallbackIdsStandard).toHaveLength(0);
    expect(respaldoTextStandard).toHaveLength(0);

    roomState.leaveRoom();

    // 2. Test Stop Mode fetch failure
    vi.mocked(prepareStopModeQuestions).mockRejectedValue(new Error('Stop Mode Pool Empty'));

    await roomState.createRoom('Host Test', 'Stop Mode Failure', 11, 'ingles', {
      totalQuestions: 10,
      mode: 'stop',
      stopConfig: { includeEnglish: true, difficulty: 'easy' },
    });

    expect(roomState.poolStatus).toBe('empty');
    expect(roomState.questions).toHaveLength(0);

    const fallbackIdsStop = roomState.questions.filter((q: any) => q.id && String(q.id).startsWith('q-fallback-'));
    const respaldoTextStop = roomState.questions.filter((q: any) => q.text && String(q.text).includes('(Respaldo)'));

    expect(fallbackIdsStop).toHaveLength(0);
    expect(respaldoTextStop).toHaveLength(0);
  });
});
