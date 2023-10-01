import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SubscriptionPlan } from 'src/app/interfaces/subscription.interface';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly baseUrl: string = enviroment.baseUrl;

  constructor(private http: HttpClient) { }

  subscriptionsList(): Observable<SubscriptionPlan[]> {
    const url = `${this.baseUrl}/subscription`;
    return this.http.get<SubscriptionPlan[]>(url);
  }
}
