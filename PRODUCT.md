# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors, in priority order of confirmed intent:

- **Recruiters and hiring managers** evaluating Mike for engineering-leadership or senior full-stack roles.
- **Engineering peers** who reach the site through the blog or GitHub and judge technical credibility and craft.
- **Founders and senior executives** looking for a lead engineer or technical partner.

Situation: a short, skeptical scan of a stranger's background, usually arriving from LinkedIn, a referral, or a search. Job to be done: decide quickly whether this person is worth a conversation.

## Product Purpose

Personal website, resume and blog of Mike Fang (方鍾豪), an engineering leader based in Taipei, live at mike-fang.com. It presents his background and measured outcomes, hosts the full resume and a downloadable PDF, and carries his writing.

Success is a visitor contacting Mike (email or LinkedIn) about a role or an engagement. Resume download and blog readership support that outcome; they are not the goal.

## Positioning

An engineering leader with 10+ years across cybersecurity, SaaS, AdTech and HR tech, who is today the sole lead engineer of an AI-powered recruiting CRM and runs an AI-first engineering workflow with Claude Code and Cursor. The claim that sets him apart is range plus quantified results: each domain has a measured outcome rather than a job title alone.

## Operating Context

- All resume content is edited in one file, `src/data/profile.json`; it feeds the home page, `/resume`, the Person JSON-LD and the generated PDF, so they must never disagree.
- The resume PDF is generated and committed; CI fails if `profile.json` changes without regenerating it.
- Blog posts are Markdown/MDX under `src/content/blog`, edited directly or through Decap CMS at `/admin`.
- Deployed as a static site on Netlify.

## Capabilities and Constraints

- Routes: `/` (brand overview), `/resume`, `/blogs`, `/blogs/<slug>`, `/rss.xml`, `/admin`, `404`.
- Astro 7, static output, scoped CSS, no client-side framework; scripts limited to the mobile menu toggle and an Identity widget loader. Keep runtime JS minimal.
- Self-hosted variable fonts via Fontsource (Montserrat, Open Sans, Sora).
- Bilingual identity: Chinese name and Taipei base are part of how he is presented; blog posts may be `en` or `zh-Hant`.
- Privacy: the PDF omits the email and all document metadata and is `noindex`.
- Contact channels: email, LinkedIn, GitHub, Instagram.

## Brand Commitments

- The existing olive green brand color (the family around `#6a6e4f`) is binding and stays.
- The AI-first workflow and the quantified, cross-domain outcomes are the core of the story and must stay prominent.
- Voice is first person, plain and direct. Existing intro line: "Try my best to do right things with right people then enjoy an easy life!"

## Evidence on Hand

- Measured proof points in `profile.json`: ~10% less unnecessary AI token spend (BHRC CRM, 2024–present); 60% fewer unnecessary video generation requests via a request scheduler (Vyond); ~40% higher retention from the onboarding task force (Vyond).
- Selected work: BHRC CRM (HR tech), Vyond (SaaS), Placements.io (AdTech), Trend Micro Deep Discovery U-Sandbox (cybersecurity).
- Nine roles of experience, education, skills, a committed resume PDF, a portrait (`src/images/Mike.jpg`), and one sample blog post.
- No testimonials, client logos, case-study write-ups or press mentions exist. Do not fabricate them.

## Product Principles

1. **Outcomes before titles.** Lead with measured results and the problem solved, not a list of employers.
2. **Make contact effortless.** Every page ends in a clear, low-friction way to reach Mike.
3. **One source of truth.** Anything shown about the career comes from `profile.json`; never hand-write a divergent copy.
4. **Claims stay verifiable.** Only numbers and facts already in the resume appear; no invented proof.
5. **Light and fast.** A static, near-zero-JS site is part of the credibility of an engineering leader.

## Accessibility & Inclusion

Not formally specified. Treat WCAG AA as the working baseline, including correct `lang` handling for Chinese text and posts.
