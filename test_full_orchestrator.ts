import { prepareSoloExamQuestions } from './saberparatodos/src/lib/questions/orchestrator.js';
import { fetchEnglishQuestionsAllGrades } from './saberparatodos/src/lib/api-service.js';

// mock out process env
process.env.PUBLIC_COUNTRY = 'co';

async function run() {
  try {
    const deps = {
      repository: {
        fetchEnglishQuestionsAllGrades: async (limit, random, cefr) => {
          return await fetchEnglishQuestionsAllGrades(limit, random, cefr);
        },
        fetchBulkQuestions: async () => [],
      },
      filterUnansweredQuestions: true
    };
    
    // Inject import.meta mock to fix the config issue
    globalThis.import = { meta: { env: { PUBLIC_COUNTRY: 'co', PUBLIC_API_BASE_URL: 'http://localhost:3000/v1' } } } as any;

    const request = {
      grade: 11,
      countryCode: 'co',
      subject: 'Inglés Diagnóstico',
      count: 10,
      useDiagnostic: false,
      diagnosticMixPercent: 20,
      examMode: 'simulacro',
      period: 1,
      englishDiagnostic: true,
      minCefrLevel: 'C1',
      strictPeriod: true
    };

    const result = await prepareSoloExamQuestions(request, deps, []);
    console.log("Success! Questions:", result.selectedQuestions.length);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
