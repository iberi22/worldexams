/**
 * Content Collections Configuration
 *
 * Questions are stored locally in src/content/questions/ and processed
 * at build time to generate the static API in public/api/
 */

import { defineCollection, z } from 'astro:content';

const questionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Metadata global
    id: z.string(),
    country: z.string(), // Lowercase: 'co', 'mx', etc.
    grado: z.number(),
    asignatura: z.string(),
    tema: z.string(),
    protocol_version: z.string().optional(),
    bundle_version: z.string().optional(),
    total_questions: z.number().optional(),
    difficulty_distribution: z.string().optional(),
    estado: z.string().optional(), // 'draft', 'review', 'approved', 'public'
    creador: z.string().optional(),
    generation_date: z.string().optional(),

    // Source attribution
    source_url: z.string().optional(),
    source_license: z.string().optional(),
    licenses: z.object({
      v1: z.string().optional(),
      v2: z.string().optional(),
      v3: z.string().optional(),
      v4: z.string().optional(),
      v5: z.string().optional(),
      v6: z.string().optional(),
      v7: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  questions: questionsCollection,
};
