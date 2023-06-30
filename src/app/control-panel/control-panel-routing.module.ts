import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ControlPanelLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule { }
