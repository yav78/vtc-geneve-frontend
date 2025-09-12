import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SubscriptionService } from '../../core/services/subscription.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, DatePipe } from '@angular/common';

interface SubscriptionState {
  status: 'none' | 'trial' | 'active' | 'expired';
  expiresAt: Date | null;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, DatePipe],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  isLoading = signal(false);
  state = signal<SubscriptionState>({ status: 'none', expiresAt: null });
  plans = [
    { name: 'Premium', description: 'Accès complet', price: 349 }
  ];

  // Modal de paiement
  showPaymentModal = signal(false);
  selectedPaymentMethod = signal('card');

  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {
    this.loadUserData();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  async loadUserData() {
    this.isLoading.set(true);
    try {
      const user = this.getCurrentUser()();
      if (user !== null) {
        // Charger les données d'abonnement
        this.subscriptionService.getMySubscription().subscribe({
          next: (subscription) => {
            if (subscription) {
              const endDate = new Date(subscription.endDate);
              const now = new Date();
              const status = endDate > now ? 'active' : 'expired';
              
              this.state.set({
                status,
                expiresAt: endDate
              });
            } else {
              this.state.set({ status: 'none', expiresAt: null });
            }
          },
          error: (error) => {
            console.error('Erreur lors du chargement de l\'abonnement:', error);
            this.state.set({ status: 'none', expiresAt: null });
          }
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async startTrial() {
    try {
      // Simulation d'un essai - à remplacer par l'API réelle
      const trialEndDate = new Date();
      trialEndDate.setHours(trialEndDate.getHours() + 24); // 24h d'essai
      
      this.state.set({
        status: 'trial',
        expiresAt: trialEndDate
      });
      
      console.log('Essai démarré');
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'essai:', error);
    }
  }

  async activateAnnual() {
    // Cette méthode est maintenant remplacée par openPaymentModal()
    this.openPaymentModal();
  }

  // Méthodes pour le modal de paiement
  openPaymentModal() {
    this.showPaymentModal.set(true);
  }

  closePaymentModal() {
    this.showPaymentModal.set(false);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod.set(method);
  }

  async processPayment() {
    const method = this.selectedPaymentMethod();

    try {
      switch (method) {
        case 'card':
          await this.processCardPayment();
          break;
        case 'paypal':
          await this.processPayPalPayment();
          break;
        case 'twint':
          await this.processTWINTPayment();
          break;
        case 'applepay':
          await this.processApplePayPayment();
          break;
        case 'googlepay':
          await this.processGooglePayPayment();
          break;
        default:
          throw new Error('Méthode de paiement non supportée');
      }

      // Si le paiement réussit
      const annualEndDate = new Date();
      annualEndDate.setFullYear(annualEndDate.getFullYear() + 1);
      
      this.state.set({
        status: 'active',
        expiresAt: annualEndDate
      });
      
      await this.loadUserData();
      this.closePaymentModal();

    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      // Ici vous pouvez afficher un message d'erreur à l'utilisateur
    }
  }

  // Méthodes spécifiques pour chaque moyen de paiement
  private async processCardPayment() {
    // Intégration avec Stripe ou autre processeur de paiement
    console.log('Traitement du paiement par carte...');
    // Exemple avec Stripe:
    // const stripe = Stripe('votre_clé_publique');
    // const { error } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: { card: cardElement }
    // });
  }

  private async processPayPalPayment() {
    // Intégration avec PayPal
    console.log('Traitement du paiement PayPal...');
    // Redirection vers PayPal ou intégration PayPal SDK
  }

  private async processTWINTPayment() {
    // Intégration avec TWINT
    console.log('Traitement du paiement TWINT...');
    // Intégration TWINT API
  }

  private async processApplePayPayment() {
    // Intégration avec Apple Pay
    console.log('Traitement du paiement Apple Pay...');
    // Vérification de la disponibilité et intégration Apple Pay
  }

  private async processGooglePayPayment() {
    // Intégration avec Google Pay
    console.log('Traitement du paiement Google Pay...');
    // Intégration Google Pay API
  }
}
