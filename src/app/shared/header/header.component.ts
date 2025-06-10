import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { TranslationService } from '../../core/services/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  currentLanguage = 'pt';

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'pt' ? 'en' : 'pt';
    this.translationService.setLanguage(newLang);
    this.currentLanguage = newLang;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  navigateToProfile(): void {
    if (this.currentUser) {
      this.router.navigate([`/${this.currentUser.role}/profile`]);
    }
  }
}