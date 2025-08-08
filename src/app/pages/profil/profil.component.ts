import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SubscriptionService } from '../../core/services/subscription.service';
import { UserSubscription, SubscriptionPlan } from '../../core/models/api.models';

interface SubscriptionState {
  status: 'none' | 'trial' | 'active' | 'expired';
  expiresAt?: Date;
  plan?: SubscriptionPlan;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, DatePipe],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  state = signal<SubscriptionState>({ status: 'none' });
  isLoading = signal(false);
  plans: SubscriptionPlan[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly subscription: SubscriptionService
  ) {}

  ngOnInit() {
    this.loadSubscriptionState();
    this.loadSubscriptionPlans();
  }

  private loadSubscriptionState() {
    this.isLoading.set(true);
    this.subscription.getMySubscription().subscribe({
      next: (subscription) => {
        if (subscription) {
          const endDate = new Date(subscription.endDate);
          const now = new Date();
          const status = endDate > now ? 'active' : 'expired';
          
          this.state.set({
            status,
            expiresAt: endDate,
            plan: subscription.plan
          });
        } else {
          this.state.set({ status: 'none' });
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'abonnement:', error);
        this.state.set({ status: 'none' });
        this.isLoading.set(false);
      }
    });
  }

  private loadSubscriptionPlans() {
    this.subscription.getSubscriptionPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des plans:', error);
      }
    });
  }

  startTrial() {
    // Pour l'instant, on simule un essai
    // En production, vous devriez appeler l'API pour créer un essai
    const trialEndDate = new Date();
    trialEndDate.setHours(trialEndDate.getHours() + 24); // 24h d'essai
    
    this.state.set({
      status: 'trial',
      expiresAt: trialEndDate
    });
    
    console.log('Essai démarré');
  }

  activateAnnual() {
    // Pour l'instant, on simule l'activation
    // En production, vous devriez appeler l'API pour souscrire
    const annualEndDate = new Date();
    annualEndDate.setFullYear(annualEndDate.getFullYear() + 1);
    
    this.state.set({
      status: 'active',
      expiresAt: annualEndDate
    });
    
    console.log('Abonnement annuel activé');
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }
}
