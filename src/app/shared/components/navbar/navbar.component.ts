import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 shadow-sm">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <a routerLink="/home" class="flex items-center gap-2">
            <span class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">VTC Genève</span>
          </a>
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/home" routerLinkActive="text-indigo-600" class="hover:text-indigo-600 transition">Accueil</a>
            <a routerLink="/quiz" routerLinkActive="text-indigo-600" class="hover:text-indigo-600 transition">Quiz</a>
            <a routerLink="/statistiques" routerLinkActive="text-indigo-600" class="hover:text-indigo-600 transition">Statistiques</a>
            <a routerLink="/profil" routerLinkActive="text-indigo-600" class="hover:text-indigo-600 transition">Profil</a>
          </div>
          <button (click)="toggleMenu()" class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <svg class="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div *ngIf="open()" class="md:hidden origin-top animate-[scaleY_200ms_ease-out]" style="transform-origin: top;">
        <div class="space-y-1 px-4 pb-3 pt-2">
          <a (click)="closeMenu()" routerLink="/home" class="block rounded-md px-3 py-2 text-base hover:bg-gray-100">Accueil</a>
          <a (click)="closeMenu()" routerLink="/quiz" class="block rounded-md px-3 py-2 text-base hover:bg-gray-100">Quiz</a>
          <a (click)="closeMenu()" routerLink="/statistiques" class="block rounded-md px-3 py-2 text-base hover:bg-gray-100">Statistiques</a>
          <a (click)="closeMenu()" routerLink="/profil" class="block rounded-md px-3 py-2 text-base hover:bg-gray-100">Profil</a>
        </div>
      </div>
    </nav>
  `,
  styles: `@keyframes scaleY { from { transform: scaleY(0); } to { transform: scaleY(1); } }`
})
export class NavbarComponent {
  open = signal(false);

  toggleMenu() { 
    this.open.update(v => !v); 
  }
  
  closeMenu() { 
    this.open.set(false); 
  }
}
