import { Component, OnInit } from "@angular/core";
import { TranslationService } from "./core/services/translation.service";

@Component({
  selector: "app-root",
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
      <app-cookie-banner></app-cookie-banner>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  title = "Natan Construtora";

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.initTranslation();
  }
}
