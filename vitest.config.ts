import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
    },
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@frontend-architect/ui': '/packages/ui/src',
      '@frontend-architect/utils': '/packages/utils/src',
    },
  },
});
