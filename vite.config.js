import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/',
  
  plugins: [
    injectHTML(),
    FullReload(['*.html', '*.js', '*.scss']),
  ],
  
  server: {
    open: false,
    port: 3000,
  },
  
  build: {
    outDir: 'dist',
    rollupOptions: {
    },
  },
});
