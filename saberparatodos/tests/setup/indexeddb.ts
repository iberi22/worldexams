/**
 * IndexedDB Polyfill Setup for Vitest unit tests.
 * Registers fake-indexeddb in jsdom environment so edge-mesh storage
 * and other IndexedDB dependent modules operate seamlessly in tests.
 *
 * Uses queueMicrotask for setImmediate so fake-indexeddb callbacks resolve
 * asynchronously on microtask ticks even when vi.useFakeTimers() is active.
 * Patches IDBKeyRange.only to support boolean key ranges without DataError.
 * Resets indexedDB instance before each test to ensure test isolation.
 */
import 'fake-indexeddb/auto';
import { beforeEach } from 'vitest';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

const immediatePolyfill = (fn: (...args: any[]) => void, ...args: any[]) => {
  queueMicrotask(() => fn(...args));
  return 0 as unknown as ReturnType<typeof setImmediate>;
};

if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'setImmediate', {
    get() {
      return immediatePolyfill;
    },
    set(_val) {
      // Ignore attempts by vi.useFakeTimers() to override setImmediate
    },
    configurable: true,
  });

  const targetKeyRange = globalThis.IDBKeyRange || IDBKeyRange;
  if (targetKeyRange && targetKeyRange.only) {
    const originalOnly = targetKeyRange.only;
    targetKeyRange.only = function (value: any) {
      if (typeof value === 'boolean') {
        return new targetKeyRange(value, value, false, false);
      }
      return originalOnly.call(this, value);
    };
  }
}

beforeEach(() => {
  globalThis.indexedDB = new IDBFactory();
});
