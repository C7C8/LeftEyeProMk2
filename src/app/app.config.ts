import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown } from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideAnimations(),
		provideHttpClient(withFetch()),
		provideMarkdown({ sanitize: SecurityContext.HTML})
	]
};
