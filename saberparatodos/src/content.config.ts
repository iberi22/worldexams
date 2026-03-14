import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

const videoCollection = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/video'
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional()
  }).passthrough()
});

export const collections = {
  changelog: changelogCollection,
  video: videoCollection
};
