import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../../core/services/auth.service";
import { TranslationService } from "../../core/services/translation.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  template: `
    <header class="main-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <img src="assets/images/logo.png" alt="Natan Construtora" />
            </a>
          </div>

          <nav class="main-nav" *ngIf="!isAuthPage">
            <a routerLink="/home/services">{{ translate("home.services") }}</a>
            <a routerLink="/home/about">{{ translate("home.about") }}</a>
            <a routerLink="/home/contact">{{ translate("home.contact") }}</a>
          </nav>

          <div class="header-actions">
            <app-language-selector></app-language-selector>

            <ng-container *ngIf="!isAuthPage">
              <button
                mat-raised-button
                color="primary"
                routerLink="/auth/login"
                *ngIf="!isLoggedIn"
              >
                {{ translate("home.login") }}
              </button>
              <button
                mat-raised-button
                color="accent"
                routerLink="/client/dashboard"
                *ngIf="isLoggedIn"
              >
                {{ translate("home.dashboard") }}
              </button>
            </ng-container>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .main-header {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }

        .logo {
          a {
            display: block;
          }

          img {
            height: 40px;
            width: auto;
          }
        }

        .main-nav {
          display: flex;
          gap: 2rem;

          a {
            color: #333;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;

            &:hover {
              color: #1976d2;
            }
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
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
