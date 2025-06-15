import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { TranslateService } from "@ngx-translate/core";

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: "app-language-selector",
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.scss"],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage: string = "pt";
  availableLanguages: Language[] = [
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("pt");
    this.currentLanguage = localStorage.getItem("natan_language") || "pt";
    this.translateService.use(this.currentLanguage);
  }

  ngOnInit(): void {}

  getCurrentLanguage(): Language | undefined {
    return this.availableLanguages.find((l) => l.code === this.currentLanguage);
  }

  setLanguage(langCode: string): void {
    this.currentLanguage = langCode;
    localStorage.setItem("natan_language", langCode);
    this.translateService.use(langCode);
  }
}
