import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { Router } from "@angular/router";
import { MOCK_REGIONS } from "src/app/core/mocks/project.mock";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.html",
  styleUrl: "./client-form.scss",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
  ],
})
export class ClientForm implements OnInit {
  form!: FormGroup;
  regions = MOCK_REGIONS;
  statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", Validators.required],
      region: ["", Validators.required],
      status: ["ativo", Validators.required],
    });
  }

  salvar() {
    if (this.form.valid) {
      // Aqui você pode enviar para API ou mockar o salvamento
      alert("Cliente cadastrado com sucesso!");
      this.router.navigate(["/admin/clients"]);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["/admin/clients"]);
  }
}
