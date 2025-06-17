import { Component, Inject, OnInit } from "@angular/core";
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
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Category } from "../../../core/models/category.model";
import { CategoryService } from "../../../core/services/category.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data?: Category
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: ["", [Validators.maxLength(500)]],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data) {
      this.form.patchValue({
        name: this.data.name,
        description: this.data.description,
        isActive: this.data.isActive,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const formData = this.form.value;

      const request = this.isEditMode
        ? this.categoryService.update(this.data!.id!, formData)
        : this.categoryService.create(formData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Categoria ${
              this.isEditMode ? "atualizada" : "criada"
            } com sucesso`,
            "Fechar",
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error("Erro ao salvar categoria:", error);
          this.snackBar.open(
            `Erro ao ${this.isEditMode ? "atualizar" : "criar"} categoria`,
            "Fechar",
            { duration: 3000 }
          );
          this.loading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
