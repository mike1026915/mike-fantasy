import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

// Astro's schema already enforces required fields and date format; these cover
// what a schema cannot: uniqueness across posts and alt text in the body.
const dir = 'src/content/blog';
const posts = readdirSync(dir)
  .filter((f) => /\.mdx?$/.test(f))
  .map((file) => {
    const raw = readFileSync(join(dir, file), 'utf8');
    const [, front, body] = raw.split(/^---\s*$/m);
    return { file, data: parse(front) as { slug: string; title: string }, body };
  });

describe('blog content', () => {
  it('has unique slugs', () => {
    const slugs = posts.map((p) => p.data.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses URL-safe slugs', () => {
    for (const p of posts) expect(p.data.slug, p.file).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives every image alt text', () => {
    for (const p of posts) {
      expect(p.body, p.file).not.toMatch(/!\[\s*\]\(/);
      expect(p.body, p.file).not.toMatch(/<img\b(?![^>]*\balt=")/);
    }
  });
});
