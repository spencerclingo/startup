// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:4000', // Also websocket server
        ws: true,
      },
    },
  },
});
