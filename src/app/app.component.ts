import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslationService } from "./core/services/translation.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private translationService: TranslationService
  ) {
    this.titleService.setTitle(
      "Natan Construtora - Serviços de Construção e Manutenção"
    );
    this.translationService.initTranslation();
  }
}
