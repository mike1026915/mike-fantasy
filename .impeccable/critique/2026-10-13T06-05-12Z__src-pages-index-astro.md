---
target: home page
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/mikefang/project/mike-fantasy/src/pages/index.astro"
target_fingerprint: "sha256:4d7378874883d2f81cfeb665d8ff87db16ea2ca3d1828a2e290db2cd98d59e47"
target_path: /Users/mikefang/project/mike-fantasy/src/pages/index.astro
timestamp: 2026-10-13T06-05-12Z
slug: src-pages-index-astro
closed: true
---
# Critique: src/pages/index.astro (home)
Method: dual-agent. Score 24/32 (n/a: 7, 10). P0: 0, P1: 2.

## Priority Issues
- [P1] Contact is the success metric but the weakest element: ContactLine is 3 plain links at the page end; mobile sidebar icons hidden; no hero CTA. Fix: hero primary/outline buttons + invitation closing block. Commands: layout, clarify.
- [P1] Positioning generic; AI-first story missing from hero (brand.line). Fix: specific claim + visible AI-first line. Command: clarify.
- [P2] Proof points under-perform: weak first stat, 2 of 3 from Vyond, figures 3.2rem near body weight, context 13px. Commands: bolder, typeset.
- [P2] Selected Work text wall; four "Read more" links all go to /resume/ top. Commands: distill, layout.
- [P3] "What I Bring" pill cloud adds nothing, weak ending. Command: distill.

## Detector
14 advisory design-system-font-size (7 on home): Sidebar.astro:202, ProofPoints.astro:33, SelectedWork.astro:56/64, global.css:37/151/165. Overlay: 1 wide-tracking (Q.intro), 5 cramped-padding (15px pills, 7.5px vs 8px).
