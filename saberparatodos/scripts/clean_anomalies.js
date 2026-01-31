import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md') && !['README.md', 'PROTOCOL.md', 'LICENSE.md', '_index.md'].includes(file)) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);
    const fatal = [];
    const fixable = [];

    // Fatal Checks
    if (!data.id) fatal.push("Missing ID");
    if (!data.grado) fatal.push("Missing Grado");
    if (!data.asignatura) fatal.push("Missing Asignatura");

    const hasOptions = body.includes('### Opciones') || body.includes('# Opciones') || body.includes('### Options');
    if (!hasOptions) fatal.push("Missing Options section");

    // Protocol v3.0 Checks (Fixable or Warning)
    const isV3 = data.protocol_version && parseFloat(data.protocol_version) >= 3.0;
    if (isV3) {
      if (!data.periodo) fixable.push("V3.0: Missing Periodo");
      if (!data.creation_date && !data.generation_date) fixable.push("V3.0: Missing Date");
      if (!data.dba && !data.dba_id) fixable.push("V3.0: Missing DBA");

      const questionMatches = body.match(/^\s*## (?:Pregunta|Question) \d+/gm) || [];
      if (data.total_questions && questionMatches.length < data.total_questions) {
          if (data.total_questions >= 7 && questionMatches.length <= 1) {
              fatal.push(`V3.0: Major count mismatch (${questionMatches.length}/${data.total_questions})`);
          }
      }
    }

    return {
        fatal,
        fixable,
        meta: {
            id: data.id,
            grado: data.grado,
            subject: data.asignatura,
            period: data.periodo,
            protocol: data.protocol_version
        }
    };
  } catch (e) {
    return { fatal: [`Parse error: ${e.message}`], fixable: [] };
  }
}

function fixMetadata(filePath, meta) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    // Only fix if it's one of ours or clearly missing
    if (!data.dba_id && !data.dba) {
        data.dba_id = "DBA-TODO";
    }
    if (!data.creation_date) {
        data.creation_date = new Date().toISOString().split('T')[0];
    }

    const newContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newContent);
}

async function runCleanup() {
  const isDelete = process.argv.includes('--delete');
  const isFix = process.argv.includes('--fix');
  console.log(`${colors.blue}🔍 Content Anomaly Hunter${colors.reset}`);
  console.log(`${isDelete ? colors.red + ' (DELETION MODE)' : ''}${isFix ? colors.green + ' (FIX MODE)' : ''}${!isDelete && !isFix ? colors.yellow + ' (REPORT ONLY)' : ''}${colors.reset}\n`);

  const files = getAllFiles(QUESTIONS_DIR);
  const fatalAnomalies = [];
  const fixableAnomalies = [];
  const log = [];

  files.forEach(file => {
    const result = analyzeFile(file);
    if (result.fatal.length > 0) {
      fatalAnomalies.push({ file, errors: result.fatal });
      console.log(`${colors.red}❌ FATAL: ${path.relative(process.cwd(), file)}${colors.reset}`);
      result.fatal.forEach(err => console.log(`   └─ ${err}`));

      if (isDelete) {
        fs.unlinkSync(file);
        console.log(`   ${colors.yellow}🗑️ DELETED${colors.reset}`);
      }
    } else if (result.fixable.length > 0) {
      fixableAnomalies.push({ file, errors: result.fixable });
      // console.log(`${colors.yellow}⚠️ FIXABLE: ${path.relative(process.cwd(), file)}${colors.reset}`);

      if (isFix) {
        fixMetadata(file, result.meta);
      }
    }

    if (result.fatal.length > 0 || result.fixable.length > 0) {
        log.push({
            file: path.relative(process.cwd(), file),
            id: result.meta?.id || 'unknown',
            grado: result.meta?.grado || '?',
            subject: result.meta?.subject || '?',
            errors: [...result.fatal, ...result.fixable].join(' | ')
        });
    }
  });

  console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`Total Files Checked: ${files.length}`);
  console.log(`Fatal Anomalies:    ${colors.red}${fatalAnomalies.length}${colors.reset}`);
  console.log(`Fixable Anomalies:  ${colors.yellow}${fixableAnomalies.length}${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);

  if (log.length > 0) {
      const csv = log.map(l => `${l.grado},${l.subject},${l.id},"${l.errors}"`).join('\n');
      fs.writeFileSync('anomaly_log.csv', `Grado,Asignatura,ID,Errors\n${csv}`);
  }

  if (fatalAnomalies.length > 0 && !isDelete) {
    console.log(`\nRun with ${colors.bold}--delete${colors.reset} to remove fatal anomalies.`);
  }
  if (fixableAnomalies.length > 0 && !isFix) {
    console.log(`Run with ${colors.bold}--fix${colors.reset} to attempt automatic metadata fixes.`);
  }
}

runCleanup();
