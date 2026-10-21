import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * PeerJS transport for /party with `peerjs` mocked by an in-memory signaling
 * server: peers register ids, `connect()` pairs two data connections, and
 * `destroy()` frees the id and closes its connections.
 */

type Handler = (...args: any[]) => void;

class Emitter {
  private handlers = new Map<string, Set<Handler>>();
  on(event: string, handler: Handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return this;
  }
  off(event: string, handler: Handler) {
    this.handlers.get(event)?.delete(handler);
    return this;
  }
  emit(event: string, ...args: unknown[]) {
    for (const h of [...(this.handlers.get(event) ?? [])]) h(...args);
  }
}

const signaling = {
  peers: new Map<string, FakePeer>(),
  online: true,
  created: [] as Array<{ id: string; requested?: string }>,
  reset() {
    this.peers.clear();
    this.online = true;
    this.created = [];
  },
};

let randomIds = 0;

class FakeConn extends Emitter {
  open = false;
  remote: FakeConn | null = null;
  sent: unknown[] = [];
  send(data: unknown) {
    if (!this.open) return;
    this.sent.push(data);
    const remote = this.remote;
    const copy = JSON.parse(JSON.stringify(data));
    setTimeout(() => remote?.open && remote.emit('data', copy), 0);
  }
  close() {
    if (!this.open) return;
    this.open = false;
    const remote = this.remote;
    this.remote = null;
    this.emit('close');
    remote?.close();
  }
}

class FakePeer extends Emitter {
  id: string;
  destroyed = false;
  disconnected = false;
  conns = new Set<FakeConn>();

  constructor(idOrOptions?: unknown) {
    super();
    const requested = typeof idOrOptions === 'string' ? idOrOptions : undefined;
    this.id = requested ?? `random-${++randomIds}`;
    signaling.created.push({ id: this.id, requested });
    setTimeout(() => {
      if (this.destroyed) return;
      if (!signaling.online) return this.emit('error', Object.assign(new Error('network'), { type: 'network' }));
      if (signaling.peers.has(this.id)) {
        return this.emit('error', Object.assign(new Error('taken'), { type: 'unavailable-id' }));
      }
      signaling.peers.set(this.id, this);
      this.emit('open', this.id);
    }, 0);
  }

  connect(target: string) {
    const local = new FakeConn();
    this.conns.add(local);
    setTimeout(() => {
      const host = signaling.peers.get(target);
      if (!host || host.destroyed) {
        this.emit('error', Object.assign(new Error(`Could not connect to peer ${target}`), { type: 'peer-unavailable' }));
        return;
      }
      const remote = new FakeConn();
      host.conns.add(remote);
      local.remote = remote;
      remote.remote = local;
      host.emit('connection', remote);
      local.open = true;
      remote.open = true;
      remote.emit('open');
      local.emit('open');
    }, 0);
    return local;
  }

  reconnect() {}

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    if (signaling.peers.get(this.id) === this) signaling.peers.delete(this.id);
    for (const c of this.conns) c.close();
  }
}

vi.mock('peerjs', () => ({ Peer: FakePeer, default: FakePeer }));

import {
  PeerJsPartyTransport,
  CompositePartyTransport,
  BroadcastChannelPartyTransport,
  createDefaultPartyTransport,
  hostPeerId,
  supportsOtherDevices,
  type PartyTransport,
} from '../../src/modules/exam-room/party/transport';
import { PartyHostSession } from '../../src/modules/exam-room/party/hostSession';
import { PartyPlayerSession } from '../../src/modules/exam-room/party/playerSession';
import type { AppQuestion } from '../../src/lib/api-service';

const fakeLoader = async () => (id?: string) => new FakePeer(id) as never;

function peerTransport(role: 'host' | 'player', extra: Partial<ConstructorParameters<typeof PeerJsPartyTransport>[0]> = {}) {
  return new PeerJsPartyTransport({ role, loadPeer: fakeLoader, retryMs: 20, connectTimeoutMs: 500, ...extra });
}

function questions(n: number): AppQuestion[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `q${i}`,
    text: `Pregunta ${i}`,
    options: ['A', 'B', 'C', 'D'].map((id) => ({ id, text: `${id}${i}` })),
    correctOptionId: 'A',
    category: 'matematicas',
    grade: 7,
    difficulty: 3,
  }));
}

