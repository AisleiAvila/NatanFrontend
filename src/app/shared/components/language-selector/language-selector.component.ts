import { Component, OnInit } from "@angular/core";
import { TranslationService } from "../../../core/services/translation.service";

@Component({
    selector: "app-language-selector",
    template: `
    <button
      mat-button
      [matMenuTriggerFor]="languageMenu"
      class="language-selector"
    >
      <span class="current-language">
        {{ getCurrentLanguageFlag() }} {{ getCurrentLanguageName() }}
      </span>
      <mat-icon>arrow_drop_down</mat-icon>
    </button>

    <mat-menu #languageMenu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of availableLanguages"
        (click)="changeLanguage(lang.code)"
        [class.active]="lang.code === currentLanguage"
      >
        <span class="language-flag">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </mat-menu>
  `,
    styles: [
        `
      .language-selector {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 16px;
        height: 40px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        transition: background-color 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .current-language {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }

      .language-flag {
        margin-right: 8px;
        font-size: 1.2em;
      }

      button.active {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    ],
    standalone: false
})
export class LanguageSelectorComponent implements OnInit {
  availableLanguages: { code: string; name: string; flag: string }[] = [];
  currentLanguage: string = "pt";

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.availableLanguages = this.translationService.getAvailableLanguages();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
  }

  getCurrentLanguageFlag(): string {
    const lang = this.availableLanguages.find(
      (l) => l.code === this.currentLanguage
    );
    return lang ? lang.flag : "🇵🇹";
  }

  getCurrentLanguageName(): string {
    const lang = this.availableLanguages.find(
      (l) => l.code === this.currentLanguage
    );
    return lang ? lang.name : "Português";
  }
}
