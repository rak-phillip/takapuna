import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        sideBar: resolve(__dirname, 'src/pages/side-bar.ts')
      },
      output: {
        name: 'takapuna-webview',
        sourcemap: false,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: (id) => {
          if (id.includes('pages')) {
            return id.split('pages/')[1].replace('.vue', '');
          }
        }
      },
    },
    outDir: '../out/dist-takapuna-webview'
  }
});
