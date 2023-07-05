import { User } from '../auth/interfaces';

export interface SubscriptionPlan {
  isSubscription: string;
  title:          string;
  description:    string;
  price:          number;
  status:         boolean;
  duration:       number;
  updatedAt:      Date;
  user:           User;
}
