#!/usr/bin/env node
/**
 * generate-bundle.cjs
 *
 * Script para generar el prompt de creación de un bundle de 7 preguntas
 * siguiendo el estándar V2.1 del protocolo de generación.
 *
 * Uso:
 *   node scripts/generate-bundle.cjs --subject matematicas --grade 11 --topic geometria --id 002
 *
 * O con el prompt interactivo:
 *   node scripts/generate-bundle.cjs
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuración de asignaturas y competencias ICFES
const ICFES_COMPETENCIAS = {
    'matematicas': {
        displayName: 'Matemáticas',
        competencias: ['Interpretación y Representación', 'Formulación y Ejecución', 'Argumentación'],
        componentes: ['Numérico-variacional', 'Espacial-métrico', 'Aleatorio']
    },
    'lectura-critica': {
        displayName: 'Lectura Crítica',
        competencias: ['Identificar contenidos locales', 'Comprender articulación global', 'Reflexionar y evaluar'],
        componentes: ['Textual', 'Inferencial', 'Crítico']
    },
    'ciencias': {
        displayName: 'Ciencias Naturales',
        competencias: ['Uso comprensivo del conocimiento', 'Explicación de fenómenos', 'Indagación'],
        componentes: ['Biología', 'Química', 'Física', 'Ambiental']
    },
    'sociales': {
        displayName: 'Sociales y Ciudadanas',
        competencias: ['Pensamiento social', 'Interpretación y análisis de perspectivas', 'Pensamiento sistémico'],
        componentes: ['Historia', 'Geografía', 'Ciudadanía', 'Economía']
    },
    'ingles': {
        displayName: 'Inglés',
        competencias: ['Lingüística', 'Pragmática', 'Sociolingüística'],
        componentes: ['Reading', 'Grammar', 'Vocabulary', 'Writing']
    },
    'lenguaje': {
        displayName: 'Lenguaje',
        competencias: ['Comprensión literal', 'Comprensión inferencial', 'Producción textual'],
        componentes: ['Comprensión', 'Gramática', 'Vocabulario', 'Escritura']
    }
};

// Template del bundle
function generateBundleTemplate(config) {
    const subject = ICFES_COMPETENCIAS[config.subject];
    const bundleId = `CO-${config.subjectCode}-${config.grade}-${config.topic.toUpperCase()}-${config.id}`;
    const date = new Date().toISOString().split('T')[0];

    // Helper para generar estructura de preguntas
    const generateQuestionBlock = (num, diff, type) => `
## Pregunta ${num} (${type} - Dificultad ${diff})

**ID:** \`${bundleId}-v${num}\`

### Enunciado

TODO: Pregunta de nivel ${diff} (${type})

### Opciones

- [x] A) Opción correcta
- [ ] B) Distractor 1
- [ ] C) Distractor 2
- [ ] D) Distractor 3

### Explicación Pedagógica

**¿Por qué A es correcta?**
TODO: Explicación detallada

**¿Por qué las otras son incorrectas?**
- **B)** TODO
- **C)** TODO
- **D)** TODO

**Competencia evaluada:** ${subject.competencias[(num - 1) % 3]}

---`;

    return `---
# === METADATA GLOBAL ===
id: "${bundleId}"
country: "CO"
grado: ${config.grade}
asignatura: "${subject.displayName}"
tema: "${config.topicDisplay}"
dificultad: 3
estado: "draft"
creador: "AI-WorldExams"
source_lang: "es-CO"
llm_model: "claude-sonnet-4-20250514"
agent: "Cascade"
ide: "VS Code"
bundle_version: "3.0"
total_questions: 10
difficulty_distribution: "2 por nivel (1-5)"
creation_date: "${date}"
periodo: 1 # TODO: Definir periodo correcto
dba_id: "TODO" # Derechos Básicos de Aprendizaje

# === SOURCE ATTRIBUTION ===
source: "ICFES-Curriculum"
source_url: "https://www.icfes.gov.co/..." # OBLIGATORIO: Reemplazar con URL real
source_license: "Educational Use - Colombian Curriculum"
source_id: "ICFES-${config.subjectCode}-${config.grade.toString().padStart(3, '0')}-${config.id}"
original_concept: "TODO: Descripción del concepto evaluado"
competencia_icfes: "${subject.competencias[0]}"
componente: "${subject.componentes[0]}"

# === UNIVERSAL SHARING ===
universal_question: false
applicable_exams: ["CO-Saber${config.grade > 5 ? config.grade : '3,5'}"]
---

# Bundle: ${config.topicDisplay}

> **Fuente:** Currículo ICFES Saber ${config.grade}° - ${subject.displayName}
> **Componente:** ${subject.componentes[0]}
> **Competencias:** ${subject.competencias.join(', ')}
> **Contexto:** Colombia - TODO: Describir contexto cultural

---

${generateQuestionBlock(1, 1, "Muy Fácil A")}
${generateQuestionBlock(2, 1, "Muy Fácil B")}
${generateQuestionBlock(3, 2, "Fácil A")}
${generateQuestionBlock(4, 2, "Fácil B")}
${generateQuestionBlock(5, 3, "Media A (Original Adaptada)")}
${generateQuestionBlock(6, 3, "Media B")}
${generateQuestionBlock(7, 4, "Difícil A")}
${generateQuestionBlock(8, 4, "Difícil B")}
${generateQuestionBlock(9, 5, "Muy Difícil A")}
${generateQuestionBlock(10, 5, "Muy Difícil B")}

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Componente | Validado |
|----------|-----|------------|-------------------|------------|----------|
| 1 | ${bundleId}-v1 | 1 | ${subject.competencias[0]} | ${subject.componentes[0]} | ⬜ |
| 2 | ${bundleId}-v2 | 1 | ${subject.competencias[0]} | ${subject.componentes[0]} | ⬜ |
| 3 | ${bundleId}-v3 | 2 | ${subject.competencias[1]} | ${subject.componentes[0]} | ⬜ |
| 4 | ${bundleId}-v4 | 2 | ${subject.competencias[1]} | ${subject.componentes[0]} | ⬜ |
| 5 | ${bundleId}-v5 | 3 | ${subject.competencias[2]} | ${subject.componentes[0]} | ⬜ |
| 6 | ${bundleId}-v6 | 3 | ${subject.competencias[0]} | ${subject.componentes[0]} | ⬜ |
| 7 | ${bundleId}-v7 | 4 | ${subject.competencias[1]} | ${subject.componentes[0]} | ⬜ |
| 8 | ${bundleId}-v8 | 4 | ${subject.competencias[2]} | ${subject.componentes[0]} | ⬜ |
| 9 | ${bundleId}-v9 | 5 | ${subject.competencias[0]} | ${subject.componentes[0]} | ⬜ |
| 10 | ${bundleId}-v10 | 5 | ${subject.competencias[1]} | ${subject.componentes[0]} | ⬜ |

---

**Source ID:** \`ICFES-${config.subjectCode}-${config.grade.toString().padStart(3, '0')}-${config.id}\`
**Fecha de creación:** ${date}
**Contexto cultural:** TODO: Agregar contexto cultural colombiano relevante
`;
}

// Mapeo de códigos de asignatura
const SUBJECT_CODES = {
    'matematicas': 'MAT',
    'lenguaje': 'LEN',
    'lectura-critica': 'LEC',
    'ciencias': 'CIE',
    'sociales': 'SOC',
    'ingles': 'ING'
};

// Función para crear el archivo
function createBundleFile(config) {
    const subject = config.subject;
    const grade = config.grade;
    const topic = config.topic.toLowerCase().replace(/\s+/g, '-');
    const id = config.id.toString().padStart(3, '0');

    const dirPath = path.join(
        'src', 'content', 'questions',
        subject,
        `grado-${grade}`,
        topic
    );

    const fileName = `CO-${SUBJECT_CODES[subject]}-${grade.toString().padStart(2, '0')}-${topic}-${id}-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    // Crear directorio si no existe
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Generar contenido
    const content = generateBundleTemplate({
        subject,
        subjectCode: SUBJECT_CODES[subject],
        grade,
        topic,
        topicDisplay: config.topicDisplay || topic.charAt(0).toUpperCase() + topic.slice(1),
        id
    });

    // Escribir archivo
    fs.writeFileSync(fullPath, content);
    console.log(`\n✅ Bundle creado exitosamente: ${fullPath}`);
    console.log(`\n📝 Próximos pasos:`);
    console.log(`   1. Abrir el archivo y completar los TODO`);
    console.log(`   2. Buscar una fuente verificable y actualizar source_url`);
    console.log(`   3. Escribir las 7 preguntas siguiendo el estándar`);
    console.log(`   4. Ejecutar: npm run validate para verificar el formato`);

    return fullPath;
}

// Función para generar prompt para el agente
function generateAgentPrompt(config) {
    const subject = ICFES_COMPETENCIAS[config.subject];

    return `
================================================================================
🤖 PROMPT PARA AGENTE - GENERACIÓN DE BUNDLE V2.1
================================================================================

**TAREA:** Generar un bundle de 7 preguntas para ${subject.displayName} - Grado ${config.grade}

**TEMA:** ${config.topicDisplay || config.topic}

**INSTRUCCIONES:**

1. **BUSCAR fuente verificable** en ICFES, repositorios educativos o guías oficiales.
   URL mínima: https://www.icfes.gov.co/...

2. **EXTRAER pregunta semilla** de la fuente (con 4 opciones de respuesta).

3. **GENERAR 7 preguntas** en un único archivo Markdown:
   - Pregunta 1: Original (dificultad 3)
   - Pregunta 2: Fácil A (dificultad 1)
   - Pregunta 3: Fácil B (dificultad 2)
   - Pregunta 4: Media A (dificultad 3)
   - Pregunta 5: Media B (dificultad 3)
   - Pregunta 6: Difícil A (dificultad 4)
   - Pregunta 7: Difícil B (dificultad 5)

4. **USAR COMPETENCIAS OFICIALES:**
   ${subject.competencias.map((c, i) => `   ${i + 1}. ${c}`).join('\n')}

5. **INCLUIR CONTEXTO COLOMBIANO** en los enunciados (ciudades, cultura, productos locales).

6. **EXPLICACIÓN PEDAGÓGICA** para cada pregunta:
   - Por qué la correcta es correcta
   - Por qué cada distractor es incorrecto
   - Competencia evaluada

**RUTA DE SALIDA:**
src/content/questions/${config.subject}/grado-${config.grade}/${config.topic}/${config.bundleId}-bundle.md

**CHECKLIST:**
[ ] 7 preguntas exactas
[ ] source_url verificable
[ ] total_questions: 7
[ ] Tabla de validación completa
[ ] Contexto cultural colombiano
================================================================================
`;
}

// Parsear argumentos de línea de comandos
function parseArgs() {
    const args = process.argv.slice(2);
    const config = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--subject' || args[i] === '-s') {
            config.subject = args[++i];
        } else if (args[i] === '--grade' || args[i] === '-g') {
            config.grade = parseInt(args[++i]);
        } else if (args[i] === '--topic' || args[i] === '-t') {
            config.topic = args[++i];
        } else if (args[i] === '--id' || args[i] === '-i') {
            config.id = args[++i];
        } else if (args[i] === '--prompt' || args[i] === '-p') {
            config.promptOnly = true;
        } else if (args[i] === '--help' || args[i] === '-h') {
            showHelp();
            process.exit(0);
        }
    }

    return config;
}

function showHelp() {
    console.log(`
📚 Generador de Bundles V2.1 - WorldExams

DESCRIPCIÓN:
  Genera plantillas de bundles de 7 preguntas siguiendo el estándar ICFES.

USO:
  node scripts/generate-bundle.cjs [opciones]

OPCIONES:
  -s, --subject <asignatura>   Asignatura (matematicas, lenguaje, ciencias, sociales, ingles, lectura-critica)
  -g, --grade <grado>          Grado escolar (3, 5, 9, 11)
  -t, --topic <tema>           Tema del bundle (ej: geometria, fracciones, comprension)
  -i, --id <id>                ID del bundle (ej: 001, 002)
  -p, --prompt                 Solo mostrar el prompt para el agente, no crear archivo
  -h, --help                   Mostrar esta ayuda

EJEMPLOS:
  node scripts/generate-bundle.cjs -s matematicas -g 11 -t funciones -i 002
  node scripts/generate-bundle.cjs -s lenguaje -g 3 -t comprension -i 003 --prompt

ASIGNATURAS DISPONIBLES:
  - matematicas    (MAT)
  - lenguaje       (LEN)
  - lectura-critica (LEC)
  - ciencias       (CIE)
  - sociales       (SOC)
  - ingles         (ING)
`);
}

// Modo interactivo
async function interactiveMode() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

    console.log('\n📚 Generador de Bundles V2.1 - WorldExams\n');
    console.log('Asignaturas disponibles: matematicas, lenguaje, ciencias, sociales, ingles, lectura-critica\n');

    const subject = await question('Asignatura: ');
    const grade = await question('Grado (3, 5, 9, 11): ');
    const topic = await question('Tema (ej: geometria, fracciones): ');
    const topicDisplay = await question('Nombre display del tema (ej: "Geometría - Volumen"): ');
    const id = await question('ID del bundle (ej: 001): ');
    const promptOnly = (await question('¿Solo mostrar prompt? (s/n): ')).toLowerCase() === 's';

    rl.close();

    return {
        subject: subject.toLowerCase(),
        grade: parseInt(grade),
        topic: topic.toLowerCase(),
        topicDisplay: topicDisplay || topic,
        id,
        promptOnly
    };
}

// Main
async function main() {
    let config = parseArgs();

    // Si no hay argumentos suficientes, modo interactivo
    if (!config.subject || !config.grade || !config.topic || !config.id) {
        config = await interactiveMode();
    }

    // Validar asignatura
    if (!ICFES_COMPETENCIAS[config.subject]) {
        console.error(`❌ Error: Asignatura "${config.subject}" no válida.`);
        console.log('Asignaturas válidas:', Object.keys(ICFES_COMPETENCIAS).join(', '));
        process.exit(1);
    }

    // Generar bundle ID
    config.bundleId = `CO-${SUBJECT_CODES[config.subject]}-${config.grade.toString().padStart(2, '0')}-${config.topic.toUpperCase()}-${config.id}`;

    if (config.promptOnly) {
        console.log(generateAgentPrompt(config));
    } else {
        createBundleFile(config);
    }
}


if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    generateBundleTemplate,
    createBundleFile,
    ICFES_COMPETENCIAS,
    SUBJECT_CODES
};
