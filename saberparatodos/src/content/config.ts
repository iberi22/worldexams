/**
 * Content Collections Configuration
 *
 * Questions are stored locally in src/content/questions/ and processed
 * at build time to generate the static API in public/api/
 */

import { defineCollection, z } from 'astro:content';

const questionsCollection = defineCollection({
  type: 'content',
  schema: z.any(), // Allow any schema - we're using static JSON files anyway
});

export const collections = {
  questions: questionsCollection,
};
