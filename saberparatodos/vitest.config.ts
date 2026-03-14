/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error - Astro's getViteConfig type doesn't include vitest options yet
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**/*.ts', 'src/utils/**/*.ts'],
      exclude: ['src/env.d.ts', 'src/**/*.d.ts'],
      all: true,
    },
  },
});
