import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' https: data:;
        media-src 'self' https:;
        frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com https://*.vimeo.com;
        connect-src 'self' https: ws: wss:;
        object-src 'none';
        base-uri 'self';
      `.replace(/\s+/g, ' ').trim()
    }
  }
});