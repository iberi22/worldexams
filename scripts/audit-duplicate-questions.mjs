#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildCorpusHashMap, rel } from './validate-bundles-v52.mjs';

const ROOT = process.cwd();

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('-MASTERY-bundle.md')) out.push(full);
  }
  return out;
}

export function runDuplicateAudit(questionsDir = path.join(ROOT, 'questions_data')) {
  const files = walk(questionsDir);
  const corpusHashMap = buildCorpusHashMap(files);

  let totalQuestions = 0;
  let duplicateGroups = 0;
  let redundantQuestions = 0;
  const groups = [];

  for (const [hash, locations] of corpusHashMap.entries()) {
    totalQuestions += locations.length;
    if (locations.length > 1) {
      duplicateGroups += 1;
      redundantQuestions += locations.length - 1;
      groups.push({
        hash,
        count: locations.length,
        locations,
      });
    }
  }

  groups.sort((a, b) => b.count - a.count);

  const percentage = totalQuestions > 0 ? ((redundantQuestions / totalQuestions) * 100).toFixed(2) : '0.00';

  return {
    bundles: files.length,
    total_questions: totalQuestions,
    duplicate_groups: duplicateGroups,
    redundant_questions: redundantQuestions,
    redundant_percentage: Number(percentage),
    groups,
  };
}

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMainModule) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      json: { type: 'boolean', default: false },
      fail: { type: 'boolean', default: false },
      limit: { type: 'string', default: '10' },
    },
    allowPositionals: true,
  });

  const auditResult = runDuplicateAudit();

  if (values.json) {
    console.log(JSON.stringify(auditResult, null, 2));
  } else {
    console.log('=== AUDIT DUPLICATE QUESTIONS CORPUS REPORT ===');
    console.log(`bundles: ${auditResult.bundles}`);
    console.log(`total_questions: ${auditResult.total_questions}`);
    console.log(`duplicate_groups: ${auditResult.duplicate_groups}`);
    console.log(`redundant_questions: ${auditResult.redundant_questions} (${auditResult.redundant_percentage}%)`);

    const limit = Number(values.limit) || 10;
    console.log(`\nTop ${Math.min(limit, auditResult.groups.length)} duplicated groups:`);
    for (const g of auditResult.groups.slice(0, limit)) {
      console.log(`\n- Hash: ${g.hash} (${g.count}x)`);
      for (const loc of g.locations.slice(0, 5)) {
        console.log(`    ${loc.file}:${loc.qNum} (${loc.qId})`);
      }
      if (g.locations.length > 5) {
        console.log(`    ... and ${g.locations.length - 5} more locations`);
      }
    }
  }

  if (values.fail && auditResult.redundant_questions > 0) {
    process.exit(1);
  }
}
