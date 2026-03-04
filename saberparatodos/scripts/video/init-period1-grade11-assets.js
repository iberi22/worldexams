import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const PERIOD1_DIR = path.join(
  PROJECT_ROOT,
  'src',
  'content',
  'questions',
  'colombia',
  'matematicas',
  'grado-11',
  'periodo-1'
);
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureGitKeep(dir) {
  ensureDir(dir);
  const marker = path.join(dir, '.gitkeep');
  if (!fs.existsSync(marker)) fs.writeFileSync(marker, '');
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) {
    return {
      version: '4.1',
      generated_at: new Date().toISOString(),
      defaults: {
        youtube_channel_url: 'https://www.youtube.com/@worldexams',
        instagram_url: '',
        tiktok_url: ''
      },
      entries: []
    };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
}

function upsertManifestEntry(entries, nextEntry) {
  const key = String(nextEntry.question_id || '').toLowerCase();
  const idx = entries.findIndex((e) => String(e.question_id || '').toLowerCase() === key);
  if (idx === -1) {
    entries.push(nextEntry);
  } else {
    entries[idx] = {
      ...entries[idx],
      ...nextEntry,
      youtube_url: entries[idx].youtube_url || nextEntry.youtube_url,
      youtube_id: entries[idx].youtube_id || nextEntry.youtube_id,
      shorts_youtube_id: entries[idx].shorts_youtube_id || nextEntry.shorts_youtube_id,
      instagram_url: entries[idx].instagram_url || nextEntry.instagram_url,
      tiktok_url: entries[idx].tiktok_url || nextEntry.tiktok_url,
      updated_at: new Date().toISOString()
    };
  }
}

function parseQuestionSections(body) {
  const sections = [];
  const headerRegex = /^##\s+(?:Question|Pregunta)\s+\d+.*$/gim;
  const matches = [];
  let match;
  while ((match = headerRegex.exec(body)) !== null) {
    matches.push({ index: match.index, header: match[0] });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    sections.push({
      header: matches[i].header,
      body: body.slice(start, end)
    });
  }

  return sections;
}

