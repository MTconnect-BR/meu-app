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

  // Intercept response to inject nonce into <script> tags
  const _originalWrite = res.write;
  const _originalEnd = res.end;

  function addNonce(data: unknown): unknown {
    if (typeof data === 'string') {
      return data.replace(/<script(?![^>]*nonce=)/g, `<script nonce="${nonce}"`);
    }
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.write = function (...args: any[]) {
    args[0] = addNonce(args[0]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_originalWrite as any).apply(res, args);
  } as typeof res.write;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.end = function (...args: any[]) {
    args[0] = addNonce(args[0]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_originalEnd as any).apply(res, args);
  } as typeof res.end;

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
