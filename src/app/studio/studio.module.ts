import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudioRoutingModule } from './studio-routing.module';
import { MaterialModule } from '../material/material.module';
import { PagesStudioModule } from './pages/pages-studio.module';
import { StudioComponentsModule } from './components/studio-components.module';
import { StudioLayoutComponent } from './pages/studio-layout/studio-layout.component';



@NgModule({
  declarations: [
    StudioLayoutComponent,
  ],
  imports: [
    CommonModule,
    StudioRoutingModule,
    MaterialModule,
    PagesStudioModule,
    StudioComponentsModule
  ]
})
export class StudioModule { }
