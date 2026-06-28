import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'properties', renderMode: RenderMode.Client },
  { path: 'properties/:slug', renderMode: RenderMode.Client },
  { path: 'crm', renderMode: RenderMode.Client },
  { path: 'auth/login', renderMode: RenderMode.Client },
  { path: 'auth/sign-up', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
