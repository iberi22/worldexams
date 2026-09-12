#!/usr/bin/env node
/**
 * © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
 * Static Cuento JSON Pack Generator
 *
 * Usage:
 *   node scripts/generate-cuento-packs.js [--all] [--changed-only] [--slug=<slug>] [--out=<dir>]
 *
 * Options:
 *   --all           Process all cuentos in questions_data/cuentos/
 *   --changed-only  Filter processing to cuentos modified in git diff
 *   --slug=<slug>   Process only the specified cuento slug
 *   --out=<dir>     Output directory for JSON packs (default: public/v1/cuentos)
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const CUENTOS_DATA_ROOT = path.join(ROOT, "..", "questions_data", "cuentos");

// Cache-Control header serving note for static cuento packs:
// Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400

const args = process.argv.slice(2);
const generateAll = args.includes("--all") || args.length === 0;
const changedOnly = args.includes("--changed-only");

// --- C7.07 narration timings + audio (fuente: lib/cuentos/audio-timings.ts) ---
// Tokenización idéntica a splitWords(): blank-split. Si cambia allá,
// los tests de invariante (AudioCuento.test.ts) lo detectan.
const SECS_PER_WORD_ESTIMATE = 0.45;
const AUDIO_PUBLIC_BASE = "/audio/cuentos";

function splitWordsGenerator(texto) {
  if (!texto) return [];
  return String(texto).split(/\s+/).filter(Boolean);
}

function estimateDurationGenerator(words) {
  if (words.length === 0) return 0;
  return Math.round(words.length * SECS_PER_WORD_ESTIMATE * 1000) / 1000;
}

function computeTimingsGenerator(words, totalSeconds) {
  if (words.length === 0) return [];
  const total = Math.max(totalSeconds, 0.001);
  const weights = words.map((w) => Math.max(w.length, 1));
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const timings = [];
  let acc = 0;
  for (let i = 0; i < words.length; i++) {
    timings.push(Math.round(acc * 1000) / 1000);
    acc += (total * weights[i]) / weightSum;
  }
  for (let i = 1; i < timings.length; i++) {
    if (timings[i] <= timings[i - 1]) {
      timings[i] = Math.round((timings[i - 1] + 0.001) * 1000) / 1000;
    }
  }
  return timings;
}

// Duración real del MP3 vía ffprobe cuando está en PATH; si no,
// estimación palabras x 0.45s (tasa infantil, igual que edge-tts -5%).
function probeMp3Duration(mp3Path, fallbackSeconds) {
  try {
    const out = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 ${JSON.stringify(mp3Path)}`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    );
    const secs = parseFloat(String(out).trim());
    if (Number.isFinite(secs) && secs > 0) return Math.round(secs * 1000) / 1000;
  } catch {
    // ffprobe ausente o MP3 ilegible: estimación determinista
  }
  return fallbackSeconds;
}

function narrationForPage(slug, pageNum, texto) {
  const words = splitWordsGenerator(texto);
  const mp3Abs = path.join(ROOT, "public", "audio", "cuentos", slug, `p${pageNum}.mp3`);
  const hasMp3 = fs.existsSync(mp3Abs);
  const audio = hasMp3 ? `${AUDIO_PUBLIC_BASE}/${slug}/p${pageNum}.mp3` : null;
  const estimated = estimateDurationGenerator(words);
  const duration = hasMp3 ? probeMp3Duration(mp3Abs, estimated) : estimated;
  return { audio, timings: computeTimingsGenerator(words, duration) };
}

let targetSlug = null;
const slugArg = args.find((a) => a.startsWith("--slug="));
if (slugArg) {
  targetSlug = slugArg.split("=")[1].trim();
} else {
  const slugIdx = args.indexOf("--slug");
  if (slugIdx !== -1 && args[slugIdx + 1]) {
    targetSlug = args[slugIdx + 1].trim();
  }
}

let outDir = path.join(ROOT, "public", "v1", "cuentos");
const outArg = args.find((a) => a.startsWith("--out="));
if (outArg) {
  outDir = path.resolve(outArg.split("=")[1].trim());
} else {
  const outIdx = args.indexOf("--out");
  if (outIdx !== -1 && args[outIdx + 1]) {
    outDir = path.resolve(args[outIdx + 1].trim());
  }
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function getChangedCuentoSlugs() {
  try {
    const diffFiles = execSync("git diff --name-only origin/main...HEAD", {
      cwd: path.join(ROOT, ".."),
      encoding: "utf8",
    })
      .split(/\r?\n/)
      .filter((file) => file.startsWith("questions_data/cuentos/"));

    const slugs = new Set();
    for (const f of diffFiles) {
      const parts = f.split("/");
      if (parts.length >= 3 && parts[2] !== "LICENSE-CONTENT.md") {
        slugs.add(parts[2]);
      }
    }
    return slugs;
  } catch (err) {
    console.warn("Warning: failed to compute git diff for --changed-only:", err.message);
    return null;
  }
}

function parseCuentoMarkdown(rawContent) {
  const headerMatch = rawContent.match(/^<!--\s*([\s\S]*?)\s*-->/);
  const copyrightHeader = headerMatch ? headerMatch[1].trim() : "";
  const markdownWithoutHeader = rawContent.replace(/^<!--[\s\S]*?-->\s*/, "");

  const parsed = matter(markdownWithoutHeader);
  const data = parsed.data || {};
  const body = parsed.content || "";

  return { data, body, copyrightHeader };
}

