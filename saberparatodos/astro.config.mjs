import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Site configuration for standalone deployment
  site: import.meta.env.PUBLIC_SITE_URL || 'https://saberparatodos.space',

  // No base path needed - this is root level deployment
  // base: '/saber-co', // Remove this for standalone deployment

  integrations: [svelte(), tailwind(), sitemap()],

  // 🆕 Enable SSR for Cloudflare Workers
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
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
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tzmrgvtptdtsjcugwqyq.supabase.co https://giscus.app https://static.cloudflareinsights.com https://challenges.cloudflare.com",
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
        "img-src 'self' data: https:",
        "font-src 'self' data: https://fonts.gstatic.com font:",
        "connect-src 'self' ws://localhost:* http://localhost:* https://tzmrgvtptdtsjcugwqyq.supabase.co wss://tzmrgvtptdtsjcugwqyq.supabase.co https://api.saberparatodos.space https://giscus.app https://fonts.googleapis.com https://fonts.gstatic.com https://peerjs.com https://*.peerjs.com wss://peerjs.com wss://*.peerjs.com https://0.peerjs.com wss://0.peerjs.com https://static.cloudflareinsights.com",
        "frame-src 'self' https://www.google.com https://giscus.app https://challenges.cloudflare.com",
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
    ssr: {
      external: ['node:async_hooks']
    },
    define: {
      // Removed hardcoded API URL to allow .env loading
    },
    // Optimize KaTeX
    optimizeDeps: {
      include: ['katex']
    },
    build: {
      cssMinify: false
    }
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto'
  }
});
