import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CoursesTableComponent } from './courses-table/courses-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RoutesTableComponent } from './routes-table/routes-table.component';
import { SchoolTableComponent } from './school-table/school-table.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseLayoutComponent } from './course-layout/course-layout.component';
import { CourseInstructorsComponent } from './course-instructors/course-instructors.component';
import { CourseSectionsComponent } from './course-sections/course-sections.component';
import { InstructorsCourseListAddComponent } from './instructors-course-list-add/instructors-course-list-add.component';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { CourseVideoListComponent } from './course-video-list/course-video-list.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { VideoFormComponent } from './video-form/video-form.component';
import { VideoPreviewService } from '../services';
import { AttachedMaterialFormComponent } from './attached-material-form/attached-material-form.component';

@NgModule({
  declarations: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent,
    CourseFormComponent,
    CourseLayoutComponent,
    CourseInstructorsComponent,
    CourseSectionsComponent,
    InstructorsCourseListAddComponent,
    VideoPreviewComponent,
    CourseVideoListComponent,
    SectionFormComponent,
    VideoFormComponent,
    AttachedMaterialFormComponent,
  ],
  exports: [
    CoursesTableComponent,
    RoutesTableComponent,
    SchoolTableComponent,
    CourseFormComponent,
    EditorModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule
  ],
  providers: [VideoPreviewService]
})
export class StudioComponentsModule { }
