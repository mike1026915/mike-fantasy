import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    // A date with a time but no zone, like '2021-05-30 16:15:15', is read as UTC
    // so local and Netlify builds agree (the page formats dates in UTC too).
    date: z.preprocess(
      (value) =>
        typeof value === 'string' && /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(value)
          ? `${value.replace(' ', 'T')}Z`
          : value,
      z.coerce.date(),
    ),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    socialImage: z.string().optional(),
  }),
});

export const collections = { blog };
