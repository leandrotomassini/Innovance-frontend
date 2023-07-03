import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';


@NgModule({
  declarations: [
    ControlPanelLayoutComponent,
    UsersComponent,
    UsersTableComponent,
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ControlPanelModule { }
