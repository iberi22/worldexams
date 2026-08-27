import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import {
  parseArgs,
  buildFullGradePack,
  parseQuestions,
  readMarkdownWithFrontmatter,
} from "../../scripts/build-full-grade-packs.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..", "..");

test("parseArgs parses --country and --grade arguments correctly", () => {
  const args1 = parseArgs(["node", "script", "--country", "co", "--grade", "11"]);
  assert.equal(args1.country, "co");
  assert.equal(args1.grade, 11);

  const args2 = parseArgs(["node", "script", "--country=mx", "--grade=10"]);
  assert.equal(args2.country, "mx");
  assert.equal(args2.grade, 10);

  const argsDefault = parseArgs(["node", "script"]);
  assert.equal(argsDefault.country, "co");
  assert.equal(argsDefault.grade, 11);
});

test("parseQuestions parses question fields properly from markdown content", () => {
  const sampleMd = `---
bundle_version: 5
grado: 11
asignatura: matematicas
---

## Pregunta 1 [D3]
**ID:** \`CO-MAT-11-Q001\`
### Contexto
Este es un texto de contexto.

### Enunciado
¿Cuál es la respuesta correcta?

### Opciones
- [x] Opción A: primera
  <!-- feedback: Excelente -->
- [ ] Opción B: segunda
  <!-- feedback: Incorrecto -->

### Explicación
La respuesta es A.
`;

  const { content } = readMarkdownWithFrontmatter(sampleMd);
  const questions = parseQuestions(content);

  assert.equal(questions.length, 1);
  assert.equal(questions[0].id, "CO-MAT-11-Q001");
  assert.equal(questions[0].context, "Este es un texto de contexto.");
  assert.equal(questions[0].statement, "¿Cuál es la respuesta correcta?");
  assert.equal(questions[0].correct_answer, "A");
  assert.equal(questions[0].options.length, 2);
  assert.equal(questions[0].options[0].feedback, "Excelente");
  assert.equal(questions[0].explanation, "La respuesta es A.");
});

test("buildFullGradePack aggregates and deduplicates questions", () => {
  const pack = buildFullGradePack({ country: "co", grade: 11 });

  assert.equal(pack.country, "co");
  assert.equal(pack.grade, 11);
  assert.equal(pack.version, "5.2");
  assert.equal(typeof pack.generated_at, "number");
  assert.ok(pack.total_questions > 0, "total_questions should be > 0");
  assert.ok(Array.isArray(pack.subjects) && pack.subjects.length > 0);
  assert.equal(pack.questions.length, pack.total_questions);

  const questionIds = pack.questions.map((q) => q.id);
  const uniqueIds = new Set(questionIds);
  assert.equal(questionIds.length, uniqueIds.size, "Questions must be deduplicated by ID");
});

test("CLI execution produces valid JSON grade pack file", () => {
  const scriptPath = path.join(ROOT, "scripts", "build-full-grade-packs.mjs");
  const outputPath = path.join(
    ROOT,
    "apps",
    "worldexams-api",
    "public",
    "v1",
    "grades",
    "co-grado-11-full.json"
  );

  execSync(`node "${scriptPath}" --country co --grade 11`, { cwd: ROOT });

  assert.ok(fs.existsSync(outputPath), "Output JSON file should exist");
  const rawData = fs.readFileSync(outputPath, "utf8");
  const json = JSON.parse(rawData);

  assert.equal(json.country, "co");
  assert.equal(json.grade, 11);
  assert.equal(json.version, "5.2");
  assert.ok(json.total_questions > 0);
  assert.ok(json.questions.length > 0);
  assert.equal(json.questions.length, json.total_questions);
});
