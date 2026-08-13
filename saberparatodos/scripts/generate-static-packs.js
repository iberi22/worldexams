import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const QUESTIONS_DATA_ROOT = path.join(ROOT, "..", "questions_data");
const args = process.argv.slice(2);
let targetPeriod = 1;
const generateAllWeekly = args.includes("--all-weekly");
const changedOnly = args.includes("--changed-only");
const apiOnly = args.includes("--api-only");
const OUTPUT_DIRS = [
  !apiOnly ? path.join(ROOT, "public", "api", "packs") : null,
  path.join(ROOT, "..", "apps", "worldexams-api", "public", "v1", "packs"),
].filter(Boolean);
const periodIdx = args.indexOf("--period");
if (periodIdx !== -1 && args[periodIdx + 1]) {
  targetPeriod = parseInt(args[periodIdx + 1]);
} else {
  const periodArg = args.find((arg) => arg.startsWith("--period="));
  if (periodArg) {
    targetPeriod = parseInt(periodArg.split("=")[1]);
  }
}

for (const outputDir of OUTPUT_DIRS) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

function parseProtocol(frontmatter, filePath) {
  const explicit = String(
    frontmatter.protocol_version || frontmatter.bundle_version || "",
  ).match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes("-pro-v5") || lower.includes("-v5-bundle")) return 5;
  if (lower.includes("-pro-v4") || lower.includes("-v4-bundle")) return 4;
  if (lower.includes("-v3-bundle")) return 3;
  if (lower.includes("-bundle")) return 2;
  return null;
}

function hasDuplicatedPeriodSegment(filePath) {
  const normalized = filePath.split(path.sep).join("/");
  return /\/periodo-\d+\/periodo-\d+\//i.test(normalized);
}

function readMarkdownWithFrontmatter(file) {
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    if (/^\d+$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }

  return { data, content: raw.slice(match[0].length) };
}

function getTextoBaseSections(body) {
  // Extract ## Texto Base / ## Texto base sections and map them to question index ranges
  // Returns array of { startIdx, endIdx, text } where indices refer to question positions
  const tbHeaders = [];
  const tbRegex = /^##\s+Texto\s+[Bb]ase[\s\S]*?(?=^##\s+(?:Pregunta|Question)\s+\d)/gim;
  let tbMatch;
  while ((tbMatch = tbRegex.exec(body)) !== null) {
    tbHeaders.push({
      index: tbMatch.index,
      text: tbMatch[0].trim()
    });
  }
  return tbHeaders;
}

function extractTextoBaseContent(tbSection) {
  // From a ## Texto Base section, extract the content after the title line
  // Sample: "## Texto Base 1: La prisa como forma de juicio\n\n*En muchas conversaciones...*"
  const lines = tbSection.split(/\r?\n/);
  // Skip the header line, find content after blank lines
  let contentLines = [];
  let started = false;
  for (const line of lines) {
    if (!started && line.startsWith('## ')) continue;
    if (!started && line.trim() === '') continue;
    started = true;
    contentLines.push(line);
  }
  return contentLines.join('\n').trim();
}

