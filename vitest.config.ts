/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      // NOTA: sin alias 'edge-mesh' — los tests usan el core real
      // `@iberi22/edge-mesh` (cores/edge-mesh). El stub local
      // `saberparatodos/src/lib/ai/__mocks__/edge-mesh-stub.ts` solo cubre
      // `AiCore`, que el core aún no publica.
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'saberparatodos/src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'apps/**/src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.astro/**', 'tests/e2e/**'],
  },
});
