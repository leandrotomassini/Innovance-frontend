import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesTableComponent } from './courses-table/courses-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RoutesTableComponent } from './routes-table/routes-table.component';
import { SchoolTableComponent } from './school-table/school-table.component';
import { CourseFormComponent } from './course-form/course-form.component';



@NgModule({
  declarations: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent,
    CourseFormComponent
  ],
  exports: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StudioComponentsModule { }
