/**
 * Wave-Gov #1166 — Privacy Toggle.
 *
 * El host elige al crear el salon como se veran los resultados:
 * - public  : todos los nombres/ids y puntajes visibles.
 * - anon    : puntajes visibles, identidad ofuscada (peer -> "Estudiante N").
 * - private : cada estudiante ve solo SU resultado; el host ve todo.
 */

import {
  type SalonEventBus,
  type SalonTenant,
} from './salon-shared';

export type PrivacyMode = 'public' | 'anon' | 'private';

export const PRIVACY_MODES: readonly PrivacyMode[] = ['public', 'anon', 'private'];

export function isPrivacyMode(value: unknown): value is PrivacyMode {
  return typeof value === 'string' && (PRIVACY_MODES as readonly string[]).includes(value);
}

export interface ViewerContext {
  peerId: string;
  role: 'host' | 'student';
}

export interface PrivacyPolicy {
  mode(): PrivacyMode;
  setMode(callerId: string, next: PrivacyMode): boolean;
  /** Puede el viewer ver el resultado del peer objetivo? */
  canViewResult(viewer: ViewerContext, targetPeerId: string): boolean;
  /** Nombre/alias que se muestra del target segun el modo. */
  aliasFor(viewer: ViewerContext, targetPeerId: string): string;
}

export function createPrivacyPolicy(
  tenant: SalonTenant,
  hostId: string,
  initial: PrivacyMode = 'public',
  bus?: SalonEventBus,
): PrivacyPolicy {
  if (!isPrivacyMode(initial)) {
    throw new Error(`[#1166] Modo de privacidad invalido: ${String(initial)}`);
  }
  let current = initial;
  const aliasIndex = new Map<string, number>();

  function aliasFor(viewer: ViewerContext, targetPeerId: string): string {
    void viewer;
    if (current === 'public') return targetPeerId;
    if (!aliasIndex.has(targetPeerId)) {
      aliasIndex.set(targetPeerId, aliasIndex.size + 1);
    }
    return `Estudiante ${aliasIndex.get(targetPeerId)}`;
  }

  return {
    mode: () => current,
    setMode(callerId, next) {
      if (callerId !== hostId || !isPrivacyMode(next)) return false;
      current = next;
      bus?.emit('salon:privacy:change', tenant, { mode: next, by: hostId });
      return true;
    },
    canViewResult(viewer, targetPeerId) {
      if (viewer.role === 'host') return true;
      if (viewer.peerId === targetPeerId) return true;
      return current === 'public' || current === 'anon';
    },
    aliasFor,
  };
}
