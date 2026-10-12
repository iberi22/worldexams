import { defineCollection, z } from 'astro:content';

// 'questions' powers the exam practice pages (src/pages/exams/) through
// src/lib/questionLoader.ts and src/lib/bundleParser.ts.
//
// The collection is intentionally empty: weekly bundles live in
// /questions_data and are validated by scripts/validate-bundles-v52.mjs.
// Wiring a file loader over that tree is a separate feature; this
// declaration exists so astro:content types resolve instead of collapsing
// getCollection('questions') to never.
const questionsCollection = defineCollection({
  type: 'content',
  schema: z
    .object({
      id: z.string(),
      country: z.string().optional(),
      grado: z.number(),
      asignatura: z.string(),
      tema: z.string(),
      estado: z.enum(['draft', 'published', 'archived']).optional(),
      total_questions: z.number().optional(),
      quality_status: z.string().optional(),
    })
    .passthrough(),
});

export const collections = {
  questions: questionsCollection,
};
