import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Properties } from './pages/properties/properties';
import { PropertyDetail } from './pages/property-detail/property-detail';
import { Crm } from './pages/crm/crm';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'properties', component: Properties },
  { path: 'properties/:slug', component: PropertyDetail },
  { path: 'crm', component: Crm },
  { path: 'auth/login', component: Login },
  { path: 'auth/sign-up', component: Signup },
  { path: '**', redirectTo: '' },
];
