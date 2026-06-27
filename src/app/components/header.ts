import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome, lucideX, lucideChevronDown } from '@ng-icons/lucide';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HlmButton, NgIcon],
  providers: [
    provideIcons({ lucideHome, lucideX, lucideChevronDown }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
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
