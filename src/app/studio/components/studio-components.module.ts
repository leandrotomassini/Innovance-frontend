import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesTableComponent } from './courses-table/courses-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RoutesTableComponent } from './routes-table/routes-table.component';
import { SchoolTableComponent } from './school-table/school-table.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseLayoutComponent } from './course-layout/course-layout.component';
import { CourseInstructorsComponent } from './course-instructors/course-instructors.component';
import { CourseSectionsComponent } from './course-sections/course-sections.component';



@NgModule({
  declarations: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent,
    CourseFormComponent,
    CourseLayoutComponent,
    CourseInstructorsComponent,
    CourseSectionsComponent,
  ],
  exports: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent,
    CourseFormComponent
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
