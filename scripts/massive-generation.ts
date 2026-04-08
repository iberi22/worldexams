/**
 * MASSIVE GENERATION ORCHESTRATOR
 * WorldExams - Grade 11 ICFES Bundle Generation
 * 
 * Uses multiple agents in parallel to generate MASTERY bundles
 * Protocol v5.1 - All bundles marked as UNREVISED for curation pipeline
 * 
 * Usage:
 *   node scripts/massive-generation.js --grade=11 --all
 *   node scripts/massive-generation.js --grade=11 --subject=matematicas
 *   node scripts/massive-generation.js --batch=G11-MAT-001
 */

import * as fs from 'fs';
import * as path from 'path';

const WORLDEXAMS_ROOT = 'E:\\scripts-python\\worldexams';
const QUESTIONS_DATA = path.join(WORLDEXAMS_ROOT, 'questions_data', 'colombia');
const GENERATION_DIR = path.join(WORLDEXAMS_ROOT, '.worldexams', 'generation');
const HISTORY_DIR = path.join(GENERATION_DIR, 'history');

// Ensure directories exist
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
ensureDir(GENERATION_DIR);
ensureDir(HISTORY_DIR);

// Topic definitions for Grade 11 ICFES - Aligned with MEN 2026 Curriculum
// Source: docs/specs/ICFES_CURRICULUM.md + ICFES Official Guidelines 2026
// Structure: 4 periods per year (Colombian school calendar)
const TOPICS: Record<string, Record<number, string[]>> = {
  // MATHEMATICS - ICFES Components: Numérico-variacional, Geométrico-métrico, Aleatorio
  'matematicas': {
    1: [
      'numeros-reales',        // Números reales, intervalos, valor absoluto
      'expresiones-algebraicas', // Polinomios, factorización
      'ecuaciones-lineales',   // Ecuaciones y sistemas lineales
      'funciones-elementales'   // Función lineal, cuadrática, exponencial
    ],
    2: [
      'funciones-polinomicas',  // Polinomios, divisibilidad
      'funciones-exponenciales-logaritmicas', // Crecimiento, decaimiento
      'trigonometria',          // Razones trigonométricas, identidades
      'geometria-euclidiana'    // Figuras planas, perímetro, área
    ],
    3: [
      'geometria-analitica',    // Cónicas, ecuaciones de rectas
      'estadistica-descriptiva', // Media, mediana, moda, desviación
      'probabilidad-basica',     // Eventos, reglas de probabilidad
      'sucesiones- series'       // Progresiones aritméticas y geométricas
    ],
    4: [
      'derivadas',              // Interpretación geométrica, reglas
      'aplicaciones-derivada',  // Máximos, mínimos, razón de cambio
      'estadistica-inferencial', // Distribuciones, muestreo
      'combinatoria'            // Permutaciones, combinaciones
    ]
  },

  // READING CRITICAL - ICFES Levels: Literal (20%), Inferencial (40%), Crítico (40%)
  'lectura-critica': {
    1: [
      'comprension-literal',    // Información explícita en textos
      'textos-narrativos',      // Cuentos, novelas, estructura narrativa
      'textos-informativos'     // Científicos, históricos, periodísticos
    ],
    2: [
      'inferencia-textual',     // Deducciones, implicaciones
      'textos-argumentativos',  // Ensayos, editoriales, estructura argumentativa
      'vocabulario-contexto'    // Significados, sinonimia, antonimia
    ],
    3: [
      'texto-filosofico',       // Textos de filosofía, ética, ontología
      'pensamiento-critico',    // Evaluación, juicio crítico, falacias
      'relaciones-intertextuales' // Comparaciones entre textos
    ],
    4: [
      'analisis-estructural',   // Coherencia, cohesión, conectores
      'interpretacion-figuras', // Infografías, tablas, gráficos
      'produccion-argumentativa' // Construcción de argumentos válidos
    ]
  },

  // NATURAL SCIENCES - ICFES Components: Biología, Química, Física
  'ciencias-naturales': {
    1: [
      'celula-biologia',        // Estructura celular, organelles
      'genetica-herencia',      // Leyes de Mendel, ADN, ARN
      'estructura-atomica',     // Modelos atómicos, tabla periódica
      'enlaces-quimicos'        // Iónicos, covalentes, metálicos
    ],
    2: [
      'reacciones-quimicas',    // Estequiometría, balanceo
      'movimiento-fisica',     // Cinemática, dinámica
      'ecosistemas-ecologia',   // Cadenas alimenticias, biomas Colombia
      'enlaces-energia'        // Termoquímica, entalpía
    ],
    3: [
      'termodinamica',          // Leyes, máquinas térmicas
      'ondas-sonido',           // Propagación, características
      'electromagnetismo',     // Campos eléctricos, magnéticos
      'evolucion-biologia'     // Teorías, evidencia, selección natural
    ],
    4: [
      'quimica-organica',       // Grupos funcionales, polímeros
      'bioquimica',            // Carbohidratos, lípidos, proteínas
      'electricidad-circuitos', // Corriente, resistencia, Ley de Ohm
      'optica-fisica'          // Reflexión, refracción, lentes
    ]
  },

  // SOCIAL SCIENCES & CITIZENSHIP - ICFES Components
  'sociales-ciudadanas': {
    1: [
      'historia-colombiana',    // Desde independence hasta siglo XX
      'geografia-colombia',     // Regiones naturales, división política
      'conceptos-economicos'    // Oferta, demanda, mercado
    ],
    2: [
      'constitucion-politica',  // Derechos fundamentales, artículos clave
      'derechos-humanos',       // Declaración universal, tratados
      'participacion-ciudadana' // Democracia, voto, control social
    ],
    3: [
      'geopolitica-mundial',    // Conflictos internacionales, organismos
      'economia-colombiana',   // TLC, ekspor, desarrollo
      'diversidad-cultural'     // Etnias, pluriculturalidad
    ],
    4: [
      'problemas-ambientales',  // Deforestación, minería, agua
      'globalizacion-impactos', // Economía mundial, tecnología
      'pensamiento-politico'    // Teorías políticas, ideologías
    ]
  },

  // ENGLISH - ICFES MCER Levels: A-, A1, A2, B1, B+
  'ingles': {
    1: [
      'vocabulario-basico',    // Everyday vocabulary, family, routines
      'gramatica-simple-present', // Present simple, present continuous
      'reading-comprehension-a' // Short texts, main idea, explicit info
    ],
    2: [
      'vocabulario-intermedio', // Technology, environment, health
      'gramatica-past-future',   // Past simple, will, going to
      'reading-inferential'     // Inferences, implied meaning
    ],
    3: [
      'vocabulario-avanzado',  // Abstract concepts, academic language
      'gramatica-conditional',   // Zero, first, second conditionals
      'writing-structure'       // Paragraphs, coherence, connectors
    ],
    4: [
      'uso-del-lenguaje',      // Cloze test, transformations
      'english-b1-b2',         // Complex texts, summaries
      'comunicacion-efectiva'  // Pragmatic competence, register
    ]
  }
};

