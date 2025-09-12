import { Component, signal } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <!-- Navbar moderne avec vos couleurs teal -->
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-teal-50/90 dark:bg-gray-950/90 border-b border-teal-200/30 dark:border-gray-800/50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo moderne avec vos couleurs -->
          <div class="flex-shrink-0">
            <a routerLink="/home" class="flex items-center group">
              <div class="relative">
                <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span class="text-white font-bold text-lg">V</span>
                </div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
              </div>
              <div class="ml-3 hidden sm:block">
                <div class="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                  VTC GENEVE
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Plateforme de formation</div>
              </div>
            </a>
          </div>

          <!-- Navigation desktop -->
          <div class="hidden md:flex items-center space-x-1">
            <a routerLink="/home" 
               routerLinkActive="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700" 
               class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent group">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Accueil
              </span>
            </a>
            
            <!-- Liens connectés -->
            <ng-container *ngIf="isAuthenticated()">
              <a routerLink="/quiz" 
                 routerLinkActive="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700" 
                 class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Quiz
                </span>
              </a>
              
              <a routerLink="/statistiques" 
                 routerLinkActive="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700" 
                 class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Statistiques
                </span>
              </a>
              
              <a routerLink="/profil" 
                 routerLinkActive="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700" 
                 class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profil
                </span>
              </a>
            </ng-container>
            
            <!-- Liens non connectés -->
            <ng-container *ngIf="!isAuthenticated()">
              <a routerLink="/login" 
                 routerLinkActive="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700" 
                 class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Connexion
                </span>
              </a>
              
              <a routerLink="/register" 
                 class="relative px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  Inscription
                </span>
              </a>
            </ng-container>
          </div>

          <!-- Message de bienvenue pour utilisateur connecté -->
          <div *ngIf="isAuthenticated() && getCurrentUser()()" 
               class="hidden lg:flex items-center px-3 py-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg border border-teal-200 dark:border-teal-700">
            <svg class="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="text-sm font-medium text-teal-700 dark:text-teal-300">
              Bienvenue {{ getCurrentUser()()?.firstName }} {{ getCurrentUser()()?.lastName }}
            </span>
          </div>

          <!-- Boutons d'action -->
          <div class="flex items-center space-x-2">
            <!-- Bouton thème -->
            <button (click)="toggleTheme()" 
                    class="p-2 rounded-lg bg-teal-100 dark:bg-gray-800 text-teal-600 dark:text-gray-300 hover:bg-teal-200 dark:hover:bg-gray-700 transition-all duration-200 group">
              <svg *ngIf="!isDarkMode()" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg *ngIf="isDarkMode()" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>

            <!-- Bouton menu mobile -->
            <button (click)="toggleMobileMenu()" 
                    class="md:hidden p-2 rounded-lg bg-teal-100 dark:bg-gray-800 text-teal-600 dark:text-gray-300 hover:bg-teal-200 dark:hover:bg-gray-700 transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menu mobile -->
      <div *ngIf="mobileMenuOpen()" 
           class="md:hidden absolute top-full left-0 right-0 bg-teal-50/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-teal-200/30 dark:border-gray-800/50 shadow-xl">
        <div class="px-4 py-2 space-y-1">
          <!-- Message de bienvenue mobile -->
          <div *ngIf="isAuthenticated() && getCurrentUser()()" 
               class="flex items-center px-4 py-3 bg-teal-100 dark:bg-teal-900/50 rounded-lg border border-teal-200 dark:border-teal-700 mb-2">
            <svg class="w-5 h-5 mr-3 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="text-sm font-medium text-teal-700 dark:text-teal-300">
              Bienvenue {{ getCurrentUser()()?.firstName }} {{ getCurrentUser()()?.lastName }}
            </span>
          </div>

          <!-- Liens mobile -->
          <a routerLink="/home" (click)="closeMobileMenu()" 
             class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition-all duration-200 group">
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Accueil
          </a>

          <ng-container *ngIf="isAuthenticated()">
            <a routerLink="/quiz" (click)="closeMobileMenu()" 
               class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition-all duration-200 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Quiz
            </a>

            <a routerLink="/statistiques" (click)="closeMobileMenu()" 
               class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition-all duration-200 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Statistiques
            </a>

            <a routerLink="/profil" (click)="closeMobileMenu()" 
               class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition-all duration-200 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Profil
            </a>
          </ng-container>

          <ng-container *ngIf="!isAuthenticated()">
            <a routerLink="/login" (click)="closeMobileMenu()" 
               class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition-all duration-200 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Connexion
            </a>

            <a routerLink="/register" (click)="closeMobileMenu()" 
               class="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-200 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Inscription
            </a>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  mobileMenuOpen = signal(false);

  constructor(
    private readonly theme: ThemeService,
    private readonly authService: AuthService
  ) {}

  isAuthenticated() {
    return this.authService.getIsAuthenticated()();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  isDarkMode() {
    return this.theme.isDark();
  }

  toggleTheme() {
    this.theme.toggle();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
