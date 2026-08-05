import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';

// Define the Svelte $state rune globally before importing roomState
(globalThis as any).$state = (val: any) => val;

import { connectionService } from '../../src/modules/exam-room/services/connection';
import { antiCheatService } from '../../src/modules/exam-room/services/antiCheat';
import { p2p } from '../../src/lib/p2p-edge-mesh';

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
      listarSalones: vi.fn().mockReturnValue([
        {
          codigo: 'SALA-DISC',
          nombre: 'Sala Publica',
          hostPeerId: 'host-peer-1',
          hostNodoId: 'host-node-1',
          maxParticipantes: 50,
          status: 'waiting',
          createdAt: Date.now(),
          region: 'ES',
        }
      ]),
    },
  };
});

// Mock authPersistence
vi.mock('../../src/modules/exam-room/services/authPersistence', () => {
  return {
    getSupabaseMirrorUser: vi.fn().mockResolvedValue({ id: 'supabase-user-id' }),
    isSupabaseMirrorEnabled: vi.fn().mockReturnValue(true),
    maybePersistPartySession: vi.fn().mockResolvedValue(true),
    maybePersistPartyResults: vi.fn().mockResolvedValue(true),
    maybeAnalyzePartyResults: vi.fn().mockResolvedValue({ analysis: 'Análisis generado exitosamente.' }),
  };
});

// Mock questions repository
vi.mock('../../src/lib/questions', () => {
  return {
    defaultQuestionRepository: {
      fetchQuestions: vi.fn().mockResolvedValue([
        {
          id: 'q-1',
          text: '¿Cuánto es 2+2?',
          options: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
          ],
          correctOptionId: 'A',
          grade: 11,
          category: 'matematicas',
          difficulty: 3,
        }
      ]),
    },
    filterValidQuestions: vi.fn().mockReturnValue({
      validQuestions: [
        {
          id: 'q-1',
          text: '¿Cuánto es 2+2?',
          options: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
          ],
          correctOptionId: 'A',
          grade: 11,
          category: 'matematicas',
          difficulty: 3,
        }
      ],
    }),
    prepareStopModeQuestions: vi.fn().mockResolvedValue([
      {
        id: 'q-stop-1',
        text: 'Stop Mode Question',
        options: [
          { id: 'A', text: 'A' },
          { id: 'B', text: 'B' },
        ],
        correctOptionId: 'A',
      }
    ]),
  };
});

// Import roomState dynamically after the global Svelte rune is defined
let roomState: any;

