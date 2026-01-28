
const fs = require('fs');
const path = require('path');

// Mock the curriculum import since it's TS
// Mock matching the real CURRICULUM_CO structure
const MATEMATICAS_PERIODS = [
    { id: 1, name: "Periodo 1", topics: ["inecuaciones", "funciones", "limites", "continuidad", "numerosreales", "logaritmos", "exponenciales", "algebrabasica"] },
    { id: 2, name: "Periodo 2", topics: ["derivadas", "reglasdederivacion", "aplicacionesdeladerivada", "maximosyminimos", "tangentes", "variacional"] },
    { id: 3, name: "Periodo 3", topics: ["integrales", "areabajo", "solidos", "geometria", "seccionesconicas", "volumen", "transformaciones"] },
    { id: 4, name: "Periodo 4", topics: ["estadistica", "probabilidad", "conteo", "preicfes", "azar", "combinatoria", "patrones"] }
];

const CIENCIAS_PERIODS = [
    { id: 1, name: "Periodo 1", topics: ["hidrocarburos", "cinematica", "dinamica", "carbono", "fuerzas", "movimiento", "mecanica"] },
    { id: 2, name: "Periodo 2", topics: ["alcoholes", "proteinas", "energia", "trabajo", "potencia", "carbohidratos", "enlaces"] },
    { id: 3, name: "Periodo 3", topics: ["metabolismo", "termodinamica", "calor", "gases", "enzimas", "quimica", "estequiometria"] },
    { id: 4, name: "Periodo 4", topics: ["fisicamoderna", "ondas", "electricidad", "magnetismo", "ecosistemas", "cambioclimatico", "celula"] }
];

const LECTURA_PERIODS = [
    { id: 1, name: "Periodo 1", topics: ["argumentativo", "narrativo", "informativo", "literatura", "cuento", "novela", "boom", "vanguardias"] },
    { id: 2, name: "Periodo 2", topics: ["infografia", "comic", "tabla", "publicidad", "caricatura", "medios", "texto", "tipologia", "expositivo"] },
    { id: 3, name: "Periodo 3", topics: ["filosofia", "ensayo", "critica", "intertextualidad", "epistemologia", "semantica", "ortografia", "gramatica"] },
    { id: 4, name: "Periodo 4", topics: ["simulacro", "prueba", "comprension", "icfes", "tipologia"] }
];

const SOCIALES_PERIODS = [
    { id: 1, name: "Periodo 1", topics: ["historia", "conflicto", "violencia", "guerra", "paz", "revolucion"] },
    { id: 2, name: "Periodo 2", topics: ["geografia", "economia", "globalizacion", "desarrollo", "poblacion", "demografia"] },
    { id: 3, name: "Periodo 3", topics: ["constitucion", "derechos", "deberes", "participacion", "democracia", "mecanismos"] },
    { id: 4, name: "Periodo 4", topics: ["ambiente", "genero", "discriminacion", "cultura", "actualidad"] }
];

const TECNOLOGIA_PERIODS = [
    { id: 1, name: "Periodo 1", topics: ["artefactos", "invencion", "historia", "evolucion", "naturaleza"] },
    { id: 2, name: "Periodo 2", topics: ["software", "hardware", "office", "excel", "word", "procesadores", "computador", "partes"] },
    { id: 3, name: "Periodo 3", topics: ["algoritmo", "programacion", "logica", "codigo", "diagramas"] },
    { id: 4, name: "Periodo 4", topics: ["seguridad", "redes", "internet", "etica", "delitos", "phishing", "ciudadania"] }
];

