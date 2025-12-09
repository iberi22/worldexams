import { defineCollection, z } from 'astro:content';

/**
 * Schema for Question Bundles V2.1
 *
 * Each bundle contains 7 questions:
 * - 1 Original (difficulty 3)
 * - 2 Easy (difficulty 1-2)
 * - 2 Medium (difficulty 3)
 * - 2 Hard (difficulty 4-5)
 */
const questions = defineCollection({
  schema: z.object({
    // === GLOBAL METADATA ===
    id: z.string(),
    country: z.string().length(2).default('CO'), // ISO 3166-1 alpha-2
    grado: z.number().int().min(3).max(11),
    asignatura: z.string(),
    tema: z.string(),
    dificultad: z.number().int().min(1).max(5).optional(),
    estado: z.enum(['draft', 'published', 'archived']).default('draft'),
    creador: z.string().optional(),

    // === BUNDLE METADATA (V2.1) ===
    protocol_version: z.string().optional(), // "2.1" for bundles
    bundle_version: z.string().optional(),
    total_questions: z.number().int().min(1).max(10).optional(),
    difficulty_distribution: z.string().optional(),
    generation_date: z.string().optional(),

    // === SOURCE ATTRIBUTION ===
    source: z.string().optional(),
    source_url: z.string().url().optional(),
    source_license: z.string().optional(),
    source_id: z.string().optional(),
    source_lang: z.string().optional(), // e.g., "es-CO", "en-US"
    original_concept: z.string().optional(),
    consulted_at: z.string().optional(),

    // === ICFES ALIGNMENT ===
    competencia_icfes: z.string().optional(),
    componente: z.string().optional(),

    // === UNIVERSAL SHARING ===
    universal_question: z.boolean().default(false),
    applicable_exams: z.array(z.string()).optional(),

    // === GENERATION METADATA ===
    llm_model: z.string().optional(),
    agent: z.string().optional(),
    ide: z.string().optional(),

    // === LEGACY SUPPORT ===
    group_id: z.string().optional(),
  }),
});

export const collections = {
  questions,
};
