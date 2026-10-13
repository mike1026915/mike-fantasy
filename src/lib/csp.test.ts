import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// CSP is declared in netlify.toml and only takes effect on Netlify, so these
// tests check the declared policy and that the built HTML can live under it.
const toml = readFileSync('netlify.toml', 'utf8');

function policyFor(path: string): Map<string, string[]> {
  const block = toml.split('[[headers]]').find((b) => b.includes(`for = "${path}"`));
  const value = block?.match(/Content-Security-Policy = "([^"]+)"/)?.[1];
  if (!value) throw new Error(`no Content-Security-Policy for ${path}`);
  return new Map(
    value.split(';').map((d) => {
      const [name, ...sources] = d.trim().split(/\s+/);
      return [name, sources];
    }),
  );
}

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? htmlFiles(join(dir, e.name))
      : e.name.endsWith('.html')
        ? [join(dir, e.name)]
        : [],
  );
}

describe('Content-Security-Policy in netlify.toml', () => {
  const site = policyFor('/*');
  const admin = policyFor('/admin/*');

  it('keeps the public policy strict', () => {
    expect(site.get('script-src')).not.toContain("'unsafe-inline'");
    expect(site.get('script-src')).not.toContain("'unsafe-eval'");
    expect(site.get('object-src')).toEqual(["'none'"]);
    expect(site.get('base-uri')).toEqual(["'self'"]);
  });

  it('confines the looser policy to /admin', () => {
    expect(admin.get('script-src')).toContain("'unsafe-eval'");
    expect(admin.get('object-src')).toEqual(["'none'"]);
  });
});

// Needs `npm run build` first; CI builds before running tests.
describe.skipIf(!existsSync('dist'))('built pages fit the public CSP', () => {
  const site = policyFor('/*');
  const pages = existsSync('dist') ? htmlFiles('dist').filter((f) => !f.includes('/admin/')) : [];

  it('found pages to check', () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it.each(pages)('%s has no inline script or handler', (file) => {
    const html = readFileSync(file, 'utf8');
    const inline = [...html.matchAll(/<script\b([^>]*)>/g)]
      .map((m) => m[1])
      // JSON-LD is data, not executed, so CSP does not apply to it.
      .filter((attrs) => !/\bsrc=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs));
    expect(inline).toEqual([]);
    expect(html).not.toMatch(/\son[a-z]+=/i);
  });

  it.each(pages)('%s only loads scripts from allowed origins', (file) => {
    const html = readFileSync(file, 'utf8');
    const allowed = site.get('script-src') ?? [];
    for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc="(https?:\/\/[^"/]+)/g)) {
      expect(allowed).toContain(src);
    }
  });
});
