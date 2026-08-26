/**
 * leaderboard-mesh — cliente de sync para red privada de NOTAS (WX-204 shim)
 * Provee fetchAggregateStats() consumido por LeaderboardGlobal.
 *
 * Payload anónimo permitido (D-103/D-104):
 *   { node_hash, subject, week, score, avg }  — sin PII, sin tokens/karma/telemetría
 * Requiere opt-in BR-06 antes de enviar.
 *
 * Fuente de datos:
 *  1. Si edge-mesh está disponible, intenta leer agregados del mesh (namespace swal/worldexams/{instanceId})
 *  2. Fallback: lee agregados anonimizados locales + pending scores (si opt-in)
 *  3. En última instancia, retorna [] para no bloquear UI
 */

import { canShareData } from '../../components/leaderboard/OptInManager';

export interface AggregateStat {
  node_hash: string; // hash anónimo, ej dev_ABC123 o node_xxx
  subject: string;   // ej matematicas, lengua
  week: string;      // ej W01
  score: number;     // score de la semana
  avg: number;       // promedio global / semanal (orden)
}

export const MESH_NAMESPACE = 'swal/worldexams';
export const AGGREGATE_STORAGE_KEY = 'wx-shared-stats';

/**
 * Ordena por avg descendente y pagina (helper público para tests)
 */
export function sortAndPaginate(stats: AggregateStat[], page = 1, pageSize = 10): AggregateStat[] {
  const sorted = [...stats].sort((a, b) => b.avg - a.avg);
  const start = (page - 1) * pageSize;
  return sorted.slice(start, start + pageSize);
}

export function getTop50Sorted(stats: AggregateStat[]): AggregateStat[] {
  return [...stats].sort((a, b) => b.avg - a.avg).slice(0, 50);
}

/**
 * Genera un hash corto anonimizado (no reversible) para previews.
 */
function shortHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = ((h << 5) - h + input.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).padStart(6, '0').slice(0, 8);
}

/**
 * Fetch agregados desde mesh o storage local.
 * Solo lectura: no requiere opt-in para LEER globales (son anonimos).
 * Para ESCRIBIR/SINCRONIZAR se debe verificar canShareData() antes.
 */
export async function fetchAggregateStats(): Promise<AggregateStat[]> {
  // Intento 1: leer agregados anonimizados ya compartidos en localStorage (simula mesh)
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(AGGREGATE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AggregateStat[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return getTop50Sorted(parsed);
        }
      }
    }
  } catch { /* ignore */ }

  // Intento 2: leer pending scores anonimizados y mapear a AggregateStat (solo si hay opt-in previo para escribir, pero para lectura mostramos anonimizados globales)
  try {
    if (typeof localStorage !== 'undefined') {
      const pendingRaw = localStorage.getItem('worldexams_pending_scores');
      if (pendingRaw) {
        const pending = JSON.parse(pendingRaw) as Array<{ submission: any }>;
        const mapped: AggregateStat[] = pending.map((e, idx) => {
          const s = e.submission || e;
          // anonimizamos: solo node_hash + subject + week + score + avg
          const nodeHash = s.deviceHash || `node_${shortHash(s.anonymousId || String(idx))}`;
          return {
            node_hash: nodeHash,
            subject: String(s.subjectId || s.subject || 'general'),
            week: String(s.week || 'W01'),
            score: Number(s.score ?? s.totalPoints ?? 0),
            avg: Number(s.stats?.accuracy != null ? Math.round(s.stats.accuracy * 100) : (s.score ?? 0))
          } as AggregateStat;
        });
        if (mapped.length > 0) return getTop50Sorted(mapped);
      }
    }
  } catch { /* ignore */ }

  // Intento 3: si no hay datos locales, intentar fetch de API agregada (anonima) si existe
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/leaderboard/aggregates', { method: 'GET' });
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return getTop50Sorted(data as AggregateStat[]);
        if (Array.isArray((data as any)?.aggregates)) return getTop50Sorted((data as any).aggregates);
      }
    }
  } catch { /* ignore network */ }

  // Fallback vacío: no bloquea UI
  return [];
}

/**
 * Intenta compartir un stat anónimo vía mesh, respetando opt-in.
 * Retorna true si se encoló/compartió, false si opt-in no concedido.
 */
export async function tryShareAggregateStat(stat: Omit<AggregateStat, 'node_hash'> & { node_hash?: string }): Promise<boolean> {
  if (!canShareData()) return false;

  let nodeHash = stat.node_hash;
  if (!nodeHash && typeof localStorage !== 'undefined') {
    try {
      const inst = localStorage.getItem('swal.worldexams.instanceId') || 'local';
      nodeHash = `node_${shortHash(inst)}`;
    } catch { nodeHash = `node_${shortHash(String(Date.now()))}`; }
  }
  const payload: AggregateStat = {
    node_hash: nodeHash || `node_${shortHash(String(Date.now()))}`,
    subject: String(stat.subject || 'general'),
    week: String(stat.week || 'W01'),
    score: Number(stat.score || 0),
    avg: Number(stat.avg || 0)
  };

  // Guardar en localStorage como simulación de mesh shared agregados
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(AGGREGATE_STORAGE_KEY);
      const arr: AggregateStat[] = raw ? JSON.parse(raw) : [];
      arr.push(payload);
      // mantener solo últimos 200, ordenados
      const sorted = getTop50Sorted(arr);
      const toStore = sorted.length > 200 ? sorted.slice(0, 200) : sorted;
      // pero conservar top por avg; si excede, recorta a 200
      if (arr.length > 200) {
        localStorage.setItem(AGGREGATE_STORAGE_KEY, JSON.stringify(getTop50Sorted(arr).slice(0, 200)));
      } else {
        localStorage.setItem(AGGREGATE_STORAGE_KEY, JSON.stringify(arr));
      }

      // Señal mesh simulada
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wx:mesh:share', { detail: payload }));
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Limpia datos compartidos tras revocación (BR-06)
 */
export function clearSharedAggregates(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(AGGREGATE_STORAGE_KEY);
  } catch { /* ignore */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wx:mesh:revoke', { detail: { ts: Date.now() } }));
  }
}
