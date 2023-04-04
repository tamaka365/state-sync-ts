import { resolve } from 'path';
import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  server: {
    port: 3030,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: packageJson.name,
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },
});
