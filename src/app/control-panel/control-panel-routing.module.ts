import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ControlPanelLayoutComponent,
    children: [
      {
        path: 'usuarios',
        component: UsersComponent
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