const CURRICULUM_CO = {
  11: {
    "matematicas": { periods: MATEMATICAS_PERIODS },
    "cienciasnaturales": { periods: CIENCIAS_PERIODS },
    "ciencias-naturales": { periods: CIENCIAS_PERIODS },
    "cienciasnaturalesyeducacionambiental": { periods: CIENCIAS_PERIODS },
    "lecturacritica": { periods: LECTURA_PERIODS },
    "lectura-critica": { periods: LECTURA_PERIODS },
    "lenguaje": { periods: LECTURA_PERIODS },
    "lenguacastellana": { periods: LECTURA_PERIODS },
    "socialesyciudadanas": { periods: SOCIALES_PERIODS },
    "socialesciudadanas": { periods: SOCIALES_PERIODS },
    "cienciassociales": { periods: SOCIALES_PERIODS },
    "sociales": { periods: SOCIALES_PERIODS },
    "sociales-ciudadanas": { periods: SOCIALES_PERIODS },
    "tecnologiaeinformatica": { periods: TECNOLOGIA_PERIODS },
    "tecnologiainformatica": { periods: TECNOLOGIA_PERIODS },
    "tecnologia-informatica": { periods: TECNOLOGIA_PERIODS },
    "tecnologia": { periods: TECNOLOGIA_PERIODS }
  }
};

function normalizeTopic(topic) {
  if (!topic) return "";
  return topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

const contentDir = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/colombia';

function getThemesBySubject() {
    let themesBySubject = {};

    function walk(directory, subject) {
        let currentSubject = subject;
        const files = fs.readdirSync(directory);

        // Detect subject from folder name if high quality
        if (directory.endsWith('matematicas/grado-11')) currentSubject = 'matematicas';
        if (directory.endsWith('ciencias-naturales/grado-11')) currentSubject = 'ciencias-naturales';
        if (directory.endsWith('lectura-critica/grado-11')) currentSubject = 'lectura-critica';

        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath, currentSubject);
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const match = content.match(/^tema:\s*["']?([^"'\n]+)["']?/m);
                const subMatch = content.match(/^asignatura:\s*["']?([^"'\n]+)["']?/m);
                let fileSubject = subMatch ? normalizeTopic(subMatch[1]) : currentSubject;

                if (match) {
                     // Normalize subject for grouping
                    if (fileSubject.includes('matema')) fileSubject = 'matematicas';
                    if (fileSubject.includes('naturales') || fileSubject.includes('quimica') || fileSubject.includes('fisica') || fileSubject.includes('biologia')) fileSubject = 'ciencias-naturales';
                    if (fileSubject.includes('lectura') || fileSubject.includes('critica')) fileSubject = 'lectura-critica';

                    if (!themesBySubject[fileSubject]) themesBySubject[fileSubject] = new Set();
                    themesBySubject[fileSubject].add(match[1].trim());
                }
            }
        }
    }

    walk(contentDir, 'unknown');
    return themesBySubject;
}

const foundThemes = getThemesBySubject();
const report = {
    totalThemes: 0,
    mappedThemes: 0,
    orphans: {}
};

for (const subject in foundThemes) {
    report.orphans[subject] = [];
    const grade = 11; // Validate for grade 11 primarily
    const curriculum = CURRICULUM_CO[grade]?.[subject];

    if (!curriculum) {
        console.log(`⚠️ Subject ${subject} not found in curriculum (Grade 11)`);
        foundThemes[subject].forEach(t => report.orphans[subject].push(t));
        continue;
    }

    const allMappedTopics = curriculum.periods.flatMap(p => p.topics).map(normalizeTopic);

    foundThemes[subject].forEach(realTheme => {
        report.totalThemes++;
        const normalizedReal = normalizeTopic(realTheme);
        const isMapped = allMappedTopics.some(mapped => normalizedReal.includes(mapped) || mapped.includes(normalizedReal));

        if (isMapped) {
            report.mappedThemes++;
        } else {
            report.orphans[subject].push(realTheme);
        }
    });
}

console.log('=== VALIDATION REPORT ===');
console.log(`Total Themes Found: ${report.totalThemes}`);
console.log(`Successfully Mapped: ${report.mappedThemes}`);
console.log(`Orphan Rate: ${((report.totalThemes - report.mappedThemes) / report.totalThemes * 100).toFixed(1)}%`);
console.log('\n=== ORPHAN THEMES (Need mapping in curriculum.ts) ===');
Object.keys(report.orphans).forEach(subj => {
    if (report.orphans[subj].length > 0) {
        console.log(`\n[${subj.toUpperCase()}]`);
        // Limit to 20 for readability
        console.log(report.orphans[subj].slice(0, 20).join(', '));
        if (report.orphans[subj].length > 20) console.log(`... and ${report.orphans[subj].length - 20} more`);
    }
});
