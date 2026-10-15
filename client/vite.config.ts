import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Geliştirme sırasında /api ile başlayan istekler Node.js sunucusuna (5000) gider
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
