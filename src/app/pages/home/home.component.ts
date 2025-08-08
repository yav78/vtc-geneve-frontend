import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <app-navbar></app-navbar>
      
      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Préparez votre
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              examen VTC
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Maîtrisez les connaissances essentielles pour réussir votre examen de chauffeur de taxi à Genève avec nos quiz interactifs et nos statistiques détaillées.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/quiz" class="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              Commencer le quiz
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
            <a routerLink="/statistiques" class="inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-medium rounded-lg transition-colors">
              Voir les statistiques
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Quiz Interactifs</h3>
            <p class="text-gray-600">100 questions couvrant tous les aspects de l'examen VTC à Genève, avec des explications détaillées.</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Statistiques Détaillées</h3>
            <p class="text-gray-600">Suivez vos progrès avec des statistiques précises sur vos performances et vos points d'amélioration.</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Profil Personnalisé</h3>
            <p class="text-gray-600">Gérez votre abonnement et accédez à toutes les fonctionnalités premium pour optimiser votre préparation.</p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 class="text-2xl font-bold mb-4">Prêt à réussir votre examen VTC ?</h2>
          <p class="text-indigo-100 mb-6">Rejoignez des centaines de candidats qui ont déjà réussi grâce à notre plateforme.</p>
          <a routerLink="/quiz" class="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Commencer maintenant
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-50 border-t border-gray-200 mt-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center text-gray-600">
            <p>&copy; 2024 VTC Genève. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
