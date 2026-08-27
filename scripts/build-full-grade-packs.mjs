import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const QUESTIONS_DATA_ROOT = path.join(ROOT, "questions_data");

const COUNTRY_MAP = {
  colombia: "co",
  co: "co",
  mexico: "mx",
  mx: "mx",
  peru: "pe",
  pe: "pe",
  chile: "cl",
  cl: "cl",
  ecuador: "ec",
  ec: "ec",
  argentina: "ar",
  ar: "ar",
  guatemala: "gt",
  gt: "gt",
  brasil: "br",
  brazil: "br",
  br: "br",
  spain: "es",
  espana: "es",
  es: "es",
  panama: "pa",
  pa: "pa",
  "guinea-ecuatorial": "gq",
  gq: "gq",
  nicaragua: "ni",
  ni: "ni",
  dominican_republic: "do",
  do: "do",
  "costa-rica": "cr",
  costa_rica: "cr",
  costarica: "cr",
  cr: "cr",
  honduras: "hn",
  hn: "hn",
  uruguay: "uy",
  uy: "uy",
  paraguay: "py",
  py: "py",
  "puerto-rico": "pr",
  puerto_rico: "pr",
  pr: "pr",
  "el-salvador": "sv",
  el_salvador: "sv",
  elsalvador: "sv",
  sv: "sv",
  bolivia: "bo",
  bo: "bo",
};

export function parseArgs(argv) {
  const args = argv.slice(2);
  let country = "co";
  let grade = 11;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--country" && args[i + 1]) {
      country = args[i + 1];
      i++;
    } else if (args[i].startsWith("--country=")) {
      country = args[i].split("=")[1];
    } else if (args[i] === "--grade" && args[i + 1]) {
      grade = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i].startsWith("--grade=")) {
      grade = parseInt(args[i].split("=")[1], 10);
    }
  }

  return { country, grade };
}

export function parseProtocol(frontmatter, filePath) {
  const explicit = String(
    frontmatter.protocol_version || frontmatter.bundle_version || ""
  ).match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes("-pro-v5") || lower.includes("-v5-bundle")) return 5;
  if (lower.includes("-pro-v4") || lower.includes("-v4-bundle")) return 4;
  if (lower.includes("-v3-bundle")) return 3;
  if (lower.includes("-bundle")) return 2;
  return null;
}

export function readMarkdownWithFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: fileContent };

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

  return { data, content: fileContent.slice(match[0].length) };
}

export function getTextoBaseSections(body) {
  const tbHeaders = [];
  const tbRegex = /^##\s+Texto\s+[Bb]ase[\s\S]*?(?=^##\s+(?:Pregunta|Question)\s+\d)/gim;
  let tbMatch;
  while ((tbMatch = tbRegex.exec(body)) !== null) {
    tbHeaders.push({
      index: tbMatch.index,
      text: tbMatch[0].trim(),
    });
  }
  return tbHeaders;
}

export function extractTextoBaseContent(tbSection) {
  const lines = tbSection.split(/\r?\n/);
  let contentLines = [];
  let started = false;
  for (const line of lines) {
    if (!started && line.startsWith("## ")) continue;
    if (!started && line.trim() === "") continue;
    started = true;
    contentLines.push(line);
  }
  return contentLines.join("\n").trim();
}

