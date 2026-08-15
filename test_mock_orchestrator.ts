import { prepareSoloExamQuestions } from './saberparatodos/src/lib/questions/orchestrator.js';

async function run() {
  try {
    const deps = {
      repository: {
        fetchEnglishQuestionsAllGrades: async (limit, random, cefr) => {
          return [
            {
              id: 'CO-ING-11-2026-W33-conflict-resolution-001',
              text: 'In the context of conflict resolution...',
              category: 'ingles',
              cefr_level: 'C1+',
              grade: 11,
              options: [
                { id: 'A', text: 'exacerbate', feedback: 'Correct' },
                { id: 'B', text: 'mitigate', feedback: 'Incorrect' },
                { id: 'C', text: 'ameliorate', feedback: 'Incorrect' },
                { id: 'D', text: 'pacify', feedback: 'Incorrect' }
              ],
              correctOptionId: 'A'
            }
          ];
        },
        fetchBulkQuestions: async () => [],
      },
      filterUnansweredQuestions: true
    };
    
    const request = {
      grade: 11,
      countryCode: 'co',
      subject: 'Inglés Diagnóstico',
      count: 1, // Only 1 question requested!
      useDiagnostic: false,
      diagnosticMixPercent: 20,
      examMode: 'simulacro',
      period: 1,
      englishDiagnostic: true,
      minCefrLevel: 'C1',
      strictPeriod: true
    };

    const result = await prepareSoloExamQuestions(request, deps as any, []);
    console.log("Success! Questions:", result.selectedQuestions.length);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
