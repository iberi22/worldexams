
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- INLINED CURRICULUM CONFIG START ---
export function normalizeTopic(topic: string): string {
  if (!topic) return "";
  return topic.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
}

// Complete Curriculum Data
const CURRICULUM_CO: any = {
  3: {
    matematicas: { periods: [
      { id: 1, name: "Periodo 1", topics: ["numeros", "suma", "resta", "conjuntos"] },
      { id: 2, name: "Periodo 2", topics: ["multiplicacion", "division", "geometria"] },
      { id: 3, name: "Periodo 3", topics: ["fracciones", "medición", "tablas"] },
      { id: 4, name: "Periodo 4", topics: ["estadistica", "probabilidad", "poligonos"] }
    ]},
    ingles: { periods: [
      { id: 1, name: "Periodo 1", topics: ["colores", "saludos", "numeros"] },
      { id: 2, name: "Periodo 2", topics: ["familia", "cuerpo", "animales"] },
      { id: 3, name: "Periodo 3", topics: ["objetos", "casa", "comida"] },
      { id: 4, name: "Periodo 4", topics: ["verbos", "sentimientos", "clima"] }
    ]}
  },
  5: {
    matematicas: { periods: [
      { id: 1, name: "Periodo 1", topics: ["naturales", "potenciacion", "ecuaciones"] },
      { id: 2, name: "Periodo 2", topics: ["fraccionarios", "decimales", "proporciones"] },
      { id: 3, name: "Periodo 3", topics: ["geometria", "volumen", "perimetro"] },
      { id: 4, name: "Periodo 4", topics: ["estadistica", "graficas", "probabilidad"] }
    ]},
    lecturacritica: { periods: [
        { id: 1, name: "Periodo 1", topics: ["narrativo", "fabula", "mito", "leyenda"] },
        { id: 2, name: "Periodo 2", topics: ["lirico", "poema", "rimas"] },
        { id: 3, name: "Periodo 3", topics: ["informativo", "noticia", "entrevista"] },
        { id: 4, name: "Periodo 4", topics: ["argumentativo", "opinion", "debate"] }
    ]}
  },
  9: {
    matematicas: { periods: [
      { id: 1, name: "Periodo 1", topics: ["reales", "algebra", "polinomios"] },
      { id: 2, name: "Periodo 2", topics: ["ecuaciones", "sistemas", "funciones"] },
      { id: 3, name: "Periodo 3", topics: ["pitagoras", "triangulos", "circulos"] },
      { id: 4, name: "Periodo 4", topics: ["estadistica", "probabilidad", "varianza"] }
    ]}
  },
  11: {
    matematicas: { periods: [
      { id: 1, name: "Periodo 1", topics: ["inecuaciones", "funciones", "limites", "continuidad", "numerosreales", "logaritmos", "exponenciales", "algebrabasica"] },
      { id: 2, name: "Periodo 2", topics: ["derivadas", "reglasdederivacion", "aplicacionesdeladerivada", "maximosyminimos", "tangentes", "variacional"] },
      { id: 3, name: "Periodo 3", topics: ["integrales", "areabajo", "solidos", "geometria", "seccionesconicas", "volumen", "transformaciones"] },
      { id: 4, name: "Periodo 4", topics: ["estadistica", "probabilidad", "conteo", "preicfes", "azar", "combinatoria", "patrones"] }
    ]},
    cienciasnaturales: { periods: [
      { id: 1, name: "Periodo 1", topics: ["hidrocarburos", "cinematica", "dinamica", "carbono", "fuerzas", "movimiento", "mecanica", "leyes de newton"] },
      { id: 2, name: "Periodo 2", topics: ["alcoholes", "proteinas", "energia", "trabajo", "potencia", "carbohidratos", "enlaces"] },
      { id: 3, name: "Periodo 3", topics: ["metabolismo", "termodinamica", "calor", "gases", "enzimas", "quimica", "estequiometria"] },
      { id: 4, name: "Periodo 4", topics: ["fisica moderna", "ondas", "electricidad", "magnetismo", "ecosistemas", "cambio climatico", "celula", "evolucion", "genetica"] }
    ]},
    sociales_y_ciudadanas: { periods: [
      { id: 1, name: "Periodo 1", topics: ["historia", "conflicto", "violencia", "guerra", "paz", "revolucion", "bananeras", "frente nacional"] },
      { id: 2, name: "Periodo 2", topics: ["geografia", "economia", "globalizacion", "desarrollo", "poblacion", "demografia", "apertura economica"] },
      { id: 3, name: "Periodo 3", topics: ["constitucion", "derechos", "deberes", "participacion", "democracia", "mecanismos", "tutela"] },
      { id: 4, name: "Periodo 4", topics: ["ambiente", "genero", "discriminacion", "cultura", "actualidad", "diversidad"] }
    ]},
    lectura_critica: { periods: [
      { id: 1, name: "Periodo 1", topics: ["argumentativo", "narrativo", "informativo", "literatura", "cuento", "novela", "boom", "vanguardias"] },
      { id: 2, name: "Periodo 2", topics: ["infografia", "comic", "tabla", "publicidad", "caricatura", "medios", "texto", "tipologia", "expositivo"] },
      { id: 3, name: "Periodo 3", topics: ["filosofia", "ensayo", "critica", "intertextualidad", "epistemologia", "semantica", "ortografia", "gramatica"] },
      { id: 4, name: "Periodo 4", topics: ["simulacro", "prueba", "comprension", "icfes", "tipologia"] }
    ]}
  }
};
// Aliases
CURRICULUM_CO[11]["sociales-ciudadanas"] = CURRICULUM_CO[11].sociales_y_ciudadanas;
CURRICULUM_CO[11]["sociales"] = CURRICULUM_CO[11].sociales_y_ciudadanas;
CURRICULUM_CO[11]["ciencias-naturales"] = CURRICULUM_CO[11].cienciasnaturales;

