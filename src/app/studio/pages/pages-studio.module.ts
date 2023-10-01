import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';
import { StudioComponentsModule } from '../components/studio-components.module';

import { CoursesComponent } from './courses/courses.component';
import { SchoolsComponent } from './schools/schools.component';
import { RoutesCoursesComponent } from './routes-courses/routes-courses.component';



@NgModule({
  declarations: [
    CoursesComponent,
    SchoolsComponent,
    RoutesCoursesComponent,
  ],
  exports: [
    CoursesComponent,
    SchoolsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudioComponentsModule,
  ]
})
export class PagesStudioModule { }
