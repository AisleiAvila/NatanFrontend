import { Component } from "@angular/core";
import { TranslationService } from "../../core/services/translation.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(public translate: TranslationService) {}
}
