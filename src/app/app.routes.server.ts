import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'properties', renderMode: RenderMode.Server },
  { path: 'properties/:slug', renderMode: RenderMode.Server },
  { path: 'crm', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'signup', renderMode: RenderMode.Client },
  { path: 'terms', renderMode: RenderMode.Server },
  { path: 'privacy', renderMode: RenderMode.Server },
  { path: 'contact', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Client },
];
