/**
 * NotebookLM Source API Endpoint
 *
 * Country-aware source document for NotebookLM and similar study assistants.
 */

import type { APIRoute } from 'astro';
import { countryConfig as defaultCountryConfig, toRuntimeCountryConfig } from '../../config';

const OFFICIAL_RESOURCES = {
  CO: [
    { name: 'ICFES', url: 'https://www.icfes.gov.co/', description: 'Exámenes anteriores y guías oficiales' },
    { name: 'Colombia Aprende', url: 'https://colombiaaprende.edu.co/', description: 'Portal del Ministerio de Educación' },
    { name: 'MinEducación', url: 'https://www.mineducacion.gov.co/', description: 'Estándares y normativas educativas' },
  ],
  MX: [
    { name: 'SEP', url: 'https://www.gob.mx/sep', description: 'Información educativa oficial de México' },
    { name: 'Mejoredu', url: 'https://www.gob.mx/mejoredu', description: 'Evaluación y mejora educativa' },
  ],
  AR: [
    { name: 'Ministerio de Educación', url: 'https://www.argentina.gob.ar/educacion', description: 'Información educativa oficial de Argentina' },
  ],
  CL: [
    { name: 'Agencia de Calidad de la Educación', url: 'https://www.agenciaeducacion.cl/', description: 'Recursos oficiales y evaluación educativa' },
    { name: 'Currículum Nacional', url: 'https://www.curriculumnacional.cl/', description: 'Bases curriculares y recursos docentes' },
  ],
  PE: [
    { name: 'MINEDU', url: 'https://www.gob.pe/minedu', description: 'Ministerio de Educación del Perú' },
  ],
  EC: [
    { name: 'SENESCYT', url: 'https://www.senescyt.gob.ec/', description: 'Información oficial de nivelación y admisión' },
    { name: 'Ministerio de Educación', url: 'https://educacion.gob.ec/', description: 'Recursos educativos oficiales de Ecuador' },
  ],
  BR: [
    { name: 'INEP', url: 'https://www.gov.br/inep/pt-br', description: 'Informações oficiais do ENEM' },
    { name: 'MEC', url: 'https://www.gov.br/mec/pt-br', description: 'Ministério da Educação do Brasil' },
  ],
} as const;

function getLanguageGuideline(language: string): string {
  return language === 'pt-BR'
    ? 'Responder sempre em português do Brasil'
    : `Responder siempre en ${language}`;
}

