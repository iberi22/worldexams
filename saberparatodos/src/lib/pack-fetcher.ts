/**
 * Pack Fetcher
 * Fetches questions from API or local packs with rotating pack support
 *
 * Extracted from api-service.ts for better separation of concerns
 */

import { countryConfig, getCountryExamSlug, getExplicitProductCountryCode } from '../config';
import { getQuestionPool, savePack } from './pack-storage';
import type { AppQuestion } from './question-transformer';
import {
  transformQuestion,
  filterSubject,
  excludeQuarantinedAppQuestions,
  getPackSubjectAliases,
  normalizeSubjectKey
} from './question-transformer';

interface RuntimeApiConfig {
  apiBaseUrl: string;
  countryCode?: string;
  exam?: string;
}

function getRuntimeApiConfig(): RuntimeApiConfig {
  if (typeof document !== 'undefined') {
    const config = document.getElementById('api-config');
    if (config?.textContent) {
      try {
        const parsed = JSON.parse(config.textContent);
        if (parsed?.apiBaseUrl) {
          return {
            apiBaseUrl: String(parsed.apiBaseUrl),
            countryCode: parsed?.countryCode ? String(parsed.countryCode).toLowerCase() : undefined,
            exam: parsed?.exam ? String(parsed.exam).toLowerCase() : undefined,
          };
        }
      } catch {
        // Fall through to other sources.
      }
    }
  }

  const explicitCountryCode = getExplicitProductCountryCode();

  // Use environment variable if available during SSR or build.
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.PUBLIC_API_BASE_URL : undefined;
  return {
    apiBaseUrl: envUrl || '/api',
    countryCode: explicitCountryCode?.toLowerCase(),
    exam: explicitCountryCode ? getCountryExamSlug(countryConfig) : undefined,
  };
}

/**
 * Fetch questions from packs (either remote or local)
 * Handles rotating weekly packs for anti-scraping protection
 */
