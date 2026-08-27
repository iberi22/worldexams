/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      'edge-mesh': fileURLToPath(new URL('./saberparatodos/src/lib/ai/__mocks__/edge-mesh-stub.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'saberparatodos/src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'apps/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.astro', 'tests/e2e/**'],
  },
});
