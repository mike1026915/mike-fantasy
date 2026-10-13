/// <reference types="astro/client" />

// TypeScript 6+ rejects side-effect CSS imports unless a wildcard module is declared.
declare module '*.css' {}
