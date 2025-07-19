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
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Manual chunking for better code organization and caching
        manualChunks: {
          // React and core libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // Material-UI components (largest third-party library)
          mui: [
            '@mui/material', 
            '@mui/icons-material', 
            '@mui/system',
            '@emotion/react',
            '@emotion/styled'
          ],
          
          // Web3 and blockchain related
          web3: ['web3'],
          
          // Charts library
          charts: ['lightweight-charts', 'react-ts-tradingview-widgets'],
          
          // Query and state management
          query: ['@tanstack/react-query'],
          
          // Utility libraries
          utils: ['react-cookie', 'react-ga4', 'react-infinite-scroller']
        }
      },
    },
    // Increase chunk size warning limit since we're optimizing
    chunkSizeWarningLimit: 800,
  },
});
