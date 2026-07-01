import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { PropertiesService } from '../../core/services/properties';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    NgIcon,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly router = inject(Router);
  private readonly propertiesService = inject(PropertiesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroOverlay = viewChild<ElementRef<HTMLDivElement>>('heroOverlay');

  private rafId = 0;

  protected readonly searchType = signal<'buy' | 'rent'>('buy');
  protected readonly searchQuery = signal('');
  protected readonly faqOpen = signal(false);
  protected readonly expandedFaq = signal(-1);
  protected readonly filterOpen = signal(false);

  protected readonly tempSelectedTypes = signal<string[]>([]);
  protected readonly tempSelectedAmenities = signal<string[]>([]);

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

  protected readonly activeFilterCount = computed(() => {
    return this.tempSelectedTypes().length + this.tempSelectedAmenities().length;
  });

  protected readonly activeFilterLabel = computed(() => {
    const count = this.activeFilterCount();
    if (count === 0) return 'Filtros';
    return `Filtros (${count})`;
  });

  protected readonly companies = [
    { name: 'Google', logo: 'logos/google.svg' },
    { name: 'Microsoft', logo: 'logos/microsoft.svg' },
    { name: 'Apple', logo: 'logos/apple.svg' },
    { name: 'Netflix', logo: 'logos/netflix.svg' },
    { name: 'Spotify', logo: 'logos/spotify.svg' },
    { name: 'Airbnb', logo: 'logos/airbnb.svg' },
  ];

  protected readonly faqs = [
    {
      question: 'Como funciona a busca de imóveis no MeuApp?',
      answer:
        'Utilize os filtros na página de imóveis para refinar por localização, tipo, faixa de preço e finalidade (compra ou aluguel). Os resultados são atualizados em tempo real.',
    },
    {
      question: 'Os imóveis têm informações verificadas?',
      answer:
        'Sim. Cada anúncio passa por verificação para garantir que metragem, valores e condições do imóvel estejam precisos e atualizados.',
    },
    {
      question: 'Posso salvar imóveis favoritos?',
      answer:
        'Sim. Ao criar uma conta, você pode salvar imóveis favoritos e acessá-los a qualquer momento pelo seu perfil.',
    },
    {
      question: 'Como entro em contato com o proprietário?',
      answer:
        'Na página de detalhes do imóvel, utilize o botão de contato para enviar uma mensagem diretamente ao proprietário ou corretor responsável.',
    },
    {
      question: 'O MeuApp cobra alguma taxa?',
      answer:
        'Não. A busca e visualização de imóveis no MeuApp são completamente gratuitas. Taxas só são aplicadas em serviços adicionais, quando aplicável.',
    },
  ];

  toggleType(value: string) {
    this.tempSelectedTypes.update((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  toggleAmenity(value: string) {
    this.tempSelectedAmenities.update((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  isTypeSelected(value: string): boolean {
    return this.tempSelectedTypes().includes(value);
  }

  isAmenitySelected(value: string): boolean {
    return this.tempSelectedAmenities().includes(value);
  }

  applyFilters() {
    this.propertiesService.selectedTypes.set([...this.tempSelectedTypes()]);
    this.propertiesService.selectedAmenities.set([...this.tempSelectedAmenities()]);
    this.router.navigate(['/properties'], {
      queryParams: {
        type: this.searchType() !== 'buy' ? this.searchType() : undefined,
        q: this.searchQuery() || undefined,
        types: this.tempSelectedTypes().length > 0 ? this.tempSelectedTypes().join(',') : undefined,
        amenities:
          this.tempSelectedAmenities().length > 0
            ? this.tempSelectedAmenities().join(',')
            : undefined,
      },
    });
  }

  onSearch() {
    this.applyFilters();
  }

  toggleFaq() {
    this.faqOpen.update((v) => !v);
  }

  toggleFilter() {
    this.filterOpen.update((v) => !v);
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
