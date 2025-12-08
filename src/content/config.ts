import { defineCollection, z } from 'astro:content';

/**
 * Question Bundle Collection Schema
 * Each file contains a bundle of 7 questions (1 original + 2 Low + 2 Medium + 2 High)
 */
const questions = defineCollection({
  type: 'content',
  schema: z.object({
    // Bundle ID (e.g., CO-BIO-11-celular-001)
    id: z.string(),

    // Country code
    country: z.string().optional(),

    // Grade level (3-11)
    grado: z.number().int().min(3).max(11),

    // Subject
    asignatura: z.string(),

    // Specific topic
    tema: z.string(),

    // Protocol info
    protocol_version: z.string().optional(),
    total_questions: z.number().optional(),
    difficulty_distribution: z.string().optional(),

    // Publication state
    // 'public' is used in current markdown files
    estado: z.enum(['draft', 'published', 'archived', 'public', 'review']).optional(),

    // Metadata
    creador: z.string().optional(),
    generation_date: z.string().optional(),

    // Source Attribution
    source_url: z.string().optional(),
    source_license: z.string().optional(),
    source_id: z.string().optional(),

    // Optional fields for legacy or future compatibility
    llm_model: z.string().optional(),
    agent: z.string().optional(),
    ide: z.string().optional(),
    group_id: z.string().optional(),
  }),
});

export const collections = {
  questions,
};
