import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudioRoutingModule } from './studio-routing.module';
import { StudioLayoutComponent } from './pages/studio-layout/studio-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { SchoolsComponent } from './pages/schools/schools.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    StudioLayoutComponent,
    CoursesComponent,
    SchoolsComponent
  ],
  imports: [
    CommonModule,
    StudioRoutingModule,
    MaterialModule
  ]
})
export class StudioModule { }
