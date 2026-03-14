/**
 * NotebookLM Source API Endpoint
 *
 * Este endpoint provee datos estructurados optimizados para que NotebookLM
 * pueda consumir como fuente y generar cuadernos de estudio personalizados.
 *
 * URL: /api/notebooklm-source.json
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = {
    // Metadata
    platform: "SaberParaTodos",
    version: "2.1",
    lastUpdated: new Date().toISOString().split('T')[0],
    sourceUrl: "https://saberparatodos.space/notebooklm",

    // Instrucciones para el cuaderno NotebookLM
    notebookInstructions: {
      role: "Tutor Experto en ICFES Saber 11",
      objective: "Ayudar a estudiantes colombianos a prepararse para el examen ICFES Saber 11",
      context: `
El ICFES Saber 11 es el examen estandarizado más importante de Colombia.
Lo presentan todos los estudiantes al finalizar grado 11.
El puntaje (0-500) es crucial para ingresar a universidades y obtener becas.
      `.trim(),

      capabilities: [
        "Analizar debilidades del estudiante basándose en su perfil cognitivo",
        "Generar planes de estudio semanales personalizados",
        "Crear preguntas tipo ICFES con explicaciones pedagógicas",
        "Identificar patrones de error y recomendar estrategias",
        "Proporcionar resúmenes conceptuales y flashcards"
      ],

      responseGuidelines: [
        "Responder siempre en español colombiano",
        "Usar lenguaje claro y motivador, apropiado para estudiantes de grado 11",
        "Incluir ejemplos relevantes al contexto colombiano",
        "Estructurar respuestas con encabezados y listas",
        "Priorizar explicaciones paso a paso"
      ]
    },

    // Estructura del examen ICFES Saber 11
    examStructure: {
      name: "ICFES Saber 11",
      administrator: "Instituto Colombiano para la Evaluación de la Educación (ICFES)",
      totalScore: { min: 0, max: 500, description: "Promedio ponderado de las 5 áreas" },

      areas: [
        {
          name: "Matemáticas",
          code: "MAT",
          questions: 50,
          timeMinutes: 120,
          maxScore: 100,
          weight: 0.20
        },
        {
          name: "Lectura Crítica",
          code: "LEC",
          questions: 41,
          timeMinutes: 90,
          maxScore: 100,
          weight: 0.20
        },
        {
          name: "Ciencias Naturales",
          code: "CNAT",
          questions: 58,
          timeMinutes: 120,
          maxScore: 100,
          weight: 0.20
        },
        {
          name: "Sociales y Ciudadanas",
          code: "SOC",
          questions: 50,
          timeMinutes: 90,
          maxScore: 100,
          weight: 0.20
        },
        {
          name: "Inglés",
          code: "ING",
          questions: 55,
          timeMinutes: 60,
          maxScore: 100,
          weight: 0.20,
          levels: ["A-", "A1", "A2", "B1", "B+"]
        }
      ]
    },

    // Competencias por área
    competencies: {
      matematicas: [
        {
          name: "Interpretación y representación",
          description: "Comprender gráficas, tablas y expresiones matemáticas"
        },
        {
          name: "Formulación y ejecución",
          description: "Plantear y resolver problemas matemáticos"
        },
        {
          name: "Argumentación",
          description: "Justificar procedimientos y resultados"
        }
      ],

      lectura_critica: [
        {
          name: "Identificar",
          description: "Localizar información explícita e implícita"
        },
        {
          name: "Comprender",
          description: "Entender relaciones entre partes del texto"
        },
        {
          name: "Reflexionar y evaluar",
          description: "Analizar argumentos y propósitos del autor"
        }
      ],

      ciencias_naturales: [
        {
          name: "Uso comprensivo del conocimiento",
          description: "Aplicar conceptos científicos a situaciones"
        },
        {
          name: "Explicación de fenómenos",
          description: "Analizar causas y efectos en fenómenos naturales"
        },
        {
          name: "Indagación",
          description: "Interpretar datos experimentales y diseñar investigaciones"
        }
      ],

      sociales_y_ciudadanas: [
        {
          name: "Pensamiento social",
          description: "Analizar fenómenos sociales desde múltiples perspectivas"
        },
        {
          name: "Interpretación y análisis",
          description: "Comprender fuentes históricas y geográficas"
        },
        {
          name: "Pensamiento reflexivo y sistémico",
          description: "Evaluar problemas complejos y relaciones causales"
        }
      ],

      ingles: [
        {
          name: "Reading",
          description: "Comprensión de textos escritos en inglés"
        },
        {
          name: "Use of English",
          description: "Gramática y vocabulario en contexto"
        }
      ]
    },

    // Sistema de calificación MMR
    scoringSystem: {
      name: "MMR (Matchmaking Rating)",
      description: "Sistema de puntuación dinámico estilo ELO que mide habilidad real",
      initialScore: 1000,

      ranks: [
        { name: "Iniciado", minMMR: 0, maxMMR: 999, emoji: "🔰", icfesEquivalent: "0-200" },
        { name: "Aprendiz", minMMR: 1000, maxMMR: 1199, emoji: "📗", icfesEquivalent: "200-280" },
        { name: "Estudiante", minMMR: 1200, maxMMR: 1399, emoji: "📘", icfesEquivalent: "280-340" },
        { name: "Avanzado", minMMR: 1400, maxMMR: 1599, emoji: "📙", icfesEquivalent: "340-400" },
        { name: "Experto", minMMR: 1600, maxMMR: 1799, emoji: "📕", icfesEquivalent: "400-450" },
        { name: "Maestro", minMMR: 1800, maxMMR: 1999, emoji: "⭐", icfesEquivalent: "450-480" },
        { name: "Gran Maestro", minMMR: 2000, maxMMR: 9999, emoji: "👑", icfesEquivalent: "480-500" }
      ],

      howItWorks: {
        gainingPoints: "Responder correctamente suma puntos. Preguntas más difíciles dan más puntos.",
        losingPoints: "Respuestas incorrectas restan puntos. Preguntas fáciles quitan más si fallas.",
        timeBonus: "Respuestas rápidas y correctas dan bonus adicional.",
        stabilization: "El sistema se estabiliza después de 20-30 preguntas."
      }
    },

    // Tips de estudio
    studyTips: [
      {
        title: "Practica a diario",
        description: "15-30 minutos de práctica consistente es mejor que maratones ocasionales"
      },
      {
        title: "Enfócate en debilidades",
        description: "Usa tu Plan de Mejora para identificar y trabajar en áreas débiles"
      },
      {
        title: "Lee las explicaciones",
        description: "Aprende de tus errores revisando las explicaciones de cada pregunta"
      },
      {
        title: "Simula el examen",
        description: "Practica con tiempo limitado para acostumbrarte a la presión"
      },
      {
        title: "Descansa bien",
        description: "El sueño consolida la memoria y mejora el rendimiento cognitivo"
      }
    ],

    // Recursos oficiales
    officialResources: [
      {
        name: "ICFES",
        url: "https://www.icfes.gov.co/",
        description: "Exámenes anteriores y guías oficiales"
      },
      {
        name: "Colombia Aprende",
        url: "https://colombiaaprende.edu.co/",
        description: "Portal del Ministerio de Educación"
      },
      {
        name: "MinEducación",
        url: "https://www.mineducacion.gov.co/",
        description: "Estándares y normativas educativas"
      },
      {
        name: "Khan Academy (Español)",
        url: "https://es.khanacademy.org/",
        description: "Cursos gratuitos de matemáticas y ciencias"
      }
    ],

    // Prompt templates para uso del cuaderno
    promptTemplates: {
      initialSetup: `
Hola NotebookLM, soy un estudiante colombiano preparándome para el ICFES Saber 11.
Por favor, usa esta fuente como base de conocimiento para ayudarme a estudiar.

Tu rol es ser mi Tutor Experto ICFES. Cuando te comparta mi perfil de rendimiento:
1. Analiza mis debilidades y fortalezas
2. Crea un plan de estudio semanal personalizado
3. Genera preguntas de práctica tipo ICFES
4. Proporciona explicaciones claras y concisas

¡Empecemos!
      `.trim(),

      profileUpdate: `
🚨 ACTUALIZACIÓN DE PROGRESO [FECHA]

He realizado nuevos exámenes de práctica. Por favor:
1. Re-prioriza mi plan de estudio con estas nuevas debilidades
2. Genera 3 preguntas nuevas para cada área crítica
3. Identifica patrones en mis errores
4. Dame un resumen rápido de conceptos clave a reforzar
      `.trim()
    }
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache 1 hour
      'Access-Control-Allow-Origin': '*'
    }
  });
};
