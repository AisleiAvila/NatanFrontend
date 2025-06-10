import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  openWhatsApp(): void {
    const phoneNumber = '+351912345678';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os vossos serviços.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
