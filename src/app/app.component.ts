import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterOutlet, RouterModule } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, TranslateModule],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.titleService.setTitle(
      "Natan Construtora - Serviços de Construção e Manutenção"
    );
    this.translate.setDefaultLang("pt");
    this.translate.use("pt");
  }
}
