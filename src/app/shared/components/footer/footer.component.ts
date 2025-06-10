import { Component, OnInit } from "@angular/core";
import { TranslationService } from "../../../core/services/translation.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  translate: TranslationService;

  constructor(private translationService: TranslationService) {
    this.translate = translationService;
  }

  ngOnInit(): void {}

  openWhatsApp(): void {
    const phone = "+351912345678";
    const message = "Olá! Gostaria de mais informações sobre os serviços.";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }
}
