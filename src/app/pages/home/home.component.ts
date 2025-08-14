import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NavbarComponent],
  template: `
    <div class="min-h-screen bg-violet-radial dark:bg-violet-radial-dark text-violetBrand-900 dark:text-violetBrand-50">
      <app-navbar></app-navbar>

      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <!-- Logo animé -->
          <div class="mb-8 flex justify-center">
            <svg width="320" height="96" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" class="h-20 md:h-24 w-auto">
              <style>
                .text {
                  font-family: 'Arial', sans-serif;
                  font-size: 48px;
                  font-weight: bold;
                  fill: none;
                  stroke: #7c31bf;
                  stroke-width: 2;
                  stroke-dasharray: 500;
                  stroke-dashoffset: 500;
                  animation: draw 2s ease forwards, fillColor 1s ease forwards 2.2s;
                }
                @keyframes draw {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                @keyframes fillColor {
                  to {
                    fill: #7c31bf;
                    stroke: none;
                  }
                }
              </style>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="text">
                VTC - GENEVE
              </text>
            </svg>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Préparez votre
            <span class="text-violetBrand-600 dark:text-violetBrand-400 bg-gradient-to-r from-violetBrand-600 to-violetBrand-500 bg-clip-text text-transparent">examen VTC</span>
          </h1>
          <p class="text-xl text-violetBrand-700 dark:text-violetBrand-200 mb-8 text-center !text-center" style="text-align: center;">
            Maîtrisez les connaissances essentielles pour réussir votre examen de chauffeur de taxi à Genève avec nos quiz interactifs et nos statistiques détaillées.
          </p>
          
          <!-- Boutons pour utilisateur connecté -->
          <div *ngIf="isAuthenticated()" class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/quiz" class="btn-violet-primary inline-flex items-center justify-center px-8 py-3">
              Commencer le quiz
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
            <a routerLink="/statistiques" class="btn-violet-outline inline-flex items-center justify-center px-8 py-3">
              Voir les statistiques
            </a>
          </div>
          
          <!-- Boutons pour utilisateur non connecté -->
          <div *ngIf="!isAuthenticated()" class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/login" class="btn-violet-primary inline-flex items-center justify-center px-8 py-3">
              Se connecter
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            </a>
            <a routerLink="/register" class="btn-violet-outline inline-flex items-center justify-center px-8 py-3">
              Créer un compte
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="glass-violet p-6 rounded-xl">
            <div class="w-12 h-12 bg-violetBrand-100 dark:bg-violetBrand-800 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-violetBrand-600 dark:text-violetBrand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-violetBrand-800 dark:text-violetBrand-100">Quiz Interactifs</h3>
            <p class="text-violetBrand-600 dark:text-violetBrand-300">100 questions couvrant tous les aspects de l'examen VTC à Genève, avec des explications détaillées.</p>
          </div>

          <div class="glass-violet p-6 rounded-xl">
            <div class="w-12 h-12 bg-violetBrand-100 dark:bg-violetBrand-800 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-violetBrand-500 dark:text-violetBrand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-violetBrand-800 dark:text-violetBrand-100">Statistiques Détaillées</h3>
            <p class="text-violetBrand-600 dark:text-violetBrand-300">Suivez vos progrès avec des statistiques précises sur vos performances et vos points d'amélioration.</p>
          </div>

          <div class="glass-violet p-6 rounded-xl">
            <div class="w-12 h-12 bg-violetBrand-100 dark:bg-violetBrand-800 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-violetBrand-500 dark:text-violetBrand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-violetBrand-800 dark:text-violetBrand-100">Profil Personnalisé</h3>
            <p class="text-violetBrand-600 dark:text-violetBrand-300">Gérez votre abonnement et accédez à toutes les fonctionnalités premium pour optimiser votre préparation.</p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="rounded-2xl p-8 text-center text-white bg-violet-gradient-dark relative overflow-hidden">
          <div class="absolute inset-0 bg-violetBrand-800/20 backdrop-blur-sm"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-bold mb-4">Prêt à réussir votre examen VTC ?</h2>
            <p class="text-violetBrand-100 mb-6">Rejoignez des centaines de candidats qui ont déjà réussi grâce à notre plateforme.</p>
            
            <!-- CTA pour utilisateur connecté -->
            <a *ngIf="isAuthenticated()" routerLink="/quiz" class="inline-flex items-center justify-center px-6 py-3 bg-violetBrand-50 text-violetBrand-800 font-medium rounded-lg hover:bg-violetBrand-100 transition-colors shadow-elevated">
              Commencer maintenant
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
            
            <!-- CTA pour utilisateur non connecté -->
            <a *ngIf="!isAuthenticated()" routerLink="/register" class="inline-flex items-center justify-center px-6 py-3 bg-violetBrand-50 text-violetBrand-800 font-medium rounded-lg hover:bg-violetBrand-100 transition-colors shadow-elevated">
              Créer un compte gratuit
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </a>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="mt-16 border-t border-violetBrand-200/20 dark:border-violetBrand-700/30">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-violetBrand-500 dark:text-violetBrand-400">
          <p>&copy; 2024 VTC Genève. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated() {
    return this.authService.getIsAuthenticated()();
  }
}
