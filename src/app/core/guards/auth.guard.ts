import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      // Check if user has the required role
      const requiredRole = this.getRequiredRole(state.url);
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }

  private getRequiredRole(url: string): string | null {
    if (url.startsWith('/client')) return 'client';
    if (url.startsWith('/provider')) return 'provider';
    if (url.startsWith('/admin')) return 'admin';
    return null;
  }
}
