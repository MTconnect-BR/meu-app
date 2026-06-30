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
const angularApp = new AngularNodeAppEngine();

/**
 * Nonce-based CSP header: generates a unique nonce per request.
 * The nonce is injected into script tags via the response interception below.
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
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
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
