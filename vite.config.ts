import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  appType: 'spa',
  build: {
    outDir: 'dist',
  },
  plugins: [
    vercel(),
    tsconfigPaths(),
  ],
});
