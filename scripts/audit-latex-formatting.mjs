import fs from 'fs';
import path from 'path';
import katex from '../saberparatodos/node_modules/katex/dist/katex.mjs';

const BLOCK_MATH_REGEX = /\$\$([\s\S]*?)\$\$/g;
const INLINE_MATH_REGEX = /(?<!\\)(?<![\d\w])\$([^\$\n]+?)\$(?![\d\w])/g;
const ESCAPED_HTML_ENTITY_REGEX = /&(?:lt|gt|amp|quot|#039);/g;

function findQuestionFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', '.astro'].includes(entry.name)) {
        results = results.concat(findQuestionFiles(res));
      }
    } else {
      if (entry.name.endsWith('.md') || entry.name.endsWith('.json')) {
        results.push(res);
      }
    }
  }
  return results;
}

function extractTextsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (filePath.endsWith('.json')) {
    try {
      const parsed = JSON.parse(content);
      // Collect all string values from JSON object recursively
      const strings = [];
      const collect = (obj) => {
        if (typeof obj === 'string') {
          strings.push(obj);
        } else if (Array.isArray(obj)) {
          for (const item of obj) collect(item);
        } else if (obj && typeof obj === 'object') {
          for (const key of Object.keys(obj)) collect(obj[key]);
        }
      };
      collect(parsed);
      return strings;
    } catch {
      return [content];
    }
  }
  return [content];
}

function checkLatexInText(text, filePath) {
  const issues = [];

  const processMatch = (type, match, latex) => {
    // Check for escaped HTML entities in LaTeX expressions
    if (ESCAPED_HTML_ENTITY_REGEX.test(latex)) {
      issues.push({
        type: 'escaped_entity',
        filePath,
        mathType: type,
        expression: match,
        latex,
        reason: 'Contains escaped HTML entities (&lt;, &gt;, etc.)'
      });
    }

    // Check KaTeX parse errors
    try {
      katex.renderToString(latex.trim(), {
        displayMode: type === 'block',
        throwOnError: true,
        strict: false
      });
    } catch (e) {
      issues.push({
        type: 'katex_error',
        filePath,
        mathType: type,
        expression: match,
        latex,
        reason: e.message || String(e)
      });
    }
  };

  let blockMatch;
  while ((blockMatch = BLOCK_MATH_REGEX.exec(text)) !== null) {
    processMatch('block', blockMatch[0], blockMatch[1]);
  }

  let inlineMatch;
  while ((inlineMatch = INLINE_MATH_REGEX.exec(text)) !== null) {
    processMatch('inline', inlineMatch[0], inlineMatch[1]);
  }

  return issues;
}

function runAudit() {
  console.log('🔍 Starting LaTeX Formatting & Entity Audit Harness...');

  const searchDirs = ['questions_data', 'apps/worldexams-api/public/v1'];
  let files = [];
  for (const dir of searchDirs) {
    files = files.concat(findQuestionFiles(dir));
  }

  console.log(`📁 Found ${files.length} question file(s) to scan.`);

  let totalIssues = 0;
  let fileCountWithIssues = 0;

  for (const filePath of files) {
    try {
      const texts = extractTextsFromFile(filePath);
      let fileIssues = [];
      for (const text of texts) {
        fileIssues = fileIssues.concat(checkLatexInText(text, filePath));
      }

      if (fileIssues.length > 0) {
        fileCountWithIssues++;
        totalIssues += fileIssues.length;
        console.error(`❌ [${filePath}] Found ${fileIssues.length} issue(s):`);
        for (const issue of fileIssues) {
          console.error(`  - [${issue.mathType.toUpperCase()}] ${issue.reason}`);
          console.error(`    Expr: ${issue.expression.slice(0, 80)}`);
        }
      }
    } catch (err) {
      console.error(`⚠️ Could not read file ${filePath}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`Audit Summary:`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Files with issues:   ${fileCountWithIssues}`);
  console.log(`Total LaTeX errors:  ${totalIssues}`);
  console.log('========================================\n');

  if (totalIssues > 0) {
    console.error(`❌ Audit failed with ${totalIssues} LaTeX error(s).`);
    process.exit(1);
  } else {
    console.log(`✅ Audit passed cleanly (0 LaTeX syntax errors).`);
    process.exit(0);
  }
}

runAudit();
