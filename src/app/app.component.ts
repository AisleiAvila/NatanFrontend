import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslationService } from "./core/services/translation.service";
import { RouterOutlet, RouterModule } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent],
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
