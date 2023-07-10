import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SubscriptionsTableComponent } from './subscriptions-table/subscriptions-table.component';
import { InstructorsTableComponent } from './instructors-table/instructors-table.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';



@NgModule({
  declarations: [
    UsersFormComponent,
    UsersTableComponent,
    SubscriptionsTableComponent,
    InstructorsTableComponent,
    InstructorFormComponent
  ],
  exports: [
    UsersFormComponent,
    UsersTableComponent,
    SubscriptionsTableComponent,
    InstructorsTableComponent,
    InstructorFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ControlPanelComponentsModule { }
