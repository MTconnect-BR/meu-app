import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  HostListener,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { PropertiesService } from '../../core/services/properties';

@Component({
  selector: 'app-properties',
  imports: [RouterLink, NgIcon, NgOptimizedImage],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Properties implements OnInit {
  protected readonly propertiesService = inject(PropertiesService);
  private readonly route = inject(ActivatedRoute);

  protected readonly filteredProperties = this.propertiesService.filteredProperties;
  protected readonly resultCount = computed(() => this.filteredProperties().length);

  protected readonly propertyTypes = [
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'condo', label: 'Condomínio' },
    { value: 'land', label: 'Terreno' },
  ];

  protected readonly amenityTypes = [
    { value: 'furnished', label: 'Mobiliado' },
    { value: 'petFriendly', label: 'Aceita pets' },
    { value: 'parking', label: 'Vaga de garagem' },
  ];

  protected readonly activeFilterCount = this.propertiesService.activeFilterCount;
  protected readonly filterMenuOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-filter-menu]')) {
      this.filterMenuOpen.set(false);
    }
  }

  toggleFilterMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.filterMenuOpen.update((v) => !v);
  }

  toggleType(value: string) {
    this.propertiesService.selectedTypes.update((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  toggleAmenity(value: string) {
    this.propertiesService.selectedAmenities.update((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  isTypeSelected(value: string): boolean {
    return this.propertiesService.selectedTypes().includes(value);
  }

  isAmenitySelected(value: string): boolean {
    return this.propertiesService.selectedAmenities().includes(value);
  }

  toggleStatus(value: 'all' | 'sale' | 'rent') {
    this.propertiesService.propertyType.set(value);
  }

  formatPrice(price: number, type: 'sale' | 'rent'): string {
    return this.propertiesService.formatPrice(price, type);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['types']) {
        this.propertiesService.selectedTypes.set(params['types'].split(','));
      }
      if (params['amenities']) {
        this.propertiesService.selectedAmenities.set(params['amenities'].split(','));
      }
      if (params['type']) {
        this.propertiesService.propertyType.set(params['type']);
      }
      if (params['q']) {
        this.propertiesService.searchQuery.set(params['q']);
      }
    });
  }
}
