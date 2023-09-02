/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        "node_modules/*",
        "src/main.tsx",
        "src/__tests__/*",
        "src/__mocks__/*",
      ],
      provider: 'c8'
    }
  },
})
