import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common"; // Importar CommonModule

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  standalone: true, // Alterar para true
  imports: [CommonModule], // Adicionar CommonModule aos imports
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor() {}

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
