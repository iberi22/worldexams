/**
 * Singleton AI Core client for SaberParaTodos (product adapter over edge-mesh).
 *
 * NOTA: el core `@iberi22/edge-mesh` no expone `AiCore`/`createAiCore`
 * (verificado: solo existe mención en ADR-005). Se usa el stub local
 * on-device hasta que el core publique el módulo AI.
 */
import { createAiCore, type AiCore } from './__mocks__/edge-mesh-stub';
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
