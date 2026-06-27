import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
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

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(CdkMenuModule),
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
