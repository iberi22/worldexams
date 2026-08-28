import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // Site configuration for standalone deployment
  site: import.meta.env.PUBLIC_SITE_URL || 'https://saberparatodos.space',

  integrations: [
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/tutor/') &&
        !page.includes('/institucion/') &&
        !page.includes('/api/'),
    }),
  ],

  // SSR for Cloudflare
  output: 'server',
  adapter: cloudflare(),

  // Vite configuration for environment variables
  vite: {
    server: {
      fs: {
        strict: false
      }
    },
    optimizeDeps: {
      exclude: ['@astrojs/svelte', 'svelte']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        'edge-mesh': fileURLToPath(new URL('./src/lib/ai/__mocks__/edge-mesh-stub.ts', import.meta.url))
      }
    },
    plugins: [tailwindcss()]
  }
});
