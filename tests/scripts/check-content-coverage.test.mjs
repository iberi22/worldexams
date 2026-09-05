import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
  mapPeriodoToPeriod,
  normalizeSubject,
  parseArgs,
  runCoverageCheck,
  formatAsciiTable,
} from "../../saberparatodos/scripts/check-content-coverage.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..", "..");

test("mapPeriodoToPeriod maps explicit periods and week numbers correctly", () => {
  // Explicit periods
  assert.equal(mapPeriodoToPeriod(1), 1);
  assert.equal(mapPeriodoToPeriod(2), 2);
  assert.equal(mapPeriodoToPeriod(3), 3);
  assert.equal(mapPeriodoToPeriod(4), 4);

  // Weeks W01 - W10 -> Period 1
  assert.equal(mapPeriodoToPeriod(1), 1);
  assert.equal(mapPeriodoToPeriod(5), 1);
  assert.equal(mapPeriodoToPeriod(10), 1);

  // Weeks W11 - W20 -> Period 2 (specifically W12 requirement)
  assert.equal(mapPeriodoToPeriod(11), 2);
  assert.equal(mapPeriodoToPeriod(12), 2);
  assert.equal(mapPeriodoToPeriod(20), 2);

  // Weeks W21 - W30 -> Period 3
  assert.equal(mapPeriodoToPeriod(21), 3);
  assert.equal(mapPeriodoToPeriod(30), 3);

  // Weeks W31 - W40 -> Period 4 (specifically W35 requirement)
  assert.equal(mapPeriodoToPeriod(31), 4);
  assert.equal(mapPeriodoToPeriod(35), 4);
  assert.equal(mapPeriodoToPeriod(40), 4);

  // Invalid / missing
  assert.equal(mapPeriodoToPeriod(null), null);
  assert.equal(mapPeriodoToPeriod(undefined), null);
  assert.equal(mapPeriodoToPeriod("invalid"), null);
});

test("normalizeSubject maps subject variants to canonical names", () => {
  assert.equal(normalizeSubject("Matemáticas"), "matematicas");
  assert.equal(normalizeSubject("matematica"), "matematicas");
  assert.equal(normalizeSubject("Lectura Crítica"), "lectura-critica");
  assert.equal(normalizeSubject("lenguaje"), "lectura-critica");
  assert.equal(normalizeSubject("Inglés"), "ingles");
  assert.equal(normalizeSubject("english"), "ingles");
  assert.equal(normalizeSubject("Ciencias Naturales"), "ciencias-naturales");
  assert.equal(normalizeSubject("Sociales y Ciudadanas"), "sociales-ciudadanas");
});

test("parseArgs parses CLI arguments correctly", () => {
  const parsed = parseArgs([
    "--country=colombia",
    "--min-questions=15",
    "--json",
    "--source=md",
    "--dir=/tmp/fixtures",
  ]);

  assert.equal(parsed.country, "colombia");
  assert.equal(parsed.minQuestions, 15);
  assert.equal(parsed.json, true);
  assert.equal(parsed.source, "md");
  assert.equal(parsed.dir, "/tmp/fixtures");
});

