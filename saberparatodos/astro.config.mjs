import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // Site configuration for standalone deployment
  site: process.env.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL || 'https://worldexam.swal.network',

  integrations: [
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/tutor/') &&
        !page.includes('/institucion/') &&
        !page.includes('/cuentos/') &&
        !page.includes('/api/'),
    }),
  ],

  // SSR for Cloudflare
  output: 'server',
  adapter: cloudflare(),

  // Vite configuration for environment variables
  vite: {
    server: {
      port: 4321,
      host: true,
      fs: {
        strict: false
      }
    },
    preview: {
      port: 4321
    },
    optimizeDeps: {
      exclude: ['@astrojs/svelte', 'svelte']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '$lib': fileURLToPath(new URL('./src/lib', import.meta.url))
        // NOTA: sin alias 'edge-mesh' — el build usa el core real
        // `@iberi22/edge-mesh` (cores/edge-mesh). Solo `AiCore` sigue en stub
        // local (import directo en ai-core-client/ModelManager).
      }
    },
    plugins: [tailwindcss()]
  }
});
