import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mike-fang.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin/') })],
  vite: {
    build: {
      // Never inline scripts into the HTML, so the Content-Security-Policy can
      // allow scripts from 'self' without 'unsafe-inline'.
      assetsInlineLimit: 0,
    },
  },
});
