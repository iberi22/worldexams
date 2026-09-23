/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./saberparatodos/src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./saberparatodos/src/lib', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['saberparatodos/src/lib/juego/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.astro/**', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['saberparatodos/src/lib/juego/**/*.ts'],
      exclude: ['**/*.test.ts', '**/types.ts'],
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