export const GET: APIRoute = async ({ locals, request }) => {
  const country = locals.country ? toRuntimeCountryConfig(locals.country) : defaultCountryConfig;
  const origin = new URL(request.url).origin;
  const officialResources = [
    ...(OFFICIAL_RESOURCES[country.code] || []),
    {
      name: 'Khan Academy',
      url: country.language === 'pt-BR' ? 'https://pt.khanacademy.org/' : 'https://es.khanacademy.org/',
      description: country.language === 'pt-BR' ? 'Cursos gratuitos para reforço acadêmico' : 'Cursos gratuitos de refuerzo académico',
    },
  ];

  const data = {
    platform: country.product.siteName,
    version: '2.2',
    lastUpdated: new Date().toISOString().split('T')[0],
    sourceUrl: `${origin}/notebooklm`,
    country: {
      code: country.code,
      name: country.name,
      examName: country.examName,
      examFullName: country.examFullName,
      examAuthority: country.examAuthority,
    },
    notebookInstructions: {
      role: `Tutor Experto en ${country.examName}`,
      objective: `Ayudar a estudiantes de ${country.name} a prepararse para ${country.examFullName}`,
      context: [
        `${country.examFullName} es una referencia educativa clave en ${country.name}.`,
        `La autoridad responsable es ${country.examAuthority}.`,
        'Usa esta fuente para adaptar recomendaciones, práctica y explicaciones al contexto local del estudiante.',
      ].join('\n'),
      capabilities: [
        'Analizar debilidades del estudiante basándose en su perfil cognitivo',
        'Generar planes de estudio semanales personalizados',
        `Crear preguntas tipo ${country.examName} con explicaciones pedagógicas`,
        'Identificar patrones de error y recomendar estrategias',
        'Proporcionar resúmenes conceptuales y flashcards',
      ],
      responseGuidelines: [
        getLanguageGuideline(country.language),
        'Usar lenguaje claro y motivador, apropiado para estudiantes de secundaria',
        `Incluir ejemplos relevantes al contexto de ${country.name}`,
        'Estructurar respuestas con encabezados y listas',
        `Priorizar explicaciones paso a paso alineadas con ${country.examAuthority}`,
      ],
    },
    examStructure: {
      name: country.examName,
      fullName: country.examFullName,
      administrator: country.examAuthority,
      totalScore: {
        min: 0,
        max: 500,
        description: `Escala proxy de práctica alineada al formato de ${country.examAuthority}`,
      },
      areas: country.subjects.map((subject, index) => ({
        name: subject.name,
        code: subject.globalId.toUpperCase(),
        questions: null,
        timeMinutes: null,
        maxScore: 100,
        weight: Number((1 / country.subjects.length).toFixed(2)),
        order: index + 1,
      })),
    },
    competencies: Object.fromEntries(
      country.subjects.map((subject) => [
        subject.id,
        [
          {
            name: `Dominio de ${subject.name}`,
            description: `Resolver preguntas alineadas con ${country.examAuthority} en el área de ${subject.name}.`,
          },
        ],
      ])
    ),
    scoringSystem: {
      name: 'Puntaje WorldExams',
      description: `Sistema de puntuación dinámico integrado y orientado a una escala proxy 0-500 para ${country.examName}`,
      initialScore: 250,
      ranks: [
        { name: 'Iniciado', min: 0, max: 149, emoji: '🔰' },
        { name: 'Aprendiz', min: 150, max: 219, emoji: '📗' },
        { name: 'Estudiante', min: 220, max: 279, emoji: '📘' },
        { name: 'Avanzado', min: 280, max: 339, emoji: '📙' },
        { name: 'Experto', min: 340, max: 399, emoji: '📕' },
        { name: 'Maestro', min: 400, max: 459, emoji: '⭐' },
        { name: 'Gran Maestro', min: 460, max: 500, emoji: '👑' },
      ],
      howItWorks: {
        gainingPoints: 'Responder correctamente suma puntos. Preguntas más difíciles dan más puntos.',
        losingPoints: 'Respuestas incorrectas restan puntos. Preguntas fáciles quitan más si fallas.',
        timeBonus: 'Respuestas rápidas y correctas dan bonus adicional.',
        stabilization: `El sistema se estabiliza después de 20-30 preguntas permitiendo una lectura proxy más confiable para ${country.examName}.`,
      },
      proxyNote: `El puntaje local es una estimación de práctica y no reemplaza ningún reporte oficial de ${country.examAuthority}.`,
    },
    studyTips: [
      {
        title: 'Practica a diario',
        description: '15-30 minutos de práctica consistente es mejor que maratones ocasionales',
      },
      {
        title: 'Enfócate en debilidades',
        description: 'Usa tu plan de mejora para identificar y trabajar en áreas débiles',
      },
      {
        title: 'Lee las explicaciones',
        description: 'Aprende de tus errores revisando las explicaciones de cada pregunta',
      },
      {
        title: 'Simula el examen',
        description: `Practica con tiempo limitado para acostumbrarte al ritmo de ${country.examName}`,
      },
      {
        title: 'Descansa bien',
        description: 'El sueño consolida la memoria y mejora el rendimiento cognitivo',
      },
    ],
    officialResources,
    promptTemplates: {
      initialSetup: [
        `Hola NotebookLM, soy un estudiante de ${country.name} preparándome para ${country.examFullName}.`,
        'Por favor, usa esta fuente como base de conocimiento para ayudarme a estudiar.',
        '',
        `Tu rol es ser mi Tutor Experto en ${country.examName}. Cuando te comparta mi perfil de rendimiento:`,
        '1. Analiza mis debilidades y fortalezas',
        '2. Crea un plan de estudio semanal personalizado',
        `3. Genera preguntas de práctica tipo ${country.examName}`,
        '4. Proporciona explicaciones claras y concisas',
      ].join('\n'),
      profileUpdate: [
        'ACTUALIZACIÓN DE PROGRESO [FECHA]',
        '',
        'He realizado nuevos exámenes de práctica. Por favor:',
        '1. Re-prioriza mi plan de estudio con estas nuevas debilidades',
        `2. Genera 3 preguntas nuevas para cada área crítica siguiendo ${country.examAuthority}`,
        '3. Identifica patrones en mis errores',
        '4. Dame un resumen rápido de conceptos clave a reforzar',
      ].join('\n'),
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
