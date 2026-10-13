import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Same rule as the CMS slug field: it becomes the URL /blogs/<slug>/.
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    // A date with a time but no zone, like '2021-05-30 16:15:15', is read as UTC
    // so local and Netlify builds agree (the page formats dates in UTC too).
    date: z.preprocess(
      (value) =>
        typeof value === 'string' &&
        /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(value)
          ? `${value.replace(' ', 'T')}Z`
          : value,
      z.coerce.date(),
    ),
    // Set when a post is revised after publishing; becomes dateModified.
    updated: z.coerce.date().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Language of the post body; sets <html lang> and og:locale.
    lang: z.enum(['en', 'zh-Hant']).default('en'),
    socialImage: z.string().optional(),
  }),
});

export const collections = { blog };
