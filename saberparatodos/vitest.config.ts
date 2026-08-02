/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => {
  // Load Astro-style PUBLIC_* vars from .env so import.meta.env works in unit tests
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: {
        'edge-mesh': fileURLToPath(new URL('./src/lib/ai/__mocks__/edge-mesh-stub.ts', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      env: env,
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/lib/**/*.ts', 'src/utils/**/*.ts'],
        exclude: ['src/env.d.ts', 'src/**/*.d.ts'],
      },
    },
  };
});
