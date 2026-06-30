import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Login } from './features/auth/login';
import { Signup } from './features/auth/signup';
import { Properties } from './features/properties/properties';
import { PropertyDetail } from './features/property-detail/property-detail';
import { Crm } from './features/crm/crm';
import { Terms } from './features/legal/terms';
import { Privacy } from './features/legal/privacy';
import { Contact } from './features/contact/contact';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Landing, data: { animation: 'home' } },
  { path: 'properties', component: Properties, data: { animation: 'properties' } },
  { path: 'properties/:slug', component: PropertyDetail, data: { animation: 'detail' } },
  { path: 'crm', component: Crm, canActivate: [authGuard], data: { animation: 'crm' } },
  { path: 'auth/login', component: Login, data: { animation: 'login' } },
  { path: 'auth/sign-up', component: Signup, data: { animation: 'signup' } },
  { path: 'terms', component: Terms, data: { animation: 'terms' } },
  { path: 'privacy', component: Privacy, data: { animation: 'privacy' } },
  { path: 'contact', component: Contact, data: { animation: 'contact' } },
  { path: '**', redirectTo: '' },
];