// Available agents - ordered by capability (newest/most capable first)
// NOTE: minimax-m2.5-hs removed - use minimax-m2.7 instead
const AGENTS = [
  { name: 'minimax-m2.7', model: 'minimax/MiniMax-M2.7', provider: 'minimax' },
  { name: 'kimi-k2-thinking', model: 'google-vertex/moonshotai/kimi-k2-thinking-maas', provider: 'google-vertex' },
  { name: 'glm-5', model: 'google-vertex/zai-org/glm-5-maas', provider: 'google-vertex' },
  { name: 'gemini-3.1-pro', model: 'google/gemini-3.1-pro-preview', provider: 'google' },
];

// Queue of generation tasks
interface GenerationTask {
  id: string;
  subject: string;
  grado: number;
  periodo: number;
  topic: string;
  bundleIndex: number;
  agent: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  outputPath?: string;
  error?: string;
}

interface QueueState {
  tasks: GenerationTask[];
  lastUpdated: string;
  batchId: string;
}

// Load or create queue
function loadQueue(): QueueState {
  const queuePath = path.join(GENERATION_DIR, 'queue.json');
  if (fs.existsSync(queuePath)) {
    return JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
  }
  return {
    tasks: [],
    lastUpdated: new Date().toISOString(),
    batchId: `G11-${Date.now()}`
  };
}

function saveQueue(queue: QueueState) {
  queue.lastUpdated = new Date().toISOString();
  fs.writeFileSync(
    path.join(GENERATION_DIR, 'queue.json'),
    JSON.stringify(queue, null, 2)
  );
}

