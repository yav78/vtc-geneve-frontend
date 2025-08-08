import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SubscriptionPlan, UserSubscription } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private apiService: ApiService) {}

  // Plans d'abonnement
  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.apiService.get<SubscriptionPlan[]>('/subscriptions/plans');
  }

  getSubscriptionPlanById(id: string): Observable<SubscriptionPlan> {
    return this.apiService.get<SubscriptionPlan>(`/subscriptions/plans/${id}`);
  }

  // Abonnements utilisateur
  subscribeToPlan(planId: string): Observable<UserSubscription> {
    return this.apiService.post<UserSubscription>(`/subscriptions/subscribe/${planId}`, {});
  }

  getMySubscription(): Observable<UserSubscription> {
    return this.apiService.get<UserSubscription>('/subscriptions/my-subscription');
  }
}
