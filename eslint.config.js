import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Ignore patterns
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.astro/**',
      '**/.git/**',
      '**/coverage/**',
      '**/.vscode/**',
      '**/.github/**',
      '**/apps/**',
      '**/saberparatodos/**',
    ],
  },

  // TypeScript files
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.mjs', 'scripts/**/*.js', 'scripts/**/*.mjs', 'tests/**/*.ts', 'tests/**/*.js', 'tests/**/*.mjs'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        browser: true,
        node: true,
        es2022: true,
      },
    },
    rules: {
      // Disable conflicting base rules
      'no-unused-vars': 'off',
      // TypeScript ESLint rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
