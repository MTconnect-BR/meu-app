import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
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
        document.documentElement.classList.add('dark');
      } else if (stored === 'light') {
        this.darkMode.set(false);
        document.documentElement.classList.remove('dark');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkMode.set(true);
        document.documentElement.classList.add('dark');
      }
    }
  }

  public toggle(): void {
    const isDark = !this.darkMode();
    this.darkMode.set(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(this._storageKey, isDark ? 'dark' : 'light');
  }
}