test("Case 1: Full matrix coverage returns success=true and exit code 0", async () => {
  const tmpDir = fs.mkdtempSync(path.join(ROOT, "tmp-coverage-full-"));
  try {
    const grades = [3, 5, 6, 7, 8, 9, 10, 11];
    const subjects = [
      "matematicas",
      "lectura-critica",
      "ingles",
      "ciencias-naturales",
      "sociales-ciudadanas",
    ];
    const periods = [1, 2, 3, 4];

    // Create fixture JSON packs covering all (grade, subject, period) with 20 questions each
    for (const g of grades) {
      for (const s of subjects) {
        for (const p of periods) {
          const week = (p - 1) * 10 + 1;
          const fileName = `co-week-${week}-grade-${g}-subject-${s}.json`;
          const questions = Array.from({ length: 20 }, (_, idx) => ({
            id: `Q-${g}-${s}-P${p}-${idx + 1}`,
            statement: "Pregunta test",
            grade: g,
            subject: s,
            periodo: p,
          }));

          const fileContent = {
            metadata: { grade: g, subject: s, country: "co" },
            questions,
          };

          fs.writeFileSync(
            path.join(tmpDir, fileName),
            JSON.stringify(fileContent, null, 2)
          );
        }
      }
    }

    const report = await runCoverageCheck({
      country: "colombia",
      minQuestions: 20,
      source: "packs",
      dir: tmpDir,
    });

    assert.equal(report.success, true);
    assert.equal(report.gapCount, 0);
    assert.equal(report.okCount, 160); // 8 grades * 5 subjects * 4 periods

    const formattedTable = formatAsciiTable(report);
    assert.ok(formattedTable.includes("OK Cobertura completa"));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("Case 2: Gap in (grado, materia, periodo) returns success=false and lists the gap", async () => {
  const tmpDir = fs.mkdtempSync(path.join(ROOT, "tmp-coverage-gap-"));
  try {
    const grades = [3, 5, 6, 7, 8, 9, 10, 11];
    const subjects = [
      "matematicas",
      "lectura-critica",
      "ingles",
      "ciencias-naturales",
      "sociales-ciudadanas",
    ];
    const periods = [1, 2, 3, 4];

    // Populate all except Grade 11 - Matematicas - Period 2
    for (const g of grades) {
      for (const s of subjects) {
        for (const p of periods) {
          if (g === 11 && s === "matematicas" && p === 2) {
            continue; // Intentional GAP
          }

          const week = (p - 1) * 10 + 1;
          const fileName = `co-week-${week}-grade-${g}-subject-${s}.json`;
          const questions = Array.from({ length: 20 }, (_, idx) => ({
            id: `Q-${g}-${s}-P${p}-${idx + 1}`,
            grade: g,
            subject: s,
            periodo: p,
          }));

          fs.writeFileSync(
            path.join(tmpDir, fileName),
            JSON.stringify({ metadata: { grade: g, subject: s }, questions }, null, 2)
          );
        }
      }
    }

    const report = await runCoverageCheck({
      country: "colombia",
      minQuestions: 20,
      source: "packs",
      dir: tmpDir,
    });

    assert.equal(report.success, false);
    assert.equal(report.gapCount, 1);
    assert.equal(report.gaps[0].grade, 11);
    assert.equal(report.gaps[0].subject, "matematicas");
    assert.equal(report.gaps[0].period, 2);
    assert.equal(report.gaps[0].count, 0);

    const formattedTable = formatAsciiTable(report);
    assert.ok(formattedTable.includes("FAIL Cobertura incompleta"));
    assert.ok(formattedTable.includes("Grado 11, Materia matematicas, Periodo 2: 0/20 preguntas"));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("Case 3: Week W12 maps to Period 2 in fixture directory", async () => {
  const tmpDir = fs.mkdtempSync(path.join(ROOT, "tmp-coverage-w12-"));
  try {
    // Create pack file named co-week-12-grade-11-subject-matematicas.json containing 25 questions with week 12
    const fileName = "co-week-12-grade-11-subject-matematicas.json";
    const questions = Array.from({ length: 25 }, (_, idx) => ({
      id: `CO-MAT-11-W12-Q${idx + 1}`,
      grade: 11,
      subject: "matematicas",
      periodo: 12,
    }));

    fs.writeFileSync(
      path.join(tmpDir, fileName),
      JSON.stringify({ questions }, null, 2)
    );

    const report = await runCoverageCheck({
      country: "colombia",
      minQuestions: 20,
      source: "packs",
      dir: tmpDir,
    });

    const p2Cell = report.results.find(
      (r) => r.grade === 11 && r.subject === "matematicas" && r.period === 2
    );

    assert.ok(p2Cell, "Period 2 cell for Grade 11 Matematicas should exist");
    assert.equal(p2Cell.count, 25, "Questions with W12/periodo 12 should map to Period 2");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("CLI execution with fixtures directory triggers expected exit codes", () => {
  const tmpDir = fs.mkdtempSync(path.join(ROOT, "tmp-coverage-cli-"));
  const scriptPath = path.join(ROOT, "saberparatodos", "scripts", "check-content-coverage.mjs");

  try {
    // Empty directory CLI run should fail (exit code 1)
    let exitCode = 0;
    try {
      execSync(`node "${scriptPath}" --country=colombia --dir="${tmpDir}"`, {
        cwd: ROOT,
        stdio: "pipe",
      });
    } catch (err) {
      exitCode = err.status;
      const stderr = err.stdout ? err.stdout.toString() : "";
      assert.ok(stderr.includes("FAIL Cobertura incompleta"));
    }
    assert.equal(exitCode, 1, "CLI should exit code 1 when coverage gaps exist");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
