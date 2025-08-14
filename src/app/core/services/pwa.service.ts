import { ApplicationRef, Injectable, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PwaService {
  private deferredPrompt: any = null;
  updateAvailable = signal(false);

  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    // Écoute des updates SW
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe(() => {
        this.updateAvailable.set(true);
      });
    }

    // Capture de l'événement d'installation
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as any;
    });
  }

  async checkForUpdate(): Promise<void> {
    try {
      if (this.swUpdate.isEnabled) {
        await this.swUpdate.checkForUpdate();
      }
    } catch (_) {}
  }

  async activateUpdateAndReload(): Promise<void> {
    if (!this.swUpdate.isEnabled) return;
    try {
      await this.swUpdate.activateUpdate();
      document.location.reload();
    } catch (_) {}
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;
    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      return outcome === 'accepted';
    } catch (_) {
      return false;
    }
  }
}


