import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideHome, lucideX } from '@ng-icons/lucide';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({ lucideMenu, lucideHome, lucideX }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly auth = inject(AuthService);
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
  }
}
