# Project rules

## Before finishing any code change

Run these commands, in this order, and fix any failure before reporting the work as done:

1. `npm run test`
2. `npm run lint`
3. `npm run check` (Astro type check)
4. `npm run format` (writes files with Prettier; include its changes in the commit)

Skip them only when the change touches no code or config (for example a pure copy edit in a note outside `src/`).
