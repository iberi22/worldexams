/**
 * audit_periods.js - Script to audit period metadata in question bundles
 *
 * This script scans all question bundles and generates a report:
 * 1. Lists all bundles with their period field (or missing)
 * 2. Identifies bundles that need period metadata added
 * 3. Outputs a CSV for bulk editing
 *
 * Usage: node scripts/audit_periods.js
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');
const OUTPUT_FILE = path.join(__dirname, '../period_audit_report.csv');
const JSON_OUTPUT = path.join(__dirname, '../period_audit_report.json');

// Colors for console output
const c = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

// Collect all markdown files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md') && !['README.md', 'PROTOCOL.md', 'LICENSE.md', '_index.md'].includes(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Count questions in a file body
function countQuestions(body) {
  const matches = body.match(/^## (?:Pregunta|Question) \d+/gm);
  return matches ? matches.length : 1; // At least 1 for single-question files
}

// Extract topic from path or frontmatter
function extractTopic(filePath, data) {
  if (data.tema) return data.tema;
  // Try to infer from path: /questions/[country]/[subject]/grado-[N]/[topic]/
  const parts = filePath.split(path.sep);
  const gradoIdx = parts.findIndex(p => p.startsWith('grado-'));
  if (gradoIdx >= 0 && parts[gradoIdx + 1]) {
    return parts[gradoIdx + 1];
  }
  return 'UNKNOWN';
}

function main() {
  console.log(`${c.blue}╔════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.blue}║   PERIOD METADATA AUDIT                            ║${c.reset}`);
  console.log(`${c.blue}╚════════════════════════════════════════════════════╝${c.reset}\n`);

  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`${c.red}Error: Questions directory not found at ${QUESTIONS_DIR}${c.reset}`);
    process.exit(1);
  }

  const files = getAllFiles(QUESTIONS_DIR);
  console.log(`${c.cyan}Found ${files.length} markdown files to audit.${c.reset}\n`);

  const results = [];
  let withPeriod = 0;
  let withoutPeriod = 0;
  let totalQuestions = 0;

  // Stats by grade
  const gradeStats = {};
  // Stats by subject
  const subjectStats = {};

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);
      const relativePath = path.relative(QUESTIONS_DIR, filePath);
      const qCount = countQuestions(body);
      totalQuestions += qCount;

      const entry = {
        file: relativePath,
        id: data.id || 'N/A',
        grado: data.grado ?? 'N/A',
        asignatura: data.asignatura || data.subject || 'N/A',
        tema: extractTopic(filePath, data),
        periodo: data.periodo ?? null,
        protocol_version: data.protocol_version || '2.0',
        total_questions: qCount,
        estado: data.estado || 'draft',
        needs_period: !data.periodo,
      };

      results.push(entry);

      if (data.periodo) {
        withPeriod++;
      } else {
        withoutPeriod++;
      }

      // Stats by grade
      const gradeKey = String(data.grado || 'UNKNOWN');
      if (!gradeStats[gradeKey]) gradeStats[gradeKey] = { total: 0, withPeriod: 0, withoutPeriod: 0, questions: 0 };
      gradeStats[gradeKey].total++;
      gradeStats[gradeKey].questions += qCount;
      if (data.periodo) gradeStats[gradeKey].withPeriod++;
      else gradeStats[gradeKey].withoutPeriod++;

      // Stats by subject
      const subjKey = (data.asignatura || data.subject || 'UNKNOWN').toLowerCase();
      if (!subjectStats[subjKey]) subjectStats[subjKey] = { total: 0, withPeriod: 0, withoutPeriod: 0, questions: 0 };
      subjectStats[subjKey].total++;
      subjectStats[subjKey].questions += qCount;
      if (data.periodo) subjectStats[subjKey].withPeriod++;
      else subjectStats[subjKey].withoutPeriod++;

    } catch (err) {
      console.error(`${c.red}Error reading ${filePath}: ${err.message}${c.reset}`);
    }
  });

  // Summary
  console.log(`${c.green}═══════════════════════════════════════${c.reset}`);
  console.log(`${c.green}SUMMARY${c.reset}`);
  console.log(`${c.green}═══════════════════════════════════════${c.reset}`);
  console.log(`Total Files:          ${files.length}`);
  console.log(`Total Questions:      ${c.cyan}${totalQuestions}${c.reset}`);
  console.log(`With Period Metadata: ${c.green}${withPeriod}${c.reset} (${((withPeriod / files.length) * 100).toFixed(1)}%)`);
  console.log(`Missing Period:       ${c.yellow}${withoutPeriod}${c.reset} (${((withoutPeriod / files.length) * 100).toFixed(1)}%)`);

  // By Grade
  console.log(`\n${c.blue}BY GRADE:${c.reset}`);
  Object.keys(gradeStats).sort((a, b) => Number(a) - Number(b)).forEach(grade => {
    const s = gradeStats[grade];
    const pct = ((s.withoutPeriod / s.total) * 100).toFixed(0);
    const bar = '█'.repeat(Math.round(s.withPeriod / s.total * 10)) + '░'.repeat(10 - Math.round(s.withPeriod / s.total * 10));
    console.log(`  Grado ${grade.padStart(2)}: ${bar} ${s.withPeriod}/${s.total} bundles (${s.questions} Q) ${s.withoutPeriod > 0 ? c.yellow + '⚠ ' + s.withoutPeriod + ' missing' + c.reset : c.green + '✓' + c.reset}`);
  });

  // By Subject
  console.log(`\n${c.blue}BY SUBJECT:${c.reset}`);
  Object.keys(subjectStats).sort().forEach(subj => {
    const s = subjectStats[subj];
    const bar = '█'.repeat(Math.round(s.withPeriod / s.total * 10)) + '░'.repeat(10 - Math.round(s.withPeriod / s.total * 10));
    console.log(`  ${subj.padEnd(20)}: ${bar} ${s.withPeriod}/${s.total} (${s.questions} Q) ${s.withoutPeriod > 0 ? c.yellow + '⚠ ' + s.withoutPeriod + c.reset : c.green + '✓' + c.reset}`);
  });

  // List files missing period (first 20)
  const missing = results.filter(r => r.needs_period);
  console.log(`\n${c.yellow}BUNDLES MISSING PERIOD (first 20):${c.reset}`);
  missing.slice(0, 20).forEach(r => {
    console.log(`  ${c.dim}G${r.grado} ${r.asignatura}${c.reset} → ${r.file}`);
  });
  if (missing.length > 20) {
    console.log(`  ${c.dim}... and ${missing.length - 20} more${c.reset}`);
  }

  // Write CSV
  const csvHeader = 'file,id,grado,asignatura,tema,periodo,protocol_version,total_questions,estado,needs_period\n';
  const csvRows = results.map(r =>
    `"${r.file}","${r.id}","${r.grado}","${r.asignatura}","${r.tema}","${r.periodo || ''}","${r.protocol_version}","${r.total_questions}","${r.estado}","${r.needs_period}"`
  ).join('\n');
  fs.writeFileSync(OUTPUT_FILE, csvHeader + csvRows, 'utf8');
  console.log(`\n${c.green}✅ CSV Report saved to: ${OUTPUT_FILE}${c.reset}`);

  // Write JSON
  const jsonReport = {
    generated_at: new Date().toISOString(),
    summary: {
      total_files: files.length,
      total_questions: totalQuestions,
      with_period: withPeriod,
      without_period: withoutPeriod,
      coverage_percent: ((withPeriod / files.length) * 100).toFixed(1)
    },
    by_grade: gradeStats,
    by_subject: subjectStats,
    files_missing_period: missing.map(r => ({
      file: r.file,
      grado: r.grado,
      asignatura: r.asignatura,
      tema: r.tema,
      questions: r.total_questions
    }))
  };
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(jsonReport, null, 2), 'utf8');
  console.log(`${c.green}✅ JSON Report saved to: ${JSON_OUTPUT}${c.reset}`);

  console.log(`\n${c.blue}Done! Review the reports to plan recataloging.${c.reset}`);
}

main();
