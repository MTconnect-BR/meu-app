import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import crypto from 'node:crypto';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'],
});

/**
 * Nonce-based CSP header: generates a unique nonce per request.
 * The nonce is injected into all <script> tags in the SSR HTML below.
 */
app.use((_req, res, next) => {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (_req as any).nonce = nonce;

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
    'upgrade-insecure-requests',
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

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
 * Injects the per-request nonce into every <script> tag for CSP compliance.
 */
app.use((req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nonce = (req as any).nonce as string;

  angularApp
    .handle(req)
    .then(async (response) => {
      if (!response) {
        return next();
      }

      const contentType = response.headers.get('content-type') ?? '';

      if (contentType.includes('text/html')) {
        const html = await response.text();
        const safeHtml = html.replace(
          /<script(?=[\s>])/g,
          `<script nonce="${nonce}"`,
        );
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.send(safeHtml);
      } else {
        writeResponseToNodeResponse(response, res);
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
