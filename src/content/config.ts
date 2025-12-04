import { defineCollection, z } from 'astro:content';

/**
 * Question Collection Schema
 *
 * Preguntas se organizan en:
 * - _shared/: Preguntas universales (mat, ciencias, lenguaje)
 * - [país]/: Preguntas específicas por país (colombia/, mexico/, etc.)
 */
const questions = defineCollection({
  type: 'content',
  schema: z.object({
    // Identificador único de la pregunta
    id: z.string(),

    // País específico (undefined = _shared/universal)
    country: z.string().optional(),

    // Grado escolar (3-11)
    grado: z.number().int().min(3).max(11),

    // Asignatura principal
    asignatura: z.string(),

    // Tema específico dentro de la asignatura
    tema: z.string(),

    // Nivel de dificultad (1-5)
    dificultad: z.number().int().min(1).max(5),

    // Estado de publicación
    estado: z.enum(['draft', 'published', 'archived']),

    // Creador de la pregunta
    creador: z.string(),

    // Metadatos adicionales opcionales
    llm_model: z.string().optional(),
    agent: z.string().optional(),
    ide: z.string().optional(),
    source: z.string().optional(),
    group_id: z.string().optional(),
  }),
});

export const collections = {
  questions,
};
