import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@Component({
  selector: "app-service-request",
  templateUrl: "./service-request.component.html",
  styleUrls: ["./service-request.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ServiceRequestComponent {
  requestForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServiceRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requestForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
      ],
      address: ["", [Validators.required, Validators.minLength(10)]],
      description: ["", [Validators.required, Validators.minLength(20)]],
      preferredDate: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.loading = true;
      // Aqui você implementaria a lógica para enviar a solicitação
      console.log("Form submitted:", this.requestForm.value);
      setTimeout(() => {
        this.loading = false;
        this.dialogRef.close(true);
      }, 1500);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
