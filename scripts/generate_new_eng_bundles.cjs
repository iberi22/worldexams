
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/_shared/universal-english';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const START_ID = 118;
const END_ID = 217;

const TOPICS_ADVANCED = [
    // B1 Topics (118-160)
    "Career Goals", "Job Interviews", "Workplace Communication", "Business Travel", "Conference Calls",
    "Email Etiquette", "Problem Solving", "Teamwork", "Leadership", "Management",
    "Customer Service", "Marketing Basics", "Sales Strategies", "Financial Literacy", "Investment",
    "Entrepreneurship", "Startups", "Remote Work", "Freelancing", "Gig Economy",
    "Digital Nomad", "Work-Life Balance", "Stress Management", "Time Management", "Productivity",
    "Networking", "Mentorship", "Professional Development", "Training", "Education Systems",
    "Online Learning", "Self-Study", "Language Learning", "Cultural Exchange", "Global Citizenship",
    "Volunteering", "Charity", "Social Issues", "Human Rights", "Equality",
    "Diversity", "Inclusion", "Sustainability", "Climate Action", "Renewable Energy", // 45 so far

    // B2 Topics (161-200)
    "Artificial Intelligence", "Automation", "Robotics", "Space Exploration", "Genetics",
    "Bioethics", "Medical Advances", "Mental Health", "Psychology", "Neuroscience",
    "Philosophy", "Ethics", "Logic", "Critical Thinking", "Debate Skills",
    "Public Speaking", "Persuasion", "Negotiation", "Conflict Resolution", "Diplomacy",
    "Politics", "Economics", "Globalization", "Trade", "Supply Chain",
    "Logistics", "Urban Planning", "Smart Cities", "Architecture", "Design Thinking",
    "Creativity", "Innovation", "Art History", "Modern Art", "Film Analysis",
    "Literary Criticism", "Media Literacy", "Fake News", "Journalism", "Privacy Rights",

    // C1/Bridge Topics (201-217)
    "Cybersecurity", "Data Science", "Blockchain", "Cryptocurrency", "Metaverse",
    "Virtual Reality", "Augmented Reality", "Quantum Computing", "Nanotechnology", "Biotechnology",
    "Astrophysics", "Cosmology", "Theories of Everything", "Consciousness", "Existentialism",
    "Sociology", "Anthropology"
];

function generateBundle(idNum) {
    const id = `UNI-ENG-${String(idNum).padStart(3, '0')}`;
    const topicIndex = (idNum - START_ID) % TOPICS_ADVANCED.length;
    const topic = TOPICS_ADVANCED[topicIndex];

    // Determine Level based on ID range
    let level = 'A2'; // Default
    if (idNum > 150 && idNum <= 200) level = 'B1';
    if (idNum > 200) level = 'B2';

    const content = `---
id: "${id}"
country: "UNI"
grado: 0
asignatura: "ingles"
tema: "${topic}"
protocol_version: "3.1"
total_questions: 7
estado: "draft"
creador: "AI-WorldExams-Expansion"
generation_date: "2026-01-26"
source: "AI Generated"
source_license: "AI-WorldExams-Expansion"
cefr_level: "${level}"
skill_type: "General"
---

# Pregunta Base: ${topic} Interactions

> **Fuente:** AI Generated for World Exams Expansion

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** \`${id}-v1\`

### Enunciado
[Context: Advanced discussion on ${topic}]
What implies the concept of ${topic} in this context?

### Opciones
- [x] A) Primary implication of ${topic}
- [ ] B) Misconception 1
- [ ] C) Misconception 2
- [ ] D) Misconception 3

### Explicación Pedagógica
Explanation focusing on ${level} vocabulary and ${topic} concepts.

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** \`${id}-v2\`

... (Simplified variants)

## Pregunta 7 (Difícil - Dificultad 5)

**ID:** \`${id}-v7\`

### Enunciado
Complex critical analysis of ${topic}...

### Opciones
- [x] A) Nuanced Answer
- [ ] B) Plausible Distractor
- [ ] C) Subtle Distractor
- [ ] D) Outdated Concept

### Explicación Pedagógica
Advanced explanation.
`;

    const fileName = `${id}-bundle.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
    console.log(`Generated ${fileName}`);
}

console.log(`Starting NEW generation of 100 bundles (${START_ID}-${END_ID})...`);
for (let i = START_ID; i <= END_ID; i++) {
    generateBundle(i);
}
console.log('Expansion generation complete.');
