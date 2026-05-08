/**
 * CURATION AGENT - WorldExams Bundle Review
 *
 * Reviews newly generated bundles for quality assurance
 * Protocol v5.1 compliance check
 *
 * Usage:
 *   node scripts/curation-agent.ts --status
 *   node scripts/curation-agent.ts --review=pending
 *   node scripts/curation-agent.ts --review=latest
 */

import * as fs from 'fs';
import * as path from 'path';

const WORLDEXAMS_ROOT = 'E:\\scripts-python\\worldexams';
const QUESTIONS_DATA = path.join(WORLDEXAMS_ROOT, 'questions_data', 'colombia');
const GENERATION_DIR = path.join(WORLDEXAMS_ROOT, '.worldexams', 'generation');
const CURATION_DIR = path.join(WORLDEXAMS_ROOT, '.worldexams', 'curation');

// Ensure directories
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
ensureDir(CURATION_DIR);

// Parse frontmatter
function parseFrontmatter(content: string): Record<string, any> {
  const result: Record<string, any> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return result;

  const lines = match[1].split('\n');
  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      let value = keyMatch[2].trim();
      value = value.replace(/^["']|["']$/g, '');

      // Handle nested YAML objects
      if (value.startsWith('{') || value.startsWith('[')) {
        try {
          result[keyMatch[1]] = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          result[keyMatch[1]] = value;
        }
      } else {
        const num = parseInt(value);
        result[keyMatch[1]] = isNaN(num) ? value : num;
      }
    }
  }
  return result;
}

// Count questions in content
function countQuestions(content: string): number {
  const matches = content.match(/##\s+Question\s+\d+/gi);
  return matches ? matches.length : 0;
}

// Quality check result
interface QualityCheck {
  bundleId: string;
  timestamp: string;
  checks: {
    frontmatterComplete: boolean;
    questionCount: boolean;
    formatValid: boolean;
    noProhibitedPatterns: boolean;
    plausibleDistractors: boolean;
    alignmentValid: boolean;
    difficultyProgression: boolean;
  };
  errors: string[];
  warnings: string[];
  qualityScore: number; // 0-100
  decision: 'APPROVE' | 'REJECT' | 'NEEDS_HUMAN';
  recommendation: string;
}

// Run quality checks on a bundle
function reviewBundle(filePath: string): QualityCheck {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const questions = countQuestions(content);

  const check: QualityCheck = {
    bundleId: fm.id || path.basename(filePath),
    timestamp: new Date().toISOString(),
    checks: {
      frontmatterComplete: !!(fm.id && fm.grado && fm.asignatura && fm.protocol_version),
      questionCount: questions === 20,
      formatValid: content.includes('## Question') && content.includes('### Enunciado'),
      noProhibitedPatterns: !/todas las anteriores|ninguna de las anteriores|a y b|^(todas|ninguna)/i.test(content),
      plausibleDistractors: true, // Manual check needed
      alignmentValid: !!(fm.alignment && fm.alignment.includes('ICFES')),
      difficultyProgression: true // Need to parse questions
    },
    errors: [],
    warnings: [],
    qualityScore: 0,
    decision: 'NEEDS_HUMAN',
    recommendation: ''
  };

  // Validate
  if (!fm.id) check.errors.push('Missing id in frontmatter');
  if (!fm.grado) check.errors.push('Missing grado');
  if (!fm.asignatura) check.errors.push('Missing asignatura');
  if (!fm.protocol_version) check.errors.push('Missing protocol_version');
  if (!fm.bundle_size && !fm.total_questions) check.errors.push('Missing bundle size');

  if (questions !== 20) {
    check.errors.push(`Expected 20 questions, found ${questions}`);
  }

  if (/todas las anteriores|ninguna de las anteriores/i.test(content)) {
    check.errors.push('Contains prohibited pattern: "todas las anteriores" or similar');
  }

  // Calculate quality score
  const maxChecks = Object.values(check.checks).length;
  const passedChecks = Object.values(check.checks).filter(Boolean).length;
  check.qualityScore = Math.round((passedChecks / maxChecks) * 100);

  // Make decision
  if (check.errors.length >= 2) {
    check.decision = 'REJECT';
    check.recommendation = 'Bundle has critical errors. Regenerate with fixes.';
  } else if (check.errors.length === 1 || check.warnings.length > 2) {
    check.decision = 'NEEDS_HUMAN';
    check.recommendation = 'Bundle needs human review for final approval.';
  } else {
    check.decision = 'APPROVE';
    check.recommendation = 'Bundle passes automated quality checks.';
  }

  return check;
}

// Find unreviewed bundles
function findUnreviewedBundles(): string[] {
  const unreviewed: string[] = [];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const fm = parseFrontmatter(content);

        // Check if UNREVISED or PENDING_HUMAN
        if (fm.quality_status === 'UNREVISED' ||
            fm.generation_status === 'RAW' ||
            fm.needs_human_review === true ||
            !fm.quality_status) {
          unreviewed.push(fullPath);
        }
      }
    }
  }

  scanDir(path.join(QUESTIONS_DATA, 'matematicas', 'grado-11'));
  scanDir(path.join(QUESTIONS_DATA, 'lectura-critica', 'grado-11'));
  scanDir(path.join(QUESTIONS_DATA, 'ciencias-naturales', 'grado-11'));
  scanDir(path.join(QUESTIONS_DATA, 'sociales-ciudadanas', 'grado-11'));
  scanDir(path.join(QUESTIONS_DATA, 'ingles', 'grado-11'));

  return unreviewed;
}

