import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideChevronDown } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';

@Component({
  selector: 'app-landing',
  imports: [Header, RouterLink, NgIcon],
  providers: [
    provideIcons({ lucideSearch, lucideChevronDown }),
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private readonly router = inject(Router);
  private readonly propertiesService = inject(PropertiesService);

  protected readonly searchType = signal<'buy' | 'rent'>('buy');
  protected readonly searchQuery = signal('');
  protected readonly propertyType = signal('all');
  protected readonly featuredProperties = this.propertiesService.forSale.slice(0, 8);

  formatPrice(property: { price: number; type: string }): string {
    return this.propertiesService.formatPrice(property.price, property.type as 'sale' | 'rent');
  }

  onSearch() {
    const params: Record<string, string> = {
      type: this.searchType(),
    };
    const q = this.searchQuery().trim();
    if (q) {
      params['q'] = q;
    }
    const pt = this.propertyType();
    if (pt !== 'all') {
      params['propertyType'] = pt;
    }
    this.router.navigate(['/properties'], { queryParams: params });
  }
}