describe('RoomState Lifecycle & Creation', () => {
  beforeAll(async () => {
    const mod = await import('../../src/modules/exam-room/stores/roomState.svelte');
    roomState = mod.roomState;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    roomState.currentPlan = 'free';
  });

  afterEach(() => {
    roomState.leaveRoom();
  });

  it('should enforce limits for FREE plan and allow creating standard rooms', async () => {
    roomState.currentPlan = 'free';
    const roomId = await roomState.createRoom('Host Name', 'My Free Room', 11, 'matematicas', {
      totalQuestions: 1,
    });

    expect(roomId).toBe('ROOM_MOCK_CODE');
    expect(roomState.config?.maxPlayers).toBe(10); // Limit from free plan
    expect(roomState.role).toBe('host');
    expect(roomState.currentPlayer?.name).toBe('Host Name');
    expect(roomState.currentPlayer?.isHost).toBe(true);
    expect(roomState.players).toHaveLength(1);
  });

  it('should enforce exams per week limit on FREE plan', async () => {
    roomState.currentPlan = 'free';
    localStorage.setItem('weekly_exam_count', '10'); // Max limit is 10
    localStorage.setItem('weekly_exam_reset', Date.now().toString());

    await expect(
      roomState.createRoom('Host Name', 'My Room', 11, 'matematicas', { totalQuestions: 1 })
    ).rejects.toThrow('PLAN_LIMIT_REACHED');
  });

  it('should increase maxPlayers limit on PRO and INSTITUTIONAL plans', async () => {
    // PRO Plan
    roomState.currentPlan = 'pro';
    await roomState.createRoom('Host Name', 'Pro Room', 11, 'matematicas', { totalQuestions: 1 });
    expect(roomState.config?.maxPlayers).toBe(100);

    // INSTITUTIONAL Plan
    roomState.leaveRoom();
    roomState.currentPlan = 'institutional';
    await roomState.createRoom('Host Name', 'Inst Room', 11, 'matematicas', { totalQuestions: 1 });
    expect(roomState.config?.maxPlayers).toBe(1000);
  });

  it('should initialize player and register monitors on joinRoom', async () => {
    const configMock = {
      id: 'JOIN-ROOM',
      name: 'Existing Room',
      hostId: 'h1',
      hostName: 'Host B',
      maxPlayers: 10,
      timePerQuestion: 60,
      totalQuestions: 5,
      grado: 11,
      asignatura: 'sociales',
      connectionMode: 'edge-mesh',
      createdAt: new Date(),
    } as any;

    await roomState.joinRoom('JOIN-ROOM', 'Player A', configMock);

    expect(roomState.role).toBe('player');
    expect(roomState.currentPlayer?.name).toBe('Player A');
    expect(roomState.currentPlayer?.isHost).toBe(false);
    expect(antiCheatService.startMonitoring).toHaveBeenCalled();
    expect(connectionService.broadcast).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'player_joined', player_name: 'Player A' })
    );
  });

  it('should handle Stop Mode configuration properly', async () => {
    await roomState.createRoom('Host Name', 'Stop Game', 11, 'ingles', {
      totalQuestions: 5,
      mode: 'stop',
      stopConfig: {
        includeEnglish: true,
        difficulty: 'medium',
      },
    });

    expect(roomState.config?.mode).toBe('stop');
    expect(roomState.questions).toHaveLength(1);
    expect(roomState.questions[0].id).toBe('q-stop-1');
  });

  it('should fetch public rooms correctly via p2p listing', async () => {
    await roomState.fetchPublicRooms('ES');
    expect(p2p.iniciar).toHaveBeenCalledWith('lobby-browser');
    expect(p2p.listarSalones).toHaveBeenCalledWith('ES');
    expect(roomState.publicRooms).toHaveLength(1);
    expect(roomState.publicRooms[0].party_code).toBe('SALA-DISC');
  });
});

