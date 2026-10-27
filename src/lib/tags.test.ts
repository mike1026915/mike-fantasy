import { describe, expect, it } from 'vitest';
import { groupPostsByTag, tagHref, tagSlug } from './tags';

const post = (id: string, tags: string[]) => ({ id, data: { tags } });

describe('tagSlug', () => {
  it('lowercases and hyphenates', () => {
    expect(tagSlug('  Ruby on Rails ')).toBe('ruby-on-rails');
    expect(tagSlug('AWS')).toBe('aws');
  });
});

describe('tagHref', () => {
  it('builds the tag page URL and escapes non-ASCII', () => {
    expect(tagHref('Astro')).toBe('/blogs/tags/astro/');
    expect(tagHref('生活')).toBe('/blogs/tags/%E7%94%9F%E6%B4%BB/');
  });
});

describe('groupPostsByTag', () => {
  it('groups case-insensitively and keeps the first spelling', () => {
    const a = post('a', ['AWS', 'Terraform']);
    const b = post('b', ['aws']);
    const groups = groupPostsByTag([a, b]);
    expect(groups.get('aws')).toEqual({ name: 'AWS', posts: [a, b] });
    expect(groups.get('terraform')?.posts).toEqual([a]);
  });

  it('lists a post once even when a tag repeats', () => {
    const a = post('a', ['Astro', 'astro']);
    expect(groupPostsByTag([a]).get('astro')?.posts).toEqual([a]);
  });

  it('returns nothing for untagged posts', () => {
    expect(groupPostsByTag([post('a', [])]).size).toBe(0);
  });
});
