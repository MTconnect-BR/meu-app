import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmToggle } from '@spartan-ng/helm/toggle';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../services/theme';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HlmButton, HlmToggle, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly theme = inject(ThemeService);
  public readonly auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
