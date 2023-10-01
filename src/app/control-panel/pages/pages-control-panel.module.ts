import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material/material.module';

import { ControlPanelLayoutComponent } from './control-panel-layout/control-panel-layout.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { UsersComponent } from './users/users.component';
import { ControlPanelComponentsModule } from '../components/control-panel-components.module';



@NgModule({
  declarations: [
    ControlPanelLayoutComponent,
    UsersComponent,
    SubscriptionsComponent,
    InstructorsComponent,
  ],
  exports: [
    ControlPanelLayoutComponent,
    UsersComponent,
    SubscriptionsComponent,
    InstructorsComponent,
  ],
  imports: [
    CommonModule,
    ControlPanelComponentsModule,
    MaterialModule,
    RouterModule
  ]
})
export class PagesControlPanelModule { }
