import { describe, expect, it } from 'vitest';
import { buildPersonSchema } from './schema';

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
