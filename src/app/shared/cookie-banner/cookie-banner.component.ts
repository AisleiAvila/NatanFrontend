import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cookie-banner",
  template: `
    <div class="cookie-banner" *ngIf="!accepted">
      <div class="cookie-content">
        <p>{{ translate("cookies.message") }}</p>
        <div class="cookie-actions">
          <button mat-button color="primary" (click)="acceptCookies()">
            {{ translate("cookies.accept") }}
          </button>
          <button mat-button (click)="declineCookies()">
            {{ translate("cookies.decline") }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem;
        z-index: 1000;
      }
      .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      .cookie-actions {
        display: flex;
        gap: 0.5rem;
      }
    `,
  ],
})
export class CookieBannerComponent implements OnInit {
  accepted = false;

  constructor() {}

  ngOnInit(): void {
    this.accepted = localStorage.getItem("cookiesAccepted") === "true";
  }

  acceptCookies(): void {
    localStorage.setItem("cookiesAccepted", "true");
    this.accepted = true;
  }

  declineCookies(): void {
    localStorage.setItem("cookiesAccepted", "false");
    this.accepted = true;
  }

  translate(key: string): string {
    // TODO: Implementar serviço de tradução
    const translations: { [key: string]: string } = {
      "cookies.message":
        "Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com o uso de cookies.",
      "cookies.accept": "Aceitar",
      "cookies.decline": "Recusar",
    };
    return translations[key] || key;
  }
}
