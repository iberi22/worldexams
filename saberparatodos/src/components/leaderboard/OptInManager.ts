/**
 * OptInManager — Borde de privacidad BR-06
 * Red privada de NOTAS (D-103/D-104). Excluida de $SWAL/karma/telemetría.
 *
 * - Solo con PWA instalada + opt-in se comparten notas/promedios ANÓNIMOS
 *   {node_hash, subject, week, score, avg} vía mesh worldexams.
 * - Nombre/puesto/métricas detalladas visibles SOLO en dispositivo local.
 * - Sin ancla de identidad en Supabase (solo agregados).
 * - Opt-in revocable (BR-06): limpia datos compartidos y envía señal de revocación.
 *
 * Storage keys:
 *  - 'wx-opt-in' = "true"/"false"  (canonical para este módulo)
 *  - 'worldexams_leaderboard_settings' mantiene compat con LeaderboardService
 */

export const OPT_IN_KEY = 'wx-opt-in';
export const NODE_NAME_KEY = 'wx-node-name';
export const REVOCATION_KEY = 'wx-revocation-ts';
export const SHARED_STATS_KEY = 'wx-shared-stats';
export const REVOCATION_EVENT = 'wx:optin:revoked';

export interface OptInState {
  optedIn: boolean;
  nodeName?: string;
  revokedAt?: number;
}

/**
 * Lee estado opt-in desde localStorage. Default false (privacy first).
 */
export function getOptIn(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    const v = localStorage.getItem(OPT_IN_KEY);
    if (v === 'true') return true;
    if (v === 'false') return false;
    // compat: leer del legacy leaderboard settings
    const legacy = localStorage.getItem('worldexams_leaderboard_settings');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (typeof parsed.isOptedIn === 'boolean') return parsed.isOptedIn;
    }
    return false;
  } catch {
    return false;
  }
}

export function hasOptIn(): boolean {
  return getOptIn();
}

export function isOptIn(): boolean {
  return getOptIn();
}

/**
 * Verifica si puede compartir datos por mesh. Debe llamarse antes de enviar.
 */
export function canShareData(): boolean {
  return getOptIn() === true;
}

/**
 * Alias semántico para checks previos a mesh sync.
 */
export function shouldShareBeforeMesh(): boolean {
  return canShareData();
}

export function getOptInState(): OptInState {
  const optedIn = getOptIn();
  let nodeName: string | undefined;
  let revokedAt: number | undefined;
  if (typeof localStorage !== 'undefined') {
    try {
      nodeName = localStorage.getItem(NODE_NAME_KEY) || undefined;
      const rev = localStorage.getItem(REVOCATION_KEY);
      if (rev) revokedAt = Number(rev);
    } catch { /* ignore */ }
  }
  return { optedIn, nodeName, revokedAt };
}

export function setOptIn(value: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(OPT_IN_KEY, value ? 'true' : 'false');
    // compat: sincronizar con legacy key
    const raw = localStorage.getItem('worldexams_leaderboard_settings');
    let parsed: any = {};
    try { parsed = raw ? JSON.parse(raw) : {}; } catch { parsed = {}; }
    parsed.isOptedIn = value;
    localStorage.setItem('worldexams_leaderboard_settings', JSON.stringify(parsed));

    window.dispatchEvent(new CustomEvent(value ? 'wx:optin:granted' : 'wx:optin:revoked', {
      detail: { optedIn: value, ts: Date.now() }
    }));
  } catch (e) {
    console.warn('[OptInManager] cannot persist opt-in', e);
  }
}

export function getLocalNodeName(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(NODE_NAME_KEY);
  } catch { return null; }
}

export function setLocalNodeName(name: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const trimmed = String(name).trim().slice(0, 32);
    if (!trimmed) {
      localStorage.removeItem(NODE_NAME_KEY);
    } else {
      localStorage.setItem(NODE_NAME_KEY, trimmed);
    }
    // compat: actualizar displayName en legacy settings si está opt-in
    const raw = localStorage.getItem('worldexams_leaderboard_settings');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.displayName = trimmed || parsed.displayName;
        localStorage.setItem('worldexams_leaderboard_settings', JSON.stringify(parsed));
      } catch { /* ignore */ }
    }
  } catch (e) {
    console.warn('[OptInManager] cannot persist node name', e);
  }
}

