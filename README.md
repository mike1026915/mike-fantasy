# Mike Fantasy

[![CI](https://github.com/mike1026915/mike-fantasy/actions/workflows/ci.yml/badge.svg)](https://github.com/mike1026915/mike-fantasy/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-mike--fang.com-6a6e4f)](https://www.mike-fang.com)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

Personal website, resume and blog of Mike Fang, live at [mike-fang.com](https://www.mike-fang.com).

The home page is a brand overview and `/resume` is the full resume, both rendered from one data file, `src/data/profile.json`. Blog posts are Markdown or MDX files under `src/content/blog`, published at `/blogs/<slug>`.

## Stack

- [Astro](https://astro.build/) 7, static output, deployed on Netlify
- Astro components with scoped CSS, no client-side framework
- Markdown / MDX content collections for posts, validated by a Zod schema
- Decap CMS (formerly Netlify CMS) at `/admin`
- Self-hosted variable fonts via Fontsource (woff2, `font-display: swap`)
- `@astrojs/sitemap` and `@astrojs/rss`
- Vitest, ESLint, Prettier and `astro check`, run in GitHub Actions

Astro 7 needs Node 22.12 or newer (`.nvmrc`). Netlify builds with Node 22.12.0 (see `netlify.toml`) and publishes `dist/`.

## Design decisions

- **One data file for the resume.** `profile.json` feeds the home page, the `/resume` page, the Person JSON-LD and the PDF, so they cannot disagree.
- **Static, no runtime JS to speak of.** The only scripts are the mobile menu toggle and a loader for the Netlify Identity widget, which runs only when an invite or recovery token is in the URL.
- **The resume PDF is generated and committed**, so Netlify does not need Python. CI fails if `profile.json` changes without regenerating it (see [Resume PDF](#resume-pdf)).
- **Privacy by default.** The PDF leaves out the email and all document metadata, and is marked `noindex`.
- **Security headers in `netlify.toml`**, including a Content-Security-Policy that is report-only until it has been checked against the CMS and Identity flows.
- **Third-party script without SRI.** `identity.netlify.com` serves an unversioned widget, so a Subresource Integrity hash is not possible; it is loaded only on invite/recovery links and allowed explicitly in the CSP.

## Scripts

```shell
nvm use   # or any Node >= 22.12
npm install
npm run dev
```

`npm start` is the same as `npm run dev`. The dev server is at http://localhost:4321.

| Command                           | What it does                                                 |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Start the dev server                                         |
| `npm run build`                   | Build the static site into `dist/`                           |
| `npm run preview`                 | Serve the production build                                   |
| `npm run check`                   | Type-check Astro and TypeScript files (`astro check`)        |
| `npm run lint`                    | ESLint                                                       |
| `npm run format` / `format:check` | Prettier, write / verify                                     |
| `npm test`                        | Unit tests (Vitest)                                          |
| `npm run resume:pdf`              | Regenerate `public/Mike-Fang-Resume.pdf` from `profile.json` |
| `npm run resume:check`            | Fail if the committed PDF is older than `profile.json`       |

CI (`.github/workflows/ci.yml`) runs format, lint, type check, tests, the PDF check and a build on every pull request.

## Routes

| Path            | Source                                                           |
| --------------- | ---------------------------------------------------------------- |
| `/`             | Brand overview from the `brand` block in `src/data/profile.json` |
| `/resume`       | Full resume from `src/data/profile.json`                         |
| `/blogs`        | Published posts (`draft: false`)                                 |
| `/blogs/<slug>` | One post, from `src/content/blog`                                |
| `/rss.xml`      | RSS feed of published posts                                      |
| `/admin`        | Decap CMS                                                        |

## Edit the resume

All resume content lives in `src/data/profile.json`: summary, contacts, experience, education, skills, and hobbies. The `brand` block holds the home page copy: title, positioning line, proof points, selected work, and signature skills.

An experience entry can use a flat `events` list, or a `sections` list when the role needs grouped headings. With `sections`, the `description` renders in italics and each section title is a heading. Wrap a phrase in `**double asterisks**` to render it bold.

```json
{
  "role": "Lead Software Engineer",
  "company": "Example",
  "description": "Lead engineer for the internal platform",
  "sections": [
    {
      "title": "Product impact",
      "events": ["Built a **Salary Report** used by the consulting team."]
    }
  ]
}
```

Entries without `sections` stay a single bullet list.

## Add a blog post

Create `src/content/blog/<slug>.md` (or `.mdx`). Posts with `draft: true` are left out of the blog index and are not given a page.

```md
---
title: Post title
date: '2026-10-12'
draft: false
slug: 'post-title'
tags:
  - Life
description: 'Short summary used on the blog index.'
---

Post body.
```

Optional `lang` (`en` or `zh-Hant`, default `en`) is the language of the post body; it sets `<html lang>`, `og:locale` and the JSON-LD `inLanguage`. Optional `socialImage` sets the post's `og:image` and JSON-LD image. Use a full URL or a site path such as `/uploads/cover.jpg` (files in `public/uploads/`); a bare file name is ignored and the site preview image is used.

Decap CMS writes the same shape through `/admin`. Its config is `public/admin/config.yml`.

## Layout

```text
src/data/profile.json          Resume content
src/siteConfig.ts              Site title, description, menus, contacts
src/content.config.ts          Blog collection schema
src/lib/*.test.ts              Unit tests (also checks the CMS config matches the schema)
src/content/blog/              Markdown / MDX posts
src/pages/                     Routes: index, resume, blogs, rss.xml, 404
src/layouts/Layout.astro       Page shell: head, sidebar, content
src/components/SEO.astro       Per-page meta tags, canonical, JSON-LD
src/components/Sidebar.astro   Site navigation: side rail on desktop, labelled top bar on mobile
src/components/Tag*.astro      Tag chip and tag list
src/components/brand/          Home page sections
src/components/resume/         Resume sections
src/components/blog/           Blog index entry
src/lib/                       Text helpers, og:image resolver and the Person JSON-LD
public/                        Resume PDF, robots.txt, /admin CMS config, /uploads
scripts/                       Resume PDF generator and its up-to-date check
docs/                          LinkedIn About text (keep in sync with the resume summary)
PRODUCT.md, DESIGN.md          Audience, tone and design system for the site (Impeccable)
.impeccable/                   Design critiques and design tokens used by the Impeccable skill
```

## Resume PDF

The "Download PDF" button on `/resume` links to `public/Mike-Fang-Resume.pdf`, served at `/Mike-Fang-Resume.pdf`. The file is generated from `src/data/profile.json` and committed, so Netlify does not need Python.

After editing the resume, regenerate it and commit the result:

```shell
pip install -r scripts/requirements.txt
npm run resume:pdf
```

The script needs the Liberation Sans fonts and a CJK font (WenQuanYi Zen Hei) for the Chinese name. It looks in the usual Linux and macOS folders; point it elsewhere with `RESUME_FONT_DIR` (folder with the four Liberation Sans `.ttf` files) and `RESUME_CJK_FONT` (path to a font file with Traditional Chinese glyphs).

It also writes `scripts/resume-pdf.sha256`, a fingerprint of the profile fields that appear in the PDF. `npm run resume:check` compares it with the current `profile.json`, so a resume edit without a regenerated PDF fails CI. Commit the PDF and the fingerprint together. The same check is step 5 of the finish checklist in `CLAUDE.md` (Claude Code) and `.cursor/rules/project-checks.mdc` (Cursor).

Privacy settings:

- The PDF only contains information that is already public on the site. The email is left out; set `RESUME_PUBLIC_EMAIL` when generating to include one.
- Every page has a footer with the site and the update month.
- All document metadata (author, creator, producer, dates, XMP) is stripped.
- `netlify.toml` sends `X-Robots-Tag: noindex` for the PDF, and `public/robots.txt` asks AI crawlers to skip it. Search engines are not blocked in `robots.txt` so they can see the `noindex` header.

## Content Security Policy

`netlify.toml` sends `Content-Security-Policy-Report-Only`. Open the browser console on the Netlify Identity invite/recovery flow and on `/admin` (which loads Decap CMS from unpkg.com and is expected to log violations); once the public site and the login flow are clean, rename the header to `Content-Security-Policy` to enforce it.

## License

The source code is MIT licensed (see [LICENSE](LICENSE)). The text, resume content, blog posts and photos are copyright Mike Fang, all rights reserved.
