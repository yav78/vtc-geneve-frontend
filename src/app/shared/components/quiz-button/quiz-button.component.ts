import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-button.component.html',
  styleUrl: './quiz-button.component.scss'
})
export class QuizButtonComponent {
  @Input() sessionId: string = '';
  @Input() hasProgress: boolean = false;
  @Input() buttonType: 'start' | 'resume' | 'restart' = 'start';
  @Output() buttonClick = new EventEmitter<string>();

  // Signal local pour gérer le chargement individuel de chaque bouton
  isLoading = signal(false);

  onButtonClick() {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    this.buttonClick.emit(this.sessionId);
  }

  // Méthode publique pour arrêter le chargement (appelée par le parent)
  stopLoading() {
    this.isLoading.set(false);
  }

  getButtonText(): string {
    if (this.isLoading()) {
      return 'Chargement...';
    }

    switch (this.buttonType) {
      case 'start':
        return 'Commencer ce quiz';
      case 'resume':
        return 'Reprendre le quiz';
      case 'restart':
        return 'Recommencer depuis le début';
      default:
        return 'Commencer ce quiz';
    }
  }

  getButtonClasses(): string {
    const baseClasses = 'relative group-btn w-full px-4 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
    
    switch (this.buttonType) {
      case 'start':
        return `${baseClasses} bg-gradient-to-r from-teal-500 to-green-500 text-white`;
      case 'resume':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-500 text-white`;
      case 'restart':
        return `${baseClasses} bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm py-2`;
      default:
        return `${baseClasses} bg-gradient-to-r from-teal-500 to-green-500 text-white`;
    }
  }

  getHoverClasses(): string {
    switch (this.buttonType) {
      case 'start':
        return 'bg-gradient-to-r from-teal-600 to-green-600';
      case 'resume':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600';
      case 'restart':
        return 'bg-gradient-to-r from-gray-600 to-gray-700';
      default:
        return 'bg-gradient-to-r from-teal-600 to-green-600';
    }
  }

  getIconSvg(): string {
    if (this.isLoading()) {
      return `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>`;
    }

    switch (this.buttonType) {
      case 'start':
        return `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`;
      case 'resume':
        return `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>`;
      case 'restart':
        return `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>`;
      default:
        return `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`;
    }
  }
}
