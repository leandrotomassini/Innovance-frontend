import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { SearchComponent } from './pages/search/search.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
