import { describe, expect, it } from 'vitest';
import { buildPersonSchema, buildWebSiteSchema } from './schema';

describe('buildPersonSchema', () => {
  it('describes the site owner as a schema.org Person', () => {
    const schema = buildPersonSchema('Engineering Leader', '方鍾豪');

    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Mike Fang');
    expect(schema.alternateName).toBe('方鍾豪');
    expect(schema.jobTitle).toBe('Engineering Leader');
    expect(schema.url).toBe('https://www.mike-fang.com');
    expect(schema.sameAs).toEqual(
      expect.arrayContaining([
        expect.stringContaining('linkedin.com'),
        expect.stringContaining('github.com'),
      ]),
    );
  });
});

describe('buildWebSiteSchema', () => {
  it('names the site and points at the canonical origin', () => {
    const schema = buildWebSiteSchema();

    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Mike Fang');
    expect(schema.url).toBe('https://www.mike-fang.com');
  });
});
