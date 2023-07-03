import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';


@NgModule({
  declarations: [
    ControlPanelLayoutComponent,
    UsersComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    MaterialModule
  ]
})
export class ControlPanelModule { }
