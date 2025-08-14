import { Injectable, signal } from '@angular/core';

const THEME_KEY = 'vtc_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(false);

  init() {
    const stored = localStorage.getItem(THEME_KEY);
    // Par défaut: mode clair (beige/violet)
    const dark = stored ? stored === 'dark' : false;
    this.apply(dark);
  }

  toggle() {
    this.apply(!this.isDark());
  }

  private apply(dark: boolean) {
    this.isDark.set(dark);
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }
}


