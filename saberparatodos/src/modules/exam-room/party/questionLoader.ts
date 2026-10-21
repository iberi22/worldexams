/**
 * Carga de preguntas para /party con el mismo cargador de packs que usa Práctica
 * (`defaultQuestionRepository` → pack-fetcher). No hay endpoints nuevos.
 *
 * El pack-fetcher toma el país de `#api-config`; el host puede elegir otro país,
 * así que actualizamos ese JSON antes de pedir las preguntas.
 */

import type { AppQuestion } from '../../../lib/api-service';
import { clearCache } from '../../../lib/api-service';
import { defaultQuestionRepository, filterValidQuestions } from '../../../lib/questions';
import type { QuestionRepository } from '../../../lib/questions/types';

export interface PartyQuestionRequest {
  countryCode: string;
  grado: number;
  asignatura: string;
  count: number;
}

const MAX_PAGES = 5;

/** Fija el país que leerá el pack-fetcher. Devuelve true si cambió. */
export function setRuntimeCountry(countryCode: string, doc: Document | undefined = globalThis.document): boolean {
  if (!doc) return false;
  const code = countryCode.toLowerCase();
  let el = doc.getElementById('api-config');
  let config: Record<string, unknown> = {};
  if (el?.textContent) {
    try {
      config = JSON.parse(el.textContent);
    } catch {
      config = {};
    }
  }
  if (!el) {
    el = doc.createElement('script');
    el.id = 'api-config';
    el.setAttribute('type', 'application/json');
    doc.head.appendChild(el);
  }
  const changed = String(config.countryCode || '').toLowerCase() !== code;
  config.apiBaseUrl = config.apiBaseUrl || import.meta.env?.PUBLIC_API_BASE_URL || '/api';
  config.countryCode = code;
  el.textContent = JSON.stringify(config);
  return changed;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function loadPartyQuestions(
  request: PartyQuestionRequest,
  repository: Pick<QuestionRepository, 'fetchQuestions'> = defaultQuestionRepository,
): Promise<AppQuestion[]> {
  // La caché de packs no distingue país: si el host cambia de país, se limpia.
  if (setRuntimeCountry(request.countryCode)) clearCache();

  const pool: AppQuestion[] = [];
  const seen = new Set<string>();
  const pages = Math.min(MAX_PAGES, Math.ceil(request.count / 10) + 1);
  for (let page = 1; page <= pages && pool.length < request.count; page++) {
    const batch = await repository.fetchQuestions(request.grado, request.asignatura, page);
    if (!batch?.length) break;
    for (const q of batch) {
      if (q?.id && !seen.has(q.id)) {
        seen.add(q.id);
        pool.push(q);
      }
    }
    if (batch.length < 10) break;
  }

  const { validQuestions } = filterValidQuestions(pool, 4);
  return shuffle(validQuestions).slice(0, request.count);
}
