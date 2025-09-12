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
    <div class="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <app-navbar></app-navbar>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <!-- Hero Section -->
        <div class="text-center mb-20">
          <!-- Logo moderne -->
          <div class="mb-12 flex justify-center">
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 animate-float">
                <span class="text-white font-bold text-3xl">V</span>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Préparez votre
            <span class="bg-gradient-to-r from-teal-600 via-teal-500 to-green-700 bg-clip-text text-transparent animate-fadeIn">examen VTC</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed text-center" style="margin: 2rem auto 3rem auto !important; text-align: center !important;">
            Maîtrisez les connaissances essentielles pour réussir votre examen de chauffeur de taxi à Genève avec nos quiz interactifs et nos statistiques détaillées.
          </p>
          
          <!-- Boutons pour utilisateur connecté -->
          <div *ngIf="isAuthenticated()" class="flex flex-col sm:flex-row gap-6 justify-center">
            <a routerLink="/quiz" class="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-teal-500 to-green-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Commencer le quiz
              <svg class="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
            <a routerLink="/statistiques" class="group inline-flex items-center justify-center px-10 py-4 border-2 border-teal-300 text-teal-700 dark:text-teal-300 font-semibold rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300 shadow-md hover:shadow-lg">
              Voir les statistiques
              <svg class="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </a>
          </div>
          
          <!-- Boutons pour utilisateur non connecté -->
          <div *ngIf="!isAuthenticated()" class="flex flex-col sm:flex-row gap-6 justify-center">
            <a routerLink="/login" class="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-teal-500 to-green-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Se connecter
              <svg class="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            </a>
            <a routerLink="/register" class="group inline-flex items-center justify-center px-10 py-4 border-2 border-teal-300 text-teal-700 dark:text-teal-300 font-semibold rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300 shadow-md hover:shadow-lg">
              Créer un compte
              <svg class="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-20">
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-teal-200/30 dark:border-teal-700/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Quiz Interactifs</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">100 questions couvrant tous les aspects de l'examen VTC à Genève, avec des explications détaillées et un système de révision intelligent.</p>
          </div>

          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-teal-200/30 dark:border-teal-700/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Statistiques Détaillées</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Suivez vos progrès avec des statistiques précises sur vos performances, vos points d'amélioration et votre évolution dans le temps.</p>
          </div>

          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-teal-200/30 dark:border-teal-700/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Profil Personnalisé</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Gérez votre abonnement et accédez à toutes les fonctionnalités premium pour optimiser votre préparation à l'examen.</p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <div class="bg-gradient-to-r from-teal-500 to-green-600 rounded-3xl p-12 text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Prêt à réussir votre examen VTC ?</h2>
            <p class="text-xl mb-8 text-teal-100">Rejoignez des centaines de candidats qui ont déjà réussi grâce à notre plateforme.</p>
            <a routerLink="/register" class="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Commencer maintenant
              <svg class="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 1s ease-in-out;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated() {
    return this.authService.getIsAuthenticated()();
  }
}
