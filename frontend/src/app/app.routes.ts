import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Notification } from './pages/notification/notification';
import { MyTasks } from './pages/my-tasks/my-tasks';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './common/guards/auth.guard';
import { guestGuard } from './common/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => Home,
  },
  {
    path: 'login',
    loadComponent: () => Login,
    // canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => Register,
    // canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => Dashboard,
    // canActivate: [authGuard],
  },
  {
    path: 'notification',
    loadComponent: () => Notification,
    // canActivate: [authGuard],
  },
  {
    path: 'my-tasks',
    loadComponent: () => MyTasks,
    // canActivate: [authGuard],
  },
  {
    path: 'account',
    loadComponent: () => Register,
  },
  {
    path: 'settings',
    loadComponent: () => Login,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
