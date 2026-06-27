import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmToggle } from '@spartan-ng/helm/toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome, lucideMenu, lucideX, lucideChevronDown } from '@ng-icons/lucide';
import { ThemeService } from '../services/theme';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HlmButton, HlmToggle, NgIcon],
  providers: [
    provideIcons({ lucideHome, lucideMenu, lucideX, lucideChevronDown }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly theme = inject(ThemeService);
  public readonly auth = inject(AuthService);
  public readonly mobileMenuOpen = signal(false);

  logout() {
    this.auth.logout();
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}