// --- INLINED CURRICULUM CONFIG END ---

const ROOT_DIR = 'src/content/questions/colombia';

// Valid Topics Map (Grade -> Subject -> [Topics])
const VALID_TOPICS: any = {};

console.log('Building Valid Topics Map...');
for (const grade of Object.keys(CURRICULUM_CO)) {
    const g = parseInt(grade);
    VALID_TOPICS[g] = {};
    for (const [subj, data] of Object.entries(CURRICULUM_CO[g])) {
        const topics = new Set<string>();
        (data as any).periods.forEach((p: any) => p.topics.forEach((t: string) => topics.add(normalizeTopic(t))));
        VALID_TOPICS[g][subj] = Array.from(topics);
    }
}

function processFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    const grade = data.grado || parseInt(path.basename(path.dirname(path.dirname(filePath))).replace('grado-', '')) || 11;
    let subject = data.asignatura || path.basename(path.dirname(path.dirname(path.dirname(filePath))));

    // Normalize Subject
    let targetSubj = subject.toLowerCase().replace(/_/g, '-');
    if (targetSubj.includes('mat')) targetSubj = 'matematicas';
    else if (targetSubj.includes('soc')) targetSubj = 'sociales-ciudadanas';
    else if (targetSubj.includes('cienc')) targetSubj = 'ciencias-naturales';
    else if (targetSubj.includes('lec') || targetSubj.includes('leng')) targetSubj = 'lectura-critica';
    else if (targetSubj.includes('ing')) targetSubj = 'ingles';

    if (!VALID_TOPICS[grade] || !VALID_TOPICS[grade][targetSubj]) return;

    const validList = VALID_TOPICS[grade][targetSubj];

    // Check if current 'tema' is ALREADY a perfect match for a canonical topic
    const currentTemaRaw = data.tema || "";
    const currentTemaNorm = normalizeTopic(currentTemaRaw);

    const isPerfect = validList.some((vt: string) => vt === currentTemaNorm);
    if (isPerfect) {
        // If it's perfect, make sure it's strictly normalized (single word canonical)
        const canonical = validList.find((vt: string) => vt === currentTemaNorm);
        if (data.tema !== canonical) {
            data.tema = canonical;
            const newContent = matter.stringify(body, data);
            fs.writeFileSync(filePath, newContent);
        }
        return;
    }

    // Not perfect. Find best match.
    const filename = path.basename(filePath).toLowerCase();
    const folder = path.basename(path.dirname(filePath)).toLowerCase();

    let bestMatch = "";

    // Heuristic 1: Topic contains valid string
    for (const vt of validList) {
        if (currentTemaNorm.includes(vt) && vt.length > 3) {
            bestMatch = vt;
            break;
        }
    }

    // Heuristic 2: Filename contains valid string
    if (!bestMatch) {
         for (const vt of validList) {
            if (filename.includes(vt) && vt.length > 3) {
                bestMatch = vt;
                break;
            }
        }
    }

    // Heuristic 3: Folder contains valid string
    if (!bestMatch) {
         for (const vt of validList) {
            if (folder.includes(vt) && vt.length > 3) {
                bestMatch = vt;
                break;
            }
        }
    }

    // Hardcoded Mappings for known gaps
    if (!bestMatch) {
        if (currentTemaRaw.includes("Ciudadana")) bestMatch = "derechos";
        else if (currentTemaRaw.includes("Constitución")) bestMatch = "constitucion";
        else if (currentTemaRaw.includes("Ceguera")) bestMatch = "literatura";
        else if (currentTemaRaw.includes("ensayo")) bestMatch = "ensayo";
        else if (currentTemaRaw.includes("argumenta")) bestMatch = "argumentativo";
        else if (filename.includes("conectores")) bestMatch = "argumentativo";
        else if (filename.includes("bio")) bestMatch = "biologia";
    }

    if (bestMatch) {
        console.log(`🔧 REPLACING ${path.basename(filePath)}: '${data.tema}' -> '${bestMatch}'`);
        data.tema = bestMatch;
        const newContent = matter.stringify(body, data);
        fs.writeFileSync(filePath, newContent);
    } else {
        // Log skip
        // console.log(`⏭️ Skipping ${path.basename(filePath)}: No match found for '${data.tema}'`);
    }
}

function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const p = path.join(dir, file);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (file.endsWith('-bundle.md')) processFile(p);
    }
}

walk(ROOT_DIR);
console.log('✅ Port-standardization complete.');
