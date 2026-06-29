import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Properties } from './pages/properties/properties';
import { PropertyDetail } from './pages/property-detail/property-detail';
import { Crm } from './pages/crm/crm';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import { Contact } from './pages/contact/contact';
import { authGuard } from './guards/auth.guard';

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
