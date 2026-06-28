import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideChevronDown, lucideCheck } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';

@Component({
  selector: 'app-landing',
  imports: [Header, RouterLink, NgIcon, ...HlmDropdownMenuImports, ...HlmAccordionImports],
  providers: [
    provideIcons({ lucideSearch, lucideChevronDown, lucideCheck }),
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private readonly router = inject(Router);
  private readonly propertiesService = inject(PropertiesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroOverlay = viewChild<ElementRef<HTMLDivElement>>('heroOverlay');

  private rafId = 0;

  protected readonly searchType = signal<'buy' | 'rent'>('buy');
  protected readonly searchQuery = signal('');
  protected readonly propertyType = signal('all');
  protected readonly featuredProperties = this.propertiesService.forSale.slice(0, 8);

  protected readonly propertyTypes = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'condo', label: 'Condomínio' },
    { value: 'land', label: 'Terreno' },
  ];

  protected readonly selectedPropertyTypeLabel = computed(() =>
    this.propertyTypes.find(t => t.value === this.propertyType())?.label ?? 'Todos os tipos'
  );

  onPropertyTypeSelect(value: string) {
    this.propertyType.set(value);
  }

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

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        if (this.rafId) return;
        this.rafId = requestAnimationFrame(() => {
          this.rafId = 0;
          const overlay = this.heroOverlay()?.nativeElement;
          if (!overlay) return;
          const hero = overlay.parentElement;
          if (!hero) return;
          const heroHeight = hero.offsetHeight;
          const content = hero.nextElementSibling as HTMLElement | null;
          if (!content) return;
          const contentTop = content.getBoundingClientRect().top;
          const overlap = Math.max(0, Math.min(1, 1 - contentTop / heroHeight));
          const opacity = overlap * 0.45;
          overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        if (this.rafId) cancelAnimationFrame(this.rafId);
      });
    });
  }
}
