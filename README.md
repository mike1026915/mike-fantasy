# Mike Fantasy

Personal website and resume for Mike Fang. The live site is [mike-fang.com](https://www.mike-fang.com).

The home page is a brand overview and `/resume` is the full resume, both rendered from `src/data/profile.json`. Blog posts are Markdown or MDX files under `src/content/blog`, published at `/blogs/<slug>`.

## Stack

- [Astro](https://astro.build/) 7, static output
- Astro components with scoped CSS
- Markdown / MDX content collections for posts
- Decap CMS (formerly Netlify CMS) at `/admin`
- `@astrojs/sitemap` and `@astrojs/rss`

Astro 7 needs Node 22.12 or newer. Netlify builds with Node 22.12.0 (see `netlify.toml`) and publishes `dist/`.

## Scripts

```shell
npm install
npm run dev
```

`npm start` is the same as `npm run dev`. The dev server is at http://localhost:4321.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run resume:pdf` | Regenerate `public/Mike-Fang-Resume.pdf` from `profile.json` |

## Routes

| Path | Source |
| --- | --- |
| `/` | Brand overview from the `brand` block in `src/data/profile.json` |
| `/resume` | Full resume from `src/data/profile.json` |
| `/blogs` | Published posts (`draft: false`) |
| `/blogs/<slug>` | One post, from `src/content/blog` |
| `/rss.xml` | RSS feed of published posts |
| `/admin` | Decap CMS |

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
      "events": [
        "Built a **Salary Report** used by the consulting team."
      ]
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
date: "2026-10-12"
draft: false
slug: "post-title"
tags:
  - Life
description: "Short summary used on the blog index."
---

Post body.
```

Optional `socialImage` sets the post's `og:image` and JSON-LD image. Use a full URL or a site path such as `/uploads/cover.jpg` (files in `public/uploads/`); a bare file name is ignored and the site preview image is used.

Decap CMS writes the same shape through `/admin`. Its config is `public/admin/config.yml`.

## Layout

```text
src/data/profile.json          Resume content
src/siteConfig.ts              Site title, description, menus, contacts
src/content.config.ts          Blog collection schema
src/content/blog/              Markdown / MDX posts
src/pages/                     Routes: index, resume, blogs, rss.xml, 404
src/layouts/Layout.astro       Page shell: head, sidebar, content
src/components/SEO.astro       Per-page meta tags, canonical, JSON-LD
src/components/brand/          Home page sections
src/components/resume/         Resume sections
src/components/blog/           Blog index entry
src/lib/                       Text helpers and the Person JSON-LD
public/                        Fonts, resume PDF, robots.txt, /admin
```

## Resume PDF

The "Download PDF" button on `/resume` links to `public/Mike-Fang-Resume.pdf`, served at `/Mike-Fang-Resume.pdf`. The file is generated from `src/data/profile.json` and committed, so Netlify does not need Python.

After editing the resume, regenerate it and commit the result:

```shell
pip install reportlab pypdf
npm run resume:pdf
```

The script needs the Liberation Sans fonts and a CJK font (WenQuanYi Zen Hei) for the Chinese name; see the constants at the top of `scripts/generate-resume-pdf.py` for the paths.

Privacy settings:

- The PDF only contains information that is already public on the site. The email is left out; set `RESUME_PUBLIC_EMAIL` when generating to include one.
- Every page has a footer with the site and the update month.
- All document metadata (author, creator, producer, dates, XMP) is stripped.
- `netlify.toml` sends `X-Robots-Tag: noindex` for the PDF, and `public/robots.txt` asks AI crawlers to skip it. Search engines are not blocked in `robots.txt` so they can see the `noindex` header.
