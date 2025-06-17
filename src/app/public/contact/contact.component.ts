import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;

  // Company contact information
  contactInfo = {
    phone: "+351 912 345 678",
    email: "info@natan.pt",
    address: "Rua da Construção, 123, 3800-000 Aveiro, Portugal",
    whatsapp: "+351 912 345 678",
    businessHours: {
      weekdays: "08:00 - 18:00",
      saturday: "08:00 - 13:00",
      sunday: "Fechado",
    },
  };

  // Service areas with coordinates for future map integration
  serviceAreas = [
    {
      name: "São Miguel",
      description: "Cobertura completa da região de São Miguel",
      icon: "location_city",
    },
    {
      name: "Aveiro",
      description: "Sede principal com todos os serviços disponíveis",
      icon: "apartment",
    },
    {
      name: "Coimbra",
      description: "Serviços especializados na região de Coimbra",
      icon: "domain",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required],
      preferredContact: ["email", Validators.required],
    });
    this.translate.setDefaultLang("pt");
    this.translate.use(localStorage.getItem("natan_language") || "pt");
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      // TODO: Implementar envio do formulário
      setTimeout(() => {
        this.loading = false;
        this.snackBar.open(
          this.translate.instant("contact.form.success_message"),
          "OK",
          { duration: 3000 }
        );
        this.contactForm.reset();
      }, 1000);
    }
  }

  getSubjects(): string[] {
    return [
      "contact.form.subjects.general",
      "contact.form.subjects.quote",
      "contact.form.subjects.support",
      "contact.form.subjects.complaint",
    ];
  }

  openWhatsApp(): void {
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os vossos serviços."
    );
    window.open(
      `https://wa.me/${this.contactInfo.whatsapp}?text=${message}`,
      "_blank"
    );
  }

  callPhone(): void {
    window.open(`tel:${this.contactInfo.phone}`, "_self");
  }

  sendEmail(): void {
    const subject = encodeURIComponent(
      "Pedido de Informação - Natan Construtora"
    );
    window.open(`mailto:${this.contactInfo.email}?subject=${subject}`, "_self");
  }

  openGoogleMaps(): void {
    const address = encodeURIComponent(this.contactInfo.address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      "_blank"
    );
  }
}
