// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api/auth': 'http://localhost:4000',
      '/api/user': 'http://localhost:4000',
      '/api/press-releases': 'http://localhost:4000',
      '/api/certificates': 'http://localhost:4000',
    },
  },
});