const SETUP = {
  code: 'K7PX2M',
  hostName: 'Profe Ana',
  countryCode: 'CO',
  grado: 7,
  asignatura: 'matematicas',
  asignaturaLabel: 'Matemáticas',
  totalQuestions: 3,
  secondsPerQuestion: 20,
  maxPlayers: 30,
};

const cleanups: Array<() => void> = [];

beforeEach(() => signaling.reset());
afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe('PeerJsPartyTransport', () => {
  it('host registers wx-party-v1-<CODE>; players get the real config through it', async () => {
    const host = new PartyHostSession({ transport: peerTransport('host') });
    cleanups.push(() => host.dispose());
    const config = await host.open(SETUP, questions(3));
    expect(signaling.peers.has(hostPeerId('K7PX2M'))).toBe(true);
    expect(hostPeerId('K7PX2M')).toBe('wx-party-v1-K7PX2M');

    const a = new PartyPlayerSession({ transport: peerTransport('player') });
    const b = new PartyPlayerSession({ transport: peerTransport('player') });
    cleanups.push(() => a.dispose(), () => b.dispose());
    expect(await a.join('k7px2m', 'Ana')).toEqual(config);
    expect(await b.join('K7PX2M', 'Beto')).toEqual(config);

    // Players use random peer ids; only the host owns the room id.
    const playerPeers = signaling.created.filter((p) => !p.requested);
    expect(playerPeers).toHaveLength(2);

    // Host relays every broadcast to all connected players.
    host.start();
    await vi.waitFor(() => {
      expect(a.getState().question?.index).toBe(0);
      expect(b.getState().question?.index).toBe(0);
    });
    a.answer('A');
    b.answer('B');
    await vi.waitFor(() => expect(host.getState().phase).toBe('reveal'));
    await vi.waitFor(() => expect(b.getState().scoreboard[0].nickname).toBe('Ana'));
  });

  it('rejects with peer-unavailable when no host owns the code', async () => {
    const t = peerTransport('player');
    cleanups.push(() => t.disconnect());
    await expect(t.connect('ZZZZZZ')).rejects.toMatchObject({ type: 'peer-unavailable' });
  });

  it('rejects when the signaling server is unreachable', async () => {
    signaling.online = false;
    const t = peerTransport('host');
    await expect(t.connect('K7PX2M')).rejects.toMatchObject({ type: 'network' });
  });

  it('retries while the host id is still held (host page refresh)', async () => {
    const stale = new FakePeer(hostPeerId('K7PX2M'));
    await vi.waitFor(() => expect(signaling.peers.get(hostPeerId('K7PX2M'))).toBe(stale));
    setTimeout(() => stale.destroy(), 50);

    const t = peerTransport('host');
    cleanups.push(() => t.disconnect());
    await t.connect('K7PX2M');
    const owner = signaling.peers.get(hostPeerId('K7PX2M'));
    expect(owner).toBeDefined();
    expect(owner).not.toBe(stale);
  });

  it('gives up after the configured retries if the code stays taken', async () => {
    const holder = new FakePeer(hostPeerId('K7PX2M'));
    cleanups.push(() => holder.destroy());
    await vi.waitFor(() => expect(signaling.peers.has(hostPeerId('K7PX2M'))).toBe(true));
    const t = peerTransport('host', { hostIdRetries: 2 });
    await expect(t.connect('K7PX2M')).rejects.toMatchObject({ type: 'unavailable-id' });
  });

  it('player reconnects on its own when the host comes back', async () => {
    const hostT = peerTransport('host');
    await hostT.connect('K7PX2M');
    const playerT = peerTransport('player');
    cleanups.push(() => playerT.disconnect());
    await playerT.connect('K7PX2M');

    // Host tab reloads: its peer is destroyed, then a new one takes the id.
    hostT.disconnect();
    const hostAgain = peerTransport('host');
    cleanups.push(() => hostAgain.disconnect());
    await hostAgain.connect('K7PX2M');

    const received: unknown[] = [];
    playerT.onEnvelope((env) => received.push(env.msg));
    await vi.waitFor(() => {
      hostAgain.send({ v: 1, id: crypto.randomUUID(), room: 'K7PX2M', from: 'host-x', t: Date.now(), msg: { type: 'room_closed' } });
      expect(received).toContainEqual({ type: 'room_closed' });
    });
  });

  it('ignores messages for other rooms', async () => {
    const hostT = peerTransport('host');
    cleanups.push(() => hostT.disconnect());
    await hostT.connect('K7PX2M');
    const playerT = peerTransport('player');
    cleanups.push(() => playerT.disconnect());
    await playerT.connect('K7PX2M');
    const got: unknown[] = [];
    hostT.onEnvelope((e) => got.push(e));
    playerT.send({ v: 1, id: 'x1', room: 'OTHER1', from: 'player-1', t: 0, msg: { type: 'player_heartbeat', playerId: 'p' } });
    playerT.send({ v: 1, id: 'x2', room: 'K7PX2M', from: 'player-1', t: 0, msg: { type: 'player_heartbeat', playerId: 'p' } });
    await vi.waitFor(() => expect(got).toHaveLength(1));
    expect((got[0] as { id: string }).id).toBe('x2');
  });
});

