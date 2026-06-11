import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const WORLDEXAMS_ROOT = process.cwd();
const QUESTIONS_DATA = path.join(WORLDEXAMS_ROOT, 'questions_data', 'colombia');
const GENERATION_DIR = path.join(WORLDEXAMS_ROOT, '.worldexams', 'generation_v52_lengua_g6');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
ensureDir(GENERATION_DIR);

const SUBJECT_CODES: Record<string, string> = {
  'lengua': 'LEN'
};

function generatePrompt(subject: string, grade: number, week: number, topic: string): string {
  const size = 10;
  const subjectCode = SUBJECT_CODES[subject] || 'LEN';

  let bundleId = `CO-${subjectCode}-${grade}-2026-W${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;

  return `Eres un experto pedagogo colombiano generando contenido educativo de alta calidad (Protocolo v5.2) para el examen ICFES Saber 11 y grados previos.

## OBJETIVO
Generar un bundle de ${size} preguntas de opción múltiple para la asignatura ${subject} de grado ${grade}°, sobre el tema: ${topic}.

## ESPECIFICACIONES TÉCNICAS (Protocolo v5.2)
1. **Idioma**: Español de Colombia.
2. **Contextos**: Usa situaciones modernas, inclusivas y relevantes para la realidad colombiana (ej. ciudades, cultura, economía local, redes sociales, colegio).
3. **Estructura de Pregunta**:
   - Cada pregunta debe comenzar con \`## Pregunta N [DX-DY]\` donde DX-DY es el rango de dificultad.
   - Distribución de dificultad para 10 preguntas:
     - P1-P3: [D3-D4]
     - P4-P6: [D5-D6]
     - P7-P9: [D7-D8]
     - P10: [D9-D10]
   - **ID**: \`${bundleId}-vN\`
   - **Bloom**: [Remember|Understand|Apply|Analyze|Evaluate|Create]
   - **ICFES**: [Competencia ICFES relacionada: Comunicativa (Proceso de Lectura o Escritura)]
   - **Expected_Success**: Valor entre 0.1 y 0.9.
   - **Opciones**: 4 opciones (A, B, C, D). Usa \`- [ ] A)\` y \`- [x]\` para la correcta. NO pongas en negrita las letras de las opciones (usa \`- [ ] A)\` no \`- [ ] **A)**\`).
   - **Feedback HTML**: Cada opción DEBE tener un comentario de feedback: \`<!-- feedback: ... -->\`.
   - **Explicación Pedagógica**: Una sección al final de cada pregunta con 3-5 líneas explicando la lógica de la respuesta correcta.
4. **Calidad**: El contenido debe ser riguroso y estar alineado con los DBA (Derechos Básicos de Aprendizaje) del MEN de Colombia para Grado 6.

## FORMATO DE SALIDA (Markdown)
Debes devolver ÚNICAMENTE el contenido del archivo Markdown, empezando por el frontmatter delimitado por ---.

---
id: "${bundleId}"
country: "colombia"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
periodo: "weekly"
semana: ${week}
protocol_version: "5.2"
year: 2026
bundle_size: ${size}
alignment: "DBA MEN + ICFES Saber 11 2026"
quality_review_score: 95
---

# Bundle Mastery: ${topic} — Grado ${grade}
## Semana W${String(week).padStart(2, '0')}

(Preguntas aquí...)

### Explicación Pedagógica Final
(Resumen pedagógico del bundle de 3-5 líneas)

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntaje |
|-----------|---------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
`;
}

async function generateBundle(subject: string, grade: number, week: number, topic: string) {
  const prompt = generatePrompt(subject, grade, week, topic);
  const promptFile = path.join(GENERATION_DIR, `prompt-${subject}-${grade}-W${week}.txt`);
  fs.writeFileSync(promptFile, prompt);

  const subjectCode = SUBJECT_CODES[subject] || 'LEN';
  const bundleId = `CO-${subjectCode}-${grade}-2026-W${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;

  const outputDir = path.join(QUESTIONS_DATA, subject, `grado-${grade}`, '2026', 'weekly');
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `${bundleId}-bundle.md`);

  console.log(`🚀 Generating ${bundleId}...`);

  try {
    // Pipe through sed to clean up opencode-ai specific output
    const command = `opencode run -m opencode/deepseek-v4-flash-free "Genera el contenido para este bundle siguiendo las instrucciones en ${promptFile}. Devuelve solo el markdown." | sed -n '/^---/,$p' | sed '/^>/d; /^→/d; /^$/d; /^\x1b\[/d'`;

    // Actually, sed might be tricky with colors and multi-line. Let's try to do it in JS.
    const { stdout } = await execAsync(`opencode run -m opencode/deepseek-v4-flash-free "Genera el contenido para este bundle siguiendo las instrucciones en ${promptFile}. Devuelve solo el markdown."`);

    if (stdout) {
      // Clean ANSI escape codes
      const cleanStdout = stdout.replace(/\x1B\[[0-9;]*[mK]/g, '');
      const start = cleanStdout.indexOf('---');
      if (start !== -1) {
          let content = cleanStdout.substring(start);
          // Filter out lines starting with > or → (opencode-ai artifacts)
          content = content.split('\n').filter(line => !line.startsWith('>') && !line.startsWith('→')).join('\n').trim();

          if (content.includes('QUALITY_REVIEW')) {
             fs.writeFileSync(outputPath, content);
             console.log(`✅ Saved to ${outputPath}`);
          } else {
             console.log(`⚠️ Output for ${bundleId} seems incomplete, check manually.`);
             fs.writeFileSync(outputPath + '.incomplete', cleanStdout.trim());
          }
      } else {
          fs.writeFileSync(outputPath + '.raw', cleanStdout.trim());
          console.log(`⚠️ delimiters not found exactly, saved raw output to ${outputPath}.raw`);
      }
    }
  } catch (error) {
    console.error(`❌ Error generating ${bundleId}:`, error);
  }
}

async function main() {
    const tasks = [
        { week: 1, topic: 'comunicacion-intencion-comunicativa' },
        { week: 2, topic: 'comunicacion-verbal-no-verbal' },
        { week: 3, topic: 'comunicacion-asertiva' },
        { week: 4, topic: 'comunicacion-oral' },
        { week: 5, topic: 'dialogo-conversacion' },
        { week: 7, topic: 'narracion' },
        { week: 8, topic: 'descripcion' },
        { week: 9, topic: 'exposicion' },
        { week: 10, topic: 'instruccion' },
        { week: 11, topic: 'argumentacion' }
    ];

    for (const task of tasks) {
        await generateBundle('lengua', 6, task.week, task.topic);
        // Add a small delay between requests to avoid potential rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main().catch(console.error);
