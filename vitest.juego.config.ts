/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./saberparatodos/src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./saberparatodos/src/lib', import.meta.url)),
      'edge-mesh': fileURLToPath(new URL('./saberparatodos/src/lib/ai/__mocks__/edge-mesh-stub.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    include: ['saberparatodos/src/lib/juego/**/*.test.ts', 'src/lib/juego/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.astro/**', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['saberparatodos/src/lib/juego/**/*.ts', 'src/lib/juego/**/*.ts', '!**/*.test.ts'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      reporter: ['text', 'json-summary'],
    },
  },
});
