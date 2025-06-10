import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../../core/services/auth.service";
import { TranslationService } from "../../core/services/translation.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  template: `
    <header class="app-header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/">
            <img
              src="assets/images/Logo_Natan.png"
              alt="Natan Construtora"
              class="logo-image"
            />
          </a>
        </div>
        <nav class="main-nav">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            {{ translate("nav.home") }}
          </a>
          <a routerLink="/services" routerLinkActive="active">
            {{ translate("nav.services") }}
          </a>
          <a routerLink="/contact" routerLinkActive="active">
            {{ translate("nav.contact") }}
          </a>
        </nav>
        <div class="header-actions">
          <app-language-selector></app-language-selector>
          <button mat-button color="primary" routerLink="/auth/login">
            {{ translate("auth.login") }}
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .logo {
        .logo-image {
          height: 50px;
          width: auto;
          object-fit: contain;
        }
      }

      .main-nav {
        display: flex;
        gap: 2rem;

        a {
          text-decoration: none;
          color: #424242;
          font-weight: 500;
          transition: color 0.3s ease;

          &:hover {
            color: #1976d2;
          }

          &.active {
            color: #1976d2;
          }
        }
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  currentLanguage = "pt";
  isLoggedIn = false;
  isAuthPage = false;

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.checkAuthStatus();
    this.checkCurrentRoute();
  }

  private checkAuthStatus() {
    // Implementar lógica de verificação de autenticação
    this.isLoggedIn = localStorage.getItem("token") !== null;
  }

  private checkCurrentRoute() {
    this.isAuthPage = this.router.url.includes("/auth/");
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === "pt" ? "en" : "pt";
    this.translationService.setLanguage(newLang);
    this.currentLanguage = newLang;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }

  navigateToProfile(): void {
    if (this.currentUser) {
      this.router.navigate([`/${this.currentUser.role}/profile`]);
    }
  }
}
