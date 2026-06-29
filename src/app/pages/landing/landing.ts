import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideCheck, lucideChevronUp } from '@ng-icons/lucide';
import { PropertiesService } from '../../services/properties';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
  selector: 'app-landing',
  imports: [Header, RouterLink, NgIcon, ...HlmTooltipImports],
  providers: [
    provideIcons({ lucideSearch, lucideCheck, lucideChevronUp }),
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
  protected readonly filterOpen = signal(false);

  protected readonly companies = [
    { name: 'Google', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google.svg' },
    { name: 'Microsoft', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/microsoft.svg' },
    { name: 'Apple', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/apple.svg' },
    { name: 'Netflix', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/netflix.svg' },
    { name: 'Spotify', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/spotify.svg' },
    { name: 'Airbnb', logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/airbnb.svg' },
  ];

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

  protected readonly faqs = [
    {
      question: 'Como funciona a busca de imóveis no MeuApp?',
      answer: 'Utilize os filtros na página de imóveis para refinar por localização, tipo, faixa de preço e finalidade (compra ou aluguel). Os resultados são atualizados em tempo real.',
    },
    {
      question: 'Os imóveis têm informações verificadas?',
      answer: 'Sim. Cada anúncio passa por verificação para garantir que metragem, valores e condições do imóvel estejam precisos e atualizados.',
    },
    {
      question: 'Posso salvar imóveis favoritos?',
      answer: 'Sim. Ao criar uma conta, você pode salvar imóveis favoritos e acessá-los a qualquer momento pelo seu perfil.',
    },
    {
      question: 'Como entro em contato com o proprietário?',
      answer: 'Na página de detalhes do imóvel, utilize o botão de contato para enviar uma mensagem diretamente ao proprietário ou corretor responsável.',
    },
    {
      question: 'O MeuApp cobra alguma taxa?',
      answer: 'Não. A busca e visualização de imóveis no MeuApp são completamente gratuitas. Taxas só são aplicadas em serviços adicionais, quando aplicável.',
    },
  ];

  onPropertyTypeSelect(value: string) {
    this.propertyType.set(value);
    this.filterOpen.set(false);
  }

  toggleFilter() {
    this.filterOpen.update(v => !v);
  }

  closeFilter() {
    this.filterOpen.set(false);
  }

  formatPrice(property: { price: number; type: string }): string {
    return this.propertiesService.formatPrice(property.price, property.type as 'sale' | 'rent');
  }

  onSearch() {
    this.router.navigate(['/properties'], {
      queryParams: {
        type: this.searchType(),
        q: this.searchQuery() || undefined,
        propertyType: this.propertyType() !== 'all' ? this.propertyType() : undefined,
      },
    });
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
