import { APP_INITIALIZER, inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const REGISTER_KEY = new InjectionToken<string>('VERCEL_ANALYTICS_TOKEN');

export function provideVercelAnalytics() {
  return [
    {
      provide: REGISTER_KEY,
      useFactory: () => inject(PLATFORM_ID),
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const platformId = inject(REGISTER_KEY);
        return async () => {
          if (isPlatformBrowser(platformId)) {
            const { inject: vercelInject } = await import('@vercel/analytics');
            const { injectSpeedInsights } = await import('@vercel/speed-insights');
            vercelInject({ mode: 'production', framework: 'angular' });
            injectSpeedInsights({ framework: 'angular' });
          }
        };
      },
      deps: [REGISTER_KEY],
    },
  ];
}
