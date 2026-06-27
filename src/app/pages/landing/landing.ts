import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { PropertiesService } from '../../services/properties';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmAspectRatio } from '@spartan-ng/helm/aspect-ratio';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideHome,
  lucideShield,
  lucideMapPin,
  lucideBedDouble,
  lucideBath,
  lucideCar,
  lucidePhone,
  lucideArrowRight,
  lucideSearch,
  lucideBuilding,
} from '@ng-icons/lucide';
import { HlmH1, HlmH2, HlmH3, HlmLead } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    Header,
    Footer,
    HlmButton,
    HlmBadge,
    HlmSeparator,
    HlmAspectRatio,
    NgIcon,
    HlmH1,
    HlmH2,
    HlmH3,
    HlmLead,
  ],
  providers: [
    provideIcons({
      lucideHome,
      lucideShield,
      lucideMapPin,
      lucideBedDouble,
      lucideBath,
      lucideCar,
      lucidePhone,
      lucideArrowRight,
      lucideSearch,
      lucideBuilding,
    }),
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected readonly propertiesService = inject(PropertiesService);
  protected readonly featuredSale = this.propertiesService.forSale.slice(0, 3);
  protected readonly featuredRent = this.propertiesService.forRent.slice(0, 3);
}
