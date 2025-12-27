import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Site configuration for standalone deployment
  site: import.meta.env.PUBLIC_SITE_URL || 'https://saberparatodos.pages.dev',

  // No base path needed - this is root level deployment
  // base: '/saber-co', // Remove this for standalone deployment

  integrations: [svelte(), tailwind(), sitemap()],

  // 🆕 Enable SSR for Cloudflare Workers
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  // Security headers via adapter
  server: {
    headers: {
      // Content Security Policy
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tzmrgvtptdtsjcugwqyq.supabase.co",
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://tzmrgvtptdtsjcugwqyq.supabase.co wss://tzmrgvtptdtsjcugwqyq.supabase.co",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ].join('; '),
      // Other security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
  },

  // Vite configuration for environment variables
  vite: {
    resolve: {
      alias: {
        '@': '/src',
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
