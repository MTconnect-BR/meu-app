import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { PropertiesService, Property } from '../../services/properties';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmCarousel, HlmCarouselContent, HlmCarouselItem, HlmCarouselNext, HlmCarouselPrevious } from '@spartan-ng/helm/carousel';
import { NgIcon } from '@ng-icons/core';
import { HlmH1, HlmH2, HlmP } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-property-detail',
  imports: [
    RouterLink,
    Header,
    Footer,
    HlmCard,
    HlmCardContent,
    HlmButton,
    HlmBadge,
    HlmSeparator,
    HlmCarousel,
    HlmCarouselContent,
    HlmCarouselItem,
    HlmCarouselNext,
    HlmCarouselPrevious,
    NgIcon,
    HlmH1,
    HlmH2,
    HlmP,
  ],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
})
export class PropertyDetail implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _propertiesService = inject(PropertiesService);
  protected readonly propertiesService = this._propertiesService;

  protected readonly property = signal<Property | undefined>(undefined);
  protected readonly selectedImage = signal(0);
  protected readonly similarProperties = computed(() => {
    const p = this.property();
    return p ? this._propertiesService.getSimilar(p, 5) : [];
  });
  protected readonly similarOptions = { align: 'start', slidesToScroll: 2, containScroll: 'trimSnaps' } as const;

  ngOnInit(): void {
    const slug = this._route.snapshot.paramMap.get('slug');
    if (slug) {
      this.property.set(this._propertiesService.getBySlug(slug));
    }
  }

  protected selectImage(index: number): void {
    this.selectedImage.set(index);
  }

  protected get currentImage(): string {
    const p = this.property();
    if (!p) return '';
    return p.images[this.selectedImage()] || p.imageUrl;
  }
}
