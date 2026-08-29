import { describe, it, expect, vi } from 'vitest';
import { fetchQuestionsFromPacks } from '../../src/lib/pack-fetcher';
import { fetchAllQuestionsForGrade, fetchQuestions } from '../../src/lib/api-service';

describe('Period mode multi-week question fetching', () => {
  it('passes period parameter and fetches multi-week candidates', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (info: RequestInfo | URL) => {
      const urlStr = info.toString();
      if (urlStr.includes('/questions?')) {
        return new Response(JSON.stringify({
          success: true,
          questions: [
            {
              id: 'Q-P4-1',
              statement: 'Pregunta Periodo 4',
              options: [
                { letter: 'A', text: 'Op 1', is_correct: true },
                { letter: 'B', text: 'Op 2', is_correct: false }
              ],
              correct_answer: 'A',
              subject: 'matematicas',
              periodo: 35
            }
          ],
          total_questions: 1,
          meta: { available_questions: 1 }
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not Found', { status: 404 });
    });

    const questions = await fetchQuestionsFromPacks(11, 'matematicas', 1, 4);
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0].id).toBe('Q-P4-1');

    expect(fetchSpy).toHaveBeenCalled();
    const calledUrl = fetchSpy.mock.calls.find(call => call[0].toString().includes('/questions?'))?.[0].toString();
    expect(calledUrl).toContain('period=4');

    fetchSpy.mockRestore();
  });
});
