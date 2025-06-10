import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>("pt");
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [key: string]: any } = {};
  private translationsLoaded = false;

  constructor(private http: HttpClient) {}

  initTranslation(): void {
    const savedLanguage = localStorage.getItem("natan_language") || "pt";
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem("natan_language", language);
    this.loadTranslations(language);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  private loadTranslations(language: string): void {
    this.http
      .get(`/assets/i18n/${language}.json`)
      .pipe(
        tap((translations) => {
          this.translations[language] = translations;
          this.translationsLoaded = true;
        }),
        catchError((error) => {
          console.error(`Error loading translations for ${language}:`, error);
          return of({});
        })
      )
      .subscribe();
  }

  translate(key: string, params?: any): string {
    if (!this.translationsLoaded) {
      return key;
    }

    const language = this.getCurrentLanguage();
    const translations = this.translations[language];

    if (!translations) {
      return key;
    }

    const keys = key.split(".");
    let translation = translations;

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    if (typeof translation === "string" && params) {
      return this.interpolateParams(translation, params);
    }

    return translation || key;
  }

  private interpolateParams(translation: string, params: any): string {
    return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] || match;
    });
  }

  getAvailableLanguages(): { code: string; name: string; flag: string }[] {
    return [
      { code: "pt", name: "Português", flag: "🇵🇹" },
      { code: "en", name: "English", flag: "🇬🇧" },
    ];
  }
}
