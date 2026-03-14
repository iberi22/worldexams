import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://saberparatodos.pages.dev',
  integrations: [
    svelte(),
    tailwind(),
    sitemap(),
    sentry({
      dsn: process.env.PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      release: process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
      enabled: process.env.NODE_ENV === 'production',

      // Configuración de sampling
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      // Integración con Supabase
      beforeSend(event, hint) {
        // Filtrar errores de Supabase conocidos
        if (event.exception) {
          const error = hint.originalException;
          if (error && error.message) {
            // Ignorar errores de conexión de Supabase Realtime
            if (error.message.includes('WebSocket')) {
              return null;
            }
          }
        }
        return event;
      },
    }),
  ],

  vite: {
    build: {
      sourcemap: true, // Importante para Sentry
    },
  },
});
