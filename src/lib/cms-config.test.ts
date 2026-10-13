import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const config = parse(readFileSync('public/admin/config.yml', 'utf8'));
const contentConfig = readFileSync('src/content.config.ts', 'utf8');

// Keys of the z.object({...}) in the blog collection schema.
const schemaBlock = contentConfig.slice(contentConfig.indexOf('schema: z.object({'));
const schemaKeys = [...schemaBlock.matchAll(/^ {4}(\w+):/gm)].map((match) => match[1]);

describe('Decap CMS config', () => {
  const blog = config.collections.find(
    (collection: { name: string }) => collection.name === 'blog',
  );
  const cmsFields = blog.fields
    .map((field: { name: string }) => field.name)
    .filter((n: string) => n !== 'body');

  it('writes into the content collection folder', () => {
    expect(blog.folder).toBe('src/content/blog');
  });

  it('offers exactly the frontmatter fields the blog schema defines', () => {
    expect([...cmsFields].sort()).toEqual([...schemaKeys].sort());
  });
});
