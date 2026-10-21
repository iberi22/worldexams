import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PartyHostSession, HOST_STORAGE_KEY } from '../../src/modules/exam-room/party/hostSession';
import { PartyPlayerSession, PLAYER_STORAGE_KEY } from '../../src/modules/exam-room/party/playerSession';
import { createLoopbackNetwork, CompositePartyTransport, type PartyTransport } from '../../src/modules/exam-room/party/transport';
import {
  PARTY_ERROR_MESSAGES,
  PartyError,
  buildScoreboard,
  generateRoomCode,
  isValidRoomCode,
  normalizeRoomCode,
  scoreAnswer,
  type PartyRoomConfig,
} from '../../src/modules/exam-room/party/protocol';
import type { AppQuestion } from '../../src/lib/api-service';

function makeQuestions(n: number): AppQuestion[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `q-${i + 1}`,
    text: `¿Cuánto es ${i} + 1?`,
    options: [
      { id: 'A', text: String(i + 1), feedback: 'Correcto. Sumar uno al número.' },
      { id: 'B', text: String(i + 2), feedback: 'Incorrecto.' },
      { id: 'C', text: String(i), feedback: 'Incorrecto.' },
      { id: 'D', text: String(i + 3), feedback: 'Incorrecto.' },
    ],
    correctOptionId: 'A',
    explanation: 'Se suma una unidad.',
    category: 'matematicas',
    grade: 7,
    difficulty: 3,
  }));
}

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
    data,
  };
}

const SETUP = {
  hostName: 'Profe Ana',
  countryCode: 'mx',
  grado: 7,
  asignatura: 'matematicas',
  asignaturaLabel: 'Matemáticas',
  totalQuestions: 3,
  secondsPerQuestion: 15,
  maxPlayers: 30,
};

describe('Party Mode protocol helpers', () => {
  it('generates dictation-friendly 6 char codes and normalizes input', () => {
    const code = generateRoomCode();
    expect(isValidRoomCode(code)).toBe(true);
    expect(code).not.toMatch(/[01OIL]/);
    expect(normalizeRoomCode(' k7p-x2m ')).toBe('K7PX2M');
  });

  it('scores correct answers with a speed bonus and ranks ties together', () => {
    expect(scoreAnswer(false, 0, 10_000)).toBe(0);
    expect(scoreAnswer(true, 0, 10_000)).toBe(1500);
    expect(scoreAnswer(true, 10_000, 10_000)).toBe(1000);
    const board = buildScoreboard([
      { id: 'a', nickname: 'Ana', online: true, score: 1200, correct: 1 },
      { id: 'b', nickname: 'Beto', online: true, score: 1200, correct: 1 },
      { id: 'c', nickname: 'Caro', online: true, score: 0, correct: 0 },
    ]);
    expect(board.map((e) => e.rank)).toEqual([1, 1, 3]);
  });
});