// Add tasks to queue
function addTasks(tasks: Omit<GenerationTask, 'id' | 'status' | 'createdAt'>[]) {
  const queue = loadQueue();
  for (const task of tasks) {
    queue.tasks.push({
      ...task,
      id: `${task.subject}-${task.grado}-P${task.periodo}-${task.topic}-${task.bundleIndex}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  }
  saveQueue(queue);
  return queue.tasks.length;
}

function getAgentForTask(taskNum: number) {
  return AGENTS[taskNum % AGENTS.length];
}

// Generate prompt for a bundle
function generatePrompt(subject: string, grado: number, periodo: number, topic: string, bundleIndex: number): string {
  const subjectLabels: Record<string, string> = {
    'matematicas': 'Matemáticas',
    'lectura-critica': 'Lectura Crítica',
    'ciencias-naturales': 'Ciencias Naturales',
    'sociales-ciudadanas': 'Sociales Ciudadanas',
    'ingles': 'Inglés'
  };

  const bundleId = `CO-${subject.substring(0, 3).toUpperCase()}-${grado}-P${periodo}-${topic}-${String(bundleIndex).padStart(3, '0')}-MASTERY`;

  return `Eres un experto en generar preguntas tipo ICFES Saber 11 para el examen de estado colombiano.

## REFERENCIA CURRICULAR OFICIAL (MEN 2026)
Debes seguir EXACTAMENTE los componentes y competencias del ICFES:

### Matemáticas (50 preguntas en ICFES):
- **Interpretación (30%):** Leer y comprender información matemática
- **Formulación (35%):** Plantear modelos matemáticos
- **Validación (35%):** Verificar procedimientos y resultados
- **Componentes:** Numérico-variacional, Geométrico-métrico, Aleatorio

### Lectura Crítica (41 preguntas):
- **Literal (20%):** Información explícita
- **Inferencial (40%):** Deducir información implícita
- **Crítico (40%):** Evaluar, argumentar, relacionar

### Ciencias Naturales (58 preguntas):
- **Uso del conocimiento:** Aplicar conceptos científicos
- **Explicación de fenómenos:** Argumentar científicamente
- **Componentes:** Biología, Química, Física

### Sociales y Ciudadanas (50 preguntas):
- **Pensamiento social:** Conceptos disciplinares
- **Interpretación y análisis:** Fuentes históricas, datos
- **Pensamiento reflexivo:** Postura crítica y argumentación

### Inglés (55 preguntas):
- Niveles MCER: A-, A1, A2, B1, B+

## TU TAREA
Genera EXACTAMENTE 20 preguntas de opción múltiple (A, B, C, D) siguiendo el Protocolo v5.1.

## FORMATO DE SALIDA
Guarda el bundle en: questions_data/colombia/${subject}/grado-${grado}/periodo-${periodo}/${topic}/${bundleId}-bundle.md

## FRONTMATTER (YAML)
---
id: "${bundleId}"
country: "colombia"
grado: ${grado}
asignatura: "${subject}"
tema: "${topic}"
periodo: ${periodo}
protocol_version: "5.1"
bundle_size: 20
bundle_index: ${bundleIndex}
alignment: "ICFES Saber 11 2026 + DBA (Derechos Básicos de Aprendizaje) MEN 2026"

# METADATA DE GENERACIÓN
generation:
  agent: "kimi-k2.5"
  model: "opencode-go/kimi-k2.5"
  timestamp: "${new Date().toISOString()}"
  prompt_version: "v1"
  context_used: true
  research_summary: "Based on ICFES 2025 framework + MEN DBA"

# ESTADO DE CALIDAD
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true

# CURACIÓN
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0

# LICENCIA
license: "CC BY-NC-SA 4.0"
open_source: false
---

## ESTRUCTURA DE CADA PREGUNTA
Usa este formato EXACTO para cada pregunta:

## Question N (Variant Basic - Difficulty X)

**ID:** \`${bundleId}-vN\`
**Bloom:** [Remember|Understand|Apply|Analyze|Evaluate|Create]
**ICFES:** [Competencia ICFES específica]
**Context:** [Contexto moderno y relevante para Colombia]

### Enunciado
[Pregunta clara y completa]

### Options
- [ ] A) [Opción]
- [ ] B) [Opción]
- [x] C) [Opción correcta] <!-- feedback: razón por la cual es correcta -->
- [ ] D) [Opción] <!-- feedback: razón por la cual es incorrecta -->

### Explicación Pedagógica
[Explicación breve de por qué la respuesta correcta es la mejor opción y por qué los distractores son plausibles pero incorrectos]

---

## REGLAS CRÍTICAS

1. **Dificultad progresiva**: Primeros 4 preguntas D3-D4, siguientes 6 D5-D6, siguientes 6 D7-D8, últimos 4 D9-D10
2. **Distractores plausibles**: deben ser errores reales que cometan estudiantes, no opciones absurdas
3. **Alineación ICFES**: Las preguntas deben parecerse al estilo ICFES, no a trivia de libro de texto
4. **Contexto moderno**: Usa situaciones actuales colombianas cuando sea posible
5. **4 opciones obligatorias**: Siempre [x] en la correcta, [ ] en las incorrectas
6. **Sin "todas las anteriores" o "ninguna de las anteriores"**

## MATERIA: ${subjectLabels[subject]}
- Topic: ${topic}
- Periodo: ${periodo} (curricular colombiano)
- Grado: ${grado}

Genera las 20 preguntas siguiendo TODAS las reglas. El archivo debe empezar con el frontmatter YAML y luego las preguntas.
`;
}

// Generation agent runner
async function runAgent(task: GenerationTask): Promise<{ success: boolean; output?: string; error?: string }> {
  const prompt = generatePrompt(task.subject, task.grado, task.periodo, task.topic, task.bundleIndex);
  
  // Get the agent info
  const agentInfo = AGENTS.find(a => a.name === task.agent) || AGENTS[0];
  const agentCmd = getAgentCommand(task.agent, prompt, task.subject);
  
  console.log(`\n🚀 RUNNING: ${task.id}`);
  console.log(`   Agent: ${task.agent} (${agentInfo.model})`);
  console.log(`   Subject: ${task.subject}`);
  console.log(`   Topic: ${task.topic}`);
  
  try {
    const { exec } = await import('child_process');
    
    return new Promise((resolve) => {
      exec(agentCmd, { 
        cwd: WORLDEXAMS_ROOT,
        maxBuffer: 50 * 1024 * 1024, // 50MB buffer for large outputs
        timeout: 600000 // 10 min timeout for premium models
      }, (error, stdout, stderr) => {
        if (error) {
          resolve({ success: false, error: error.message });
        } else {
          resolve({ success: true, output: stdout });
        }
      });
    });
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// Get agent command based on available agents (most capable models)
function getAgentCommand(agentName: string, prompt: string, subject: string): string {
  const promptFile = path.join(GENERATION_DIR, `prompt-${Date.now()}.txt`);
  fs.writeFileSync(promptFile, prompt);
  
  // Map agent names to commands
  switch (agentName) {
    case 'minimax-m2.7':
      return `opencode run --headless --model opencode-go/minimax-m2.7 -y "Execute the prompt in ${promptFile}"`;
    
    case 'kimi-k2-thinking':
      return `opencode run --headless --model google-vertex/moonshotai/kimi-k2-thinking-maas -y "Execute the prompt in ${promptFile}"`;
    
    case 'glm-5':
      return `opencode run --headless --model google-vertex/zai-org/glm-5-maas -y "Execute the prompt in ${promptFile}"`;
    
    case 'gemini-3.1-pro':
      return `gemini -m google/gemini-3.1-pro-preview -p "Execute the instructions in ${promptFile}" -y`;
    
    case 'minimax-m2.5-hs':
      return `opencode run --headless --model minimax/MiniMax-M2.5-highspeed -y "Execute the prompt in ${promptFile}"`;
    
    default:
      return `opencode run --headless --model minimax/MiniMax-M2.7 -y "Execute the prompt in ${promptFile}"`;
  }
}

// Main generation loop
async function generateBatch(batchSize: number = 5) {
  const queue = loadQueue();
  const pendingTasks = queue.tasks.filter(t => t.status === 'pending');
  
  console.log(`\n📦 GENERATION BATCH`);
  console.log(`   Pending tasks: ${pendingTasks.length}`);
  console.log(`   Running: ${batchSize} in parallel`);
  console.log('='.repeat(50));
  
  let completed = 0;
  let failed = 0;
  
  // Process in chunks
  for (let i = 0; i < Math.min(batchSize, pendingTasks.length); i += batchSize) {
    const chunk = pendingTasks.slice(i, i + batchSize);
    
    const promises = chunk.map(async (task) => {
      // Mark as running
      task.status = 'running';
      saveQueue(queue);
      
      const result = await runAgent(task);
      
      if (result.success) {
        task.status = 'completed';
        task.completedAt = new Date().toISOString();
        task.outputPath = `questions_data/colombia/${task.subject}/grado-${task.grado}/periodo-${task.periodo}/${task.topic}/`;
        completed++;
        console.log(`\n✅ COMPLETED: ${task.id}`);
      } else {
        task.status = 'failed';
        task.error = result.error;
        task.completedAt = new Date().toISOString();
        failed++;
        console.log(`\n❌ FAILED: ${task.id} - ${result.error}`);
      }
      
      saveQueue(queue);
      return task;
    });
    
    await Promise.all(promises);
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 BATCH COMPLETE`);
  console.log(`   Completed: ${completed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Remaining: ${pendingTasks.length - completed - failed}`);
  
  // Save history
  const historyPath = path.join(HISTORY_DIR, `batch-${Date.now()}.json`);
  fs.writeFileSync(historyPath, JSON.stringify(queue, null, 2));
  
  return { completed, failed };
}

// CLI
const args = process.argv.slice(2);

async function main() {
  const command = args[0];
  
  if (command === '--init' || command === '--setup') {
    // Initialize queue with all Grade 11 topics
    console.log('🎯 Initializing Grade 11 Generation Queue...\n');
    console.log('Using premium models for maximum quality:\n');
    AGENTS.forEach((a, i) => console.log(`   ${i + 1}. ${a.name} (${a.model})`));
    console.log('');
    
    const tasks: Omit<GenerationTask, 'id' | 'status' | 'createdAt'>[] = [];
    
    let taskNum = 0;
    let bundleNum = 1;
    
    for (const [subject, periods] of Object.entries(TOPICS)) {
      for (const [periodStr, topics] of Object.entries(periods)) {
        const period = parseInt(periodStr);
        
        for (const topic of topics) {
          // Queue 2 bundles per topic (can increase later)
          for (let idx = 1; idx <= 2; idx++) {
            const agent = getAgentForTask(taskNum);
            tasks.push({
              subject,
              grado: 11,
              periodo: period,
              topic,
              bundleIndex: bundleNum,
              agent: agent.name
            });
            
            taskNum++;
            bundleNum++;
          }
        }
      }
    }
    
    const added = addTasks(tasks);
    console.log(`\n✅ Added ${added} generation tasks to queue`);
    console.log(`\nAgent distribution:`);
    for (const agent of AGENTS) {
      const count = tasks.filter(t => t.agent === agent.name).length;
      console.log(`   ${agent.name}: ${count}`);
    }
    
  } else if (command === '--status') {
    const queue = loadQueue();
    console.log(`\n📋 GENERATION QUEUE STATUS`);
    console.log(`   Batch: ${queue.batchId}`);
    console.log(`   Total tasks: ${queue.tasks.length}`);
    console.log(`   Pending: ${queue.tasks.filter(t => t.status === 'pending').length}`);
    console.log(`   Running: ${queue.tasks.filter(t => t.status === 'running').length}`);
    console.log(`   Completed: ${queue.tasks.filter(t => t.status === 'completed').length}`);
    console.log(`   Failed: ${queue.tasks.filter(t => t.status === 'failed').length}`);
    
  } else if (command === '--run') {
    const batchSize = parseInt(args.find(a => a.startsWith('--batch='))?.split('=')[1] || '5');
    await generateBatch(batchSize);
    
  } else if (command === '--subject') {
    const subject = args.find(a => a.startsWith('--subject='))?.split('=')[1];
    if (subject && TOPICS[subject]) {
      const queue = loadQueue();
      const subjectTasks = queue.tasks.filter(t => t.subject === subject);
      console.log(`\n📋 ${subject.toUpperCase()} QUEUE`);
      console.log(`   Pending: ${subjectTasks.filter(t => t.status === 'pending').length}`);
      console.log(`   Completed: ${subjectTasks.filter(t => t.status === 'completed').length}`);
    }
    
  } else {
    console.log(`
🎯 WorldExams Massive Generation Orchestrator

USAGE:
  node scripts/massive-generation.js --init          Initialize Grade 11 queue
  node scripts/massive-generation.js --status        Show queue status
  node scripts/massive-generation.js --run           Run next batch
  node scripts/massive-generation.js --run --batch=10  Run 10 in parallel
  node scripts/massive-generation.js --subject=matematicas  Show subject status

EXAMPLES:
  # Setup for first time
  node scripts/massive-generation.js --init

  # Run first 5 generation tasks
  node scripts/massive-generation.js --run --batch=5

  # Check status
  node scripts/massive-generation.js --status
`);
  }
}

main().catch(console.error);
