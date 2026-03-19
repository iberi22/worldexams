const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const summaryCsvPath = path.join(repoRoot, 'reports', 'question-audit', 'latest-summary.csv');
const questionsRoot = path.join(repoRoot, 'questions_data');
const generatedDir = path.join(repoRoot, 'saberparatodos', 'src', 'generated');
const generatedManifestPath = path.join(generatedDir, 'quarantine-manifest.ts');

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
}

function walkMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPosixRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join('/');
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return {
    block: match[0],
    body: match[1],
  };
}

function upsertFrontmatterValue(frontmatterBody, key, valueLiteral) {
  const line = `${key}: ${valueLiteral}`;
  const pattern = new RegExp(`^${key}:.*$`, 'm');
  if (pattern.test(frontmatterBody)) {
    return frontmatterBody.replace(pattern, line);
  }
  return `${frontmatterBody}\n${line}`;
}

function removeFrontmatterValue(frontmatterBody, key) {
  return frontmatterBody
    .replace(new RegExp(`^${key}:.*(?:\\r?\\n|$)`, 'm'), '')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();
}

function syncQuarantineFrontmatter(raw, isQuarantined) {
  const frontmatter = extractFrontmatter(raw);
  if (!frontmatter) return raw;

  let nextBody = frontmatter.body;
  if (isQuarantined) {
    nextBody = upsertFrontmatterValue(nextBody, 'quarantine', 'true');
    nextBody = upsertFrontmatterValue(nextBody, 'bundle_status', '"quarantined"');
  } else {
    nextBody = removeFrontmatterValue(nextBody, 'quarantine');
    nextBody = removeFrontmatterValue(nextBody, 'bundle_status');
  }

  const nextBlock = `---\n${nextBody}\n---`;
  return raw.replace(frontmatter.block, nextBlock);
}

function extractBundleId(raw, filePath) {
  const match = raw.match(/^id:\s*["']?([^"'\r\n]+)["']?$/m);
  if (match) return match[1].trim();
  return path.basename(filePath, '.md');
}

function extractQuestionIds(raw) {
  return [...raw.matchAll(/\*\*ID:\*\*\s*`([^`]+)`/g)].map((match) => match[1].trim());
}

function main() {
  if (!fs.existsSync(summaryCsvPath)) {
    throw new Error(`Missing audit summary: ${summaryCsvPath}`);
  }

  const rows = parseCsv(fs.readFileSync(summaryCsvPath, 'utf8'));
  const quarantinedBundlePaths = new Set(
    rows
      .filter((row) => String(row.quarantine || '').trim().toLowerCase() === 'true')
      .map((row) => String(row.bundle_path || '').trim())
      .filter(Boolean)
  );

  const bundleIds = new Set();
  const questionIds = new Set();
  const syncedBundlePaths = new Set();
  const markdownFiles = walkMarkdownFiles(questionsRoot);
  let markedCount = 0;
  let unmarkedCount = 0;

  for (const filePath of markdownFiles) {
    const relativePath = toPosixRelative(filePath);
    const raw = fs.readFileSync(filePath, 'utf8');
    const isQuarantined = quarantinedBundlePaths.has(relativePath);
    const nextRaw = syncQuarantineFrontmatter(raw, isQuarantined);

    if (nextRaw !== raw) {
      fs.writeFileSync(filePath, nextRaw, 'utf8');
      if (isQuarantined) {
        markedCount++;
      } else {
        unmarkedCount++;
      }
    }

    if (!isQuarantined) continue;

    syncedBundlePaths.add(relativePath);
    bundleIds.add(extractBundleId(nextRaw, filePath));
    for (const questionId of extractQuestionIds(nextRaw)) {
      questionIds.add(questionId);
    }
  }

  fs.mkdirSync(generatedDir, { recursive: true });

  const bundlePathList = JSON.stringify([...syncedBundlePaths].sort(), null, 2);
  const bundleIdList = JSON.stringify([...bundleIds].sort(), null, 2);
  const questionIdList = JSON.stringify([...questionIds].sort(), null, 2);

  const manifestSource = `// Auto-generated by saberparatodos/scripts/sync_quarantine_manifest.cjs\n` +
    `// Do not edit manually.\n\n` +
    `export const quarantineGeneratedAt = ${JSON.stringify(new Date().toISOString())};\n` +
    `export const quarantinedBundlePaths = ${bundlePathList} as const;\n` +
    `export const quarantinedBundleIds = ${bundleIdList} as const;\n` +
    `export const quarantinedQuestionIds = ${questionIdList} as const;\n`;

  fs.writeFileSync(generatedManifestPath, manifestSource, 'utf8');

  console.log(JSON.stringify({
    quarantinedBundles: syncedBundlePaths.size,
    quarantinedQuestions: questionIds.size,
    markedFilesUpdated: markedCount,
    unmarkedFilesUpdated: unmarkedCount,
    generatedManifestPath: toPosixRelative(generatedManifestPath),
  }, null, 2));
}

main();
