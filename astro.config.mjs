// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.treehuggerswinnipeg.com',
  trailingSlash: 'never',
  build: {
    // Emit /what-we-do.html (not /what-we-do/index.html) so URLs match live
    format: 'file',
  },
  integrations: [sitemap()],
});
