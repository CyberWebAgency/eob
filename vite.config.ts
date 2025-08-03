import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    // Ensure SEO files are copied to dist
    copyPublicDir: true,
  },
  // SEO and performance optimizations
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    }
  },
  // Ensure proper base URL for production
  base: '/',
});