export async function fetchQuestionsFromPacks(grade: number, subject?: string, page: number = 1): Promise<AppQuestion[]> {
  const ANCHOR_DATE = new Date('2025-01-01T00:00:00Z').getTime();
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const currentWeek = Math.max(1, Math.ceil((Date.now() - ANCHOR_DATE) / ONE_WEEK_MS) % 52 || 52);
  const isDevRuntime = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);
  const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
  const baseOrigin =
    !isJsdom
    && typeof window !== 'undefined'
    && typeof window.location !== 'undefined'
    && /^https?:/i.test(window.location.origin)
      ? window.location.origin
      : '';
  const canUseRelativeFetch = Boolean(baseOrigin);
  const resolvePackUrl = (path: string) => baseOrigin ? new URL(path, baseOrigin).toString() : path;

  try {
    const normalizedSubject = normalizeSubjectKey(subject || '');
    const runtimeApiConfig = getRuntimeApiConfig();
    const apiBaseUrl = runtimeApiConfig.apiBaseUrl.replace(/\/+$/, '');
    const shouldPreferStaticPacks =
      isDevRuntime ||
      (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname));

    // Compute static pack origin — use the app origin, NOT the API base URL.
    // Because the API (worker) packs lack the context field, but static packs
    // served via the Astro proxy (saberparatodos.space/api/packs/...) DO have context.
    const staticOrigin = baseOrigin || 'https://saberparatodos.space';

    const tryStaticPackCandidates = async (): Promise<Response | null> => {
      // Prefer subject-specific packs first, then generic grade packs.
      const subjectCandidatePaths: string[] = [];
      // Prefer runtime geo/tenant country from #api-config; build-time site country is last resort.
      const countryCode =
        (runtimeApiConfig.countryCode || getExplicitProductCountryCode() || 'co').toLowerCase();
      
      if (normalizedSubject) {
        for (const subjectAlias of getPackSubjectAliases(normalizedSubject)) {
          // Try the specific country pack first, then fall back to the generic one
          subjectCandidatePaths.push(`${staticOrigin}/api/packs/${countryCode}-week-${currentWeek}-grade-${grade}-subject-${subjectAlias}.json`);
          subjectCandidatePaths.push(`${staticOrigin}/api/packs/week-${currentWeek}-grade-${grade}-subject-${subjectAlias}.json`);
          
          subjectCandidatePaths.push(`${apiBaseUrl}/packs/${countryCode}-week-${currentWeek}-grade-${grade}-subject-${subjectAlias}.json`);
          subjectCandidatePaths.push(`${apiBaseUrl}/packs/week-${currentWeek}-grade-${grade}-subject-${subjectAlias}.json`);
          
          subjectCandidatePaths.push(`${staticOrigin}/api/packs/${countryCode}-week-1-grade-${grade}-subject-${subjectAlias}.json`);
          subjectCandidatePaths.push(`${staticOrigin}/api/packs/week-1-grade-${grade}-subject-${subjectAlias}.json`);
          
          subjectCandidatePaths.push(`${apiBaseUrl}/packs/${countryCode}-week-1-grade-${grade}-subject-${subjectAlias}.json`);
          subjectCandidatePaths.push(`${apiBaseUrl}/packs/week-1-grade-${grade}-subject-${subjectAlias}.json`);
        }
      }

      const legacyCandidatePaths = shouldPreferStaticPacks
        ? [`${apiBaseUrl}/packs/${countryCode}-week-1-grade-${grade}.json`, `${apiBaseUrl}/packs/week-1-grade-${grade}.json`]
        : [
            `${apiBaseUrl}/packs/${countryCode}-week-${currentWeek}-grade-${grade}.json`,
            `${apiBaseUrl}/packs/week-${currentWeek}-grade-${grade}.json`,
            `${apiBaseUrl}/packs/${countryCode}-week-1-grade-${grade}.json`,
            `${apiBaseUrl}/packs/week-1-grade-${grade}.json`
          ];

      const allCandidatePaths = [...subjectCandidatePaths, ...legacyCandidatePaths];
      if (!canUseRelativeFetch) return null;

      for (const path of allCandidatePaths) {
        try {
          // Try GET directly — some Cloudflare Asset paths don't respond to HEAD
          const url = path.startsWith('http') ? path : resolvePackUrl(path);
          const getResponse = await fetch(url);
          if (getResponse.ok) return getResponse;
        } catch {
          // Continue trying the next local pack candidate.
        }
      }

      return null;
    };

    if (shouldPreferStaticPacks) {
      const localPackResponse = await tryStaticPackCandidates();
      if (localPackResponse) {
        const packData = await localPackResponse.json();
        if (Array.isArray(packData?.questions)) {
          const packSubject =
            packData.subject ||
            packData.metadata?.subject ||
            subject ||
            'unknown';
          const appQuestions: AppQuestion[] = packData.questions.map((q: any) => {
            const qSubject = normalizeSubjectKey(q.subject || packSubject);
            if (q.options?.length && !q.options[0].id) {
              q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A', 'B', 'C', 'D', 'E'][i] || String(i) }));
            }
            return transformQuestion(q, grade, qSubject);
          });

          return filterSubject(excludeQuarantinedAppQuestions(appQuestions), normalizedSubject);
        }
      }
    }

    try {
      const query = new URLSearchParams({
        grade: String(grade),
        page: String(Math.max(1, page))
      });

      if (runtimeApiConfig.countryCode) query.set('country', runtimeApiConfig.countryCode);
      if (runtimeApiConfig.exam) query.set('exam', runtimeApiConfig.exam);
      if (normalizedSubject) query.set('subject', normalizedSubject);

      const apiResponse = await fetch(`${apiBaseUrl}/questions?${query.toString()}`);
      if (apiResponse.ok) {
        const payload = await apiResponse.json();
        let rawQuestions = Array.isArray(payload?.questions) ? payload.questions : [];
        if (rawQuestions.length > 0) {
          // 🆕 Enrich API questions with context from static packs if needed
          const needsEnrichment = rawQuestions.some((q: any) => !q.context);
          if (needsEnrichment) {
            try {
              const staticResponse = await tryStaticPackCandidates();
              if (staticResponse) {
                const staticPackData = await staticResponse.json();
                if (Array.isArray(staticPackData?.questions)) {
                  const contextMap = new Map<string, string>();
                  staticPackData.questions.forEach((sq: any) => {
                    if (sq.id && sq.context) {
                      contextMap.set(sq.id, sq.context);
                    }
                  });

                  rawQuestions = rawQuestions.map((q: any) => {
                    if (!q.context && contextMap.has(q.id)) {
                      return { ...q, context: contextMap.get(q.id) };
                    }
                    return q;
                  });
                }
              }
            } catch (enrichError) {
              console.warn('[API] Context enrichment failed:', enrichError);
            }
          }

          if (normalizedSubject) {
            savePack({
              packId: String(payload?.meta?.pack_id || payload?.meta?.packId || `api-week-${currentWeek}`),
              grade,
              subject: normalizedSubject,
              country: runtimeApiConfig.countryCode || 'co',
              questions: rawQuestions,
              downloadedAt: Date.now(),
              questionCount: rawQuestions.length
            });
          }

          const appQuestions: AppQuestion[] = rawQuestions.map((q: any) => {
            const qSubject = normalizeSubjectKey(q.subject || payload?.meta?.subject || subject || 'unknown');
            if (q.options?.length && !q.options[0].id) {
              q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A', 'B', 'C', 'D', 'E'][i] || String(i) }));
            }
            return transformQuestion(q, grade, qSubject);
          });

          return filterSubject(excludeQuarantinedAppQuestions(appQuestions), normalizedSubject);
        } else if (payload?.questions && payload.questions.length === 0) {
          console.warn(`[API] Returned 0 questions — trying static packs`);
        }
      }
    } catch (apiError) {
      console.warn('Falling back to local packs:', apiError);
    }

    if (!canUseRelativeFetch) {
      const fallback = getQuestionPool(grade).map((q: any) => transformQuestion(q, grade, normalizeSubjectKey(q.subject || subject || 'unknown')));
      return filterSubject(excludeQuarantinedAppQuestions(fallback), normalizedSubject);
    }

    const response = await tryStaticPackCandidates();

    if (!response) {
      const fallback = getQuestionPool(grade).map((q: any) => transformQuestion(q, grade, normalizeSubjectKey(q.subject || subject || 'unknown')));
      const questions = filterSubject(excludeQuarantinedAppQuestions(fallback), normalizedSubject);
      if (questions.length === 0) {
        console.warn(`[API] No remote or local questions for Grade ${grade}${subject ? ` -> ${subject}` : ''}`);
      }
      return questions;
    }

    const packData = await response.json();
    if (!packData?.questions) return [];
    const packSubject =
      packData.subject ||
      packData.metadata?.subject ||
      subject ||
      'unknown';

    const appQuestions: AppQuestion[] = packData.questions.map((q: any) => {
        const qSubject = normalizeSubjectKey(q.subject || packSubject);
        if (q.options?.length && !q.options[0].id) {
            q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A','B','C','D','E'][i] || String(i) }));
        }
        return transformQuestion(q, grade, qSubject);
    });

    return filterSubject(excludeQuarantinedAppQuestions(appQuestions), normalizedSubject);
  } catch (err) {
    console.error(`❌ Fatal error in pack service:`, err);
    return [];
  }
}
