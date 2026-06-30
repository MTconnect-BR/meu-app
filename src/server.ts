import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import crypto from 'node:crypto';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Nonce-based CSP middleware: generates a unique nonce per request,
 * injects it into <script> tags, and sets a strict CSP header.
 */
app.use((_req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');

  const cspDirectives = [
    "default-src 'none'",
    `script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com https://*.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https://picsum.photos https://*.tile.openstreetmap.org data:",
    "connect-src 'self' https://va.vercel-scripts.com https://*.vercel-scripts.com",
    "font-src 'self' https://fonts.gstatic.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "require-trusted-types-for 'script'",
    'upgrade-insecure-requests',
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

  // Store nonce for use in the Angular handler
  res.locals['nonce'] = nonce;

  next();
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * Intercepts the response body to inject nonces into <script> tags.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(async (response) => {
      if (!response) {
        return next();
      }

      const nonce = res.locals['nonce'] as string;

      if (nonce) {
        // Read the response body, inject nonces, and send
        const body = await response.text();
        const sanitized = body.replace(
          /<script(?![^>]*nonce=)/g,
          `<script nonce="${nonce}"`,
        );
        // Copy status and headers from the original response
        response.headers.forEach((value, key) => {
          if (!res.getHeader(key)) {
            res.setHeader(key, value);
          }
        });
        res.status(response.status).send(sanitized);
      } else {
        // Fallback: stream the response directly
        const { Writable } = await import('node:stream');
        const nodeRes = res;
        const reader = response.body?.getReader();
        if (reader) {
          const writer = new Writable({
            write(chunk, _encoding, callback) {
              nodeRes.write(chunk);
              callback();
            },
          });
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              writer.write(value);
            }
            writer.end(() => nodeRes.end());
          } catch {
            nodeRes.end();
          }
        } else {
          res.end();
        }
      }
    })
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
