import { HttpClient } from "@angular/common/http";
import { provideHttpClient } from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
  TranslateStore,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslationService } from "../services/translation.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function provideTranslate() {
  return [
    provideHttpClient(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    {
      provide: TranslateStore,
      useClass: TranslateStore,
    },
    {
      provide: TranslationService,
      useClass: TranslationService,
    },
    {
      provide: TranslateModule,
      useValue: {
        defaultLanguage: "pt",
        useDefaultLang: true,
      },
    },
  ];
}
