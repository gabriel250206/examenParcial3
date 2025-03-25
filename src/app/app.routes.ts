import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    loadComponent: () => import('./lista/lista.page').then( m => m.ListaPage)
  },  {
    path: 'password-reset',
    loadComponent: () => import('./password-reset/password-reset.page').then( m => m.PasswordResetPage)
  },

];
