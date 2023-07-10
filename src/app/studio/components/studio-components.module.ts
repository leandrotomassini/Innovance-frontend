import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesTableComponent } from './courses-table/courses-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RoutesTableComponent } from './routes-table/routes-table.component';
import { SchoolTableComponent } from './school-table/school-table.component';



@NgModule({
  declarations: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent
  ],
  exports: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class StudioComponentsModule { }
