import { Component, Input } from '@angular/core';

import { SubscriptionPlan } from 'src/app/interfaces/subscription.interface';

@Component({
  selector: 'app-subscriptions-table',
  templateUrl: './subscriptions-table.component.html',
  styleUrls: ['./subscriptions-table.component.css']
})
export class SubscriptionsTableComponent {

  @Input() subscriptionsPlan: SubscriptionPlan[] = [];

  columnLabels: { [key: string]: string } = {
    title: 'Título',
    price: 'Precio',
    description: 'Descripción'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  




}
