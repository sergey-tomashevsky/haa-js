import { defineConfig } from "vite"

export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      input: {
        app: './src/index.js',
      },
    },
  },
});
