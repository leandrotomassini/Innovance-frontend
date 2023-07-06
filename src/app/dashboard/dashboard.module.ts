import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPagesModule } from './pages/dashboard-pages.module';
import { DashboardComponentsModule } from './components/dashboard-components.module';
import { DashboardsharedModule } from './shared/dashboardshared.module';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardPagesModule,
    DashboardComponentsModule,
    DashboardsharedModule,
    DashboardRoutingModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
