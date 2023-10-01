import { Component, inject, OnInit } from '@angular/core';

import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionPlan } from 'src/app/interfaces/subscription.interface';



@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  private subscriptionService: SubscriptionService = inject(SubscriptionService);
  subscriptionsPlan: SubscriptionPlan[] = [];

  ngOnInit(): void {
    this.subscriptionService.subscriptionsList()
      .subscribe({
        next: (subscriptionsPlan) => this.subscriptionsPlan = subscriptionsPlan,
        error: (error) => console.error(error)
      });
  }



}
