import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslationService } from "./core/services/translation.service";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [
    `
      .main-content {
        padding-top: 64px;
        min-height: calc(100vh - 64px - 300px);
      }
    `,
  ],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private translationService: TranslationService
  ) {
    this.titleService.setTitle(
      "ConstruTech - Serviços de Construção e Manutenção"
    );
    this.translationService.initTranslation();
  }
}
