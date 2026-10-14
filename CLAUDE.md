# Project rules

Claude Code reads this file. Cursor reads the same checklist from `.cursor/rules/project-checks.mdc`. Keep the two lists identical.

## Before finishing any code change

Run these commands, in this order, and fix any failure before reporting the work as done:

1. `npm run test`
2. `npm run lint`
3. `npm run check` (Astro type check)
4. `npm run format` (writes files with Prettier; include its changes in the commit)
5. `npm run resume:check`

If `resume:check` fails, run `npm run resume:pdf`, then `npm run resume:check` again. Commit `public/Mike-Fang-Resume.pdf` and `scripts/resume-pdf.sha256` together with the profile change.

Skip them only when the change touches no code or config (for example a pure copy edit in a note outside `src/`). Still run `npm run resume:check` when `src/data/profile.json` changes.
