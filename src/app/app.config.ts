import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { AuthApiService } from './auth.api.service';
import { Configuration } from './openapi/configuration';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: Configuration,
      useFactory: (cookieService: CookieService) =>
        new Configuration({
          basePath: environment.apiUrl,
          credentials: { bearer: cookieService.get('TOKEN') },
        }),
      deps: [CookieService],
      multi: false,
    },
  ],
};
