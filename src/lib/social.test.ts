import { describe, expect, it } from 'vitest';
import { resolveSocialImage } from './social';

describe('resolveSocialImage', () => {
  it('returns nothing when there is no image', () => {
    expect(resolveSocialImage()).toBeUndefined();
    expect(resolveSocialImage('')).toBeUndefined();
  });

  it('passes a full URL through', () => {
    expect(resolveSocialImage('https://cdn.example.com/a.jpg')).toBe(
      'https://cdn.example.com/a.jpg',
    );
  });

  it('turns a site path into an absolute URL', () => {
    expect(resolveSocialImage('/uploads/cover.jpg')).toBe(
      'https://www.mike-fang.com/uploads/cover.jpg',
    );
  });

  it('ignores a bare file name', () => {
    expect(resolveSocialImage('cover.jpg')).toBeUndefined();
  });
});
