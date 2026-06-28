import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { PropertiesService } from '../../services/properties';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmCarousel, HlmCarouselContent, HlmCarouselItem, HlmCarouselNext, HlmCarouselPrevious } from '@spartan-ng/helm/carousel';
import { HlmAspectRatio } from '@spartan-ng/helm/aspect-ratio';
import { HlmInputGroup, HlmInputGroupAddon, HlmInputGroupInput } from '@spartan-ng/helm/input-group';
import { HlmEmpty, HlmEmptyHeader, HlmEmptyMedia, HlmEmptyTitle, HlmEmptyDescription } from '@spartan-ng/helm/empty';
import { NgIcon } from '@ng-icons/core';
import { HlmH1, HlmH2, HlmLead } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-properties',
  imports: [
    RouterLink,
    Header,
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
    HlmAspectRatio,
    HlmInputGroup,
    HlmInputGroupAddon,
    HlmInputGroupInput,
    HlmEmpty,
    HlmEmptyHeader,
    HlmEmptyMedia,
    HlmEmptyTitle,
    HlmEmptyDescription,
    NgIcon,
    HlmH1,
    HlmH2,
    HlmLead,
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.scss',
})
export class Properties {
  protected readonly propertiesService = inject(PropertiesService);
  protected readonly saleOptions = { align: 'start', slidesToScroll: 3, containScroll: 'trimSnaps' } as const;
  protected readonly rentOptions = { align: 'start', slidesToScroll: 3, containScroll: 'trimSnaps' } as const;
}
