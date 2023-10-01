import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';

import { CourseCardComponent } from './course-card/course-card.component';



@NgModule({
  declarations: [
    CourseCardComponent
  ],
  exports: [
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
})
export class DashboardsharedModule { }
