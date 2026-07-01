import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
  lucideBedDouble,
  lucideBath,
  lucideCar,
  lucideMapPin,
  lucideHeart,
  lucideArrowLeft,
  lucidePhone,
  lucideMaximize,
  lucidePlus,
  lucidePencil,
  lucideTrash2,
  lucideCheck,
  lucideX,
  lucideInfo,
  lucideEye,
  lucideChevronDown,
  lucideChevronUp,
  lucideSlidersHorizontal,
} from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideVercelAnalytics } from './analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideIcons({
      lucideSearch,
      lucideBedDouble,
      lucideBath,
      lucideCar,
      lucideMapPin,
      lucideHeart,
      lucideArrowLeft,
      lucidePhone,
      lucideMaximize,
      lucidePlus,
      lucidePencil,
      lucideTrash2,
      lucideCheck,
      lucideX,
      lucideInfo,
      lucideEye,
      lucideChevronDown,
      lucideChevronUp,
      lucideSlidersHorizontal,
    }),
    provideVercelAnalytics(),
  ],
};
