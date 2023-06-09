import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';

const routes: Routes = [
  {
    path: '',
    component: ControlPanelLayoutComponent,
    children: [
      {
        path: 'usuarios',
        component: UsersComponent
      },
      {
        path: 'instructores',
        component: InstructorsComponent
      },
      {
        path: 'subscripciones',
        component: SubscriptionsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule { }
