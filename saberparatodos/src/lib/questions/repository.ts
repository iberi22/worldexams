import {
  fetchAllQuestionsForGrade,
  fetchQuestions,
  fetchBulkQuestions,
  fetchEnglishQuestionsAllGrades,
  type AppQuestion
} from '../api-service';
import type { QuestionRepository } from './types';
import { getExplicitProductCountryCode } from '../../config';
import { normalizeSubjectKey, transformQuestion, filterSubject, excludeQuarantinedAppQuestions } from '../question-transformer';

function getRuntimeApiConfig() {
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
      }
    }
  }
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.PUBLIC_API_BASE_URL : undefined;
  return {
    apiBaseUrl: envUrl || '/api',
    countryCode: getExplicitProductCountryCode(),
  };
}

export const defaultQuestionRepository: QuestionRepository = {
  fetchAllQuestionsForGrade,
  fetchQuestions,
  fetchBulkQuestions,
  fetchEnglishQuestionsAllGrades,
  fetchSample: async (grade: number, subject: string | null, options: { period?: number; limit?: number; seed?: string }) => {
    const runtimeApiConfig = getRuntimeApiConfig();
    const apiBaseUrl = runtimeApiConfig.apiBaseUrl.replace(/\/+$/, '');
    const normalizedSubject = subject ? normalizeSubjectKey(subject) : null;

    const query = new URLSearchParams({
      mode: 'sample',
      grade: String(grade),
    });

    if (runtimeApiConfig.countryCode) query.set('country', runtimeApiConfig.countryCode);
    if (runtimeApiConfig.exam) query.set('exam', runtimeApiConfig.exam);
    if (normalizedSubject) query.set('subject', normalizedSubject);
    if (options.period) query.set('period', String(options.period));
    if (options.limit) query.set('limit', String(options.limit));
    if (options.seed) query.set('seed', options.seed);

    try {
      const apiResponse = await fetch(`${apiBaseUrl}/questions?${query.toString()}`);
      if (apiResponse.ok) {
        const payload = await apiResponse.json();
        const rawQuestions = Array.isArray(payload?.questions) ? payload.questions : [];
        const isSampleMode = payload?.meta?.mode === 'sample';

        const appQuestions: AppQuestion[] = rawQuestions.map((q: any) => {
          const qSubject = normalizeSubjectKey(q.subject || payload?.meta?.subject || subject || 'unknown');
          if (q.options?.length && !q.options[0].id) {
            q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A', 'B', 'C', 'D', 'E'][i] || String(i) }));
          }
          return transformQuestion(q, grade, qSubject);
        });

        let processed = excludeQuarantinedAppQuestions(appQuestions);
        if (normalizedSubject) {
          processed = filterSubject(processed, normalizedSubject);
        }

        if (isSampleMode || payload?.meta?.mode) {
          return { questions: processed, meta: payload.meta || {} };
        }
      }
    } catch (err) {
      console.warn('[fetchSample] Error fetching sample, falling back', err);
    }

    // Fallback if no meta.mode or request failed
    let questions: AppQuestion[] = [];
    if (normalizedSubject) {
      questions = await fetchQuestions(grade, normalizedSubject, 1, options.period);
    } else {
      questions = await fetchAllQuestionsForGrade(grade, true, options.limit || 300, options.period);
    }
    return { questions, meta: {} };
  }
};

export async function fetchQuestionsForGrade(grade: number, maxQuestions: number = 150): Promise<AppQuestion[]> {
  return fetchAllQuestionsForGrade(grade, true, maxQuestions);
}
