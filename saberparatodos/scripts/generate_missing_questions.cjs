const fs = require('fs');
const path = require('path');

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

// Helper to create markdown content
function createMarkdown(q) {
    return `---
id: ${q.id}
grado: ${q.grado}
asignatura: ${q.asignatura}
tema: ${q.tema}
dificultad: ${q.dificultad || 2}
estado: published
creador: AutoGenerator
group_id: ${q.group_id}
llm_model: antigravity
source: generated-script
---
# Pregunta
${q.pregunta}

# Opciones
${q.opciones.map((opt, i) => `- [${i === q.correctIndex ? 'x' : ' '}] ${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

# Explicación
${q.explicacion}
`;
}

// Questions Data
const questions = [
    // --- Matemáticas Grado 3 ---
    {
        id: "MAT-G3-001", group_id: "MAT-G3-SET1", grado: 3, asignatura: "Matemáticas", tema: "Aritmética",
        pregunta: "En una biblioteca hay 125 libros de cuentos y 214 libros de ciencias. ¿Cuántos libros hay en total?",
        opciones: ["300", "339", "400", "239"],
        correctIndex: 1,
        explicacion: "Para hallar el total sumamos 125 + 214. 5+4=9, 2+1=3, 1+2=3. El resultado es 339."
    },
    {
        id: "MAT-G3-002", group_id: "MAT-G3-SET1", grado: 3, asignatura: "Matemáticas", tema: "Geometría",
        pregunta: "¿Cuál de las siguientes figuras tiene exactamente 3 lados?",
        opciones: ["Cuadrado", "Círculo", "Triángulo", "Rectángulo"],
        correctIndex: 2,
        explicacion: "El triángulo es la figura geométrica que se caracteriza por tener 3 lados."
    },
    {
        id: "MAT-G3-003", group_id: "MAT-G3-SET1", grado: 3, asignatura: "Matemáticas", tema: "Medición",
        pregunta: "Si una clase empieza a las 8:00 AM y termina a las 9:30 AM, ¿cuánto tiempo duró la clase?",
        opciones: ["1 hora", "30 minutos", "1 hora y 30 minutos", "2 horas"],
        correctIndex: 2,
        explicacion: "De 8:00 a 9:00 hay 1 hora. De 9:00 a 9:30 hay 30 minutos. Total: 1 hora y 30 minutos."
    },

    // --- Matemáticas Grado 5 ---
    {
        id: "MAT-G5-001", group_id: "MAT-G5-SET1", grado: 5, asignatura: "Matemáticas", tema: "Fracciones",
        pregunta: "María comió 1/4 de pizza y Juan comió 2/4 de la misma pizza. ¿Qué fracción de la pizza comieron en total?",
        opciones: ["1/4", "2/4", "3/4", "4/4"],
        correctIndex: 2,
        explicacion: "Sumamos numeradores: 1 + 2 = 3. El denominador se mantiene (4). Total: 3/4."
    },
    {
        id: "MAT-G5-002", group_id: "MAT-G5-SET1", grado: 5, asignatura: "Matemáticas", tema: "Multiplicación",
        pregunta: "Un paquete de galletas trae 12 galletas. Si compro 5 paquetes, ¿cuántas galletas tengo?",
        opciones: ["50", "60", "72", "48"],
        correctIndex: 1,
        explicacion: "Multiplicamos 12 por 5. 5 x 10 = 50, 5 x 2 = 10. 50 + 10 = 60."
    },
    {
        id: "MAT-G5-003", group_id: "MAT-G5-SET1", grado: 5, asignatura: "Matemáticas", tema: "Geometría",
        pregunta: "¿Cuál es el perímetro de un cuadrado que tiene 5 cm de lado?",
        opciones: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correctIndex: 2,
        explicacion: "El perímetro es la suma de los lados. Un cuadrado tiene 4 lados iguales. 5 + 5 + 5 + 5 = 20 cm."
    },

    // --- Matemáticas Grado 9 ---
    {
        id: "MAT-G9-001", group_id: "MAT-G9-SET1", grado: 9, asignatura: "Matemáticas", tema: "Álgebra",
        pregunta: "Si 2x - 4 = 10, ¿cuál es el valor de x?",
        opciones: ["3", "5", "7", "14"],
        correctIndex: 2,
        explicacion: "Sumamos 4 a ambos lados: 2x = 14. Dividimos por 2: x = 7."
    },
    {
        id: "MAT-G9-002", group_id: "MAT-G9-SET1", grado: 9, asignatura: "Matemáticas", tema: "Estadística",
        pregunta: "En una bolsa hay 3 bolas rojas y 2 azules. ¿Cuál es la probabilidad de sacar una bola azul?",
        opciones: ["1/5", "2/5", "3/5", "2/3"],
        correctIndex: 1,
        explicacion: "Casos favorables (azules) = 2. Casos totales (3+2) = 5. Probabilidad = 2/5."
    },
    {
        id: "MAT-G9-003", group_id: "MAT-G9-SET1", grado: 9, asignatura: "Matemáticas", tema: "Álgebra",
        pregunta: "¿Cuál es el resultado de (x + 3)(x - 3)?",
        opciones: ["x² - 9", "x² + 9", "x² - 6x + 9", "x² + 6x - 9"],
        correctIndex: 0,
        explicacion: "Es una diferencia de cuadrados: (a+b)(a-b) = a² - b². Aquí x² - 3², que es x² - 9."
    },

    // --- Lenguaje Grado 3 ---
    {
        id: "LEN-G3-001", group_id: "LEN-G3-SET1", grado: 3, asignatura: "Lenguaje", tema: "Gramática",
        pregunta: "Identifica el VERBO en la oración: 'El perro corre rápido por el parque.'",
        opciones: ["perro", "corre", "rápido", "parque"],
        correctIndex: 1,
        explicacion: "El verbo es la acción. En este caso, la acción es 'corre'."
    },
    {
        id: "LEN-G3-002", group_id: "LEN-G3-SET1", grado: 3, asignatura: "Lenguaje", tema: "Sinónimos",
        pregunta: "¿Cuál palabra significa lo mismo que 'feliz'?",
        opciones: ["Triste", "Contento", "Enojado", "Aburrido"],
        correctIndex: 1,
        explicacion: "Feliz y Contento son sinónimos, ambos expresan alegría."
    },
    {
        id: "LEN-G3-003", group_id: "LEN-G3-SET1", grado: 3, asignatura: "Lenguaje", tema: "Comprensión",
        pregunta: "Lee: 'Ana fue al mercado y compró manzanas.' ¿A dónde fue Ana?",
        opciones: ["Al parque", "A la escuela", "Al mercado", "Al cine"],
        correctIndex: 2,
        explicacion: "El texto dice explícitamente que 'Ana fue al mercado'."
    },

    // --- Lenguaje Grado 5 ---
    {
        id: "LEN-G5-001", group_id: "LEN-G5-SET1", grado: 5, asignatura: "Lenguaje", tema: "Gramática",
        pregunta: "En la frase 'La casa roja es grande', ¿cuál es el adjetivo?",
        opciones: ["La", "casa", "roja", "es"],
        correctIndex: 2,
        explicacion: "El adjetivo describe al sustantivo. 'Roja' describe a 'casa'."
    },
    {
        id: "LEN-G5-002", group_id: "LEN-G5-SET1", grado: 5, asignatura: "Lenguaje", tema: "Ortografía",
        pregunta: "¿Cuál de estas palabras está escrita correctamente?",
        opciones: ["Hormiga", "Ormiga", "Hormig", "Ormija"],
        correctIndex: 0,
        explicacion: "Hormiga se escribe con 'H' inicial."
    }
];

// Base path
const BASE_DIR = "src/content/questions";

questions.forEach(q => {
    // Normalizar subject to match directory names
    let subjectDir = q.asignatura.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents roughly
    if (subjectDir === 'matematicas') subjectDir = 'matematicas';
    if (subjectDir === 'lenguaje') subjectDir = 'lenguaje';

    // Normalize tema for folder
    const temaDir = q.tema.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

    const dirPath = path.join(BASE_DIR, subjectDir, `grado-${q.grado}`, temaDir);
    const fileName = `${q.id}.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    fs.writeFileSync(fullPath, createMarkdown(q));
    console.log(`Created: ${fullPath}`);
});
