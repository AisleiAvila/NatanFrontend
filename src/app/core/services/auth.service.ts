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

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem("currentUser") || "null")
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn$ = this.currentUser.pipe(map((user) => !!user));
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Mock temporário para desenvolvimento
    const mockUser: User = {
      id: "1",
      name: "Usuário Teste",
      email: email,
      role: "client",
      phone: "+351 912 345 678",
    };

    return of(mockUser).pipe(
      delay(1000), // Simula delay de rede
      map((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/home"]);
  }

  register(user: Partial<User>): Observable<User> {
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
        return newUser;
      })
    );
  }

  checkAuthStatus(): void {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
    }
  }

  sendMagicLink(email: string): Observable<boolean> {
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
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.role === role;
  }
}
