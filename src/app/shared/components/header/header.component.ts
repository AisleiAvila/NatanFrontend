import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { AuthService, User } from "../../../core/services/auth.service";

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TranslateModule,
  ],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  currentUser: User | null = null;
  currentLanguage: string = "pt";
  availableLanguages: Language[] = [
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  constructor(
    public router: Router,
    private translateService: TranslateService,
    private authService: AuthService
  ) {
    this.translateService.setDefaultLang("pt");
    this.currentLanguage = localStorage.getItem("natan_language") || "pt";
    this.translateService.use(this.currentLanguage);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.isAdmin = this.currentUser?.role === "admin";
  }

  changeLanguage(langCode: string): void {
    this.currentLanguage = langCode;
    localStorage.setItem("natan_language", langCode);
    this.translateService.use(langCode);
  }

  goToHome(): void {
    this.router.navigate(["/"]);
  }

  goToServices(): void {
    this.router.navigate(["/services"]);
  }

  goToCategories(): void {
    this.router.navigate(["admin/categories"]);
  }

  goToSubcategories(): void {
    this.router.navigate(["admin/subcategories"]);
  }

  goToContact(): void {
    this.router.navigate(["/contact"]);
  }

  goToLogin(): void {
    this.router.navigate(["/auth/login"]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  navigateToRole(): void {
    console.log("navigateToRole chamado");
    console.log("CurrentUser:", this.currentUser);
    if (this.currentUser?.role) {
      console.log("CurrentUser Role:", this.currentUser.role);
      if (this.currentUser.role === "admin") {
        console.log("Navegando para /admin/dashboard");
        this.router.navigate(["/admin/dashboard"]);
      } else {
        console.log("Navegando para /client/dashboard");
        this.router.navigate(["/client/dashboard"]);
      }
    } else {
      console.log(
        "CurrentUser ou CurrentUser.role não definido. Navegação não ocorrerá."
      );
    }
  }

  goToProjects(): void {
    this.router.navigate(["/projects"]);
  }
}
