import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Pour parler au Java

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
