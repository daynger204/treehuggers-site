// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.treehuggerswinnipeg.com',
  integrations: [sitemap()],
  image: {
    // Use sharp (default) for responsive images at build time
  },
});
