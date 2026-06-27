import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _storageKey = 'theme';

  public readonly darkMode = signal(false);

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const stored = localStorage.getItem(this._storageKey);
      if (stored === 'dark') {
        this.darkMode.set(true);
      } else if (stored === 'light') {
        this.darkMode.set(false);
      } else {
        this.darkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }

      effect(() => {
        const isDark = this.darkMode();
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem(this._storageKey, isDark ? 'dark' : 'light');
      });
    }
  }

  public toggle(): void {
    this.darkMode.update((v) => !v);
  }
}