describe('Composite transport with PeerJS', () => {
  it('resolves on the first channel and reports PeerJS once it attaches', async () => {
    const instant: PartyTransport = {
      kind: 'broadcast-channel',
      connect: async () => {},
      send: () => {},
      onEnvelope: () => () => {},
      disconnect: () => {},
    };
    const composite = new CompositePartyTransport([peerTransport('host'), instant]);
    cleanups.push(() => composite.disconnect());
    const changes = vi.fn();
    composite.onStatusChange(changes);

    await composite.connect('K7PX2M');
    expect(composite.getStatus()).toEqual({ active: ['broadcast-channel'], pending: ['peerjs'] });
    expect(supportsOtherDevices(composite.getStatus())).toBe(false);

    await vi.waitFor(() => expect(composite.getStatus().active).toContain('peerjs'));
    expect(supportsOtherDevices(composite.getStatus())).toBe(true);
    expect(changes).toHaveBeenCalled();
  });

  it('falls back to same-browser only when PeerJS cannot connect', async () => {
    signaling.online = false;
    const instant: PartyTransport = {
      kind: 'broadcast-channel',
      connect: async () => {},
      send: () => {},
      onEnvelope: () => () => {},
      disconnect: () => {},
    };
    const composite = new CompositePartyTransport([peerTransport('host'), instant]);
    cleanups.push(() => composite.disconnect());
    await composite.connect('K7PX2M');
    await vi.waitFor(() => expect(composite.getStatus().pending).toEqual([]));
    expect(composite.getStatus().active).toEqual(['broadcast-channel']);
    expect(supportsOtherDevices(composite.getStatus())).toBe(false);
  });

  it('host state exposes the reach so the UI can warn about same-browser only', async () => {
    signaling.online = false;
    const composite = new CompositePartyTransport([peerTransport('host'), new BroadcastChannelPartyTransport()]);
    const host = new PartyHostSession({ transport: composite });
    cleanups.push(() => host.dispose());
    await host.open(SETUP, questions(3));
    await vi.waitFor(() => expect(host.getState().transport.pending).toEqual([]));
    expect(host.getState().transport.active).toEqual(['broadcast-channel']);
  });

  it('default transport uses the peerjs package first, then BroadcastChannel', async () => {
    const hadRtc = 'RTCPeerConnection' in globalThis;
    (globalThis as any).RTCPeerConnection ??= class {};
    cleanups.push(() => {
      if (!hadRtc) delete (globalThis as any).RTCPeerConnection;
    });

    const transport = createDefaultPartyTransport('host');
    expect(transport.kind).toBe('peerjs+broadcast-channel');
    cleanups.push(() => transport.disconnect());
    await transport.connect('K7PX2M');
    // The real loader imported the (mocked) peerjs module and registered the room id.
    await vi.waitFor(() => expect(signaling.peers.has('wx-party-v1-K7PX2M')).toBe(true));
    await vi.waitFor(() => expect(transport.getStatus().active.sort()).toEqual(['broadcast-channel', 'peerjs']));
  });
});
