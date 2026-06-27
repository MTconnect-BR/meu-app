import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@ng-icons/core';
import {
  lucideSun,
  lucideMoon,
  lucideSearch,
  lucideBedDouble,
  lucideBath,
  lucideCar,
  lucideMapPin,
  lucideHeart,
  lucideArrowLeft,
  lucideArrowRight,
  lucidePhone,
  lucideMaximize,
  lucidePlus,
  lucidePencil,
  lucideTrash2,
  lucideCheck,
  lucideX,
  lucideExternalLink,
  lucideInfo,
  lucideEye,
  lucideChevronDown,
} from '@ng-icons/lucide';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule, Overlay, OverlayContainer, OverlayPositionBuilder, OverlayOutsideClickDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Directionality } from '@angular/cdk/bidi';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(DialogModule, OverlayModule, A11yModule, PortalModule, CdkMenuModule, ScrollingModule),
    { provide: Overlay, useClass: Overlay },
    { provide: OverlayContainer, useClass: OverlayContainer },
    { provide: OverlayPositionBuilder, useClass: OverlayPositionBuilder },
    { provide: OverlayOutsideClickDispatcher, useClass: OverlayOutsideClickDispatcher },
    { provide: ScrollStrategyOptions, useClass: ScrollStrategyOptions },
    { provide: Directionality, useClass: Directionality },
    provideSpartanHlm(),
    provideIcons({
      lucideSun,
      lucideMoon,
      lucideSearch,
      lucideBedDouble,
      lucideBath,
      lucideCar,
      lucideMapPin,
      lucideHeart,
      lucideArrowLeft,
      lucideArrowRight,
      lucidePhone,
      lucideMaximize,
      lucidePlus,
      lucidePencil,
      lucideTrash2,
      lucideCheck,
      lucideX,
      lucideExternalLink,
      lucideInfo,
      lucideEye,
      lucideChevronDown,
    }),
  ],
};
