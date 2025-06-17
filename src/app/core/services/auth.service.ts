import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, delay } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  whatsapp?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  public isLoggedIn$: Observable<boolean>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem("currentUser") || "null")
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn$ = this.currentUser.pipe(map((user) => !!user));
    this.checkAuthStatus();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Mock temporário para desenvolvimento
    console.log("Login chamado com email:", email);
    const mockUser: User = {
      id: "1",
      name: "Usuário Teste",
      email: email,
      //      role: "client",
      role: "admin",
      phone: "+351 912 345 678",
    };

    return of(mockUser).pipe(
      delay(1000), // Simula delay de rede
      map((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        return user;
      })
    );
  }

  logout(): void {
    console.log("Logout chamado");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["/home"]);
  }

  register(user: Partial<User>): Observable<User> {
    console.log("Register chamado com usuário:", user);
    // Mock temporário para desenvolvimento
    const mockUser: User = {
      id: "1",
      name: user.name || "",
      email: user.email || "",
      role: "client",
      phone: user.phone,
    };

    return of(mockUser).pipe(
      delay(1000), // Simula delay de rede
      map((newUser) => {
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        this.isAuthenticatedSubject.next(true);
        return newUser;
      })
    );
  }

  checkAuthStatus(): void {
    console.log("Checking authentication status...");
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  sendMagicLink(email: string): Observable<boolean> {
    console.log("Sending magic link to:", email);
    return new Observable((observer) => {
      // Simulate sending magic link
      setTimeout(() => {
        console.log(`Magic link sent to ${email}`);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  isAuthenticated(): boolean {
    console.log("Checking if user is authenticated...");
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    console.log("Checking role:", role);
    console.log("Current user:", this.currentUserValue);
    const user = this.currentUserValue;
    return user?.role === role;
  }

  getCurrentUser(): User | null {
    console.log("Getting current user from localStorage...");
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  }

  isAdmin(): boolean {
    console.log("Checking if user is admin...");
    const user = this.getCurrentUser();
    return user?.role === "admin";
  }
}
