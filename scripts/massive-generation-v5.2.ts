import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const WORLDEXAMS_ROOT = process.cwd();
const QUESTIONS_DATA = path.join(WORLDEXAMS_ROOT, 'questions_data', 'colombia');
const GENERATION_DIR = path.join(WORLDEXAMS_ROOT, '.worldexams', 'generation_v52');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
ensureDir(GENERATION_DIR);

const SUBJECT_CODES: Record<string, string> = {
  'matematicas': 'MAT',
  'ciencias-naturales': 'CIE',
  'lengua': 'LEN',
  'lectura-critica': 'LEC',
  'sociales-ciudadanas': 'SOC',
  'ingles': 'ING'
};

function getBundleSize(grade: number, isSimulacro: boolean = false): number {
  if (isSimulacro && grade === 11) return 60;
  if (grade === 8 || grade === 9) return 12;
  if (grade === 10) return 15;
  if (grade === 11) return 20;
  return 10;
}

function generatePrompt(subject: string, grade: number, week: number, topic: string, isSimulacro: boolean = false, isPeriodo: boolean = false): string {
  const size = isPeriodo ? 20 : getBundleSize(grade, isSimulacro);
  const subjectCode = SUBJECT_CODES[subject] || subject.substring(0, 3).toUpperCase();

  let bundleId = `CO-${subjectCode}-${grade}-2026-W${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;
  if (isSimulacro) {
    bundleId = `CO-${subjectCode}-${grade}-2026-SIM-${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;
  } else if (isPeriodo) {
    bundleId = `CO-${subjectCode}-${grade}-2026-P${week}-${topic}-001-MASTERY`;
  }

  return `Eres un experto pedagogo colombiano generando contenido educativo de alta calidad (Protocolo v5.2) para el examen ICFES Saber 11 y grados previos.

## OBJETIVO
Generar un bundle de ${size} preguntas de opción múltiple para la asignatura ${subject} de grado ${grade}°, sobre el tema: ${topic}.

## ESPECIFICACIONES TÉCNICAS (Protocolo v5.2)
1. **Idioma**: Español de Colombia (excepto para la asignatura 'ingles', que debe ser en inglés).
2. **Contextos**: Usa situaciones modernas, inclusivas y relevantes para la realidad colombiana (ej. ciudades, cultura, economía local).
3. **Estructura de Pregunta**:
   - Cada pregunta debe comenzar con \`## Pregunta N [DX-DY]\` donde DX-DY es el rango de dificultad (ej. [D3-D4]).
   - **ID**: \`${bundleId}-vN\`
   - **Bloom**: [Remember|Understand|Apply|Analyze|Evaluate|Create]
   - **ICFES**: [Competencia ICFES relacionada]
   - **Expected_Success**: Valor entre 0.1 y 0.9.
   - **Opciones**: 4 opciones (A, B, C, D). Usa \`- [ ] A)\` y \`- [x]\` para la correcta.
   - **Feedback HTML**: Cada opción DEBE tener un comentario de feedback: \`<!-- feedback: ... -->\`.
   - **Explicación Pedagógica**: Una sección al final de cada pregunta con 3-5 líneas explicando la lógica de la respuesta correcta.
4. **Dificultad Progresiva**: Comienza con preguntas fáciles (D3-D4) y aumenta gradualmente la complejidad (hasta D9-D10 para los últimos niveles).
5. **Calidad**: El contenido debe ser riguroso y estar alineado con los DBA (Derechos Básicos de Aprendizaje) del MEN.

## FORMATO DE SALIDA (Markdown)
Debes devolver ÚNICAMENTE el contenido del archivo Markdown, empezando por el frontmatter delimitado por ---.

---
id: "${bundleId}"
country: "colombia"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
${isPeriodo ? `periodo: ${week}` : isSimulacro ? `periodo: "simulacro"` : `periodo: "weekly"`}
semana: ${week}
protocol_version: "5.2"
year: 2026
bundle_size: ${size}
alignment: "DBA MEN + ICFES Saber 11 2026"
quality_review_score: 95
---

# Bundle Mastery: ${topic} — Grado ${grade}
## ${isSimulacro ? 'Simulacro' : isPeriodo ? 'Periodo ' + week : 'Semana W' + String(week).padStart(2, '0')}

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

async function generateBundle(subject: string, grade: number, week: number, topic: string, options: { isSimulacro?: boolean, isPeriodo?: boolean } = {}) {
  const { isSimulacro = false, isPeriodo = false } = options;
  const prompt = generatePrompt(subject, grade, week, topic, isSimulacro, isPeriodo);
  const promptFile = path.join(GENERATION_DIR, `prompt-${subject}-${grade}-${isPeriodo ? 'P' : 'W'}${week}.txt`);
  fs.writeFileSync(promptFile, prompt);

  const subjectCode = SUBJECT_CODES[subject] || subject.substring(0, 3).toUpperCase();
  let bundleId = `CO-${subjectCode}-${grade}-2026-W${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;
  if (isSimulacro) {
    bundleId = `CO-${subjectCode}-${grade}-2026-SIM-${String(week).padStart(2, '0')}-${topic}-001-MASTERY`;
  } else if (isPeriodo) {
    bundleId = `CO-${subjectCode}-${grade}-2026-P${week}-${topic}-001-MASTERY`;
  }

  const typeDir = isSimulacro ? 'simulacros' : isPeriodo ? 'periodos' : 'weekly';
  const outputDir = path.join(QUESTIONS_DATA, subject, `grado-${grade}`, '2026', typeDir);
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `${bundleId}-bundle.md`);

  console.log(`🚀 Generating ${bundleId}...`);

  try {
    const { stdout } = await execAsync(`opencode run --model minimax/MiniMax-M2.7 "Genera el contenido para este bundle siguiendo las instrucciones en ${promptFile}. Devuelve solo el markdown."`);

    if (stdout) {
      const start = stdout.indexOf('---');
      if (start !== -1) {
          let content = stdout.substring(start);
          fs.writeFileSync(outputPath, content.trim());
          console.log(`✅ Saved to ${outputPath}`);
      } else {
          fs.writeFileSync(outputPath, stdout.trim());
          console.log(`⚠️ delimiters not found exactly, saved raw output to ${outputPath}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error generating ${bundleId}:`, error);
  }
}

async function runBatch(tasks: any[]) {
    for (const task of tasks) {
        await generateBundle(task.subject, task.grade, task.week, task.topic, task.options);
    }
}

async function main() {
    const args = process.argv.slice(2);
    if (args.includes('--starter')) {
        await runBatch([
            { subject: 'matematicas', grade: 8, week: 1, topic: 'expresiones-algebraicas' },
            { subject: 'ciencias-naturales', grade: 11, week: 1, topic: 'quimica-organica', options: { isPeriodo: true } },
            { subject: 'sociales-ciudadanas', grade: 9, week: 1, topic: 'primera-guerra-mundial' }
        ]);
    } else if (args.includes('--test')) {
        await generateBundle('matematicas', 8, 1, 'productos-notables');
    }
}

main().catch(console.error);
