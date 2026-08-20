import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  saveTutorSession,
  getTutorSession,
  getAllTutorSessions,
  deleteTutorSession,
  clearTutorHistory,
  syncSessionToXavier,
  type TutorSessionRecord,
} from './tutor-history';
import { TutorSession } from './tutor-session';

// Mock IndexedDB
class IDBRequestMock {
  public result: any = null;
  public error: any = null;
  public onsuccess: any = null;
  public onerror: any = null;

  succeed(val: any) {
    this.result = val;
    if (this.onsuccess) this.onsuccess({ target: this });
  }

  fail(err: any) {
    this.error = err;
    if (this.onerror) this.onerror({ target: this });
  }
}

class IDBTransactionMock {
  public oncomplete: any = null;
  public onerror: any = null;

  constructor(private store: IDBObjectStoreMock) {}

  objectStore() {
    return this.store;
  }
}

class IDBIndexMock {
  constructor(private dataMap: Map<string, any>) {}

  getAll() {
    const req = new IDBRequestMock();
    setTimeout(() => {
      req.succeed(Array.from(this.dataMap.values()));
    }, 0);
    return req;
  }
}

class IDBObjectStoreMock {
  constructor(private dataMap: Map<string, any>) {}

  put(record: any) {
    this.dataMap.set(record.sessionId, record);
    const req = new IDBRequestMock();
    setTimeout(() => req.succeed(record.sessionId), 0);
    return req;
  }

  get(key: string) {
    const req = new IDBRequestMock();
    setTimeout(() => req.succeed(this.dataMap.get(key) || null), 0);
    return req;
  }

  delete(key: string) {
    this.dataMap.delete(key);
    const req = new IDBRequestMock();
    setTimeout(() => req.succeed(undefined), 0);
    return req;
  }

  clear() {
    this.dataMap.clear();
    const req = new IDBRequestMock();
    setTimeout(() => req.succeed(undefined), 0);
    return req;
  }

  index() {
    return new IDBIndexMock(this.dataMap);
  }
}

class IDBDatabaseMock {
  public objectStoreNames = {
    contains: (name: string) => name === 'tutor_sessions',
  };

  constructor(private dataMap: Map<string, any>) {}

  transaction() {
    return new IDBTransactionMock(new IDBObjectStoreMock(this.dataMap));
  }
}

describe('tutor-history and tutor-session persistence', () => {
  let dbMap: Map<string, any>;

  beforeEach(() => {
    dbMap = new Map();
    const dbMock = new IDBDatabaseMock(dbMap);
    const mockIndexedDB = {
      open: vi.fn().mockImplementation(() => {
        const req = new IDBRequestMock();
        setTimeout(() => req.succeed(dbMock), 0);
        return req;
      }),
    };

    (globalThis as any).indexedDB = mockIndexedDB;
    (globalThis as any).window = {
      indexedDB: mockIndexedDB,
    };
  });

  it('persists tutor session turns automatically to IndexedDB history', async () => {
    const session = new TutorSession({ subject: 'Biología', grade: 11 });
    await session.respondText('¿Qué es la fotosíntesis?', { speak: false });

    const saved = await getTutorSession(session.sessionId);
    expect(saved).not.toBeNull();
    expect(saved?.sessionId).toBe(session.sessionId);
    expect(saved?.context.subject).toBe('Biología');
    expect(saved?.history.length).toBe(1);
    expect(saved?.history[0].userText).toBe('¿Qué es la fotosíntesis?');
  });

  it('retrieves all tutor sessions ordered newest first', async () => {
    const session1: TutorSessionRecord = {
      sessionId: 's1',
      context: { subject: 'Física' },
      history: [{ userText: 'u1', assistantText: 'a1', at: 1000 }],
      createdAt: 1000,
      updatedAt: 1000,
    };
    const session2: TutorSessionRecord = {
      sessionId: 's2',
      context: { subject: 'Química' },
      history: [{ userText: 'u2', assistantText: 'a2', at: 2000 }],
      createdAt: 2000,
      updatedAt: 2000,
    };

    await saveTutorSession(session1);
    await saveTutorSession(session2);

    const all = await getAllTutorSessions();
    expect(all.length).toBe(2);
    expect(all[0].sessionId).toBe('s2');
    expect(all[1].sessionId).toBe('s1');
  });

  it('deletes individual tutor sessions', async () => {
    const record: TutorSessionRecord = {
      sessionId: 'del-id',
      context: { subject: 'Historia' },
      history: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await saveTutorSession(record);
    expect(await getTutorSession('del-id')).not.toBeNull();

    await deleteTutorSession('del-id');
    expect(await getTutorSession('del-id')).toBeNull();
  });

  it('clears all tutor history', async () => {
    await saveTutorSession({
      sessionId: 's1',
      context: {},
      history: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await saveTutorSession({
      sessionId: 's2',
      context: {},
      history: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    expect((await getAllTutorSessions()).length).toBe(2);
    await clearTutorHistory();
    expect((await getAllTutorSessions()).length).toBe(0);
  });

  it('handles optional Xavier sync graceful fallback', async () => {
    const record: TutorSessionRecord = {
      sessionId: 'xavier-test',
      context: { subject: 'Matemáticas' },
      history: [{ userText: 'hola', assistantText: 'hola', at: Date.now() }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const synced = await syncSessionToXavier(record);
    // Unconfigured PUBLIC_XAVIER_URL returns false gracefully
    expect(synced).toBe(false);
  });
});
