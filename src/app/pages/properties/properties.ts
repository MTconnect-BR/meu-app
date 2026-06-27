import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { PropertiesService } from '../../services/properties';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmField } from '@spartan-ng/helm/field';
import { HlmCarousel, HlmCarouselContent, HlmCarouselItem, HlmCarouselNext, HlmCarouselPrevious } from '@spartan-ng/helm/carousel';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-properties',
  imports: [
    RouterLink,
    Header,
    Footer,
    HlmCard,
    HlmCardContent,
    HlmButton,
    HlmInput,
    HlmBadge,
    HlmSeparator,
    HlmField,
    HlmCarousel,
    HlmCarouselContent,
    HlmCarouselItem,
    HlmCarouselNext,
    HlmCarouselPrevious,
    NgIcon,
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
})
export class Properties {
  protected readonly propertiesService = inject(PropertiesService);
  protected readonly saleOptions = { align: 'start', slidesToScroll: 3, containScroll: 'trimSnaps' } as const;
  protected readonly rentOptions = { align: 'start', slidesToScroll: 3, containScroll: 'trimSnaps' } as const;
}