function parseQuestions(body) {
  const sections = [];
  const headerRegex = /^##\s+(?:Pregunta|Question)\s+\d+.*$/gim;
  let match;
  const matches = [];

  while ((match = headerRegex.exec(body)) !== null) {
    matches.push({ index: match.index, header: match[0] });
  }

  // Extract Texto Base sections BEFORE parsing questions
  const tbHeaders = getTextoBaseSections(body);
  // Map each question index to its nearest preceding Texto Base content
  const questionIndexPositions = [];
  for (let i = 0; i < matches.length; i++) {
    // Start position of the question block
    const qStart = matches[i].index;
    questionIndexPositions.push(qStart);
  }
  const textoBaseForQuestion = [];
  for (let i = 0; i < matches.length; i++) {
    const qPos = matches[i].index;
    let bestTb = null;
    for (const tb of tbHeaders) {
      // Use the closest Texto Base that appears BEFORE this question.
      // The previous constraint (tb.index > prevQPos) incorrectly
      // restricted a Texto Base to only the first question after it,
      // leaving subsequent questions without context. Now each question
      // gets the nearest preceding Texto Base regardless.
      if (tb.index < qPos) {
        if (!bestTb || tb.index > bestTb.index) {
          bestTb = tb;
        }
      }
    }
    textoBaseForQuestion[i] = bestTb ? extractTextoBaseContent(bestTb.text) : null;
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    const section = body.slice(start, end);

    // Extract ID
    const idMatch = section.match(
      /(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/,
    );
    const id = idMatch ? idMatch[1] || idMatch[2] || idMatch[3] : `q-${i}`;

    // Extract Difficulty from header or body
    const diffMatch =
      matches[i].header.match(/\((?:Nivel|Dificultad):?\s*(\d+)\)/i) ||
      section.match(/(?:Nivel|Dificultad):?\s*(\d+)/i) ||
      matches[i].header.match(/\[D(\d+)-D(\d+)\]/) ||
      matches[i].header.match(/\[D(\d+)\]/) ||
      section.match(/\[D(\d+)-D(\d+)\]/);

    let difficulty = 3;
    if (diffMatch) {
      // If it's a range like [D5-D6], use the second number
      difficulty = diffMatch[2] ? Number(diffMatch[2]) : Number(diffMatch[1]);
    }

    // Extract statement (everything between header and options)
    const afterHeader = section.slice(matches[i].header.length).trim();
    const optionsStart = afterHeader.search(/^\s*-\s*\[[x ]\]/m);
    let rawStatement =
      optionsStart !== -1
        ? afterHeader.slice(0, optionsStart).trim()
        : afterHeader;

    // Extract context if present:
    // 1. ### Contexto / ### Context / ### Texto (section heading)
    // 2. **Contexto:** or **Context:** (v5.2 inline field, both Spanish and English)
    // 3. ## Texto Base N: / ## Texto base – (shared context block)
    const contextHeadingMatch = section.match(
      /###\s*(?:Contexto|Context|Texto)([\s\S]*?)(?:###|##|$)/i,
    );
    const contextInlineMatch = section.match(
      /\*\*(?:Contexto|Context):\*\*\s*([\s\S]*?)(?=\r?\n###\s+(?:Enunciado|Statement|Question|Opciones)|\r?\n\s*(?:-\s*)?\[|$)/i,
    );
    const context = contextHeadingMatch
      ? contextHeadingMatch[1].trim()
      : contextInlineMatch
        ? contextInlineMatch[1].trim()
        : (textoBaseForQuestion[i] ? textoBaseForQuestion[i] : "");

    // Extract QA metadata fields (bloom, icfes, expected_success) for quality control
    const bloomMatch = section.match(/\*\*Bloom:\*\*\s*([^\n]+)/i);
    const icfesMatch = section.match(/\*\*ICFES:\*\*\s*([^\n]+)/i);
    const expectedSuccessMatch = section.match(/\*\*Expected_Success:\*\*\s*([^\n]+)/i);

    // Extract statement
    let statement = "";
    const enunciadoMatch = section.match(
      /###\s*(?:Enunciado|Statement|Question)([\s\S]*?)(?:###|##|$)/i,
    );
    if (enunciadoMatch) {
      statement = enunciadoMatch[1].trim();
    } else {
      let cleanedRaw = rawStatement;
      if (contextHeadingMatch) {
        cleanedRaw = cleanedRaw.replace(contextHeadingMatch[0], "");
      }
      // Strip inline **Context:**/**Contexto:** from statement
      cleanedRaw = cleanedRaw.replace(/\*\*(?:Context|Contexto):\*\*\s*([\s\S]*?)(?=\r?\n###\s+(?:Enunciado|Statement|Question|Opciones)|\r?\n\s*(?:-\s*)?\[|$)/gi, "");
      statement = cleanedRaw
        .replace(
          /(?:\*\*ID:\*\*|ID:)\s*(?:`[^`]+`|"[^"]+"|[A-Za-z0-9._:-]+)/g,
          "",
        )
        .replace(/\*\*Bloom:\*\*.*$/gm, "")
        .replace(/\*\*ICFES:\*\*.*$/gm, "")
        .replace(/\*\*Expected_Success:\*\*.*$/gm, "")
        .replace(/^\s*###\s+Contexto/gm, "")
        .replace(/^\s*###\s+Enunciado/gm, "")
        .replace(/^\s*\*\*\d+\.\*\*/gm, "") // Remove **1.** style numbering
        .trim();
    }

    // Extract options
    const options = [];
    const optionRegex =
      /^\s*(?:-\s*)?\[([x ])\]\s*(?:\*\*)?(?:Opci(?:o|ó)n\s+)?([A-Z])(?:\*\*)?(?:\s*[\)\.\-:=]\s*)?([\s\S]*?)(?=^\s*(?:-\s*)?\[[x ]\]\s*(?:\*\*)?(?:Opci(?:o|ó)n\s+)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:=]\s*)?|^###\s+|^##\s+|(?![\s\S]))/gim;
    let optMatch;
    let correctId = "A";

    while ((optMatch = optionRegex.exec(section)) !== null) {
      const isCorrect = optMatch[1].toLowerCase() === "x";
      const letter = optMatch[2];
      const rawOption = optMatch[3].trim();
      const feedbackMatch = rawOption.match(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/i);
      const text = rawOption
        .replace(/<!--\s*feedback:[\s\S]*?-->/, "")
        .trim();
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : "";
      options.push({ letter, text, is_correct: isCorrect, feedback });
      if (isCorrect) correctId = letter;
    }

    // Extract explanation
    const expMatch = section.match(
      /###\s*(?:Explicaci(?:o|\u00f3)n(?:\s+Pedag(?:o|\u00f3)gica)?|Explanation)([\s\S]*?)(?:##|$)/i,
    );
    const explanation = expMatch ? expMatch[1].trim() : "";

    sections.push({
      id,
      statement,
      context,
      options,
      correct_answer: correctId,
      explanation,
      difficulty: String(difficulty),
      images: [],
      tags: [],
      // QA metadata — used by the quality control overlay in the app
      bloom: bloomMatch ? bloomMatch[1].trim() : undefined,
      icfes_type: icfesMatch ? icfesMatch[1].trim() : undefined,
      expected_success: expectedSuccessMatch ? parseFloat(expectedSuccessMatch[1].trim()) : undefined,
    });
  }

  return sections;
}

const walk = (dir) => {
  let results = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  });
  return results;
};

const allFiles = walk(QUESTIONS_DATA_ROOT);
const changedFiles = changedOnly
  ? new Set(
      execSync("git diff --name-only origin/main...HEAD", {
        cwd: path.join(ROOT, ".."),
        encoding: "utf8",
      })
        .split(/\r?\n/)
        .filter((file) => file.startsWith("questions_data/") && file.endsWith(".md"))
        .map((file) => path.resolve(path.join(ROOT, "..", file))),
    )
  : null;
const packs = {};

for (const file of allFiles) {
  try {
    if (changedFiles && !changedFiles.has(path.resolve(file))) {
      continue;
    }

    if (hasDuplicatedPeriodSegment(file) || file.includes("/legacy/")) {
      continue;
    }

    const { data, content } = readMarkdownWithFrontmatter(file);
    const protocol = parseProtocol(data, file);
    if (!protocol || protocol < 3) continue;

    if (
      content.includes("Distractor 1") ||
      content.includes("Opcion correcta") ||
      content.includes("Opcion B")
    ) {
      console.log(`Skipping dummy placeholder file: ${file}`);
      continue;
    }

    const questions = parseQuestions(content);
    if (questions.length === 0) continue;

    const relPath = path.relative(QUESTIONS_DATA_ROOT, file);
    const parts = relPath.split(path.sep);
    const countryFolder = parts[0];

    const rawGrade = String(data.grado || file.match(/grado-(\d+)/)?.[1] || "11");
    const grade = rawGrade.toUpperCase() === "3EM"
      ? 11
      : parseInt(rawGrade, 10);
    let subject = data.asignatura || data.subject;

    if (!subject) {
      if (parts[1] && parts[1].startsWith("grado-")) {
        subject = countryFolder;
      } else {
        subject = parts[1] || countryFolder;
      }
    }

      const rawPeriod = String(data.periodo || "").toLowerCase();
      // Support both 'week' (canonical) and 'semana' (v5.2) frontmatter fields
      const weekField = data.week || data.semana || "";
      const isWeeklyBundle =
        rawPeriod === "weekly" ||
        data.bundle_type === "weekly" ||
        weekField !== "";

      let period = NaN;
      const weekMatch = String(weekField).match(/^W(\d{2})$/i);
      if (weekMatch) {
        period = Number(weekMatch[1]);
      } else if (weekField !== "" && !isNaN(parseInt(weekField))) {
        period = parseInt(weekField);
      } else {
        const parsed = parseInt(data.periodo);
        period = isNaN(parsed) ? 1 : parsed;
      }
    if (!Number.isFinite(period)) continue;
    if (!generateAllWeekly && period !== targetPeriod) continue;
    if (generateAllWeekly && !isWeeklyBundle) continue;
    const packId = `week-${period}`;

    // Normalize country code
    let rawCountry = (data.country || countryFolder).toLowerCase();
    let countryCode = rawCountry;
    const countryMap = {
      colombia: "co",
      mexico: "mx",
      peru: "pe",
      chile: "cl",
      ecuador: "ec",
      argentina: "ar",
      guatemala: "gt",
      brasil: "br",
      brazil: "br",
      spain: "es",
      espana: "es",

      panama: "pa",

      "guinea-ecuatorial": "gq",
      nicaragua: "ni",
      dominican_republic: "do",
      "costa-rica": "cr",
      costa_rica: "cr",
      costarica: "cr",
      honduras: "hn",
      uruguay: "uy",
      paraguay: "py",
      "puerto-rico": "pr",
      puerto_rico: "pr",
      "el-salvador": "sv",
      el_salvador: "sv",
      elsalvador: "sv",
      bolivia: "bo",

      global: "",
    };
    if (countryMap[countryCode] !== undefined) {
      countryCode = countryMap[countryCode];
    }

    const cleanSubject = String(subject || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

    const isEnglish = cleanSubject === "ingles" || cleanSubject === "english";
    const safeSubject = isEnglish
      ? "ingles"
      : subject
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[\/\s-]/g, "_")
          .replace(/[^a-z0-9_]/g, "");

    // Allow English to remain country-specific so contexts don't bleed.

    const prefix = countryCode ? `${countryCode}-` : "";
    const packKey = `${prefix}${packId}-grade-${grade}-subject-${safeSubject}`;

    if (!packs[packKey]) {
      packs[packKey] = {
        metadata: {
          grade,
          subject,
          country: countryCode || "global",
          pack_id: packKey,
          generated_at: new Date().toISOString(),
        },
        questions: [],
      };
    }

    questions.forEach((q) => {
      packs[packKey].questions.push({
        ...q,
        bundle_id: path.basename(file, ".md"),
        periodo: period,
        protocol_version: String(protocol),
        cefr_level: data.cefr_level || null,
        subject: packs[packKey].metadata.subject,
        grade: packs[packKey].metadata.grade,
        country: packs[packKey].metadata.country,
      });
    });
  } catch (e) {
    console.error(`Error processing ${file}: ${e.message}`);
  }
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, "package.json"), "utf8"),
);
const version = packageJson.version || "1.0.0";

// Write packs, current.json, and metadata.json to each served static pack root.
for (const outputDir of OUTPUT_DIRS) {
  for (const [key, data] of Object.entries(packs)) {
    const outputPath = path.join(outputDir, `${key}.json`);
    const outputData = JSON.parse(JSON.stringify(data));
    if (fs.existsSync(outputPath)) {
      try {
        const existingPack = JSON.parse(fs.readFileSync(outputPath, "utf8"));
        if (existingPack?.metadata?.generated_at) {
          outputData.metadata.generated_at = existingPack.metadata.generated_at;
        }
      } catch (e) {
        console.error(`Error reading existing pack metadata: ${e.message}`);
      }
    }
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(
      `Generated ${outputPath} with ${outputData.questions.length} questions`,
    );
  }

  const currentPath = path.join(outputDir, "current.json");
  let lastUpdate = new Date().toISOString();
  if (fs.existsSync(currentPath)) {
    try {
      const existingCurrent = JSON.parse(fs.readFileSync(currentPath, "utf8"));
      if (existingCurrent?.last_update) {
        lastUpdate = existingCurrent.last_update;
      }
    } catch (e) {
      console.error(`Error reading existing current.json: ${e.message}`);
    }
  }

  fs.writeFileSync(
    currentPath,
    JSON.stringify({ version, last_update: lastUpdate }, null, 2),
  );

  let allPacks = Object.keys(packs);
  const metadataPath = path.join(outputDir, "metadata.json");
  if (fs.existsSync(metadataPath)) {
    try {
      const existingMetadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
      if (existingMetadata.packs && Array.isArray(existingMetadata.packs)) {
        const existingPacks = existingMetadata.packs.filter(
          (pack) => !String(pack).startsWith("colombia-week-"),
        );
        const packSet = new Set([...existingPacks, ...allPacks]);
        allPacks = Array.from(packSet);
      }
    } catch (e) {
      console.error(`Error reading existing metadata: ${e.message}`);
    }
  }

  fs.writeFileSync(
    metadataPath,
    JSON.stringify({ packs: allPacks.sort() }, null, 2),
  );
}

console.log("Static packs generation completed.");

