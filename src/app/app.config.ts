import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@ng-icons/core';
import {
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
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
      CdkMenuModule,
    ),
    provideClientHydration(),
    provideAnimations(),
    provideSpartanHlm(),
    provideIcons({
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
