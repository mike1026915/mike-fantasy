# Mike Fantasy

Personal website and resume for Mike Fang. The live site is [mike-fang.com](https://www.mike-fang.com).

The home page is a resume rendered from `src/data/profile.json`. Blog posts are MDX files under `src/blogs`, published at `/blogs/<slug>`.

## Stack

- [Gatsby](https://www.gatsbyjs.com/) 2
- React 16
- styled-components
- MDX for posts
- Netlify CMS at `/admin`

Use Node 14. This repo targets Gatsby 2, and the `sharp` native module plus the `esm` preload in the npm scripts do not run on current Node 22. Yarn 4.6 is declared in `package.json`.

## Scripts

```shell
yarn
yarn develop
```

`yarn start` is the same as `yarn develop`. The dev server is at http://localhost:8000.

| Command | What it does |
| --- | --- |
| `yarn develop` | Start the dev server |
| `yarn build` | Build the static site into `public/` |
| `yarn serve` | Serve the production build |
| `yarn clean` | Clear the Gatsby cache |

## Routes

| Path | Source |
| --- | --- |
| `/` | Resume from `src/data/profile.json` |
| `/blogs` | Published posts (`draft: false`) |
| `/blogs/<slug>` | One post, created in `gatsby-node.js` |
| `/admin` | Netlify CMS |

## Edit the resume

All resume content lives in `src/data/profile.json`: summary, contacts, experience, education, skills, and hobbies.

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

Create `src/blogs/<title>/index.mdx` (or `.md`). Posts with `draft: true` are left out of the blog index and are not given a page.

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

Netlify CMS writes the same shape through `/admin`. Its config is `static/admin/config.yml`.

## Layout

```text
src/data/profile.json          Resume content
src/pages/index.js             Resume page
src/pages/blogs.js             Blog index
src/components/resume/         Resume sections
src/components/blog/           Post layout
src/blogs/                     MDX posts
gatsby-config.js               Site metadata and plugins
gatsby-node.js                 Blog page creation
static/admin/config.yml        Netlify CMS
```