function parseQuestionSection(section) {
  const idMatch = section.body.match(/\*\*ID:\*\*\s*`([^`]+)`/);
  const typeMatch = section.body.match(/\*\*Type:\*\*\s*`([^`]+)`/);
  const statementMatch = section.body.match(/###\s*Enunciado\s*\n([\s\S]*?)(?=###\s*(?:Opciones|Options))/i);
  const explanationMatch = section.body.match(/###\s*Explicaci[oó]n(?:\s*Pedag[oó]gica)?[^\n]*\n([\s\S]*?)(?=---|$)/i);

  if (!idMatch || !statementMatch) return null;

  return {
    id: idMatch[1].trim(),
    type: typeMatch ? typeMatch[1].trim() : 'single',
    statement: statementMatch[1].trim(),
    explanation: explanationMatch ? explanationMatch[1].trim() : ''
  };
}

function buildJobPayload(question, frontmatter, bundleFileName, bundleAssetsRelative) {
  const narration = [
    'Vamos a resolver esta pregunta en tres pasos.',
    'Paso uno, identifica los datos del enunciado.',
    'Paso dos, plantea la operación o ecuación correcta.',
    'Paso tres, verifica el resultado y confirma la opción final.'
  ].join(' ');

  return {
    protocol_version: '4.1',
    country: 'co',
    grade: Number(frontmatter.grado || 11),
    period: Number(frontmatter.periodo || 1),
    subject: String(frontmatter.asignatura || 'matematicas'),
    topic: String(frontmatter.tema || ''),
    bundle_file: bundleFileName,
    bundle_assets_dir: bundleAssetsRelative,
    question_id: question.id,
    question_type: question.type,
    format: {
      width: 1080,
      height: 1920,
      fps: 30,
      total_seconds: 15,
      intro_seconds: 3,
      explanation_seconds: 9,
      outro_seconds: 3
    },
    branding: {
      intro: ['worldexams', 'saberparatodos'],
      outro: ['worldexams', 'saberparatodos']
    },
    content: {
      statement: question.statement,
      explanation: question.explanation,
      narration_script: `${narration} ${question.explanation || ''}`.trim()
    },
    audio: {
      tts_engine: 'xtts-v2-local',
      align_engine: 'whisperx',
      fallback_engine: 'piper'
    },
    outputs: {
      final_video_path: `renders/${question.id}.mp4`,
      audio_path: `audio/${question.id}.mp3`,
      timings_path: `timings/${question.id}.json`,
      subtitles_path: `subtitles/${question.id}.srt`
    },
    social: {
      youtube: { mode: 'auto', status: 'pending' },
      instagram: { mode: 'auto', status: 'pending' },
      tiktok: { mode: 'manual_queue', status: 'pending' }
    },
    status: 'pending_generation',
    created_at: new Date().toISOString()
  };
}

function main() {
  if (!fs.existsSync(PERIOD1_DIR)) {
    console.error(`❌ No existe la ruta objetivo: ${PERIOD1_DIR}`);
    process.exit(1);
  }

  const bundleFiles = fs.readdirSync(PERIOD1_DIR).filter((f) => f.endsWith('.md'));
  const manifest = readManifest();
  const entries = manifest.entries || [];

  let totalJobs = 0;
  let totalBundles = 0;

  for (const fileName of bundleFiles) {
    const bundlePath = path.join(PERIOD1_DIR, fileName);
    const parsed = matter.read(bundlePath);
    const sections = parseQuestionSections(parsed.content);
    const questions = sections.map(parseQuestionSection).filter(Boolean);
    if (questions.length === 0) continue;

    totalBundles += 1;
    const assetsDirName = `${fileName}.assets`;
    const assetsDirPath = path.join(PERIOD1_DIR, assetsDirName);
    const assetsRelative = path.relative(PROJECT_ROOT, assetsDirPath).replace(/\\/g, '/');
    const bundleRelative = path.relative(PROJECT_ROOT, bundlePath).replace(/\\/g, '/');

    ensureDir(assetsDirPath);
    ensureDir(path.join(assetsDirPath, 'jobs'));
    ensureDir(path.join(assetsDirPath, 'resources'));
    ensureDir(path.join(assetsDirPath, 'publish'));
    ensureGitKeep(path.join(assetsDirPath, 'audio'));
    ensureGitKeep(path.join(assetsDirPath, 'timings'));
    ensureGitKeep(path.join(assetsDirPath, 'subtitles'));
    ensureGitKeep(path.join(assetsDirPath, 'renders'));

    for (const question of questions) {
      const payload = buildJobPayload(question, parsed.data, fileName, assetsRelative);
      const jobPath = path.join(assetsDirPath, 'jobs', `${question.id}.json`);
      writeJson(jobPath, payload);
      totalJobs += 1;

      upsertManifestEntry(entries, {
        question_id: question.id,
        protocol_version: '4.1',
        subject: 'matematicas',
        grade: 11,
        topic: String(parsed.data.tema || ''),
        bundle_md_path: bundleRelative,
        bundle_assets_path: assetsRelative,
        status: 'pending_generation',
        updated_at: new Date().toISOString()
      });
    }

    writeJson(path.join(assetsDirPath, 'bundle-manifest.json'), {
      bundle_file: bundleRelative,
      bundle_assets_path: assetsRelative,
      protocol_version: '4.1',
      grade: Number(parsed.data.grado || 11),
      period: Number(parsed.data.periodo || 1),
      subject: String(parsed.data.asignatura || 'matematicas'),
      topic: String(parsed.data.tema || ''),
      total_questions: questions.length,
      generated_jobs_at: new Date().toISOString(),
      questions: questions.map((q) => ({
        question_id: q.id,
        type: q.type,
        job_file: `jobs/${q.id}.json`,
        output_video: `renders/${q.id}.mp4`
      }))
    });

    const publishTemplate = {
      bundle_file: bundleRelative,
      updated_at: new Date().toISOString(),
      links: questions.map((q) => ({
        question_id: q.id,
        youtube_url: null,
        instagram_url: null,
        tiktok_url: null,
        status: 'pending_publish'
      }))
    };

    const youtubeLinksPath = path.join(assetsDirPath, 'publish', 'youtube-links.json');
    if (!fs.existsSync(youtubeLinksPath)) writeJson(youtubeLinksPath, publishTemplate);
    const instagramLinksPath = path.join(assetsDirPath, 'publish', 'instagram-links.json');
    if (!fs.existsSync(instagramLinksPath)) writeJson(instagramLinksPath, publishTemplate);
    const tiktokLinksPath = path.join(assetsDirPath, 'publish', 'tiktok-links.json');
    if (!fs.existsSync(tiktokLinksPath)) writeJson(tiktokLinksPath, publishTemplate);

    const resourcesReadme = path.join(assetsDirPath, 'resources', 'README.md');
    if (!fs.existsSync(resourcesReadme)) {
      fs.writeFileSync(
        resourcesReadme,
        [
          '# Recursos de Generación',
          '',
          '- Guardar aquí prompts, parámetros y bitácoras de ejecución.',
          '- No subir secretos ni tokens.',
          '- Mantener trazabilidad por `question_id`.'
        ].join('\n')
      );
    }
  }

  const finalManifest = {
    version: manifest.version || '4.1',
    generated_at: new Date().toISOString(),
    defaults: manifest.defaults || {
      youtube_channel_url: 'https://www.youtube.com/@worldexams',
      instagram_url: '',
      tiktok_url: ''
    },
    entries: entries.sort((a, b) => String(a.question_id).localeCompare(String(b.question_id)))
  };
  writeJson(MANIFEST_FILE, finalManifest);

  console.log(`✅ Bundles procesados: ${totalBundles}`);
  console.log(`✅ Jobs generados: ${totalJobs}`);
  console.log(`✅ Manifiesto actualizado: ${MANIFEST_FILE}`);
}

main();
