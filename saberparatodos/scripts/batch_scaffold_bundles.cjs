const { createBundleFile } = require('./generate-bundle.cjs');

// Definición simplificada del currículo para generación masiva
// Basado en src/config/curriculum.ts
const CURRICULUM = {
    3: {
        'matematicas': ['numeros-operaciones', 'patrones', 'geometria', 'resolucion-problemas'],
        'ciencias': ['seres-vivos', 'cuerpo-humano', 'entorno-fisico', 'tierra-universo'],
        'sociales': ['familia-colegio', 'mi-comunidad', 'paisaje-geografia', 'historia-cultura'],
        'lenguaje': ['comprension-lectora', 'gramatica', 'escritura', 'vocabulario'],
        'ingles': ['vocabulario-basico', 'saludos', 'comandos', 'familia']
    },
    5: {
        'matematicas': ['decimales', 'fracciones', 'geometria-medicion', 'estadistica'],
        'ciencias': ['celula-sistemas', 'ecosistemas', 'materia', 'energia-fuerzas'],
        'sociales': ['colombia', 'democracia', 'geografia-colombia', 'historia-independencia'],
        'lenguaje': ['narrativa', 'gramatica-avanzada', 'ortografia', 'tipologia-textual'],
        'ingles': ['rutinas', 'descripcion-personas', 'lugares', 'clima']
    },
    7: {
        'matematicas': ['enteros-racionales', 'proporcionalidad', 'algebra-basica', 'geometria'],
        'ciencias': ['microorganismos', 'sistemas-cuerpo', 'materia-energia', 'ecologia'],
        'sociales': ['geografia-mundial', 'edad-media', 'renacimiento', 'demografia'],
        'lenguaje': ['literatura-juvenil', 'argumentacion', 'signos-puntuacion', 'medios-comunicacion'],
        'ingles': ['pasado-simple', 'futuro', 'comparativos', 'superlativos']
    },
    9: {
        'matematicas': ['sistemas-ecuaciones', 'funciones', 'geometria-espacio', 'estadistica-inferencial'],
        'ciencias': ['genetica', 'evolucion', 'quimica-inorganica', 'fisica-ondas'],
        'sociales': ['historia-siglo-xx', 'geopolitica', 'colombia-contemporanea', 'derechos-humanos'],
        'lenguaje': ['literatura-latinoamericana', 'ensayo', 'cronica', 'debate'],
        'ingles': ['presente-perfecto', 'condicionales', 'voz-pasiva', 'verbos-modales']
    },
    11: {
        'matematicas': ['calculo', 'funciones', 'estadistica', 'probabilidad'],
        'ciencias': ['quimica-organica', 'fisica-mecanica', 'termodinamica', 'bioquimica'],
        'sociales': ['conflicto-armado', 'globalizacion', 'constitucion-politica', 'filosofia'],
        'lenguaje': ['lectura-critica', 'filosofia-lenguaje', 'texto-argumentativo', 'arte-literatura'],
        'ingles': ['textos-academicos', 'ensayos-opinion', 'reportes', 'cultura-global']
    }
};

async function batchGenerate() {
    console.log("🚀 Iniciando generación masiva de bundles...");

    let totalCreated = 0;

    for (const [gradeStr, subjects] of Object.entries(CURRICULUM)) {
        const grade = parseInt(gradeStr);

        for (const [subject, topics] of Object.entries(subjects)) {
            // Seleccionar temas cíclicamente para los 10 bundles
            for (let i = 1; i <= 10; i++) {
                const topicIndex = (i - 1) % topics.length;
                const topic = topics[topicIndex];

                const config = {
                    subject: subject,
                    grade: grade,
                    topic: topic,
                    id: i.toString().padStart(3, '0'), // 001, 002...
                    topicDisplay: topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                };

                try {
                    createBundleFile(config);
                    totalCreated++;
                } catch (error) {
                    console.error(`❌ Error creando bundle ${subject} G${grade} ID${config.id}:`, error.message);
                }
            }
        }
    }

    console.log(`\n✅ Proceso completado. Total bundles creados: ${totalCreated}`);
}

batchGenerate().catch(console.error);
