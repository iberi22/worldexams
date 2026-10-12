import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://world-exams.github.io/',
  integrations: [svelte(), sitemap()],
  output: 'static',
  server: {
    port: 8000,
    host: true,
  },
  preview: {
    port: 8000,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      port: 8000,
      host: true,
    },
    preview: {
      port: 8000,
    },
  },
});