function validateAndParseCuento(cuentoDir, slug) {
  const file = path.join(cuentoDir, "cuento.md");
  const errors = [];

  if (!fs.existsSync(file)) {
    return { errors: [`File not found: ${file}`] };
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data, body, copyrightHeader } = parseCuentoMarkdown(raw);

  // 1. Copyright header check
  if (!copyrightHeader || !copyrightHeader.includes("SaberParaTodos")) {
    errors.push(`[RULE C1-01] Missing copyright comment header in ${file}`);
  }

  // 2. Frontmatter check
  const requiredFrontmatter = ["slug", "titulo", "edad", "idioma", "eje", "habitat", "valor", "personajes", "paginas", "license", "version"];
  for (const field of requiredFrontmatter) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`[RULE C1-02] Missing frontmatter field '${field}'`);
    }
  }

  if (data.slug && data.slug !== slug) {
    errors.push(`[RULE C1-03] Frontmatter slug '${data.slug}' does not match directory name '${slug}'`);
  }

  if (data.license !== "PROPRIETARY-FREE-READ") {
    errors.push(`[RULE C1-04] Invalid license '${data.license}'. Expected 'PROPRIETARY-FREE-READ'`);
  }

  // Split body into pages section and quiz section
  const quizIndex = body.search(/^##\s+Quiz/im);
  const pagesPart = quizIndex !== -1 ? body.slice(0, quizIndex) : body;
  const quizPart = quizIndex !== -1 ? body.slice(quizIndex) : "";

  // 3. Parse Pages
  const pages = [];
  const pageSections = pagesPart.split(/^##\s+Pagina\s+/im).slice(1);

  pageSections.forEach((section, idx) => {
    const firstLineEnd = section.indexOf("\n");
    const numStr = firstLineEnd !== -1 ? section.slice(0, firstLineEnd).trim() : section.trim();
    const pageNum = parseInt(numStr, 10) || idx + 1;
    const content = firstLineEnd !== -1 ? section.slice(firstLineEnd).trim() : "";

    const imgMatch = content.match(/!\[alt:\s*(.*?)\]\((.*?)\)/);
    const alt = imgMatch ? imgMatch[1].trim() : "";
    const imagen = imgMatch ? imgMatch[2].trim() : "";

    let hint = "";
    let words = [];

    const hintMatch = content.match(/^>\s*Para conversar en familia:\s*(.+)$/m);
    if (hintMatch) {
      hint = hintMatch[1].trim();
    }

    const wordsMatch = content.match(/^\*\*Palabras nuevas:\*\*\s*(.+)$/m);
    if (wordsMatch) {
      words = wordsMatch[1]
        .split(",")
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const textLines = content
      .replace(/!\[alt:.*?\]\(.*?\)/, "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length > 0 &&
          !l.startsWith("##") &&
          !l.startsWith("> Para conversar en familia:") &&
          !l.startsWith("**Palabras nuevas:**")
      );

    const texto = textLines.join(" ").trim();

    if (!imagen) {
      errors.push(`[RULE C1-05] Page ${pageNum} missing image mark ![alt: ...](...)`);
    }
    if (!alt) {
      errors.push(`[RULE C1-06] Page ${pageNum} missing image alt text`);
    }
    if (!texto) {
      errors.push(`[RULE C1-07] Page ${pageNum} missing body text`);
    }

    pages.push({
      n: pageNum,
      imagen,
      alt,
      texto,
      hint,
      words,
      // C7.07: narración (audio MP3 o null) + timings por palabra 1:1
      ...narrationForPage(slug, pageNum, texto),
    });
  });

  if (pages.length < 8 || pages.length > 10) {
    errors.push(`[RULE C1-08] Page count ${pages.length} out of range (expected 8-10)`);
  }

  // 4. Parse Quiz and Explanation
  if (!quizPart) {
    errors.push(`[RULE C1-09] Missing ## Quiz section`);
  }

  const expMatch = quizPart.match(/###\s+Explicacion([\s\S]*)/i);
  const explicacion = expMatch ? expMatch[1].trim() : "";
  const questionsPart = expMatch ? quizPart.slice(0, expMatch.index) : quizPart;

  if (!explicacion) {
    errors.push(`[RULE C1-10] Missing ### Explicacion moraleja`);
  }

  const quiz = [];
  const qBlocks = questionsPart.split(/^###\s+Pregunta\s+/im).slice(1);

  qBlocks.forEach((qBlock, idx) => {
    const lines = qBlock.split(/\r?\n/);
    const firstLine = lines[0].trim();
    const qNum = parseInt(firstLine, 10) || idx + 1;

    const remainingText = lines.slice(1).join("\n");
    const statementMatch = remainingText.match(/^([\s\S]*?)(?=^\s*-\s*\[)/m);
    const qText = statementMatch ? statementMatch[1].trim() : "";

    const opciones = [];
    const optLines = remainingText.split(/\r?\n/);
    let currentOpt = null;

    for (let line of optLines) {
      const matchOpt = line.match(/^\s*-\s*\[([x ])\]\s*([A-C])\)\s*(.*)/i);
      if (matchOpt) {
        if (currentOpt) opciones.push(currentOpt);
        currentOpt = {
          letra: matchOpt[2].toUpperCase(),
          texto: matchOpt[3].trim(),
          correcta: matchOpt[1].toLowerCase() === "x",
          feedback: "",
        };
        continue;
      }

      const matchFb = line.match(/<!--\s*feedback:\s*(.*?)\s*-->/i);
      if (matchFb && currentOpt) {
        currentOpt.feedback = matchFb[1].trim();
        continue;
      }
    }
    if (currentOpt) {
      opciones.push(currentOpt);
    }

    const correctCount = opciones.filter((o) => o.correcta).length;
    if (opciones.length !== 3) {
      errors.push(`[RULE C1-11] Question ${qNum} has ${opciones.length} options (expected exactly 3)`);
    }
    if (correctCount !== 1) {
      errors.push(`[RULE C1-12] Question ${qNum} has ${correctCount} correct options (expected exactly 1)`);
    }
    if (opciones.some((o) => !o.feedback)) {
      errors.push(`[RULE C1-13] Question ${qNum} has options missing feedback`);
    }

    quiz.push({
      n: qNum,
      texto: qText,
      opciones,
    });
  });

  if (quiz.length !== 3) {
    errors.push(`[RULE C1-14] Quiz has ${quiz.length} questions (expected exactly 3)`);
  }

  if (errors.length > 0) {
    return { errors };
  }

  // Construct deterministic Cuento object with stable key order
  const packJson = {
    format: 2,
    slug: data.slug,
    titulo: data.titulo,
    edad: String(data.edad),
    idioma: data.idioma,
    eje: data.eje,
    habitat: data.habitat,
    valor: data.valor,
    personajes: Array.isArray(data.personajes) ? data.personajes : [],
    paginas: pages,
    quiz: quiz,
    explicacion: explicacion,
    hotspots: [],
    license: data.license,
    version: Number(data.version) || 1,
    copyright: copyrightHeader,
  };

  const coverSvg = pages.length > 0 && pages[0].imagen ? pages[0].imagen : `escenas/p1-${slug}.svg`;

  const indexItem = {
    slug: data.slug,
    titulo: data.titulo,
    edad: String(data.edad),
    eje: data.eje,
    habitat: data.habitat,
    valor: data.valor,
    paginas: pages.length,
    license: data.license,
    version: Number(data.version) || 1,
    packUrl: `/v1/cuentos/${data.slug}.json`,
    coverSvg,
  };

  return { errors: [], packJson, indexItem };
}

function main() {
  if (!fs.existsSync(CUENTOS_DATA_ROOT)) {
    console.error(`Error: Cuentos root directory does not exist: ${CUENTOS_DATA_ROOT}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(CUENTOS_DATA_ROOT, { withFileTypes: true });
  const cuentoDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const changedSlugs = changedOnly ? getChangedCuentoSlugs() : null;

  let hasErrors = false;
  const indexCatalog = [];
  let generatedCount = 0;

  for (const slug of cuentoDirs.sort()) {
    if (targetSlug && slug !== targetSlug) {
      continue;
    }

    if (changedSlugs && !changedSlugs.has(slug)) {
      continue;
    }

    const cuentoDir = path.join(CUENTOS_DATA_ROOT, slug);
    const { errors, packJson, indexItem } = validateAndParseCuento(cuentoDir, slug);

    if (errors && errors.length > 0) {
      console.error(`\n❌ VALIDATION ERROR for cuento '${slug}':`);
      errors.forEach((e) => console.error(`   - ${e}`));
      hasErrors = true;
      continue;
    }

    // Write individual pack JSON
    const packPath = path.join(outDir, `${slug}.json`);
    fs.writeFileSync(packPath, JSON.stringify(packJson, null, 2) + "\n", "utf8");
    console.log(`✅ Emitted cuento pack: ${path.relative(ROOT, packPath)}`);

    // Publish scene + character SVGs next to the pack so the reader
    // (/v1/cuentos/<slug>/<imagen>) and static pages resolve them.
    for (const assetDir of ["escenas", "personajes"]) {
      const srcDir = path.join(cuentoDir, assetDir);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, path.join(outDir, slug, assetDir), { recursive: true });
      }
    }

    indexCatalog.push(indexItem);
    generatedCount++;
  }

  // Write index.json catalog if not filtering by single slug without --all
  if (generatedCount > 0) {
    const indexPath = path.join(outDir, "index.json");
    let fullCatalog = indexCatalog;

    if (fs.existsSync(indexPath) && (targetSlug || changedOnly)) {
      try {
        const existing = JSON.parse(fs.readFileSync(indexPath, "utf8"));
        if (Array.isArray(existing)) {
          const itemMap = new Map();
          existing.forEach((item) => itemMap.set(item.slug, item));
          indexCatalog.forEach((item) => itemMap.set(item.slug, item));
          fullCatalog = Array.from(itemMap.values()).sort((a, b) => a.slug.localeCompare(b.slug));
        }
      } catch (err) {
        console.warn("Warning: failed to merge with existing index.json:", err.message);
      }
    }

    fs.writeFileSync(indexPath, JSON.stringify(fullCatalog, null, 2) + "\n", "utf8");
    console.log(`✅ Emitted catalog index: ${path.relative(ROOT, indexPath)} (${fullCatalog.length} cuentos)`);
  }

  if (hasErrors) {
    console.error("\n❌ Generator failed: Refused to emit packs for failing cuentos.");
    process.exit(1);
  }

  console.log("\n✨ Cuento packs generation completed successfully.");
}

main();
