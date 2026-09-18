// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/contact': 'http://localhost:4000',
      '/health': 'http://localhost:4000',
      '/admin': 'http://localhost:4000',
    },
  },
});