/**
 * Revoca opt-in (BR-06):
 * - Setea 'wx-opt-in' a false
 * - Limpia datos compartidos locales (SHARED_STATS_KEY + pendientes)
 * - Registra timestamp de revocación
 * - Envía señal de revocación por mesh (evento + localStorage + intento edge-mesh)
 * - Retorna true si había opt-in previo
 */
export function revokeOptIn(): boolean {
  const hadOptIn = getOptIn();
  if (typeof localStorage === 'undefined') return hadOptIn;

  try {
    localStorage.setItem(OPT_IN_KEY, 'false');
    localStorage.setItem(REVOCATION_KEY, String(Date.now()));

    // Limpiar datos compartidos anónimos previos (solo agregados anonimizados)
    try {
      localStorage.removeItem(SHARED_STATS_KEY);
      localStorage.removeItem('wx-shared-stats:pending');
    } catch { /* ignore */ }

    // Compat: actualizar legacy
    try {
      const raw = localStorage.getItem('worldexams_leaderboard_settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.isOptedIn = false;
        localStorage.setItem('worldexams_leaderboard_settings', JSON.stringify(parsed));
      }
    } catch { /* ignore */ }

    // Limpiar cola pending de leaderboard-service si existe
    try {
      const pendingKey = 'worldexams_pending_scores';
      const pendingRaw = localStorage.getItem(pendingKey);
      if (pendingRaw) {
        const pending = JSON.parse(pendingRaw);
        if (Array.isArray(pending)) {
          // marcar como no sincronizables / vaciar si eran solo para mesh
          // Por privacidad: eliminamos pendientes no enviados
          localStorage.removeItem(pendingKey);
        }
      }
    } catch { /* ignore */ }

    // Señal de revocación por eventos window (mesh listeners)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(REVOCATION_EVENT, {
        detail: { revokedAt: Date.now(), hadOptIn }
      }));
      // Señal también vía storage event para otras tabs
      // y para listeners que observen localStorage
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: OPT_IN_KEY,
          oldValue: 'true',
          newValue: 'false',
          storageArea: localStorage
        } as any));
      } catch { /* ignore en jsdom */ }

      // Intento de señal mesh: edge-mesh private sync (best-effort, no bloquea)
      try {
        window.dispatchEvent(new CustomEvent('wx:mesh:revoke', {
          detail: { node_hash: getNodeHashPreview(), ts: Date.now() }
        }));
      } catch { /* ignore */ }
    }
  } catch (e) {
    console.warn('[OptInManager] revoke failed', e);
  }
  return hadOptIn;
}

/**
 * Helper: verifica opt-in antes de compartir. Lanza si no está permitido.
 * Uso: assertCanShare() antes de mesh sync
 */
export function assertCanShare(): void {
  if (!canShareData()) {
    throw new Error('[OptInManager] cannot share: opt-in not granted (BR-06)');
  }
}

/**
 * Pequeño preview del node hash para eventos de revocación (no PII).
 * Deriva de swal instance id si existe.
 */
function getNodeHashPreview(): string {
  try {
    const id = localStorage.getItem('swal.worldexams.instanceId') || 'anonymous';
    let h = 0;
    for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) | 0;
    return `node_${Math.abs(h).toString(36).slice(0, 8)}`;
  } catch {
    return 'node_unknown';
  }
}

/**
 * Util para UI: suscribirse a cambios de opt-in
 */
export function onOptInChange(callback: (optedIn: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getOptIn());
  window.addEventListener('wx:optin:granted', handler as EventListener);
  window.addEventListener('wx:optin:revoked', handler as EventListener);
  window.addEventListener('storage', (e) => {
    if (e.key === OPT_IN_KEY || e.key === 'worldexams_leaderboard_settings') handler();
  });
  return () => {
    window.removeEventListener('wx:optin:granted', handler as EventListener);
    window.removeEventListener('wx:optin:revoked', handler as EventListener);
    window.removeEventListener('storage', handler as EventListener);
  };
}
