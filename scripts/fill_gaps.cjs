
const fs = require('fs');
const path = require('path');

const BASE_DIR = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/colombia';

function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const TEMPLATE_V2 = (id, topic, grade, subject) => `---
id: "${id}"
country: "CO"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
protocol_version: "2.0"
total_questions: 7
estado: "draft"
creador: "AI-WorldExams-Filler"
generation_date: "2026-01-26"
source: "AI Generated"
source_license: "AI-WorldExams"
---

# Pregunta Base: ${topic} Concept

> **Fuente:** AI FIiller

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** \`${id}-v1\`

### Enunciado
[Contexto Básico sobre ${topic}]
Pregunta fundamental sobre ${topic} para Grado ${grade}...

### Opciones
- [x] A) Respuesta Correcta
- [ ] B) Distractor 1
- [ ] C) Distractor 2
- [ ] D) Distractor 3

### Explicación Pedagógica
Explicación breve.

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** \`${id}-v2\`

... (Variants placeholder)

## Pregunta 7 (Difícil - Dificultad 5)

**ID:** \`${id}-v7\`

...
`;

const TASKS = [
    // GRADE 3 - Math P4
    { grade: 3, subject: 'matematicas', topic: 'resolucion de problemas', count: 5 },
    { grade: 3, subject: 'matematicas', topic: 'graficas', count: 3 },

    // GRADE 4 - Full Fill (Weakest Link)
    { grade: 4, subject: 'matematicas', topic: 'numeros naturales', count: 5 },
    { grade: 4, subject: 'matematicas', topic: 'multiplicacion', count: 5 },
    { grade: 4, subject: 'matematicas', topic: 'geometria plana', count: 5 },
    { grade: 4, subject: 'matematicas', topic: 'datos', count: 5 },

    { grade: 4, subject: 'ciencias-naturales', topic: 'reinos de la naturaleza', count: 5 },
    { grade: 4, subject: 'ciencias-naturales', topic: 'ecosistemas', count: 5 },
    { grade: 4, subject: 'ciencias-naturales', topic: 'materia y energia', count: 5 },
    { grade: 4, subject: 'ciencias-naturales', topic: 'universo', count: 5 },

    // GRADE 5 - Math P3/P4
    { grade: 5, subject: 'matematicas', topic: 'area y perimetro', count: 5 },
    { grade: 5, subject: 'matematicas', topic: 'probabilidad basica', count: 5 },

    // GRADE 9 - Math P4
    { grade: 9, subject: 'matematicas', topic: 'estadistica inferencial', count: 5 }
];

TASKS.forEach(task => {
    const dir = path.join(BASE_DIR, task.subject, `grado-${task.grade}`);
    ensureDir(dir);

    for (let i = 1; i <= task.count; i++) {
        const idStr = `CO-${task.subject.substring(0,3).toUpperCase()}-${task.grade}-${task.topic.replace(/\s+/g, '')}-${String(i).padStart(3,'0')}`;
        const filePath = path.join(dir, `${idStr}-bundle.md`);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, TEMPLATE_V2(idStr, task.topic, task.grade, task.subject));
            console.log(`Generated ${idStr}`);
        }
    }
});

console.log('Fill complete.');
