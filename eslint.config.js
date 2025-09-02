import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';

const tsParserConfig = (tsconfigPath) => ({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: tsconfigPath,
      tsconfigRootDir: process.cwd(),
      /* global process */
    },
  },
});

export default [
  // JS recommended rules (flat config compatible)
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      // add JS plugins here if needed
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'warn',
    },
  },
  // TypeScript recommended rules (flat config compatible)
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './apps/web/tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      '**/dist/**', // ignore all build output
      '**/coverage/**', // if you use test coverage
      '**/.next/**', // Next.js build output
      '**/node_modules/**',
      '**/next-env.d.ts', // ignore next-env.d.ts
      '**/tsup.config.ts', // ignore all tsup.config.ts files
      '**/*.config.{js,mjs,cjs}', // ignore all config files
      '**/prettier.config.*', // ignore prettier config
      '**/eslint.config.*', // ignore eslint config
      '**/Button.test.tsx', // ignore Button.test.tsx
      '**/test.{ts,tsx}', // ignore test files
      '**/tests/e2e/**', // ignore e2e tests
    ],
  },
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    ...tsParserConfig('./apps/web/tsconfig.json'),
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@next/next': next,
    },
    rules: {
      // React best practices
      'react/jsx-uses-react': 'off', // not needed in React 17+
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      globals: {
        React: true,
        test: true,
        expect: true,
      },
    },
  },
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    ...tsParserConfig('./packages/ui/tsconfig.json'),
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      react,
    },
    rules: {
      // UI library specific
      'react/jsx-no-useless-fragment': 'warn',
    },
  },
  {
    files: ['packages/utils/**/*.{ts,tsx}'],
    ...tsParserConfig('./packages/utils/tsconfig.json'),
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
  },
  prettier,
];
