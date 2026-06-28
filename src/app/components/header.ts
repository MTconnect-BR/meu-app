import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideHome, lucideX } from '@ng-icons/lucide';
import { AuthService } from '../services/auth';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon, ...HlmSheetImports],
  providers: [
    provideIcons({ lucideMenu, lucideHome, lucideX }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
