import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common"; // Importar CommonModule
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon"; // Import MatIconModule

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  standalone: true, // Alterar para true
  imports: [CommonModule, TranslateModule, MatIconModule], // Adicionar MatIconModule aos imports
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("pt");
    this.translateService.use(localStorage.getItem("natan_language") || "pt");
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
