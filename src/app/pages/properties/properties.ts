import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideMapPin, lucideBedDouble, lucideBath, lucideCar } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';

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

  protected readonly displayedProperties = this.propertiesService.filteredProperties;
  protected readonly resultCount = this.displayedProperties.length;

  formatPrice(price: number, type: 'sale' | 'rent'): string {
    return this.propertiesService.formatPrice(price, type);
  }
}
