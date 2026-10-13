import { siteConfig } from '../siteConfig';

/**
 * Turn a post's `socialImage` frontmatter into an absolute URL for og:image.
 * Accepts a full URL or a site path such as "/uploads/cover.jpg" (what the CMS
 * image widget writes). Anything else, like a bare file name, is ignored and
 * the page falls back to the site preview image.
 */
export function resolveSocialImage(value?: string): string | undefined {
  if (!value) return undefined;
  if (/^https?:\/\//.test(value)) return value;
  if (value.startsWith('/')) return `${siteConfig.siteUrl}${value}`;
  return undefined;
}
