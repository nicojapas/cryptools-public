import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cryptools-public/', // GitHub Pages repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015', // Target older browsers for better compatibility
    rollupOptions: {
      output: {
        format: 'es', // Keep ES modules but target older browsers
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
});
