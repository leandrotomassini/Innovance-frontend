import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubscriptionsLayoutComponent } from './pages/subscriptions-layout/subscriptions-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
