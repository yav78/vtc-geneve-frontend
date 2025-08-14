import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { PwaService } from './core/services/pwa.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vtc-app';
  updateAvailable = signal(false);

  constructor(private readonly pwa: PwaService, private readonly theme: ThemeService) {
    // lier le signal après l'injection
    this.updateAvailable = this.pwa.updateAvailable;
    // init theme on app start
    if (typeof window !== 'undefined') {
      setTimeout(() => this.theme.init());
    }
  }

  reloadWithUpdate() {
    this.pwa.activateUpdateAndReload();
  }
}
