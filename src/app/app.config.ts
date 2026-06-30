import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
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
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' }),
      CdkMenuModule,
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideSpartanHlm(),
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
  ],
};
