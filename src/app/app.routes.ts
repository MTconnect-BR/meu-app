import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing').then(m => m.Landing), data: { animation: 'home' } },
  { path: 'properties', loadComponent: () => import('./features/properties/properties').then(m => m.Properties), data: { animation: 'properties' } },
  { path: 'properties/:slug', loadComponent: () => import('./features/property-detail/property-detail').then(m => m.PropertyDetail), data: { animation: 'property-detail' } },
  { path: 'terms', loadComponent: () => import('./features/legal/terms').then(m => m.Terms), data: { animation: 'terms' } },
  { path: 'privacy', loadComponent: () => import('./features/legal/privacy').then(m => m.Privacy), data: { animation: 'privacy' } },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact), data: { animation: 'contact' } },
  { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.Login), data: { animation: 'login' } },
  { path: 'signup', loadComponent: () => import('./features/auth/signup').then(m => m.Signup), data: { animation: 'signup' } },
  { path: 'crm', loadComponent: () => import('./features/crm/crm').then(m => m.Crm), canActivate: [authGuard], data: { animation: 'crm' } },
  { path: '**', redirectTo: '' },
];
