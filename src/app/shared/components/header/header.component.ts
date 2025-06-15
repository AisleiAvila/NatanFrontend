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
    LanguageSelectorComponent,
  ],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private authService: AuthService
  ) {
    this.translateService.setDefaultLang("pt");
    this.translateService.use(localStorage.getItem("natan_language") || "pt");
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  goToHome(): void {
    this.router.navigate(["/"]);
  }

  goToServices(): void {
    this.router.navigate(["/services"]);
  }

  goToContact(): void {
    this.router.navigate(["/contact"]);
  }

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  navigateToRole(): void {
    if (this.currentUser?.role === "admin") {
      this.router.navigate(["/admin/dashboard"]);
    } else {
      this.router.navigate(["/client/dashboard"]);
    }
  }
}