describe('Party Mode host ⇄ player sessions (loopback transport)', () => {
  let net: ReturnType<typeof createLoopbackNetwork>;
  let hostStorage: ReturnType<typeof memoryStorage>;
  let host: PartyHostSession;
  let config: PartyRoomConfig;

  beforeEach(async () => {
    vi.useFakeTimers();
    net = createLoopbackNetwork();
    hostStorage = memoryStorage();
    host = new PartyHostSession({ transport: net.createTransport(), storage: hostStorage, revealMs: 1000 });
    config = await host.open(SETUP, makeQuestions(5));
  });

  afterEach(() => {
    host.dispose();
    vi.useRealTimers();
  });

  function newPlayer(storage = memoryStorage()) {
    return new PartyPlayerSession({ transport: net.createTransport(), storage, joinTimeoutMs: 3000 });
  }

  it('propagates the host room config to the player (no local/mock config)', async () => {
    const player = newPlayer();
    expect(player.getState().config).toBeNull();

    const received = await player.join(config.code.toLowerCase(), 'Juli');

    expect(received).toEqual(config);
    expect(player.getState().config).toEqual(config);
    expect(received).toMatchObject({
      hostName: 'Profe Ana',
      countryCode: 'MX',
      grado: 7,
      asignatura: 'matematicas',
      totalQuestions: 3,
      secondsPerQuestion: 15,
    });
    expect(received.code).toBe(config.code);
    // The join request travels without any config: only id + nickname.
    const joinRequest = net.delivered.find((e) => e.msg.type === 'join_request')!;
    expect(Object.keys(joinRequest.msg).sort()).toEqual(['nickname', 'playerId', 'type']);
    expect(host.getState().players.map((p) => p.nickname)).toEqual(['Juli']);
    player.dispose();
  });

  it('fails with "room not found" when no host answers, and never fabricates a config', async () => {
    const player = newPlayer();
    const joining = player.join('ZZZZZZ', 'Juli').catch((e) => e);
    await vi.advanceTimersByTimeAsync(3100);
    const err = await joining;
    expect(err).toBeInstanceOf(PartyError);
    expect(err.code).toBe('room_not_found');
    expect(player.getState().config).toBeNull();
    expect(player.getState().error?.message).toBe(PARTY_ERROR_MESSAGES.room_not_found);
    expect(player.getState().error?.message).toMatch(/Wi-Fi/);
  });

  it('reports transport unavailable with a same Wi-Fi hint', async () => {
    const broken: PartyTransport = new CompositePartyTransport([]);
    const player = new PartyPlayerSession({ transport: broken });
    const err = await player.join(config.code, 'Juli').catch((e) => e);
    expect(err.code).toBe('transport_unavailable');
    expect(player.getState().error?.message).toMatch(/misma red Wi-Fi/);
  });

  it('rejects a duplicated nickname', async () => {
    const a = newPlayer();
    await a.join(config.code, 'Juli');
    const b = newPlayer();
    const err = await b.join(config.code, 'juli').catch((e) => e);
    expect(err.code).toBe('nickname_taken');
    a.dispose();
  });

  it('runs a synced game: questions without answers, live scoreboard and final podium', async () => {
    const a = newPlayer();
    const b = newPlayer();
    await a.join(config.code, 'Ana');
    await b.join(config.code, 'Beto');
    expect(host.getState().players).toHaveLength(2);

    host.start();
    expect(a.getState().phase).toBe('question');
    expect(b.getState().question?.index).toBe(0);
    expect(b.getState().question?.total).toBe(3);
    // Players never receive the correct answer before the reveal.
    const questionMsg = net.delivered.find((e) => e.msg.type === 'question')!;
    expect(JSON.stringify(questionMsg)).not.toMatch(/correctOptionId|feedback/);

    await vi.advanceTimersByTimeAsync(1000);
    a.answer('A');
    b.answer('B');
    // Everyone answered → host closes the question early.
    expect(host.getState().phase).toBe('reveal');
    expect(a.getState().phase).toBe('reveal');
    expect(a.getState().lastResult).toEqual({ correct: true, gained: expect.any(Number) });
    expect(a.getState().lastResult!.gained).toBeGreaterThan(1000);
    expect(b.getState().lastResult?.correct).toBe(false);
    expect(b.getState().scoreboard[0].nickname).toBe('Ana');

    // Reveal auto-advances; second question times out without answers.
    await vi.advanceTimersByTimeAsync(1000);
    expect(a.getState().question?.index).toBe(1);
    await vi.advanceTimersByTimeAsync(15_000);
    expect(host.getState().phase).toBe('reveal');
    expect(b.getState().lastResult?.correct).toBe(false);
    await vi.advanceTimersByTimeAsync(1000);

    // Third (last) question → finish.
    expect(b.getState().question?.index).toBe(2);
    a.answer('C');
    b.answer('A');
    await vi.advanceTimersByTimeAsync(1000);
    expect(host.getState().phase).toBe('finished');
    expect(a.getState().phase).toBe('finished');
    const podium = b.getState().scoreboard;
    expect(podium).toHaveLength(2);
    expect(podium[0].rank).toBe(1);
    expect(podium.every((e) => e.correct === 1)).toBe(true);
    a.dispose();
    b.dispose();
  });

  it('reconnects a refreshed player with the same id, keeping score and current question', async () => {
    const storage = memoryStorage();
    const first = newPlayer(storage);
    await first.join(config.code, 'Ana');
    host.start();
    first.answer('A');
    expect(host.getState().phase).toBe('reveal');
    await vi.advanceTimersByTimeAsync(1000);
    const scoreBefore = host.getState().players[0].score;

    // Page refresh: the old session disappears without saying goodbye.
    first.dispose();
    const saved = PartyPlayerSession.loadSaved(storage);
    expect(saved).toMatchObject({ room: config.code, nickname: 'Ana' });
    expect(storage.data.has(PLAYER_STORAGE_KEY)).toBe(true);

    const again = newPlayer(storage);
    await again.join(saved!.room, saved!.nickname, saved!.playerId);
    expect(host.getState().players).toHaveLength(1);
    expect(again.getState().me?.score ?? again.getState().scoreboard[0].score).toBe(scoreBefore);
    expect(again.getState().phase).toBe('question');
    expect(again.getState().question?.index).toBe(1);
    again.dispose();
  });

  it('tells players when the host leaves (closed room or lost heartbeat)', async () => {
    const a = newPlayer();
    await a.join(config.code, 'Ana');
    host.close();
    expect(a.getState().status).toBe('error');
    expect(a.getState().error?.code).toBe('host_left');

    const host2 = new PartyHostSession({ transport: net.createTransport() });
    const config2 = await host2.open(SETUP, makeQuestions(3));
    const b = newPlayer();
    await b.join(config2.code, 'Beto');
    host2.dispose(); // host tab crashed: no room_closed, heartbeats stop
    await vi.advanceTimersByTimeAsync(12_000);
    expect(b.getState().error?.code).toBe('host_left');
    expect(b.getState().error?.message).toBe(PARTY_ERROR_MESSAGES.host_left);
    b.dispose();
  });

  it('lets the host resume a saved room after a refresh and players resync', async () => {
    const a = newPlayer();
    await a.join(config.code, 'Ana');
    host.start();
    const saved = PartyHostSession.loadSaved(hostStorage);
    expect(saved?.config).toEqual(config);
    expect(hostStorage.data.has(HOST_STORAGE_KEY)).toBe(true);

    host.dispose();
    await vi.advanceTimersByTimeAsync(12_000);
    expect(a.getState().error?.code).toBe('host_left');

    host = new PartyHostSession({ transport: net.createTransport(), storage: hostStorage, revealMs: 1000 });
    await host.resume(saved!);
    await vi.advanceTimersByTimeAsync(10);
    expect(a.getState().status).toBe('joined');
    expect(a.getState().phase).toBe('question');
    expect(host.getState().players.find((p) => p.nickname === 'Ana')?.online).toBe(true);
    a.dispose();
  });
});
