import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      react: 'src/chat-widget/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: {
      compilerOptions: {
        incremental: false,
      },
    },
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom'],
    outDir: 'dist',
  },
  {
    entry: {
      widget: 'src/chat-widget/_scripts/widget.ts',
    },
    format: ['iife'],
    platform: 'browser',
    clean: false,
    sourcemap: true,
    outExtension() {
      return {
        js: '.js',
      }
    },
    outDir: 'dist',
  },
])
