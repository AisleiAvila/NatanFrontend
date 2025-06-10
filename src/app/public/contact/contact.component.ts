import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  // Company contact information
  contactInfo = {
    phone: '+351 912 345 678',
    email: 'info@natan.pt',
    address: 'Rua da Construção, 123, 3800-000 Aveiro, Portugal',
    whatsapp: '+351 912 345 678',
    businessHours: {
      weekdays: '08:00 - 18:00',
      saturday: '08:00 - 13:00',
      sunday: 'Fechado'
    }
  };

  // Service areas with coordinates for future map integration
  serviceAreas = [
    {
      name: 'São Miguel',
      description: 'Cobertura completa da região de São Miguel',
      icon: 'location_city'
    },
    {
      name: 'Aveiro',
      description: 'Sede principal com todos os serviços disponíveis',
      icon: 'apartment'
    },
    {
      name: 'Coimbra',
      description: 'Serviços especializados na região de Coimbra',
      icon: 'domain'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translationService: TranslationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      preferredContact: ['email', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open(
          this.translate('contact.form.success_message'), 
          this.translate('common.close'), 
          { duration: 5000 }
        );
        this.contactForm.reset();
        this.contactForm.patchValue({ preferredContact: 'email' });
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.translate('validation.required');
      }
      if (field.errors['email']) {
        return this.translate('validation.email');
      }
      if (field.errors['minlength']) {
        return this.translate('validation.minlength');
      }
    }
    return '';
  }

  openWhatsApp(): void {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os vossos serviços.');
    window.open(`https://wa.me/${this.contactInfo.whatsapp}?text=${message}`, '_blank');
  }

  callPhone(): void {
    window.open(`tel:${this.contactInfo.phone}`, '_self');
  }

  sendEmail(): void {
    const subject = encodeURIComponent('Pedido de Informação - Natan Construtora');
    window.open(`mailto:${this.contactInfo.email}?subject=${subject}`, '_self');
  }

  openGoogleMaps(): void {
    const address = encodeURIComponent(this.contactInfo.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }
}