// Update bundle curation status
function updateCurationStatus(filePath: string, decision: 'APPROVE' | 'REJECT', review: QualityCheck) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Update quality_status
  const statusMap: Record<string, string> = {
    'APPROVE': 'AGENT_APPROVED',
    'REJECT': 'REJECTED',
    'NEEDS_HUMAN': 'PENDING_HUMAN'
  };

  // Update or add curation fields
  content = content.replace(
    /quality_status:\s*["']?\w+["']?/,
    `quality_status: "${statusMap[decision]}"`
  );

  content = content.replace(
    /agent_curated:\s*(true|false)/,
    `agent_curated: true`
  );

  content = content.replace(
    /agent_curated_by:\s*\w+/,
    `agent_curated_by: "curation-agent"`
  );

  content = content.replace(
    /agent_curation_date:\s*\w+/,
    `agent_curation_date: "${new Date().toISOString()}"`
  );

  // Add review metadata
  const reviewMeta = `
# REVIEW METADATA
review:
  agent: "curation-agent"
  timestamp: "${review.timestamp}"
  quality_score: ${review.qualityScore}
  decision: "${decision}"
  errors: ${JSON.stringify(review.errors)}
  warnings: ${JSON.stringify(review.warnings)}
`;

  content = content.replace(
    /---\n([\s\S]*?)(---)/,
    `---\n$1${reviewMeta}---`
  );

  fs.writeFileSync(filePath, content);
  console.log(`   Updated: ${path.basename(filePath)} -> ${statusMap[decision]}`);
}