describe('RoomState Game Dynamics', () => {
  beforeAll(async () => {
    const mod = await import('../../src/modules/exam-room/stores/roomState.svelte');
    roomState = mod.roomState;
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();
    roomState.currentPlan = 'pro';
    await roomState.createRoom('Host Name', 'Game Room', 11, 'matematicas', {
      totalQuestions: 2,
      timePerQuestion: 30,
    });
  });

  afterEach(() => {
    roomState.leaveRoom();
  });

  it('should broadcast start_game when startGame is called', async () => {
    await roomState.startGame();

    expect(connectionService.broadcast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'start_game',
        room_code: 'ROOM_MOCK_CODE',
        questions: roomState.questions,
      })
    );
  });

  it('should advance questions and finish game on reaching end index', () => {
    roomState.gameState.status = 'active';
    roomState.gameState.currentQuestionIndex = 0;

    // Next question: index 1
    roomState.nextQuestion();
    expect(roomState.gameState.currentQuestionIndex).toBe(1);
    expect(connectionService.broadcast).toHaveBeenCalledWith({
      type: 'next_question',
      questionIndex: 1,
    });

    // Next question: exceeds 2 totalQuestions → should finish game
    const finishSpy = vi.spyOn(roomState, 'finishGame');
    roomState.nextQuestion();
    expect(finishSpy).toHaveBeenCalled();
  });

  it('should record answer, award score, speed-up sudden death timer on submitAnswer', () => {
    // Setup active game
    roomState.gameState.status = 'active';
    roomState.gameState.currentQuestionIndex = 0;
    // Set current question mock
    roomState.questions = [
      { id: 'q-1', correctOptionId: 'A' },
      { id: 'q-2', correctOptionId: 'B' },
    ];

    // Player submits answer
    roomState.submitAnswer('q-1', 'A', 5); // Spent 5s out of 30s

    expect(connectionService.broadcast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'question_answered',
        question_id: 'q-1',
        answer: 'A',
        isCorrect: true,
        score: 1833, // 1000 base + speed bonus (1000 * (25/30) = 833)
        time_ms: 5000,
      })
    );
  });

  it('should request and broadcast AI analysis if plan limits allow', async () => {
    roomState.currentPlan = 'pro';
    await roomState.requestAIAnalysis();

    expect(roomState.aiAnalysis).toBe('Análisis generado exitosamente.');
    expect(connectionService.broadcast).toHaveBeenCalledWith({
      type: 'ai_analysis_ready',
      analysis: 'Análisis generado exitosamente.',
    });
  });

  it('should alert/reject AI analysis request on FREE plan', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    roomState.currentPlan = 'free';

    await roomState.requestAIAnalysis();
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Plan Pro'));
  });

  it('should allow kicking a player if current user is Host', () => {
    roomState.players = [
      { id: 'host-id', name: 'Host Name', isHost: true } as any,
      { id: 'player-id', name: 'Player A', isHost: false } as any,
    ];

    roomState.kickPlayer('player-id');
    expect(connectionService.broadcast).toHaveBeenCalledWith({
      type: 'player_kicked',
      playerId: 'player-id',
    });
    expect(roomState.players).toHaveLength(1);
    expect(roomState.players[0].id).toBe('host-id');
  });

  it('should handle all websocket handleMessage cases properly', () => {
    // 1. player_list_update
    roomState.players = [{ id: 'p1', name: 'Player One' }] as any;
    roomState.handleMessage({
      type: 'player_list_update',
      players: [{ id: 'p1', name: 'Player One Upd' }, { id: 'p2', name: 'Player Two' }]
    } as any);
    expect(roomState.players).toHaveLength(2);
    expect(roomState.players[0].name).toBe('Player One Upd');

    // 2. player_left
    roomState.handleMessage({
      type: 'player_left',
      playerId: 'p2'
    } as any);
    expect(roomState.players).toHaveLength(1);

    // 3. player_kicked (for non-self)
    roomState.players = [{ id: 'p1', name: 'P1' }, { id: 'p2', name: 'P2' }] as any;
    roomState.handleMessage({
      type: 'player_kicked',
      playerId: 'p2'
    } as any);
    expect(roomState.players).toHaveLength(1);

    // 4. game_started
    roomState.handleMessage({
      type: 'game_started',
      startedAt: new Date().toISOString(),
      questions: [{ id: 'q-ws-1' }]
    } as any);
    expect(roomState.gameState.status).toBe('active');
    expect(roomState.questions).toHaveLength(1);

    // 5. game_paused
    roomState.handleMessage({
      type: 'game_paused',
      pausedAt: new Date().toISOString()
    } as any);
    expect(roomState.gameState.status).toBe('paused');

    // 6. game_finished
    roomState.handleMessage({
      type: 'game_finished',
      results: [
        { player_id: 'p1', player_name: 'P1', score: 100, correct_answers: 5, total_questions: 5, average_time_ms: 1000 }
      ]
    } as any);
    expect(roomState.gameState.status).toBe('finished');
    expect(roomState.results?.totalPlayers).toBe(1);

    // 7. ai_analysis_result
    roomState.handleMessage({
      type: 'ai_analysis_result',
      analysis: 'AI Result'
    } as any);
    expect(roomState.aiAnalysis).toBe('AI Result');

    // 8. player_answered
    roomState.answers = [];
    roomState.players = [{ id: 'p1', name: 'P1', score: 0, correctAnswers: 0 }] as any;
    roomState.role = 'host';
    roomState.handleMessage({
      type: 'player_answered',
      player_id: 'p1',
      question_id: 'q-ws-1',
      answer: 'A',
      isCorrect: true,
      score: 500,
      time_ms: 1200
    } as any);
    expect(roomState.answers).toHaveLength(1);
    expect(roomState.players[0].score).toBe(500);

    // 9. suspicious_activity
    roomState.players = [{ id: 'p1', name: 'P1', suspiciousActivity: [], leftScreenCount: 0 }] as any;
    roomState.handleMessage({
      type: 'suspicious_activity',
      playerId: 'p1',
      event: { type: 'window_blur', timestamp: new Date() }
    } as any);
    expect(roomState.players[0].leftScreenCount).toBe(1);

    // 10. sync_state
    roomState.handleMessage({
      type: 'sync_state',
      state: { status: 'waiting', currentQuestionIndex: 1, timeRemaining: 15 }
    } as any);
    expect(roomState.gameState.status).toBe('waiting');
    expect(roomState.gameState.timeRemaining).toBe(15);
  });
});
