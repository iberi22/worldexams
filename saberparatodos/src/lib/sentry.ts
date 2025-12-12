import * as Sentry from '@sentry/svelte';

// Inicializar Sentry solo en producción
if (import.meta.env.PROD && import.meta.env.PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,
    environment: import.meta.env.MODE || 'production',

    // Integración con Svelte
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance Monitoring
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/saberparatodos\.pages\.dev/,
      /^https:\/\/.*\.supabase\.co/,
    ],

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Configuración de errores
    beforeSend(event, hint) {
      // Filtrar errores conocidos
      const error = hint.originalException;

      if (error && error.message) {
        // Ignorar errores de WebSocket de Supabase Realtime
        if (error.message.includes('WebSocket') ||
            error.message.includes('ws://') ||
            error.message.includes('wss://')) {
          return null;
        }

        // Ignorar errores de red transitorios
        if (error.message.includes('NetworkError') ||
            error.message.includes('Failed to fetch')) {
          return null;
        }
      }

      return event;
    },

    // Tags personalizados
    initialScope: {
      tags: {
        platform: 'web',
        project: 'saberparatodos',
        country: 'CO',
      },
    },
  });
}

export { Sentry };
