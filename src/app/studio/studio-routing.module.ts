import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudioLayoutComponent } from './pages/studio-layout/studio-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { SchoolsComponent } from './pages/schools/schools.component';
import { RoutesCoursesComponent } from './pages/routes-courses/routes-courses.component';

const routes: Routes = [
  {
    path: '',
    component: StudioLayoutComponent,
    children: [
      {
        path: 'cursos',
        component: CoursesComponent
      },
      {
        path: 'escuelas',
        component: SchoolsComponent
      },
      {
        path: 'rutas',
        component: RoutesCoursesComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudioRoutingModule { }
