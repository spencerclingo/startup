// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:3000', // Also websocket server
        ws: true,
      },
    },
  },
});
