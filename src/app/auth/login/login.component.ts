import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../core/services/auth.service";
import { TranslationService } from "../../core/services/translation.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      state("out", style({ opacity: 0 })),
      transition("in => out", animate("300ms ease-out")),
      transition("out => in", animate("300ms ease-in")),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  magicLinkForm: FormGroup;
  isLoading = false;
  showMagicLink = false;
  hidePassword = true;
  animationState = "in";

  // Demo credentials for different user types
  demoCredentials = [
    { email: "joao@email.com", role: "client", password: "demo123" },
    { email: "maria@natan.pt", role: "provider", password: "demo123" },
    { email: "admin@natan.pt", role: "admin", password: "demo123" },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.magicLinkForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.redirectToUserDashboard();
    }
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (success) => {
          this.isLoading = false;
          if (success) {
            this.snackBar.open(
              this.translate("auth.login_success"),
              this.translate("common.close"),
              { duration: 3000 }
            );
            this.redirectToUserDashboard();
          } else {
            this.snackBar.open(
              this.translate("auth.login_error"),
              this.translate("common.close"),
              { duration: 5000 }
            );
          }
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open(
            this.translate("auth.login_error"),
            this.translate("common.close"),
            { duration: 5000 }
          );
        }
      );
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onSendMagicLink(): void {
    if (this.magicLinkForm.valid) {
      this.isLoading = true;
      const { email } = this.magicLinkForm.value;

      this.authService.sendMagicLink(email).subscribe(
        (success) => {
          this.isLoading = false;
          if (success) {
            this.snackBar.open(
              this.translate("auth.magic_link_sent"),
              this.translate("common.close"),
              { duration: 5000 }
            );
            this.magicLinkForm.reset();
          } else {
            this.snackBar.open(
              this.translate("auth.magic_link_error"),
              this.translate("common.close"),
              { duration: 5000 }
            );
          }
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open(
            this.translate("auth.magic_link_error"),
            this.translate("common.close"),
            { duration: 5000 }
          );
        }
      );
    } else {
      this.markFormGroupTouched(this.magicLinkForm);
    }
  }

  toggleAuthMethod(): void {
    this.animationState = "out";
    setTimeout(() => {
      this.showMagicLink = !this.showMagicLink;
      this.loginForm.reset();
      this.magicLinkForm.reset();
      this.animationState = "in";
    }, 300);
  }

  useDemoCredentials(credentials: any): void {
    this.loginForm.patchValue({
      email: credentials.email,
      password: credentials.password,
    });
    this.showMagicLink = false;
  }

  private redirectToUserDashboard(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      switch (user.role) {
        case "client":
          this.router.navigate(["/client"]);
          break;
        case "provider":
          this.router.navigate(["/provider"]);
          break;
        case "admin":
          this.router.navigate(["/admin"]);
          break;
        default:
          this.router.navigate(["/home"]);
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(
    fieldName: string,
    formGroup: FormGroup = this.loginForm
  ): string {
    const field = formGroup.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.translate("validation.required");
      }
      if (field.errors["email"]) {
        return this.translate("validation.email");
      }
      if (field.errors["minlength"]) {
        return this.translate("validation.minlength");
      }
    }
    return "";
  }
}
