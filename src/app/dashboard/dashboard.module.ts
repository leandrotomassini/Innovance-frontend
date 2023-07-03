import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { SearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SearchComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