// Save curation report
function saveCurationReport(reports: QualityCheck[]) {
  const reportPath = path.join(CURATION_DIR, `curation-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    generated: new Date().toISOString(),
    totalReviewed: reports.length,
    approved: reports.filter(r => r.decision === 'APPROVE').length,
    rejected: reports.filter(r => r.decision === 'REJECT').length,
    needsHuman: reports.filter(r => r.decision === 'NEEDS_HUMAN').length,
    reports
  }, null, 2));
  console.log(`\n📄 Report saved: ${reportPath}`);
}

// CLI
const args = process.argv.slice(2);

function main() {
  const command = args[0];

  if (command === '--status') {
    const unreviewed = findUnreviewedBundles();
    console.log(`\n🔍 CURATION STATUS`);
    console.log(`   Unreviewed bundles: ${unreviewed.length}`);

    if (unreviewed.length > 0) {
      console.log(`\n📋 Pending review:`);
      unreviewed.slice(0, 10).forEach(b => {
        console.log(`   - ${path.basename(path.dirname(b))}/${path.basename(b)}`);
      });
      if (unreviewed.length > 10) {
        console.log(`   ... and ${unreviewed.length - 10} more`);
      }
    }

  } else if (command === '--review' || command === '--review=pending') {
    console.log(`\n🤖 RUNNING CURATION AGENT\n`);

    const unreviewed = findUnreviewedBundles();

    if (unreviewed.length === 0) {
      console.log('✅ No bundles pending review');
      return;
    }

    console.log(`Found ${unreviewed.length} unreviewed bundles\n`);

    const reports: QualityCheck[] = [];
    const limit = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '20');

    for (let i = 0; i < Math.min(limit, unreviewed.length); i++) {
      const bundlePath = unreviewed[i];
      console.log(`\n📋 Reviewing: ${path.basename(bundlePath)}`);

      const review = reviewBundle(bundlePath);
      reports.push(review);

      console.log(`   Score: ${review.qualityScore}/100`);
      console.log(`   Decision: ${review.decision}`);

      if (review.errors.length > 0) {
        console.log(`   Errors: ${review.errors.join(', ')}`);
      }

      // Update bundle status
      updateCurationStatus(bundlePath, review.decision, review);
    }

    saveCurationReport(reports);

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 CURATION SUMMARY`);
    console.log(`   Approved: ${reports.filter(r => r.decision === 'APPROVE').length}`);
    console.log(`   Rejected: ${reports.filter(r => r.decision === 'REJECT').length}`);
    console.log(`   Needs Human: ${reports.filter(r => r.decision === 'NEEDS_HUMAN').length}`);

  } else if (command === '--review=latest') {
    // Review most recently generated bundles
    console.log(`\n🤖 CURATION: Latest Generation Batch\n`);

    const queuePath = path.join(GENERATION_DIR, 'queue.json');
    if (fs.existsSync(queuePath)) {
      const queue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
      const completed = queue.tasks.filter((t: any) => t.status === 'completed');

      console.log(`Found ${completed.length} completed generation tasks`);

      // Review first 5
      const limit = 5;
      const reports: QualityCheck[] = [];

      for (let i = 0; i < Math.min(limit, completed.length); i++) {
        const task = completed[i];
        const bundlePath = path.join(
          QUESTIONS_DATA,
          task.subject,
          `grado-${task.grado}`,
          `periodo-${task.periodo}`,
          task.topic,
          `${task.subject.substring(0, 3).toUpperCase()}-${task.grado}-P${task.periodo}-${task.topic}-${String(task.bundleIndex).padStart(3, '0')}-MASTERY-bundle.md`
        );

        if (fs.existsSync(bundlePath)) {
          console.log(`\n📋 Reviewing: ${path.basename(bundlePath)}`);
          const review = reviewBundle(bundlePath);
          reports.push(review);
          updateCurationStatus(bundlePath, review.decision, review);
        }
      }

      saveCurationReport(reports);
    }

  } else {
    console.log(`
🤖 WorldExams Curation Agent

USAGE:
  node scripts/curation-agent.ts --status            Show pending review count
  node scripts/curation-agent.ts --review            Review pending bundles
  node scripts/curation-agent.ts --review --limit=10  Review 10 bundles
  node scripts/curation-agent.ts --review=latest     Review latest generated

WORKFLOW:
  1. Generation creates RAW bundles (UNREVISED)
  2. Curation agent reviews quality
  3. APPROVED -> Premium API
  4. REJECTED -> Queue for regeneration
  5. NEEDS_HUMAN -> Manual review panel
`);
  }
}

try {
  main();
} catch (e) {
  console.error(e);
}
