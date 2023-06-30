import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudioLayoutComponent } from './pages/studio-layout/studio-layout.component';

const routes: Routes = [
  {
    path: '',
    component: StudioLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudioRoutingModule { }
