import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideMapPin, lucideBedDouble, lucideBath, lucideCar } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';

@Component({
  selector: 'app-properties',
  imports: [RouterLink, NgIcon, NgOptimizedImage],
  providers: [
    provideIcons({ lucideSearch, lucideMapPin, lucideBedDouble, lucideBath, lucideCar }),
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Properties {
  protected readonly propertiesService = inject(PropertiesService);

  protected readonly displayedProperties = this.propertiesService.filteredProperties;
  protected readonly resultCount = this.displayedProperties.length;

  formatPrice(price: number, type: 'sale' | 'rent'): string {
    return this.propertiesService.formatPrice(price, type);
  }
}
