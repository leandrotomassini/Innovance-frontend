import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isAdminGuard, isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'control-panel',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./control-panel/control-panel.module').then(m => m.ControlPanelModule)
  },
  {
    path: 'studio',
    loadChildren: () => import('./studio/studio.module').then(m => m.StudioModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
