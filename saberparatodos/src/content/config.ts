/**
 * Content Collections Configuration
 *
 * Questions are stored locally in src/content/questions/ and processed
 * at build time to generate the static API in public/api/
 */

import { defineCollection, z } from 'astro:content';

// const questionsCollection = defineCollection({
//   type: 'content',
//   schema: z.any(),
// });


const changelogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    author: z.string().default('Equipo SaberParaTodos'),
    tags: z.array(z.string()).default([]),
    description: z.string().optional()
  })
});

export const collections = {
  // questions: questionsCollection,
  changelog: changelogCollection,
};
