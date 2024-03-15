import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  appType: 'spa',
  build: {
    outDir: 'dist',
  },
  plugins: [
    vercel(),
  ],
});
