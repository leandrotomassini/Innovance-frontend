import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelLayoutComponent } from './pages/control-panel-layout/control-panel-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { SubscriptionsTableComponent } from './components/subscriptions-table/subscriptions-table.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { InstructorsTableComponent } from './components/instructors-table/instructors-table.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';


@NgModule({
  declarations: [
    ControlPanelLayoutComponent,
    UsersComponent,
    UsersTableComponent,
    SubscriptionsComponent,
    UsersFormComponent,
    SubscriptionsTableComponent,
    InstructorsComponent,
    InstructorsTableComponent,
    InstructorFormComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ControlPanelModule { }
