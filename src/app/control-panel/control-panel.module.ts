import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelComponentsModule } from './components/control-panel-components.module';
import { PagesControlPanelModule } from './pages/pages-control-panel.module';


@NgModule({
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    MaterialModule,
    ControlPanelComponentsModule,
    PagesControlPanelModule
  ]
})
export class ControlPanelModule { }
