import { createMockTeacherApi } from './mock-adapter';
import { createTeacherClient, saveTeacherSession } from './teacher-client';
import type { TeacherApi } from './types';

export * from './teacher-client';
export type * from './types';

let instance: TeacherApi | null = null;

/** True when the panel runs against the in-memory adapter (`PUBLIC_INST_MOCK=1`, local only). */
export function isMockMode(): boolean {
  return typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_INST_MOCK === '1';
}

/** Shared API instance for the panel pages. */
export function getTeacherApi(): TeacherApi {
  if (!instance) {
    if (isMockMode()) {
      instance = createMockTeacherApi({ seeded: true });
      saveTeacherSession('mock-session');
    } else {
      instance = createTeacherClient();
    }
  }
  return instance;
}
