import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Properties } from './pages/properties/properties';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'properties', component: Properties },
  { path: 'auth/login', component: Login },
  { path: 'auth/sign-up', component: Signup },
  { path: '**', redirectTo: '' },
];
