import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import vercel from 'vite-plugin-vercel';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  appType: 'spa',
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {},
    global: {
      window: {
        origin: 'http://localhost:3000',
      },
    },
  },
  plugins: [
    vercel(),
    nodePolyfills(),
    tsconfigPaths(),
    reactRefresh({
      include: '**/*.tsx',
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
