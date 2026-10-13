import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', '.venv*/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['scripts/**/*.mjs', '*.config.{js,mjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    // Components take loosely typed props from JSON data.
    files: ['**/*.astro'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
];
