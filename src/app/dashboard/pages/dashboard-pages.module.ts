import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';

import { MaterialModule } from 'src/app/material/material.module';

import { DashboardComponentsModule } from '../components/dashboard-components.module';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ViewCourseVideoComponent } from './view-course-video/view-course-video.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SearchComponent,
    DashboardComponent,
    ViewCourseVideoComponent
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
    DashboardComponentsModule,
    EditorModule
  ]
})
export class DashboardPagesModule { }
