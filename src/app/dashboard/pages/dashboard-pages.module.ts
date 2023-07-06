import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material/material.module';

import { DashboardComponentsModule } from '../components/dashboard-components.module';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SearchComponent,
    DashboardComponent
  ],
  exports: [
    DashboardLayoutComponent,
    SearchComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DashboardComponentsModule
  ]
})
export class DashboardPagesModule { }
