import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mike-fang.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin/') })],
});
