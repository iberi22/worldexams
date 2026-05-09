import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://world-exams.github.io/',
  integrations: [svelte(), tailwind(), sitemap()],
  output: 'static',
});
