import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideMapPin, lucideBedDouble, lucideBath, lucideCar } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-properties',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({ lucideSearch, lucideMapPin, lucideBedDouble, lucideBath, lucideCar }),
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
})
export class Properties {
  protected readonly propertiesService = inject(PropertiesService);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly displayedProperties = computed(() => {
    return this.propertiesService.filteredProperties;
  });

  protected readonly resultCount = computed(() => this.displayedProperties().length);

  formatPrice(price: number, type: 'sale' | 'rent'): string {
    return this.propertiesService.formatPrice(price, type);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
