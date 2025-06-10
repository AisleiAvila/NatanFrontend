import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, User } from "../../../core/services/auth.service";
import { TranslationService } from "../../../core/services/translation.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  isAuthenticated = false;
  currentLanguage = "pt";
  availableLanguages = this.translationService.getAvailableLanguages();

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.isAuthenticated = !!this.authService.currentUserValue;

    this.translationService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  changeLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }

  navigateToRole(): void {
    if (this.currentUser) {
      this.router.navigate([`/${this.currentUser.role}`]);
    }
  }

  goToLogin(): void {
    this.router.navigate(["/auth/login"]);
  }
}
