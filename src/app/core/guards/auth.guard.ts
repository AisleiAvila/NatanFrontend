import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    alert("AuthGuard constructor called");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    alert("AuthGuard canActivate called 2");
    // Permite acesso à rota de solicitação de serviço sem autenticação
    if (state.url.includes("/client/request-service")) {
      return true;
    }

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Check if user has the required role
      const requiredRole = this.getRequiredRole(state.url);
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(["/auth/login"]);
        return false;
      }
      return true;
    }

    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  private getRequiredRole(url: string): string | null {
    alert(url);
    if (url.startsWith("/client")) return "client";
    if (url.startsWith("/provider")) return "provider";
    if (url.startsWith("/admin")) return "admin";
    return null;
  }
}
