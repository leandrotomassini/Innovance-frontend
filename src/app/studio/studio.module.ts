import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudioRoutingModule } from './studio-routing.module';
import { StudioLayoutComponent } from './pages/studio-layout/studio-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { SchoolsComponent } from './pages/schools/schools.component';


@NgModule({
  declarations: [
    StudioLayoutComponent,
    CoursesComponent,
    SchoolsComponent
  ],
  imports: [
    CommonModule,
    StudioRoutingModule
  ]
})
export class StudioModule { }