export function parseQuestions(body) {
  const sections = [];
  const headerRegex = /^##\s+(?:Pregunta|Question)\s+\d+.*$/gim;
  let match;
  const matches = [];

  while ((match = headerRegex.exec(body)) !== null) {
    matches.push({ index: match.index, header: match[0] });
  }

  const tbHeaders = getTextoBaseSections(body);
  const textoBaseForQuestion = [];
  for (let i = 0; i < matches.length; i++) {
    const qPos = matches[i].index;
    let bestTb = null;
    for (const tb of tbHeaders) {
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

    const idMatch = section.match(
      /(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/
    );
    const id = idMatch ? idMatch[1] || idMatch[2] || idMatch[3] : `q-${i}`;

    const diffMatch =
      matches[i].header.match(/\((?:Nivel|Dificultad):?\s*(\d+)\)/i) ||
      section.match(/(?:Nivel|Dificultad):?\s*(\d+)/i) ||
      matches[i].header.match(/\[D(\d+)-D(\d+)\]/) ||
      matches[i].header.match(/\[D(\d+)\]/) ||
      section.match(/\[D(\d+)-D(\d+)\]/);

    let difficulty = 3;
    if (diffMatch) {
      difficulty = diffMatch[2] ? Number(diffMatch[2]) : Number(diffMatch[1]);
    }

    const afterHeader = section.slice(matches[i].header.length).trim();
    const optionsStart = afterHeader.search(/^\s*-\s*\[[x ]\]/m);
    let rawStatement =
      optionsStart !== -1
        ? afterHeader.slice(0, optionsStart).trim()
        : afterHeader;

    const contextHeadingMatch = section.match(
      /###\s*(?:Contexto|Context|Texto)([\s\S]*?)(?:###|##|$)/i
    );
    const contextInlineMatch = section.match(
      /\*\*(?:Contexto|Context):\*\*\s*([\s\S]*?)(?=\r?\n###\s+(?:Enunciado|Statement|Question|Opciones)|\r?\n\s*(?:-\s*)?\[|$)/i
    );
    const context = contextHeadingMatch
      ? contextHeadingMatch[1].trim()
      : contextInlineMatch
      ? contextInlineMatch[1].trim()
      : textoBaseForQuestion[i]
      ? textoBaseForQuestion[i]
      : "";

    const bloomMatch = section.match(/\*\*Bloom:\*\*\s*([^\n]+)/i);
    const icfesMatch = section.match(/\*\*ICFES:\*\*\s*([^\n]+)/i);
    const expectedSuccessMatch = section.match(/\*\*Expected_Success:\*\*\s*([^\n]+)/i);

    let statement = "";
    const enunciadoMatch = section.match(
      /###\s*(?:Enunciado|Statement|Question)([\s\S]*?)(?:###|##|$)/i
    );
    if (enunciadoMatch) {
      statement = enunciadoMatch[1].trim();
    } else {
      let cleanedRaw = rawStatement;
      if (contextHeadingMatch) {
        cleanedRaw = cleanedRaw.replace(contextHeadingMatch[0], "");
      }
      cleanedRaw = cleanedRaw.replace(
        /\*\*(?:Context|Contexto):\*\*\s*([\s\S]*?)(?=\r?\n###\s+(?:Enunciado|Statement|Question|Opciones)|\r?\n\s*(?:-\s*)?\[|$)/gi,
        ""
      );
      statement = cleanedRaw
        .replace(/(?:\*\*ID:\*\*|ID:)\s*(?:`[^`]+`|"[^"]+"|[A-Za-z0-9._:-]+)/g, "")
        .replace(/\*\*Bloom:\*\*.*$/gm, "")
        .replace(/\*\*ICFES:\*\*.*$/gm, "")
        .replace(/\*\*Expected_Success:\*\*.*$/gm, "")
        .replace(/^\s*###\s+Contexto/gm, "")
        .replace(/^\s*###\s+Enunciado/gm, "")
        .replace(/^\s*\*\*\d+\.\*\*/gm, "")
        .trim();
    }

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
      const text = rawOption.replace(/<!--\s*feedback:[\s\S]*?-->/, "").trim();
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : "";
      options.push({ letter, text, is_correct: isCorrect, feedback });
      if (isCorrect) correctId = letter;
    }

    const expMatch = section.match(
      /###\s*(?:Explicaci(?:o|\u00f3)n(?:\s+Pedag(?:o|\u00f3)gica)?|Explanation)([\s\S]*?)(?:##|$)/i
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
      bloom: bloomMatch ? bloomMatch[1].trim() : undefined,
      icfes_type: icfesMatch ? icfesMatch[1].trim() : undefined,
      expected_success: expectedSuccessMatch
        ? parseFloat(expectedSuccessMatch[1].trim())
        : undefined,
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

export function buildFullGradePack(options = {}) {
  const inputRoot = options.rootDir || QUESTIONS_DATA_ROOT;
  const rawCountry = (options.country || "co").toLowerCase();
  const targetGrade = parseInt(options.grade ?? 11, 10);
  const countryCode = COUNTRY_MAP[rawCountry] || rawCountry;

  const allFiles = walk(inputRoot);
  const uniqueQuestionIds = new Set();
  const aggregatedQuestions = [];
  const subjectsSet = new Set();

  for (const file of allFiles) {
    const normalizedPath = file.split(path.sep).join("/");
    if (
      /\/periodo-\d+\/periodo-\d+\//i.test(normalizedPath) ||
      normalizedPath.includes("/legacy/")
    ) {
      continue;
    }

    const fileContent = fs.readFileSync(file, "utf8");
    const { data, content } = readMarkdownWithFrontmatter(fileContent);

    if (
      content.includes("Distractor 1") ||
      content.includes("Opcion correcta") ||
      content.includes("Opcion B")
    ) {
      continue;
    }

    const protocol = parseProtocol(data, file);
    if (!protocol || protocol < 3) continue;

    const relPath = path.relative(inputRoot, file);
    const parts = relPath.split(path.sep);
    const countryFolder = parts[0];

    let fileCountryCode = COUNTRY_MAP[data.country] || COUNTRY_MAP[countryFolder] || (data.country || countryFolder).toLowerCase();
    if (fileCountryCode !== countryCode) continue;

    const rawGrade = String(data.grado || file.match(/grado-(\d+)/)?.[1] || "11");
    const fileGrade = rawGrade.toUpperCase() === "3EM" ? 11 : parseInt(rawGrade, 10);
    if (fileGrade !== targetGrade) continue;

    let subject = data.asignatura || data.subject;
    if (!subject) {
      if (parts[1] && parts[1].startsWith("grado-")) {
        subject = countryFolder;
      } else {
        subject = parts[1] || countryFolder;
      }
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

    const questions = parseQuestions(content);
    if (questions.length === 0) continue;

    subjectsSet.add(safeSubject);

    for (const q of questions) {
      if (uniqueQuestionIds.has(q.id)) continue;
      uniqueQuestionIds.add(q.id);

      aggregatedQuestions.push({
        ...q,
        bundle_id: path.basename(file, ".md"),
        protocol_version: String(protocol),
        cefr_level: data.cefr_level || null,
        subject: safeSubject,
        grade: targetGrade,
        country: countryCode,
      });
    }
  }

  return {
    country: countryCode,
    grade: targetGrade,
    version: "5.2",
    generated_at: Date.now(),
    total_questions: aggregatedQuestions.length,
    subjects: Array.from(subjectsSet),
    questions: aggregatedQuestions,
  };
}

if (process.argv[1] && process.argv[1].endsWith("build-full-grade-packs.mjs")) {
  const { country, grade } = parseArgs(process.argv);
  const fullPackData = buildFullGradePack({ country, grade });

  const outputDir = path.join(
    ROOT,
    "apps",
    "worldexams-api",
    "public",
    "v1",
    "grades"
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(
    outputDir,
    `${fullPackData.country}-grado-${fullPackData.grade}-full.json`
  );
  fs.writeFileSync(outputPath, JSON.stringify(fullPackData, null, 2));

  console.log(
    `Generated ${outputPath} with ${fullPackData.total_questions} total questions across ${fullPackData.subjects.length} subjects.`
  );
}
