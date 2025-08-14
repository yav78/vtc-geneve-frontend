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
    <nav class="fixed top-0 left-0 right-0 z-50 bg-violetBrand-100 dark:bg-violetBrand-900 flex justify-between items-center px-8 h-16 shadow-sm border-b border-violetBrand-200/20 dark:border-violetBrand-800/30">
      <!-- Logo -->
      <div class="inline-flex">
        <a routerLink="/home" class="flex items-center">
          <div class="hidden md:block bg-white rounded-lg px-4 py-2">
            <svg width="160" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" style="display: block">
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
          <div class="block md:hidden bg-white rounded-lg px-3 py-2">
            <svg width="120" height="36" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" style="display: block">
              <style>
                .text {
                  font-family: 'Arial', sans-serif;
                  font-size: 36px;
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
        </a>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-6">
        <a routerLink="/home" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Accueil</a>
        
        <!-- Liens affichés uniquement si l'utilisateur est connecté -->
        <ng-container *ngIf="isAuthenticated()">
          <a routerLink="/quiz" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Quiz</a>
          <a routerLink="/statistiques" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Statistiques</a>
          <a routerLink="/profil" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Profil</a>
        </ng-container>
        
        <!-- Liens de connexion/inscription affichés si l'utilisateur n'est pas connecté -->
        <ng-container *ngIf="!isAuthenticated()">
          <a routerLink="/login" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Connexion</a>
          <a routerLink="/register" routerLinkActive="text-violetBrand-600 dark:text-violetBrand-400 font-semibold" class="text-violetBrand-700 hover:text-violetBrand-600 dark:text-violetBrand-200 dark:hover:text-violetBrand-400 transition-colors duration-200">Inscription</a>
        </ng-container>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex-initial">
        <button (click)="toggleMenu()" class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 focus:outline-none focus:ring-2 focus:ring-violetBrand-500 transition-colors duration-200">
          <svg class="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="open()" class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-violetBrand-950 rounded-b-2xl border border-violetBrand-200/20 dark:border-violetBrand-800/30 shadow-lg mt-2">
        <div class="space-y-1 px-4 pb-3 pt-2">
          <a (click)="closeMenu()" routerLink="/home" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Accueil</a>
          
          <!-- Liens affichés uniquement si l'utilisateur est connecté -->
          <ng-container *ngIf="isAuthenticated()">
            <a (click)="closeMenu()" routerLink="/quiz" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Quiz</a>
            <a (click)="closeMenu()" routerLink="/statistiques" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Statistiques</a>
            <a (click)="closeMenu()" routerLink="/profil" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Profil</a>
          </ng-container>
          
          <!-- Liens de connexion/inscription affichés si l'utilisateur n'est pas connecté -->
          <ng-container *ngIf="!isAuthenticated()">
            <a (click)="closeMenu()" routerLink="/login" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Connexion</a>
            <a (click)="closeMenu()" routerLink="/register" class="block rounded-md px-3 py-2 text-base text-violetBrand-700 hover:bg-violetBrand-100 dark:text-violetBrand-200 dark:hover:bg-violetBrand-800/50 transition-colors duration-200">Inscription</a>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
  styles: `@keyframes scaleY { from { transform: scaleY(0); } to { transform: scaleY(1); } }`
})
export class NavbarComponent {
  open = signal(false);
  
  constructor(
    private readonly theme: ThemeService,
    private readonly authService: AuthService
  ) {}

  isAuthenticated() {
    return this.authService.getIsAuthenticated()();
  }

  toggleMenu() { 
    this.open.update(v => !v); 
  }
  
  closeMenu() { 
    this.open.set(false); 
  }

  toggleTheme() {
    this.theme.toggle();
  }

  themeIsDark() { 
    return this.theme.isDark(); 
  }
}
