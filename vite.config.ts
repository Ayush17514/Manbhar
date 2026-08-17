import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function serveStaticFolders(): Plugin {
  return {
    name: 'serve-uploads-and-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/uploads') || req.url.startsWith('/assets'))) {
          const rawUrl = req.url.split('?')[0];
          const decodedPath = decodeURIComponent(rawUrl);
          const filePath = path.join(process.cwd(), decodedPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeMap: Record<string, string> = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.jpe': 'image/jpeg',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.css': 'text/css',
              '.js': 'application/javascript',
              '.ico': 'image/x-icon',
            };
            res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    },
    closeBundle() {
      // Copy uploads & assets to dist on build
      const distDir = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        const copyDir = (src: string, dest: string) => {
          if (!fs.existsSync(src)) return;
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          const entries = fs.readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
              copyDir(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        };
        copyDir(path.join(process.cwd(), 'uploads'), path.join(distDir, 'uploads'));
        copyDir(path.join(process.cwd(), 'assets'), path.join(distDir, 'assets'));
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), serveStaticFolders()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  }
});
