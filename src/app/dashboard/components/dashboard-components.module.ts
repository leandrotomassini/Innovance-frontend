import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material/material.module';

import { BestCoursesComponent } from './best-courses/best-courses.component';
import { CoursesTakenComponent } from './courses-taken/courses-taken.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { SchoolsComponent } from './schools/schools.component';
import { CourseVideoSeeComponent } from './course-video-see/course-video-see.component';



@NgModule({
  declarations: [
    CoursesTakenComponent,
    MyRoutesComponent,
    BestCoursesComponent,
    SchoolsComponent,
    CourseVideoSeeComponent,
  ],
  exports:[
    CoursesTakenComponent,
    MyRoutesComponent,
    BestCoursesComponent,
    SchoolsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class DashboardComponentsModule { }
