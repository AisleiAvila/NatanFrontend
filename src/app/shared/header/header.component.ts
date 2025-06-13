import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, User } from "../../core/services/auth.service";
import { Observable } from "rxjs";
import { TranslationService } from "../../core/services/translation.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser: User | null = null;
  currentLanguage = "pt";
  isAuthPage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,
    private snackBar: MatSnackBar
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });

    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.checkCurrentRoute();
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

  logout() {
    this.authService.logout();
    this.snackBar.open(
      this.translate("auth.logout_success"),
      this.translate("common.close"),
      { duration: 3000 }
    );
    this.router.navigate(["/"]);
  }

  navigateToProfile(): void {
    if (this.currentUser) {
      this.router.navigate([`/${this.currentUser.role}/profile`]);
    }
  }

  goToLogin(): void {
    this.router.navigate(["/auth/login"]);
  }

  goToContact(): void {
    alert("This feature is not implemented yet.");
    this.router.navigate(["/contact"]);
  }
}
