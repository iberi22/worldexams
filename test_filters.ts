import { filterByPeriod } from "./saberparatodos/src/lib/questions/filters.ts";
import { transformQuestion } from "./saberparatodos/src/lib/question-transformer.ts";

const apiQ = {
  "id": "CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v1",
  "statement": "Test",
  "periodo": 1,
  "subject": "matematicas",
  "grade": 11,
  "country": "co"
};

const appQ = transformQuestion(apiQ, 11, "matematicas");
console.log("Transformed Q periodo:", appQ.periodo);

const filtered = filterByPeriod([appQ], {
  examMode: 'period',
  period: 1,
  subject: "matematicas",
  grade: 11
});

console.log("Filtered count:", filtered.length);
