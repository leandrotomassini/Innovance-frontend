import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsLayoutComponent } from './pages/subscriptions-layout/subscriptions-layout.component';
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [
    SubscriptionsLayoutComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
