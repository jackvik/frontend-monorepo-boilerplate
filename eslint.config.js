import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';

const tsParserConfig = (tsconfigPath) => ({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: tsconfigPath,
      tsconfigRootDir: process.cwd(),
      /* global process */
    },
  },
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/dist/**', // ignore all build output
      '**/coverage/**', // if you use test coverage
      '**/.next/**', // Next.js build output
      '**/node_modules/**',
      '**/next-env.d.ts', // ignore next-env.d.ts
      '**/tsup.config.ts', // ignore all tsup.config.ts files
    ],
  },
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    ...tsParserConfig('./apps/web/tsconfig.json'),
    plugins: {
      '@typescript-eslint': tseslint.plugin,
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
  },
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    ...tsParserConfig('./packages/ui/tsconfig.json'),
    plugins: {
      '@typescript-eslint': tseslint.plugin,
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
      '@typescript-eslint': tseslint.plugin,
    },
  },
  prettier,
];
