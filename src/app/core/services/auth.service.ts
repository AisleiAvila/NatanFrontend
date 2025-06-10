import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  phone?: string;
  whatsapp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  checkAuthStatus(): void {
    const userData = localStorage.getItem('natan_user');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password?: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate authentication logic
      setTimeout(() => {
        // Mock users for different roles
        const mockUsers: User[] = [
          {
            id: '1',
            name: 'João Silva',
            email: 'joao@email.com',
            role: 'client',
            phone: '+351 912 345 678',
            whatsapp: '+351 912 345 678'
          },
          {
            id: '2',
            name: 'Maria Santos',
            email: 'maria@natan.pt',
            role: 'provider',
            phone: '+351 923 456 789'
          },
          {
            id: '3',
            name: 'Admin User',
            email: 'admin@natan.pt',
            role: 'admin',
            phone: '+351 934 567 890'
          }
        ];

        const user = mockUsers.find(u => u.email === email);
        
        if (user) {
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('natan_user', JSON.stringify(user));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  sendMagicLink(email: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate sending magic link
      setTimeout(() => {
        console.log(`Magic link sent to ${email}`);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('natan_user');
    this.router.navigate(['/home']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}
