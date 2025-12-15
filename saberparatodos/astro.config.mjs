import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Site configuration for standalone deployment
  site: import.meta.env.PUBLIC_SITE_URL || 'https://saberparatodos.pages.dev',

  // No base path needed - this is root level deployment
  // base: '/saber-co', // Remove this for standalone deployment

  integrations: [svelte(), tailwind(), sitemap()],

  output: 'static',

  // Vite configuration for environment variables
  vite: {
    resolve: {
      alias: {
        '$lib': '/src/lib'
      }
    },
    define: {
      // Removed hardcoded API URL to allow .env loading
    },
    // Optimize KaTeX
    optimizeDeps: {
      include: ['katex']
    }
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto'
  }
});
