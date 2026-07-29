/**
 * Singleton AI Core client for SaberParaTodos (product adapter over edge-mesh).
 */
import { createAiCore, type AiCore } from 'edge-mesh';
import { getOrCreateSwalInstanceId } from '../swal-instance-id';

let core: AiCore | null = null;

export function getAiCore(mesh?: unknown): AiCore {
  if (!core) {
    core = createAiCore({
      instanceId: getOrCreateSwalInstanceId(),
      mesh,
    });
  }
  return core;
}

export function resetAiCoreForTests(): void {
  core = null;
}
